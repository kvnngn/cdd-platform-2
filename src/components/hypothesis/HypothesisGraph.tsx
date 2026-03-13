import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData, GraphConfig, ImpactType } from '../../types/graph';

interface HypothesisGraphProps {
  graphData: GraphData;
  config: GraphConfig;
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
  highlightedNodes: Set<string>;
  impactMap: Map<string, ImpactType>;
}

export interface HypothesisGraphRef {
  zoomIn: () => void;
  zoomOut: () => void;
  centerGraph: () => void;
}

const NODE_COLORS = {
  draft: '#94a3b8',        // slate-400
  validated: '#22c55e',    // green-500
  rejected: '#ef4444',     // red-500
  on_hold: '#f59e0b',      // amber-500
};

const EDGE_COLORS = {
  supports: '#22c55e',     // green-500
  contradicts: '#ef4444',  // red-500
  nuances: '#3b82f6',      // blue-500
};

export const HypothesisGraph = forwardRef<HypothesisGraphRef, HypothesisGraphProps>(
  ({ graphData, config, selectedNodeId, onNodeClick, highlightedNodes, impactMap }, ref) => {
    const graphRef = useRef<any>();

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        if (graphRef.current) {
          graphRef.current.zoom(graphRef.current.zoom() * 1.3, 300);
        }
      },
      zoomOut: () => {
        if (graphRef.current) {
          graphRef.current.zoom(graphRef.current.zoom() / 1.3, 300);
        }
      },
      centerGraph: () => {
        if (graphRef.current) {
          graphRef.current.zoomToFit(400, 50);
        }
      },
    }));

    // Center on selected node
    useEffect(() => {
      if (selectedNodeId && graphRef.current) {
        const node = graphData.nodes.find(n => n.id === selectedNodeId);
        if (node && node.x !== undefined && node.y !== undefined) {
          graphRef.current.centerAt(node.x, node.y, 1000);
          graphRef.current.zoom(2, 1000);
        }
      }
    }, [selectedNodeId, graphData.nodes]);

    const handleNodeClick = useCallback((node: any) => {
      onNodeClick(node.id);
    }, [onNodeClick]);

    const getNodeSize = useCallback((node: any) => {
      let nodeSize = 8;
      if (config.nodeSize === 'byConfidence') {
        nodeSize = 8 + (node.confidence / 100) * 8;
      } else if (config.nodeSize === 'byConnections') {
        const connections = graphData.links.filter(l => {
          const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          return sourceId === node.id || targetId === node.id;
        }).length;
        nodeSize = 8 + Math.min(connections * 2, 16);
      }
      return nodeSize;
    }, [config.nodeSize, graphData.links]);

    const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const label = node.label;
      const fontSize = 12 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;

      const nodeSize = getNodeSize(node);

      // Impact overlay (halo)
      const impact = impactMap.get(node.id);
      if (impact) {
        const time = Date.now() / 1000;
        const pulseRadius = nodeSize + 6 + Math.sin(time * 3) * 2;

        const gradient = ctx.createRadialGradient(
          node.x, node.y, nodeSize,
          node.x, node.y, pulseRadius
        );

        if (impact === 'positive') {
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.6)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
        } else if (impact === 'negative') {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        } else if (impact === 'conflicted') {
          gradient.addColorStop(0, 'rgba(245, 158, 11, 0.6)');
          gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Highlight ring for pattern detection
      const isHighlighted = highlightedNodes.has(node.id);
      if (isHighlighted) {
        const time = Date.now() / 1000;
        const pulseRadius = nodeSize + 6 + Math.sin(time * 3) * 2;

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3 / globalScale;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Draw node circle
      const isSelected = node.id === selectedNodeId;
      const color = NODE_COLORS[node.status as keyof typeof NODE_COLORS];

      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Selected node border
      if (isSelected) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3 / globalScale;
        ctx.stroke();
      }

      // Impact badge
      if (impact) {
        const badgeX = node.x + nodeSize + 6;
        const badgeY = node.y - nodeSize - 6;

        ctx.font = '14px Arial';
        if (impact === 'positive') {
          ctx.fillStyle = '#22c55e';
          ctx.fillText('↑', badgeX, badgeY);
        } else if (impact === 'negative') {
          ctx.fillStyle = '#ef4444';
          ctx.fillText('↓', badgeX, badgeY);
        } else {
          ctx.fillStyle = '#f59e0b';
          ctx.fillText('?', badgeX, badgeY);
        }
      }

      // Draw label
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#1e293b';
      ctx.fillText(label, node.x, node.y + nodeSize + fontSize + 2);
    }, [config.nodeSize, selectedNodeId, graphData.links, getNodeSize, highlightedNodes, impactMap]);

    return (
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeCanvasObject={nodeCanvasObject}
        linkColor={link => EDGE_COLORS[link.type as keyof typeof EDGE_COLORS]}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkWidth={2}
        linkLineDash={link => {
          if (link.type === 'contradicts') return [5, 5];
          if (link.type === 'nuances') return [2, 2];
          return null;
        }}
        onNodeClick={handleNodeClick}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        backgroundColor="#f8fafc"
      />
    );
  }
);

HypothesisGraph.displayName = 'HypothesisGraph';
