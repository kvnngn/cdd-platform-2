import { useState } from 'react';
import { Search, RefreshCw, ExternalLink, AlertTriangle, CheckCircle2, Globe, FileText, Database, Newspaper, Mic } from 'lucide-react';
import { cn, formatDate, getSourceCategoryLabel } from '../../lib/utils';
import { Source, SourceCategory } from '../../types';
import { getResearchByNode, WORKSTREAM_NODES } from '../../data/mockData';
import { useAppStore } from '../../store/appStore';

const CATEGORY_ICONS: Record<SourceCategory, React.ComponentType<{ className?: string }>> = {
  data_room: FileText,
  premium_report: Database,
  api: Database,
  web: Globe,
  interview: Mic,
};

const CATEGORY_COLORS: Record<SourceCategory, string> = {
  data_room: 'text-blue-600 bg-blue-50 border-blue-200',
  premium_report: 'text-purple-600 bg-purple-50 border-purple-200',
  api: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  web: 'text-slate-500 bg-slate-50 border-slate-200',
  interview: 'text-amber-600 bg-amber-50 border-amber-200',
};

function SourceCard({ source, compact = false }: { source: Source; compact?: boolean }) {
  const Icon = CATEGORY_ICONS[source.category];
  const catStyle = CATEGORY_COLORS[source.category];

  return (
    <div className={cn(
      'border rounded-lg p-3 transition-colors',
      source.isDeprecated ? 'bg-red-50 border-red-200 opacity-70' : 'bg-white border-slate-200 hover:border-slate-300'
    )}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0', catStyle)}>
            <Icon className="w-3 h-3" />
            {getSourceCategoryLabel(source.category)}
          </span>
          {source.isDeprecated && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
              <AlertTriangle className="w-3 h-3" />
              Dépréciée
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className={cn('text-xs font-semibold', source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500')}>
            {source.reliabilityScore}%
          </span>
        </div>
      </div>

      <div className="font-medium text-xs text-slate-800 mb-1.5 leading-tight">{source.title}</div>

      {!compact && (
        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{source.excerpt}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400">
          {source.author && <span>{source.author} · </span>}
          <span>{formatDate(source.publishedAt)}</span>
        </div>
        {source.url && (
          <button className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export function ResearchPanel() {
  const { selectedNodeId } = useAppStore();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');

  if (!selectedNodeId) {
    return (
      <div className="h-full flex items-center justify-center text-center p-6">
        <div>
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Sélectionnez un nœud pour afficher les données du Research Engine</p>
        </div>
      </div>
    );
  }

  const node = WORKSTREAM_NODES.find(n => n.id === selectedNodeId);
  const synthesis = getResearchByNode(selectedNodeId);

  if (!synthesis) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">{node?.title}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <RefreshCw className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-400 mb-4">Aucune synthèse disponible pour ce nœud</p>
            <button className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
              <Search className="w-3.5 h-3.5" />
              Lancer la recherche
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">🔍 Research Engine</div>
            <h3 className="text-sm font-semibold text-slate-800 leading-tight">{node?.title}</h3>
          </div>
          <button
            onClick={handleRefresh}
            className={cn(
              'p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all',
              isSearching && 'animate-spin text-blue-500'
            )}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Coverage */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', synthesis.coverageScore >= 80 ? 'bg-emerald-500' : synthesis.coverageScore >= 60 ? 'bg-amber-400' : 'bg-red-400')}
              style={{ width: `${synthesis.coverageScore}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 shrink-0">Couverture {synthesis.coverageScore}%</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Requête manuelle..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Synthesis */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Synthèse IA</div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-slate-700 leading-relaxed">{synthesis.summary}</p>
          </div>
        </div>

        {/* Key points */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Points clés</div>
          <ul className="space-y-1.5">
            {synthesis.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-600 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sources */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Sources ({synthesis.sources.length})
          </div>
          <div className="space-y-2">
            {synthesis.sources.map(source => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
