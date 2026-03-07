import { useState } from 'react';
import {
  X, CheckCircle2, XCircle, Clock, MessageSquare,
  Tag, History, ChevronLeft, TrendingUp,
  CheckCheck, Minus, Pencil, Save, Plus, FileText,
  AlertCircle, ExternalLink
} from 'lucide-react';
import { cn, formatDate, formatDateTime, getStatusLabel, getSourceCategoryLabel } from '../../lib/utils';
import { Hypothesis, HypothesisSource } from '../../types';
import { useAppStore } from '../../store/appStore';
import { getUserById } from '../../data/users';
import { getSourceById, HYPOTHESES, SOURCES } from '../../data/mockData';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(h.body);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showAddSource, setShowAddSource] = useState(false);
  const [addSourceId, setAddSourceId] = useState('');
  const [addExcerpt, setAddExcerpt] = useState('');
  const [addNote, setAddNote] = useState('');

  const {
    currentUser, updateHypothesisStatus,
    rejectHypothesisWithReason, updateHypothesisBody, addSourceToHypothesis
  } = useAppStore();

  const canValidate = currentUser?.role === 'manager';
  const canEdit = currentUser?.role !== 'manager' && h.status === 'draft';

  // Merge rich sources + legacy sourceIds without excerpts
  const richSourceIds = new Set((h.sources || []).map(s => s.sourceId));
  const legacySourceIds = (h.sourceIds || []).filter(id => !richSourceIds.has(id));

  // Available sources to add (not yet linked)
  const allLinkedIds = new Set([...richSourceIds, ...legacySourceIds]);
  const availableSources = SOURCES.filter(s => !allLinkedIds.has(s.id));

  const relatedHypotheses = h.relations.map(rel => ({
    ...rel,
    hypothesis: HYPOTHESES.find(x => x.id === rel.hypothesisId),
  })).filter(r => r.hypothesis);

  const totalSources = (h.sources || []).length + legacySourceIds.length;

  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'confidence', label: 'Confidence' },
    { id: 'history', label: `Historique (${h.versions.length})` },
    { id: 'comments', label: `Commentaires (${h.comments.length})` },
  ] as const;

  const handleSaveBody = () => {
    if (editBody.trim() && currentUser) {
      updateHypothesisBody(h.id, editBody.trim(), currentUser.id);
      setIsEditing(false);
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    rejectHypothesisWithReason(h.id, rejectReason.trim());
    setShowRejectForm(false);
    setRejectReason('');
  };

  const handleAddSource = () => {
    if (!addSourceId || !addExcerpt.trim() || !currentUser) return;
    const newHypSource: HypothesisSource = {
      sourceId: addSourceId,
      excerpt: addExcerpt.trim(),
      addedBy: currentUser.id,
      addedAt: new Date().toISOString(),
      note: addNote.trim() || undefined,
    };
    addSourceToHypothesis(h.id, newHypSource);
    setShowAddSource(false);
    setAddSourceId('');
    setAddExcerpt('');
    setAddNote('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 shrink-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors mt-0.5 shrink-0 text-xs font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Retour</span>
          </button>
          <div className="flex-1 min-w-0">
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
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
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

        {/* Manager action buttons */}
        {canValidate && !showRejectForm && (
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
                onClick={() => setShowRejectForm(true)}
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

        {/* Inline reject form */}
        {showRejectForm && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs font-medium text-red-700 mb-2">Motif du rejet (obligatoire)</p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Expliquez ce qui doit être corrigé ou sourcé différemment..."
              className="w-full text-xs border border-red-200 rounded-lg px-3 py-2 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-red-400 bg-white"
              rows={3}
              autoFocus
            />
            <p className="text-xs text-red-400 mt-1 mb-2">Ce feedback sera visible par le consultant.</p>
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Rejeter
              </button>
              <button
                onClick={() => { setShowRejectForm(false); setRejectReason(''); }}
                className="px-3 py-1.5 bg-white text-slate-600 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rejection reason banner */}
      {h.status === 'rejected' && h.rejectionReason && (
        <div className="mx-5 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-xs font-semibold text-red-700">Hypothèse rejetée — révision requise</span>
          </div>
          <p className="text-xs text-red-700 leading-relaxed italic">"{h.rejectionReason}"</p>
          {h.rejectedBy && (
            <p className="text-xs text-red-400 mt-1.5">
              Rejeté par {getUserById(h.rejectedBy)?.name} · {h.rejectedAt ? formatDate(h.rejectedAt) : ''}
            </p>
          )}
        </div>
      )}

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
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Corps de l'hypothèse</span>
                {canEdit && !isEditing && (
                  <button
                    onClick={() => { setEditBody(h.body); setIsEditing(true); }}
                    className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"
                  >
                    <Pencil className="w-3 h-3" />
                    Modifier
                  </button>
                )}
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    className="w-full text-sm border border-blue-300 rounded-lg px-3 py-2.5 resize-none text-slate-700 focus:outline-none focus:border-blue-500 bg-white leading-relaxed"
                    rows={6}
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveBody}
                      disabled={!editBody.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-slate-600 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">{h.body}</p>
              )}
            </div>

            {/* Sources with excerpts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Sources ({totalSources})
                </span>
                {!showAddSource && (
                  <button
                    onClick={() => setShowAddSource(true)}
                    className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                    Ajouter
                  </button>
                )}
              </div>

              {/* Inline add source form */}
              {showAddSource && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-medium text-blue-700 mb-2">Ajouter une source avec citation</p>
                  <select
                    value={addSourceId}
                    onChange={e => setAddSourceId(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 mb-2 text-slate-700 focus:outline-none focus:border-blue-400 bg-white"
                  >
                    <option value="">Sélectionner une source...</option>
                    {availableSources.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                  <textarea
                    value={addExcerpt}
                    onChange={e => setAddExcerpt(e.target.value)}
                    placeholder="Citation exacte du document qui prouve cette hypothèse... *"
                    className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 bg-white mb-2"
                    rows={3}
                  />
                  <textarea
                    value={addNote}
                    onChange={e => setAddNote(e.target.value)}
                    placeholder="Note analyste (optionnel) : pourquoi cette source est pertinente..."
                    className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 bg-white mb-2"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddSource}
                      disabled={!addSourceId || !addExcerpt.trim()}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Ajouter
                    </button>
                    <button
                      onClick={() => { setShowAddSource(false); setAddSourceId(''); setAddExcerpt(''); setAddNote(''); }}
                      className="px-3 py-1.5 text-slate-600 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {/* Rich sources with excerpts */}
                {(h.sources || []).map(hs => {
                  const src = getSourceById(hs.sourceId);
                  if (!src) return null;
                  return (
                    <div key={hs.sourceId} className={cn('rounded-lg border overflow-hidden text-xs', src.isDeprecated ? 'border-red-200' : 'border-slate-200')}>
                      {/* Source header */}
                      <div className={cn('flex items-center gap-3 px-3 py-2', src.isDeprecated ? 'bg-red-50' : 'bg-slate-50')}>
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-slate-700 truncate block">{src.title}</span>
                          <span className="text-slate-400">
                            {getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}
                          </span>
                        </div>
                        <span className={cn('font-semibold shrink-0', src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-500')}>
                          {src.reliabilityScore}%
                        </span>
                      </div>
                      {/* Excerpt block */}
                      <div className="px-3 py-2.5 border-l-4 border-amber-400 bg-amber-50 mx-3 my-2 rounded-r-lg">
                        <p className="text-slate-700 leading-relaxed italic">"{hs.excerpt}"</p>
                      </div>
                      {/* Analyst note */}
                      {hs.note && (
                        <div className="px-3 pb-2.5 text-slate-500 italic">
                          Note : {hs.note}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Legacy sources without excerpts */}
                {legacySourceIds.map(sid => {
                  const src = getSourceById(sid);
                  if (!src) return null;
                  return (
                    <div key={sid} className="rounded-lg border border-slate-200 overflow-hidden text-xs">
                      <div className="flex items-center gap-3 px-3 py-2 bg-slate-50">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-slate-700 truncate block">{src.title}</span>
                          <span className="text-slate-400">
                            {getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}
                          </span>
                        </div>
                        <span className={cn('font-semibold shrink-0', src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-500')}>
                          {src.reliabilityScore}%
                        </span>
                      </div>
                      <div className="px-3 py-2 bg-slate-50 border-t border-dashed border-slate-200">
                        <p className="text-slate-400 italic text-xs">Aucune citation liée — ajoutez un extrait pour renforcer la preuve.</p>
                      </div>
                    </div>
                  );
                })}

                {totalSources === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">Aucune source liée à cette hypothèse.</p>
                )}
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
            <div className="text-center p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className={cn('text-4xl font-bold mb-1', h.confidence.overall >= 80 ? 'text-emerald-600' : h.confidence.overall >= 65 ? 'text-amber-500' : 'text-red-500')}>
                {h.confidence.overall}%
              </div>
              <div className="text-xs text-slate-400">Confidence globale</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Décomposition</div>
              <ConfidenceBreakdown breakdown={h.confidence} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Évolution du score</div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={h.confidenceHistory}>
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={d => d.slice(5)} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} width={28} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`${v}%`]} />
                    <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" />
                    <ReferenceLine y={65} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 mt-2 justify-center flex-wrap">
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
