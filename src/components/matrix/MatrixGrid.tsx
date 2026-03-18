import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus, Sparkles, Download, FileText,
  Hash, AlignLeft, List, ToggleLeft, RefreshCw, Loader2,
  ChevronDown, ChevronRight, Maximize2, Minimize2, X, Check, Edit2,
  MessageSquare, Star,
  Globe, Database, Mic, Plug, HardDrive, Cloud, Building2, Package, BarChart3, TrendingUp, Terminal, Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { MatrixScope, MatrixColumn, MatrixCell, HypothesisSource, SourceCategory, ConnectorProvider } from '@/types';
import { SOURCES, CONNECTORS, CONNECTOR_SOURCES } from '@/data/mockData';
import { CreateHypothesisModal } from '../hypothesis/CreateHypothesisModal';
import { CreateScopeModal } from './CreateScopeModal';
import { DocumentDiscoveryChat } from './DocumentDiscoveryChat';
import { DocumentValidationModal } from './DocumentValidationModal';
import { ColumnTemplatePicker } from './ColumnTemplatePicker';
import { GenerationProgressOverlay } from './GenerationProgressOverlay';
import { SynthesisStrategyModal } from './SynthesisStrategyModal';
import { AddDocumentsModal } from './AddDocumentsModal';
import { analyzeSelectionGeometry } from '@/services/matrixSynthesis';
import { SourceLogo, ConnectorLogo, CATEGORY_COLORS, CONNECTOR_COLORS } from '@/components/ui/SourceLogo';
import { RelevanceBadge } from '@/components/ui/Badge';

interface MatrixGridProps {
  scope: MatrixScope;
  onTabChange?: (tab: 'chat' | 'matrix') => void;
  onOpenSources?: () => void;
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
export function MatrixGrid({ scope, onTabChange, onOpenSources }: MatrixGridProps) {
  console.log('[MatrixGrid] Rendered with onOpenSources:', !!onOpenSources, 'onTabChange:', !!onTabChange);
  const {
    matrixColumns,
    matrixCells,
    generateMatrixCell,
    toggleCellSelection,
    toggleCellFavorite,
    selectAllCellsInColumn,
    getSelectedCells,
    currentUser,
    refreshMatrixScope,
    updateScopeConversation,
    validateScopeDocuments,
    addMatrixColumnsFromTemplates,
    generateHypothesisWithStrategy,
    updateMatrixColumn,
    setMatrixChatContext,
    deselectAllCells,
    showOnlyFavorites,
    toggleShowOnlyFavorites,
    nodes,
    toggleSourceSelection,
    deselectAllNodeSources,
  } = useAppStore();

  const [showHypothesisModal, setShowHypothesisModal] = useState(false);
  const [matrixPrefillData, setMatrixPrefillData] = useState<{
    nodeId: string;
    title: string;
    body: string;
    sources: HypothesisSource[];
  } | null>(null);

  // New modals for Hebbia-style flow
  const [showDocumentChat, setShowDocumentChat] = useState(false);
  const [showEditScopeModal, setShowEditScopeModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [showSynthesisStrategyModal, setShowSynthesisStrategyModal] = useState(false);
  const [showAddDocumentsModal, setShowAddDocumentsModal] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState<string[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [selectedConnectors, setSelectedConnectors] = useState<ConnectorProvider[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterDropdownPosition, setFilterDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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

  // Update dropdown position when opening
  useEffect(() => {
    if (filterDropdownOpen && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setFilterDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
    }
  }, [filterDropdownOpen]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownOpen &&
        filterDropdownRef.current &&
        filterButtonRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterDropdownOpen]);

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

  // Select all cells in a row (source)
  const toggleRowSelection = (sourceId: string) => {
    // Find all cells for this source
    const rowCells = cells.filter(c => c.sourceId === sourceId && c.status === 'done');

    if (rowCells.length === 0) return;

    // Check if all cells in this row are already selected
    const allSelected = rowCells.every(c => c.isSelected);

    // Toggle selection for all cells in the row
    rowCells.forEach(cell => {
      if (allSelected && cell.isSelected) {
        // Deselect if all were selected
        toggleCellSelection(cell.id);
      } else if (!allSelected && !cell.isSelected) {
        // Select if not all were selected
        toggleCellSelection(cell.id);
      }
    });
  };

  // Select all cells in all rows
  const toggleAllRowsSelection = () => {
    const allCells = cells.filter(c => c.status === 'done');
    const allSelected = allCells.every(c => c.isSelected);

    if (allSelected) {
      deselectAllCells();
    } else {
      allCells.forEach(cell => {
        if (!cell.isSelected) {
          toggleCellSelection(cell.id);
        }
      });
    }
  };

  // Check if a row has all its cells selected
  const isRowSelected = (sourceId: string): boolean => {
    const rowCells = cells.filter(c => c.sourceId === sourceId && c.status === 'done');
    return rowCells.length > 0 && rowCells.every(c => c.isSelected);
  };

  // Filter columns for this scope
  const columns = useMemo(
    () => matrixColumns.filter((c) => c.matrixScopeId === scope.id).sort((a, b) => a.order - b.order),
    [matrixColumns, scope.id]
  );

  // Get cells for this scope
  const cells = useMemo(
    () => matrixCells.filter((c) => c.matrixScopeId === scope.id),
    [matrixCells, scope.id]
  );

  // Get sources for this scope - filter by favorites if enabled
  // Sort by order in discoveredSourceIds to show newly added documents at the bottom
  // IMPORTANT: Matrix only shows data room documents (data_room category or data_room connectors)
  const sources = useMemo(() => {
    // Combine regular sources and connector sources
    const allSources = [...SOURCES, ...CONNECTOR_SOURCES];

    // Helper function to check if a source is from a data room
    const isDataRoomSource = (source: typeof allSources[0]) => {
      // Direct data_room category
      if (source.category === 'data_room') return true;

      // Or connector with data_room category (Intralinks, Datasite)
      if (source.connectorId) {
        const connector = CONNECTORS.find(c => c.id === source.connectorId);
        return connector?.category === 'data_room';
      }

      return false;
    };

    let filtered: typeof allSources;

    if (!showOnlyFavorites) {
      filtered = allSources.filter((s) =>
        scope.discoveredSourceIds.includes(s.id) && isDataRoomSource(s)
      );
    } else {
      // Get unique source IDs from favorited cells
      const favoritedSourceIds = new Set(
        cells.filter(c => c.isFavorite).map(c => c.sourceId)
      );

      // Return only sources that have at least one favorited cell AND are data room sources
      filtered = allSources.filter(
        (s) => scope.discoveredSourceIds.includes(s.id) && favoritedSourceIds.has(s.id) && isDataRoomSource(s)
      );
    }

    // Filter by selected connectors
    if (selectedConnectors.length > 0) {
      filtered = filtered.filter(s => {
        if (s.connectorId) {
          return selectedConnectors.includes(s.connectorId as ConnectorProvider);
        }
        if (s.category === 'data_room') {
          return selectedConnectors.includes('datasite' as ConnectorProvider);
        }
        return false;
      });
    }

    // Sort by reliability score (descending - highest first)
    return filtered.sort((a, b) => b.reliabilityScore - a.reliabilityScore);
  }, [scope.discoveredSourceIds, showOnlyFavorites, cells, selectedConnectors]);

  // Count favorites
  const favoritesCount = useMemo(() => {
    return cells.filter(c => c.isFavorite).length;
  }, [cells]);

  // Get unique connectors from sources (before filtering by selected connectors)
  const availableConnectors = useMemo(() => {
    const allSources = [...SOURCES, ...CONNECTOR_SOURCES];
    const dataRoomSources = allSources.filter((s) => {
      if (s.category === 'data_room') return true;
      if (s.connectorId) {
        const connector = CONNECTORS.find(c => c.id === s.connectorId);
        return connector?.category === 'data_room';
      }
      return false;
    }).filter(s => scope.discoveredSourceIds.includes(s.id));

    const connectorIds = new Set<ConnectorProvider>();
    dataRoomSources.forEach(source => {
      if (source.connectorId) {
        connectorIds.add(source.connectorId as ConnectorProvider);
      } else if (source.category === 'data_room') {
        connectorIds.add('datasite' as ConnectorProvider);
      }
    });
    return CONNECTORS.filter(c => connectorIds.has(c.id));
  }, [scope.discoveredSourceIds]);

  // Toggle connector filter
  const toggleConnector = (connectorId: ConnectorProvider) => {
    setSelectedConnectors(prev =>
      prev.includes(connectorId)
        ? prev.filter(id => id !== connectorId)
        : [...prev, connectorId]
    );
  };

  // Cache reliability scores for performance
  const sourceScores = useMemo(() => {
    const scores = new Map<string, number>();
    sources.forEach(source => {
      scores.set(source.id, source.reliabilityScore);
    });
    return scores;
  }, [sources]);

  // Calculate stats
  const totalCells = sources.length * columns.length;
  const generatedCells = cells.filter((c) => c.status === 'done').length;
  const selectedCells = useMemo(
    () => cells.filter((c) => c.isSelected),
    [cells]
  );

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

  const handleAddDocuments = async (newSourceIds: string[], autoGenerate: boolean = false) => {
    // Add new documents to existing ones
    const allSourceIds = [...scope.discoveredSourceIds, ...newSourceIds];

    // Update documents - this will automatically create cells and generation jobs
    await validateScopeDocuments(scope.id, allSourceIds);

    // If auto-generate is requested, generate all cells for the new documents
    if (autoGenerate) {
      // Generate cells for all columns for the newly added documents
      for (const sourceId of newSourceIds) {
        for (const column of columns) {
          // Trigger generation for each cell
          generateMatrixCell(column.id, sourceId, scope.id);
        }
      }
    }

    setShowAddDocumentsModal(false);
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

  const handleColumnTemplateSelect = async (templateIds: string[], autoGenerate: boolean = true) => {
    if (!currentUser) return;

    console.log('[MatrixGrid] handleColumnTemplateSelect called with autoGenerate:', autoGenerate);

    // Add columns and auto-generate cells if requested
    await addMatrixColumnsFromTemplates(scope.id, templateIds, currentUser.id, autoGenerate);

    setShowColumnPicker(false);
  };

  const handleSynthesisStrategySelect = async (strategy: any) => {
    const selected = getSelectedCells();
    if (selected.length === 0 || !currentUser) return;

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
      // Generate hypothesis text using AI synthesis
      const hypothesisText = await generateHypothesisWithStrategy(strategy, context);

      // Prepare sources from selected cells
      const hypothesisSources: HypothesisSource[] = selected.map(cell => ({
        sourceId: cell.sourceId,
        excerpt: cell.value || '',
        addedBy: currentUser.id,
        addedAt: new Date().toISOString(),
        note: `From matrix column: ${columnLabels.get(cell.columnId) || 'Unknown'}`,
        matrixColumnId: cell.columnId,
        matrixCellId: cell.id,
      }));

      // Auto-generate title from strategy and cell count
      const strategyLabel = strategy === 'reliable_source' ? 'Most Reliable Source' :
                           strategy === 'intelligent_average' ? 'Intelligent Average' :
                           strategy === 'row_synthesis' ? 'Row Synthesis' :
                           'Global Synthesis';
      const autoTitle = `${strategyLabel}: Analysis from ${selected.length} sources`;

      // Prepare prefill data for CreateHypothesisModal
      setMatrixPrefillData({
        nodeId: scope.nodeId,
        title: autoTitle,
        body: hypothesisText,
        sources: hypothesisSources,
      });

      setShowHypothesisModal(true);
    } catch (error) {
      console.error('Synthesis failed:', error);
    }

    setShowSynthesisStrategyModal(false);
  };

  // Open chat with selected cells
  const handleOpenChatWithCells = () => {
    const selected = getSelectedCells();
    if (selected.length === 0) return;

    console.log('[MatrixGrid] handleOpenChatWithCells - selected cells:', selected.length);
    console.log('[MatrixGrid] onOpenSources function available:', !!onOpenSources);
    console.log('[MatrixGrid] onTabChange function available:', !!onTabChange);

    // Get unique source IDs from selected cells
    const uniqueSourceIds = [...new Set(selected.map(c => c.sourceId))];

    // Deselect all sources in this node first
    deselectAllNodeSources(scope.nodeId);

    // Select only the sources from the selected cells
    uniqueSourceIds.forEach(sourceId => {
      toggleSourceSelection(scope.nodeId, sourceId);
    });

    // Open the sidebar sources
    console.log('[MatrixGrid] Calling onOpenSources...');
    onOpenSources?.();

    // Get corresponding columns for selected cells
    const cellColumnIds = new Set(selected.map(c => c.columnId));
    const relevantColumns = columns.filter(col => cellColumnIds.has(col.id));

    // Set matrix chat context
    setMatrixChatContext(selected, relevantColumns, scope.nodeId, scope.id);

    // Switch to chat tab
    console.log('[MatrixGrid] Calling onTabChange with "chat"...');
    onTabChange?.('chat');

    // Optionally: deselect cells after opening chat
    deselectAllCells();
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
      <div className="bg-white border-b border-slate-200 px-6 py-3 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h2 className="text-sm italic text-slate-700 truncate">&ldquo;{scope.scopePrompt}&rdquo;</h2>
            {scope.scopePrompt && (
              <button
                onClick={() => setShowEditScopeModal(true)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                title="Edit discovery prompt"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Add documents button */}
            <button
              onClick={() => setShowAddDocumentsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Add documents
            </button>

            {/* Add columns button */}
            <button
              onClick={() => setShowColumnPicker(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add columns
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-200" />

            {/* Expand/collapse toggle */}
            <button
              onClick={toggleAllRows}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
              title={allExpanded ? "Collapse all" : "Expand all"}
            >
              {allExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Export button */}
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
        <div className="min-w-max pb-20">
          <table className="w-full border-separate border-spacing-0 border border-slate-200">
            {/* Table Header */}
            <thead className="sticky top-0 z-10 bg-slate-50 border-b-2 border-slate-300">
              <tr>
                {/* Documents column */}
                <th className="sticky left-0 z-20 bg-slate-50 px-4 py-3.5 text-left min-w-[180px] max-w-[250px] w-[220px] border-r border-slate-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={cells.filter(c => c.status === 'done').every(c => c.isSelected) && cells.filter(c => c.status === 'done').length > 0}
                      onChange={toggleAllRowsSelection}
                      className="rounded border-slate-300 cursor-pointer"
                    />
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
                        <FileText className="w-4 h-4" />
                        Documents

                        {/* Favorites filter button */}
                        <button
                          onClick={toggleShowOnlyFavorites}
                          className={cn(
                            'p-0.5 rounded hover:bg-slate-200 transition-colors ml-1',
                            showOnlyFavorites && 'bg-amber-100 hover:bg-amber-200'
                          )}
                          title={showOnlyFavorites ? "Show all documents" : "Show only favorites"}
                        >
                          <Star className={cn(
                            'w-3.5 h-3.5',
                            showOnlyFavorites ? 'text-amber-600 fill-current' : 'text-slate-500'
                          )} />
                        </button>

                        {/* Filter dropdown button */}
                        {availableConnectors.length > 0 && (
                          <>
                            <button
                              ref={filterButtonRef}
                              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                              className={cn(
                                "p-0.5 rounded hover:bg-slate-200 transition-colors ml-1",
                                selectedConnectors.length > 0 && "bg-blue-100 hover:bg-blue-200"
                              )}
                              title="Filter by source"
                            >
                              <ChevronDown className={cn(
                                "w-3.5 h-3.5",
                                selectedConnectors.length > 0 ? "text-blue-600" : "text-slate-500"
                              )} />
                            </button>

                            {/* Filter Dropdown - Rendered in portal */}
                            {filterDropdownOpen && filterDropdownPosition && createPortal(
                              <div
                                ref={filterDropdownRef}
                                className="fixed bg-white border border-slate-200 rounded-lg shadow-xl min-w-[200px] py-1"
                                style={{
                                  top: `${filterDropdownPosition.top}px`,
                                  left: `${filterDropdownPosition.left}px`,
                                  zIndex: 9999,
                                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                                }}
                              >
                                <div className="px-3 py-2 border-b border-slate-100">
                                  <span className="text-xs font-semibold text-slate-600">Filter by source</span>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                  {availableConnectors.map(connector => {
                                    const isSelected = selectedConnectors.includes(connector.id);
                                    const connectorData = CONNECTORS.find(c => c.id === connector.id);
                                    return (
                                      <button
                                        key={connector.id}
                                        onClick={() => toggleConnector(connector.id)}
                                        className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                                      >
                                        <div className={cn(
                                          "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0",
                                          isSelected ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                                        )}>
                                          {isSelected && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                          {connectorData ? (
                                            <ConnectorLogo
                                              src={connectorData.logoUrl}
                                              alt={connectorData.name}
                                              size={20}
                                              connectorId={connectorData.id}
                                            />
                                          ) : (
                                            <Plug className="w-4 h-4 text-slate-400" />
                                          )}
                                        </div>
                                        <span className="text-sm text-slate-700">{connector.name}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                                {selectedConnectors.length > 0 && (
                                  <>
                                    <div className="border-t border-slate-100" />
                                    <button
                                      onClick={() => {
                                        setSelectedConnectors([]);
                                        setFilterDropdownOpen(false);
                                      }}
                                      className="w-full px-3 py-2 text-left text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                    >
                                      Clear filters
                                    </button>
                                  </>
                                )}
                              </div>,
                              document.body
                            )}
                          </>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal normal-case">
                        {sources.length} document{sources.length > 1 ? 's' : ''}
                        {showOnlyFavorites && favoritesCount > 0 && ` · ${favoritesCount} favorite${favoritesCount > 1 ? 's' : ''}`}
                        {selectedConnectors.length > 0 && ` · ${selectedConnectors.length} source filter${selectedConnectors.length > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>
                </th>

                {/* Dynamic columns */}
                {columns.map((column, idx) => {
                  const Icon = TYPE_ICONS[column.type];
                  const width = getColumnWidth(column.id);
                  const isLastColumn = idx === columns.length - 1;

                  return (
                    <th
                      key={column.id}
                      className={cn(
                        "px-4 py-3.5 text-left relative group border-r border-slate-200/50",
                        isLastColumn && "last:border-r-0"
                      )}
                      style={{ width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide truncate">
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
                const isSelected = isRowSelected(source.id);

                // Determine color based on source type
                const connector = source.connectorId ? CONNECTORS.find(c => c.id === source.connectorId) : null;
                const colors = connector ? CONNECTOR_COLORS[connector.provider] : CATEGORY_COLORS[source.category];

                return (
                  <tr key={source.id} className={cn(
                    "border-b border-slate-100 hover:bg-slate-100/60 group/row transition-colors",
                    isExpanded && "bg-slate-50/30",
                    isSelected && "bg-blue-50/50"
                  )}>
                  {/* Document name */}
                  <td
                    className={cn(
                      "sticky left-0 z-10 bg-white group-hover/row:bg-slate-100 px-4 py-3 border-r border-slate-200 cursor-pointer min-w-[180px] max-w-[250px] w-[220px]",
                      isSelected && "bg-blue-50/50 group-hover/row:bg-blue-50/70"
                    )}
                    onClick={() => toggleRowSelection(source.id)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRowSelection(source.id)}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "rounded border-slate-300 cursor-pointer shrink-0 transition-opacity",
                          isSelected ? "opacity-100" : "opacity-0 group-hover/row:opacity-100"
                        )}
                      />
                      <div className={cn(
                        "relative rounded-lg px-3 py-2 flex-1 min-w-0",
                        isSelected ? "bg-blue-100" : "bg-slate-100"
                      )}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={cn("w-5 h-5 rounded flex items-center justify-center shrink-0 bg-white border", colors.border)}>
                            <SourceLogo source={source} size={16} />
                          </div>
                          <span className="text-sm text-slate-700 font-medium truncate">
                            {source.fileName || source.title}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <RelevanceBadge
                            score={sourceScores.get(source.id) || 0}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Cell values */}
                  {columns.map((column, colIdx) => {
                    const cell = cells.find(
                      (c) => c.columnId === column.id && c.sourceId === source.id
                    );
                    const width = getColumnWidth(column.id);
                    const isLastColumn = colIdx === columns.length - 1;

                    // Filter out non-favorite cells when showOnlyFavorites is active
                    const shouldHideCell = showOnlyFavorites && cell && !cell.isFavorite;

                    return (
                      <td
                        key={column.id}
                        className={cn(
                          "px-4 py-3 align-top border-r border-slate-200/50",
                          isLastColumn && "last:border-r-0"
                        )}
                        style={{ width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }}
                      >
                        {shouldHideCell ? (
                          <div className="text-xs text-slate-300 italic px-3 py-2">
                            Hidden (not favorited)
                          </div>
                        ) : (
                          <MatrixCellRenderer
                            cell={cell}
                            column={column}
                            onClick={() => cell && handleCellClick(cell)}
                            onSelect={() => cell && toggleCellSelection(cell.id)}
                            onOpenChat={() => {
                              if (cell) {
                                // Deselect all sources in this node first
                                deselectAllNodeSources(scope.nodeId);

                                // Select only this cell's source
                                toggleSourceSelection(scope.nodeId, cell.sourceId);

                                // Open the sidebar sources
                                onOpenSources?.();

                                const relevantColumn = columns.find(c => c.id === cell.columnId);
                                if (relevantColumn) {
                                  setMatrixChatContext([cell], [relevantColumn], scope.nodeId, scope.id);
                                  onTabChange?.('chat');
                                }
                              }
                            }}
                            onToggleFavorite={() => cell && toggleCellFavorite(cell.id)}
                            isExpanded={isExpanded}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
              })}
            </tbody>
          </table>

          {sources.length === 0 && showOnlyFavorites && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-1">
                No favorites yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the star icon on cells to mark them as favorites.
                Favorites help you quickly find important insights for building hypotheses.
              </p>
            </div>
          )}

          {sources.length === 0 && !showOnlyFavorites && (
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
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white px-6 py-3 flex items-center justify-between z-50 shadow-2xl">
          <span className="text-sm font-medium">{selectedCells.length} cell{selectedCells.length > 1 ? 's' : ''} selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenChatWithCells}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Discuss in chat ({selectedCells.length})
            </button>
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
      {showHypothesisModal && matrixPrefillData && (() => {
        // Find the node to get the correct projectId
        const node = nodes.find(n => n.id === scope.nodeId);
        const projectId = node?.projectId || '';

        return (
          <CreateHypothesisModal
            isOpen={showHypothesisModal}
            onClose={() => {
              setShowHypothesisModal(false);
              setMatrixPrefillData(null);
            }}
            nodeId={matrixPrefillData.nodeId}
            projectId={projectId}
            mode="from_synthesis"
            synthesisPrefillData={{
              ...matrixPrefillData,
              synthesis_id: `matrix-${Date.now()}`,
            }}
            onSuccess={() => {
              // Deselect cells after hypothesis creation
              deselectAllCells();
              setShowHypothesisModal(false);
              setMatrixPrefillData(null);
            }}
          />
        );
      })()}

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

      {/* Edit Scope Modal */}
      {showEditScopeModal && (
        <CreateScopeModal
          nodeId={scope.nodeId}
          nodeName={nodes.find(n => n.id === scope.nodeId)?.title || ''}
          onClose={() => setShowEditScopeModal(false)}
          existingScope={scope}
        />
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
          sourceCount={sources.length}
          nodeId={scope.nodeId}
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

      {/* Add Documents Modal */}
      <AddDocumentsModal
        open={showAddDocumentsModal}
        onClose={() => setShowAddDocumentsModal(false)}
        onConfirm={handleAddDocuments}
        currentSourceIds={scope.discoveredSourceIds}
        columnCount={columns.length}
        scopePrompt={scope.scopePrompt}
      />

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
  onOpenChat: () => void;
  onToggleFavorite: () => void;
  isExpanded?: boolean;
}

function MatrixCellRenderer({ cell, column, onClick, onSelect, onOpenChat, onToggleFavorite, isExpanded = false }: MatrixCellRendererProps) {
  if (!cell) {
    return (
      <div className="text-xs text-slate-400 italic">No cell data</div>
    );
  }

  const { status, value, isSelected, isFavorite } = cell;

  // Check if cell has N/D value (not available data)
  const isNoData = value && /^(n\/d|n\/a|na|nd)$/i.test(value.trim());

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
        'relative px-3 py-2 rounded-lg border transition-all group/cell',
        !isNoData && 'cursor-pointer hover:border-slate-300 hover:shadow-sm',
        isNoData && 'cursor-not-allowed bg-slate-50 opacity-60',
        !isNoData && 'border-slate-200',
        isNoData && 'border-slate-200',
        !isNoData && isSelected && 'border-slate-400 ring-2 ring-slate-200',
        !isNoData && isFavorite && (isSelected ? 'bg-amber-100' : 'bg-amber-100'),
        !isNoData && !isFavorite && 'bg-white',
        !isNoData && isSelected && !isFavorite && 'bg-slate-50'
      )}
      onClick={isNoData ? undefined : onSelect}
    >
      {/* Checkbox in top-right corner */}
      {!isNoData && (
        <div className={cn(
          'absolute top-2 right-2 transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover/cell:opacity-100'
        )}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded border-slate-300 cursor-pointer"
            title="Select cell"
          />
        </div>
      )}

      <div className={cn(
        "text-sm leading-relaxed pr-8 whitespace-pre-wrap",
        !isExpanded && "line-clamp-3",
        isNoData ? "text-slate-400 italic" : "text-slate-700"
      )}>
        {value}
      </div>

      {/* Action buttons - bottom-right corner */}
      {!isSelected && !isNoData && (
        <div className={cn(
          'absolute bottom-2 right-2 flex items-center gap-1',
          'opacity-0 group-hover/cell:opacity-100',
          'transition-opacity duration-200'
        )}>
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={cn(
              'p-1.5 rounded-full',
              'bg-white border shadow-sm',
              'transition-all duration-200',
              'pointer-events-none group-hover/cell:pointer-events-auto',
              isFavorite
                ? 'border-amber-400 text-amber-500 hover:bg-amber-50'
                : 'border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-300 hover:bg-amber-50'
            )}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={cn('w-3.5 h-3.5', isFavorite && 'fill-current')} />
          </button>

          {/* Chat button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenChat();
            }}
            className={cn(
              'p-1.5 rounded-full',
              'bg-white border border-slate-200 shadow-sm',
              'text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50',
              'transition-all duration-200',
              'pointer-events-none group-hover/cell:pointer-events-auto'
            )}
            title="Discuss in chat"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Show star if favorite, even when selected */}
      {isSelected && isFavorite && !isNoData && (
        <div className="absolute bottom-2 right-10">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
        </div>
      )}
    </div>
  );
}
