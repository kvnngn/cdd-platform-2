import { useCallback, useMemo, forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  Position,
} from 'reactflow';
import ELK from 'elkjs/lib/elk.bundled.js';
import 'reactflow/dist/style.css';
import { GraphData } from '../../types/graph';
import { WORKSTREAM_NODES } from '../../data/mockData';
import { ChevronRight, ChevronDown, Trash2, X } from 'lucide-react';
import { CustomHypothesisNode } from './CustomHypothesisNode';
import { useAppStore } from '../../store/appStore';

interface HypothesisFlowGraphProps {
  graphData: GraphData;
  projectId: string;
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
  highlightedNodes: Set<string>;
}

export interface HypothesisFlowGraphRef {
  zoomIn: () => void;
  zoomOut: () => void;
  centerGraph: () => void;
}

const NODE_COLORS = {
  draft: '#94a3b8',
  validated: '#22c55e',
  rejected: '#ef4444',
  on_hold: '#f59e0b',
};

const EDGE_COLORS = {
  supports: '#10b981',  // Vert plus sobre
  contradicts: '#f87171',  // Rouge plus sobre
  nuances: '#60a5fa',  // Bleu plus sobre
};

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.spacing.nodeNode': '80',
  'elk.layered.spacing.nodeNodeBetweenLayers': '150',
  'elk.layered.nodePlacement.strategy': 'SIMPLE',
};

// Fonction pour calculer le numéro hiérarchique d'un node
const getHierarchicalNumber = (node: typeof WORKSTREAM_NODES[0], allNodes: typeof WORKSTREAM_NODES): string => {
  const buildNumber = (nodeId: string, accumulated: number[] = []): number[] => {
    const current = allNodes.find(n => n.id === nodeId);
    if (!current) return accumulated;

    // Le root n'a pas de numéro (level 0)
    if (current.level === 0) {
      return accumulated;
    }

    // Ajouter l'order du node actuel
    const newAccumulated = [current.order, ...accumulated];

    // Si on a un parent, continuer récursivement
    if (current.parentId) {
      return buildNumber(current.parentId, newAccumulated);
    }

    return newAccumulated;
  };

  const numbers = buildNumber(node.id);
  return numbers.length > 0 ? numbers.join('.') : '';
};

const getLayoutedElements = async (nodes: Node[], edges: Edge[]) => {
  const graph = {
    id: 'root',
    layoutOptions: elkOptions,
    children: nodes.map((node) => ({
      id: node.id,
      width: node.style?.width as number || 300,
      height: node.style?.height as number || 60,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  const layoutedGraph = await elk.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const layoutedNode = layoutedGraph.children?.find((n) => n.id === node.id);
    return {
      ...node,
      position: {
        x: layoutedNode?.x ?? 0,
        y: layoutedNode?.y ?? 0,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

function HypothesisFlowGraphInner({
  graphData,
  projectId,
  selectedNodeId,
  onNodeClick,
  highlightedNodes,
}: HypothesisFlowGraphProps, ref: React.Ref<HypothesisFlowGraphRef>) {
  const { fitView, zoomIn: rfZoomIn, zoomOut: rfZoomOut } = useReactFlow();

  // Track if this is the first render
  const isFirstRender = useRef(true);

  // State for edge deletion confirmation popup
  const [selectedEdge, setSelectedEdge] = useState<{ id: string; source: string; target: string; x: number; y: number } | null>(null);

  // Get expanded nodes from store (persisted)
  const expandedNodes = useAppStore(state => state.expandedGraphNodes);
  const toggleGraphNodeExpansion = useAppStore(state => state.toggleGraphNodeExpansion);
  const removeHypothesisRelation = useAppStore(state => state.removeHypothesisRelation);

  // Get ALL workstream nodes for this project (including root)
  const workstreamNodes = useMemo(
    () => WORKSTREAM_NODES.filter(n => n.projectId === projectId),
    [projectId]
  );

  // Toggle expand/collapse using store action
  const toggleNodeExpansion = useCallback((nodeId: string) => {
    toggleGraphNodeExpansion(nodeId);
  }, [toggleGraphNodeExpansion]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const hypothesesPerNode = new Map<string, typeof graphData.nodes>();

    graphData.nodes.forEach(h => {
      if (!hypothesesPerNode.has(h.nodeId)) {
        hypothesesPerNode.set(h.nodeId, []);
      }
      hypothesesPerNode.get(h.nodeId)!.push(h);
    });

    workstreamNodes.forEach((wsNode) => {
      const hypotheses = hypothesesPerNode.get(wsNode.id) || [];
      const level = wsNode.level;
      const isExpanded = expandedNodes.has(wsNode.id);

      // Check if node should be visible (parent must be expanded)
      const isVisible = level === 0 || (wsNode.parentId && expandedNodes.has(wsNode.parentId));

      if (!isVisible) return; // Skip hidden nodes

      // Count children (sub-nodes + hypotheses)
      const childNodes = workstreamNodes.filter(n => n.parentId === wsNode.id);
      const hasChildren = childNodes.length > 0 || hypotheses.length > 0;

      // Style based on level - SOBRE pour managers
      let nodeStyle: any = {
        width: 300,
        height: 90,
        borderRadius: '10px',
        padding: '12px',
        fontWeight: 600,
        cursor: hasChildren ? 'pointer' : 'default',
      };

      if (level === 0) {
        // Root node - Main thesis (garder bleu pour importance)
        nodeStyle = {
          ...nodeStyle,
          width: 400,
          height: 100,
          backgroundColor: '#1e3a8a',
          border: '3px solid #1e40af',
          color: 'white',
        };
      } else {
        // Tous les autres niveaux: SOBRE et UNIFORME (blanc avec bordure grise)
        nodeStyle = {
          ...nodeStyle,
          width: level === 1 ? 280 : 240,
          height: level === 1 ? 85 : 75,
          backgroundColor: '#ffffff',
          border: `${level === 1 ? 2 : 1.5}px solid #cbd5e1`,
          color: '#1e293b',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        };
      }

      const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;
      const hierarchicalNumber = getHierarchicalNumber(wsNode, workstreamNodes);

      nodes.push({
        id: `ws-${wsNode.id}`,
        type: 'default',
        data: {
          label: (
            <div className="flex items-center gap-2">
              {hasChildren && (
                <ChevronIcon className={`w-4 h-4 shrink-0 ${level === 0 ? 'text-white' : 'text-slate-600'}`} />
              )}
              <div className="flex-1 text-center">
                <div className={`font-semibold ${level === 0 ? 'text-lg text-white' : level === 1 ? 'text-base' : 'text-sm'}`}>
                  {hierarchicalNumber && <span className={level === 0 ? 'text-blue-200 mr-2' : 'text-slate-500 mr-2'}>{hierarchicalNumber}</span>}
                  {wsNode.title}
                </div>
                {level > 0 && hasChildren && (
                  <div className="text-xs text-slate-500 mt-1">
                    {childNodes.length > 0
                      ? `${childNodes.length} sous-nœud${childNodes.length > 1 ? 's' : ''}`
                      : `${hypotheses.length} hypothèse${hypotheses.length > 1 ? 's' : ''}`
                    }
                  </div>
                )}
              </div>
            </div>
          ),
        },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: nodeStyle,
      });

      // Add edge from parent workstream node (only if visible) - SOBRE
      if (wsNode.parentId && isVisible) {
        const edgeColor = '#94a3b8'; // Gris sobre uniforme
        const edgeWidth = level === 1 ? 2 : 1.5;

        edges.push({
          id: `ws-edge-${wsNode.parentId}-${wsNode.id}`,
          source: `ws-${wsNode.parentId}`,
          target: `ws-${wsNode.id}`,
          type: 'smoothstep',
          animated: false,
          style: {
            stroke: edgeColor,
            strokeWidth: edgeWidth,
          },
        });
      }

      // Only add hypotheses if parent workstream is expanded
      if (level > 0 && hypotheses.length > 0 && isExpanded) {
        hypotheses.forEach((h) => {
          const isHighlighted = highlightedNodes.has(h.id);
          const isSelected = h.id === selectedNodeId;

          nodes.push({
            id: h.id,
            type: 'customHypothesis',
            data: {
              label: (
                <div className="text-white h-full flex flex-col justify-between py-1 px-1">
                  <div className="text-[11px] font-medium overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {h.label}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-[9px] text-blue-200 opacity-70 ml-auto">
                      Hypothesis {h.id.replace('h', '')}
                    </span>
                  </div>
                </div>
              ),
              backgroundColor: NODE_COLORS[h.status],
              color: 'white',
              border: isSelected ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.3)',
            },
            position: { x: 0, y: 0 },
          });

          edges.push({
            id: `h-edge-${wsNode.id}-${h.id}`,
            source: `ws-${wsNode.id}`,
            target: h.id,
            targetHandle: 'left', // Connexion au handle gauche (invisible)
            type: 'step', // Type step pour branche
            animated: false,
            style: {
              stroke: '#94a3b8',  // Gris sobre
              strokeWidth: 1.5,
              strokeDasharray: '4,4',  // Pointillés pour distinguer des workstream edges
              opacity: 0.7,
            },
          });
        });
      }
    });

    // Dédupliquer les relations bidirectionnelles (garder seulement une direction)
    const processedPairs = new Set<string>();

    graphData.links.forEach((link, idx) => {
      const sourceId = link.source as string;
      const targetId = link.target as string;

      // Créer une clé unique pour la paire (ordre alphabétique pour détecter les doublons)
      const pairKey = [sourceId, targetId].sort().join('-');

      // Si déjà traité, ignorer (évite les doublons bidirectionnels)
      if (processedPairs.has(pairKey)) return;
      processedPairs.add(pairKey);

      // Vérifier le statut des hypothèses connectées
      const sourceHypothesis = graphData.nodes.find(n => n.id === sourceId);
      const targetHypothesis = graphData.nodes.find(n => n.id === targetId);

      const hasRejected = sourceHypothesis?.status === 'rejected' || targetHypothesis?.status === 'rejected';
      const hasOnHold = sourceHypothesis?.status === 'on_hold' || targetHypothesis?.status === 'on_hold';
      const hasDraft = sourceHypothesis?.status === 'draft' || targetHypothesis?.status === 'draft';

      // Logique de couleur selon le type de relation
      let edgeColor: string;
      let edgeOpacity = 0.7;

      // RÈGLE: Les contradictions restent TOUJOURS rouges
      if (link.type === 'contradicts') {
        edgeColor = EDGE_COLORS['contradicts']; // Toujours rouge
        // Ajuster seulement l'opacité selon le statut
        if (hasRejected || hasDraft) {
          edgeOpacity = 0.5;
        }
      } else {
        // Pour supports et nuances, la couleur peut changer selon le statut
        if (hasRejected) {
          // Si une hypothèse est rejetée, la relation est invalide (rouge/gris)
          edgeColor = '#ef4444';
          edgeOpacity = 0.5;
        } else if (hasOnHold) {
          // Si en attente, orange
          edgeColor = '#f59e0b';
        } else if (hasDraft) {
          // Si draft, grisé
          edgeColor = '#94a3b8';
          edgeOpacity = 0.5;
        } else {
          // Les deux sont validées, couleur normale selon le type
          edgeColor = EDGE_COLORS[link.type];
        }
      }

      // Check if edge is connected to selected hypothesis
      const isConnectedToSelected = selectedNodeId && (sourceId === selectedNodeId || targetId === selectedNodeId);

      // Determine dash pattern based on status and type
      let strokeDasharray: string | undefined;
      if (hasRejected) {
        strokeDasharray = '8,4'; // Gros pointillés pour rejected
      } else if (link.type === 'contradicts') {
        strokeDasharray = '4,4';
      } else if (link.type === 'nuances') {
        strokeDasharray = '2,2';
      }

      edges.push({
        id: `rel-${idx}`,
        source: sourceId,
        target: targetId,
        type: 'smoothstep',  // Courbe pour relations entre hypothèses
        sourceHandle: 'right',  // Relations entre hypothèses: partir du côté droit
        targetHandle: 'right',  // Relations entre hypothèses: arriver du côté droit
        animated: isConnectedToSelected || false,  // Animate if connected to selected
        style: {
          stroke: edgeColor,
          strokeWidth: isConnectedToSelected ? 2.5 : 1.5,  // Thicker if selected
          strokeDasharray,
          opacity: isConnectedToSelected ? 1 : edgeOpacity,  // Use computed opacity
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColor,
          width: isConnectedToSelected ? 12 : 10,  // Larger arrow if selected
          height: isConnectedToSelected ? 12 : 10,
        },
      });
    });

    console.log('Graph created:', {
      workstreamNodes: workstreamNodes.length,
      hypotheses: graphData.nodes.length,
      totalNodes: nodes.length,
      totalEdges: edges.length,
      expandedNodes: expandedNodes.size,
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [graphData, workstreamNodes, selectedNodeId, highlightedNodes, expandedNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Track structure changes (not data changes like status updates)
  const previousStructure = useRef<string>('');

  useEffect(() => {
    const applyLayout = async () => {
      // Create a structure key based on node IDs and expansion state
      const structureKey = initialNodes.map(n => n.id).sort().join(',') + '|' + Array.from(expandedNodes).sort().join(',');

      // If structure hasn't changed (only data like status changed), just update node data without repositioning
      if (previousStructure.current === structureKey && nodes.length > 0) {
        console.log('Structure unchanged, updating node data only');
        setNodes(currentNodes =>
          currentNodes.map(currentNode => {
            const updatedNode = initialNodes.find(n => n.id === currentNode.id);
            return updatedNode ? { ...updatedNode, position: currentNode.position } : currentNode;
          })
        );
        setEdges(initialEdges);
        return;
      }

      // Structure changed, recalculate positions
      previousStructure.current = structureKey;
      console.log('Structure changed, recalculating layout with', initialNodes.length, 'nodes and', initialEdges.length, 'edges');

      // Helper: calculer la profondeur du sous-arbre d'un nœud (pour éviter superposition horizontale)
      const getSubtreeDepth = (nodeId: string): number => {
        const children = workstreamNodes.filter(n => n.parentId === nodeId);
        if (children.length === 0) return 0;
        // Retourner la profondeur max des enfants + 1
        return 1 + Math.max(...children.map(child => getSubtreeDepth(child.id)));
      };

      // Helper: calculer la hauteur verticale totale d'un sous-arbre (nombre de slots verticaux nécessaires)
      const getSubtreeHeight = (nodeId: string): number => {
        const node = workstreamNodes.find(n => n.id === nodeId);
        if (!node) return 1;

        // Si le nœud n'est pas étendu, sa hauteur est juste 1 (lui-même)
        if (!expandedNodes.has(nodeId)) return 1;

        // Trouver tous les enfants directs
        const children = workstreamNodes.filter(n => n.parentId === nodeId).sort((a, b) => a.order - b.order);

        if (children.length === 0) {
          // Pas d'enfants: hauteur = 1 (le nœud) + nombre d'hypothèses
          const hypotheses = graphData.nodes.filter(h => h.nodeId === nodeId);
          return 1 + hypotheses.length;
        }

        // Avec enfants: hauteur = 1 (le nœud) + somme des hauteurs des enfants
        const childrenHeight = children.reduce((sum, child) => sum + getSubtreeHeight(child.id), 0);
        return 1 + childrenHeight;
      };

      // Layout en 2 passes pour avoir les positions correctes
      const positionMap = new Map<string, { x: number; y: number }>();
      let currentYOffset = 0; // Pour espacer verticalement les branches

      // PASSE 1: Positionner tous les workstream nodes
      const wsNodes = initialNodes.filter(n => n.id.startsWith('ws-'));
      wsNodes.forEach((node) => {
        const wsNode = workstreamNodes.find(w => `ws-${w.id}` === node.id);
        if (!wsNode) return;

        const x = wsNode.level * 550;
        let y = 0;

        if (wsNode.level === 0) {
          // Root node en haut
          y = 0;
          currentYOffset = 0;
        } else if (wsNode.parentId) {
          // Sous-nœud: aligner avec le parent + hauteur cumulée des frères précédents
          const parentPos = positionMap.get(`ws-${wsNode.parentId}`);
          if (parentPos) {
            // Calculer la hauteur cumulée de tous les frères AVANT ce nœud
            const siblings = workstreamNodes
              .filter(n => n.parentId === wsNode.parentId && n.order < wsNode.order)
              .sort((a, b) => a.order - b.order);

            let cumulativeHeight = 0;
            siblings.forEach(sibling => {
              cumulativeHeight += getSubtreeHeight(sibling.id);
            });

            // Position = parent.y + hauteur cumulée * espacement
            y = parentPos.y + cumulativeHeight * 80; // 80px par unité de hauteur (réduit de 20% pour lisibilité)
          }
        }

        positionMap.set(node.id, { x, y });
      });

      // PASSE 2: Positionner les hypothèses en utilisant les positions des parents
      const hypothesisNodes = initialNodes.filter(n => !n.id.startsWith('ws-'));
      hypothesisNodes.forEach((node) => {
        const parentWsId = initialEdges.find(e => e.target === node.id && e.source.startsWith('ws-'))?.source;
        if (!parentWsId) return;

        const wsNode = workstreamNodes.find(w => `ws-${w.id}` === parentWsId);
        if (!wsNode) return;

        // Calculer profondeur du sous-arbre du parent
        const subtreeDepth = getSubtreeDepth(wsNode.id);
        // Placer après le sous-arbre + marge de 100px
        const x = (wsNode.level + 1 + subtreeDepth) * 550 + 100;

        // Get hypothesis index for this parent
        const hypothesesForParent = hypothesisNodes.filter(n =>
          initialEdges.some(e => e.source === parentWsId && e.target === n.id)
        );
        const hIndex = hypothesesForParent.findIndex(h => h.id === node.id);

        // Position: parent + hauteur de tous les enfants workstream + index de l'hypothèse
        const parentPos = positionMap.get(parentWsId);
        if (parentPos) {
          // Calculer la hauteur de tous les enfants workstream du parent
          const childrenWs = workstreamNodes.filter(n => n.parentId === wsNode.id);
          let childrenHeight = 0;
          childrenWs.forEach(child => {
            childrenHeight += getSubtreeHeight(child.id);
          });

          // Position = parent + enfants workstream + hypothèse index
          const y = parentPos.y + childrenHeight * 80 + hIndex * 64; // Espacement réduit de 20% pour lisibilité
          positionMap.set(node.id, { x, y });
        }
      });

      // Créer les nodes avec les positions calculées
      const layoutedNodes = initialNodes.map((node) => ({
        ...node,
        position: positionMap.get(node.id) || { x: 0, y: 0 },
      }));

      setNodes(layoutedNodes);
      setEdges(initialEdges);

      // Only fit view on first render
      if (isFirstRender.current) {
        setTimeout(() => {
          fitView({ padding: 0.15 });
          isFirstRender.current = false;
        }, 100);
      }
    };

    applyLayout();
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView, workstreamNodes, expandedNodes, nodes.length]);

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.id.startsWith('ws-')) {
      // Workstream node - toggle expand/collapse
      const wsNodeId = node.id.replace('ws-', '');
      toggleNodeExpansion(wsNodeId);
    } else {
      // Hypothesis node - open sidebar
      onNodeClick(node.id);
    }
  }, [onNodeClick, toggleNodeExpansion]);

  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    // Only allow deletion of relation edges (not workstream edges)
    if (!edge.id.startsWith('rel-')) return;

    // Get mouse position for popup placement
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    setSelectedEdge({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      x,
      y,
    });
  }, []);

  const handleDeleteRelation = useCallback(() => {
    if (!selectedEdge) return;

    // Remove the relation from the source hypothesis
    removeHypothesisRelation(selectedEdge.source, selectedEdge.target);

    // Close popup
    setSelectedEdge(null);
  }, [selectedEdge, removeHypothesisRelation]);

  const handleCancelDelete = useCallback(() => {
    setSelectedEdge(null);
  }, []);

  useImperativeHandle(ref, () => ({
    zoomIn: () => rfZoomIn(),
    zoomOut: () => rfZoomOut(),
    centerGraph: () => fitView({ padding: 0.15 }),
  }));

  const nodeTypes = useMemo(() => ({
    customHypothesis: CustomHypothesisNode,
  }), []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        attributionPosition="bottom-left"
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>

      {/* Edge Deletion Confirmation Popup */}
      {selectedEdge && (
        <div
          className="absolute z-50 bg-white rounded-lg shadow-lg border border-slate-200 p-3"
          style={{
            left: `${selectedEdge.x + 10}px`,
            top: `${selectedEdge.y - 60}px`,
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 mb-1">Supprimer cette relation ?</p>
              <p className="text-xs text-slate-500 mb-3">Cette action est irréversible.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteRelation}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
            <button
              onClick={handleCancelDelete}
              className="flex-shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const HypothesisFlowGraphForwardRef = forwardRef(HypothesisFlowGraphInner);

export const HypothesisFlowGraph = forwardRef<HypothesisFlowGraphRef, HypothesisFlowGraphProps>(
  (props, ref) => (
    <ReactFlowProvider>
      <HypothesisFlowGraphForwardRef {...props} ref={ref} />
    </ReactFlowProvider>
  )
);

HypothesisFlowGraph.displayName = 'HypothesisFlowGraph';
