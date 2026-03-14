import { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { getContextualExamples } from '@/utils/matrixExamples';

interface CreateScopeModalProps {
  nodeId: string;
  nodeName: string;
  onClose: () => void;
}

export function CreateScopeModal({ nodeId, nodeName, onClose }: CreateScopeModalProps) {
  const { addMatrixScope, currentUser } = useAppStore();
  const [scopePrompt, setScopePrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleCreate = async () => {
    if (!scopePrompt.trim() || !currentUser) return;

    setIsSearching(true);

    try {
      await addMatrixScope(
        {
          nodeId,
          scopePrompt: scopePrompt.trim(),
        },
        currentUser.id
      );

      onClose();
    } catch (error) {
      console.error('Error creating scope:', error);
      setIsSearching(false);
    }
  };

  const examples = getContextualExamples(nodeName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Define Knowledge Base Scope</h2>
              <p className="text-sm text-slate-500 mt-1">for {nodeName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Scope Prompt
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                value={scopePrompt}
                onChange={(e) => setScopePrompt(e.target.value)}
                placeholder="Describe what you are looking for..."
                rows={3}
                maxLength={500}
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 resize-none text-sm"
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-slate-500">
                Describe what you are looking for. The AI will find relevant documents.
              </p>
              <p className="text-xs text-slate-400">
                {scopePrompt.length} / 500
              </p>
            </div>
          </div>

          {/* Examples */}
          <div className="mb-4">
            <p className="text-xs font-medium text-slate-600 mb-2">
              Exemples pour "{nodeName}":
            </p>
            <div className="space-y-2">
              {examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setScopePrompt(example)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <strong>Next steps:</strong> Automatic document search
                → Synthesis generation → Custom column addition
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            disabled={isSearching}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!scopePrompt.trim() || isSearching}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching documents...
              </>
            ) : (
              'Create Matrix'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
