import { useState, useMemo, useEffect } from 'react';
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

  // Auto-detect on component mount (systematic detection)
  useEffect(() => {
    if (canAutoDetect && !detectionComplete && !isDetecting) {
      // Trigger automatic detection when component loads
      handleAutoDetect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div>
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <LinkIcon className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-semibold text-slate-700">
            Link to Supporting Hypotheses
          </h4>
        </div>
        <p className="text-xs text-slate-500">
          Select existing hypotheses that provide evidence supporting your analysis.
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
          <div className="space-y-2">
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

      {/* Available Hypotheses List */}
      <div className="px-4 py-3">
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
                        title="This hypothesis provides supporting evidence"
                      >
                        <span>✓</span>
                        <span>Supports your hypothesis</span>
                      </button>
                      <button
                        onClick={() => handleAddRelation(hypothesis.id, 'contradicts')}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors',
                          relationType === 'contradicts'
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-700'
                        )}
                        title="This hypothesis contradicts your hypothesis"
                      >
                        <span>✗</span>
                        <span>Contradicts yours</span>
                      </button>
                      <button
                        onClick={() => handleAddRelation(hypothesis.id, 'nuances')}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors',
                          relationType === 'nuances'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700'
                        )}
                        title="This hypothesis adds nuance to your hypothesis"
                      >
                        <span>≈</span>
                        <span>Nuances yours</span>
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
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-between gap-2">
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
