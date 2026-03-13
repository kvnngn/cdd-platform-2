import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2, XCircle, Clock, ChevronLeft, ChevronRight,
  FileText, AlertCircle, CheckCheck, SkipForward
} from 'lucide-react';
import { cn, formatDate, getSourceCategoryLabel } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { getSourceById } from '../../data/mockData';
import { getUserById } from '../../data/users';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface ReviewQueueProps {
  projectId: string;
}

export function ReviewQueue({ projectId }: ReviewQueueProps) {
  const { hypotheses, nodes, updateHypothesisStatus, rejectHypothesisWithReason, currentUser } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Build the review queue: draft hypotheses sorted by creation date
  const queue = hypotheses
    .filter(h => h.projectId === projectId && h.status === 'draft')
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const current = queue[currentIndex] ?? null;
  const total = queue.length;

  // Node breadcrumb for current hypothesis
  const currentNode = current ? nodes.find(n => n.id === current.nodeId) : null;
  const parentNode = currentNode?.parentId ? nodes.find(n => n.id === currentNode.parentId) : null;
  const breadcrumb = [parentNode?.title, currentNode?.title].filter(Boolean).join(' › ');

  // Merge rich sources + legacy for display
  const richSources = current?.sources || [];
  const richSourceIds = new Set(richSources.map(s => s.sourceId));
  const legacySourceIds = (current?.sourceIds || []).filter(id => !richSourceIds.has(id));

  const handleValidate = useCallback(() => {
    if (!current) return;
    updateHypothesisStatus(current.id, 'validated');
    // Move to next (queue shrinks, so stay at same index or clamp)
  }, [current, updateHypothesisStatus]);

  const handleOnHold = useCallback(() => {
    if (!current) return;
    updateHypothesisStatus(current.id, 'on_hold');
  }, [current, updateHypothesisStatus]);

  const handleSkip = () => {
    if (currentIndex < queue.length - 1) setCurrentIndex(i => i + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(i => Math.max(0, i - 1));
  };

  const handleNext = () => {
    setCurrentIndex(i => Math.min(queue.length - 1, i + 1));
  };

  const handleRejectConfirm = () => {
    if (!current || !rejectReason.trim()) return;
    rejectHypothesisWithReason(current.id, rejectReason.trim());
    setShowRejectModal(false);
    setRejectReason('');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'textarea' || tag === 'input' || tag === 'select') return;
      if (e.key === 'v' || e.key === 'V') handleValidate();
      if (e.key === 'r' || e.key === 'R') setShowRejectModal(true);
      if (e.key === 'h' || e.key === 'H') handleOnHold();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); handleNext(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); handlePrev(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleValidate, handleOnHold, queue.length, currentIndex]);

  // Clamp index when queue shrinks after validation/rejection
  useEffect(() => {
    if (queue.length > 0 && currentIndex >= queue.length) {
      setCurrentIndex(queue.length - 1);
    }
  }, [queue.length, currentIndex]);

  // ─── Empty state ────────────────────────────────────────────────────────────
  if (queue.length === 0) {
    const validated = hypotheses.filter(h => h.projectId === projectId && h.status === 'validated').length;
    const rejected = hypotheses.filter(h => h.projectId === projectId && h.status === 'rejected').length;
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-200">
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">All hypotheses have been reviewed!</h3>
        <p className="text-sm text-slate-400">
          {validated} validated{rejected > 0 ? ` · ${rejected} rejected` : ''}
        </p>
      </div>
    );
  }

  if (!current) return null;

  // ─── Main layout ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full">
      {/* ─── Header bar ─────────────────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-3 bg-white border-b border-slate-100 flex items-center gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= queue.length - 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">{currentIndex + 1} / {total}</span>
          <div className="flex gap-0.5">
            {queue.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  i === currentIndex ? 'bg-blue-500' : 'bg-slate-200 hover:bg-slate-300'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">to review</span>
        </div>

        {/* Title (truncated) */}
        <span className="flex-1 text-xs text-slate-500 truncate hidden md:block">{current.title}</span>

        {/* Keyboard hints */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-300">
          <span>[V] Validate</span>
          <span>[R] Reject</span>
          <span>[H] On Hold</span>
          <span>[←→] Naviguer</span>
        </div>
      </div>

      {/* ─── Main content (2 columns) ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Hypothesis panel */}
        <div className="flex flex-col w-[55%] overflow-y-auto px-6 py-5 border-r border-slate-100">
          {/* Breadcrumb */}
          {breadcrumb && (
            <p className="text-xs text-slate-400 mb-2">{breadcrumb}</p>
          )}

          {/* Title */}
          <h2 className="text-base font-bold text-slate-900 leading-snug mb-3">{current.title}</h2>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <HypothesisBadge status={current.status} />
            <ConfidenceBadge score={current.confidence.overall} />
            {current.tags.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{t}</span>
            ))}
          </div>

          {/* Body */}
          <p className="text-sm text-slate-700 leading-relaxed mb-5">{current.body}</p>

          {/* Consultant comments */}
          {current.comments.filter(c => !c.resolved).length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Notes du consultant ({current.comments.filter(c => !c.resolved).length})
              </p>
              <div className="space-y-2">
                {current.comments.filter(c => !c.resolved).map(c => (
                  <div key={c.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar userId={c.authorId} size="sm" />
                      <span className="text-slate-500">{getUserById(c.authorId)?.name}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">{formatDate(c.createdAt)}</span>
                    </div>
                    <p className="text-slate-700">{c.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Manager note area */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-1.5">Manager observation (optional)</p>
            <textarea
              placeholder="Add a note before validation / rejection..."
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 bg-white"
              rows={2}
            />
          </div>
        </div>

        {/* RIGHT: Source evidence panel */}
        <div className="flex flex-col w-[45%] overflow-y-auto px-6 py-5 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Source evidence</p>
            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {richSources.length + legacySourceIds.length}
            </span>
          </div>

          {richSources.length === 0 && legacySourceIds.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
              <p className="text-xs text-slate-500 font-medium">No linked source</p>
              <p className="text-xs text-slate-400 mt-1">The consultant has not yet sourced this hypothesis.</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Rich sources with excerpts */}
            {richSources.map(hs => {
              const src = getSourceById(hs.sourceId);
              if (!src) return null;
              return (
                <div key={hs.sourceId} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Source header */}
                  <div className="flex items-start gap-2 px-3 py-2.5 border-b border-slate-100">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{src.title}</p>
                      <p className="text-xs text-slate-400">
                        {getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}
                      </p>
                    </div>
                    <span className={cn(
                      'text-xs font-bold shrink-0',
                      src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-500'
                    )}>
                      {src.reliabilityScore}%
                    </span>
                  </div>
                  {/* Excerpt */}
                  <div className="mx-3 my-2.5 border-l-4 border-amber-400 pl-3 bg-amber-50 rounded-r-lg py-2">
                    <p className="text-xs text-slate-700 leading-relaxed italic">"{hs.excerpt}"</p>
                  </div>
                  {/* Analyst note */}
                  {hs.note && (
                    <div className="px-3 pb-2.5 text-xs text-slate-500 italic">
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
                <div key={sid} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="flex items-start gap-2 px-3 py-2.5 border-b border-slate-100">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{src.title}</p>
                      <p className="text-xs text-slate-400">
                        {getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}
                      </p>
                    </div>
                    <span className={cn(
                      'text-xs font-bold shrink-0',
                      src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-500'
                    )}>
                      {src.reliabilityScore}%
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-xs text-slate-400 italic">
                      ⚠️ No citation linked — the consultant did not specify the exact excerpt.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Footer action bar ──────────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSkip}
            disabled={currentIndex >= queue.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= queue.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOnHold}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            On Hold
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            Reject
          </button>
          <button
            onClick={handleValidate}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Validate
          </button>
        </div>
      </div>

      {/* ─── Reject modal ───────────────────────────────────────────────────── */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowRejectModal(false); setRejectReason(''); }} />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold text-slate-900">Reject this hypothesis</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 truncate">{current.title}</p>

            <label className="text-xs font-medium text-slate-700 block mb-1.5">
              Reason for rejection <span className="text-red-500">*</span>
            </label>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Explain what needs to be corrected, completed or sourced differently..."
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-red-400 bg-slate-50"
              rows={4}
              autoFocus
            />
            <p className="text-xs text-slate-400 mt-1.5 mb-4 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              This feedback will be visible to the consultant directly.
            </p>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => { setShowRejectModal(false); setRejectReason(''); }}
                className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reject the hypothesis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
