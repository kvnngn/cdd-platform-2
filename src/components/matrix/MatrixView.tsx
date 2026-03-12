import { useState, useMemo } from 'react';
import { TableProperties } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { MatrixGrid } from './MatrixGrid';
import { CreateScopeModal } from './CreateScopeModal';

/**
 * MatrixView - Hierarchical Matrix Display
 *
 * Displays matrix analysis based on node hierarchy:
 * - Leaf nodes: Direct matrix grid
 * - Parent nodes: Tabs showing child node matrices
 */

interface MatrixViewProps {
  nodeId: string | null;
}

export function MatrixView({ nodeId }: MatrixViewProps) {
  const { nodes, matrixScopes } = useAppStore();

  // If no node selected, show empty state
  if (!nodeId) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <TableProperties className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Matrix Analysis</p>
          <p className="text-xs text-slate-400">Select a node to view its analysis matrix</p>
        </div>
      </div>
    );
  }

  const selectedNode = nodes.find((n) => n.id === nodeId);
  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-slate-500">Node not found</p>
      </div>
    );
  }

  // Determine if this is a leaf node or parent
  const childNodes = nodes.filter((n) => n.parentId === nodeId);
  const isLeaf = childNodes.length === 0;

  if (isLeaf) {
    // Leaf node: show matrix grid directly
    return <MatrixGridPlaceholder nodeId={nodeId} nodeName={selectedNode.title} />;
  }

  // Parent node: show tabs for each child
  return <ParentMatrixView nodeId={nodeId} nodeName={selectedNode.title} childNodes={childNodes} />;
}

/**
 * Parent Matrix View - Shows tabs for child nodes
 */
interface ParentMatrixViewProps {
  nodeId: string;
  nodeName: string;
  childNodes: Array<{
    id: string;
    title: string;
    projectId: string;
    parentId: string | null;
    description: string;
    level: number;
    order: number;
  }>;
}

function ParentMatrixView({ nodeId, nodeName, childNodes }: ParentMatrixViewProps) {
  const [selectedChildId, setSelectedChildId] = useState<string>(childNodes[0]?.id || '');

  return (
    <div className="h-full flex flex-col">
      {/* Child node tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 shrink-0">
        <div className="flex items-center gap-2 py-2 pr-4 border-r border-slate-200">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-xs font-medium text-slate-600">{nodeName}</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto flex-1">
          {childNodes.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                selectedChildId === child.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              )}
            >
              {child.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected child's matrix */}
      <div className="flex-1 overflow-hidden">
        {selectedChildId && (
          <MatrixGridPlaceholder
            nodeId={selectedChildId}
            nodeName={childNodes.find((c) => c.id === selectedChildId)?.title || ''}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Matrix Grid Container
 * Shows MatrixGrid if scope exists, or empty state to create scope
 */
function MatrixGridPlaceholder({ nodeId, nodeName }: { nodeId: string; nodeName: string }) {
  const { matrixScopes, currentUser } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Find scope for this node
  const scope = matrixScopes.find((s) => s.nodeId === nodeId);

  if (!scope) {
    // No scope defined yet - show empty state
    return (
      <>
        <div className="h-full flex items-center justify-center text-center p-8">
          <div className="max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center mx-auto mb-4">
              <TableProperties className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Define Matrix Scope</h3>
            <p className="text-xs text-slate-500 mb-4">
              Create a semantic search prompt to discover relevant documents and build your analysis matrix.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 text-left">
              <p className="text-[11px] font-medium text-slate-600 mb-1">Example:</p>
              <p className="text-[11px] text-slate-500 italic">
                "unit economics and pricing models of European competitors"
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Define Scope
            </button>
          </div>
        </div>

        {showCreateModal && (
          <CreateScopeModal
            nodeId={nodeId}
            nodeName={nodeName}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </>
    );
  }

  // Scope exists - show actual MatrixGrid
  return <MatrixGrid scope={scope} />;
}
