/**
 * Matrix Synthesis Service
 *
 * Auto-generates content for matrix cells:
 * - Document summaries (Synthesis column)
 * - Column-specific extractions
 * - Multi-strategy hypothesis generation
 *
 * Phase 1: Mock generation with realistic delays
 * Phase 2: Real LLM calls with RAG (future)
 */

import { SOURCES, ALL_SOURCES } from '@/data/mockData';
import {
  MatrixCell,
  SelectionGeometry,
  SynthesisStrategy,
  SynthesisContext,
} from '@/types/matrix';

// Mock synthesis values for different column types
const MOCK_SYNTHESES: Record<string, string> = {
  // Generic syntheses for documents
  s1: "DataSense FY2025 financial model with detailed unit economics projections. ARPU of €127K with NRR of 118%. ARR growth of 28% YoY.",
  s2: "Gartner report on European retail analytics market. TAM 2025 at €3.6B, CAGR of 17-19% expected through 2028.",
  s3: "StratCap competitive analysis positioning DataSense as vertical leader in Europe vs. generalists (Tableau, Salesforce).",
  s4: "IDC study on verticalized analytics segment growth (+23% vs +15% generalists). Focus on European retail.",
  s5: "NPS and customer satisfaction benchmarks for B2B SaaS. DataSense at 67 (sector median: 45).",
  s6: "European retail analytics TAM market projections 2025-2028. Vertical segment in hypergrowth.",
  s7: "Competitive intelligence on Dunnhumby, Symphony RetailAI, and global players. Limited EU presence.",
  s8: "Competitive matrix of retail analytics players with comparative market shares and NRR.",
  // UK Retail Market Share documents (s752-s767)
  s752: "Revolut UK Retail Performance Q2 2024. 9.8M UK retail customers (+18% YoY). Monthly active users: 6.1M (62% activation rate). Net customer additions: +127K/month in Q2, down from +168K/month in Q1 2024. Customer acquisition cost £4.2 per retail user. Revenue per user: £92/year (up from £71 in 2023). UK retail revenue: £412M (H1 2024 annualised). Churn rate: 3.1% monthly for <6 month cohorts, 1.2% for >24 month cohorts.",
  s753: "Revolut Board Presentation H1 2024. Management acknowledges 'increasing competitive pressure in UK retail segment from Monzo and Starling.' UK retail net adds declined 24% QoQ. However, B2B revenue grew 67% YoY, now representing 22% of total group revenue. Strategic pivot: 'UK retail is a mature acquisition market — growth will come from ARPU expansion and B2B cross-sell.' Banking license (July 2024) expected to unlock £1.2B+ in deposit-related revenue by 2026.",
  s754: "Revolut Series E Investor Pack. Global user base: 45M+ across 38 markets. UK: 9.8M users (22% of total). EU: 18.2M users. Revenue: £1.8B (FY2023), £2.4B projected FY2024. UK retail share: Revolut claims ~6.2% of UK current account market (primary account holders). Vs. Monzo ~5.8%, Starling ~3.1%. Key slide: 'Revolut is the #1 neobank in UK by total users but Monzo is closing the gap on primary accounts.'",
  s755: "Bloomberg Neobank Retail Benchmark H1 2024. UK retail market share by monthly active users: Revolut 28.4%, Monzo 24.1%, Starling 11.3%, Chase UK 8.2%, N26 UK 2.1%. YoY change: Revolut -1.2pp, Monzo +3.8pp, Starling +0.9pp. Revolut's UK retail customer acquisition has decelerated by 12% YoY in H1 2024, while Monzo gained 2.3M new users in the same period. EU market: Revolut leads in 19/27 EU markets by user count. N26 dominates DACH region.",
  s756: "S&P CapitalIQ Neobank Comparables Q3 2024. Revenue comps: Revolut £1.8B, Monzo £880M, N26 €520M, Starling £453M, Qonto €220M. EV/Revenue multiples: Revolut 14.2x, Monzo 11.8x, N26 5.4x. Customer metrics: Revolut 45M total (9.8M UK), Monzo 10M (9.2M UK), N26 8M (0.3M UK). Revenue per user: Revolut £40 (global avg), Monzo £88 (UK-focused), Starling £126 (UK-focused). Key insight: Monzo's UK-centric model yields higher ARPU.",
  s757: "Refinitiv UK Digital Banking Market Share 2024. Primary account holders (challenger banks only): Monzo 5.8M, Revolut 4.1M, Starling 3.6M, Chase UK 1.9M. Note: Revolut's total UK user base (9.8M) includes non-primary users who hold Revolut as secondary account. When measured by primary account share, Monzo leads Revolut by 41%. UK digital banking total addressable: 19.2M primary digital-only account holders (29% of UK adults).",
  s758: "FCA Retail Banking Market Report 2024. Current account switching: 2.1M switches in H1 2024 (+14% YoY). Neobanks captured 38% of all switches (up from 29% in 2023). Monzo was the #1 destination for switchers. FCA notes 'increasing concentration risk' in neobank sector. Revolut banking license granted July 2024 — FCA expects 'significant deposit migration once Revolut offers FSCS-protected accounts.' Regulatory view: competition is healthy but...",
  s759: "Expert Call — Former Revolut UK Head of Growth (left Feb 2024). Key quotes: 'The UK retail market is getting saturated for neobanks. Everyone who wants a Revolut or Monzo already has one. The real battle is primary account status.' On Monzo: 'They cracked the salary deposit problem before us. Their Monzo Flex and Salary Sort features drove primary adoption.' On Revolut strategy: 'Internally we knew by Q3 2023 retail net adds would plateau. The banking license was Plan B.'",
  s760: "Expert Call — Former Monzo VP Retail Strategy (left Aug 2023). Key quotes: 'Monzo won the UK primary account war because we focused on making Monzo the account your salary lands in. Revolut optimised for total downloads — vanity metric.' On market share: 'Real market share is measured in deposit volume, not app installs. By deposits, Monzo passed Revolut in UK in Q4 2023.' On EU: 'Monzo has no EU ambitions. That's Revolut's playground.'",
  s761: "Expert Call — Senior Fintech Analyst, Barclays Research. Key insights: 'The neobank retail market in UK has three phases: 1) user acquisition (won by Revolut), 2) primary account conversion (being won by Monzo), 3) full banking relationship (yet to be won). Revolut's banking license changes the game for phase 3.' On customer acquisition trends: 'H1 2024 saw the first quarter where combined neobank net adds declined YoY. Market is maturing.'",
  s762: "McKinsey UK Personal Finance Survey 2024 (n=8,200). Neobank adoption: 41% of UK adults hold at least one neobank account (up from 33% in 2023). Primary neobank users: 14% of UK adults (up from 9%). Brand preference for primary account: Monzo 38%, Revolut 29%, Starling 18%, Other 15%. Key driver for Monzo preference: 'budgeting tools' (67% cited) and 'salary sorting' (54%). Key driver for Revolut: 'international use' (71%) and 'crypto/trading' (42%).",
  s763: "CB Insights State of Fintech Q3 2024 — Neobank Deep Dive. European neobank funding: $2.1B in H1 2024 (down 34% YoY). Revolut: no new funding since $800M Series E. Customer acquisition cost trends: rising across all players (+22% avg YoY) as social media CAC inflates. Revolut CAC: estimated $4-6 (global avg), Monzo: $8-12 (UK only). EU expansion: Revolut active in 38 markets vs Monzo (1 market), N26 (24 markets). Revolut's EU scale is unmatched.",
  s764: "Monzo Bank Ltd — Annual Report FY2024 (filed Companies House). Revenue: £880M (+108% YoY). First full-year profit: £15.3M (vs -£116M loss FY2023). UK customers: 10M+ (milestone reached March 2024). Primary account holders: 5.8M. Deposits: £7.8B (+89% YoY). Revenue per customer: £88. Net customer adds: +2.3M in FY2024. Strategic focus: 'deepen existing customer relationships via lending, investments, and business accounts.'",
  s765: "Starling Bank — Annual Report FY2024. Revenue: £453M (+42% YoY). Profit before tax: £195M (3rd consecutive profitable year). UK customers: 4.2M. Deposits: £12.1B. Revenue per customer: £126 (highest among UK neobanks). SME lending book: £4.1B. Note: Starling's model is fundamentally different — it's a lending-led model, not transaction-led like Revolut/Monzo. Retail growth slowing: +380K net adds FY2024 vs +620K FY2023.",
  s766: "N26 GmbH — Annual Accounts 2023 (English translation). Revenue: €520M (+28% YoY). Net loss: -€78M (narrowing from -€172M in 2022). Customers: 8M across 24 markets. DACH focus: 65% of revenue from Germany/Austria. UK: exited in 2022 (no UK retail presence). Customer acquisition: net adds slowing significantly — +800K in 2023 vs +2.1M in 2022. BaFin restrictions partially in place. Limited relevance for UK competitive dynamics.",
  s767: "Sifted Neobank Tracker H1 2024. Headline: 'The UK neobank land grab is over.' Net customer additions (H1 2024): Monzo +1.4M, Revolut UK +680K, Starling +190K, Chase UK +310K. Analysis: Monzo's growth rate now 2x Revolut's in UK. However, Revolut's EU growth remains strong: +3.2M new users across EU in H1 2024. Key quote from Revolut CFO: 'We don't optimise for UK retail growth anymore. We optimise for global revenue per user.'",
};

const MOCK_COLUMN_VALUES: Record<string, Record<string, string>> = {
  // Column: ARPU
  arpu: {
    s1: "€127K",
    s3: "€147K (Competitor A)",
    s5: "€89K (sector median)",
    s8: "€110K (competitor average)",
  },
  // Column: NRR
  nrr: {
    s1: "118%",
    s5: "107% (median)",
    s8: "112% (P75 secteur)",
  },
  // Column: Market Share
  'market share': {
    s2: "34% (segment vertical)",
    s6: "18% (retail spécialisé EU)",
    s7: "N/D",
    s8: "Leader EU vertical",
  },
  // Column: Pricing Model
  'pricing model': {
    s1: "Tiered (Starter/Business/Enterprise)",
    s3: "Per-user",
    s8: "Mixed (tiered + per-user options)",
  },
  // Column: UK Retail Market Share
  'uk retail market share': {
    s752: 'Revolut: 28.4% (by MAU, Q2 2024) - Source: Internal Dashboard',
    s753: 'Revolut: ~6.2% (primary accounts, H1 2024) - Management Self-Declared',
    s754: 'Revolut: 6.2% (primary accounts). Monzo: 5.8%. Starling: 3.1%. Gap with Monzo is shrinking.',
    s755: 'By MAU: Revolut 28.4% (-1.2pp YoY), Monzo 24.1% (+3.8pp), Starling 11.3%. Revolut is losing share.',
    s756: 'N/D',
    s757: 'By PRIMARY accounts: Monzo 5.8M (30.2%), Revolut 4.1M (21.4%). Monzo leads Revolut by 41% on primary.',
    s758: 'N/A',
    s759: 'Expert View: The "real battle is for primary account status." Monzo "solved the salary deposit problem."',
    s760: 'Expert View (Monzo): "True market share is measured by deposit volume." Monzo surpassed Revolut in UK in Q4 2023.',
    s761: 'Analyst Framework: Phase 1 (Acquisition) = Revolut. Phase 2 (Primary Conversion) = Monzo.',
    s762: 'Primary Preference: Monzo 38%, Revolut 29%, Starling 18%. Key Monzo factor: "budgeting tools" (67%).',
    s763: 'N/D',
    s764: 'Monzo: 10M total, 5.8M primary (primary rate 58% vs ~42% Revolut). Deposits: £7.8B (+89% YoY).',
    s765: 'N/D',
    s766: 'N/D',
    s767: 'H1 2024 net adds: Monzo +1.4M, Revolut UK +680K. Monzo is 2x faster in the UK.',
  },
  // Column: Customer Acquisition Trend
  'customer acquisition': {
    s752: '↘ SLOWDOWN: +127K/month in Q2 (vs +168K in Q1). 24% drop in net adds QoQ.',
    s753: '↘ SLOWDOWN: Net adds -24% QoQ. Management speaks of a "mature acquisition market."',
    s754: '→ PLATEAU (UK): Gap vs Monzo < 1pp. ↑ GROWTH (EU/Global): +3.2M EU users in H1 2024.',
    s755: '↘ REVOLUT: -12% YoY slowdown. ↑ MONZO: +2.3M new users in H1 2024. Key takeaway.',
    s756: 'N/D',
    s757: '↑ MONZO leads on the primary metric. "Tourist vs Resident" dynamic confirmed.',
    s758: '↑ NEOBANK SECTOR: Switching +14% YoY. ↑ MONZO: N°1 for switchers. Revolut does not benefit.',
    s759: '↘ CONFIRMED: Ex-Head of Growth knew net adds "would plateau" in Q3 2023.',
    s760: '↑ MONZO is winning the "primary account war." Monzo\'s UK focus is a concentrated threat.',
    s761: '→ MARKET MATURITY: 1st quarter of combined net adds YoY decline.',
    s762: 'N/D',
    s763: 'N/D',
    s764: '↑ MONZO: +2.3M net adds FY2024. Monzo is more profitable and growing faster in the UK.',
    s765: 'N/D',
    s766: 'N/D',
    s767: '↘ REVOLUT UK: +680K (Monzo: +1.4M). Strategy: Revolut\'s CFO is "no longer negotiating for UK retail growth."',
  },
};

/**
 * Generate a document summary (for the "Synthesis" column).
 *
 * @param sourceId - Source to summarize
 * @param scopePrompt - Context from the matrix scope
 * @returns Generated summary text
 */
export async function generateDocumentSummary(
  sourceId: string,
  scopePrompt: string
): Promise<string> {
  // Simulate LLM processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

  // Try to get a predefined mock synthesis
  if (MOCK_SYNTHESES[sourceId]) {
    return MOCK_SYNTHESES[sourceId];
  }

  // Fallback: Generate based on source metadata
  const source = ALL_SOURCES.find(s => s.id === sourceId);
  if (!source) {
    throw new Error(`Source ${sourceId} not found`);
  }

  return `${source.excerpt.slice(0, 150)}...`;
}

/**
 * Generate a cell value for a specific column.
 *
 * @param sourceId - Source to extract from
 * @param columnPrompt - The extraction question/prompt
 * @param matrixScopeId - Matrix scope (for context)
 * @returns Generated cell value
 */
export async function generateCellSynthesis(
  sourceId: string,
  columnPrompt: string,
  matrixScopeId: string
): Promise<string> {
  // Simulate LLM processing delay
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

  // Try to match column prompt to predefined values
  const columnKey = columnPrompt.toLowerCase();

  // Direct matching for specific columns (avoids conflicts with generic 'market share' key)
  if (columnKey.includes('uk retail') && columnKey.includes('market share')) {
    const ukMarketShareValues = MOCK_COLUMN_VALUES['uk retail market share'];
    if (ukMarketShareValues && ukMarketShareValues[sourceId]) {
      return ukMarketShareValues[sourceId];
    }
  }

  if (columnKey.includes('customer acquisition') || columnKey.includes('acquisition trend')) {
    const acquisitionValues = MOCK_COLUMN_VALUES['customer acquisition'];
    if (acquisitionValues && acquisitionValues[sourceId]) {
      return acquisitionValues[sourceId];
    }
  }

  // Fallback to generic matching
  for (const [key, values] of Object.entries(MOCK_COLUMN_VALUES)) {
    if (columnKey.includes(key)) {
      if (values[sourceId]) {
        return values[sourceId];
      }
    }
  }

  // Fallback: Generate generic extraction
  const source = ALL_SOURCES.find(s => s.id === sourceId);
  if (!source) {
    throw new Error(`Source ${sourceId} not found`);
  }

  // Try to extract a relevant snippet from excerpt
  const keywords = columnPrompt.split(/\s+/).filter(w => w.length > 3);
  const excerpt = source.excerpt.toLowerCase();

  for (const keyword of keywords) {
    if (excerpt.includes(keyword.toLowerCase())) {
      // Find sentence containing keyword
      const sentences = source.excerpt.split(/[.!?]+/);
      const matchingSentence = sentences.find(s =>
        s.toLowerCase().includes(keyword.toLowerCase())
      );
      if (matchingSentence) {
        return matchingSentence.trim();
      }
    }
  }

  // Ultimate fallback
  return "N/D";
}

/**
 * Batch generate all cells for a new column.
 * More efficient than generating one-by-one.
 *
 * @param sourceIds - Sources to generate for
 * @param columnPrompt - Column extraction prompt
 * @param matrixScopeId - Matrix scope ID
 * @returns Map of sourceId -> generated value
 */
export async function batchGenerateCells(
  sourceIds: string[],
  columnPrompt: string,
  matrixScopeId: string
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  // In a real implementation, we'd batch this to the LLM
  // For mock, we'll generate sequentially but could parallelize
  const promises = sourceIds.map(async sourceId => {
    const value = await generateCellSynthesis(sourceId, columnPrompt, matrixScopeId);
    results[sourceId] = value;
  });

  await Promise.all(promises);
  return results;
}

/**
 * Generate a transverse hypothesis from multiple cells in a column.
 * Synthesizes patterns and insights across sources.
 *
 * @param cellValues - Array of cell values to synthesize
 * @param columnLabel - Column name for context
 * @param sourceIds - Corresponding source IDs
 * @returns Generated hypothesis text
 */
export async function generateColumnHypothesis(
  cellValues: string[],
  columnLabel: string,
  sourceIds: string[]
): Promise<string> {
  // Simulate LLM processing delay
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

  // Mock: Generate a pattern-based hypothesis
  const nonNullValues = cellValues.filter(v => v && v !== "N/D");

  if (nonNullValues.length === 0) {
    return `Insufficient data for ${columnLabel}.`;
  }

  // Try to detect numeric patterns
  const numericValues = nonNullValues
    .map(v => parseFloat(v.replace(/[^\d.]/g, '')))
    .filter(n => !isNaN(n));

  if (numericValues.length >= 2) {
    const avg = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);

    return `${columnLabel}: Average of ${avg.toFixed(1)} (range: ${min.toFixed(1)}-${max.toFixed(1)}) across ${numericValues.length} sources analyzed.`;
  }

  // For non-numeric data, count occurrences
  const valueCounts = new Map<string, number>();
  nonNullValues.forEach(v => {
    valueCounts.set(v, (valueCounts.get(v) || 0) + 1);
  });

  const mostCommon = Array.from(valueCounts.entries())
    .sort((a, b) => b[1] - a[1])[0];

  if (mostCommon) {
    return `${columnLabel}: "${mostCommon[0]}" observed in ${mostCommon[1]}/${nonNullValues.length} sources.`;
  }

  return `${columnLabel}: Analysis of ${nonNullValues.length} sources with significant variations.`;
}

/**
 * @deprecated This function directly mutates cell objects without triggering Zustand reactivity.
 * Use the store method `generateMatrixCell()` instead, which properly updates state via set().
 *
 * This function is kept for reference only and should not be used in new code.
 *
 * @see appStore.generateMatrixCell for the reactive version
 */
export async function generateMatrixCell(
  cell: MatrixCell,
  columnPrompt: string,
  columnLabel: string
): Promise<void> {
  console.warn(
    'generateMatrixCell() from matrixSynthesis.ts is deprecated. ' +
    'Use store method generateMatrixCell() instead for reactive updates.'
  );

  try {
    cell.status = 'generating';
    const value = await generateCellSynthesis(cell.sourceId, columnPrompt, cell.matrixScopeId);
    cell.value = value;
    cell.status = 'done';
    cell.generatedAt = new Date().toISOString();
  } catch (error) {
    cell.status = 'error';
    cell.value = null;
    console.error(`Failed to generate cell ${cell.id}:`, error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MULTI-STRATEGY SYNTHESIS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Analyze the geometry of a cell selection.
 * Determines selection type and recommends synthesis strategy.
 */
export function analyzeSelectionGeometry(cells: MatrixCell[]): {
  geometry: SelectionGeometry;
  recommendedStrategy: SynthesisStrategy;
} {
  if (cells.length === 0) {
    throw new Error('No cells selected');
  }

  const columnIds = [...new Set(cells.map(c => c.columnId))];
  const sourceIds = [...new Set(cells.map(c => c.sourceId))];

  const geometry: SelectionGeometry = {
    type: 'mixed',
    columnIds,
    sourceIds,
    cellCount: cells.length,
  };

  // Determine geometry type
  if (columnIds.length === 1 && sourceIds.length > 1) {
    // Same column, different documents
    geometry.type = 'same_column';
  } else if (sourceIds.length === 1 && columnIds.length > 1) {
    // Same document, different prompts
    geometry.type = 'same_row';
  } else {
    // Mixed selection
    geometry.type = 'mixed';
  }

  // Recommend strategy based on geometry
  let recommendedStrategy: SynthesisStrategy;

  switch (geometry.type) {
    case 'same_column':
      // User choice: reliable source vs intelligent average
      // Default to intelligent average
      recommendedStrategy = 'intelligent_average';
      break;
    case 'same_row':
      // Auto: row synthesis
      recommendedStrategy = 'row_synthesis';
      break;
    case 'mixed':
      // Auto: global synthesis
      recommendedStrategy = 'global_synthesis';
      break;
  }

  return { geometry, recommendedStrategy };
}

/**
 * Strategy 1: Reliable Source
 * Choose the most reliable source from selected cells.
 * Used when: Same column, user wants single authoritative source.
 */
export async function synthesizeByReliableSource(
  cells: MatrixCell[],
  sourceNames: Map<string, string>
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Mock: Score sources by reliability heuristics
  // In real implementation: use source metadata, recency, authority
  const scoredCells = cells.map(cell => {
    const source = ALL_SOURCES.find(s => s.id === cell.sourceId);
    let score = 0;

    // Prefer recent sources
    if (source?.publishedAt) {
      const daysSincePublish = (Date.now() - new Date(source.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
      score += Math.max(0, 100 - daysSincePublish);
    }

    // Prefer sources with fileType "pdf" or category "premium_report"
    if (source?.fileType === 'pdf' || source?.category === 'premium_report') score += 50;

    // Prefer longer, more detailed content
    if (source?.content) score += Math.min(50, source.content.length / 100);

    return { cell, score };
  });

  const mostReliable = scoredCells.sort((a, b) => b.score - a.score)[0];
  const sourceName = sourceNames.get(mostReliable.cell.sourceId) || 'Unknown source';

  return `${mostReliable.cell.value}\n\n**Source**: ${sourceName} (selected as most reliable)`;
}

/**
 * Strategy 2: Intelligent Average
 * Weighted consensus across multiple sources.
 * Used when: Same column, want aggregated view.
 */
export async function synthesizeByAveraging(
  cells: MatrixCell[],
  columnPrompt: string,
  sourceNames: Map<string, string>
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 800));

  const nonNullCells = cells.filter(c => c.value && c.value !== 'N/D');

  if (nonNullCells.length === 0) {
    return 'No data available across selected sources.';
  }

  // Try numeric averaging
  const numericValues = nonNullCells
    .map(c => ({
      cell: c,
      value: parseFloat(c.value!.replace(/[^\d.]/g, '')),
    }))
    .filter(({ value }) => !isNaN(value));

  if (numericValues.length >= 2) {
    const values = numericValues.map(nv => nv.value);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];

    return `**Consensus Analysis** (${values.length} sources)\n\n` +
      `- Average: ${avg.toFixed(1)}\n` +
      `- Median: ${median.toFixed(1)}\n` +
      `- Range: ${min.toFixed(1)} - ${max.toFixed(1)}\n\n` +
      `**Individual values**:\n` +
      numericValues.map(({ cell }) =>
        `- ${sourceNames.get(cell.sourceId) || 'Unknown'}: ${cell.value}`
      ).join('\n');
  }

  // Text-based consensus
  const valueCounts = new Map<string, { count: number; sourceIds: string[] }>();
  nonNullCells.forEach(cell => {
    const existing = valueCounts.get(cell.value!) || { count: 0, sourceIds: [] };
    existing.count++;
    existing.sourceIds.push(cell.sourceId);
    valueCounts.set(cell.value!, existing);
  });

  const sortedValues = Array.from(valueCounts.entries())
    .sort((a, b) => b[1].count - a[1].count);

  const mostCommon = sortedValues[0];

  return `**Consensus Analysis** (${nonNullCells.length} sources)\n\n` +
    `Most common: "${mostCommon[0]}" (${mostCommon[1].count}/${nonNullCells.length} sources)\n\n` +
    `**All values**:\n` +
    sortedValues.map(([value, data]) =>
      `- "${value}" - ${data.count}x`
    ).join('\n');
}

/**
 * Strategy 3: Row Synthesis
 * Synthesize insights across different prompts for same document.
 * Used when: Same document, different columns.
 */
export async function synthesizeRow(
  cells: MatrixCell[],
  sourceName: string,
  columnLabels: Map<string, string>
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 900));

  const nonNullCells = cells.filter(c => c.value && c.value !== 'N/D');

  if (nonNullCells.length === 0) {
    return `No insights available for ${sourceName}.`;
  }

  const insights = nonNullCells.map(cell => {
    const columnLabel = columnLabels.get(cell.columnId) || 'Unknown column';
    return `- **${columnLabel}**: ${cell.value}`;
  }).join('\n');

  return `**Comprehensive insights for ${sourceName}**\n\n${insights}\n\n` +
    `Synthesized from ${nonNullCells.length} data points.`;
}

/**
 * Strategy 4: Global Synthesis
 * Intelligent synthesis across mixed selection (multiple docs, multiple prompts).
 * Used when: Mixed selection.
 */
export async function synthesizeGlobal(
  context: SynthesisContext
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { selectedCells, selectionGeometry, columnLabels, sourceNames } = context;
  const nonNullCells = selectedCells.filter(c => c.value && c.value !== 'N/D');

  if (nonNullCells.length === 0) {
    return 'No data available in selected cells.';
  }

  // Group by column for column-level insights
  const byColumn = new Map<string, MatrixCell[]>();
  nonNullCells.forEach(cell => {
    const existing = byColumn.get(cell.columnId) || [];
    existing.push(cell);
    byColumn.set(cell.columnId, existing);
  });

  const columnInsights = Array.from(byColumn.entries()).map(([columnId, cells]) => {
    const label = columnLabels.get(columnId) || 'Unknown';
    const values = cells.map(c => c.value).filter(Boolean);
    return `**${label}**: ${values.length} data points across ${new Set(cells.map(c => c.sourceId)).size} sources`;
  }).join('\n');

  return `**Global Synthesis**\n\n` +
    `Analysis of ${nonNullCells.length} cells across:\n` +
    `- ${selectionGeometry.columnIds.length} columns\n` +
    `- ${selectionGeometry.sourceIds.length} documents\n\n` +
    `**Column Coverage**:\n${columnInsights}\n\n` +
    `This synthesis combines insights from multiple dimensions to provide a comprehensive view.`;
}
