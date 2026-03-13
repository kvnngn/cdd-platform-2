import { X, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import type { GraphConfig, Pattern } from '../../types/graph';
import { cn } from '../../lib/utils';

interface HypothesisGraphToolbarProps {
  showPatterns: boolean;
  onTogglePatterns: () => void;
  detectedPatterns: Pattern[];
  onHighlightPattern: (nodeIds: string[]) => void;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
}

export function HypothesisGraphToolbar({
  showPatterns,
  onTogglePatterns,
  detectedPatterns,
  onHighlightPattern,
  onExpandAll,
  onCollapseAll,
}: HypothesisGraphToolbarProps) {
  return (
    <>
      {/* Expand/Collapse All Controls - Top Left */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-md border border-slate-200 p-2 flex items-center gap-1">
        <button
          onClick={onExpandAll}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors group"
          title="Expand all nodes"
        >
          <ChevronsDownUp className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
        </button>
        <div className="h-6 w-px bg-slate-200" />
        <button
          onClick={onCollapseAll}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors group"
          title="Collapse all nodes"
        >
          <ChevronsUpDown className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
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
