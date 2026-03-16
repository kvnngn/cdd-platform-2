import React from 'react';
import { HypothesisSource } from '@/types';

export interface HighlightMatch {
  text: string;
  startOffset: number;
  endOffset: number;
  excerptIndex: number;
}

// Helper function to escape regex special characters
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to normalize text for matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[""]/g, '"')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/(\d)\s+/g, '$1')
    .trim();
}

// Extract significant keyword phrases
function extractKeyPhrases(text: string, minWords: number = 5): string[] {
  const words = text.split(/\s+/);
  const phrases: string[] = [];

  for (let i = 0; i <= words.length - minWords; i++) {
    const phrase = words.slice(i, i + minWords).join(' ');
    if (phrase.length > 20) {
      phrases.push(phrase);
    }
  }

  return phrases;
}

// Find all matches of excerpts in content
export function findExcerptMatches(content: string, excerpts: HypothesisSource[]): HighlightMatch[] {
  const matches: HighlightMatch[] = [];

  excerpts.forEach((excerpt, excerptIndex) => {
    const text = excerpt.excerpt;
    const normalizedContent = normalizeText(content);
    const normalizedText = normalizeText(text);

    // Try exact match first
    let index = normalizedContent.indexOf(normalizedText);
    if (index !== -1) {
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

    // Try phrase-level matching
    const phrases = text.split(/[,.;!?]+/).filter((s) => s.trim().length > 15);

    let foundMatch = false;
    phrases.forEach((phrase) => {
      if (foundMatch) return;

      const normalizedPhrase = normalizeText(phrase);
      index = normalizedContent.indexOf(normalizedPhrase);
      if (index !== -1) {
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

    // Try keyword phrase matching
    if (!foundMatch) {
      const keyPhrases = extractKeyPhrases(text, 5);

      keyPhrases.forEach((keyPhrase) => {
        if (foundMatch) return;

        const normalizedKeyPhrase = normalizeText(keyPhrase);
        index = normalizedContent.indexOf(normalizedKeyPhrase);
        if (index !== -1) {
          const words = keyPhrase.split(/\s+/);
          const escapedWords = words.map(escapeRegex);
          const searchPattern = escapedWords.join('\\s+');
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
      last.endOffset = Math.max(last.endOffset, match.endOffset);
    } else {
      merged.push(match);
    }
  });

  return merged;
}

// Apply highlights to content and return HTML string
export function applyHighlightsToHTML(content: string, matches: HighlightMatch[]): string {
  if (matches.length === 0) {
    return content;
  }

  const parts: string[] = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    // Add text before highlight
    if (match.startOffset > lastIndex) {
      parts.push(content.substring(lastIndex, match.startOffset));
    }

    // Add highlighted text
    parts.push(
      `<mark id="excerpt-highlight-${match.excerptIndex}" class="bg-amber-200/40 border-b-2 border-amber-400 px-0.5" data-excerpt-index="${match.excerptIndex}">${content.substring(match.startOffset, match.endOffset)}</mark>`
    );

    lastIndex = match.endOffset;
  });

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.join('');
}

// Scroll to and highlight active excerpt
export function scrollToExcerpt(excerptIndex: number | null) {
  if (excerptIndex === null) return;

  const element = document.getElementById(`excerpt-highlight-${excerptIndex}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Briefly highlight the active excerpt
    element.style.backgroundColor = 'rgb(251, 191, 36)'; // amber-400
    setTimeout(() => {
      element.style.backgroundColor = '';
    }, 1500);
  }
}
