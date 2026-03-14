import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  Search, RefreshCw, Send, Sparkles, BookOpen,
  ArrowRight, Pin, ThumbsUp, ThumbsDown, Check,
  MessageSquare, TableProperties
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Source } from '@/types';
import { getResearchByNode, SOURCES, WORKSTREAM_NODES, NODE_SOURCES } from '@/data/mockData';
import { USERS } from '@/data/users';
import {
  BarChart, Bar, Area, ComposedChart,
  XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

// ─── Helper: Get all source IDs for a node (including children) ──────────────

function getNodeSourceIdsWithChildren(nodeId: string | null, allNodes: any[]): string[] {
  if (!nodeId) return [];

  // Get direct sources for this node
  const directSources = NODE_SOURCES[nodeId] || [];

  // Find all children nodes
  const childNodes = allNodes.filter(n => n.parentId === nodeId);

  // Recursively get sources from children
  const childSources = childNodes.flatMap(child => getNodeSourceIdsWithChildren(child.id, allNodes));

  // Combine and deduplicate
  return [...new Set([...directSources, ...childSources])];
}

// ─── Helper: Get selected sources for a node and all its children ────────────

function getAllSelectedSources(nodeId: string | null, getNodeSelectedSources: (id: string) => string[], allNodes: any[]): string[] {
  if (!nodeId) return [];

  // Get selected sources for this node
  const directSelected = getNodeSelectedSources(nodeId);

  // Find all children nodes
  const childNodes = allNodes.filter(n => n.parentId === nodeId);

  // Recursively get selected sources from children
  const childSelected = childNodes.flatMap(child => getAllSelectedSources(child.id, getNodeSelectedSources, allNodes));

  // Combine and deduplicate
  return [...new Set([...directSelected, ...childSelected])];
}

// ─── Helper: Get hierarchical number for a node ──────────────────────────────

function getHierarchicalNumber(node: any, allNodes: any[]): string {
  const buildNumber = (nodeId: string, accumulated: number[] = []): number[] => {
    const current = allNodes.find(n => n.id === nodeId);
    if (!current) return accumulated;

    // Root has no number (level 0)
    if (current.level === 0) {
      return accumulated;
    }

    // Add current node's order
    const newAccumulated = [current.order, ...accumulated];

    // If has parent, continue recursively
    if (current.parentId) {
      return buildNumber(current.parentId, newAccumulated);
    }

    return newAccumulated;
  };

  const numbers = buildNumber(node.id);
  return numbers.length > 0 ? numbers.join('.') : '';
}

import { useAppStore } from '@/store/appStore';
import { CATEGORY_ICONS, CATEGORY_COLORS } from './SourcesPanel';
import { CreateHypothesisModal } from '../hypothesis/CreateHypothesisModal';
import { MatrixView } from '../matrix/MatrixView';
import { MatrixContextCard } from '../matrix/MatrixContextCard';

// ─── Citation Popover ─────────────────────────────────────────────────────────

const FILE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  xlsx: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  csv:  { bg: 'bg-violet-100',  text: 'text-violet-700'  },
  pdf:  { bg: 'bg-red-100',     text: 'text-red-600'     },
};

interface CitationPopoverProps {
  source: Source;
  onViewSource: () => void;
}

function CitationPopover({ source, onViewSource }: CitationPopoverProps) {
  const ftStyle  = source.fileType ? FILE_TYPE_COLORS[source.fileType] : null;
  const relColor = source.reliabilityScore >= 80 ? 'text-emerald-400'
                 : source.reliabilityScore >= 60 ? 'text-amber-400' : 'text-red-400';
  const relBar   = source.reliabilityScore >= 80 ? 'bg-emerald-500'
                 : source.reliabilityScore >= 60 ? 'bg-amber-400'   : 'bg-red-500';

  return (
    <div className="w-72 rounded-xl shadow-xl border border-slate-700/60 bg-slate-800 text-white p-3 space-y-2.5 animate-popover-in">
      {/* Titre + badge fileType */}
      <div className="flex items-start gap-2">
        {ftStyle && (
          <span className={cn('shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide', ftStyle.bg, ftStyle.text)}>
            {source.fileType}
          </span>
        )}
        <p className="text-xs font-semibold text-slate-100 leading-tight line-clamp-2">{source.title}</p>
      </div>

      {/* Barre de fiabilité */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-400 uppercase tracking-wide shrink-0">Reliability</span>
        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full', relBar)} style={{ width: `${source.reliabilityScore}%` }} />
        </div>
        <span className={cn('text-[11px] font-bold', relColor)}>{source.reliabilityScore}%</span>
      </div>

      {/* Extrait clé */}
      {source.excerpt && (
        <div className="bg-slate-700/50 rounded-lg px-2.5 py-2">
          <p className="text-[11px] text-slate-300 leading-relaxed italic line-clamp-4">"{source.excerpt}"</p>
        </div>
      )}

      {/* Footer : auteur · date + lien */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="text-[10px] text-slate-400 truncate max-w-[160px]">
          {source.author && <span>{source.author}</span>}
          {source.author && source.publishedAt && <span className="mx-1">·</span>}
          {source.publishedAt && <span>{formatDate(source.publishedAt)}</span>}
        </div>
        <button
          onClick={onViewSource}
          className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0"
        >
          Voir la source <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Content with source references parser ───────────────────────────────────

interface ContentWithRefsProps {
  content: string;
  sources: string[];
  onSourceClick: (sourceId: string) => void;
  onShowPopover: (sourceId: string, rect: DOMRect) => void;
  onHidePopover: () => void;
}

function ContentWithRefs({ content, sources, onSourceClick, onShowPopover, onHidePopover }: ContentWithRefsProps) {
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
            onMouseEnter={(e) => onShowPopover(sourceId, (e.currentTarget as HTMLElement).getBoundingClientRect())}
            onMouseLeave={onHidePopover}
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

// ─── Visual Block Types ─────────────────────────────────────────────────────

interface SourceAttribution {
  sourceId: string;
  sheet?: string;
  extract?: string;
}

interface KpiCard {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  benchmark?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'violet' | 'red' | 'slate';
}

interface TableBlockCell {
  text: string;
  highlight?: boolean;
  positive?: boolean;
  negative?: boolean;
}

type ChatBlock =
  | { type: 'kpi_row'; cards: KpiCard[]; sources?: SourceAttribution[] }
  | { type: 'chart_bar'; title: string; unit?: string; benchmarkLabel?: string; color?: string; data: { label: string; value: number; benchmark?: number }[]; sources?: SourceAttribution[] }
  | { type: 'chart_area'; title: string; unit?: string; data: { label: string; value: number; forecast?: boolean }[]; sources?: SourceAttribution[] }
  | { type: 'table'; title?: string; headers: string[]; rows: { cells: (string | TableBlockCell)[] }[]; caption?: string; sources?: SourceAttribution[] };

// ─── Mock chat messages ─────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
  type?: 'synthesis' | 'answer' | 'deep_research';
  blocks?: ChatBlock[];
}

function getMockChatHistory(nodeId: string, _selectedSources: string[]): ChatMessage[] {
  // NOTE: Historical syntheses keep their original sources intact.
  // Current source selection only affects future generations, not past ones.
  const allSyntheses: Record<string, ChatMessage[]> = {
    n1a: [
      {
        id: 'msg-1', role: 'assistant', type: 'synthesis',
        content: 'The European retail analytics market shows solid structural growth [1]. Analyses converge towards a **CAGR of 17-19%** by 2028, with notable acceleration in the verticalized analytics segment [2].\n\n**Key points:**\n- European TAM estimated at $8.4Bn in 2028 [2]\n- Verticalized segment growing at 23% vs 15% for generalist solutions [2]\n- DataSense positioned in the top quartile of growth',
        sources: ['s2', 's6', 's4'],
        timestamp: '2026-03-02T14:30:00',
        blocks: [
          {
            type: 'kpi_row',
            cards: [
              { label: 'TAM Europe 2025', value: '€3,6Md', delta: '+19% CAGR', deltaPositive: true, color: 'blue' },
              { label: 'Segment vertical', value: '34%', delta: 'of the market', deltaPositive: true, color: 'violet' },
              { label: 'DataSense croissance', value: '+40% ARR', delta: 'vs 2024', deltaPositive: true, color: 'emerald' },
              { label: 'TAM 2028 (forecast)', value: '€8.4B', color: 'slate' },
            ],
            sources: [{ sourceId: 's2', extract: 'Market Size & Growth' }],
          },
          {
            type: 'chart_area',
            title: 'European TAM Evolution',
            unit: 'Bn€',
            data: [
              { label: '2022', value: 2.1 },
              { label: '2023', value: 2.6 },
              { label: '2024', value: 3.1 },
              { label: '2025', value: 3.6 },
              { label: '2026', value: 4.3, forecast: true },
              { label: '2027', value: 5.2, forecast: true },
              { label: '2028', value: 6.3, forecast: true },
            ],
            sources: [{ sourceId: 's2', extract: 'TAM projections' }, { sourceId: 's6' }],
          },
          {
            type: 'table',
            title: 'Segmentation retail analytics',
            headers: ['Segment', 'Market Share', 'CAGR', 'Trend'],
            rows: [
              { cells: [{ text: 'Vertical SaaS (DataSense)', highlight: true }, { text: '34%', highlight: true }, { text: '23%', highlight: true }, { text: '↑ Strong acceleration', highlight: true }] },
              { cells: ['Generalist (Tableau, Power BI)', '66%', '15%', '→ Stable'] },
              { cells: ['of which Retail specialized EU', '18%', '27%', { text: '↑ Hypergrowth', positive: true }] },
            ],
            caption: 'Source: Gartner Retail Analytics Market Guide 2025',
            sources: [{ sourceId: 's2', extract: 'Segmentation by solution type' }],
          },
        ],
      },
      {
        id: 'msg-2', role: 'user',
        content: 'What is the main risk on this market projection?',
        timestamp: '2026-03-02T14:35:00',
      },
      {
        id: 'msg-3', role: 'assistant', type: 'answer',
        content: 'The main identified risk is **IT budget compression** in case of macro slowdown [1]. IDC notes that retail analytics spending remains resilient (+16% YoY), but a prolonged recession could reduce CAGR by 3-4 points [1].\n\nHowever, long-term SaaS contracts (36 months on average at DataSense [2]) offer significant protection.',
        sources: ['s6', 's1'], timestamp: '2026-03-02T14:36:00',
      },
    ],
    n3a: [
      {
        id: 'msg-val-user',
        role: 'user',
        content: 'Based on all available data, what is the fair valuation range for DataSense? Please provide a detailed breakdown with comparable multiples, DCF scenarios, and precedent transactions.',
        timestamp: '2026-03-14T10:30:00Z',
      },
      {
        id: 'msg-val-synthesis',
        role: 'assistant',
        type: 'synthesis',
        content: `Based on comprehensive analysis across **4 valuation methodologies**, DataSense fair value is estimated at **€105-140M** (7.5x-9.9x ARR), with a **base case of €125M (8.9x ARR)** [1-4].

**Key Valuation Drivers:**
- **Superior NRR**: 118% vs industry median 107% justifies **+0.5x multiple premium** [1, 2]
- **Strong growth profile**: 35% YoY with Rule of 40 at 53% [1]
- **Best-in-class retention**: 5.8% gross churn (vs benchmark 8-12%) [1]
- **Verticalized positioning**: Retail analytics focus commands **+0.6x sector premium** [4]

**Comparable Multiples Approach** [2]:
- Median public comp: 7.2x ARR (range 5.8x-10.1x)
- Adjusted for NRR premium (+0.55x) and growth (+0.40x)
- **Implied value: €116M (8.15x ARR)**

**DCF Approach** [3]:
- Base case (15% WACC, 35% growth): €125M (8.9x)
- Sensitivity range: €105M (conservative) to €140M (optimistic)

**Precedent Transactions** [4]:
- Median M&A multiple: 6.8x ARR (2024-2025, n=14 deals)
- Closest comp: Contentsquare at 8.2x (similar NRR 118%, growth 35%)
- **Estimated range: 7.5x-9.0x ARR**

The **8.9x base case multiple** reflects a justified premium over market median (7.2x) due to exceptional retention economics and vertical positioning. This places DataSense in the **top quartile** of SaaS analytics valuations [2, 4].`,
        sources: ['s16', 's17', 's18', 's19'],
        timestamp: '2026-03-14T10:32:00Z',
        blocks: [
          {
            type: 'kpi_row',
            cards: [
              {
                label: 'Base Case Valuation',
                value: '€125M',
                delta: '8.9x ARR',
                deltaPositive: true,
                color: 'blue',
              },
              {
                label: 'Valuation Range',
                value: '€105–140M',
                delta: '7.5x–9.9x ARR',
                color: 'blue',
              },
              {
                label: 'Premium vs Market',
                value: '+23%',
                delta: 'vs median 7.2x',
                deltaPositive: true,
                color: 'emerald',
              },
              {
                label: 'NRR Multiple Impact',
                value: '+0.55x',
                delta: '118% NRR',
                deltaPositive: true,
                color: 'violet',
              },
            ],
            sources: [
              { sourceId: 's18', sheet: 'DCF Summary', extract: 'Base Case Valuation' },
              { sourceId: 's17', extract: 'NRR Multiple Premium' },
            ],
          },
          {
            type: 'chart_bar',
            title: 'Valuation Range — Scenario Analysis',
            unit: '€M',
            benchmarkLabel: 'Base Case',
            color: '#3b82f6',
            data: [
              { label: 'Conservative (18% WACC)', value: 105, benchmark: 125 },
              { label: 'Base Case (15% WACC)', value: 125, benchmark: 125 },
              { label: 'Optimistic (12% WACC)', value: 140, benchmark: 125 },
              { label: 'Comp Multiples (8.15x)', value: 116, benchmark: 125 },
            ],
            sources: [
              { sourceId: 's18', sheet: 'Scenario Analysis', extract: 'WACC Sensitivity' },
              { sourceId: 's17', extract: 'Adjusted Multiples' },
            ],
          },
          {
            type: 'table',
            title: 'Revenue Multiple Comparables — SaaS Retail Analytics',
            headers: ['Company', 'EV/ARR', 'NRR', 'Growth', 'Key Note'],
            rows: [
              {
                cells: [
                  { text: 'DataSense (target)', highlight: true },
                  { text: '8.9x', highlight: true },
                  { text: '118%', highlight: true },
                  { text: '35%', highlight: true },
                  { text: '✓ Superior retention + growth', highlight: true },
                ],
              },
              {
                cells: [
                  'Contentsquare',
                  '8.2x',
                  '118%',
                  '35%',
                  '✓ Closest comparable',
                ],
              },
              {
                cells: [
                  'Yotpo Analytics',
                  '8.1x',
                  '115%',
                  '32%',
                  'High NRR peer',
                ],
              },
              {
                cells: [
                  'Amplitude (retail)',
                  '7.1x',
                  '107%',
                  '25%',
                  'Market median proxy',
                ],
              },
              {
                cells: [
                  'G2 (vertical B2B)',
                  '7.1x',
                  '110%',
                  '28%',
                  'Vertical SaaS comp',
                ],
              },
              {
                cells: [
                  { text: 'Median Market', positive: true },
                  { text: '7.2x', positive: true },
                  { text: '107%', positive: true },
                  { text: '25%', positive: true },
                  { text: 'Benchmark reference', positive: true },
                ],
              },
            ],
            caption: 'Sources: CapitalIQ, Pitchbook. Multiples on LTM ARR as of Q1 2026.',
            sources: [
              { sourceId: 's17', sheet: 'Public Comps', extract: 'Comparable Multiples' },
              { sourceId: 's19', extract: 'M&A Precedents' },
            ],
          },
          {
            type: 'chart_area',
            title: 'Multiple Sensitivity — Impact of NRR on Valuation',
            unit: 'EV/ARR Multiple',
            data: [
              { label: 'NRR 95%', value: 6.2 },
              { label: 'NRR 100%', value: 6.7 },
              { label: 'NRR 107% (median)', value: 7.2 },
              { label: 'NRR 110%', value: 7.5 },
              { label: 'NRR 115%', value: 8.0 },
              { label: 'NRR 118% (DataSense)', value: 8.75 },
              { label: 'NRR 120%+', value: 9.2, forecast: true },
            ],
            sources: [
              { sourceId: 's17', extract: 'NRR Multiple Premium Analysis' },
              { sourceId: 's18', sheet: 'Multiple Drivers' },
            ],
          },
        ],
      },
    ],
    n2a: [
      {
        id: 'msg-5', role: 'assistant', type: 'synthesis',
        content: 'DataSense is **the only French-speaking verticalized SaaS player** in retail analytics [1]. Compared to major generalist publishers (Tableau, Salesforce), DataSense benefits from a significant specialization and localization advantage [1].',
        sources: ['s3', 's7', 's8'],
        timestamp: '2026-03-02T11:00:00',
        blocks: [
          {
            type: 'table',
            title: 'Competitive Mapping',
            headers: ['Player', 'Scope', 'NRR', 'EU Presence', 'Position'],
            rows: [
              { cells: [{ text: 'DataSense', highlight: true }, { text: 'Retail vertical FR/EU', highlight: true }, { text: '118%', highlight: true }, { text: 'FR, BE, NL', highlight: true }, { text: '✓ EU vertical leader', highlight: true }] },
              { cells: ['Tableau / Salesforce', 'Global generalist', '~108%', 'Global', { text: 'Less retail specialized', negative: true }] },
              { cells: ['Dunnhumby', 'Groceries UK', 'N/A', 'UK, limited FR', { text: 'UK-centric, groceries only', negative: true }] },
              { cells: ['Symphony RetailAI', 'Retail US/global', 'N/A', 'Very limited', { text: 'No EU presence', negative: true }] },
            ],
            caption: 'Source: Competitive Intelligence Report DataSense + analyse StratCap',
            sources: [{ sourceId: 's8', sheet: 'Competitive Analysis' }],
          },
        ],
      },
    ],
    n4a: [
      {
        id: 'msg-6', role: 'assistant', type: 'synthesis',
        content: 'DataSense pricing structure is **well positioned in the mid-market** with an ARPU of €127K [1]. The CAC payback of 18 months is favorable vs the industry benchmark (24 months) [1]. The LTV/CAC of 4.2x confirms the economic model viability.',
        sources: ['s1', 's3', 's12'],
        timestamp: '2026-03-03T09:00:00',
        blocks: [
          {
            type: 'kpi_row',
            cards: [
              { label: 'ARR', value: '€14,2M', delta: '+28% YoY', deltaPositive: true, color: 'blue' },
              { label: 'ARPU', value: '€127K', delta: '+12% YoY', deltaPositive: true, color: 'emerald' },
              { label: 'CAC Payback', value: '18 mois', benchmark: 'Bench: 24 mois', color: 'amber' },
              { label: 'LTV/CAC', value: '4,2x', benchmark: 'Bench: 3x', color: 'violet' },
            ],
            sources: [{ sourceId: 's1', sheet: 'Pricing Schedule', extract: 'Unit Economics FY25' }],
          },
          {
            type: 'table',
            title: 'Pricing Structure',
            headers: ['Tier', 'Target Client', 'Price / year', 'Included Modules'],
            rows: [
              { cells: ['Starter', 'Mid-size (< 500 stores)', '€40–80K', 'Basic analytics, 5 connectors'] },
              { cells: ['Business', 'Regional retail (500–2,000)', '€80–150K', 'Advanced analytics, 15 connectors, AI'] },
              { cells: [{ text: 'Enterprise', positive: true }, 'Large accounts (> 2,000)', '€150K+', 'Full suite, unlimited connectors, 99.9% SLA'] },
            ],
            caption: 'Indicative pricing. Average contracts 36 months.',
            sources: [{ sourceId: 's1', sheet: 'Pricing Schedule' }],
          },
        ],
      },
    ],
  };

  // Return historical messages unchanged - source selection doesn't retroactively affect past syntheses
  return allSyntheses[nodeId] || [];
}

// ─── Source Attribution Bar ──────────────────────────────────────────────────

function SourceAttributionBar({ sources }: { sources: SourceAttribution[] }) {
  return (
    <div className="border-t border-slate-100 bg-slate-50 px-3 py-2 flex flex-wrap gap-x-4 gap-y-1 rounded-b-lg">
      {sources.map((attr, i) => {
        const source = SOURCES.find(s => s.id === attr.sourceId);
        if (!source) return null;
        const isXlsx = source.fileType === 'xlsx';
        const isCsv = source.fileType === 'csv';
        const isPdf = source.fileType === 'pdf';
        return (
          <div key={i} className="flex items-center gap-1.5">
            {source.fileType && (
              <span className={cn(
                'text-[9px] font-bold px-1 py-0.5 rounded uppercase tracking-wide',
                isXlsx ? 'bg-emerald-100 text-emerald-700' :
                isCsv ? 'bg-violet-100 text-violet-700' :
                isPdf ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
              )}>
                {source.fileType}
              </span>
            )}
            <div>
              <span className="text-[10px] text-slate-500 font-medium">
                {source.fileName ?? source.title}
              </span>
              {(attr.sheet || attr.extract) && (
                <span className="text-[10px] text-slate-400">
                  {attr.sheet && ` · ${attr.sheet}`}{attr.extract && ` · ${attr.extract}`}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── KPI Row Block ───────────────────────────────────────────────────────────

const KPI_BG: Record<string, string> = {
  blue: 'bg-blue-50', emerald: 'bg-emerald-50', amber: 'bg-amber-50',
  violet: 'bg-violet-50', red: 'bg-red-50', slate: 'bg-slate-50',
};
const KPI_VALUE: Record<string, string> = {
  blue: 'text-blue-700', emerald: 'text-emerald-700', amber: 'text-amber-700',
  violet: 'text-violet-700', red: 'text-red-700', slate: 'text-slate-700',
};

function KpiRowBlock({ block }: { block: Extract<ChatBlock, { type: 'kpi_row' }> }) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-2 gap-px bg-slate-100 p-px">
        {block.cards.map((card, i) => {
          const color = card.color ?? 'blue';
          return (
            <div key={i} className={cn('px-3 py-2.5 bg-white', KPI_BG[color])}>
              <div className="text-[10px] text-slate-500 mb-0.5">{card.label}</div>
              <div className={cn('text-base font-bold leading-tight', KPI_VALUE[color])}>{card.value}</div>
              {card.delta && (
                <div className={cn('text-[10px] font-medium mt-0.5', card.deltaPositive ? 'text-emerald-600' : 'text-red-500')}>
                  {card.deltaPositive ? '↑' : '↓'} {card.delta}
                </div>
              )}
              {card.benchmark && <div className="text-[10px] text-slate-400 mt-0.5">{card.benchmark}</div>}
            </div>
          );
        })}
      </div>
      {block.sources && block.sources.length > 0 && <SourceAttributionBar sources={block.sources} />}
    </div>
  );
}

// ─── Chart Bar Block ─────────────────────────────────────────────────────────

function ChartBarBlock({ block }: { block: Extract<ChatBlock, { type: 'chart_bar' }> }) {
  const color = block.color ?? '#3b82f6';
  const benchmarkY = block.data.find(d => d.benchmark !== undefined)?.benchmark;
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-3 pt-3 pb-1">
        {block.title && (
          <div className="text-[11px] font-semibold text-slate-700 mb-2">
            {block.title}
            {block.unit && <span className="font-normal text-slate-400 ml-1">({block.unit})</span>}
          </div>
        )}
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={block.data} barSize={28} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            {benchmarkY !== undefined && (
              <ReferenceLine
                y={benchmarkY}
                stroke="#94a3b8"
                strokeDasharray="4 3"
                label={{ value: block.benchmarkLabel ?? 'Benchmark', fontSize: 9, fill: '#64748b', position: 'insideTopRight' }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {block.sources && block.sources.length > 0 && <SourceAttributionBar sources={block.sources} />}
    </div>
  );
}

// ─── Chart Area Block ────────────────────────────────────────────────────────

function ChartAreaBlock({ block }: { block: Extract<ChatBlock, { type: 'chart_area' }> }) {
  const hasForecast = block.data.some(d => d.forecast);
  // Build separate keys for actual vs forecast, with overlap at transition
  const chartData = block.data.map((d, i) => {
    const isTransition = d.forecast && i > 0 && !block.data[i - 1].forecast;
    return {
      label: d.label,
      actual: (!d.forecast || isTransition) ? d.value : undefined,
      forecast: (d.forecast || isTransition) ? d.value : undefined,
    };
  });

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-3 pt-3 pb-1">
        {block.title && (
          <div className="text-[11px] font-semibold text-slate-700 mb-2">
            {block.title}
            {block.unit && <span className="font-normal text-slate-400 ml-1">({block.unit})</span>}
          </div>
        )}
        <ResponsiveContainer width="100%" height={160}>
          <ComposedChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} fill="url(#actualGrad)" dot={false} connectNulls />
            {hasForecast && (
              <Area type="monotone" dataKey="forecast" stroke="#93c5fd" strokeWidth={2} strokeDasharray="5 3" fill="url(#forecastGrad)" dot={false} connectNulls />
            )}
          </ComposedChart>
        </ResponsiveContainer>
        {hasForecast && (
          <div className="flex items-center gap-3 mt-1 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-0.5 bg-blue-500 rounded-full" />
              <span className="text-[10px] text-slate-400">Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-px bg-blue-300 rounded-full" style={{ borderTop: '1px dashed #93c5fd' }} />
              <span className="text-[10px] text-slate-400">Forecast</span>
            </div>
          </div>
        )}
      </div>
      {block.sources && block.sources.length > 0 && <SourceAttributionBar sources={block.sources} />}
    </div>
  );
}

// ─── Table Block ─────────────────────────────────────────────────────────────

function TableBlock({ block }: { block: Extract<ChatBlock, { type: 'table' }> }) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      {block.title && (
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-700">
          {block.title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {block.headers.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                {row.cells.map((cell, ci) => {
                  const isObj = typeof cell === 'object';
                  const text = isObj ? cell.text : cell;
                  const highlight = isObj ? cell.highlight : false;
                  const positive = isObj ? cell.positive : false;
                  const negative = isObj ? cell.negative : false;
                  return (
                    <td key={ci} className={cn(
                      'px-3 py-2 whitespace-nowrap',
                      highlight && 'bg-blue-50 text-blue-700 font-semibold',
                      positive && !highlight && 'text-emerald-600 font-medium',
                      negative && !highlight && 'text-red-500 font-medium',
                      !highlight && !positive && !negative && 'text-slate-600'
                    )}>{text}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption && (
        <div className="px-3 py-1.5 text-[10px] text-slate-400 border-t border-slate-100 italic">{block.caption}</div>
      )}
      {block.sources && block.sources.length > 0 && <SourceAttributionBar sources={block.sources} />}
    </div>
  );
}

// ─── Chat Block Renderer ─────────────────────────────────────────────────────

function ChatBlockRenderer({ block }: { block: ChatBlock }) {
  switch (block.type) {
    case 'kpi_row': return <KpiRowBlock block={block} />;
    case 'chart_bar': return <ChartBarBlock block={block} />;
    case 'chart_area': return <ChartAreaBlock block={block} />;
    case 'table': return <TableBlock block={block} />;
    default: return null;
  }
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

// ─── Chat bubble ─────────────────────────────────────────────────────────────

interface ChatBubbleProps {
  message: ChatMessage;
  onSourceClick: (sourceId: string) => void;
  onCreateHypothesis: (content: string, sources?: string[], messageId?: string) => void;
  onFeedback: (type: 'up' | 'down') => void;
  onShowPopover: (sourceId: string, rect: DOMRect) => void;
  onHidePopover: () => void;
}

function ChatBubble({ message, onSourceClick, onCreateHypothesis, onFeedback, onShowPopover, onHidePopover }: ChatBubbleProps) {
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
        {isSynthesis && <div className="text-[10px] font-medium text-violet-500 uppercase tracking-wider mb-1">AI Synthesis</div>}
        {message.type === 'deep_research' && <div className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider mb-1">Deep Research</div>}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 max-w-full">
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {message.sources ? (
              <ContentWithRefs content={message.content} sources={message.sources} onSourceClick={onSourceClick} onShowPopover={onShowPopover} onHidePopover={onHidePopover} />
            ) : (
              message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
              })
            )}
          </div>
          {message.blocks && message.blocks.length > 0 && (
            <div className="space-y-2 mt-3">
              {message.blocks.map((block, i) => (
                <ChatBlockRenderer key={i} block={block} />
              ))}
            </div>
          )}
        </div>
        {isSynthesis && (
          <div className={cn('flex items-center gap-1 mt-1.5 transition-opacity duration-200', showActions ? 'opacity-100' : 'opacity-0')}>
            <button onClick={() => onCreateHypothesis(message.content, message.sources, message.id)} className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              <Pin className="w-3 h-3" />
              Create hypothesis from synthesis
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
  onTabChange?: (tab: 'chat' | 'matrix') => void;
  onOpenSources?: () => void;
}

type ResearchTab = 'chat' | 'matrix';

export function ResearchPanel({ onSourceClick, onTabChange, onOpenSources }: ResearchPanelProps) {
  const { selectedNodeId, selectedProjectId, getNodeSelectedSources, selectedResearchTab, setSelectedResearchTab, matrixChatContext, clearMatrixChatContext, nodes: allNodes, currentUser } = useAppStore();
  const activeTab = selectedResearchTab;
  const setActiveTab = setSelectedResearchTab;
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Handle tab change from child components (e.g., MatrixGrid)
  const handleTabChange = (tab: 'chat' | 'matrix') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalMode, setModalMode] = useState<'manual' | 'from_synthesis'>('manual');
  const [synthesisPrefillData, setSynthesisPrefillData] = useState<{
    nodeId: string;
    title: string;
    body: string;
    sources: { sourceId: string; excerpt: string; addedBy: string; addedAt: string }[];
    synthesis_id?: string;
  } | undefined>(undefined);

  // Toast state
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const showToast = (message: string) => setToast({ message });

  // --- Popover citation global (1 seul à la fois, rendu en portal) ---
  const [activePopover, setActivePopover] = useState<{
    sourceId: string;
    anchorRect: DOMRect;
  } | null>(null);
  const popoverHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCitationPopover = useCallback((sourceId: string, anchorRect: DOMRect) => {
    if (popoverHideTimer.current) clearTimeout(popoverHideTimer.current);
    setActivePopover({ sourceId, anchorRect });
  }, []);

  const hideCitationPopover = useCallback(() => {
    popoverHideTimer.current = setTimeout(() => setActivePopover(null), 150);
  }, []);

  const keepCitationPopoverOpen = useCallback(() => {
    if (popoverHideTimer.current) clearTimeout(popoverHideTimer.current);
  }, []);

  const handleCreateHypothesis = (content: string, sources?: string[], messageId?: string) => {
    console.log('handleCreateHypothesis called:', {
      content: content.substring(0, 50),
      sources,
      messageId,
      selectedNodeId,
      selectedProjectId
    });

    if (sources && sources.length > 0 && selectedNodeId) {
      // Mode: from_synthesis - Pre-fill with synthesis data
      const extractTitle = (text: string) => {
        // Extract first sentence or first line as title
        const firstLine = text.split('\n')[0].replace(/\*\*/g, '').trim();
        return firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
      };

      const extractExcerpt = (sourceId: string, content: string) => {
        // Extract relevant excerpt from content for this source
        // This is a simplified version - in production, you'd parse citation references
        const source = SOURCES.find(s => s.id === sourceId);
        return source?.excerpt || content.substring(0, 200) + '...';
      };

      const userId = currentUser?.id || 'u1';
      const sourcesData = sources.map(sourceId => ({
        sourceId,
        excerpt: extractExcerpt(sourceId, content),
        addedBy: userId,
        addedAt: new Date().toISOString(),
      }));

      setSynthesisPrefillData({
        nodeId: selectedNodeId,
        title: extractTitle(content),
        body: content,
        sources: sourcesData,
        synthesis_id: messageId,
      });
      setModalMode('from_synthesis');
      setModalContent('');
    } else {
      // Legacy mode: manual hypothesis or simple content
      setModalContent(content);
      setModalMode('manual');
      setSynthesisPrefillData(undefined);
    }
    setIsModalOpen(true);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    showToast(type === 'up' ? 'Thank you for your positive feedback!' : 'Thank you, we will improve the synthesis.');
  };

  const handleSourceClick = (sourceId: string) => {
    onSourceClick?.(sourceId);
  };

  const node = selectedNodeId ? allNodes.find(n => n.id === selectedNodeId) : null;
  const nodeNumber = node ? getHierarchicalNumber(node, allNodes) : '';
  const synthesis = selectedNodeId ? getResearchByNode(selectedNodeId) : null;
  const allNodeSources = selectedNodeId ? getNodeSourceIdsWithChildren(selectedNodeId, allNodes) : [];
  const selectedSources = selectedNodeId ? getAllSelectedSources(selectedNodeId, getNodeSelectedSources, allNodes) : [];
  const chatHistory = selectedNodeId ? getMockChatHistory(selectedNodeId, selectedSources) : [];

  // Get projectId from selected node if selectedProjectId is null
  const effectiveProjectId = selectedProjectId || node?.projectId || null;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory.length]);

  // Auto-scroll to bottom when switching to chat tab or when matrix context changes
  useEffect(() => {
    if (activeTab === 'chat' && matrixChatContext) {
      // Small delay to ensure the DOM is updated
      setTimeout(() => {
        // Scroll to the end of messages to show the input and context card
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [activeTab, matrixChatContext]);

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
          <p className="text-xs text-slate-400">Select a node in the workstream to start the analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-800 truncate">
                {nodeNumber && <span className="text-slate-400 mr-1">{nodeNumber}</span>}
                {node?.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {node?.updatedBy && node?.updatedAt && (() => {
              const user = USERS.find(u => u.id === node.updatedBy);
              const diffMs = Date.now() - new Date(node.updatedAt).getTime();
              const diffMin = Math.floor(diffMs / 60000);
              const diffH = Math.floor(diffMin / 60);
              const diffD = Math.floor(diffH / 24);
              const rel = diffMin < 1 ? 'just now'
                : diffMin < 60 ? `${diffMin}min`
                : diffH < 24 ? `${diffH}h`
                : `${diffD}d`;
              return (
                <span className="text-[10px] text-slate-400 whitespace-nowrap hidden sm:block">
                  {user ? user.name.split(' ')[0] : '?'} · {rel}
                </span>
              );
            })()}
            <button
              onClick={() => { setIsSearching(true); setTimeout(() => setIsSearching(false), 2000); }}
              className={cn('p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all', isSearching && 'animate-spin text-blue-500')}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center border-b border-slate-200 bg-white shrink-0">
        <button
          onClick={() => handleTabChange('matrix')}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'matrix'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          )}
        >
          <TableProperties className="w-4 h-4" />
          Knowledge Base
        </button>
        <button
          onClick={() => handleTabChange('chat')}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'chat'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          )}
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'chat' ? (
        <>

      {/* Chat messages */}
      <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">No research yet</p>
              <p className="text-xs text-slate-400 mb-4">Ask a question or launch a search to analyze sources linked to this node.</p>
              <div className="flex flex-col gap-2">
                {['Synthesize available sources for this node', 'What are the identified risks?', 'Compare with industry benchmarks'].map((q, i) => (
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
              <ChatBubble key={msg.id} message={msg} onSourceClick={handleSourceClick} onCreateHypothesis={handleCreateHypothesis} onFeedback={handleFeedback} onShowPopover={showCitationPopover} onHidePopover={hideCitationPopover} />
            ))}
            {isSearching && (
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-white animate-pulse" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Analysis in progress...
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Chat input */}
      <div ref={chatInputRef} className="px-4 py-3 border-t border-slate-100 shrink-0">
        {/* Matrix context card - shown above input if context exists */}
        {matrixChatContext && (
          <div className="mb-3">
            <MatrixContextCard
              context={matrixChatContext}
              onClear={clearMatrixChatContext}
            />
          </div>
        )}

        {/* Source count indicator - clickable to open sources sidebar */}
        {activeTab === 'chat' && selectedSources.length > 0 && !matrixChatContext && (
          <div className="flex justify-end mb-2">
            <button
              onClick={() => onOpenSources?.()}
              className={cn(
                'text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1.5 transition-all',
                'hover:shadow-sm hover:scale-105',
                selectedSources.length < allNodeSources.length
                  ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
              )}
              title="Open sources sidebar"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {selectedSources.length} source{selectedSources.length > 1 ? 's' : ''} selected
            </button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask a question about the sources..."
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
          <CreateHypothesisModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSynthesisPrefillData(undefined);
              setModalContent('');
            }}
            initialContent={modalContent}
            nodeId={selectedNodeId}
            projectId={effectiveProjectId}
            mode={modalMode}
            synthesisPrefillData={synthesisPrefillData}
            onSuccess={() => showToast('Hypothesis created successfully!')}
          />
          {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}

          {/* Portal popover citation — rendered at document.body to escape overflow clipping */}
      {activePopover && (() => {
        const src = SOURCES.find(s => s.id === activePopover.sourceId);
        if (!src) return null;
        const { anchorRect } = activePopover;
        const POPOVER_HEIGHT = 260;
        const positionAbove = window.innerHeight - anchorRect.bottom < POPOVER_HEIGHT;
        const top = positionAbove
          ? anchorRect.top - POPOVER_HEIGHT - 8
          : anchorRect.bottom + 8;
        const left = Math.max(8, Math.min(
          anchorRect.left + anchorRect.width / 2 - 144,
          window.innerWidth - 296
        ));
        return ReactDOM.createPortal(
          <div
            style={{ position: 'fixed', top, left, zIndex: 9999 }}
            onMouseEnter={keepCitationPopoverOpen}
            onMouseLeave={hideCitationPopover}
          >
            <CitationPopover
              source={src}
              onViewSource={() => {
                handleSourceClick(activePopover.sourceId);
                setActivePopover(null);
              }}
            />
          </div>,
          document.body
        );
      })()}
        </>
      ) : (
        /* Matrix view */
        <MatrixView nodeId={selectedNodeId} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
