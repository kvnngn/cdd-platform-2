import { useState, useEffect, useRef } from 'react';
import {
  Search, Globe, FileText, Database, Mic, Zap, Send,
  ChevronDown, ChevronRight, ArrowLeft, Check, Plus,
  ThumbsUp, ThumbsDown, Link2, Sparkles, RefreshCw, X,
  HardDrive, Cloud, Building2, Package, BarChart3, TrendingUp, Terminal, Shield, Lock, Plug,
  Upload, File
} from 'lucide-react';
import { cn, formatDate, getSourceCategoryLabel } from '@/lib/utils';
import { Source, SourceCategory, ConnectorProvider, SyncStatus } from '@/types';
import { ALL_SOURCES, NODE_SOURCES, WORKSTREAM_NODES, CONNECTORS, CONNECTOR_SOURCES, CONNECTED_CONNECTORS } from '@/data/mockData';
import { useAppStore } from '@/store/appStore';
import { useDocumentViewer } from '@/store/documentViewerStore';
import { SourceLogo, ConnectorLogo, CATEGORY_ICONS, CATEGORY_COLORS } from '@/components/ui/SourceLogo';

// ─── Helper: Get all source IDs for a node (including children) ──────────────

function getNodeSourceIdsWithChildren(nodeId: string | null): string[] {
  if (!nodeId) return [];

  // Get direct sources for this node
  const directSources = NODE_SOURCES[nodeId] || [];

  // Find all children nodes
  const childNodes = WORKSTREAM_NODES.filter(n => n.parentId === nodeId);

  // Recursively get sources from children
  const childSources = childNodes.flatMap(child => getNodeSourceIdsWithChildren(child.id));

  // Combine and deduplicate
  return [...new Set([...directSources, ...childSources])];
}

// ─── Connector Icons & Colors ──────────────────────────────────────────────────

const CONNECTOR_ICONS: Record<ConnectorProvider, React.ComponentType<{ className?: string }>> = {
  google_drive: HardDrive,
  dropbox: Cloud,
  sharepoint: Building2,
  box: Package,
  capitaliq: BarChart3,
  pitchbook: TrendingUp,
  bloomberg: Terminal,
  intralinks: Shield,
  datasite: Database,
};

const CONNECTOR_COLORS: Record<ConnectorProvider, { text: string; bg: string; border: string; iconBg: string }> = {
  google_drive: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-500' },
  dropbox: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-500' },
  sharepoint: { text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', iconBg: 'bg-sky-500' },
  box: { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-slate-500' },
  capitaliq: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-500' },
  pitchbook: { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', iconBg: 'bg-rose-500' },
  bloomberg: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', iconBg: 'bg-orange-500' },
  intralinks: { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', iconBg: 'bg-cyan-500' },
  datasite: { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', iconBg: 'bg-violet-500' },
};

// ─── Mock search results ─────────────────────────────────────────────────────

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  icon: string;
  iconColor: string;
  url?: string;
}

const MOCK_SEARCH_RESULTS: Record<string, SearchResult[]> = {
  default: [
    { id: 'sr1', title: 'Retail Analytics Market Size & Growth Report 2026', snippet: 'Comprehensive market analysis covering key trends and forecasts.', icon: 'G', iconColor: 'bg-red-500' },
    { id: 'sr2', title: 'SaaS B2B Valuation Benchmarks — StratCap Research', snippet: 'Latest benchmarks for SaaS mid-market valuations in Europe.', icon: 'S', iconColor: 'bg-blue-600' },
    { id: 'sr3', title: 'DataSense vs Competitors — Feature Comparison', snippet: 'Independent analysis of retail analytics platforms capabilities.', icon: 'M', iconColor: 'bg-purple-600' },
  ],
};

// ─── Source Content Viewer ────────────────────────────────────────────────────

function SourceContentViewer({ source, onClose }: { source: Source; onClose: () => void }) {
  const cat = CATEGORY_COLORS[source.category];
  const Icon = CATEGORY_ICONS[source.category];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-slate-200 flex items-start gap-3">
        <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 mt-0.5">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 leading-tight">{source.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>{source.author}</span>
            <span>·</span>
            <span>{formatDate(source.publishedAt)}</span>
            <span>·</span>
            <span className={cn('font-semibold', source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500')}>
              Fiabilité: {source.reliabilityScore}%
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {source.content ? (
          <div className="prose prose-sm max-w-none">
            {source.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('#') || paragraph.startsWith('===')) return <h2 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-3">{paragraph.replace(/[#=]/g, '').trim()}</h2>;
              if (paragraph.match(/^\d+\./) || paragraph.startsWith('-') || paragraph.startsWith('•')) return <div key={idx} className="flex gap-2 mb-2"><span className="text-slate-400 shrink-0">{paragraph.match(/^\d+\./)?.[0] || '•'}</span><span className="text-slate-700">{paragraph.replace(/^\d+\.\s*/, '').replace(/^[-•]\s*/, '')}</span></div>;
              if (paragraph.trim() === '') return <div key={idx} className="h-4" />;
              return <p key={idx} className="text-sm text-slate-700 leading-relaxed mb-3">{paragraph}</p>;
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Preview not available</p>
            <p className="text-xs text-slate-400 mt-1">The full content of this source has not been imported.</p>
          </div>
        )}
      </div>
      {source.excerpt && (
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">Key Excerpt</div>
          <p className="text-xs text-slate-600 leading-relaxed">{source.excerpt}</p>
        </div>
      )}
    </div>
  );
}

// ─── Search Results Card ─────────────────────────────────────────────────────

function SearchResultsCard({ results, onImport, onDismiss }: {
  results: SearchResult[];
  onImport: () => void;
  onDismiss: () => void;
}) {
  const [showResults, setShowResults] = useState(true);

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden text-white">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium">Recherche rapide terminée !</span>
        </div>
        <button onClick={() => setShowResults(!showResults)} className="text-xs text-blue-300 hover:text-blue-200 underline">
          {showResults ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showResults && (
        <div className="px-4 pb-2 space-y-2">
          {results.map(r => (
            <div key={r.id} className="flex items-start gap-3 py-1.5">
              <div className={cn('w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold shrink-0', r.iconColor)}>
                {r.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{r.title}</div>
                <div className="text-xs text-slate-400 line-clamp-1">{r.snippet}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
            <Link2 className="w-3.5 h-3.5" />
            Sources supplémentaires : {results.length}
          </div>
        </div>
      )}

      <div className="px-4 py-3 border-t border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-slate-400 hover:text-white rounded transition-colors">
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-white rounded transition-colors">
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onDismiss} className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1">
            Supprimer
          </button>
          <button onClick={onImport} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Importer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Source checkbox row ─────────────────────────────────────────────────────

function SourceCheckRow({ source, isChecked, isLocked, onToggle, onViewContent }: {
  source: Source;
  isChecked: boolean;
  isLocked?: boolean; // Locked by matrix context - cannot be deselected
  onToggle: () => void;
  onViewContent: () => void;
}) {
  // Get connector info if source has a connector
  const connector = source.connectorId ? CONNECTORS.find(c => c.id === source.connectorId) : null;
  const Icon = connector ? (CONNECTOR_ICONS[connector.provider] || Plug) : CATEGORY_ICONS[source.category];
  const colors = connector ? CONNECTOR_COLORS[connector.provider] : CATEGORY_COLORS[source.category];

  return (
    <div className={cn(
      'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all group',
      isChecked ? 'hover:bg-slate-50' : 'opacity-40 hover:opacity-60',
      isLocked && 'bg-blue-50/50 border border-blue-100'
    )}>
      <button
        onClick={isLocked ? undefined : onToggle}
        disabled={isLocked}
        className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
          isLocked
            ? 'bg-blue-600 border-blue-600 text-white cursor-not-allowed'
            : isChecked
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'border-slate-300 hover:border-blue-400'
        )}
        title={isLocked ? 'Locked by matrix selection' : undefined}
      >
        {isChecked && <Check className="w-3.5 h-3.5" />}
      </button>

      {/* Source badge icon */}
      <div className={cn('w-6 h-6 rounded flex items-center justify-center shrink-0 bg-white border', colors.border)}>
        <SourceLogo source={source} size={16} />
      </div>

      <button onClick={onViewContent} className="flex-1 min-w-0 text-left group/title">
        <div className="flex items-center gap-1.5">
          <div className="text-xs font-medium text-slate-700 leading-tight line-clamp-2 group-hover/title:text-blue-600 transition-colors">
            {source.title}
          </div>
          {isLocked && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold shrink-0">
              Matrix
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
          <span className={cn('font-semibold', source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500')}>
            {source.reliabilityScore}%
          </span>
          {source.syncStatus && (
            <>
              <span>·</span>
              <SyncStatusBadge status={source.syncStatus} />
            </>
          )}
        </div>
      </button>
    </div>
  );
}

function getAggregatedSelectedSources(nodeId: string | null, getNodeSelectedSources: (id: string) => string[]): string[] {
  if (!nodeId) return [];

  // Get selected sources for this node
  const directSelected = getNodeSelectedSources(nodeId);

  // Find all children nodes
  const childNodes = WORKSTREAM_NODES.filter(n => n.parentId === nodeId);

  // Recursively get selected sources from children
  const childSelected = childNodes.flatMap(child => getAggregatedSelectedSources(child.id, getNodeSelectedSources));

  // Combine and deduplicate
  return [...new Set([...directSelected, ...childSelected])];
}

// ─── Connector Selection Modal ────────────────────────────────────────────────

interface ConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedConnectors: string[];
  onConnect: (connectorId: string) => void;
  onDisconnect: (connectorId: string) => void;
}

function ConnectorModal({ isOpen, onClose, connectedConnectors, onConnect, onDisconnect }: ConnectorModalProps) {
  if (!isOpen) return null;

  const connectorsByCategory = {
    cloud: CONNECTORS.filter(c => c.category === 'cloud'),
    financial_api: CONNECTORS.filter(c => c.category === 'financial_api'),
    data_room: CONNECTORS.filter(c => c.category === 'data_room'),
  };

  const categoryLabels: Record<string, string> = {
    cloud: 'Cloud Storage',
    financial_api: 'Financial APIs',
    data_room: 'Virtual Data Rooms',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Connect an application</h2>
            <p className="text-xs text-slate-500 mt-0.5">Import sources from your M&A tools</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(connectorsByCategory).map(([category, connectors]) => (
            <div key={category}>
              <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-2">
                {connectors.map(connector => {
                  const isConnected = connectedConnectors.includes(connector.id);
                  return (
                    <div
                      key={connector.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border transition-all',
                        isConnected
                          ? 'bg-slate-50 border-slate-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      )}
                    >
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-white border border-slate-100 overflow-hidden">
                        <ConnectorLogo src={connector.logoUrl} alt={connector.name} size={24} connectorId={connector.id} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900">{connector.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {isConnected ? 'Connected' : 'Not connected'}
                        </div>
                      </div>
                      <button
                        onClick={() => isConnected ? onDisconnect(connector.id) : onConnect(connector.id)}
                        className={cn(
                          'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                          isConnected
                            ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        )}
                      >
                        {isConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-[10px] text-slate-500 text-center">
            {connectedConnectors.length} application{connectedConnectors.length > 1 ? 's' : ''} connected
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Sync Status Badge ────────────────────────────────────────────────────────

function SyncStatusBadge({ status }: { status: SyncStatus }) {
  const statusConfig = {
    synced: { text: 'Up to date', color: 'text-emerald-600 bg-emerald-50' },
    syncing: { text: 'Syncing...', color: 'text-amber-600 bg-amber-50' },
    error: { text: 'Error', color: 'text-red-600 bg-red-50' },
    pending: { text: 'Pending', color: 'text-slate-600 bg-slate-50' },
  };
  const config = statusConfig[status];
  return (
    <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', config.color)}>
      {config.text}
    </span>
  );
}

// ─── Main SourcesPanel ───────────────────────────────────────────────────────

interface SourcesPanelProps {
  selectedSourceId: string | null;
  onSelectSource: (id: string | null) => void;
  nodeId: string | null;
}

export function SourcesPanel({ selectedSourceId, onSelectSource, nodeId }: SourcesPanelProps) {
  const { getNodeSelectedSources, toggleSourceSelection, selectAllNodeSources, deselectAllNodeSources, addSourceToNode, matrixChatContext, matrixScopes, matrixColumns } = useAppStore();
  const { openSourceDocument } = useDocumentViewer();

  // Track previously processed context to avoid duplicate auto-selection
  const previousContextRef = useRef<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'web' | 'deep'>('web');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  // Connector state
  const [showConnectorModal, setShowConnectorModal] = useState(false);
  const { connectedConnectors, connectConnector, disconnectConnector } = useAppStore();

  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<'all' | string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Drag & drop state
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSignalsGenerated, setShowSignalsGenerated] = useState(false);
  const [generatedSignalsCount, setGeneratedSignalsCount] = useState(0);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showFilterDropdown) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showFilterDropdown]);

  // Auto-select sources from matrix chat context
  useEffect(() => {
    if (!matrixChatContext || !nodeId) return;

    // Create a unique key for this context to avoid re-processing
    const contextKey = `${matrixChatContext.createdAt}-${matrixChatContext.cells.map(c => c.id).join(',')}`;

    // Skip if we've already processed this exact context
    if (previousContextRef.current === contextKey) return;

    // Extract unique source IDs from context cells
    const sourceIdsFromContext = [...new Set(matrixChatContext.cells.map(cell => cell.sourceId))];

    // Get currently selected sources for this node
    const currentlySelected = getNodeSelectedSources(nodeId);

    // Select sources that aren't already selected
    sourceIdsFromContext.forEach(sourceId => {
      if (!currentlySelected.includes(sourceId)) {
        toggleSourceSelection(nodeId, sourceId);
      }
    });

    // Update the ref to mark this context as processed
    previousContextRef.current = contextKey;
  }, [matrixChatContext, nodeId, getNodeSelectedSources, toggleSourceSelection]);

  // If a source is selected, show its content viewer
  if (selectedSourceId) {
    const source = ALL_SOURCES.find(s => s.id === selectedSourceId);
    if (source) {
      return <SourceContentViewer source={source} onClose={() => onSelectSource(null)} />;
    }
  }

  const nodeSourceIds = nodeId ? getNodeSourceIdsWithChildren(nodeId) : [];

  // Helper function to check if source has a real logo
  const hasRealLogo = (source: typeof ALL_SOURCES[0]): boolean => {
    // Has connector (real logo)
    if (source.connectorId) return true;

    // Data room (Datasite logo)
    if (source.category === 'data_room') return true;

    // API sources (Bloomberg, Capital IQ, etc.)
    if (source.category === 'api') return true;

    // Web sources
    if (source.category === 'web') return true;

    // Premium reports with known logos
    if (source.category === 'premium_report' && source.author) {
      const authorLower = source.author.toLowerCase();
      return authorLower.includes('gartner') ||
             authorLower.includes('euromonitor') ||
             authorLower.includes('mergermarket');
    }

    return false;
  };

  // Combine all sources (node sources + connector sources) - only sources with real logos
  const allSources = [...ALL_SOURCES, ...CONNECTOR_SOURCES]
    .filter((source, index, self) =>
      nodeSourceIds.includes(source.id) &&
      self.findIndex(s => s.id === source.id) === index &&
      hasRealLogo(source)
    );

  // Apply filter
  const filteredSources = selectedFilter === 'all'
    ? allSources
    : selectedFilter === 'web'
    ? allSources.filter(source => !source.connectorId && (source.category === 'web' || source.category === 'premium_report' || source.category === 'data_room' || source.category === 'api' || source.category === 'interview'))
    : allSources.filter(source => source.connectorId === selectedFilter);

  const selectedSources = nodeId ? getAggregatedSelectedSources(nodeId, getNodeSelectedSources) : [];
  const allSelected = nodeSourceIds.length > 0 && nodeSourceIds.every(id => selectedSources.includes(id));
  const noneSelected = selectedSources.length === 0;

  // Get source IDs from matrix context (these are locked and cannot be deselected)
  const matrixLockedSourceIds = matrixChatContext ? [...new Set(matrixChatContext.cells.map(cell => cell.sourceId))] : [];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults(MOCK_SEARCH_RESULTS.default);
      setIsSearching(false);
    }, 1500);
  };

  const handleImport = () => {
    if (!nodeId || !searchResults) return;

    // Import each search result as a new source
    searchResults.forEach(result => {
      const newSource: Omit<Source, 'id'> = {
        title: result.title,
        category: 'web',
        publishedAt: new Date().toISOString().split('T')[0],
        author: 'Web Search',
        excerpt: result.snippet,
        reliabilityScore: 70, // Default reliability for web sources
        content: `Content imported from web search:

${result.snippet}

Source: ${result.title}`,
      };
      addSourceToNode(nodeId, newSource);
    });

    setSearchResults(null);
    setSearchQuery('');
  };

  const handleDismiss = () => {
    setSearchResults(null);
  };

  const handleToggleAll = () => {
    if (!nodeId) return;
    if (allSelected) {
      deselectAllNodeSources(nodeId);
    } else {
      selectAllNodeSources(nodeId);
    }
  };

  // No node selected
  if (!nodeId) {
    return (
      <div className="h-full flex items-center justify-center text-center p-6">
        <div>
          <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500 mb-1">Sources</p>
          <p className="text-xs text-slate-400">Select a node in the workstream</p>
        </div>
      </div>
    );
  }

  // Handle connector connect/disconnect
  const handleConnect = (connectorId: string) => {
    connectConnector(connectorId);
  };

  const handleDisconnect = (connectorId: string) => {
    disconnectConnector(connectorId);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  // Generate demo signals for uploaded document
  const generateDemoSignals = (sourceId: string, scopeId: string) => {
    const scope = matrixScopes.find(s => s.id === scopeId);
    if (!scope) return;

    const columns = matrixColumns.filter(c => c.matrixScopeId === scopeId);
    const newCells: any[] = [];

    // Generate signals for each column
    columns.forEach(column => {
      let value = '';

      // Generate realistic content based on column type
      if (column.label.toLowerCase().includes('summary') || column.label.toLowerCase().includes('synthese')) {
        value = 'Expert confirms strong market dynamics in French SMB segment. Key insight: retailers prioritize verticalized solutions over generic analytics platforms. DataSense well-positioned with 23% YoY growth trajectory.';
      } else if (column.label.toLowerCase().includes('tam') || column.label.toLowerCase().includes('market size')) {
        value = 'TAM: €8.4B (2028) • SAM: €2.9B (France + Benelux) • SOM DataSense: €150M (5% market share achievable)';
      } else if (column.label.toLowerCase().includes('cagr') || column.label.toLowerCase().includes('growth')) {
        value = '19% CAGR (2024-2028) for verticalized retail analytics segment. Outpaces generic solutions at 15% CAGR.';
      } else if (column.label.toLowerCase().includes('risk') || column.label.toLowerCase().includes('risque')) {
        value = '⚠️ Switching costs lower than expected (6-9 months ROI) • ⚠️ New entrants from Salesforce ecosystem • ✅ Strong regulatory tailwind (ESG compliance)';
      } else if (column.label.toLowerCase().includes('competitive') || column.label.toLowerCase().includes('concurrence')) {
        value = 'Main competitors: Tableau (generic), Qlik (complex), PowerBI (limited retail). DataSense advantage: vertical focus + 118% NRR.';
      } else if (column.label.toLowerCase().includes('pricing') || column.label.toLowerCase().includes('prix')) {
        value = '€850/user/month (enterprise tier) • 25% premium vs. generic platforms justified by vertical specialization';
      } else {
        // Generic signal
        value = 'Strong validation from expert call. Confirms hypothesis with high confidence. See full transcript for details.';
      }

      newCells.push({
        id: `cell-${sourceId}-${column.id}`,
        columnId: column.id,
        sourceId: sourceId,
        matrixScopeId: scopeId,
        value: value,
        status: 'done' as const,
        generatedAt: new Date().toISOString(),
      });
    });

    // Add cells to store
    useAppStore.setState(state => ({
      matrixCells: [...state.matrixCells, ...newCells],
    }));

    // Show notification
    setGeneratedSignalsCount(newCells.length);
    setShowSignalsGenerated(true);
    setTimeout(() => setShowSignalsGenerated(false), 4000);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (!nodeId) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      // Find matrix scope for this node
      const scope = matrixScopes.find(s => s.nodeId === nodeId);

      // Process each dropped file
      for (const file of files) {
        const newSource: Omit<Source, 'id'> = {
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          fileName: file.name,
          category: 'data_room', // Expert calls go to data room
          publishedAt: new Date().toISOString().split('T')[0],
          author: 'Expert Call', // Default author for uploaded files
          excerpt: `Uploaded document: ${file.name}`,
          reliabilityScore: 85, // Default reliability for uploaded documents
          content: `Document uploaded: ${file.name}

Size: ${(file.size / 1024).toFixed(2)} KB
Type: ${file.type || 'Unknown'}

[Content would be extracted from the file]`,
        };

        // Add source to node (this also auto-selects it and updates matrix scope)
        const createdSource = addSourceToNode(nodeId, newSource);

        // Auto-generate demo signals for matrix
        if (scope) {
          // Small delay for visual effect
          setTimeout(() => {
            generateDemoSignals(createdSource.id, scope.id);
          }, 800);
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Signals Generated Notification */}
      {showSignalsGenerated && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              {generatedSignalsCount} signal{generatedSignalsCount > 1 ? 's' : ''} generated automatically
            </span>
          </div>
        </div>
      )}

      {/* ─── Section 1: Web Search ──────────────────────────────────────── */}
      <div className="px-3 py-3 border-b border-slate-100 shrink-0 space-y-2">
        {/* Search input */}
        <div className="flex items-start gap-1.5">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
            <textarea
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch(); } }}
              placeholder="Rechercher des sources..."
              rows={1}
              className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 outline-none resize-none leading-relaxed"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            className={cn(
              'p-2 rounded-lg transition-all shrink-0',
              searchQuery.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-300'
            )}
          >
            {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mode pills */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchMode('web')}
            className={cn(
              'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors border',
              searchMode === 'web'
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
            )}
          >
            <Globe className="w-3 h-3" />
            Web
          </button>
          <button
            onClick={() => setSearchMode('deep')}
            className={cn(
              'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors border',
              searchMode === 'deep'
                ? 'bg-violet-50 text-violet-600 border-violet-200'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
            )}
          >
            <Sparkles className="w-3 h-3" />
            Deep Research
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button
            onClick={() => setShowConnectorModal(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-colors border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:border-slate-300"
            title="Connect an application"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Search results */}
        {searchResults && (
          <SearchResultsCard
            results={searchResults}
            onImport={handleImport}
            onDismiss={handleDismiss}
          />
        )}

        {/* Searching state */}
        {isSearching && (
          <div className="bg-slate-800 rounded-xl px-4 py-4 text-center">
            <RefreshCw className="w-5 h-5 text-blue-400 animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-400">
              {searchMode === 'deep' ? 'Deep Research in progress...' : 'Web search in progress...'}
            </p>
          </div>
        )}
      </div>

      {/* ─── Drag & Drop Zone ───────────────────────────────────────────── */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'mx-3 my-2 border-2 border-dashed rounded-xl transition-all shrink-0',
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        )}
      >
        <div className="px-4 py-3 text-center">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <p className="text-xs font-medium text-blue-600">Uploading documents...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                isDragOver ? 'bg-blue-100' : 'bg-slate-100'
              )}>
                <Upload className={cn('w-5 h-5', isDragOver ? 'text-blue-600' : 'text-slate-400')} />
              </div>
              <div>
                <p className={cn(
                  'text-xs font-medium transition-colors',
                  isDragOver ? 'text-blue-600' : 'text-slate-600'
                )}>
                  {isDragOver ? 'Drop files here' : 'Drag & drop documents'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Expert calls, reports, meeting notes...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Source filter dropdown */}
      {connectedConnectors.length > 0 && (
        <div className="px-3 py-2 border-b border-slate-100 shrink-0">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFilterDropdown(!showFilterDropdown);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                {selectedFilter === 'all' ? (
                  <>All ({allSources.length})</>
                ) : selectedFilter === 'web' ? (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    Web ({allSources.filter(s => !s.connectorId).length})
                  </>
                ) : (
                  (() => {
                    const connector = CONNECTORS.find(c => c.id === selectedFilter);
                    if (!connector) return null;
                    const count = allSources.filter(s => s.connectorId === selectedFilter).length;
                    return (
                      <>
                        <div className="w-4 h-4 flex items-center justify-center">
                          <ConnectorLogo src={connector.logoUrl} alt={connector.name} size={14} connectorId={connector.id} />
                        </div>
                        {connector.name} ({count})
                      </>
                    );
                  })()
                )}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showFilterDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedFilter('all');
                    setShowFilterDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span>All</span>
                  <span className="text-slate-400">({allSources.length})</span>
                </button>

                {(() => {
                  const webCount = allSources.filter(s => !s.connectorId).length;
                  if (webCount === 0) return null;
                  return (
                    <button
                      onClick={() => {
                        setSelectedFilter('web');
                        setShowFilterDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Web</span>
                      <span className="ml-auto text-slate-400">({webCount})</span>
                    </button>
                  );
                })()}

                {connectedConnectors.map(connectorId => {
                  const connector = CONNECTORS.find(c => c.id === connectorId);
                  if (!connector) return null;
                  const count = allSources.filter(s => s.connectorId === connectorId).length;

                  return (
                    <button
                      key={connectorId}
                      onClick={() => {
                        setSelectedFilter(connectorId);
                        setShowFilterDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <ConnectorLogo src={connector.logoUrl} alt={connector.name} size={14} connectorId={connector.id} />
                      </div>
                      <span>{connector.name}</span>
                      <span className="ml-auto text-slate-400">({count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Section 2: Node sources with checkboxes ────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Select all header */}
        <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={handleToggleAll}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-800 transition-colors"
          >
            <div className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
              allSelected
                ? 'bg-blue-600 border-blue-600 text-white'
                : noneSelected
                  ? 'border-slate-300'
                  : 'bg-blue-200 border-blue-400 text-white'
            )}>
              {(allSelected || !noneSelected) && <Check className="w-3.5 h-3.5" />}
            </div>
            <span>Select all sources</span>
          </button>
          <span className="text-[10px] text-slate-400 font-medium">
            {selectedSources.length}/{nodeSourceIds.length}
          </span>
        </div>

        {/* Source list */}
        <div className="flex-1 overflow-y-auto px-1 py-1.5 space-y-0.5">
          {filteredSources.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-xs text-slate-400">
                {selectedFilter === 'all' ? 'No sources linked to this node' : 'No sources for this filter'}
              </p>
            </div>
          ) : (
            filteredSources.map(source => (
              <SourceCheckRow
                key={source.id}
                source={source}
                isChecked={selectedSources.includes(source.id)}
                isLocked={matrixLockedSourceIds.includes(source.id)}
                onToggle={() => nodeId && toggleSourceSelection(nodeId, source.id)}
                onViewContent={() => openSourceDocument(source.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* ─── Connector Modal ────────────────────────────────────────────── */}
      <ConnectorModal
        isOpen={showConnectorModal}
        onClose={() => setShowConnectorModal(false)}
        connectedConnectors={connectedConnectors}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
}
