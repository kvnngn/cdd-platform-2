import { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, FileText } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { MatrixCell, MatrixColumn } from '../../types';
import { SOURCES } from '../../data/mockData';
import { generateColumnHypothesis } from '../../services/matrixSynthesis';
import { cn } from '../../lib/utils';

interface ColumnHypothesisModalProps {
  column: MatrixColumn;
  selectedCells: MatrixCell[];
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * ColumnHypothesisModal - Generate transverse hypothesis from multiple cells
 *
 * Allows user to:
 * 1. Preview selected cells from a column
 * 2. AI-generate a synthesis hypothesis across all selected sources
 * 3. Edit and create the hypothesis
 */
export function ColumnHypothesisModal({
  column,
  selectedCells,
  onClose,
  onSuccess,
}: ColumnHypothesisModalProps) {
  const { createHypothesis, currentUser, nodes, matrixScopes, deselectAllCells } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHypothesis, setGeneratedHypothesis] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Get matrix scope to find nodeId
  const scope = matrixScopes.find((s) => s.id === column.matrixScopeId);
  const nodeId = scope?.nodeId || '';

  // Get sources for preview
  const sources = selectedCells.map((cell) => {
    const source = SOURCES.find((s) => s.id === cell.sourceId);
    return { cell, source };
  }).filter((item) => item.source);

  // Auto-generate on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const cellValues = selectedCells.map((c) => c.value || '');
      const sourceIds = selectedCells.map((c) => c.sourceId);

      const hypothesis = await generateColumnHypothesis(cellValues, column.label, sourceIds);
      setGeneratedHypothesis(hypothesis);
      setBody(hypothesis);

      // Auto-generate title
      const autoTitle = `${column.label}: Synthesis from ${selectedCells.length} sources`;
      setTitle(autoTitle);
    } catch (error) {
      console.error('Error generating hypothesis:', error);
      setBody('Error generating hypothesis. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreate = () => {
    if (!title.trim() || !body.trim() || !currentUser) return;

    // Create hypothesis with multi-source evidence
    const newHyp = createHypothesis({
      projectId: scope?.nodeId || '',
      nodeId,
      title: title.trim(),
      body: body.trim(),
      status: 'draft',
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
      confidence: {
        sourceQuality: 75,
        crossVerification: selectedCells.length >= 3 ? 80 : 60,
        dataFreshness: 70,
        internalConsistency: 75,
        overall: 72,
      },
      sourceIds: selectedCells.map((c) => c.sourceId),
      sources: selectedCells.map((cell) => ({
        sourceId: cell.sourceId,
        excerpt: cell.value || '',
        addedBy: currentUser.id,
        addedAt: new Date().toISOString(),
        matrixColumnId: column.id,
        matrixCellId: cell.id,
      })),
      relations: [],
      tags: ['matrix-generated', column.label.toLowerCase().replace(/\s+/g, '-')],
      comments: [],
      versions: [],
      includedInReport: false,
      confidenceHistory: [],
    });

    // Deselect cells
    deselectAllCells();

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Generate Transverse Hypothesis</h2>
              <p className="text-sm text-slate-500 mt-1">
                From column "{column.label}" • {selectedCells.length} sources selected
              </p>
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
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Selected Sources Preview */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-2">Selected Sources</h3>
            <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-200 rounded-lg p-3 bg-slate-50">
              {sources.map(({ cell, source }, idx) => (
                <div key={cell.id} className="flex items-start gap-2 text-xs">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-700">{source?.fileName || source?.title}</div>
                    <div className="text-slate-500 mt-0.5 line-clamp-2">{cell.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Generated Hypothesis */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-700">AI-Generated Synthesis</h3>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                {isGenerating ? 'Generating...' : 'Regenerate'}
              </button>
            </div>

            {isGenerating ? (
              <div className="border border-slate-200 rounded-lg p-4 flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  Analyzing {selectedCells.length} sources...
                </div>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-lg p-3 bg-blue-50/30 text-sm text-slate-700">
                {generatedHypothesis || 'No hypothesis generated yet.'}
              </div>
            )}
          </div>

          {/* Editable Fields */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hypothesis Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a concise title..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hypothesis Body
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Edit the generated hypothesis..."
              rows={6}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            />
            <p className="text-xs text-slate-500 mt-1">
              This hypothesis will be linked to all {selectedCells.length} selected sources.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !body.trim() || isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Hypothesis
          </button>
        </div>
      </div>
    </div>
  );
}
