import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';

interface CreateHypothesisModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  projectId: string | null;
  initialContent?: string;
  onSuccess?: () => void;
}

export function CreateHypothesisModal({
  isOpen,
  onClose,
  nodeId,
  projectId,
  initialContent,
  onSuccess,
}: CreateHypothesisModalProps) {
  const { createHypothesis, currentUser, nodes } = useAppStore();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodeId || '');

  useEffect(() => {
    if (isOpen) {
      if (initialContent) {
        const firstLine = initialContent.split('\n')[0].replace(/\*\*/g, '');
        const truncated = firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
        setTitle(truncated);
        setBody(initialContent);
      } else {
        setTitle('');
        setBody('');
      }
      setSelectedNodeId(nodeId || '');
    }
  }, [isOpen, initialContent, nodeId]);

  if (!isOpen) return null;

  const projectNodes = nodes.filter(n => n.projectId === projectId);
  const userId = currentUser?.id || 'u1';
  const canSubmit = title.trim() && selectedNodeId;

  const handleSubmit = () => {
    if (!canSubmit || !projectId) return;
    createHypothesis({
      projectId,
      nodeId: selectedNodeId,
      title: title.trim(),
      body: body.trim(),
      status: 'draft',
      createdBy: userId,
      updatedBy: userId,
      confidence: {
        sourceQuality: 70,
        crossVerification: 60,
        dataFreshness: 80,
        internalConsistency: 75,
        overall: 71,
      },
      sourceIds: [],
      sources: [],
      relations: [],
      tags: initialContent ? ['généré-ia'] : [],
      comments: [],
      versions: [
        {
          version: 1,
          content: body.trim(),
          changedBy: userId,
          changedAt: new Date().toISOString(),
          changeNote: initialContent ? 'Créé depuis une synthèse IA' : 'Créé manuellement',
        },
      ],
      includedInReport: false,
      confidenceHistory: [
        { date: new Date().toISOString(), score: 71, event: 'Hypothèse créée' },
      ],
    });
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-800">Nouvelle hypothèse</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Node: pre-filled (read-only banner) or dropdown */}
          {nodeId ? (
            <div className="text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-2">
              <Lightbulb className="w-3 h-3 text-slate-400 shrink-0" />
              Nœud :{' '}
              <span className="font-medium text-slate-700">
                {projectNodes.find(n => n.id === nodeId)?.title || nodeId}
              </span>
            </div>
          ) : (
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                Nœud du workstream <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedNodeId}
                onChange={e => setSelectedNodeId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
              >
                <option value="">Sélectionner un nœud...</option>
                {projectNodes.map(n => (
                  <option key={n.id} value={n.id}>
                    {'  '.repeat(n.level)}{n.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Titre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="Ex: Le marché adressable dépasse les 500M€ en Europe..."
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Contenu</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
              placeholder="Développez votre hypothèse..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors',
              canSubmit
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            )}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Créer l'hypothèse
          </button>
        </div>
      </div>
    </div>
  );
}
