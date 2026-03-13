import { Hypothesis } from '@/types';
import { GraphData, HypothesisNode, HypothesisEdge, Pattern, ImpactType } from '@/types/graph';

export function hypothesesToGraphData(
  hypotheses: Hypothesis[],
  projectId: string
): GraphData {
  // Filter by projectId to show all hypotheses for this project
  const filtered = hypotheses.filter(h => h.projectId === projectId);

  // Create nodes
  const nodes: HypothesisNode[] = filtered.map(h => ({
    id: h.id,
    label: truncate(h.title, 50),
    status: h.status,
    confidence: h.confidence.overall,
    tags: h.tags,
    nodeId: h.nodeId,
  }));

  // Create edges from relations
  const links: HypothesisEdge[] = [];
  filtered.forEach(h => {
    h.relations.forEach(rel => {
      // Verify that the target exists in our set of nodes
      if (filtered.find(target => target.id === rel.hypothesisId)) {
        links.push({
          source: h.id,
          target: rel.hypothesisId,
          type: rel.type,
        });
      }
    });
  });

  return { nodes, links };
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + '...'
    : text;
}

// Impact analysis - calculate cascade impact of status change
export function calculateImpact(
  modifiedHypothesisId: string,
  newStatus: 'validated' | 'rejected',
  graphData: GraphData
): Map<string, ImpactType> {
  const impact = new Map<string, ImpactType>();

  // BFS to propagate impact
  const queue: Array<{ id: string; strength: number }> = [
    { id: modifiedHypothesisId, strength: 1.0 }
  ];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { id, strength } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);

    // Find outgoing relations
    const outgoingLinks = graphData.links.filter(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      return sourceId === id;
    });

    outgoingLinks.forEach(link => {
      const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;

      // Calculate impact based on relation type
      let targetImpact: ImpactType;

      if (newStatus === 'validated') {
        // If source is validated
        if (link.type === 'supports') {
          targetImpact = 'positive'; // Supported hypothesis = strengthened
        } else if (link.type === 'contradicts') {
          targetImpact = 'negative'; // Contradicted hypothesis = weakened
        } else {
          targetImpact = 'conflicted'; // Nuanced = mixed impact
        }
      } else {
        // If source is rejected
        if (link.type === 'supports') {
          targetImpact = 'negative'; // Support rejected = weakened
        } else if (link.type === 'contradicts') {
          targetImpact = 'positive'; // Contradiction rejected = strengthened
        } else {
          targetImpact = 'conflicted';
        }
      }

      // Merge with existing impact
      const existing = impact.get(targetId);
      if (existing && existing !== targetImpact) {
        impact.set(targetId, 'conflicted'); // Contradictory impacts
      } else {
        impact.set(targetId, targetImpact);
      }

      // Propagate with reduced strength
      if (strength > 0.3) {
        queue.push({ id: targetId, strength: strength * 0.6 });
      }
    });
  }

  return impact;
}

// Pattern detection - identify clusters and patterns
export function detectPatterns(graphData: GraphData): Pattern[] {
  const patterns: Pattern[] = [];

  // 1. Hub Detection (nodes with >5 connections)
  graphData.nodes.forEach(node => {
    const connections = graphData.links.filter(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return sourceId === node.id || targetId === node.id;
    });

    if (connections.length >= 5) {
      patterns.push({
        type: 'hub',
        nodeIds: [node.id],
        description: `Central hypothesis with ${connections.length} connexions - Critical reasoning point`,
        severity: 'warning',
      });
    }
  });

  // 2. Isolated Nodes (no connections)
  graphData.nodes.forEach(node => {
    const hasConnections = graphData.links.some(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return sourceId === node.id || targetId === node.id;
    });

    if (!hasConnections) {
      patterns.push({
        type: 'isolated',
        nodeIds: [node.id],
        description: 'Isolated hypothesis - Not connected to the rest of the reasoning',
        severity: 'info',
      });
    }
  });

  // 3. Contradiction Loops (A contradicts B and B contradicts A)
  const processedPairs = new Set<string>();

  graphData.links.forEach(link => {
    if (link.type === 'contradicts') {
      const sourceId = typeof link.source === 'object' ? (link.source as any).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;
      const pairKey = [sourceId, targetId].sort().join('-');

      if (processedPairs.has(pairKey)) return;

      const reverseLink = graphData.links.find(l => {
        const revSourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
        const revTargetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
        return revSourceId === targetId && revTargetId === sourceId && l.type === 'contradicts';
      });

      if (reverseLink) {
        processedPairs.add(pairKey);
        patterns.push({
          type: 'contradiction_loop',
          nodeIds: [sourceId, targetId],
          description: 'Loop of mutual contradiction - Inconsistency to resolve',
          severity: 'critical',
        });
      }
    }
  });

  // 4. Support Clusters (group of nodes that support each other)
  const supportClusters = new Map<string, Set<string>>();

  graphData.links.forEach(link => {
    if (link.type === 'supports') {
      const sourceId = typeof link.source === 'object' ? (link.source as any).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;

      if (!supportClusters.has(sourceId)) {
        supportClusters.set(sourceId, new Set([sourceId]));
      }
      supportClusters.get(sourceId)!.add(targetId);
    }
  });

  supportClusters.forEach((cluster) => {
    if (cluster.size >= 3) {
      patterns.push({
        type: 'support_cluster',
        nodeIds: Array.from(cluster),
        description: `Cluster of mutual support (${cluster.size} hypotheses) - Strong argument`,
        severity: 'info',
      });
    }
  });

  return patterns;
}

// Detect clusters using connected components
export function detectClusters(graphData: GraphData): Map<string, number> {
  const clusters = new Map<string, number>();
  const visited = new Set<string>();
  let clusterId = 0;

  // DFS for each connected component
  function dfs(nodeId: string, currentCluster: number) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    clusters.set(nodeId, currentCluster);

    // Find all connected nodes
    const connectedNodes = graphData.links
      .filter(l => {
        const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
        return sourceId === nodeId || targetId === nodeId;
      })
      .map(l => {
        const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
        return sourceId === nodeId ? targetId : sourceId;
      })
      .filter((id): id is string => typeof id === 'string');

    connectedNodes.forEach(id => dfs(id, currentCluster));
  }

  // Traverse all nodes
  graphData.nodes.forEach(node => {
    if (!visited.has(node.id)) {
      dfs(node.id, clusterId);
      clusterId++;
    }
  });

  return clusters;
}
