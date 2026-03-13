// Graph node representing a hypothesis
export interface HypothesisNode {
  id: string;                    // hypothesis.id
  label: string;                 // hypothesis.title (truncated)
  status: 'draft' | 'validated' | 'rejected' | 'on_hold';
  confidence: number;            // 0-100
  tags: string[];
  nodeId: string;                // workstream node associated
  updatedBy: string;             // user who last updated
  updatedAt: string;             // last update timestamp
  x?: number;                    // Position (set by force-graph)
  y?: number;                    // Position (set by force-graph)
}

// Graph edge representing a relation
export interface HypothesisEdge {
  source: string;                // hypothesis.id
  target: string;                // hypothesisRelation.hypothesisId
  type: 'supports' | 'contradicts' | 'nuances';
  strength?: number;             // Optional: relation weight
}

// Graph configuration
export interface GraphConfig {
  layout: 'force' | 'hierarchical' | 'circular';
  nodeSize: 'fixed' | 'byConfidence' | 'byConnections';
  edgeVisibility: 'all' | 'selected' | 'filtered';
  colorScheme: 'status' | 'nodeId' | 'confidence';
}

// Graph data structure for react-force-graph
export interface GraphData {
  nodes: HypothesisNode[];
  links: HypothesisEdge[];
}

// Pattern detection types
export interface Pattern {
  type: 'hub' | 'isolated' | 'chain' | 'contradiction_loop' | 'support_cluster';
  nodeIds: string[];
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

// Impact analysis types
export type ImpactType = 'positive' | 'negative' | 'conflicted';
