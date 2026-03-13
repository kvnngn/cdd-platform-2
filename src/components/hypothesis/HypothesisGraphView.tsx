import { useState, useMemo, useRef } from 'react';
import { useAppStore } from '../../store/appStore';
import { hypothesesToGraphData, detectPatterns } from '../../utils/graphTransform';
import { HypothesisFlowGraph, HypothesisFlowGraphRef } from './HypothesisFlowGraph';
import { HypothesisGraphSidebar } from './HypothesisGraphSidebar';
import { HypothesisGraphToolbar } from './HypothesisGraphToolbar';
import { HypothesisGraphLegend } from './HypothesisGraphLegend';

interface HypothesisGraphViewProps {
  projectId: string;
}

export function HypothesisGraphView({ projectId }: HypothesisGraphViewProps) {
  const {
    hypotheses,
    selectedHypothesisId,
    setSelectedHypothesis,
    nodes,
    setExpandedGraphNodes
  } = useAppStore();

  const graphRef = useRef<HypothesisFlowGraphRef>(null);

  const [showPatterns, setShowPatterns] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());

  // Transform hypotheses to graph data (filter by projectId)
  const graphData = useMemo(
    () => hypothesesToGraphData(hypotheses, projectId),
    [hypotheses, projectId]
  );

  // Detect patterns when enabled
  const detectedPatterns = useMemo(
    () => showPatterns ? detectPatterns(graphData) : [],
    [showPatterns, graphData]
  );

  const selectedHypothesis = selectedHypothesisId
    ? hypotheses.find(h => h.id === selectedHypothesisId) ?? null
    : null;

  const handleNodeClick = (nodeId: string) => {
    setSelectedHypothesis(nodeId);
  };

  const handleHighlightPattern = (nodeIds: string[]) => {
    setHighlightedNodes(new Set(nodeIds));
    // Auto-clear after 3 seconds
    setTimeout(() => setHighlightedNodes(new Set()), 3000);
  };

  const handleExpandAll = () => {
    // Get all workstream node IDs for this project
    const projectNodes = nodes.filter(n => n.projectId === projectId);
    const allNodeIds = projectNodes.map(n => n.id);
    setExpandedGraphNodes(new Set(allNodeIds));
  };

  const handleCollapseAll = () => {
    // Keep only root node expanded
    const rootNode = nodes.find(n => n.projectId === projectId && n.level === 0);
    setExpandedGraphNodes(new Set(rootNode ? [rootNode.id] : []));
  };

  const sidebarOpen = selectedHypothesis !== null;

  return (
    <div className="flex h-full">
      {/* Graph Canvas - Flexible width */}
      <div className={`flex-1 relative bg-slate-50 transition-all duration-300 ${sidebarOpen ? 'mr-0' : ''}`}>
        {/* Toolbar - Top */}
        <HypothesisGraphToolbar
          showPatterns={showPatterns}
          onTogglePatterns={() => setShowPatterns(!showPatterns)}
          detectedPatterns={detectedPatterns}
          onHighlightPattern={handleHighlightPattern}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />

        {/* Graph */}
        <HypothesisFlowGraph
          ref={graphRef}
          graphData={graphData}
          projectId={projectId}
          selectedNodeId={selectedHypothesisId}
          onNodeClick={handleNodeClick}
          highlightedNodes={highlightedNodes}
        />

        {/* Legend - Bottom Right */}
        <div className="absolute bottom-4 right-4">
          <HypothesisGraphLegend />
        </div>
      </div>

      {/* Sidebar - Slides in from right */}
      <HypothesisGraphSidebar
        hypothesis={selectedHypothesis}
        onClose={() => setSelectedHypothesis(null)}
      />
    </div>
  );
}
