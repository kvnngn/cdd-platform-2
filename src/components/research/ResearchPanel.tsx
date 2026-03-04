import { useState, useRef, useEffect } from 'react';
import {
  Search, RefreshCw, ExternalLink, AlertTriangle, CheckCircle2,
  Globe, FileText, Database, Mic, Send, Sparkles, Zap, BookOpen,
  ChevronDown, ChevronRight, Plus, Filter, ArrowRight,
  PanelLeftOpen, PanelLeftClose, ArrowLeft, Pin, ThumbsUp, ThumbsDown, X, Check
} from 'lucide-react';
import { cn, formatDate, getSourceCategoryLabel } from '../../lib/utils';
import { Source, SourceCategory, Hypothesis } from '../../types';
import { getResearchByNode, SOURCES, WORKSTREAM_NODES } from '../../data/mockData';
import { useAppStore } from '../../store/appStore';
import { useResizable } from '../../hooks/useResizable';
import { ResizeHandle } from '../ui/ResizeHandle';

// ─── Content with source references parser ───────────────────────────────────

interface ContentWithRefsProps {
  content: string;
  sources: string[];
  onSourceClick: (sourceId: string) => void;
}

function ContentWithRefs({ content, sources, onSourceClick }: ContentWithRefsProps) {
  // Parse content and replace [1], [2-3] with clickable badges
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Regex to match [number] or [number-number]
  const refRegex = /\[(\d+)(?:-(\d+))?\]/g;
  let match;

  while ((match = refRegex.exec(content)) !== null) {
    const [fullMatch, startNum, endNum] = match;
    const startIdx = match.index;
    const endIdx = startIdx + fullMatch.length;

    // Add text before the reference
    if (startIdx > lastIndex) {
      const textBefore = content.slice(lastIndex, startIdx);
      // Process bold text
      const boldParts = textBefore.split(/(\*\*.*?\*\*)/g);
      boldParts.forEach((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          parts.push(
            <strong key={`bold-${lastIndex}-${i}`} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        } else {
          parts.push(part);
        }
      });
    }

    // Create the reference badge(s)
    const startNumInt = parseInt(startNum, 10);
    const endNumInt = endNum ? parseInt(endNum, 10) : startNumInt;

    const badges: React.ReactNode[] = [];
    for (let i = startNumInt; i <= endNumInt; i++) {
      const sourceIndex = i - 1; // [1] = index 0
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
    parts.push(
      <span key={`ref-group-${startIdx}`} className="inline-flex">
        {badges}
      </span>
    );

    lastIndex = endIdx;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textAfter = content.slice(lastIndex);
    const boldParts = textAfter.split(/(\*\*.*?\*\*)/g);
    boldParts.forEach((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        parts.push(
          <strong key={`bold-end-${i}`} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      } else {
        parts.push(part);
      }
    });
  }

  return <>{parts}</>;
}

const CATEGORY_ICONS: Record<SourceCategory, React.ComponentType<{ className?: string }>> = {
  data_room: FileText,
  premium_report: Database,
  api: Database,
  web: Globe,
  interview: Mic,
};

const CATEGORY_COLORS: Record<SourceCategory, { text: string; bg: string; border: string }> = {
  data_room: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  premium_report: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  api: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  web: { text: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200' },
  interview: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
};

const CATEGORY_ORDER: SourceCategory[] = ['data_room', 'premium_report', 'api', 'interview', 'web'];

// ─── Mock chat messages ─────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
  type?: 'synthesis' | 'answer' | 'deep_research';
}

function getMockChatHistory(nodeId: string): ChatMessage[] {
  const syntheses: Record<string, ChatMessage[]> = {
    n1a: [
      {
        id: 'msg-1',
        role: 'assistant',
        type: 'synthesis',
        content: 'Le marché retail analytics européen affiche une croissance structurelle solide [1]. Les analyses convergent vers un **CAGR de 17-19%** à horizon 2028, avec une accélération notable du segment analytiques verticalisées [2].\n\n**Points clés :**\n- TAM européen estimé à 8,4Md$ en 2028 [2]\n- Segment verticalisé en croissance de 23% vs 15% pour les solutions généralistes [2]\n- DataSense positionné dans le quartile supérieur de croissance',
        sources: ['s2', 's6', 's4'],
        timestamp: '2026-03-02T14:30:00',
      },
      {
        id: 'msg-2',
        role: 'user',
        content: 'Quel est le risque principal sur cette projection de marché ?',
        timestamp: '2026-03-02T14:35:00',
      },
      {
        id: 'msg-3',
        role: 'assistant',
        type: 'answer',
        content: 'Le risque principal identifié est la **compression des budgets IT** en cas de ralentissement macro [1]. IDC note que les dépenses analytics retail restent résilientes (+16% YoY), mais une récession prolongée pourrait réduire le CAGR de 3-4 points [1].\n\nCependant, les contrats SaaS long-terme (36 mois en moyenne chez DataSense [2]) offrent une protection significative.',
        sources: ['s6', 's1'],
        timestamp: '2026-03-02T14:36:00',
      },
    ],
    n3a: [
      {
        id: 'msg-4',
        role: 'assistant',
        type: 'synthesis',
        content: 'DataSense affiche un **NRR de 118%** [1], significativement au-dessus du benchmark Forrester (médiane 105-110% pour SaaS B2B mid-market) [2].\n\n**Métriques clés :**\n- Churn gross annuel : 5,8% (benchmark : 8-12%) [1]\n- NRR net : +18% d\'expansion revenue [1]\n- Taux de renouvellement : 94% [1]\n- NPS moyen : 67 [1]',
        sources: ['s1', 's5', 's11'],
        timestamp: '2026-03-01T10:00:00',
      },
    ],
  };
  return syntheses[nodeId] || [];
}

// ─── Source sidebar item ────────────────────────────────────────────────────

function SourceItem({ source, isSelected, onClick }: {
  source: Source;
  isSelected: boolean;
  onClick: () => void;
}) {
  const cat = CATEGORY_COLORS[source.category];
  const Icon = CATEGORY_ICONS[source.category];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-2 rounded-lg transition-all text-xs group',
        isSelected
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-slate-50 border border-transparent',
        source.isDeprecated && 'opacity-50'
      )}
    >
      <div className="flex items-start gap-2">
        <Icon className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', cat.text)} />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-700 leading-tight line-clamp-2">{source.title}</div>
          <div className="flex items-center gap-2 mt-1 text-slate-400">
            <span className={cn(
              'font-semibold',
              source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500'
            )}>
              {source.reliabilityScore}%
            </span>
            <span>·</span>
            <span>{formatDate(source.publishedAt)}</span>
            {source.isDeprecated && (
              <>
                <span>·</span>
                <span className="text-red-500 font-medium">Dépréciée</span>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Source Content Viewer (NotebookLM style) ────────────────────────────────

function SourceContentViewer({ source, onClose }: { source: Source; onClose: () => void }) {
  const cat = CATEGORY_COLORS[source.category];
  const Icon = CATEGORY_ICONS[source.category];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-start gap-3">
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 mt-0.5"
          title="Retour à la liste"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Icon className={cn('w-4 h-4 shrink-0', cat.text)} />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {getSourceCategoryLabel(source.category)}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-900 leading-tight mt-1">{source.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>{source.author}</span>
            <span>·</span>
            <span>{formatDate(source.publishedAt)}</span>
            <span>·</span>
            <span className={cn(
              'font-semibold',
              source.reliabilityScore >= 80 ? 'text-emerald-600' : source.reliabilityScore >= 60 ? 'text-amber-500' : 'text-red-500'
            )}>
              Fiabilité: {source.reliabilityScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {source.content ? (
          <div className="prose prose-sm max-w-none">
            {source.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('#') || paragraph.startsWith('===')) {
                return <h2 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-3">{paragraph.replace(/[#=]/g, '').trim()}</h2>;
              }
              if (paragraph.match(/^\d+\./) || paragraph.startsWith('-') || paragraph.startsWith('•')) {
                return (
                  <div key={idx} className="flex gap-2 mb-2">
                    <span className="text-slate-400 shrink-0">{paragraph.match(/^\d+\./)?.[0] || '•'}</span>
                    <span className="text-slate-700">{paragraph.replace(/^\d+\.\s*/, '').replace(/^[-•]\s*/, '')}</span>
                  </div>
                );
              }
              if (paragraph.trim() === '') {
                return <div key={idx} className="h-4" />;
              }
              return <p key={idx} className="text-sm text-slate-700 leading-relaxed mb-3">{paragraph}</p>;
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Aperçu non disponible</p>
            <p className="text-xs text-slate-400 mt-1">Le contenu complet de cette source n'a pas été importé.</p>
          </div>
        )}
      </div>

      {/* Footer with excerpt */}
      {source.excerpt && (
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">Extrait clé</div>
          <p className="text-xs text-slate-600 leading-relaxed">{source.excerpt}</p>
        </div>
      )}
    </div>
  );
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
  const { hypotheses, setSelectedHypothesis } = useAppStore();

  useEffect(() => {
    if (isOpen) {
      // Extract a title from the first line or first sentence
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
      id: `h${Date.now()}`,
      projectId,
      nodeId,
      title: title.trim(),
      body: body.trim(),
      status: 'draft',
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user',
      confidence: {
        sourceQuality: 70,
        crossVerification: 60,
        dataFreshness: 80,
        internalConsistency: 75,
        overall: 71,
      },
      sourceIds: [],
      relations: [],
      tags: ['généré-ia'],
      comments: [],
      versions: [{
        version: 1,
        content: body.trim(),
        changedBy: 'current-user',
        changedAt: new Date().toISOString(),
        changeNote: 'Créé depuis une synthèse IA',
      }],
      includedInReport: false,
      confidenceHistory: [{
        date: new Date().toISOString(),
        score: 71,
        event: 'Hypothèse créée',
      }],
    };

    // Add to store
    useAppStore.setState({
      hypotheses: [newHypothesis, ...hypotheses],
    });

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
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="Titre de l'hypothèse..."
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Contenu</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
              placeholder="Contenu de l'hypothèse..."
            />
          </div>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors',
              title.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            )}
          >
            <Pin className="w-3.5 h-3.5" />
            Créer l'hypothèse
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Chat message bubble ────────────────────────────────────────────────────

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
    <div
      className="flex gap-2.5 group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {isSynthesis && (
          <div className="text-[10px] font-medium text-violet-500 uppercase tracking-wider mb-1">Synthèse IA</div>
        )}
        {message.type === 'deep_research' && (
          <div className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider mb-1">Deep Research</div>
        )}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 max-w-full">
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {message.sources ? (
              <ContentWithRefs
                content={message.content}
                sources={message.sources}
                onSourceClick={onSourceClick}
              />
            ) : (
              message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
              })
            )}
          </div>
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
              {message.sources.map((sId, idx) => {
                const src = SOURCES.find(s => s.id === sId);
                if (!src) return null;
                const cat = CATEGORY_COLORS[src.category];
                const Icon = CATEGORY_ICONS[src.category];
                return (
                  <button
                    key={sId}
                    onClick={() => onSourceClick(sId)}
                    className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border hover:opacity-80 transition-opacity', cat.bg, cat.text, cat.border)}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    <span>[{idx + 1}] {src.title.length > 30 ? src.title.substring(0, 30) + '…' : src.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Action buttons for synthesis */}
        {isSynthesis && (
          <div className={cn(
            'flex items-center gap-1 mt-1.5 transition-opacity duration-200',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            <button
              onClick={() => onCreateHypothesis(message.content)}
              className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Créer une hypothèse à partir de cette synthèse"
            >
              <Pin className="w-3 h-3" />
              Créer une hypothèse
            </button>
            <div className="w-px h-3 bg-slate-200 mx-1" />
            <button
              onClick={() => onFeedback('up')}
              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
              title="Cette synthèse est utile"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFeedback('down')}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Cette synthèse n'est pas utile"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

interface ResearchPanelProps {
  sourcesCollapsed?: boolean;
  onToggleSourcesCollapse?: () => void;
}

export function ResearchPanel({ sourcesCollapsed, onToggleSourcesCollapse }: ResearchPanelProps) {
  const { selectedNodeId, selectedProjectId } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<SourceCategory>>(new Set(CATEGORY_ORDER));
  const [isSearching, setIsSearching] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Modal state for creating hypothesis
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handlers for hypothesis creation and feedback
  const handleCreateHypothesis = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    showToast(
      type === 'up'
        ? 'Merci pour votre feedback positif !'
        : 'Merci pour votre feedback, nous allons améliorer la synthèse.',
      'success'
    );
  };

  // Resizable Sources sidebar
  const sourcesPanel = useResizable({
    initialWidth: 280,
    minWidth: 200,
    maxWidth: 500,
    collapseThreshold: 100,
    direction: 'right',
  });

  const node = selectedNodeId ? WORKSTREAM_NODES.find(n => n.id === selectedNodeId) : null;
  const synthesis = selectedNodeId ? getResearchByNode(selectedNodeId) : null;
  const chatHistory = selectedNodeId ? getMockChatHistory(selectedNodeId) : [];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory.length]);

  const toggleCategory = (cat: SourceCategory) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  // Group sources by category
  const groupedSources = CATEGORY_ORDER.map(cat => ({
    category: cat,
    sources: SOURCES.filter(s => {
      const matchesCategory = s.category === cat;
      const matchesFilter = !sourceFilter || s.title.toLowerCase().includes(sourceFilter.toLowerCase());
      return matchesCategory && matchesFilter;
    }),
  })).filter(g => g.sources.length > 0);

  const handleSend = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setQuery('');
    setTimeout(() => setIsSearching(false), 2000);
  };

  // Handle clicking on a source reference badge
  const handleSourceClick = (sourceId: string) => {
    setSelectedSourceId(sourceId);
    // If sources sidebar is collapsed, expand it
    if (sourcesCollapsed) {
      onToggleSourcesCollapse?.();
    }
  };

  // ─── Empty state ────────────────────────────────────────────────────────

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
    <div className="h-full flex">
      {/* ─── Left sidebar: Sources ─────────────────────────────────────── */}
      {!sourcesPanel.isCollapsed && (
        <div
          className={cn(
            'shrink-0 border-r border-slate-200 flex flex-col bg-white transition-all duration-300',
            sourcesCollapsed && 'hidden'
          )}
          style={{ width: sourcesPanel.width }}
        >
        {/* Sidebar header */}
        <div className={cn(
          'border-b border-slate-100 shrink-0',
          sourcesCollapsed ? 'px-2 py-3 flex flex-col items-center' : 'px-3 py-3'
        )}>
          <div className="flex items-center justify-between mb-2 w-full">
            {!sourcesCollapsed && (
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Sources</h3>
            )}
            <button
              onClick={onToggleSourcesCollapse}
              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title={sourcesCollapsed ? 'Développer les sources' : 'Réduire les sources'}
            >
              {sourcesCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Source search - only when expanded */}
          {!sourcesCollapsed && (
            <div className="flex items-center gap-1.5 bg-slate-50 rounded-md px-2 py-1.5 border border-slate-200">
              <Search className="w-3 h-3 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Filtrer les sources..."
                value={sourceFilter}
                onChange={e => setSourceFilter(e.target.value)}
                className="flex-1 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none"
              />
            </div>
          )}
        </div>

        {/* Source list OR Content viewer */}
        {!sourcesCollapsed && selectedSourceId ? (
          <SourceContentViewer
            source={SOURCES.find(s => s.id === selectedSourceId)!}
            onClose={() => setSelectedSourceId(null)}
          />
        ) : !sourcesCollapsed ? (
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {groupedSources.map(({ category, sources }) => {
              const Icon = CATEGORY_ICONS[category];
              const cat = CATEGORY_COLORS[category];
              const isExpanded = expandedCategories.has(category);

              return (
                <div key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    <Icon className={cn('w-3 h-3', cat.text)} />
                    <span>{getSourceCategoryLabel(category)}</span>
                    <span className="ml-auto text-slate-400 font-normal">{sources.length}</span>
                  </button>
                  {isExpanded && (
                    <div className="space-y-0.5 ml-1">
                      {sources.map(source => (
                        <SourceItem
                          key={source.id}
                          source={source}
                          isSelected={selectedSourceId === source.id}
                          onClick={() => setSelectedSourceId(selectedSourceId === source.id ? null : source.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Collapsed view - just category icons */
          <div className="flex-1 overflow-y-auto py-2 space-y-1">
            {groupedSources.map(({ category }) => {
              const Icon = CATEGORY_ICONS[category];
              const cat = CATEGORY_COLORS[category];
              return (
                <button
                  key={category}
                  onClick={onToggleSourcesCollapse}
                  className={cn(
                    'w-8 h-8 mx-auto rounded-lg flex items-center justify-center border transition-colors',
                    'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  )}
                  title={getSourceCategoryLabel(category)}
                >
                  <Icon className={cn('w-4 h-4', cat.text)} />
                </button>
              );
            })}
          </div>
        )}

        {/* Search actions - only when expanded */}
        {!sourcesCollapsed && (
          <div className="p-3 border-t border-slate-100 space-y-1.5 shrink-0">
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              Web Search
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-medium rounded-lg hover:from-violet-700 hover:to-blue-700 transition-colors">
              <Zap className="w-3.5 h-3.5" />
              Deep Research
            </button>
          </div>
        )}
      </div>
      )}

      {/* Collapsed sidebar view */}
      {sourcesPanel.isCollapsed && !sourcesCollapsed && (
        <div className="w-12 shrink-0 border-r border-slate-200 flex flex-col items-center py-4 bg-white">
          <button
            onClick={sourcesPanel.toggleCollapse}
            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors mb-4"
            title="Développer les sources"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Resize handle between Sources and Chat */}
      {!sourcesCollapsed && (
        <ResizeHandle
          onMouseDown={sourcesPanel.handleMouseDown}
          isDragging={sourcesPanel.isDragging}
          isCollapsed={sourcesPanel.isCollapsed}
          onToggleCollapse={sourcesPanel.toggleCollapse}
        />
      )}

      {/* ─── Right: Chat / Research area ──────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
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
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsSearching(true);
                setTimeout(() => setIsSearching(false), 2000);
              }}
              className={cn(
                'p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all',
                isSearching && 'animate-spin text-blue-500'
              )}
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
                <p className="text-xs text-slate-400 mb-4">
                  Posez une question ou lancez une recherche pour analyser les sources liées à ce nœud.
                </p>
                <div className="flex flex-col gap-2">
                  <button className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                    Synthétise les sources disponibles pour ce nœud
                  </button>
                  <button className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                    Quels sont les risques identifiés ?
                  </button>
                  <button className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                    Compare avec les benchmarks sectoriels
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map(msg => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  onSourceClick={handleSourceClick}
                  onCreateHypothesis={handleCreateHypothesis}
                  onFeedback={handleFeedback}
                />
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
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Posez une question sur les sources..."
                rows={1}
                className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none resize-none leading-relaxed"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!query.trim()}
              className={cn(
                'p-2.5 rounded-xl transition-all shrink-0',
                query.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  : 'bg-slate-100 text-slate-300'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for creating hypothesis */}
      <CreateHypothesisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        nodeId={selectedNodeId}
        projectId={selectedProjectId}
        onSuccess={() => showToast('Hypothèse créée avec succès !')}
      />

      {/* Toast notification */}
      {toast && (
        <Toast message={toast.message} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
