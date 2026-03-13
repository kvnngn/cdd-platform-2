import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { MatrixScope, Source } from '@/types';
import { SOURCES } from '@/data/mockData';
import { searchDocumentsByScope } from '@/services/semanticSearch';

interface ScopePreviewModalProps {
  currentScope: MatrixScope;
  newPrompt: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ScopePreviewModal({
  currentScope,
  newPrompt,
  onConfirm,
  onCancel,
}: ScopePreviewModalProps) {
  const [newDocuments, setNewDocuments] = useState<Source[]>([]);
  const [isSearching, setIsSearching] = useState(true);

  // Preview semantic search on mount
  useEffect(() => {
    async function previewSearch() {
      setIsSearching(true);
      try {
        const newSourceIds = await searchDocumentsByScope(
          newPrompt,
          currentScope.nodeId
        );
        const sources = SOURCES.filter((s) => newSourceIds.includes(s.id));
        setNewDocuments(sources);
      } catch (error) {
        console.error('Error previewing search:', error);
        setNewDocuments([]);
      } finally {
        setIsSearching(false);
      }
    }
    previewSearch();
  }, [newPrompt, currentScope.nodeId]);

  const currentDocuments = SOURCES.filter((s) =>
    currentScope.discoveredSourceIds.includes(s.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Confirm scope change
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Change preview
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {/* Diff section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Scope change
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Old:
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 line-through">
                    {currentScope.scopePrompt}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">
                  New:
                </p>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    {newPrompt}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents comparison */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Discovered documents
            </h3>
            {isSearching ? (
              <div className="flex items-center justify-center gap-2 py-8">
                <Loader2 className="w-5 h-5 animate-spin text-slate-700" />
                <span className="text-sm text-slate-600">
                  Searching...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Current: {currentDocuments.length} document
                    {currentDocuments.length > 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {currentDocuments.map((s) => (
                      <div
                        key={s.id}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        <p className="text-xs font-medium text-slate-700">
                          {s.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    New: {newDocuments.length} document
                    {newDocuments.length > 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {newDocuments.map((s) => (
                      <div
                        key={s.id}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        <p className="text-xs font-medium text-slate-800">
                          {s.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-orange-800 mb-1">
                  Warning
                </p>
                <p className="text-sm text-orange-700">
                  This action will delete all existing generated cells
                  and restart generation with the new documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSearching}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Confirm change
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
