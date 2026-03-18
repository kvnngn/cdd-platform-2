import { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { getContextualExamples } from '@/utils/matrixExamples';
import { MatrixScope } from '@/types';

interface CreateScopeModalProps {
  nodeId: string;
  nodeName: string;
  onClose: () => void;
  existingScope?: MatrixScope;
}

export function CreateScopeModal({ nodeId, nodeName, onClose, existingScope }: CreateScopeModalProps) {
  const { addMatrixScope, updateMatrixScope, currentUser } = useAppStore();

  // Pre-fill with example if creating new scope
  const getInitialPrompt = () => {
    if (existingScope?.scopePrompt) return existingScope.scopePrompt;
    const examples = getContextualExamples(nodeName);
    return examples[0] || '';
  };

  const [scopePrompt, setScopePrompt] = useState(getInitialPrompt());
  const [isSearching, setIsSearching] = useState(false);

  const isEditing = !!existingScope;

  const handleCreate = async () => {
    if (!scopePrompt.trim() || !currentUser) return;

    setIsSearching(true);

    try {
      if (isEditing && existingScope) {
        // Update existing scope
        updateMatrixScope(existingScope.id, { scopePrompt: scopePrompt.trim() });
      } else {
        // Create new scope
        await addMatrixScope(
          {
            nodeId,
            scopePrompt: scopePrompt.trim(),
          },
          currentUser.id
        );
      }

      onClose();
    } catch (error) {
      console.error('Error saving scope:', error);
      setIsSearching(false);
    }
  };

  // Check if this is the Retail Market Share node
  const isRetailMarketShare = nodeName.toLowerCase().includes('retail market share') || nodeName.toLowerCase().includes('2.2');
  const modalTitle = isRetailMarketShare
    ? 'Define Scope : Retail Market Share'
    : (isEditing ? 'Edit Knowledge Base Scope' : 'Define Knowledge Base Scope');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {modalTitle}
              </h2>
              {!isRetailMarketShare && <p className="text-sm text-slate-500 mt-1">for {nodeName}</p>}
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
                {isEditing ? 'Updating...' : 'Searching documents...'}
              </>
            ) : (
              isEditing ? 'Save Changes' : 'Create Matrix'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
