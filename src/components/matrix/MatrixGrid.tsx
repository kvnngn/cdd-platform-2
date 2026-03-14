import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, Sparkles, Download, FileText, GripVertical,
  Hash, AlignLeft, List, ToggleLeft, RefreshCw, Loader2,
  ChevronDown, ChevronRight, Maximize2, Minimize2, X, Check, Edit2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { MatrixScope, MatrixColumn, MatrixCell } from '@/types';
import { SOURCES } from '@/data/mockData';
import { ColumnHypothesisModal } from './ColumnHypothesisModal';
import { DocumentDiscoveryChat } from './DocumentDiscoveryChat';
import { DocumentValidationModal } from './DocumentValidationModal';
import { ColumnTemplatePicker } from './ColumnTemplatePicker';
import { GenerationProgressOverlay } from './GenerationProgressOverlay';
import { SynthesisStrategyModal } from './SynthesisStrategyModal';
import { analyzeSelectionGeometry } from '@/services/matrixSynthesis';

interface MatrixGridProps {
  scope: MatrixScope;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  text: AlignLeft,
  number: Hash,
  list: List,
  boolean: ToggleLeft,
};

/**
 * MatrixGrid - Table view for matrix analysis
 * Inspired by document analysis UI with rich cell content
 */
export function MatrixGrid({ scope }: MatrixGridProps) {
  const {
    matrixColumns,
    matrixCells,
    generateMatrixCell,
    toggleCellSelection,
    selectAllCellsInColumn,
    getSelectedCells,
    currentUser,
    refreshMatrixScope,
    updateScopeConversation,
    validateScopeDocuments,
    addMatrixColumnsFromTemplates,
    generateHypothesisWithStrategy,
    updateMatrixColumn,
  } = useAppStore();

  const [showHypothesisModal, setShowHypothesisModal] = useState(false);
  const [hypothesisColumn, setHypothesisColumn] = useState<MatrixColumn | null>(null);

  // New modals for Hebbia-style flow
  const [showDocumentChat, setShowDocumentChat] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [showSynthesisStrategyModal, setShowSynthesisStrategyModal] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState<string[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  // Column resize state - Load from localStorage
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(`matrix-column-widths-${scope.id}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(0);

  // Save column widths to localStorage when they change
  useEffect(() => {
    if (Object.keys(columnWidths).length > 0) {
      localStorage.setItem(`matrix-column-widths-${scope.id}`, JSON.stringify(columnWidths));
    }
  }, [columnWidths, scope.id]);

  // Row expand/collapse state - Default: all collapsed
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set()); // Empty set = all collapsed
  const [allExpanded, setAllExpanded] = useState(false);

  // Column prompt editing state
  const [editingPromptColumnId, setEditingPromptColumnId] = useState<string | null>(null);
  const [editingPromptValue, setEditingPromptValue] = useState<string>('');

  // Tooltip state
  const [hoveredPromptColumnId, setHoveredPromptColumnId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Batch generation state
  const [isGeneratingColumn, setIsGeneratingColumn] = useState<string | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const toggleRow = (sourceId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  const toggleAllRows = () => {
    if (allExpanded) {
      setExpandedRows(new Set());
      setAllExpanded(false);
    } else {
      setExpandedRows(new Set(sources.map(s => s.id)));
      setAllExpanded(true);
    }
  };

  // Filter columns for this scope
  const columns = useMemo(
    () => matrixColumns.filter((c) => c.matrixScopeId === scope.id).sort((a, b) => a.order - b.order),
    [matrixColumns, scope.id]
  );

  // Get sources for this scope
  const sources = useMemo(
    () => SOURCES.filter((s) => scope.discoveredSourceIds.includes(s.id)),
    [scope.discoveredSourceIds]
  );

  // Get cells for this scope
  const cells = useMemo(
    () => matrixCells.filter((c) => c.matrixScopeId === scope.id),
    [matrixCells, scope.id]
  );

  // Calculate stats
  const totalCells = sources.length * columns.length;
  const generatedCells = cells.filter((c) => c.status === 'done').length;
  const selectedCells = cells.filter((c) => c.isSelected);

  const handleCellClick = (cell: MatrixCell) => {
    if (cell.status === 'idle') {
      generateMatrixCell(cell.columnId, cell.sourceId, scope.id);
    } else if (cell.status === 'error') {
      generateMatrixCell(cell.columnId, cell.sourceId, scope.id);
    }
  };

  const handleSelectAll = (columnId: string) => {
    selectAllCellsInColumn(columnId, scope.id);
  };

  const handleGenerateHypothesis = () => {
    const selected = getSelectedCells();
    if (selected.length === 0) return;

    // Analyze selection geometry to determine strategy
    const { geometry, recommendedStrategy } = analyzeSelectionGeometry(selected);

    // If same_column, show strategy modal for user choice
    // Otherwise, auto-select strategy
    setShowSynthesisStrategyModal(true);
  };

  const handleDocumentChatValidate = (selectedSourceIds: string[], searchPrompt: string) => {
    setPendingDocuments(selectedSourceIds);
    setPendingPrompt(searchPrompt);
    setShowDocumentChat(false);
    setShowValidationModal(true);
  };

  const handleValidateDocuments = async (finalSourceIds: string[]) => {
    // Update documents
    await validateScopeDocuments(scope.id, finalSourceIds);

    // Update scope prompt if it changed
    if (pendingPrompt && pendingPrompt.trim() !== scope.scopePrompt && currentUser) {
      await refreshMatrixScope(scope.id, pendingPrompt.trim(), currentUser.id);
    }

    setShowValidationModal(false);
    setPendingDocuments([]);
    setPendingPrompt(null);
  };

  // Generate all cells in a column
  const handleGenerateColumn = async (columnId: string) => {
    setIsGeneratingColumn(columnId);

    try {
      // Get all cells for this column that are not generated
      const columnCells = cells.filter(
        c => c.columnId === columnId && (c.status === 'idle' || c.status === 'error')
      );

      // Generate each cell
      for (const cell of columnCells) {
        await generateMatrixCell(cell.columnId, cell.sourceId, scope.id);
      }
    } finally {
      setIsGeneratingColumn(null);
    }
  };

  // Generate all cells in the entire table
  const handleGenerateAll = async () => {
    setIsGeneratingAll(true);

    try {
      // Get all cells that are not generated
      const pendingCells = cells.filter(c => c.status === 'idle' || c.status === 'error');

      // Generate each cell
      for (const cell of pendingCells) {
        await generateMatrixCell(cell.columnId, cell.sourceId, scope.id);
      }
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const handleColumnTemplateSelect = async (templateIds: string[]) => {
    if (!currentUser) return;
    await addMatrixColumnsFromTemplates(scope.id, templateIds, currentUser.id);
    setShowColumnPicker(false);
  };

  const handleSynthesisStrategySelect = async (strategy: any) => {
    const selected = getSelectedCells();
    if (selected.length === 0) return;

    // Build context for synthesis
    const columnLabels = new Map(columns.map(c => [c.id, c.label]));
    const sourceNames = new Map(sources.map(s => [s.id, s.fileName || s.title]));
    const { geometry } = analyzeSelectionGeometry(selected);

    const context = {
      strategy,
      selectedCells: selected,
      selectionGeometry: geometry,
      columnLabels,
      sourceNames,
    };

    try {
      const hypothesisText = await generateHypothesisWithStrategy(strategy, context);

      // Create hypothesis (existing flow via ColumnHypothesisModal)
      const firstCell = selected[0];
      const column = columns.find((c) => c.id === firstCell.columnId);
      if (column) {
        setHypothesisColumn(column);
        setShowHypothesisModal(true);
      }
    } catch (error) {
      console.error('Synthesis failed:', error);
    }

    setShowSynthesisStrategyModal(false);
  };


  // Column resize handlers
  const handleResizeStart = useCallback((columnId: string, startX: number, currentWidth: number) => {
    setResizingColumn(columnId);
    resizeStartX.current = startX;
    resizeStartWidth.current = currentWidth;
  }, []);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn) return;

    const delta = e.clientX - resizeStartX.current;
    const newWidth = Math.max(200, Math.min(800, resizeStartWidth.current + delta));

    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth,
    }));
  }, [resizingColumn]);

  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null);
  }, []);

  // Set up global mouse event listeners for resize
  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  // Helper to get column width
  const getColumnWidth = (columnId: string) => {
    return columnWidths[columnId] || 320; // Default 320px
  };

  // Reset column widths to default
  const handleResetColumnWidths = () => {
    setColumnWidths({});
    localStorage.removeItem(`matrix-column-widths-${scope.id}`);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h2 className="text-sm font-medium text-slate-900 truncate">{scope.scopePrompt}</h2>
            {scope.scopePrompt && (
              <button
                onClick={() => setShowDocumentChat(true)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                title="Edit discovery prompt"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {!scope.scopePrompt && (
              <button
                onClick={() => setShowDocumentChat(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                title="Discover documents"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Discover
              </button>
            )}
            <button
              onClick={toggleAllRows}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
              title={allExpanded ? "Collapse all" : "Expand all"}
            >
              {allExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowColumnPicker(true)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
              title="Add columns"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleGenerateAll}
              disabled={isGeneratingAll}
              className="p-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors disabled:opacity-50"
              title="Generate all"
            >
              {isGeneratingAll ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => {/* TODO: Export CSV */}}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto overflow-y-auto relative">
        {/* Scroll indicator */}
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-20" />
        <div className="min-w-max">
          <table className="w-full border-separate border-spacing-0">
            {/* Table Header */}
            <thead className="bg-white sticky top-0 z-10 border-b border-slate-200">
              <tr>
                {/* Checkbox column */}
                <th className="w-12 px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>

                {/* Documents column */}
                <th className="px-4 py-3 text-left min-w-[200px]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    <FileText className="w-4 h-4" />
                    Documents
                  </div>
                </th>

                {/* Dynamic columns */}
                {columns.map((column) => {
                  const Icon = TYPE_ICONS[column.type];
                  const width = getColumnWidth(column.id);

                  return (
                    <th
                      key={column.id}
                      className="px-4 py-3 text-left relative group"
                      style={{ width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide truncate">
                              {column.label}
                            </span>
                            {column.isSystemGenerated && (
                              <Sparkles className="w-3 h-3 text-slate-400 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleGenerateColumn(column.id)}
                              disabled={isGeneratingColumn === column.id}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-100 rounded disabled:opacity-50"
                              title="Generate all cells in this column"
                            >
                              {isGeneratingColumn === column.id ? (
                                <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                              ) : (
                                <Sparkles className="w-3 h-3 text-blue-600" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setEditingPromptColumnId(column.id);
                                setEditingPromptValue(column.prompt);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded"
                              title="Edit prompt"
                            >
                              <Edit2 className="w-3 h-3 text-slate-400" />
                            </button>
                            <button
                              onClick={() => handleSelectAll(column.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded"
                              title="Select all"
                            >
                              <Check className="w-3 h-3 text-slate-400" />
                            </button>
                          </div>
                        </div>

                        {/* Prompt display/edit */}
                        {editingPromptColumnId === column.id ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              value={editingPromptValue}
                              onChange={(e) => setEditingPromptValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.metaKey) {
                                  updateMatrixColumn(column.id, { prompt: editingPromptValue });
                                  setEditingPromptColumnId(null);
                                } else if (e.key === 'Escape') {
                                  setEditingPromptColumnId(null);
                                }
                              }}
                              className="w-full px-3 py-2 text-xs border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              rows={3}
                              autoFocus
                              placeholder="Enter column prompt..."
                            />
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  updateMatrixColumn(column.id, { prompt: editingPromptValue });
                                  setEditingPromptColumnId(null);
                                }}
                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingPromptColumnId(null)}
                                className="px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            ref={tooltipRef}
                            className="text-[10px] text-slate-500 italic line-clamp-1 cursor-pointer hover:text-slate-700"
                            onClick={() => {
                              setEditingPromptColumnId(column.id);
                              setEditingPromptValue(column.prompt);
                            }}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setTooltipPosition({
                                top: rect.top - 8,
                                left: rect.left,
                              });
                              setHoveredPromptColumnId(column.id);
                            }}
                            onMouseLeave={() => {
                              setHoveredPromptColumnId(null);
                              setTooltipPosition(null);
                            }}
                          >
                            {column.prompt}
                          </div>
                        )}
                      </div>

                      {/* Resize handle */}
                      <div
                        className={cn(
                          "absolute top-3 right-0 w-1.5 bottom-3 cursor-col-resize transition-all",
                          resizingColumn === column.id
                            ? "bg-slate-500 opacity-100"
                            : "bg-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-400"
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleResizeStart(column.id, e.clientX, width);
                        }}
                        title="Drag to resize column"
                      >
                        {/* Visual dots for better visibility */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                          <div className="w-0.5 h-0.5 rounded-full bg-white/60" />
                          <div className="w-0.5 h-0.5 rounded-full bg-white/60" />
                          <div className="w-0.5 h-0.5 rounded-full bg-white/60" />
                        </div>

                        {/* Width indicator during resize */}
                        {resizingColumn === column.id && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs font-medium rounded shadow-lg whitespace-nowrap">
                            {width}px
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white">
              {sources.map((source, idx) => {
                const isExpanded = expandedRows.has(source.id);

                return (
                  <tr key={source.id} className={cn(
                    "border-b border-slate-100 hover:bg-slate-50/50 group transition-colors",
                    isExpanded && "bg-slate-50/30"
                  )}>
                    {/* Checkbox + Expand button */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRow(source.id)}
                          className={cn(
                            "p-1 rounded transition-all",
                            isExpanded
                              ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                              : "hover:bg-slate-200 text-slate-500"
                          )}
                          title={isExpanded ? "Collapse row" : "Expand row"}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-xs text-slate-400 font-medium">{idx + 1}</span>
                        <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 cursor-move" />
                      </div>
                    </td>

                  {/* Document name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="text-sm text-slate-700 font-medium truncate">
                        {source.fileName || source.title}
                      </span>
                    </div>
                  </td>

                  {/* Cell values */}
                  {columns.map((column) => {
                    const cell = cells.find(
                      (c) => c.columnId === column.id && c.sourceId === source.id
                    );
                    const width = getColumnWidth(column.id);

                    return (
                      <td
                        key={column.id}
                        className="px-4 py-3 align-top"
                        style={{ width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }}
                      >
                        <MatrixCellRenderer
                          cell={cell}
                          column={column}
                          onClick={() => cell && handleCellClick(cell)}
                          onSelect={() => cell && toggleCellSelection(cell.id)}
                          isExpanded={isExpanded}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
              })}
            </tbody>
          </table>

          {sources.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-500">No documents discovered</p>
              <p className="text-xs text-slate-400 mt-1">
                Adjust your scope prompt or add documents manually
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer with bulk actions */}
      {selectedCells.length > 0 && (
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shrink-0">
          <span className="text-sm font-medium">{selectedCells.length} cells selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateHypothesis}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate hypothesis
            </button>
            <button className="px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              Export
            </button>
          </div>
        </div>
      )}

      {/* Hypothesis Modal */}
      {showHypothesisModal && hypothesisColumn && (
        <ColumnHypothesisModal
          column={hypothesisColumn}
          selectedCells={getSelectedCells()}
          onClose={() => {
            setShowHypothesisModal(false);
            setHypothesisColumn(null);
          }}
          onSuccess={() => {
            // Success handled - cells will be deselected by modal
          }}
        />
      )}

      {/* Document Discovery Chat Modal */}
      {showDocumentChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Discover Documents</h2>
              <button
                onClick={() => setShowDocumentChat(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DocumentDiscoveryChat
                nodeId={scope.nodeId}
                onValidate={handleDocumentChatValidate}
              />
            </div>
          </div>
        </div>
      )}

      {/* Document Validation Modal */}
      {showValidationModal && (
        <DocumentValidationModal
          open={showValidationModal}
          onClose={() => {
            setShowValidationModal(false);
            setPendingDocuments([]);
          }}
          onConfirm={handleValidateDocuments}
          currentSourceIds={scope.discoveredSourceIds}
          newSourceIds={pendingDocuments}
          columnCount={columns.length}
        />
      )}

      {/* Column Template Picker */}
      {showColumnPicker && (
        <ColumnTemplatePicker
          open={showColumnPicker}
          onClose={() => setShowColumnPicker(false)}
          onSelect={handleColumnTemplateSelect}
        />
      )}

      {/* Synthesis Strategy Modal */}
      {showSynthesisStrategyModal && (() => {
        const selected = getSelectedCells();
        if (selected.length === 0) return null;

        const { geometry, recommendedStrategy } = analyzeSelectionGeometry(selected);

        return (
          <SynthesisStrategyModal
            open={showSynthesisStrategyModal}
            onClose={() => setShowSynthesisStrategyModal(false)}
            onSelect={handleSynthesisStrategySelect}
            geometry={geometry}
            recommendedStrategy={recommendedStrategy}
          />
        );
      })()}

      {/* Generation Progress Overlay */}
      <GenerationProgressOverlay
        matrixScopeId={scope.id}
        columnLabels={new Map(columns.map(c => [c.id, c.label]))}
      />

      {/* Tooltip Portal */}
      {hoveredPromptColumnId && tooltipPosition && createPortal(
        <div
          className="fixed z-[9999] px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-xl max-w-sm whitespace-normal pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateY(-100%)',
          }}
        >
          {columns.find(c => c.id === hoveredPromptColumnId)?.prompt}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
        </div>,
        document.body
      )}
    </div>
  );
}

/**
 * Cell Renderer - Displays individual cell with different states
 */
interface MatrixCellRendererProps {
  cell?: MatrixCell;
  column: MatrixColumn;
  onClick: () => void;
  onSelect: () => void;
  isExpanded?: boolean;
}

function MatrixCellRenderer({ cell, column, onClick, onSelect, isExpanded = false }: MatrixCellRendererProps) {
  if (!cell) {
    return (
      <div className="text-xs text-slate-400 italic">No cell data</div>
    );
  }

  const { status, value, isSelected } = cell;

  // Idle state - show generate button
  if (status === 'idle') {
    return (
      <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 border-2 border-dashed border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50/50 transition-colors group"
      >
        <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-700">
          <Sparkles className="w-3 h-3" />
          <span>Generate</span>
        </div>
      </button>
    );
  }

  // Generating state
  if (status === 'generating') {
    return (
      <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/30">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Generating...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs text-red-600">
          <RefreshCw className="w-3 h-3" />
          <span>Retry</span>
        </div>
      </button>
    );
  }

  // Done state - show content
  return (
    <div
      className={cn(
        'relative px-3 py-2 rounded-lg border transition-all cursor-pointer group',
        isSelected
          ? 'border-slate-400 bg-slate-50 ring-2 ring-slate-200'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      )}
      onClick={onSelect}
    >
      {/* Checkbox in top-right on hover */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute top-2 right-2 rounded border-slate-300 transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
      />

      <div className={cn(
        "text-sm text-slate-700 leading-relaxed pr-6 whitespace-pre-wrap",
        !isExpanded && "line-clamp-3"
      )}>
        {value}
      </div>

      {/* Generated timestamp */}
      {cell.generatedAt && (
        <div className="mt-2 text-[10px] text-slate-400">
          Generated {new Date(cell.generatedAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
