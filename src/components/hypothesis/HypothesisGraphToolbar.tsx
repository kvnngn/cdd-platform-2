import { useEffect } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import type { GraphConfig, Pattern } from '@/types/graph';
import { cn } from '@/lib/utils';

interface HypothesisGraphToolbarProps {
  showPatterns: boolean;
  onTogglePatterns: () => void;
  detectedPatterns: Pattern[];
  onHighlightPattern: (nodeIds: string[]) => void;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  expandedNodeIds: Set<string>;
  totalNodeCount: number;
}

export function HypothesisGraphToolbar({
  showPatterns,
  onTogglePatterns,
  detectedPatterns,
  onHighlightPattern,
  onExpandAll,
  onCollapseAll,
  expandedNodeIds,
  totalNodeCount,
}: HypothesisGraphToolbarProps) {
  // Determine if tree is fully expanded
  const allExpanded = expandedNodeIds.size === totalNodeCount;

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        if (allExpanded && onCollapseAll) {
          onCollapseAll();
        } else if (onExpandAll) {
          onExpandAll();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allExpanded, onCollapseAll, onExpandAll]);

  return (
    <>
      {/* Expand/Collapse All Toggle - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={allExpanded ? onCollapseAll : onExpandAll}
          className="group flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium text-slate-700"
          title={`${allExpanded ? 'Collapse' : 'Expand'} all nodes (${navigator.platform.includes('Mac') ? '⌘E' : 'Ctrl+E'})`}
        >
          {allExpanded ? (
            <>
              <Minimize2 className="w-4 h-4 transition-transform group-hover:scale-95" />
              <span>Collapse All</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Expand All</span>
            </>
          )}
        </button>
      </div>

      {/* Pattern Overlay Panel */}
      {showPatterns && detectedPatterns.length > 0 && (
        <div className="absolute top-20 left-4 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-sm z-10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-slate-800">Patterns Détectés</h4>
            <button onClick={onTogglePatterns}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {detectedPatterns.map((pattern, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3 rounded-lg border-l-4 text-sm",
                  pattern.severity === 'critical' && "bg-red-50 border-red-500",
                  pattern.severity === 'warning' && "bg-amber-50 border-amber-500",
                  pattern.severity === 'info' && "bg-blue-50 border-blue-500"
                )}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 mb-1">
                      {pattern.type === 'hub' && '⭐ Hub Central'}
                      {pattern.type === 'isolated' && '🔸 Isolé'}
                      {pattern.type === 'contradiction_loop' && '⚠️ Contradiction Loop'}
                      {pattern.type === 'support_cluster' && '✓ Cluster de Support'}
                      {pattern.type === 'chain' && '⛓️ Chaîne Logique'}
                    </p>
                    <p className="text-xs text-slate-600">{pattern.description}</p>
                    <button
                      onClick={() => onHighlightPattern(pattern.nodeIds)}
                      className="text-xs text-blue-600 hover:underline mt-1"
                    >
                      Highlight {pattern.nodeIds.length} hypothesis(es)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
