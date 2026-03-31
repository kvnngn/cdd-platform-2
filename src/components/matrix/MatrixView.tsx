import { useState, useEffect, useRef } from 'react';
import { TableProperties, CheckCircle2, Loader2, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { MatrixGrid } from './MatrixGrid';
import { CreateScopeModal } from './CreateScopeModal';
import { ALL_SOURCES, CONNECTOR_SOURCES } from '@/data/mockData';

/**
 * MatrixView - Hierarchical Matrix Display
 *
 * Displays matrix analysis based on node hierarchy:
 * - Leaf nodes: Direct matrix grid
 * - Parent nodes: Tabs showing child node matrices
 */

interface MatrixViewProps {
  nodeId: string | null;
  onTabChange?: (tab: 'chat' | 'matrix') => void;
  onOpenSources?: () => void;
}

export function MatrixView({ nodeId, onTabChange, onOpenSources }: MatrixViewProps) {
  console.log('[MatrixView] Rendered with onOpenSources:', !!onOpenSources, 'onTabChange:', !!onTabChange);
  const { nodes, matrixScopes } = useAppStore();

  // If no node selected, show empty state
  if (!nodeId) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <TableProperties className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Knowledge Base</p>
          <p className="text-xs text-slate-400">Select a node to view its knowledge base</p>
        </div>
      </div>
    );
  }

  const selectedNode = nodes.find((n) => n.id === nodeId);
  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-slate-500">Node not found</p>
      </div>
    );
  }

  // Determine if this is a leaf node or parent
  const childNodes = nodes.filter((n) => n.parentId === nodeId);
  const isLeaf = childNodes.length === 0;

  if (isLeaf) {
    // Leaf node: show matrix grid directly
    return <MatrixGridPlaceholder nodeId={nodeId} nodeName={selectedNode.title} onTabChange={onTabChange} onOpenSources={onOpenSources} />;
  }

  // Parent node: show tabs for each child
  return <ParentMatrixView nodeId={nodeId} nodeName={selectedNode.title} childNodes={childNodes} onTabChange={onTabChange} onOpenSources={onOpenSources} />;
}

/**
 * Parent Matrix View - Shows tabs for child nodes
 */
interface ParentMatrixViewProps {
  nodeId: string;
  nodeName: string;
  childNodes: Array<{
    id: string;
    title: string;
    projectId: string;
    parentId: string | null;
    description: string;
    level: number;
    order: number;
  }>;
  onTabChange?: (tab: 'chat' | 'matrix') => void;
  onOpenSources?: () => void;
}

function ParentMatrixView({ nodeId, nodeName, childNodes, onTabChange, onOpenSources }: ParentMatrixViewProps) {
  const [selectedChildId, setSelectedChildId] = useState<string>(childNodes[0]?.id || '');

  return (
    <div className="h-full flex flex-col">
      {/* Child node tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto flex-1">
          {childNodes.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                selectedChildId === child.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              )}
            >
              {child.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected child's matrix */}
      <div className="flex-1 overflow-hidden">
        {selectedChildId && (
          <MatrixGridPlaceholder
            nodeId={selectedChildId}
            nodeName={childNodes.find((c) => c.id === selectedChildId)?.title || ''}
            onTabChange={onTabChange}
            onOpenSources={onOpenSources}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Discovery animation steps
 */
const DISCOVERY_STEPS = [
  { label: 'Scanning document repository...', duration: 700 },
  { label: 'Analyzing semantic relevance...', duration: 900 },
  { label: 'Matching against scope criteria...', duration: 1000 },
  { label: 'Ranking by confidence score...', duration: 800 },
  { label: 'Preparing knowledge base...', duration: 600 },
];

const TOTAL_DOCUMENT_COUNT = ALL_SOURCES.length + CONNECTOR_SOURCES.length;

/**
 * Matrix Grid Container
 * Shows MatrixGrid if scope exists, or empty state to create scope.
 * When a new scope is created, shows a discovery animation before revealing the grid.
 */
function MatrixGridPlaceholder({ nodeId, nodeName, onTabChange, onOpenSources }: { nodeId: string; nodeName: string; onTabChange?: (tab: 'chat' | 'matrix') => void; onOpenSources?: () => void }) {
  const { matrixScopes, matrixCells, currentUser, showOnlyFavorites, toggleShowOnlyFavorites, updateMatrixScope } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Discovery animation state
  const [discoveryPhase, setDiscoveryPhase] = useState<'idle' | 'discovering' | 'done'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const animatedScopeRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Find scope for this node
  const scope = matrixScopes.find((s) => s.nodeId === nodeId);

  // Calculate favorites count for this scope
  const favoritesCount = scope
    ? matrixCells.filter(c => c.matrixScopeId === scope.id && c.isFavorite).length
    : 0;

  // Trigger discovery animation for newly created scopes (discoveryStatus === 'idle')
  useEffect(() => {
    if (!scope) return;

    // Already animated this scope, or scope was pre-existing (validated/reviewing)
    if (animatedScopeRef.current === scope.id) return;
    if (scope.discoveryStatus !== 'idle') {
      animatedScopeRef.current = scope.id;
      setDiscoveryPhase('done');
      return;
    }

    // New scope just created — run the discovery animation
    animatedScopeRef.current = scope.id;
    setDiscoveryPhase('discovering');
    setCurrentStep(0);
    setDiscoveredCount(0);

    let stepIndex = 0;
    const advanceStep = () => {
      stepIndex++;
      if (stepIndex < DISCOVERY_STEPS.length) {
        setCurrentStep(stepIndex);
        timerRef.current = setTimeout(advanceStep, DISCOVERY_STEPS[stepIndex].duration);
      } else {
        // All steps done — hold success state briefly, then transition
        timerRef.current = setTimeout(() => {
          setDiscoveryPhase('done');
          // Mark scope so animation won't replay on revisit
          if (scope) {
            updateMatrixScope(scope.id, { discoveryStatus: 'validated' });
          }
        }, 500);
      }
    };
    timerRef.current = setTimeout(advanceStep, DISCOVERY_STEPS[0].duration);

    // Animate the document counter — start incrementing after step 2
    const targetCount = scope.discoveredSourceIds.length;
    const counterDelay = DISCOVERY_STEPS[0].duration + DISCOVERY_STEPS[1].duration;
    const counterDuration = DISCOVERY_STEPS[2].duration + DISCOVERY_STEPS[3].duration + DISCOVERY_STEPS[4].duration;
    const intervalMs = 50;
    const incrementPer = Math.max(1, Math.ceil(targetCount / (counterDuration / intervalMs)));

    const startCounterTimeout = setTimeout(() => {
      let current = 0;
      counterRef.current = setInterval(() => {
        current = Math.min(current + incrementPer, targetCount);
        setDiscoveredCount(current);
        if (current >= targetCount && counterRef.current) {
          clearInterval(counterRef.current);
        }
      }, intervalMs);
    }, counterDelay);

    return () => {
      clearTimeout(startCounterTimeout);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, [scope?.id, scope?.discoveryStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, []);

  if (!scope) {
    // No scope defined yet - show empty state
    return (
      <>
        <div className="h-full flex items-center justify-center text-center p-8">
          <div className="max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center mx-auto mb-4">
              <TableProperties className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Define Knowledge Base Scope</h3>
            <p className="text-xs text-slate-500 mb-6">
              Create a semantic search prompt to discover relevant documents and build your knowledge base.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Define Scope
            </button>
          </div>
        </div>

        {showCreateModal && (
          <CreateScopeModal
            nodeId={nodeId}
            nodeName={nodeName}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </>
    );
  }

  // Scope exists — show discovery animation or matrix grid
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {discoveryPhase === 'discovering' ? (
            <motion.div
              key="discovery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-white z-10"
            >
              <div className="w-full max-w-md px-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      Finding best matching documents
                    </div>
                    <div className="text-xs text-slate-500">
                      Searching across <span className="font-medium text-slate-700">{TOTAL_DOCUMENT_COUNT.toLocaleString()}</span> documents
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep + 1) / DISCOVERY_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>

                {/* Step list */}
                <div className="space-y-2.5 mb-6">
                  {DISCOVERY_STEPS.map((step, i) => {
                    const isDone = i < currentStep;
                    const isActive = i === currentStep;
                    const isPending = i > currentStep;
                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {isActive && <Loader2 className="w-4 h-4 text-blue-500 shrink-0 animate-spin" />}
                        {isPending && <Clock className="w-4 h-4 text-slate-300 shrink-0" />}
                        <span className={cn(
                          'text-sm',
                          isDone && 'text-slate-500',
                          isActive && 'text-slate-800 font-medium',
                          isPending && 'text-slate-300',
                        )}>
                          {step.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Document counter */}
                {discoveredCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center pt-3 border-t border-slate-100"
                  >
                    <span className="text-2xl font-bold text-slate-800">{discoveredCount}</span>
                    <span className="text-sm text-slate-500 ml-2">documents found</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="matrix"
              initial={discoveryPhase === 'done' ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <MatrixGrid scope={scope} onTabChange={onTabChange} onOpenSources={onOpenSources} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
