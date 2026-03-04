import { useState } from 'react';
import {
  Plus, Lightbulb, CheckCircle2, XCircle, Clock, AlertCircle,
  MessageSquare, Tag, ChevronRight, GitMerge, Link2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Hypothesis, HypothesisStatus } from '../../types';
import { useAppStore } from '../../store/appStore';
import { getUserById } from '../../data/users';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { WORKSTREAM_NODES } from '../../data/mockData';

interface HypothesisCardProps {
  hypothesis: Hypothesis;
  onClick: () => void;
}

function HypothesisCard({ hypothesis: h, onClick }: HypothesisCardProps) {
  const { currentUser, updateHypothesisStatus } = useAppStore();

  const handleStatusChange = (e: React.MouseEvent, status: HypothesisStatus) => {
    e.stopPropagation();
    updateHypothesisStatus(h.id, status);
  };

  const unresolved = h.comments.filter(c => !c.resolved).length;

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <HypothesisBadge status={h.status} />
          <ConfidenceBadge score={h.confidence.overall} />
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
      </div>

      <h4 className="text-sm font-semibold text-slate-800 mb-2 leading-snug">{h.title}</h4>
      <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{h.body}</p>

      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        {/* Sources */}
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Link2 className="w-3 h-3" />
          {h.sourceIds.length} source{h.sourceIds.length > 1 ? 's' : ''}
        </span>

        {/* Relations */}
        {h.relations.length > 0 && (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <GitMerge className="w-3 h-3" />
            {h.relations.length}
          </span>
        )}

        {/* Comments */}
        {h.comments.length > 0 && (
          <span className={cn('text-xs flex items-center gap-1', unresolved > 0 ? 'text-amber-500' : 'text-slate-400')}>
            <MessageSquare className="w-3 h-3" />
            {h.comments.length}
            {unresolved > 0 && <span className="text-amber-600">({unresolved})</span>}
          </span>
        )}

        {/* Tags */}
        {h.tags.slice(0, 2).map(tag => (
          <span key={tag} className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" />
            {tag}
          </span>
        ))}

        {/* Author */}
        <div className="ml-auto">
          <Avatar userId={h.createdBy} size="sm" />
        </div>
      </div>

      {/* Quick actions */}
      {currentUser?.role === 'manager' && h.status === 'draft' && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={(e) => handleStatusChange(e, 'validated')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <CheckCircle2 className="w-3 h-3" />
            Valider
          </button>
          <button
            onClick={(e) => handleStatusChange(e, 'rejected')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <XCircle className="w-3 h-3" />
            Rejeter
          </button>
        </div>
      )}
    </div>
  );
}

interface HypothesisListProps {
  projectId: string;
  onSelectHypothesis: (id: string) => void;
}

export function HypothesisList({ projectId, onSelectHypothesis }: HypothesisListProps) {
  const { hypotheses, selectedNodeId } = useAppStore();
  const [filter, setFilter] = useState<HypothesisStatus | 'all'>('all');

  const projectHypotheses = hypotheses.filter(h => h.projectId === projectId);
  const nodeHypotheses = selectedNodeId
    ? projectHypotheses.filter(h => h.nodeId === selectedNodeId)
    : projectHypotheses;

  const filtered = filter === 'all' ? nodeHypotheses : nodeHypotheses.filter(h => h.status === filter);

  const counts = {
    all: nodeHypotheses.length,
    validated: nodeHypotheses.filter(h => h.status === 'validated').length,
    draft: nodeHypotheses.filter(h => h.status === 'draft').length,
    on_hold: nodeHypotheses.filter(h => h.status === 'on_hold').length,
    rejected: nodeHypotheses.filter(h => h.status === 'rejected').length,
  };

  const selectedNode = WORKSTREAM_NODES.find(n => n.id === selectedNodeId);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">🧠 Hypothesis Engine</div>
            <h3 className="text-sm font-semibold text-slate-800">
              {selectedNode ? selectedNode.title : 'Toutes les hypothèses'}
            </h3>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Nouvelle
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {(['all', 'validated', 'draft', 'on_hold', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap',
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              )}
            >
              {f === 'all' ? 'Tout' : f === 'validated' ? '✓ Validées' : f === 'draft' ? '○ Draft' : f === 'on_hold' ? '◐ On Hold' : '✗ Rejetées'}
              <span className="text-xs opacity-70">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <Lightbulb className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Aucune hypothèse{filter !== 'all' ? ` dans ce statut` : ''}</p>
          </div>
        ) : (
          filtered.map(h => (
            <HypothesisCard
              key={h.id}
              hypothesis={h}
              onClick={() => onSelectHypothesis(h.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
