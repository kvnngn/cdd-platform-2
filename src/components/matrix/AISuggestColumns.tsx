import { Sparkles, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MatrixColumnType } from '@/types';
import { AI_SUGGESTIONS } from '@/data/mockData';

interface Suggestion {
  label: string;
  prompt: string;
  type: MatrixColumnType;
}

interface AISuggestColumnsProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string;
  existingLabels: string[];
  onSelect: (suggestion: Suggestion) => void;
}

const TYPE_COLORS: Record<MatrixColumnType, string> = {
  text: 'bg-slate-50 text-slate-700 border-slate-200',
  number: 'bg-slate-50 text-slate-700 border-slate-200',
  list: 'bg-slate-50 text-slate-700 border-slate-200',
  boolean: 'bg-amber-50 text-amber-600 border-amber-200',
};

const TYPE_LABELS: Record<MatrixColumnType, string> = {
  text: 'Texte',
  number: 'Nombre',
  list: 'Liste',
  boolean: 'Oui / Non',
};

export function AISuggestColumns({ isOpen, onClose, nodeId, existingLabels, onSelect }: AISuggestColumnsProps) {
  const suggestions: Suggestion[] = [
    ...(AI_SUGGESTIONS[nodeId] ?? []),
    ...(AI_SUGGESTIONS.default ?? []),
  ].filter(s => !existingLabels.includes(s.label));

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Floating panel */}
      <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-violet-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs font-semibold text-slate-700">Suggestions IA</span>
            <span className="text-[10px] text-slate-400">pour ce nœud</span>
          </div>
          <button
            onClick={onClose}
            className="p-0.5 rounded text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Suggestions list */}
        <div className="max-h-80 overflow-y-auto py-1">
          {suggestions.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-slate-400">
              Toutes les suggestions ont déjà été ajoutées.
            </div>
          ) : (
            suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(suggestion);
                  onClose();
                }}
                className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-slate-800 group-hover:text-slate-800">
                      {suggestion.label}
                    </span>
                    <span className={cn(
                      'shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium border',
                      TYPE_COLORS[suggestion.type]
                    )}>
                      {TYPE_LABELS[suggestion.type]}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {suggestion.prompt}
                  </p>
                </div>
                <Plus className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 shrink-0 mt-0.5" />
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
          <p className="text-[10px] text-slate-400">
            Cliquez sur une suggestion pour la pré-remplir dans le formulaire de colonne.
          </p>
        </div>
      </div>
    </>
  );
}
