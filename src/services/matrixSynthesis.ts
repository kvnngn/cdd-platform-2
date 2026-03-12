/**
 * Matrix Synthesis Service
 *
 * Auto-generates content for matrix cells:
 * - Document summaries (Synthèse column)
 * - Column-specific extractions
 *
 * Phase 1: Mock generation with realistic delays
 * Phase 2: Real LLM calls with RAG (future)
 */

import { SOURCES } from '../data/mockData';

// Mock synthesis values for different column types
const MOCK_SYNTHESES: Record<string, string> = {
  // Generic syntheses for documents
  s1: "Modèle financier DataSense FY2025 avec projections détaillées des unit economics. ARPU de €127K avec NRR de 118%. Croissance ARR de 28% YoY.",
  s2: "Rapport Gartner sur le marché retail analytics européen. TAM 2025 à €3,6Md, CAGR de 17-19% prévu jusqu'en 2028.",
  s3: "Analyse concurrentielle StratCap positionnant DataSense comme leader vertical francophone face aux généralistes (Tableau, Salesforce).",
  s4: "Étude IDC sur la croissance du segment analytics verticalisé (+23% vs +15% généralistes). Focus retail Europe.",
  s5: "Benchmarks NPS et satisfaction client B2B SaaS. DataSense à 67 (médiane secteur: 45).",
  s6: "Projections marché TAM retail analytics Europe 2025-2028. Segment vertical en hypercroissance.",
  s7: "Intelligence compétitive sur Dunnhumby, Symphony RetailAI, et acteurs globaux. Présence EU limitée.",
  s8: "Matrice compétitive des acteurs retail analytics avec parts de marché et NRR comparatifs.",
};

const MOCK_COLUMN_VALUES: Record<string, Record<string, string>> = {
  // Column: ARPU
  arpu: {
    s1: "€127K",
    s3: "€147K (Competitor A)",
    s5: "€89K (médiane secteur)",
    s8: "€110K (moyenne concurrents)",
  },
  // Column: NRR
  nrr: {
    s1: "118%",
    s5: "107% (médiane)",
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
    return `Données insuffisantes pour ${columnLabel}.`;
  }

  // Try to detect numeric patterns
  const numericValues = nonNullValues
    .map(v => parseFloat(v.replace(/[^\d.]/g, '')))
    .filter(n => !isNaN(n));

  if (numericValues.length >= 2) {
    const avg = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);

    return `${columnLabel}: Moyenne de ${avg.toFixed(1)} (range: ${min.toFixed(1)}-${max.toFixed(1)}) sur ${numericValues.length} sources analysées.`;
  }

  // For non-numeric data, count occurrences
  const valueCounts = new Map<string, number>();
  nonNullValues.forEach(v => {
    valueCounts.set(v, (valueCounts.get(v) || 0) + 1);
  });

  const mostCommon = Array.from(valueCounts.entries())
    .sort((a, b) => b[1] - a[1])[0];

  if (mostCommon) {
    return `${columnLabel}: "${mostCommon[0]}" observé dans ${mostCommon[1]}/${nonNullValues.length} sources.`;
  }

  return `${columnLabel}: Analyse de ${nonNullValues.length} sources avec variations significatives.`;
}
