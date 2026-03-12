import { useState, useEffect } from 'react';
import { X, Plus, Hash, ToggleLeft, AlignLeft, List } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MatrixColumnType } from '../../types';
import { useAppStore } from '../../store/appStore';

interface MatrixColumnPanelProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string;
  prefillLabel?: string;
  prefillPrompt?: string;
}

const TYPE_OPTIONS: { value: MatrixColumnType; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'text', label: 'Texte', icon: AlignLeft, description: 'Réponse en texte libre' },
  { value: 'number', label: 'Nombre', icon: Hash, description: 'Valeur numérique (taille, ratio…)' },
  { value: 'list', label: 'Liste', icon: List, description: 'Énumération de points' },
  { value: 'boolean', label: 'Oui / Non', icon: ToggleLeft, description: 'Réponse booléenne' },
];

export function MatrixColumnPanel({ isOpen, onClose, nodeId, prefillLabel = '', prefillPrompt = '' }: MatrixColumnPanelProps) {
  const { addMatrixColumn, currentUser } = useAppStore();

  const [label, setLabel] = useState(prefillLabel);
  const [prompt, setPrompt] = useState(prefillPrompt);
  const [type, setType] = useState<MatrixColumnType>('text');
  const [error, setError] = useState('');

  // Sync prefill when panel opens with suggestions
  useEffect(() => {
    if (isOpen) {
      setLabel(prefillLabel);
      setPrompt(prefillPrompt);
      setError('');
    }
  }, [isOpen, prefillLabel, prefillPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) { setError('Le nom de la colonne est requis.'); return; }
    if (!prompt.trim()) { setError('Le prompt est requis.'); return; }

    addMatrixColumn({
      nodeId,
      label: label.trim(),
      prompt: prompt.trim(),
      type,
      order: Date.now(),
      createdBy: currentUser?.id ?? 'u1',
    });
    setLabel('');
    setPrompt('');
    setType('text');
    setError('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10"
          onClick={onClose}
        />
      )}

      {/* Slide-in panel */}
      <div className={cn(
        'fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 z-50 transform transition-transform duration-300 ease-out flex flex-col',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Nouvelle colonne</h2>
            <p className="text-xs text-slate-400 mt-0.5">Définissez un prompt d'extraction pour cette colonne</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Label */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Nom de la colonne <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex: Taille de marché, NRR, Concurrents…"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-slate-300"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Type de réponse</label>
            <div className="grid grid-cols-2 gap-2">
              {TYPE_OPTIONS.map(({ value, label: optLabel, icon: Icon, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={cn(
                    'flex flex-col items-start gap-1 px-3 py-2.5 rounded-lg border text-left transition-all',
                    type === value
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{optLabel}</span>
                  </div>
                  <span className="text-[10px] opacity-70">{description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Prompt d'extraction <span className="text-red-400">*</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder="Ex: Quelle est la taille du marché mentionnée (TAM, SAM ou SOM) ? Indique le chiffre exact et l'année de référence."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-slate-300 resize-none"
            />
            <p className="mt-1 text-[10px] text-slate-400">
              Le prompt sera appliqué à chaque source. Soyez précis pour obtenir des résultats structurés.
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Créer la colonne
          </button>
        </div>
      </div>
    </>
  );
}
