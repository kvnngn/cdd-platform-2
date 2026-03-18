import { useState } from 'react';
import { X, ChevronDown, ChevronUp, TableProperties, FileText, BookOpen } from 'lucide-react';
import { SourceLogo } from '@/components/ui/SourceLogo';
import { cn } from '@/lib/utils';
import { MatrixChatContext } from '@/types/matrix';
import { SOURCES } from '@/data/mockData';
import { useAppStore } from '@/store/appStore';

interface MatrixContextCardProps {
  context: MatrixChatContext;
  onClear: () => void;
}

/**
 * MatrixContextCard - Display matrix cells context in chat
 * Shows selected cells with their column labels and source information
 */
export function MatrixContextCard({ context, onClear }: MatrixContextCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedNodeId, getNodeSelectedSources } = useAppStore();

  // Check if context is from current node
  const isFromCurrentNode = context.nodeId === selectedNodeId;

  // Group cells by column for better display
  const cellsByColumn = context.cells.reduce((acc, cell) => {
    const column = context.columns.find(col => col.id === cell.columnId);
    if (!column) return acc;

    if (!acc[column.id]) {
      acc[column.id] = {
        column,
        cells: [],
      };
    }
    acc[column.id].cells.push(cell);
    return acc;
  }, {} as Record<string, { column: typeof context.columns[0]; cells: typeof context.cells }>);

  // Get unique source IDs from matrix cells
  const matrixSourceIds = [...new Set(context.cells.map(c => c.sourceId))];

  // Get all selected sources for this node (includes manual selections)
  const allSelectedSourceIds = selectedNodeId ? getNodeSelectedSources(selectedNodeId) : [];

  // Total unique sources = matrix sources + additional manual selections
  const totalUniqueSourceIds = [...new Set([...matrixSourceIds, ...allSelectedSourceIds])];
  const sourceCount = totalUniqueSourceIds.length;

  // For small selections (≤3 cells), use simple list view
  const useSimpleView = context.cells.length <= 3 && !isExpanded;

  return (
    <div className={cn(
      'border rounded-lg overflow-hidden',
      isFromCurrentNode
        ? 'border-slate-200 bg-white shadow-sm'
        : 'border-amber-200 bg-amber-50'
    )}>
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TableProperties className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs font-medium text-slate-700">
            {context.cells.length} cell{context.cells.length > 1 ? 's' : ''} · {sourceCount} source{sourceCount > 1 ? 's' : ''}
          </span>
          {!isFromCurrentNode && (
            <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">
              Different node
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            title={isExpanded ? 'Collapse details' : 'Show details'}
          >
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={onClear}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear context"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simple list view for small selections */}
      {useSimpleView && (
        <div className="px-3 py-2 space-y-2">
          {context.cells.map(cell => {
            const column = context.columns.find(col => col.id === cell.columnId);
            const source = SOURCES.find(s => s.id === cell.sourceId);

            return (
              <div key={cell.id} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                    {column?.label}
                  </span>
                  {source && (
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 bg-white border border-slate-200">
                        <SourceLogo source={source} size={10} />
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {source.fileName || source.title}
                      </span>
                    </div>
                  )}
                </div>
                {cell.value && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cell.value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Preview (collapsed) for larger selections */}
      {!isExpanded && !useSimpleView && (
        <div className="px-3 py-2 space-y-2">
          {Object.values(cellsByColumn).slice(0, 2).map(({ column, cells }) => {
            const firstCell = cells[0];
            const source = SOURCES.find(s => s.id === firstCell.sourceId);

            return (
              <div key={column.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-900">
                    {column.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {source?.fileName || source?.title}
                    {cells.length > 1 && ` +${cells.length - 1}`}
                  </span>
                </div>
                {firstCell.value && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {firstCell.value}
                  </p>
                )}
              </div>
            );
          })}
          {Object.keys(cellsByColumn).length > 2 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
            >
              Show {Object.keys(cellsByColumn).length - 2} more column{Object.keys(cellsByColumn).length - 2 > 1 ? 's' : ''}...
            </button>
          )}
        </div>
      )}

      {/* Full details (expanded) */}
      {isExpanded && (
        <div className="px-3 py-2.5 space-y-3 max-h-96 overflow-y-auto">
          {Object.values(cellsByColumn).map(({ column, cells }) => (
            <div key={column.id} className="space-y-2">
              {/* Column header */}
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">
                  {column.label}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  {cells.length} cell{cells.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Column prompt */}
              {column.prompt && (
                <p className="text-[10px] text-slate-500 italic px-2 py-1 bg-slate-50 rounded">
                  "{column.prompt}"
                </p>
              )}

              {/* Cells */}
              <div className="space-y-2.5">
                {cells.map(cell => {
                  const source = SOURCES.find(s => s.id === cell.sourceId);
                  return (
                    <div key={cell.id} className="border-l-2 border-slate-200 pl-2.5 space-y-1">
                      {/* Source info */}
                      <div className="flex items-center gap-1.5">
                        {source && (
                          <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 bg-white border border-slate-200">
                            <SourceLogo source={source} size={12} />
                          </div>
                        )}
                        <span className="text-[11px] font-medium text-slate-700">
                          {source?.fileName || source?.title || 'Unknown source'}
                        </span>
                      </div>

                      {/* Cell value */}
                      {cell.value && (
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {cell.value}
                        </p>
                      )}

                      {/* Cell status */}
                      {cell.status !== 'done' && (
                        <span className="text-[10px] text-slate-400 italic">
                          Status: {cell.status}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer - Source count indicator */}
      <div className="px-3 py-1.5 border-t border-slate-100 flex items-center justify-end bg-slate-50">
        <span className="text-[11px] px-2 py-1 rounded-md font-medium inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200">
          <BookOpen className="w-3 h-3" />
          {sourceCount} source{sourceCount > 1 ? 's' : ''} selected
        </span>
      </div>
    </div>
  );
}
