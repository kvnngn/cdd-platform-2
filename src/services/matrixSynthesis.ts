/**
 * Matrix Synthesis Service
 *
 * Auto-generates content for matrix cells:
 * - Document summaries (Synthèse column)
 * - Column-specific extractions
 * - Multi-strategy hypothesis generation
 *
 * Phase 1: Mock generation with realistic delays
 * Phase 2: Real LLM calls with RAG (future)
 */

import { SOURCES } from '@/data/mockData';
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
};

/**
 * Generate a document summary (for the "Synthèse" column).
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
  const source = SOURCES.find(s => s.id === sourceId);
  if (!source) {
    throw new Error(`Source ${sourceId} not found`);
  }

  return `${source.title}. ${source.excerpt.slice(0, 150)}...`;
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

  for (const [key, values] of Object.entries(MOCK_COLUMN_VALUES)) {
    if (columnKey.includes(key)) {
      if (values[sourceId]) {
        return values[sourceId];
      }
    }
  }

  // Fallback: Generate generic extraction
  const source = SOURCES.find(s => s.id === sourceId);
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
 * Generate cell value with proper typing and error handling.
 * Updates the cell object in place.
 */
export async function generateMatrixCell(
  cell: MatrixCell,
  columnPrompt: string,
  columnLabel: string
): Promise<void> {
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
    const source = SOURCES.find(s => s.id === cell.sourceId);
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
