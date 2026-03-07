import { useState, useRef, useEffect } from 'react';
import {
  Search, RefreshCw, Send, Sparkles, BookOpen,
  ArrowRight, Pin, ThumbsUp, ThumbsDown, Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { getResearchByNode, SOURCES, WORKSTREAM_NODES, NODE_SOURCES } from '../../data/mockData';
import {
  BarChart, Bar, Area, ComposedChart,
  XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

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
import { CreateHypothesisModal } from '../hypothesis/CreateHypothesisModal';

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
        content: 'Le marché retail analytics européen affiche une croissance structurelle solide [1]. Les analyses convergent vers un **CAGR de 17-19%** à horizon 2028, avec une accélération notable du segment analytiques verticalisées [2].\n\n**Points clés :**\n- TAM européen estimé à 8,4Md$ en 2028 [2]\n- Segment verticalisé en croissance de 23% vs 15% pour les solutions généralistes [2]\n- DataSense positionné dans le quartile supérieur de croissance',
        sources: ['s2', 's6', 's4'],
        timestamp: '2026-03-02T14:30:00',
        blocks: [
          {
            type: 'kpi_row',
            cards: [
              { label: 'TAM Europe 2025', value: '€3,6Md', delta: '+19% CAGR', deltaPositive: true, color: 'blue' },
              { label: 'Segment vertical', value: '34%', delta: 'du marché', deltaPositive: true, color: 'violet' },
              { label: 'DataSense croissance', value: '+40% ARR', delta: 'vs 2024', deltaPositive: true, color: 'emerald' },
              { label: 'TAM 2028 (prév.)', value: '€8,4Md', color: 'slate' },
            ],
            sources: [{ sourceId: 's2', extract: 'Market Size & Growth' }],
          },
          {
            type: 'chart_area',
            title: 'Évolution TAM Europe',
            unit: 'Md€',
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
            headers: ['Segment', 'Part marché', 'CAGR', 'Tendance'],
            rows: [
              { cells: [{ text: 'Vertical SaaS (DataSense)', highlight: true }, { text: '34%', highlight: true }, { text: '23%', highlight: true }, { text: '↑ Forte accélération', highlight: true }] },
              { cells: ['Généraliste (Tableau, Power BI)', '66%', '15%', '→ Stable'] },
              { cells: ['dont Retail spécialisé EU', '18%', '27%', { text: '↑ Hypercroissance', positive: true }] },
            ],
            caption: 'Source: Gartner Retail Analytics Market Guide 2025',
            sources: [{ sourceId: 's2', extract: 'Segmentation by solution type' }],
          },
        ],
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
        content: 'DataSense affiche un **NRR de 118%** [1], significativement au-dessus du benchmark Forrester (médiane 105-110% pour SaaS B2B mid-market) [3].\n\n**Métriques clés :**\n- Churn gross annuel : 5,8% (benchmark : 8-12%) [1]\n- NRR net : +18% d\'expansion revenue [1]\n- Taux de renouvellement : 94% [2]\n- NPS moyen : 67 [2]',
        sources: ['s1', 's5', 's11'],
        timestamp: '2026-03-01T10:00:00',
        blocks: [
          {
            type: 'kpi_row',
            cards: [
              { label: 'NRR', value: '118%', delta: 'vs bench 107%', deltaPositive: true, color: 'emerald' },
              { label: 'Churn brut', value: '5,8%', delta: 'bench 8-12%', deltaPositive: true, color: 'blue' },
              { label: 'NPS', value: '67', benchmark: 'Bench B2B: 45', color: 'violet' },
              { label: 'Renouvellement', value: '94%', color: 'amber' },
            ],
            sources: [
              { sourceId: 's1', sheet: 'Retention Metrics', extract: 'FY2025' },
              { sourceId: 's11', extract: 'B2B SaaS benchmarks' },
            ],
          },
          {
            type: 'chart_bar',
            title: 'NRR — DataSense vs Marché',
            unit: '%',
            benchmarkLabel: 'Médiane secteur',
            color: '#10b981',
            data: [
              { label: 'DataSense', value: 118, benchmark: 107 },
              { label: 'P75 secteur', value: 112, benchmark: 107 },
              { label: 'P50 secteur', value: 107, benchmark: 107 },
              { label: 'P25 secteur', value: 98, benchmark: 107 },
            ],
            sources: [
              { sourceId: 's1', sheet: 'Retention Metrics' },
              { sourceId: 's11', extract: 'NRR benchmarks' },
            ],
          },
          {
            type: 'chart_area',
            title: 'Évolution NRR trimestriel',
            unit: '%',
            data: [
              { label: "Q1'24", value: 112 },
              { label: "Q2'24", value: 114 },
              { label: "Q3'24", value: 116 },
              { label: "Q4'24", value: 117 },
              { label: "Q1'25", value: 117 },
              { label: "Q2'25", value: 118 },
            ],
            sources: [{ sourceId: 's1', sheet: 'Retention Metrics', extract: 'NRR quarterly' }],
          },
        ],
      },
    ],
    n2a: [
      {
        id: 'msg-5', role: 'assistant', type: 'synthesis',
        content: 'DataSense est **le seul acteur SaaS francophone verticalisé** sur le retail analytics [1]. Face aux grands éditeurs généralistes (Tableau, Salesforce), DataSense bénéficie d\'un avantage de spécialisation et de localisation significatif [1].',
        sources: ['s3', 's7', 's8'],
        timestamp: '2026-03-02T11:00:00',
        blocks: [
          {
            type: 'table',
            title: 'Mapping Concurrentiel',
            headers: ['Acteur', 'Périmètre', 'NRR', 'Présence EU', 'Position'],
            rows: [
              { cells: [{ text: 'DataSense', highlight: true }, { text: 'Retail vertical FR/EU', highlight: true }, { text: '118%', highlight: true }, { text: 'FR, BE, NL', highlight: true }, { text: '✓ Leader EU vertical', highlight: true }] },
              { cells: ['Tableau / Salesforce', 'Généraliste global', '~108%', 'Globale', { text: 'Moins spécialisé retail', negative: true }] },
              { cells: ['Dunnhumby', 'Groceries UK', 'N/D', 'UK, FR limité', { text: 'UK-centric, groceries only', negative: true }] },
              { cells: ['Symphony RetailAI', 'Retail US/global', 'N/D', 'Très limitée', { text: 'Pas d\'ancrage EU', negative: true }] },
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
        content: 'La structure tarifaire de DataSense est **bien positionnée sur le mid-market** avec un ARPU de 127K€ [1]. Le CAC payback de 18 mois est favorable vs le benchmark secteur (24 mois) [1]. Le LTV/CAC de 4,2x confirme la viabilité du modèle économique.',
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
            title: 'Structure tarifaire',
            headers: ['Tier', 'Cible client', 'Prix / an', 'Modules inclus'],
            rows: [
              { cells: ['Starter', 'ETI (< 500 magasins)', '€40–80K', 'Analytics de base, 5 connecteurs'] },
              { cells: ['Business', 'Retail régional (500–2 000)', '€80–150K', 'Analytics avancé, 15 connecteurs, IA'] },
              { cells: [{ text: 'Enterprise', positive: true }, 'Grands comptes (> 2 000)', '€150K+', 'Suite complète, connecteurs illimités, SLA 99,9%'] },
            ],
            caption: 'Tarification indicative. Contrats moyens 36 mois.',
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
              <span className="text-[10px] text-slate-400">Réalisé</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-px bg-blue-300 rounded-full" style={{ borderTop: '1px dashed #93c5fd' }} />
              <span className="text-[10px] text-slate-400">Prévision</span>
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
