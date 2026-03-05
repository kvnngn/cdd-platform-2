import { useState, useRef, useEffect } from 'react';
import {
  Search, RefreshCw, Send, Sparkles, BookOpen,
  ArrowRight, Pin, ThumbsUp, ThumbsDown, X, Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Hypothesis } from '../../types';
import { getResearchByNode, SOURCES, WORKSTREAM_NODES, NODE_SOURCES } from '../../data/mockData';

// ─── Helper: Get all source IDs for a node (including children) ──────────────

function getNodeSourceIdsWithChildren(nodeId: string | null): string[] {
  if (!nodeId) return [];

  // Get direct sources for this node
  const directSources = NODE_SOURCES[nodeId] || [];

  // Find all children nodes
  const childNodes = WORKSTREAM_NODES.filter(n => n.parentId === nodeId);

  // Recursively get sources from children
  const childSources = childNodes.flatMap(child => getNodeSourceIdsWithChildren(child.id));

  // Combine and deduplicate
  return [...new Set([...directSources, ...childSources])];
}

// ─── Helper: Get selected sources for a node and all its children ────────────

function getAllSelectedSources(nodeId: string | null, getNodeSelectedSources: (id: string) => string[]): string[] {
  if (!nodeId) return [];

  // Get selected sources for this node
  const directSelected = getNodeSelectedSources(nodeId);

  // Find all children nodes
  const childNodes = WORKSTREAM_NODES.filter(n => n.parentId === nodeId);

  // Recursively get selected sources from children
  const childSelected = childNodes.flatMap(child => getAllSelectedSources(child.id, getNodeSelectedSources));

  // Combine and deduplicate
  return [...new Set([...directSelected, ...childSelected])];
}
import { useAppStore } from '../../store/appStore';
import { CATEGORY_ICONS, CATEGORY_COLORS } from './SourcesPanel';

// ─── Content with source references parser ───────────────────────────────────

interface ContentWithRefsProps {
  content: string;
  sources: string[];
  onSourceClick: (sourceId: string) => void;
}

function ContentWithRefs({ content, sources, onSourceClick }: ContentWithRefsProps) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const refRegex = /\[(\d+)(?:-(\d+))?\]/g;
  let match;

  while ((match = refRegex.exec(content)) !== null) {
    const [fullMatch, startNum, endNum] = match;
    const startIdx = match.index;
    const endIdx = startIdx + fullMatch.length;

    if (startIdx > lastIndex) {
      const textBefore = content.slice(lastIndex, startIdx);
      const boldParts = textBefore.split(/(\*\*.*?\*\*)/g);
      boldParts.forEach((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          parts.push(<strong key={`bold-${lastIndex}-${i}`} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>);
        } else {
          parts.push(part);
        }
      });
    }

    const startNumInt = parseInt(startNum, 10);
    const endNumInt = endNum ? parseInt(endNum, 10) : startNumInt;
    const badges: React.ReactNode[] = [];
    for (let i = startNumInt; i <= endNumInt; i++) {
      const sourceIndex = i - 1;
      const sourceId = sources[sourceIndex];
      if (sourceId) {
        badges.push(
          <button
            key={`ref-${i}`}
            onClick={() => onSourceClick(sourceId)}
            className="inline-flex items-center justify-center px-1.5 py-0.5 mx-0.5 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 hover:border-blue-300 transition-colors"
          >
            {i}
          </button>
        );
      }
    }
    parts.push(<span key={`ref-group-${startIdx}`} className="inline-flex">{badges}</span>);
    lastIndex = endIdx;
  }

  if (lastIndex < content.length) {
    const textAfter = content.slice(lastIndex);
    const boldParts = textAfter.split(/(\*\*.*?\*\*)/g);
    boldParts.forEach((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        parts.push(<strong key={`bold-end-${i}`} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>);
      } else {
        parts.push(part);
      }
    });
  }

  return <>{parts}</>;
}

// ─── Mock chat messages ─────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
  type?: 'synthesis' | 'answer' | 'deep_research';
}

function getMockChatHistory(nodeId: string, _selectedSources: string[]): ChatMessage[] {
  // NOTE: Historical syntheses keep their original sources intact.
  // Current source selection only affects future generations, not past ones.
  const allSyntheses: Record<string, ChatMessage[]> = {
    n1a: [
      {
        id: 'msg-1', role: 'assistant', type: 'synthesis',
        content: 'Le marché retail analytics européen affiche une croissance structurelle solide [1]. Les analyses convergent vers un **CAGR de 17-19%** à horizon 2028, avec une accélération notable du segment analytiques verticalisées [2].\n\n**Points clés :**\n- TAM européen estimé à 8,4Md$ en 2028 [2]\n- Segment verticalisé en croissance de 23% vs 15% pour les solutions généralistes [2]\n- DataSense positionné dans le quartile supérieur de croissance',
        sources: ['s2', 's6', 's4'], timestamp: '2026-03-02T14:30:00',
      },
      {
        id: 'msg-2', role: 'user',
        content: 'Quel est le risque principal sur cette projection de marché ?',
        timestamp: '2026-03-02T14:35:00',
      },
      {
        id: 'msg-3', role: 'assistant', type: 'answer',
        content: 'Le risque principal identifié est la **compression des budgets IT** en cas de ralentissement macro [1]. IDC note que les dépenses analytics retail restent résilientes (+16% YoY), mais une récession prolongée pourrait réduire le CAGR de 3-4 points [1].\n\nCependant, les contrats SaaS long-terme (36 mois en moyenne chez DataSense [2]) offrent une protection significative.',
        sources: ['s6', 's1'], timestamp: '2026-03-02T14:36:00',
      },
    ],
    n3a: [
      {
        id: 'msg-4', role: 'assistant', type: 'synthesis',
        content: 'DataSense affiche un **NRR de 118%** [1], significativement au-dessus du benchmark Forrester (médiane 105-110% pour SaaS B2B mid-market) [2].\n\n**Métriques clés :**\n- Churn gross annuel : 5,8% (benchmark : 8-12%) [1]\n- NRR net : +18% d\'expansion revenue [1]\n- Taux de renouvellement : 94% [1]\n- NPS moyen : 67 [1]',
        sources: ['s1', 's5', 's11'], timestamp: '2026-03-01T10:00:00',
      },
    ],
  };

  // Return historical messages unchanged - source selection doesn't retroactively affect past syntheses
  return allSyntheses[nodeId] || [];
}

// ─── Toast notification ─────────────────────────────────────────────────────

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <Check className="w-4 h-4 text-emerald-400" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}

// ─── Create Hypothesis Modal ─────────────────────────────────────────────────

interface CreateHypothesisModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
  nodeId: string | null;
  projectId: string | null;
  onSuccess: () => void;
}

function CreateHypothesisModal({ isOpen, onClose, initialContent, nodeId, projectId, onSuccess }: CreateHypothesisModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { hypotheses } = useAppStore();

  useEffect(() => {
    if (isOpen) {
      const firstLine = initialContent.split('\n')[0].replace(/\*\*/g, '');
      const truncated = firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
      setTitle(truncated);
      setBody(initialContent);
    }
  }, [isOpen, initialContent]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !nodeId || !projectId) return;
    const newHypothesis: Hypothesis = {
      id: `h${Date.now()}`, projectId, nodeId,
      title: title.trim(), body: body.trim(), status: 'draft',
      createdBy: 'current-user', createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), updatedBy: 'current-user',
      confidence: { sourceQuality: 70, crossVerification: 60, dataFreshness: 80, internalConsistency: 75, overall: 71 },
      sourceIds: [], relations: [], tags: ['généré-ia'], comments: [],
      versions: [{ version: 1, content: body.trim(), changedBy: 'current-user', changedAt: new Date().toISOString(), changeNote: 'Créé depuis une synthèse IA' }],
      includedInReport: false,
      confidenceHistory: [{ date: new Date().toISOString(), score: 71, event: 'Hypothèse créée' }],
    };
    useAppStore.setState({ hypotheses: [newHypothesis, ...hypotheses] });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-800">Créer une hypothèse</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Titre</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Titre de l'hypothèse..." />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Contenu</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none" placeholder="Contenu de l'hypothèse..." />
          </div>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">Annuler</button>
          <button onClick={handleSubmit} disabled={!title.trim()} className={cn('px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors', title.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed')}>
            <Pin className="w-3.5 h-3.5" />
            Créer l'hypothèse
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Chat bubble ─────────────────────────────────────────────────────────────

interface ChatBubbleProps {
  message: ChatMessage;
  onSourceClick: (sourceId: string) => void;
  onCreateHypothesis: (content: string) => void;
  onFeedback: (type: 'up' | 'down') => void;
}

function ChatBubble({ message, onSourceClick, onCreateHypothesis, onFeedback }: ChatBubbleProps) {
  const [showActions, setShowActions] = useState(false);

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  const isSynthesis = message.type === 'synthesis';

  return (
    <div className="flex gap-2.5 group" onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {isSynthesis && <div className="text-[10px] font-medium text-violet-500 uppercase tracking-wider mb-1">Synthèse IA</div>}
        {message.type === 'deep_research' && <div className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider mb-1">Deep Research</div>}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 max-w-full">
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {message.sources ? (
              <ContentWithRefs content={message.content} sources={message.sources} onSourceClick={onSourceClick} />
            ) : (
              message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
              })
            )}
          </div>
        </div>
        {isSynthesis && (
          <div className={cn('flex items-center gap-1 mt-1.5 transition-opacity duration-200', showActions ? 'opacity-100' : 'opacity-0')}>
            <button onClick={() => onCreateHypothesis(message.content)} className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              <Pin className="w-3 h-3" />
              Créer une hypothèse
            </button>
            <div className="w-px h-3 bg-slate-200 mx-1" />
            <button onClick={() => onFeedback('up')} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onFeedback('down')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Research Panel (Chat only) ─────────────────────────────────────────

interface ResearchPanelProps {
  onSourceClick?: (sourceId: string) => void;
}

export function ResearchPanel({ onSourceClick }: ResearchPanelProps) {
  const { selectedNodeId, selectedProjectId, getNodeSelectedSources } = useAppStore();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Toast state
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const showToast = (message: string) => setToast({ message });

  const handleCreateHypothesis = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    showToast(type === 'up' ? 'Merci pour votre feedback positif !' : 'Merci, nous allons améliorer la synthèse.');
  };

  const handleSourceClick = (sourceId: string) => {
    onSourceClick?.(sourceId);
  };

  const node = selectedNodeId ? WORKSTREAM_NODES.find(n => n.id === selectedNodeId) : null;
  const synthesis = selectedNodeId ? getResearchByNode(selectedNodeId) : null;
  const allNodeSources = selectedNodeId ? getNodeSourceIdsWithChildren(selectedNodeId) : [];
  const selectedSources = selectedNodeId ? getAllSelectedSources(selectedNodeId, getNodeSelectedSources) : [];
  const chatHistory = selectedNodeId ? getMockChatHistory(selectedNodeId, selectedSources) : [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory.length]);

  const handleSend = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setQuery('');
    setTimeout(() => setIsSearching(false), 2000);
  };

  if (!selectedNodeId) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Research Engine</p>
          <p className="text-xs text-slate-400">Sélectionnez un nœud dans le workstream pour démarrer l'analyse</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 truncate">{node?.title || 'Research'}</h3>
            </div>
            {synthesis && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-100 rounded-full h-1 overflow-hidden max-w-32">
                  <div
                    className={cn('h-full rounded-full', synthesis.coverageScore >= 80 ? 'bg-emerald-500' : synthesis.coverageScore >= 60 ? 'bg-amber-400' : 'bg-red-400')}
                    style={{ width: `${synthesis.coverageScore}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">Couverture {synthesis.coverageScore}%</span>
                {/* Source filter indicator */}
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                  selectedSources.length < allNodeSources.length
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                )}>
                  {selectedSources.length}/{allNodeSources.length} sources
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => { setIsSearching(true); setTimeout(() => setIsSearching(false), 2000); }}
            className={cn('p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all', isSearching && 'animate-spin text-blue-500')}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">Pas encore de recherche</p>
              <p className="text-xs text-slate-400 mb-4">Posez une question ou lancez une recherche pour analyser les sources liées à ce nœud.</p>
              <div className="flex flex-col gap-2">
                {['Synthétise les sources disponibles pour ce nœud', 'Quels sont les risques identifiés ?', 'Compare avec les benchmarks sectoriels'].map((q, i) => (
                  <button key={i} className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map(msg => (
              <ChatBubble key={msg.id} message={msg} onSourceClick={handleSourceClick} onCreateHypothesis={handleCreateHypothesis} onFeedback={handleFeedback} />
            ))}
            {isSearching && (
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-white animate-pulse" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Analyse en cours...
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Chat input */}
      <div className="px-4 py-3 border-t border-slate-100 shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Posez une question sur les sources..."
              rows={1}
              className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none resize-none leading-relaxed"
            />
          </div>
          <button onClick={handleSend} disabled={!query.trim()} className={cn('p-2.5 rounded-xl transition-all shrink-0', query.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-slate-100 text-slate-300')}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <CreateHypothesisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialContent={modalContent} nodeId={selectedNodeId} projectId={selectedProjectId} onSuccess={() => showToast('Hypothèse créée avec succès !')} />
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
