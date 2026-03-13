import { useState } from 'react';
import {
  Search, Globe, FileText, Database, Mic, Zap, Send,
  ChevronDown, ChevronRight, ArrowLeft, Check, Plus,
  ThumbsUp, ThumbsDown, Link2, Sparkles, RefreshCw, X,
  HardDrive, Cloud, Building2, Package, BarChart3, TrendingUp, Terminal, Shield, Lock, Plug
} from 'lucide-react';
import { cn, formatDate, getSourceCategoryLabel } from '../../lib/utils';
import { Source, SourceCategory, ConnectorProvider, SyncStatus } from '../../types';
import { SOURCES, NODE_SOURCES, WORKSTREAM_NODES, CONNECTORS, CONNECTOR_SOURCES, CONNECTED_CONNECTORS } from '../../data/mockData';
import { useAppStore } from '../../store/appStore';

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

// ─── Shared constants ────────────────────────────────────────────────────────

export const CATEGORY_ICONS: Record<SourceCategory, React.ComponentType<{ className?: string }>> = {
  data_room: FileText,
  premium_report: Database,
  api: Database,
  web: Globe,
  interview: Mic,
  connector: Plug,
};

export const CATEGORY_COLORS: Record<SourceCategory, { text: string; bg: string; border: string }> = {
  data_room: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  premium_report: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  api: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  web: { text: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200' },
  interview: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  connector: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
};

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
          <div className="flex items-center gap-2">
            <Icon className={cn('w-4 h-4 shrink-0', cat.text)} />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{getSourceCategoryLabel(source.category)}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-900 leading-tight mt-1">{source.title}</h3>
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

function SourceCheckRow({ source, isChecked, onToggle, onViewContent }: {
  source: Source;
  isChecked: boolean;
  onToggle: () => void;
  onViewContent: () => void;
}) {
  const Icon = CATEGORY_ICONS[source.category];
  const cat = CATEGORY_COLORS[source.category];

  return (
    <div className={cn(
      'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all group',
      isChecked ? 'hover:bg-slate-50' : 'opacity-40 hover:opacity-60'
    )}>
      <button
        onClick={onToggle}
        className={cn(
          'w-4.5 h-4.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
          isChecked
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'border-slate-300 hover:border-blue-400'
        )}
      >
        {isChecked && <Check className="w-3 h-3" />}
      </button>
      <button onClick={onViewContent} className="flex-1 min-w-0 text-left flex items-start gap-2 group/title">
        <Icon className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', cat.text)} />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-slate-700 leading-tight line-clamp-2 group-hover/title:text-blue-600 transition-colors">
            {source.title}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
            <span className={cn('font-semibold', source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500')}>
              {source.reliabilityScore}%
            </span>
            <span>·</span>
            <span>{formatDate(source.publishedAt)}</span>
          </div>
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

// ─── Connector Logo Component ───────────────────────────────────────────────

function ConnectorLogo({ src, alt, size = 24 }: { src: string; alt: string; size?: number }) {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback: afficher les initiales
    const initials = alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-600 font-semibold text-[10px] rounded"
        style={{ fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
      onError={() => setError(true)}
    />
  );
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
                        <ConnectorLogo src={connector.logoUrl} alt={connector.name} size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900">{connector.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {isConnected ? 'Connecté' : 'Non connecté'}
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

// ─── Connected Sources Section ────────────────────────────────────────────────

interface ConnectedSourcesSectionProps {
  expandedConnectors: string[];
  onToggleExpand: (connectorId: string) => void;
  onSelectSource: (sourceId: string) => void;
  selectedSources: string[];
  onToggleSource: (sourceId: string) => void;
}

function SyncStatusBadge({ status }: { status: SyncStatus }) {
  const statusConfig = {
    synced: { text: 'À jour', color: 'text-emerald-600 bg-emerald-50' },
    syncing: { text: 'Sync...', color: 'text-amber-600 bg-amber-50' },
    error: { text: 'Erreur', color: 'text-red-600 bg-red-50' },
    pending: { text: 'En attente', color: 'text-slate-600 bg-slate-50' },
  };
  const config = statusConfig[status];
  return (
    <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', config.color)}>
      {config.text}
    </span>
  );
}

function ConnectedSourcesSection({
  expandedConnectors,
  onToggleExpand,
  onSelectSource,
  selectedSources,
  onToggleSource,
}: ConnectedSourcesSectionProps) {
  const { connectedConnectors } = useAppStore();
  const connectedSources = CONNECTOR_SOURCES.filter(s =>
    s.connectorId && connectedConnectors.includes(s.connectorId)
  );

  const sourcesByConnector = connectedSources.reduce((acc, source) => {
    if (!source.connectorId) return acc;
    if (!acc[source.connectorId]) acc[source.connectorId] = [];
    acc[source.connectorId].push(source);
    return acc;
  }, {} as Record<string, Source[]>);

  if (connectedConnectors.length === 0) return null;

  return (
    <div className="border-t border-slate-100">
      {/* Header */}
      <div className="px-3 py-2.5 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Plug className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-medium text-slate-700">Connected Sources</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded-full font-medium">
            {connectedSources.length}
          </span>
        </div>
      </div>

      {/* Connector sections */}
      <div className="divide-y divide-slate-100">
        {connectedConnectors.map(connectorId => {
          const connector = CONNECTORS.find(c => c.id === connectorId);
          const sources = sourcesByConnector[connectorId] || [];
          const isExpanded = expandedConnectors.includes(connectorId);

          if (!connector || sources.length === 0) return null;

          return (
            <div key={connectorId} className="bg-white">
              {/* Connector header */}
              <button
                onClick={() => onToggleExpand(connectorId)}
                className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <div className="w-5 h-5 rounded bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                  <ConnectorLogo src={connector.logoUrl} alt={connector.name} size={18} />
                </div>
                <span className="flex-1 text-xs font-medium text-slate-700 text-left">{connector.name}</span>
                <span className="text-[10px] text-slate-400">{sources.length}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Sources list */}
              {isExpanded && (
                <div className="px-1 pb-1">
                  {sources.map(source => (
                    <div
                      key={source.id}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg transition-all group',
                        selectedSources.includes(source.id) ? 'hover:bg-slate-50' : 'opacity-40 hover:opacity-60'
                      )}
                    >
                      <button
                        onClick={() => onToggleSource(source.id)}
                        className={cn(
                          'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                          selectedSources.includes(source.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 hover:border-blue-400'
                        )}
                      >
                        {selectedSources.includes(source.id) && <Check className="w-2.5 h-2.5" />}
                      </button>
                      <button
                        onClick={() => onSelectSource(source.id)}
                        className="flex-1 min-w-0 text-left"
                      >
                        <div className="text-xs font-medium text-slate-700 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {source.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                          <span className={cn('font-semibold', source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500')}>
                            {source.reliabilityScore}%
                          </span>
                          {source.syncStatus && <SyncStatusBadge status={source.syncStatus} />}
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main SourcesPanel ───────────────────────────────────────────────────────

interface SourcesPanelProps {
  selectedSourceId: string | null;
  onSelectSource: (id: string | null) => void;
  nodeId: string | null;
}

export function SourcesPanel({ selectedSourceId, onSelectSource, nodeId }: SourcesPanelProps) {
  const { getNodeSelectedSources, toggleSourceSelection, selectAllNodeSources, deselectAllNodeSources, addSourceToNode } = useAppStore();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'web' | 'deep'>('web');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  // Connector state
  const [showConnectorModal, setShowConnectorModal] = useState(false);
  const [expandedConnectors, setExpandedConnectors] = useState<string[]>(['google_drive', 'capitaliq']);
  const { connectedConnectors, connectConnector, disconnectConnector } = useAppStore();

  // If a source is selected, show its content viewer
  if (selectedSourceId) {
    const source = SOURCES.find(s => s.id === selectedSourceId);
    if (source) {
      return <SourceContentViewer source={source} onClose={() => onSelectSource(null)} />;
    }
  }

  const nodeSourceIds = nodeId ? getNodeSourceIdsWithChildren(nodeId) : [];
  const nodeSources = nodeSourceIds.map(id => SOURCES.find(s => s.id === id)).filter(Boolean) as Source[];
  const selectedSources = nodeId ? getAggregatedSelectedSources(nodeId, getNodeSelectedSources) : [];
  const allSelected = nodeSourceIds.length > 0 && nodeSourceIds.every(id => selectedSources.includes(id));
  const noneSelected = selectedSources.length === 0;

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

  // Toggle connector expansion
  const handleToggleConnector = (connectorId: string) => {
    setExpandedConnectors(prev =>
      prev.includes(connectorId) ? prev.filter(id => id !== connectorId) : [...prev, connectorId]
    );
  };

  // Handle connector connect/disconnect
  const handleConnect = (connectorId: string) => {
    connectConnector(connectorId);
    setExpandedConnectors(prev => [...new Set([...prev, connectorId])]);
  };

  const handleDisconnect = (connectorId: string) => {
    disconnectConnector(connectorId);
    setExpandedConnectors(prev => prev.filter(id => id !== connectorId));
  };

  return (
    <div className="h-full flex flex-col">
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

        {/* Connected Sources section - shown below if connectors exist */}
        {connectedConnectors.length > 0 && (
          <ConnectedSourcesSection
            expandedConnectors={expandedConnectors}
            onToggleExpand={handleToggleConnector}
            onSelectSource={onSelectSource}
            selectedSources={selectedSources}
            onToggleSource={(sourceId) => nodeId && toggleSourceSelection(nodeId, sourceId)}
          />
        )}
      </div>

      {/* ─── Section 2: Node sources with checkboxes ────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Select all header */}
        <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={handleToggleAll}
            className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            <div className={cn(
              'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
              allSelected
                ? 'bg-blue-600 border-blue-600 text-white'
                : noneSelected
                  ? 'border-slate-300'
                  : 'bg-blue-200 border-blue-400 text-white'
            )}>
              {(allSelected || !noneSelected) && <Check className="w-2.5 h-2.5" />}
            </div>
            Select all sources
          </button>
          <span className="text-[10px] text-slate-400 font-medium">
            {selectedSources.length}/{nodeSourceIds.length}
          </span>
        </div>

        {/* Source list */}
        <div className="flex-1 overflow-y-auto px-1 py-1.5 space-y-0.5">
          {nodeSources.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No sources linked to this node</p>
            </div>
          ) : (
            nodeSources.map(source => (
              <SourceCheckRow
                key={source.id}
                source={source}
                isChecked={selectedSources.includes(source.id)}
                onToggle={() => nodeId && toggleSourceSelection(nodeId, source.id)}
                onViewContent={() => onSelectSource(source.id)}
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
