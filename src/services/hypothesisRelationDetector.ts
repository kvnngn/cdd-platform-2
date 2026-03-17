import { Hypothesis, HypothesisSource } from '@/types';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface RelationSuggestion {
  hypothesisId: string;
  type: 'supports' | 'contradicts' | 'nuances';
  confidence: number; // 0-100
  explanation: string; // Concise explanation
  keyFactors: string[]; // Keywords that triggered the detection
}

export interface DetectionResult {
  suggestions: RelationSuggestion[];
  analysisTime: number; // Simulated analysis time in ms
  totalAnalyzed: number; // Number of hypotheses analyzed
}

interface NewHypothesisData {
  title: string;
  body: string;
  sources: HypothesisSource[];
  tags: string[];
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

// Signal words for each relationship type
const SUPPORT_SIGNALS = [
  'confirms', 'validates', 'also shows', 'similarly', 'likewise', 'additionally',
  'furthermore', 'moreover', 'consistent', 'reinforces', 'supports', 'aligns',
  'agrees', 'corroborates', 'strengthens', 'same', 'also', 'too'
];

const CONTRADICT_SIGNALS = [
  'however', 'but', 'contrary to', 'unlike', 'contradicts', 'opposes',
  'disagrees', 'challenges', 'refutes', 'differs', 'conflicts', 'versus',
  'instead', 'rather', 'although', 'despite', 'conversely', 'on the other hand'
];

const NUANCE_SIGNALS = [
  'although', 'caveat', 'limitation', 'however', 'except', 'unless',
  'provided that', 'depends on', 'conditional', 'with constraints', 'risk',
  'challenge', 'may', 'might', 'could', 'potentially', 'partially'
];

// Common stopwords to exclude from keyword extraction
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
  'it', 'its', 'as', 'which', 'what', 'who', 'when', 'where', 'why', 'how'
]);

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

/**
 * Simulate thinking time for realistic effect (1.5-2s)
 */
async function simulateThinking(durationMs: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, durationMs));
}

/**
 * Extract significant keywords from text
 */
function extractKeywords(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s%]/g, ' ') // Remove punctuation except %
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOPWORDS.has(w));

  return new Set(words);
}

/**
 * Extract entities (companies, products, metrics) from text
 * Simple pattern matching for demo purposes
 */
function extractEntities(text: string): Set<string> {
  const entities = new Set<string>();

  // Match capitalized words (potential company names)
  const capitalizedMatches = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
  capitalizedMatches.forEach(match => entities.add(match.toLowerCase()));

  // Match percentages and metrics
  const metricMatches = text.match(/\d+%|\d+x|\d+\.?\d*[KMB]?/gi) || [];
  metricMatches.forEach(match => entities.add(match.toLowerCase()));

  // Match common business terms
  const businessTerms = ['SMB', 'enterprise', 'growth', 'revenue', 'CAGR', 'NRR', 'churn', 'ARR', 'MRR'];
  businessTerms.forEach(term => {
    if (text.toLowerCase().includes(term.toLowerCase())) {
      entities.add(term.toLowerCase());
    }
  });

  return entities;
}

/**
 * Count signal words in text
 */
function countSignals(text: string, signals: string[]): number {
  const lowerText = text.toLowerCase();
  return signals.filter(signal => lowerText.includes(signal)).length;
}

/**
 * Calculate keyword overlap score (0-40 points)
 */
function calculateKeywordScore(
  newKeywords: Set<string>,
  existingKeywords: Set<string>
): { score: number; commonWords: string[] } {
  const intersection = new Set(
    [...newKeywords].filter(k => existingKeywords.has(k))
  );

  const unionSize = new Set([...newKeywords, ...existingKeywords]).size;
  const jaccardSimilarity = unionSize > 0 ? intersection.size / unionSize : 0;

  return {
    score: Math.round(jaccardSimilarity * 40), // Max 40 points
    commonWords: Array.from(intersection).slice(0, 3) // Top 3 for explanation
  };
}

/**
 * Calculate entity matching score (0-20 points)
 */
function calculateEntityScore(
  newEntities: Set<string>,
  existingEntities: Set<string>
): { score: number; commonEntities: string[] } {
  const intersection = new Set(
    [...newEntities].filter(e => existingEntities.has(e))
  );

  const maxEntities = Math.max(newEntities.size, existingEntities.size, 1);
  const similarity = intersection.size / maxEntities;

  return {
    score: Math.round(similarity * 20), // Max 20 points
    commonEntities: Array.from(intersection).slice(0, 2)
  };
}

/**
 * Calculate source overlap score (0-15 points)
 */
function calculateSourceScore(
  newSources: HypothesisSource[],
  existingSources: HypothesisSource[]
): { score: number; commonSourceIds: string[] } {
  const newSourceIds = new Set(newSources.map(s => s.sourceId));
  const existingSourceIds = new Set(existingSources.map(s => s.sourceId));

  const intersection = new Set(
    [...newSourceIds].filter(id => existingSourceIds.has(id))
  );

  const maxSources = Math.max(newSourceIds.size, existingSourceIds.size, 1);
  const similarity = intersection.size / maxSources;

  return {
    score: Math.round(similarity * 15), // Max 15 points
    commonSourceIds: Array.from(intersection)
  };
}

/**
 * Calculate tag overlap score (0-15 points)
 */
function calculateTagScore(
  newTags: string[],
  existingTags: string[]
): { score: number; commonTags: string[] } {
  const newTagSet = new Set(newTags.map(t => t.toLowerCase()));
  const existingTagSet = new Set(existingTags.map(t => t.toLowerCase()));

  const intersection = new Set(
    [...newTagSet].filter(t => existingTagSet.has(t))
  );

  const maxTags = Math.max(newTagSet.size, existingTagSet.size, 1);
  const similarity = intersection.size / maxTags;

  return {
    score: Math.round(similarity * 15), // Max 15 points
    commonTags: Array.from(intersection)
  };
}

/**
 * Detect relationship type based on content and signals
 */
function detectRelationType(
  newHypothesis: NewHypothesisData,
  existingHypothesis: Hypothesis,
  scores: {
    keywordScore: number;
    entityScore: number;
    sourceScore: number;
    tagScore: number;
    commonWords: string[];
    commonEntities: string[];
  }
): 'supports' | 'contradicts' | 'nuances' | null {
  const combinedText = `${newHypothesis.title} ${newHypothesis.body}`.toLowerCase();
  const existingText = `${existingHypothesis.title} ${existingHypothesis.body}`.toLowerCase();

  // Count signal words
  const supportSignals = countSignals(combinedText, SUPPORT_SIGNALS);
  const contradictSignals = countSignals(combinedText, CONTRADICT_SIGNALS);
  const nuanceSignals = countSignals(combinedText, NUANCE_SIGNALS);

  // Look for numeric contradictions (different numbers for same metric)
  const hasNumericConflict = detectNumericConflict(combinedText, existingText);

  // Decision logic based on signals and similarity
  const totalSimilarity = scores.keywordScore + scores.entityScore + scores.sourceScore + scores.tagScore;

  // Strong similarity (>50) suggests support or nuance
  if (totalSimilarity > 50) {
    if (hasNumericConflict || contradictSignals > supportSignals) {
      return 'contradicts';
    }
    if (nuanceSignals > supportSignals) {
      return 'nuances';
    }
    return 'supports';
  }

  // Medium similarity (30-50) - check signals more carefully
  if (totalSimilarity > 30) {
    if (contradictSignals > 2 || hasNumericConflict) {
      return 'contradicts';
    }
    if (nuanceSignals > 2) {
      return 'nuances';
    }
    if (supportSignals > 1) {
      return 'supports';
    }
  }

  // Low similarity (<30) - need strong signals
  if (contradictSignals > 3 || hasNumericConflict) {
    return 'contradicts';
  }

  return null; // Not enough evidence for a relation
}

/**
 * Detect numeric conflicts between two texts
 */
function detectNumericConflict(text1: string, text2: string): boolean {
  // Extract percentages
  const percentages1 = text1.match(/\d+\.?\d*%/g) || [];
  const percentages2 = text2.match(/\d+\.?\d*%/g) || [];

  // If both have percentages and they're significantly different, it's a conflict
  if (percentages1.length > 0 && percentages2.length > 0) {
    const num1 = parseFloat(percentages1[0] || '0');
    const num2 = parseFloat(percentages2[0] || '0');
    if (Math.abs(num1 - num2) > 5) { // >5% difference
      return true;
    }
  }

  return false;
}

/**
 * Generate explanation for the relationship
 */
function generateExplanation(
  type: 'supports' | 'contradicts' | 'nuances',
  scores: {
    commonWords: string[];
    commonEntities: string[];
    commonSourceIds: string[];
    commonTags: string[];
  }
): string {
  const parts: string[] = [];

  // Add common entities/topics
  if (scores.commonEntities.length > 0) {
    parts.push(`Both analyze ${scores.commonEntities.join(', ')}`);
  } else if (scores.commonWords.length > 0) {
    parts.push(`Shared focus on ${scores.commonWords.slice(0, 2).join(', ')}`);
  }

  // Add source overlap
  if (scores.commonSourceIds.length > 0) {
    parts.push(`${scores.commonSourceIds.length} shared source${scores.commonSourceIds.length > 1 ? 's' : ''}`);
  }

  // Add relationship-specific context
  if (type === 'supports') {
    if (parts.length === 0) {
      return 'Reinforces similar conclusions';
    }
    return parts.join(' with ');
  }

  if (type === 'contradicts') {
    if (parts.length === 0) {
      return 'Presents conflicting data or conclusions';
    }
    return `${parts.join(' but ')} - different conclusions`;
  }

  if (type === 'nuances') {
    if (parts.length === 0) {
      return 'Adds conditions or limitations';
    }
    return `${parts.join(' with ')} - adds nuance`;
  }

  return 'Related content';
}

/**
 * Analyze relationship between new hypothesis and existing one
 */
function analyzeRelationship(
  newHypothesis: NewHypothesisData,
  existingHypothesis: Hypothesis
): RelationSuggestion | null {
  // Extract features from both hypotheses
  const newKeywords = extractKeywords(`${newHypothesis.title} ${newHypothesis.body}`);
  const existingKeywords = extractKeywords(`${existingHypothesis.title} ${existingHypothesis.body}`);

  const newEntities = extractEntities(`${newHypothesis.title} ${newHypothesis.body}`);
  const existingEntities = extractEntities(`${existingHypothesis.title} ${existingHypothesis.body}`);

  // Calculate similarity scores
  const keywordAnalysis = calculateKeywordScore(newKeywords, existingKeywords);
  const entityAnalysis = calculateEntityScore(newEntities, existingEntities);
  const sourceAnalysis = calculateSourceScore(newHypothesis.sources, existingHypothesis.sources);
  const tagAnalysis = calculateTagScore(newHypothesis.tags, existingHypothesis.tags);

  const totalScore =
    keywordAnalysis.score +
    entityAnalysis.score +
    sourceAnalysis.score +
    tagAnalysis.score +
    10; // Base bonus for being in same project

  // Minimum threshold to suggest a relation
  if (totalScore < 65) {
    return null;
  }

  // Detect relationship type
  const relationType = detectRelationType(
    newHypothesis,
    existingHypothesis,
    {
      keywordScore: keywordAnalysis.score,
      entityScore: entityAnalysis.score,
      sourceScore: sourceAnalysis.score,
      tagScore: tagAnalysis.score,
      commonWords: keywordAnalysis.commonWords,
      commonEntities: entityAnalysis.commonEntities,
    }
  );

  if (!relationType) {
    return null;
  }

  // Generate explanation
  const explanation = generateExplanation(relationType, {
    commonWords: keywordAnalysis.commonWords,
    commonEntities: entityAnalysis.commonEntities,
    commonSourceIds: sourceAnalysis.commonSourceIds,
    commonTags: tagAnalysis.commonTags,
  });

  // Identify key factors
  const keyFactors: string[] = [];
  if (entityAnalysis.commonEntities.length > 0) {
    keyFactors.push(...entityAnalysis.commonEntities);
  }
  if (keywordAnalysis.commonWords.length > 0) {
    keyFactors.push(...keywordAnalysis.commonWords.slice(0, 2));
  }

  return {
    hypothesisId: existingHypothesis.id,
    type: relationType,
    confidence: Math.min(totalScore, 100),
    explanation,
    keyFactors: keyFactors.slice(0, 3), // Max 3 key factors
  };
}

// ─── MAIN FUNCTION ────────────────────────────────────────────────────────────

/**
 * Detect relationships between a new hypothesis and existing ones
 */
export async function detectRelations(
  newHypothesis: NewHypothesisData,
  existingHypotheses: Hypothesis[]
): Promise<DetectionResult> {
  const startTime = Date.now();

  // Simulate thinking time for realistic effect (1.5-2s)
  await simulateThinking(1500 + Math.random() * 500);

  // Analyze each existing hypothesis
  const suggestions = existingHypotheses
    .map(h => analyzeRelationship(newHypothesis, h))
    .filter((s): s is RelationSuggestion => s !== null)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5); // Top 5 suggestions

  const analysisTime = Date.now() - startTime;

  return {
    suggestions,
    analysisTime,
    totalAnalyzed: existingHypotheses.length,
  };
}
