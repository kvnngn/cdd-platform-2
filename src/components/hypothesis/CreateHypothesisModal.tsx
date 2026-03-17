import { useState, useEffect } from 'react';
import { Lightbulb, X, Database, User, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { SourceLogo } from '@/components/ui/SourceLogo';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { SOURCES } from '@/data/mockData';
import { HypothesisSource } from '@/types';
import { useDocumentViewer } from '@/store/documentViewerStore';
import { HypothesisRelationsSelector, SelectedRelation } from './HypothesisRelationsSelector';

interface PrefillSource {
  sourceId: string;
  excerpt: string;
}

// Prefill data for AI synthesis mode
interface SynthesisPrefillData {
  nodeId: string;
  title: string;
  body: string;
  sources: HypothesisSource[];  // Already extracted from synthesis
  synthesis_id?: string;         // Original message ID
}

interface CreateHypothesisModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  projectId: string | null;

  // Legacy props (for backward compatibility)
  initialContent?: string;
  prefillSource?: PrefillSource;

  // New mode prop
  mode?: 'manual' | 'from_synthesis';
  synthesisPrefillData?: SynthesisPrefillData;

  onSuccess?: () => void;
}

type WizardStep = 'basic' | 'sources' | 'excerpts' | 'relations';

export function CreateHypothesisModal({
  isOpen,
  onClose,
  nodeId,
  projectId,
  initialContent,
  prefillSource,
  mode = 'manual',
  synthesisPrefillData,
  onSuccess,
}: CreateHypothesisModalProps) {
  const { createHypothesis, currentUser, nodes, setCellHypothesis, matrixCells, hypotheses, addHypothesisRelation } = useAppStore();
  const { openSourceDocument } = useDocumentViewer();

  // State
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodeId || '');
  const [currentStep, setCurrentStep] = useState<WizardStep>('basic');
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [sourceExcerpts, setSourceExcerpts] = useState<Map<string, string>>(new Map());
  const [bodyModified, setBodyModified] = useState(false); // Track if synthesis body was modified
  const [selectedRelations, setSelectedRelations] = useState<SelectedRelation[]>([]); // Relations to other hypotheses

  // Determine effective mode
  const effectiveMode = synthesisPrefillData ? 'from_synthesis' : mode;

  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (synthesisPrefillData) {
        // Mode: from_synthesis (new workflow)
        setTitle(synthesisPrefillData.title);
        setBody(synthesisPrefillData.body);
        setSelectedNodeId(synthesisPrefillData.nodeId);
        setBodyModified(false);

        // Pre-populate sources
        const sourceIds = synthesisPrefillData.sources.map(s => s.sourceId);
        setSelectedSources(new Set(sourceIds));

        // Pre-populate excerpts
        const excerpts = new Map();
        synthesisPrefillData.sources.forEach(s => {
          excerpts.set(s.sourceId, s.excerpt);
        });
        setSourceExcerpts(excerpts);

        // Skip to basic step (single-step for AI synthesis)
        setCurrentStep('basic');
      } else if (prefillSource) {
        // Legacy: Matrix pre-fill
        setBody(prefillSource.excerpt);
        setTitle('');
        setSelectedNodeId(nodeId || '');
        setSelectedSources(new Set([prefillSource.sourceId]));
        setSourceExcerpts(new Map([[prefillSource.sourceId, prefillSource.excerpt]]));
        setCurrentStep('basic');
      } else if (initialContent) {
        // Legacy: Initial content
        const firstLine = initialContent.split('\n')[0].replace(/\*\*/g, '');
        const truncated = firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
        setTitle(truncated);
        setBody(initialContent);
        setSelectedNodeId(nodeId || '');
        setCurrentStep('basic');
      } else {
        // Manual mode: Reset everything
        setTitle('');
        setBody('');
        setSelectedNodeId(nodeId || '');
        setSelectedSources(new Set());
        setSourceExcerpts(new Map());
        setBodyModified(false);
        setSelectedRelations([]);
        setCurrentStep('basic');
      }
    }
  }, [isOpen, initialContent, prefillSource, nodeId, synthesisPrefillData]);

  // Track body modifications for synthesis mode
  const handleBodyChange = (newBody: string) => {
    setBody(newBody);
    if (synthesisPrefillData && newBody !== synthesisPrefillData.body) {
      setBodyModified(true);
    }
  };

  if (!isOpen) return null;

  const projectNodes = nodes.filter(n => n.projectId === projectId);
  const userId = currentUser?.id || 'u1';

  // Get available sources for the selected node
  const availableSources = SOURCES.filter(s =>
    // For now, show all sources. Later, filter by node.
    true
  );

  const canSubmit = title.trim() && selectedNodeId && body.trim();

  // Debug log
  if (effectiveMode === 'from_synthesis') {
    console.log('CreateHypothesisModal debug:', {
      canSubmit,
      title: title.trim(),
      selectedNodeId,
      body: body.trim(),
      effectiveMode,
      synthesisPrefillData
    });
  }

  // Handler to open source with temporary excerpt (for preview during creation)
  const handleOpenSource = (sourceId: string) => {
    const excerpt = sourceExcerpts.get(sourceId) || '';
    // Create temporary HypothesisSource for preview
    const tempExcerpts: HypothesisSource[] = excerpt ? [{
      sourceId,
      excerpt,
      addedBy: userId,
      addedAt: new Date().toISOString(),
    }] : [];

    openSourceDocument(sourceId, { excerpts: tempExcerpts });
  };

  const handleSubmit = () => {
    console.log('handleSubmit called', {
      canSubmit,
      projectId,
      selectedNodeId,
      title: title.substring(0, 50),
      body: body.substring(0, 50),
      effectiveMode,
      hasMetadata: !!synthesisPrefillData
    });

    if (!canSubmit) {
      alert(`Cannot submit: ${!title.trim() ? 'Title is empty. ' : ''}${!selectedNodeId ? 'Node is not selected. ' : ''}${!body.trim() ? 'Body is empty.' : ''}`);
      return;
    }

    if (!projectId) {
      alert('Project ID is missing');
      return;
    }

    // Build sources list
    const sourcesList: HypothesisSource[] = Array.from(selectedSources).map(sourceId => ({
      sourceId,
      excerpt: sourceExcerpts.get(sourceId) || '',
      addedBy: userId,
      addedAt: new Date().toISOString(),
      note: effectiveMode === 'from_synthesis' ? 'From AI synthesis' :
            prefillSource ? 'Extracted from Analysis Matrix' : 'Manually added',
    }));

    const sourceIds = Array.from(selectedSources);
    const fromMatrix = !!prefillSource || (synthesisPrefillData?.synthesis_id?.startsWith('matrix-'));
    const fromSynthesis = effectiveMode === 'from_synthesis' && !fromMatrix;

    // Determine metadata
    const metadata = fromMatrix && synthesisPrefillData
      ? {
          source: 'matrix' as const,
          modified: bodyModified,
          original_synthesis_content: synthesisPrefillData.body,
          created_from_synthesis_id: synthesisPrefillData.synthesis_id,
        }
      : fromSynthesis && synthesisPrefillData
      ? {
          source: 'ai_synthesis' as const,
          modified: bodyModified,
          original_synthesis_content: synthesisPrefillData.body,
          created_from_synthesis_id: synthesisPrefillData.synthesis_id,
        }
      : prefillSource
      ? { source: 'matrix' as const }
      : { source: 'manual' as const, author: currentUser?.name || 'Unknown' };

    const newHypothesis = createHypothesis({
      projectId,
      nodeId: selectedNodeId,
      title: title.trim(),
      body: body.trim(),
      status: 'draft',
      createdBy: userId,
      updatedBy: userId,
      confidence: {
        sourceQuality: fromSynthesis || fromMatrix ? 80 : 70,
        crossVerification: 60,
        dataFreshness: 80,
        internalConsistency: 75,
        overall: fromSynthesis || fromMatrix ? 74 : 71,
      },
      sourceIds,
      sources: sourcesList,
      relations: [], // Will be added after creation
      tags: fromSynthesis ? ['ai-synthesis'] : fromMatrix ? ['matrix', 'ai-generated'] : initialContent ? ['ai-generated'] : [],
      comments: [],
      versions: [
        {
          version: 1,
          content: body.trim(),
          changedBy: userId,
          changedAt: new Date().toISOString(),
          changeNote: fromSynthesis ? 'Created from AI synthesis' : fromMatrix ? 'Created from Analysis Matrix' : initialContent ? 'Created from AI synthesis' : 'Created manually',
        },
      ],
      includedInReport: false,
      confidenceHistory: [
        { date: new Date().toISOString(), score: fromSynthesis || fromMatrix ? 74 : 71, event: 'Hypothesis created' },
      ],
      metadata,
    });

    // Add relations after hypothesis creation
    selectedRelations.forEach(rel => {
      addHypothesisRelation(newHypothesis.id, rel.hypothesisId, rel.type);
    });

    onSuccess?.();
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 'basic') {
      // For AI synthesis mode, skip directly to relations
      if (effectiveMode === 'from_synthesis') {
        setCurrentStep('relations');
      } else {
        setCurrentStep('sources');
      }
    } else if (currentStep === 'sources') {
      setCurrentStep('excerpts');
    } else if (currentStep === 'excerpts') {
      setCurrentStep('relations');
    }
  };

  const handleBack = () => {
    if (currentStep === 'relations') {
      // For AI synthesis mode, go back to basic
      if (effectiveMode === 'from_synthesis') {
        setCurrentStep('basic');
      } else {
        setCurrentStep('excerpts');
      }
    } else if (currentStep === 'excerpts') {
      setCurrentStep('sources');
    } else if (currentStep === 'sources') {
      setCurrentStep('basic');
    }
  };

  const toggleSourceSelection = (sourceId: string) => {
    const newSelection = new Set(selectedSources);
    if (newSelection.has(sourceId)) {
      newSelection.delete(sourceId);
      // Also remove excerpt
      const newExcerpts = new Map(sourceExcerpts);
      newExcerpts.delete(sourceId);
      setSourceExcerpts(newExcerpts);
    } else {
      newSelection.add(sourceId);
    }
    setSelectedSources(newSelection);
  };

  // Render step indicator
  const renderStepIndicator = () => {
    if (effectiveMode === 'from_synthesis') {
      // Single-step for AI synthesis (just basic + relations)
      const steps = ['Basic Info', 'Define Relations'];
      const stepKeys: WizardStep[] = ['basic', 'relations'];
      const currentIndex = stepKeys.indexOf(currentStep);

      return (
        <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-slate-200">
          {steps.map((stepName, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            return (
              <div key={stepName} className="flex items-center">
                <div className={cn(
                  'flex items-center gap-2 text-xs font-medium transition-colors',
                  isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                )}>
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    isActive ? 'bg-blue-600 text-white' :
                    isCompleted ? 'bg-emerald-500 text-white' :
                    'bg-slate-200 text-slate-500'
                  )}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <span className="hidden sm:inline">{stepName}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 mx-1" />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    const steps = ['Basic Info', 'Add Sources', 'Highlight Excerpts', 'Define Relations'];
    const stepKeys: WizardStep[] = ['basic', 'sources', 'excerpts', 'relations'];
    const currentIndex = stepKeys.indexOf(currentStep);

    return (
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-slate-200">
        {steps.map((stepName, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          return (
            <div key={stepName} className="flex items-center">
              <div className={cn(
                'flex items-center gap-2 text-xs font-medium transition-colors',
                isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
              )}>
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  isActive ? 'bg-blue-600 text-white' :
                  isCompleted ? 'bg-emerald-500 text-white' :
                  'bg-slate-200 text-slate-500'
                )}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className="hidden sm:inline">{stepName}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-800">
              {effectiveMode === 'from_synthesis' ? 'Create Hypothesis from AI Synthesis' :
               prefillSource ? 'Promote to hypothesis' : 'New hypothesis'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        {renderStepIndicator()}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {currentStep === 'basic' && (
            <div className="p-4 space-y-4">
              {/* Node selection - only for manual mode without pre-selected node */}
              {!nodeId && effectiveMode !== 'from_synthesis' && (
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Workstream node <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedNodeId}
                    onChange={e => setSelectedNodeId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                  >
                    <option value="">Select a node...</option>
                    {projectNodes.map(n => (
                      <option key={n.id} value={n.id}>
                        {'  '.repeat(n.level)}{n.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Pre-filled source from Matrix (legacy) */}
              {prefillSource && (() => {
                const src = SOURCES.find(s => s.id === prefillSource.sourceId);
                return src ? (
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-6 h-6 rounded flex items-center justify-center shrink-0 bg-white border border-blue-200 mt-0.5">
                      <SourceLogo source={src} size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                        Pre-filled source from Matrix
                      </p>
                      <p className="text-[11px] text-blue-800 font-medium truncate">{src.title}</p>
                      <p className="text-[10px] text-blue-500 mt-0.5">Reliability {src.reliabilityScore}%</p>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Title */}
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder={prefillSource ? 'Ex: DataSense NRR is structurally > 110%…' : 'Ex: The addressable market exceeds €500M in Europe...'}
                />
              </div>

              {/* Body */}
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                  {effectiveMode === 'from_synthesis' ? 'Hypothesis Body (editable)' : prefillSource ? 'Analyzed excerpt' : 'Content'}
                </label>
                <textarea
                  value={body}
                  onChange={e => handleBodyChange(e.target.value)}
                  rows={8}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none',
                    effectiveMode === 'from_synthesis' ? 'bg-white' : 'bg-slate-50'
                  )}
                  placeholder="Develop your hypothesis..."
                />
                {effectiveMode === 'from_synthesis' && bodyModified && (
                  <p className="mt-1 text-xs text-amber-600 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Content modified from original synthesis
                  </p>
                )}
                {prefillSource && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Pre-filled content from Matrix cell. Edit if necessary.
                  </p>
                )}
              </div>

              {/* Sources preview for synthesis mode - using same UI as excerpts step */}
              {effectiveMode === 'from_synthesis' && selectedSources.size > 0 && (
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-2 block">
                    Pre-attached Sources ({selectedSources.size})
                  </label>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Array.from(selectedSources).map(sourceId => {
                      const source = SOURCES.find(s => s.id === sourceId);
                      if (!source) return null;
                      const excerpt = sourceExcerpts.get(sourceId) || '';
                      return (
                        <div key={sourceId} className="border border-slate-200 rounded-lg overflow-hidden">
                          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-700">{source.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {source.category} · {source.reliabilityScore}% reliability
                              </p>
                            </div>
                            <button
                              onClick={() => handleOpenSource(sourceId)}
                              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors shrink-0"
                              title="Open source document"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Open
                            </button>
                          </div>
                          {excerpt && (
                            <div className="px-3 py-2 bg-amber-50 border-l-4 border-amber-400">
                              <p className="text-xs text-slate-600 italic leading-relaxed">"{excerpt}"</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 'sources' && (
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-1">
                  Select Sources ({selectedSources.size} selected)
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Choose sources that support this hypothesis
                </p>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableSources.map(source => {
                  const isSelected = selectedSources.has(source.id);
                  return (
                    <button
                      key={source.id}
                      onClick={() => toggleSourceSelection(source.id)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 border rounded-lg transition-all',
                        isSelected
                          ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5',
                          isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'
                        )}>
                          {isSelected && <span className="text-white text-xs">✓</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 mb-1">{source.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-2">{source.excerpt}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400">{source.category}</span>
                            <span className="text-xs text-emerald-600 font-medium">
                              {source.reliabilityScore}% reliability
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 'excerpts' && (
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-1">
                  Highlight Excerpts (Optional)
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Add specific excerpts from each source to support your hypothesis
                </p>
              </div>

              {selectedSources.size === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500">No sources selected</p>
                  <button
                    onClick={() => setCurrentStep('sources')}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Go back and select sources
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from(selectedSources).map(sourceId => {
                    const source = SOURCES.find(s => s.id === sourceId);
                    if (!source) return null;
                    const currentExcerpt = sourceExcerpts.get(sourceId) || '';
                    return (
                      <div key={sourceId} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700">{source.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{source.category} · {source.reliabilityScore}% reliability</p>
                          </div>
                          <button
                            onClick={() => handleOpenSource(sourceId)}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors shrink-0"
                            title="Open source document"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open
                          </button>
                        </div>
                        <div className="p-3">
                          <textarea
                            value={currentExcerpt}
                            onChange={e => {
                              const newExcerpts = new Map(sourceExcerpts);
                              newExcerpts.set(sourceId, e.target.value);
                              setSourceExcerpts(newExcerpts);
                            }}
                            placeholder="Paste or type the relevant excerpt from this source..."
                            rows={3}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {currentStep === 'relations' && (
            <HypothesisRelationsSelector
              projectId={projectId || ''}
              currentNodeId={selectedNodeId}
              availableHypotheses={hypotheses}
              selectedRelations={selectedRelations}
              onRelationsChange={setSelectedRelations}
              onSkip={handleSubmit}
              onBack={effectiveMode === 'from_synthesis' ? undefined : handleBack}
              onNext={handleSubmit}

              // New props for auto-detection
              newHypothesisTitle={title}
              newHypothesisBody={body}
              newHypothesisSources={Array.from(sourceExcerpts.entries()).map(([sourceId, excerpt]) => ({
                sourceId,
                excerpt,
                addedBy: userId,
                addedAt: new Date().toISOString(),
              }))}
              newHypothesisTags={effectiveMode === 'from_synthesis' ? ['ai-synthesis'] : prefillSource ? ['matrix', 'ai-generated'] : initialContent ? ['ai-generated'] : []}
            />
          )}
        </div>

        {/* Footer - Hide for relations step as it has its own footer */}
        {currentStep !== 'relations' && (
          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-between gap-2 shrink-0">
            <div className="flex gap-2">
              {currentStep !== 'basic' && effectiveMode !== 'from_synthesis' && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              {currentStep === 'basic' && effectiveMode === 'manual' && !prefillSource ? (
                <button
                  onClick={handleNext}
                  disabled={!title.trim() || !selectedNodeId || !body.trim()}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors',
                    title.trim() && selectedNodeId && body.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  )}
                >
                  Next: Add Sources
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : currentStep === 'basic' && effectiveMode === 'from_synthesis' ? (
                <button
                  onClick={handleNext}
                  disabled={!canSubmit}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors',
                    canSubmit
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  )}
                >
                  Next: Define Relations
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : currentStep === 'sources' && effectiveMode === 'manual' ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Highlight Excerpts
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : currentStep === 'excerpts' && effectiveMode === 'manual' ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next: Define Relations
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
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
                  {effectiveMode === 'from_synthesis' ? 'Create from Synthesis' : 'Create hypothesis'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
