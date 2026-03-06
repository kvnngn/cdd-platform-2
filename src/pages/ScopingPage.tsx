import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronDown, ArrowRight, Sparkles,
  Circle, CheckCircle2, AlertTriangle, Clock,
  Plus, Trash2, Check, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/appStore';
import { getScopingQuestions } from '../data/scopingQuestions';
import { generateWorkstream } from '../lib/generateWorkstream';
import { ScopingAnswers, ScopingQuestion, WorkstreamNode, NodeStatus } from '../types';

// ─── Preview Tree ─────────────────────────────────────────────────────────────

const STATUS_ICONS: Record<NodeStatus, React.ComponentType<{ className?: string }>> = {
  not_started: Circle,
  in_progress: Clock,
  complete: CheckCircle2,
  blocked: AlertTriangle,
};

interface PreviewNodeProps {
  node: WorkstreamNode;
  allNodes: WorkstreamNode[];
  editable: boolean;
  onRename: (id: string, title: string) => void;
  onAdd: (parentId: string, level: number, order: number) => void;
  onDelete: (id: string) => void;
}

function PreviewNode({ node, allNodes, editable, onRename, onAdd, onDelete }: PreviewNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const [pendingDelete, setPendingDelete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const children = allNodes
    .filter(n => n.parentId === node.id)
    .sort((a, b) => a.order - b.order);
  const hasChildren = children.length > 0;
  const StatusIcon = STATUS_ICONS[node.status];

  const indent = node.level * 16;

  const commitRename = () => {
    if (editTitle.trim() && editTitle !== node.title) {
      onRename(node.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <div>
      <div
        className={cn(
          'group flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:bg-slate-50 transition-colors',
        )}
        style={{ marginLeft: `${indent}px` }}
      >
        {/* Expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-4 h-4 flex items-center justify-center text-slate-300 hover:text-slate-500 shrink-0"
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 block" />
          )}
        </button>

        <StatusIcon className="w-3.5 h-3.5 text-slate-300 shrink-0" />

        {/* Editable title */}
        {isEditing && editable ? (
          <input
            ref={inputRef}
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') { setEditTitle(node.title); setIsEditing(false); }
            }}
            onClick={e => e.stopPropagation()}
            className={cn(
              'flex-1 text-xs border-b border-blue-400 outline-none bg-transparent',
              node.level === 0 ? 'font-bold text-slate-800' : node.level === 1 ? 'font-semibold text-slate-700' : 'text-slate-600'
            )}
          />
        ) : (
          <span
            className={cn(
              'flex-1 text-xs leading-snug',
              node.level === 0 ? 'font-bold text-slate-800' : node.level === 1 ? 'font-semibold text-slate-700' : 'text-slate-600',
              editable && 'cursor-text'
            )}
            onDoubleClick={() => editable && setIsEditing(true)}
            title={editable ? 'Double-cliquer pour renommer' : undefined}
          >
            {node.title}
          </span>
        )}

        {/* Action buttons (hover) */}
        {editable && !pendingDelete && (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
            <button
              onClick={() => onAdd(node.id, node.level + 1, children.length + 1)}
              className="p-0.5 rounded text-slate-300 hover:text-blue-500 transition-colors"
              title="Ajouter un sous-nœud"
            >
              <Plus className="w-3 h-3" />
            </button>
            {node.level > 0 && (
              <button
                onClick={() => setPendingDelete(true)}
                className="p-0.5 rounded text-slate-300 hover:text-red-400 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Delete confirmation */}
        {editable && pendingDelete && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-red-500">Supprimer ?</span>
            <button onClick={() => onDelete(node.id)} className="p-0.5 text-red-500 hover:text-red-700">
              <Check className="w-3 h-3" />
            </button>
            <button onClick={() => setPendingDelete(false)} className="p-0.5 text-slate-400 hover:text-slate-600">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {children.map(child => (
            <PreviewNode
              key={child.id}
              node={child}
              allNodes={allNodes}
              editable={editable}
              onRename={onRename}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface WorkstreamPreviewProps {
  nodes: WorkstreamNode[];
  editable: boolean;
  onRename: (id: string, title: string) => void;
  onAdd: (parentId: string, level: number, order: number) => void;
  onDelete: (id: string) => void;
}

function WorkstreamPreview({ nodes, editable, onRename, onAdd, onDelete }: WorkstreamPreviewProps) {
  const roots = nodes.filter(n => n.parentId === null).sort((a, b) => a.order - b.order);

  if (nodes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-300 text-sm">
        Répondez aux questions pour voir l'arborescence se construire
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {roots.map(root => (
        <PreviewNode
          key={root.id}
          node={root}
          allNodes={nodes}
          editable={editable}
          onRename={onRename}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

// ─── Answer Widget ────────────────────────────────────────────────────────────

interface AnswerWidgetProps {
  question: ScopingQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

function AnswerWidget({ question, value, onChange }: AnswerWidgetProps) {
  if (question.type === 'checkbox') {
    const selected = (value as string[]) ?? [];
    const toggle = (opt: string) => {
      const next = selected.includes(opt)
        ? selected.filter(s => s !== opt)
        : [...selected, opt];
      onChange(next);
    };
    return (
      <div className="grid grid-cols-2 gap-2">
        {question.options!.map(opt => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={cn(
                'text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                isSelected
                  ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <span className="flex items-center gap-2">
                <span className={cn(
                  'w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0',
                  isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'
                )}>
                  {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === 'radio') {
    const selected = (value as string) ?? '';
    return (
      <div className="flex flex-col gap-2">
        {question.options!.map(opt => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                'text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-2',
                isSelected
                  ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <span className={cn(
                'w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0',
                isSelected ? 'border-blue-500' : 'border-slate-300'
              )}>
                {isSelected && <span className="w-2 h-2 rounded-full bg-blue-500 block" />}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  // text
  return (
    <textarea
      value={(value as string) ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder="Décrivez vos zones blanches ou sujets prioritaires…"
      rows={3}
      className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 resize-none"
    />
  );
}

// ─── Scoping Page ─────────────────────────────────────────────────────────────

type Phase = 'qa' | 'thinking' | 'done';

interface QAMessage {
  type: 'question' | 'answer';
  text: string;
  chips?: string[];
}

export function ScopingPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, addNodesForProject } = useAppStore();

  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    if (!project) navigate('/projects');
  }, [project, navigate]);

  const questions = project ? getScopingQuestions(project.template) : [];

  const [phase, setPhase] = useState<Phase>('qa');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<ScopingAnswers>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [history, setHistory] = useState<QAMessage[]>([]);
  const [previewNodes, setPreviewNodes] = useState<WorkstreamNode[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const historyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll history
  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, phase]);

  if (!project) return null;

  const currentQuestion = questions[currentQIndex];
  const isLastQuestion = currentQIndex === questions.length - 1;

  const hasAnswer = () => {
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0;
    return (currentAnswer as string).trim().length > 0;
  };

  const handleNext = () => {
    if (!hasAnswer()) return;

    const qId = currentQuestion.id;
    const newAnswers = { ...answers, [qId]: currentAnswer };
    setAnswers(newAnswers);

    // Add to history
    const chips = Array.isArray(currentAnswer) ? currentAnswer : undefined;
    const text = Array.isArray(currentAnswer)
      ? currentAnswer.join(', ')
      : (currentAnswer as string);

    setHistory(prev => [
      ...prev,
      { type: 'question', text: currentQuestion.text },
      { type: 'answer', text, chips },
    ]);

    // Update preview live
    const updated = generateWorkstream(
      projectId!,
      project.template,
      newAnswers,
      project.deadline,
      project.client,
    );
    setPreviewNodes(updated);

    if (isLastQuestion) {
      // Move to thinking phase
      setPhase('thinking');
      setTimeout(() => setPhase('done'), 900);
    } else {
      setCurrentQIndex(i => i + 1);
      setCurrentAnswer('');
    }
  };

  // Preview edit handlers
  const handleRename = (id: string, title: string) => {
    setPreviewNodes(prev => prev.map(n => n.id === id ? { ...n, title } : n));
  };

  const handleAdd = (parentId: string, level: number, order: number) => {
    const siblings = previewNodes.filter(n => n.parentId === parentId);
    const newNode: WorkstreamNode = {
      id: `${projectId}-ws-custom-${Date.now()}`,
      projectId: projectId!,
      parentId,
      title: 'Nouveau nœud',
      description: '',
      level,
      order: siblings.length + 1,
      status: 'not_started',
      assigneeId: null,
      deadline: project.deadline,
      deadlineStatus: 'ok',
      coverageScore: 0,
      sourceCount: 0,
      hypothesisCount: 0,
      validatedCount: 0,
    };
    setPreviewNodes(prev => [...prev, newNode]);
  };

  const handleDeletePreview = (id: string) => {
    // Recursively collect ids
    const idsToDelete = new Set<string>();
    const collect = (nid: string) => {
      idsToDelete.add(nid);
      previewNodes.filter(n => n.parentId === nid).forEach(child => collect(child.id));
    };
    collect(id);
    setPreviewNodes(prev => prev.filter(n => !idsToDelete.has(n.id)));
  };

  const handleLaunch = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 400));
    addNodesForProject(projectId!, previewNodes);
    navigate(`/projects/${projectId}`);
  };

  const progressPct = questions.length > 0
    ? Math.round(((isLastQuestion && phase !== 'qa' ? questions.length : currentQIndex) / questions.length) * 100)
    : 0;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Topbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-slate-700">Agent de cadrage</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>·</span>
          <span className="font-medium text-slate-600">{project.name}</span>
        </div>
        <div className="flex-1" />
        {phase === 'qa' && (
          <span className="text-xs text-slate-400">
            Question {currentQIndex + 1} / {questions.length}
          </span>
        )}
        {phase === 'done' && (
          <span className="text-xs text-emerald-600 font-medium">
            ✓ Arborescence générée — ajustez si besoin
          </span>
        )}
      </div>

      {/* Main 2-col layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left col — Q&A */}
        <div className="w-1/2 flex flex-col border-r border-slate-200 bg-white">

          {/* Progress bar */}
          {phase === 'qa' && (
            <div className="h-1 bg-slate-100 shrink-0">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}

          {/* Chat history */}
          <div
            ref={historyRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          >
            {/* Intro message */}
            {history.length === 0 && phase === 'qa' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Agent CDD</p>
                  <div className="bg-slate-50 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 leading-relaxed border border-slate-100">
                    Bonjour ! Je vais vous aider à structurer le périmètre de la due diligence sur{' '}
                    <span className="font-semibold text-blue-600">{project.client}</span>.
                    Répondez à quelques questions et je génèrerai une arborescence adaptée à votre thèse.
                  </div>
                </div>
              </div>
            )}

            {/* History messages */}
            {history.map((msg, i) => (
              <div key={i} className={cn('flex', msg.type === 'answer' ? 'justify-end' : 'gap-3')}>
                {msg.type === 'question' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={cn('max-w-[80%]', msg.type === 'answer' && 'text-right')}>
                  {msg.type === 'question' && (
                    <p className="text-xs font-semibold text-slate-500 mb-1">Agent CDD</p>
                  )}
                  {msg.type === 'question' ? (
                    <div className="bg-slate-50 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-700 border border-slate-100">
                      {msg.text}
                    </div>
                  ) : msg.chips && msg.chips.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {msg.chips.map(chip => (
                        <span key={chip} className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="inline-block bg-blue-500 text-white rounded-xl rounded-tr-sm px-4 py-2.5 text-sm">
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Thinking state */}
            {phase === 'thinking' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Agent CDD</p>
                  <div className="bg-slate-50 rounded-xl rounded-tl-sm px-4 py-3 border border-slate-100 flex items-center gap-2">
                    <span className="text-sm text-slate-500">Finalisation de l'arborescence</span>
                    <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Done state */}
            {phase === 'done' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Agent CDD</p>
                  <div className="bg-slate-50 rounded-xl rounded-tl-sm px-4 py-3 border border-slate-100 text-sm text-slate-700">
                    L'arborescence est prête. Vous pouvez la modifier à droite —{' '}
                    <span className="text-slate-500">double-clic pour renommer, + pour ajouter un nœud.</span>
                    {' '}Quand vous êtes satisfait, lancez la CDD.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current question + answer area */}
          {phase === 'qa' && (
            <div className="border-t border-slate-100 px-6 py-4 space-y-3 shrink-0 bg-white">
              {/* Current question bubble */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Agent CDD</p>
                  <p className="text-sm text-slate-700 font-medium">{currentQuestion?.text}</p>
                </div>
              </div>

              {/* Answer widget */}
              {currentQuestion && (
                <AnswerWidget
                  question={currentQuestion}
                  value={currentAnswer}
                  onChange={setCurrentAnswer}
                />
              )}

              {/* Next button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!hasAnswer()}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    hasAnswer()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  )}
                >
                  {isLastQuestion ? 'Générer' : 'Suivant'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Launch button (phase done) */}
          {phase === 'done' && (
            <div className="border-t border-slate-100 px-6 py-4 shrink-0">
              <button
                onClick={handleLaunch}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </span>
                    Création en cours…
                  </>
                ) : (
                  <>
                    Lancer la CDD
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right col — Live workstream preview */}
        <div className="w-1/2 flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Aperçu du workstream
            </span>
            {previewNodes.length > 0 && (
              <span className="text-xs text-slate-400">{previewNodes.length} nœuds</span>
            )}
          </div>

          <WorkstreamPreview
            nodes={previewNodes}
            editable={phase === 'done'}
            onRename={handleRename}
            onAdd={handleAdd}
            onDelete={handleDeletePreview}
          />

          {phase !== 'done' && previewNodes.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                L'arborescence se construira au fur et à mesure de vos réponses
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
