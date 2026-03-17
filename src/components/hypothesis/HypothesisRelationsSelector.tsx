import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Link as LinkIcon, X, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Hypothesis, HypothesisStatus, HypothesisSource } from '@/types';
import { detectRelations, RelationSuggestion } from '@/services/hypothesisRelationDetector';
import { RelationSuggestionCard } from './RelationSuggestionCard';

export interface SelectedRelation {
  hypothesisId: string;
  type: 'supports' | 'contradicts' | 'nuances';
}

interface HypothesisRelationsSelectorProps {
  projectId: string;
  currentNodeId: string;
  availableHypotheses: Hypothesis[]; // All hypotheses in project
  excludeHypothesisId?: string; // Exclude hypothesis being created/edited
  selectedRelations: SelectedRelation[];
  onRelationsChange: (relations: SelectedRelation[]) => void;
  onSkip?: () => void;
  onBack?: () => void;
  onNext?: () => void;

  // New props for auto-detection
  newHypothesisTitle?: string;
  newHypothesisBody?: string;
  newHypothesisSources?: HypothesisSource[];
  newHypothesisTags?: string[];
}

const STATUS_LABELS: Record<HypothesisStatus, string> = {
  validated: 'Validated',
  draft: 'Draft',
  on_hold: 'On Hold',
  rejected: 'Rejected',
};

const STATUS_COLORS: Record<HypothesisStatus, string> = {
  validated: 'text-emerald-600',
  draft: 'text-slate-500',
  on_hold: 'text-amber-600',
  rejected: 'text-red-600',
};

export function HypothesisRelationsSelector({
  projectId,
  currentNodeId,
  availableHypotheses,
  excludeHypothesisId,
  selectedRelations,
  onRelationsChange,
  onSkip,
  onBack,
  onNext,
  newHypothesisTitle,
  newHypothesisBody,
  newHypothesisSources,
  newHypothesisTags,
}: HypothesisRelationsSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<HypothesisStatus | 'all'>('all');

  // Auto-detection state
  const [isDetecting, setIsDetecting] = useState(false);
  const [suggestions, setSuggestions] = useState<RelationSuggestion[]>([]);
  const [detectionComplete, setDetectionComplete] = useState(false);

  // Filter hypotheses
  const filteredHypotheses = useMemo(() => {
    return availableHypotheses.filter(h => {
      // Exclude current hypothesis
      if (h.id === excludeHypothesisId) return false;

      // Filter by project
      if (h.projectId !== projectId) return false;

      // Filter by status
      if (statusFilter !== 'all' && h.status !== statusFilter) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          h.title.toLowerCase().includes(query) ||
          h.body.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [availableHypotheses, excludeHypothesisId, projectId, statusFilter, searchQuery]);

  // Count hypotheses by status
  const statusCounts = useMemo(() => {
    const counts: Record<HypothesisStatus, number> = {
      validated: 0,
      draft: 0,
      on_hold: 0,
      rejected: 0,
    };

    availableHypotheses.forEach(h => {
      if (h.projectId === projectId && h.id !== excludeHypothesisId) {
        counts[h.status]++;
      }
    });

    return counts;
  }, [availableHypotheses, projectId, excludeHypothesisId]);

  const handleAddRelation = (hypothesisId: string, type: 'supports' | 'contradicts' | 'nuances') => {
    // Check if relation already exists
    const existingIndex = selectedRelations.findIndex(r => r.hypothesisId === hypothesisId);

    if (existingIndex >= 0) {
      // If same type, remove it (toggle off)
      if (selectedRelations[existingIndex].type === type) {
        onRelationsChange(selectedRelations.filter(r => r.hypothesisId !== hypothesisId));
      } else {
        // Update type
        const updated = [...selectedRelations];
        updated[existingIndex] = { hypothesisId, type };
        onRelationsChange(updated);
      }
    } else {
      // Add new relation
      onRelationsChange([...selectedRelations, { hypothesisId, type }]);
    }
  };

  const handleRemoveRelation = (hypothesisId: string) => {
    onRelationsChange(selectedRelations.filter(r => r.hypothesisId !== hypothesisId));
  };

  const getRelationType = (hypothesisId: string): 'supports' | 'contradicts' | 'nuances' | null => {
    const relation = selectedRelations.find(r => r.hypothesisId === hypothesisId);
    return relation?.type || null;
  };

  const getRelationIcon = (type: 'supports' | 'contradicts' | 'nuances') => {
    switch (type) {
      case 'supports':
        return '✓';
      case 'contradicts':
        return '✗';
      case 'nuances':
        return '≈';
    }
  };

  const getRelationLabel = (type: 'supports' | 'contradicts' | 'nuances') => {
    switch (type) {
      case 'supports':
        return 'Supports';
      case 'contradicts':
        return 'Contradicts';
      case 'nuances':
        return 'Nuances';
    }
  };

  // Auto-detection handlers
  const handleAutoDetect = async () => {
    if (!newHypothesisTitle || !newHypothesisBody) {
      console.error('Cannot auto-detect: missing hypothesis title or body');
      return;
    }

    setIsDetecting(true);
    setDetectionComplete(false);

    try {
      const newHypothesisData = {
        title: newHypothesisTitle,
        body: newHypothesisBody,
        sources: newHypothesisSources || [],
        tags: newHypothesisTags || [],
      };

      const result = await detectRelations(newHypothesisData, filteredHypotheses);
      setSuggestions(result.suggestions);
      setDetectionComplete(true);
    } catch (error) {
      console.error('Detection failed:', error);
      setDetectionComplete(true);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: RelationSuggestion) => {
    // Add to selectedRelations
    onRelationsChange([
      ...selectedRelations,
      {
        hypothesisId: suggestion.hypothesisId,
        type: suggestion.type,
      },
    ]);

    // Remove from suggestions
    setSuggestions(prev => prev.filter(s => s.hypothesisId !== suggestion.hypothesisId));
  };

  const handleRejectSuggestion = (hypothesisId: string) => {
    // Remove from suggestions with animation
    setSuggestions(prev => prev.filter(s => s.hypothesisId !== hypothesisId));
  };

  const handleChangeSuggestionType = (
    hypothesisId: string,
    newType: 'supports' | 'contradicts' | 'nuances'
  ) => {
    // Update the type in suggestions
    setSuggestions(prev =>
      prev.map(s =>
        s.hypothesisId === hypothesisId ? { ...s, type: newType } : s
      )
    );
  };

  // Check if auto-detect is available
  const canAutoDetect = !!(newHypothesisTitle && newHypothesisBody && filteredHypotheses.length > 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-slate-700">
              Define Relations with Other Hypotheses
            </h4>
          </div>
          {/* Auto-Detect Button */}
          {canAutoDetect && !detectionComplete && (
            <button
              onClick={handleAutoDetect}
              disabled={isDetecting}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
                isDetecting
                  ? 'bg-blue-100 text-blue-600 cursor-wait'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              )}
            >
              {isDetecting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Detect Relations</span>
                </>
              )}
            </button>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Does this hypothesis relate to existing ones? {canAutoDetect && 'Use AI to detect relationships automatically, or '}Select hypotheses and define relationship types manually.
        </p>
      </div>

      {/* Loading Panel */}
      {isDetecting && (
        <div className="px-4 py-4 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start gap-3">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Analyzing {filteredHypotheses.length} hypotheses...
              </p>
              <p className="text-xs text-blue-600">
                Comparing content and identifying relationships...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Panel */}
      {detectionComplete && suggestions.length > 0 && (
        <div className="px-4 py-3 bg-gradient-to-b from-blue-50 to-white border-b border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-semibold text-blue-900">
              AI Suggestions ({suggestions.length})
            </h5>
            <button
              onClick={() => {
                setSuggestions([]);
                setDetectionComplete(false);
              }}
              className="text-xs text-slate-500 hover:text-slate-700 font-medium"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {suggestions.map(suggestion => {
              const hypothesis = availableHypotheses.find(h => h.id === suggestion.hypothesisId);
              if (!hypothesis) return null;

              return (
                <RelationSuggestionCard
                  key={suggestion.hypothesisId}
                  suggestion={suggestion}
                  hypothesis={hypothesis}
                  onAccept={() => handleAcceptSuggestion(suggestion)}
                  onReject={() => handleRejectSuggestion(suggestion.hypothesisId)}
                  onChangeType={(newType) =>
                    handleChangeSuggestionType(suggestion.hypothesisId, newType)
                  }
                />
              );
            })}
          </div>
        </div>
      )}

      {/* No Suggestions Message */}
      {detectionComplete && suggestions.length === 0 && (
        <div className="px-4 py-4 bg-slate-50 border-b border-slate-200">
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">
              No clear relationships detected
            </p>
            <p className="text-xs text-slate-500">
              This hypothesis appears to introduce new concepts. You can still add relations manually below.
            </p>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="px-4 py-3 border-b border-slate-200 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hypotheses..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full transition-colors',
              statusFilter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('validated')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full transition-colors',
              statusFilter === 'validated'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            ✓ Validated {statusCounts.validated}
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full transition-colors',
              statusFilter === 'draft'
                ? 'bg-slate-200 text-slate-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            ○ Draft {statusCounts.draft}
          </button>
          <button
            onClick={() => setStatusFilter('on_hold')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full transition-colors',
              statusFilter === 'on_hold'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            ◐ On Hold {statusCounts.on_hold}
          </button>
        </div>
      </div>

      {/* Selected Relations Panel */}
      {selectedRelations.length > 0 && (
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
          <h5 className="text-xs font-semibold text-blue-900 mb-2">
            Selected Relations ({selectedRelations.length})
          </h5>
          <div className="space-y-1.5">
            {selectedRelations.map(rel => {
              const hypothesis = availableHypotheses.find(h => h.id === rel.hypothesisId);
              if (!hypothesis) return null;

              return (
                <div
                  key={rel.hypothesisId}
                  className="flex items-start gap-2 px-2.5 py-2 bg-white border border-blue-200 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'text-xs font-semibold px-1.5 py-0.5 rounded',
                        rel.type === 'supports' && 'bg-emerald-100 text-emerald-700',
                        rel.type === 'contradicts' && 'bg-red-100 text-red-700',
                        rel.type === 'nuances' && 'bg-amber-100 text-amber-700'
                      )}>
                        {getRelationIcon(rel.type)} {getRelationLabel(rel.type)}
                      </span>
                      <span className="text-xs text-slate-600 truncate">
                        {hypothesis.title}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveRelation(rel.hypothesisId)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
                    title="Remove relation"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Hypotheses List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filteredHypotheses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-slate-500">
              {searchQuery || statusFilter !== 'all'
                ? 'No hypotheses match your filters'
                : 'No other hypotheses in this project yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredHypotheses.map(hypothesis => {
              const relationType = getRelationType(hypothesis.id);

              return (
                <div
                  key={hypothesis.id}
                  className={cn(
                    'border rounded-lg overflow-hidden transition-all',
                    relationType
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  )}
                >
                  <div className="px-3 py-2.5">
                    {/* Hypothesis Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">
                          {hypothesis.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn('text-xs font-medium', STATUS_COLORS[hypothesis.status])}>
                            {STATUS_LABELS[hypothesis.status]}
                          </span>
                          {hypothesis.nodeId && (
                            <span className="text-xs text-slate-400">
                              • Node: {hypothesis.nodeId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Relation Type Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddRelation(hypothesis.id, 'supports')}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors',
                          relationType === 'supports'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                        )}
                        title="This hypothesis supports the other"
                      >
                        <span>✓</span>
                        <span>Supports</span>
                      </button>
                      <button
                        onClick={() => handleAddRelation(hypothesis.id, 'contradicts')}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors',
                          relationType === 'contradicts'
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-700'
                        )}
                        title="This hypothesis contradicts the other"
                      >
                        <span>✗</span>
                        <span>Contradicts</span>
                      </button>
                      <button
                        onClick={() => handleAddRelation(hypothesis.id, 'nuances')}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors',
                          relationType === 'nuances'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700'
                        )}
                        title="This hypothesis nuances/moderates the other"
                      >
                        <span>≈</span>
                        <span>Nuances</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-between gap-2 shrink-0">
        <div className="flex gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {onSkip && (
            <button
              onClick={onSkip}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Skip
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Create Hypothesis
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
