import { HypothesisSource } from '@/types';

export interface HighlightMatch {
  text: string;
  startOffset: number;
  endOffset: number;
  excerptIndex: number; // Index of the original excerpt that created this match
}

export interface CellHighlight {
  row: number;
  col: number;
  excerptIndex: number;
}

/**
 * Normalize text for matching by:
 * - Converting to lowercase
 * - Normalizing whitespace
 * - Normalizing quotes
 * - Converting European decimals to US format
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[""]/g, '"') // Normalize quotes
    .replace(/(\d),(\d)/g, '$1.$2') // Convert European decimals (1,2) to US format (1.2)
    .replace(/(\d)\s+/g, '$1') // Remove spaces after numbers
    .trim();
}

/**
 * Extract significant keyword phrases (N+ consecutive words)
 */
export function extractKeyPhrases(text: string, minWords: number = 5): string[] {
  const words = text.split(/\s+/);
  const phrases: string[] = [];

  for (let i = 0; i <= words.length - minWords; i++) {
    const phrase = words.slice(i, i + minWords).join(' ');
    if (phrase.length > 20) {
      // Skip very short phrases
      phrases.push(phrase);
    }
  }

  return phrases;
}

/**
 * Find all matches of excerpts in content using a 3-tier matching algorithm:
 * 1. Exact match
 * 2. Phrase-level matching (split by punctuation)
 * 3. Keyword phrase matching (5+ consecutive words)
 */
export function findExcerptMatches(
  content: string,
  excerpts: HypothesisSource[]
): HighlightMatch[] {
  const matches: HighlightMatch[] = [];

  excerpts.forEach((excerpt, excerptIndex) => {
    const text = excerpt.excerpt;
    const normalizedContent = normalizeText(content);
    const normalizedText = normalizeText(text);

    // Try exact match first
    let index = normalizedContent.indexOf(normalizedText);
    if (index !== -1) {
      // Find actual position in original content
      const actualIndex = content.toLowerCase().indexOf(text.toLowerCase());
      if (actualIndex !== -1) {
        matches.push({
          text,
          startOffset: actualIndex,
          endOffset: actualIndex + text.length,
          excerptIndex,
        });
        return;
      }
    }

    // Try phrase-level matching (split by commas, periods)
    const phrases = text.split(/[,.;!?]+/).filter((s) => s.trim().length > 15);

    let foundMatch = false;
    phrases.forEach((phrase) => {
      if (foundMatch) return;

      const normalizedPhrase = normalizeText(phrase);
      index = normalizedContent.indexOf(normalizedPhrase);
      if (index !== -1) {
        // Find actual position in original content
        const searchPhrase = phrase.trim();
        const actualIndex = content.toLowerCase().indexOf(searchPhrase.toLowerCase());
        if (actualIndex !== -1) {
          matches.push({
            text: searchPhrase,
            startOffset: actualIndex,
            endOffset: actualIndex + searchPhrase.length,
            excerptIndex,
          });
          foundMatch = true;
        }
      }
    });

    // Try keyword phrase matching (5+ consecutive words)
    if (!foundMatch) {
      const keyPhrases = extractKeyPhrases(text, 5);

      keyPhrases.forEach((keyPhrase) => {
        if (foundMatch) return;

        const normalizedKeyPhrase = normalizeText(keyPhrase);
        index = normalizedContent.indexOf(normalizedKeyPhrase);
        if (index !== -1) {
          // Find actual position in original content
          // Search for any 5-word sequence that matches
          const words = keyPhrase.split(/\s+/);
          const searchPattern = words.join('\\s+');
          const regex = new RegExp(searchPattern, 'i');
          const match = content.match(regex);
          if (match && match.index !== undefined) {
            matches.push({
              text: match[0],
              startOffset: match.index,
              endOffset: match.index + match[0].length,
              excerptIndex,
            });
            foundMatch = true;
          }
        }
      });
    }
  });

  // Sort by start offset and merge overlapping matches
  matches.sort((a, b) => a.startOffset - b.startOffset);
  const merged: HighlightMatch[] = [];
  matches.forEach((match) => {
    if (merged.length === 0) {
      merged.push(match);
      return;
    }

    const last = merged[merged.length - 1];
    if (match.startOffset <= last.endOffset) {
      // Overlapping, merge
      last.endOffset = Math.max(last.endOffset, match.endOffset);
    } else {
      merged.push(match);
    }
  });

  console.log('Total matches found:', merged.length);
  return merged;
}

/**
 * Find matches in tabular data (for CSV/Excel viewers)
 * Returns which cells contain matching excerpts
 */
export function findMatchesInTable(
  rows: string[][],
  excerpts: HypothesisSource[]
): CellHighlight[] {
  const highlights: CellHighlight[] = [];

  rows.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      excerpts.forEach((excerpt, excerptIndex) => {
        const normalizedCell = normalizeText(cell);
        const normalizedExcerpt = normalizeText(excerpt.excerpt);

        // Check if cell contains the excerpt or vice versa
        if (
          normalizedCell.includes(normalizedExcerpt) ||
          normalizedExcerpt.includes(normalizedCell)
        ) {
          highlights.push({
            row: rowIdx,
            col: colIdx,
            excerptIndex,
          });
        }
      });
    });
  });

  return highlights;
}
