import { useState } from 'react';
import {
  CheckCircle2, Clock, Circle, XCircle, ChevronRight, GitBranch,
  X, Tag, History, Link2, AlertTriangle, TrendingUp, MessageSquare,
  ArrowRight, CheckCheck, Minus, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn, formatDate, formatDateTime, getStatusLabel, getSourceCategoryLabel } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { WORKSTREAM_NODES } from '../../data/mockData';
import { Hypothesis, HypothesisStatus } from '../../types';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';
import { ConfidenceBreakdown } from '../ui/ConfidenceBar';
import { Avatar } from '../ui/Avatar';
import { getUserById } from '../../data/users';
import { getSourceById, HYPOTHESES } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const STATUS_ICONS: Record<HypothesisStatus, React.ComponentType<{ className?: string }>> = {
  validated: CheckCircle2,
  draft: Circle,
  on_hold: Clock,
  rejected: XCircle,
};

const STATUS_COLORS: Record<HypothesisStatus, string> = {
  validated: 'text-emerald-500',
  draft: 'text-slate-400',
  on_hold: 'text-amber-500',
  rejected: 'text-red-400',
};

const RELATION_ICONS = {
  supports: { icon: CheckCheck, color: 'text-emerald-500', label: 'Supporte', bg: 'bg-emerald-50 border-emerald-200' },
  contradicts: { icon: X, color: 'text-red-500', label: 'Contredit', bg: 'bg-red-50 border-red-200' },
  nuances: { icon: Minus, color: 'text-amber-500', label: 'Nuance', bg: 'bg-amber-50 border-amber-200' },
};

// --- Inline detail panel for a hypothesis ---

function InlineHypothesisDetail({ hypothesis: h, onClose }: { hypothesis: Hypothesis; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'confidence' | 'history' | 'comments'>('overview');
  const { currentUser, updateHypothesisStatus } = useAppStore();
  const canValidate = currentUser?.role === 'manager';

  const relatedHypotheses = h.relations.map(rel => ({
    ...rel,
    hypothesis: HYPOTHESES.find(x => x.id === rel.hypothesisId),
  })).filter(r => r.hypothesis);

  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'confidence', label: 'Confidence' },
    { id: 'history', label: `Historique (${h.versions.length})` },
    { id: 'comments', label: `Commentaires (${h.comments.length})` },
  ] as const;

  return (
    <div className="bg-white rounded-xl border border-blue-200 shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <HypothesisBadge status={h.status} />
              <ConfidenceBadge score={h.confidence.overall} />
              {h.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/80 text-slate-500 border border-slate-200">
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">{h.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/80 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Avatar userId={h.createdBy} size="sm" />
            <span>{getUserById(h.createdBy)?.name}</span>
          </div>
          <span>·</span>
          <span>{formatDate(h.createdAt)}</span>
          {h.validatedBy && (
            <>
              <span>·</span>
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Validé par {getUserById(h.validatedBy)?.name?.split(' ')[0]}
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        {canValidate && (
          <div className="flex gap-2 mt-3">
            {h.status !== 'validated' && (
              <button
                onClick={() => updateHypothesisStatus(h.id, 'validated')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valider
              </button>
            )}
            {h.status !== 'rejected' && (
              <button
                onClick={() => updateHypothesisStatus(h.id, 'rejected')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Rejeter
              </button>
            )}
            {h.status !== 'on_hold' && (
              <button
                onClick={() => updateHypothesisStatus(h.id, 'on_hold')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-white hover:bg-amber-50 border border-amber-200 rounded-lg transition-colors"
              >
                <Clock className="w-3.5 h-3.5" />
                On Hold
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-100 bg-white">
        <div className="flex gap-1 px-4 pt-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-500'
                  : 'text-slate-400 border-transparent hover:text-slate-600'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 max-h-[420px] overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Corps de l'hypothèse</div>
              <p className="text-sm text-slate-700 leading-relaxed">{h.body}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Sources ({h.sourceIds.length})
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {h.sourceIds.map(sid => {
                  const src = getSourceById(sid);
                  if (!src) return null;
                  return (
                    <div key={sid} className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border text-xs',
                      src.isDeprecated ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
                    )}>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-700 truncate">{src.title}</div>
                        <div className="text-slate-400 mt-0.5">{getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}</div>
                      </div>
                      <span className={cn('font-semibold shrink-0', src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-500')}>
                        {src.reliabilityScore}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {relatedHypotheses.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Relations ({relatedHypotheses.length})
                </div>
                <div className="space-y-2">
                  {relatedHypotheses.map(({ type, hypothesis: rel }) => {
                    if (!rel) return null;
                    const cfg = RELATION_ICONS[type];
                    const Icon = cfg.icon;
                    return (
                      <div key={rel.id} className={cn('flex items-center gap-3 p-3 rounded-lg border text-xs', cfg.bg)}>
                        <Icon className={cn('w-3.5 h-3.5 shrink-0', cfg.color)} />
                        <span className={cn('font-medium shrink-0', cfg.color)}>{cfg.label}</span>
                        <span className="text-slate-600 flex-1 truncate">{rel.title}</span>
                        <HypothesisBadge status={rel.status} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'confidence' && (
          <div className="space-y-5">
            <div className="flex items-center gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 shrink-0">
                <div className={cn(
                  'text-3xl font-bold mb-0.5',
                  h.confidence.overall >= 80 ? 'text-emerald-600' : h.confidence.overall >= 65 ? 'text-amber-500' : 'text-red-500'
                )}>
                  {h.confidence.overall}%
                </div>
                <div className="text-xs text-slate-400">Globale</div>
              </div>
              <div className="flex-1">
                <ConfidenceBreakdown breakdown={h.confidence} />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Évolution du score</div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={h.confidenceHistory}>
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={d => d.slice(5)} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} width={28} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`${v}%`]} />
                    <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" />
                    <ReferenceLine y={65} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            {h.versions.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Aucune version précédente</p>
            ) : (
              h.versions.map((v, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600">Version {v.version}</span>
                    <span className="text-xs text-slate-400">{formatDateTime(v.changedAt)}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{v.content}</p>
                  <div className="flex items-center gap-2">
                    <Avatar userId={v.changedBy} size="sm" />
                    <span className="text-xs text-slate-400">{v.changeNote}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-3">
            {h.comments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Aucun commentaire</p>
            ) : (
              h.comments.map(c => (
                <div key={c.id} className={cn('border rounded-lg p-3', c.resolved ? 'bg-slate-50 border-slate-200' : 'bg-amber-50 border-amber-200')}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar userId={c.authorId} size="sm" showName />
                    </div>
                    <div className="flex items-center gap-2">
                      {c.resolved && <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Résolu</span>}
                      <span className="text-xs text-slate-400">{formatDateTime(c.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{c.content}</p>
                </div>
              ))
            )}
            <div className="mt-4">
              <textarea
                placeholder="Ajouter un commentaire..."
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 bg-white"
                rows={2}
              />
              <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Envoyer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Hypothesis row in the tree ---

interface HypothesisRowProps {
  hypothesis: Hypothesis;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function HypothesisRow({ hypothesis: h, isSelected, onSelect }: HypothesisRowProps) {
  const StatusIcon = STATUS_ICONS[h.status];
  return (
    <button
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5 text-left group rounded-lg transition-all',
        isSelected
          ? 'bg-blue-50 ring-1 ring-blue-200'
          : 'hover:bg-slate-50'
      )}
      onClick={() => onSelect(h.id)}
    >
      <StatusIcon className={cn('w-4 h-4 shrink-0', STATUS_COLORS[h.status])} />
      <span className={cn(
        'flex-1 text-sm font-medium leading-snug',
        isSelected ? 'text-blue-700' : 'text-slate-700'
      )}>
        {h.title}
      </span>
      <ConfidenceBadge score={h.confidence.overall} />
      <HypothesisBadge status={h.status} />
      <ChevronDown className={cn(
        'w-3.5 h-3.5 shrink-0 transition-transform',
        isSelected ? 'text-blue-400 rotate-180' : 'text-slate-300 group-hover:text-blue-400'
      )} />
    </button>
  );
}

// --- Main tree view ---

interface HypothesisTreeViewProps {
  projectId: string;
  onSelectHypothesis?: (id: string) => void;
}

export function HypothesisTreeView({ projectId }: HypothesisTreeViewProps) {
  const { hypotheses } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const nodes = WORKSTREAM_NODES.filter(n => n.projectId === projectId);

  const rootNode = nodes.find(n => n.parentId === null);
  const level1Nodes = nodes.filter(n => n.level === 1);

  const getNodeHypotheses = (nodeId: string) =>
    hypotheses.filter(h => h.nodeId === nodeId && h.projectId === projectId);

  const projectHypotheses = hypotheses.filter(h => h.projectId === projectId);

  const stats = {
    total: projectHypotheses.length,
    validated: projectHypotheses.filter(h => h.status === 'validated').length,
    draft: projectHypotheses.filter(h => h.status === 'draft').length,
    onHold: projectHypotheses.filter(h => h.status === 'on_hold').length,
    avgConf: Math.round(
      projectHypotheses.reduce((s, h) => s + h.confidence.overall, 0) / (projectHypotheses.length || 1)
    ),
  };

  const selectedHypothesis = selectedId ? projectHypotheses.find(h => h.id === selectedId) : null;

  const handleSelect = (id: string) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <GitBranch className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Hypothesis Tree</h2>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400">{stats.total} hypothèses</span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs text-emerald-600 font-medium">{stats.validated} validées</span>
            {stats.onHold > 0 && (
              <>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-amber-500 font-medium">{stats.onHold} on hold</span>
              </>
            )}
            {stats.draft > 0 && (
              <>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">{stats.draft} draft</span>
              </>
            )}
          </div>
        </div>

        {rootNode && (
          <div className="bg-slate-900 text-white rounded-xl px-5 py-4">
            <div className="text-xs text-slate-400 mb-1">Thèse principale</div>
            <p className="text-sm font-medium leading-relaxed">{rootNode.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className={cn(
                'text-xs font-bold px-2.5 py-1 rounded-full',
                stats.avgConf >= 80 ? 'bg-emerald-500/20 text-emerald-400'
                  : stats.avgConf >= 65 ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-red-500/20 text-red-400'
              )}>
                Confiance moyenne : {stats.avgConf}%
              </div>
              <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    stats.avgConf >= 80 ? 'bg-emerald-400'
                      : stats.avgConf >= 65 ? 'bg-amber-400'
                        : 'bg-red-400'
                  )}
                  style={{ width: `${stats.avgConf}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tree by driver */}
      <div className="space-y-4">
        {level1Nodes.map((node, idx) => {
          const nodeHypotheses = getNodeHypotheses(node.id);
          const childNodes = nodes.filter(n => n.parentId === node.id);
          const allChildHypotheses = childNodes.flatMap(cn => getNodeHypotheses(cn.id));
          const allHypotheses = [...nodeHypotheses, ...allChildHypotheses];

          if (allHypotheses.length === 0 && nodeHypotheses.length === 0) return null;

          return (
            <div key={node.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Driver header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{node.title}</div>
                    <div className="text-xs text-slate-400">{allHypotheses.length} hypothèse{allHypotheses.length > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {allHypotheses.length > 0 && (
                    <ConfidenceBadge
                      score={Math.round(allHypotheses.reduce((s, h) => s + h.confidence.overall, 0) / allHypotheses.length)}
                    />
                  )}
                </div>
              </div>

              {/* Direct hypotheses */}
              {nodeHypotheses.length > 0 && (
                <div>
                  {nodeHypotheses.map(h => (
                    <div key={h.id}>
                      <div className="divide-y divide-slate-50">
                        <HypothesisRow
                          hypothesis={h}
                          isSelected={selectedId === h.id}
                          onSelect={handleSelect}
                        />
                      </div>
                      {selectedId === h.id && selectedHypothesis && (
                        <div className="px-4 pb-4">
                          <InlineHypothesisDetail
                            hypothesis={selectedHypothesis}
                            onClose={() => setSelectedId(null)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Child node hypotheses */}
              {childNodes.map(childNode => {
                const childHypotheses = getNodeHypotheses(childNode.id);
                if (childHypotheses.length === 0) return null;
                return (
                  <div key={childNode.id} className="border-t border-slate-100">
                    <div className="px-4 py-2 bg-slate-50/50">
                      <span className="text-xs font-medium text-slate-500">{childNode.title}</span>
                    </div>
                    {childHypotheses.map(h => (
                      <div key={h.id}>
                        <div className="pl-4">
                          <HypothesisRow
                            hypothesis={h}
                            isSelected={selectedId === h.id}
                            onSelect={handleSelect}
                          />
                        </div>
                        {selectedId === h.id && selectedHypothesis && (
                          <div className="px-4 pb-4 pl-8">
                            <InlineHypothesisDetail
                              hypothesis={selectedHypothesis}
                              onClose={() => setSelectedId(null)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
