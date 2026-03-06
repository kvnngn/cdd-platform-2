import { useState } from 'react';
import { X, MessageSquare, History, Send, CheckCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { getUserById } from '../../data/users';
import { NodeComment, NodeVersion } from '../../types';

type PanelTab = 'comments' | 'history';

interface NodeCommentsPanelProps {
  nodeId: string;
  nodeTitle: string;
  onClose: () => void;
}

export function NodeCommentsPanel({ nodeId, nodeTitle, onClose }: NodeCommentsPanelProps) {
  const { nodeComments, nodeVersions, addNodeComment, resolveNodeComment, currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<PanelTab>('comments');
  const [newComment, setNewComment] = useState('');

  const comments = nodeComments.filter(c => c.nodeId === nodeId);
  const versions = nodeVersions.filter(v => v.nodeId === nodeId).sort((a, b) => b.version - a.version);

  const handleSendComment = () => {
    if (!newComment.trim() || !currentUser) return;
    const comment: NodeComment = {
      id: `nc-${Date.now()}`,
      nodeId,
      authorId: currentUser.id,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      resolved: false,
    };
    addNodeComment(comment);
    setNewComment('');
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="absolute inset-y-0 right-0 w-72 bg-white border-l border-slate-200 flex flex-col shadow-lg z-20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-start justify-between shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 mb-0.5">Nœud</p>
          <p className="text-xs font-semibold text-slate-700 leading-snug truncate" title={nodeTitle}>
            {nodeTitle}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 ml-2 shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 shrink-0">
        <button
          onClick={() => setActiveTab('comments')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-colors',
            activeTab === 'comments'
              ? 'text-blue-600 border-blue-500'
              : 'text-slate-400 border-transparent hover:text-slate-600'
          )}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Commentaires
          {comments.filter(c => !c.resolved).length > 0 && (
            <span className="w-4 h-4 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {comments.filter(c => !c.resolved).length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-colors',
            activeTab === 'history'
              ? 'text-blue-600 border-blue-500'
              : 'text-slate-400 border-transparent hover:text-slate-600'
          )}
        >
          <History className="w-3.5 h-3.5" />
          Historique
          {versions.length > 0 && (
            <span className="text-xs text-slate-400">({versions.length})</span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'comments' && (
          <div className="p-3 space-y-3">
            {comments.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">
                Aucun commentaire pour ce nœud
              </p>
            )}
            {comments.map(comment => {
              const author = getUserById(comment.authorId);
              return (
                <div
                  key={comment.id}
                  className={cn(
                    'rounded-lg border p-3 space-y-2 transition-opacity',
                    comment.resolved ? 'opacity-50 border-slate-100 bg-slate-50' : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {author && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ backgroundColor: author.color }}
                        >
                          {author.initials[0]}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-700">{author?.name ?? 'Inconnu'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{comment.content}</p>
                  {!comment.resolved && (
                    <button
                      onClick={() => resolveNodeComment(comment.id)}
                      className="flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Résoudre
                    </button>
                  )}
                  {comment.resolved && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <CheckCheck className="w-3 h-3" />
                      Résolu
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-3 space-y-2">
            {versions.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">
                Aucune modification enregistrée
              </p>
            )}
            {versions.map((v, i) => {
              const author = getUserById(v.changedBy);
              return (
                <div key={i} className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0" />
                    {i < versions.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {author && (
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                          style={{ backgroundColor: author.color }}
                        >
                          {author.initials[0]}
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-slate-700">{author?.name ?? 'Inconnu'}</span>
                      <span className="text-[10px] text-slate-400">{formatDate(v.changedAt)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{v.changeNote}</p>
                    <p className="text-xs text-slate-700 font-medium mt-1">→ {v.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Comment input */}
      {activeTab === 'comments' && (
        <div className="border-t border-slate-100 p-3 shrink-0">
          <div className="flex gap-2">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
              placeholder="Ajouter un commentaire…"
              rows={2}
              className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 resize-none"
            />
            <button
              onClick={handleSendComment}
              disabled={!newComment.trim()}
              className={cn(
                'p-2 rounded-lg self-end transition-colors',
                newComment.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              )}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
