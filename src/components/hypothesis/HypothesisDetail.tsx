import { useState } from 'react';
import {
  X, CheckCircle2, XCircle, Clock, GitMerge, MessageSquare,
  Tag, History, Link2, ChevronLeft, AlertTriangle, TrendingUp,
  ArrowRight, CheckCheck, Minus
} from 'lucide-react';
import { cn, formatDate, formatDateTime, getStatusLabel, getSourceCategoryLabel } from '../../lib/utils';
import { Hypothesis, HypothesisStatus } from '../../types';
import { useAppStore } from '../../store/appStore';
import { getUserById } from '../../data/users';
import { getSourceById, HYPOTHESES } from '../../data/mockData';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';
import { ConfidenceBreakdown } from '../ui/ConfidenceBar';
import { Avatar } from '../ui/Avatar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const RELATION_ICONS = {
  supports: { icon: CheckCheck, color: 'text-emerald-500', label: 'Supporte', bg: 'bg-emerald-50 border-emerald-200' },
  contradicts: { icon: X, color: 'text-red-500', label: 'Contredit', bg: 'bg-red-50 border-red-200' },
  nuances: { icon: Minus, color: 'text-amber-500', label: 'Nuance', bg: 'bg-amber-50 border-amber-200' },
};

interface HypothesisDetailProps {
  hypothesis: Hypothesis;
  onClose: () => void;
}

export function HypothesisDetail({ hypothesis: h, onClose }: HypothesisDetailProps) {
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
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 shrink-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mt-0.5 shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <HypothesisBadge status={h.status} />
              <ConfidenceBadge score={h.confidence.overall} />
              {h.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-500">
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-sm font-bold text-slate-900 leading-snug">{h.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valider
              </button>
            )}
            {h.status !== 'rejected' && (
              <button
                onClick={() => updateHypothesisStatus(h.id, 'rejected')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Rejeter
              </button>
            )}
            {h.status !== 'on_hold' && (
              <button
                onClick={() => updateHypothesisStatus(h.id, 'on_hold')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
              >
                <Clock className="w-3.5 h-3.5" />
                On Hold
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-100 shrink-0">
        <div className="flex gap-1 px-4 pt-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-500'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Body */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Corps de l'hypothèse</div>
              <p className="text-sm text-slate-700 leading-relaxed">{h.body}</p>
            </div>

            {/* Sources */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Sources ({h.sourceIds.length})
              </div>
              <div className="space-y-2">
                {h.sourceIds.map(sid => {
                  const src = getSourceById(sid);
                  if (!src) return null;
                  return (
                    <div key={sid} className={cn('flex items-start gap-3 p-3 rounded-lg border text-xs', src.isDeprecated ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200')}>
                      <div className="flex-1">
                        <div className="font-medium text-slate-700">{src.title}</div>
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

            {/* Relations */}
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
            {/* Overall score */}
            <div className="text-center p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className={cn('text-4xl font-bold mb-1', h.confidence.overall >= 80 ? 'text-emerald-600' : h.confidence.overall >= 65 ? 'text-amber-500' : 'text-red-500')}>
                {h.confidence.overall}%
              </div>
              <div className="text-xs text-slate-400">Confidence globale</div>
            </div>

            {/* Breakdown */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Décomposition</div>
              <ConfidenceBreakdown breakdown={h.confidence} />
            </div>

            {/* Evolution chart */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Évolution du score</div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={h.confidenceHistory}>
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={d => d.slice(5)} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} width={28} />
                    <Tooltip
                      contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
                      formatter={(v) => [`${v}%`]}
                    />
                    <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" />
                    <ReferenceLine y={65} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 mt-2 justify-center">
                  {h.confidenceHistory.filter(p => p.event).map((p, i) => (
                    <div key={i} className="text-xs text-slate-400">
                      <span className="text-blue-500 font-medium">{p.score}%</span> — {p.event}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Journal de modifications</div>
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
                rows={3}
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
