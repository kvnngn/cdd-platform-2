/**
 * Semantic Search Service
 *
 * Provides semantic document discovery based on scope prompts.
 * Phase 1: Simple keyword matching (mock implementation)
 * Phase 2: Vector search with embeddings + RAG (future)
 */

import { SOURCES } from '@/data/mockData';
import { ChatMessage } from '@/types/matrix';
import { nanoid } from 'nanoid';

/**
 * Search for documents matching a semantic scope prompt.
 *
 * Current implementation: Simple keyword matching.
 * Future: Vector embeddings + similarity search.
 *
 * @param scopePrompt - Natural language description of what to find (e.g., "unit economics of European competitors")
 * @param projectId - Filter sources by project
 * @returns Array of source IDs matching the scope
 */
export async function searchDocumentsByScope(
  scopePrompt: string,
  projectId?: string
): Promise<string[]> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));

  // Extract keywords from scope prompt
  const keywords = scopePrompt
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3) // Filter out short words
    .filter(word => !['the', 'and', 'for', 'with', 'that', 'this', 'from'].includes(word));

  // Get all sources (optionally filtered by project)
  let sources = SOURCES;
  if (projectId) {
    sources = sources.filter(s => {
      // Note: Sources don't currently have projectId in the type
      // In real implementation, we'd filter by project
      // For now, return all sources
      return true;
    });
  }

  // Score each source based on keyword matches
  const scoredSources = sources.map(source => {
    let score = 0;
    const searchText = `${source.title} ${source.excerpt} ${source.content || ''}`.toLowerCase();

    keywords.forEach(keyword => {
      // Title matches are weighted higher
      if (source.title.toLowerCase().includes(keyword)) {
        score += 3;
      }
      // Excerpt matches
      if (source.excerpt.toLowerCase().includes(keyword)) {
        score += 2;
      }
      // Content matches
      if (source.content?.toLowerCase().includes(keyword)) {
        score += 1;
      }
    });

    return { source, score };
  });

  // Filter to sources with at least one keyword match
  const matchedSources = scoredSources
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .map(({ source }) => source.id);

  return matchedSources;
}

/**
 * Get search suggestions based on partial input.
 * Useful for autocomplete/typeahead functionality.
 *
 * @param partialPrompt - Partial scope prompt
 * @returns Suggested complete prompts
 */
export async function getScopeSuggestions(partialPrompt: string): Promise<string[]> {
  // Mock suggestions based on common analysis patterns
  const suggestions: Record<string, string[]> = {
    'unit': [
      'unit economics of competitors',
      'unit economics and pricing models',
      'unit economics benchmarks',
    ],
    'competitor': [
      'competitive landscape analysis',
      'competitor pricing strategies',
      'competitor market share data',
    ],
    'market': [
      'market size and growth projections',
      'market segmentation analysis',
      'market dynamics and trends',
    ],
    'financial': [
      'financial performance metrics',
      'financial due diligence data',
      'financial projections and forecasts',
    ],
  };

  const firstWord = partialPrompt.trim().split(/\s+/)[0].toLowerCase();
  return suggestions[firstWord] || [];
}

/**
 * Calculate relevance score for a source given a scope prompt.
 * Used for ranking and filtering discovered documents.
 *
 * @param sourceId - Source to score
 * @param scopePrompt - Scope prompt to match against
 * @returns Relevance score (0-100)
 */
export function calculateRelevanceScore(
  sourceId: string,
  scopePrompt: string
): number {
  const source = SOURCES.find(s => s.id === sourceId);
  if (!source) return 0;

  const keywords = scopePrompt.toLowerCase().split(/\s+/);
  const searchText = `${source.title} ${source.excerpt}`.toLowerCase();

  let matches = 0;
  keywords.forEach(keyword => {
    if (searchText.includes(keyword)) matches++;
  });

  // Convert to 0-100 score
  return Math.min(100, Math.round((matches / keywords.length) * 100));
}

/**
 * Search with agent thinking steps (Hebbia-style).
 * Provides conversational document discovery with transparent thinking process.
 *
 * @param prompt - User's search prompt
 * @param nodeId - Optional node ID to filter sources
 * @returns Suggested sources, conversation history, and thinking steps
 */
export async function searchWithAgent(
  prompt: string,
  nodeId?: string
): Promise<{
  suggestedSources: string[];
  conversation: ChatMessage[];
  thinkingSteps: string[];
}> {
  // Simulate agent thinking process
  const thinkingSteps: string[] = [
    'Analyzing search query...',
    'Extracting key concepts and entities...',
    'Searching document database...',
    'Ranking by relevance...',
    'Filtering by quality and completeness...',
    'Preparing document suggestions...',
  ];

  const conversation: ChatMessage[] = [];

  // User message
  conversation.push({
    id: nanoid(),
    role: 'user',
    content: prompt,
    timestamp: new Date().toISOString(),
  });

  // Simulate progressive thinking (can be streamed in real implementation)
  await new Promise(resolve => setTimeout(resolve, 800));

  // Perform search
  const suggestedSources = await searchDocumentsByScope(prompt, nodeId);

  // Agent response
  const agentContent = suggestedSources.length > 0
    ? `I found **${suggestedSources.length} documents** that match your query. I analyzed the content based on:\n\n` +
      `- Keyword relevance in titles and excerpts\n` +
      `- Document completeness and metadata quality\n` +
      `- Semantic similarity to your search intent\n\n` +
      `Please review the suggested documents below and select the ones you'd like to include in your analysis matrix.`
    : `I couldn't find any documents matching "${prompt}". Try:\n\n` +
      `- Using more general keywords\n` +
      `- Checking spelling\n` +
      `- Describing what you're looking for differently`;

  conversation.push({
    id: nanoid(),
    role: 'agent',
    content: agentContent,
    timestamp: new Date().toISOString(),
    metadata: {
      suggestedDocCount: suggestedSources.length,
      searchSteps: thinkingSteps,
      isCollapsed: false,
    },
  });

  return {
    suggestedSources,
    conversation,
    thinkingSteps,
  };
}
