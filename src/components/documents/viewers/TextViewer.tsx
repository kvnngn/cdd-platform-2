import React, { useMemo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';

interface TextViewerProps {
  content: string;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
}

interface HighlightMatch {
  text: string;
  startOffset: number;
  endOffset: number;
  excerptIndex: number;  // Index of the original excerpt that created this match
}

// Helper function to normalize text for matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/[""]/g, '"')  // Normalize quotes
    .replace(/(\d),(\d)/g, '$1.$2')  // Convert European decimals (1,2) to US format (1.2)
    .replace(/(\d)\s+/g, '$1')  // Remove spaces after numbers
    .trim();
}

// Extract significant keyword phrases (5+ consecutive words)
function extractKeyPhrases(text: string, minWords: number = 5): string[] {
  const words = text.split(/\s+/);
  const phrases: string[] = [];

  for (let i = 0; i <= words.length - minWords; i++) {
    const phrase = words.slice(i, i + minWords).join(' ');
    if (phrase.length > 20) {  // Skip very short phrases
      phrases.push(phrase);
    }
  }

  return phrases;
}

// Function to find all matches of excerpts in content
function findExcerptMatches(content: string, excerpts: HypothesisSource[]): HighlightMatch[] {
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

// Function to apply highlights to content
function applyHighlights(content: string, matches: HighlightMatch[]): React.ReactNode[] {
  if (matches.length === 0) {
    return [content];
  }

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, idx) => {
    // Add text before highlight
    if (match.startOffset > lastIndex) {
      result.push(content.substring(lastIndex, match.startOffset));
    }

    // Add highlighted text
    result.push(
      <mark
        key={`highlight-${idx}`}
        id={`excerpt-highlight-${match.excerptIndex}`}
        className="bg-amber-200/40 border-b-2 border-amber-400 px-0.5"
        data-excerpt-index={match.excerptIndex}
      >
        {content.substring(match.startOffset, match.endOffset)}
      </mark>
    );

    lastIndex = match.endOffset;
  });

  // Add remaining text
  if (lastIndex < content.length) {
    result.push(content.substring(lastIndex));
  }

  return result;
}

export function TextViewer({ content, excerpts, highlightMode, zoom }: TextViewerProps) {
  const { activeExcerptIndex } = useDocumentViewerStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(
    () => (highlightMode ? findExcerptMatches(content, excerpts) : []),
    [content, excerpts, highlightMode]
  );

  // Scroll to active excerpt when it changes
  useEffect(() => {
    if (activeExcerptIndex !== null && highlightMode) {
      const element = document.getElementById(`excerpt-highlight-${activeExcerptIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Briefly highlight the active excerpt
        element.style.backgroundColor = 'rgb(251, 191, 36)'; // amber-400
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 1500);
      }
    }
  }, [activeExcerptIndex, highlightMode]);

  const isMarkdown = content.includes('#') || content.includes('```') || content.includes('**');

  const scaleFactor = zoom / 100;

  return (
    <div ref={containerRef} className="flex-1 overflow-auto bg-white">
      <div className="max-w-4xl mx-auto px-8 py-6">
        {isMarkdown ? (
          <div
            className="prose prose-slate max-w-none"
            style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top left' }}
          >
            {highlightMode && matches.length > 0 ? (
              <div>{applyHighlights(content, matches)}</div>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            )}
          </div>
        ) : (
          <div
            className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700"
            style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top left' }}
          >
            {highlightMode && matches.length > 0 ? (
              <>{applyHighlights(content, matches)}</>
            ) : (
              content
            )}
          </div>
        )}
      </div>
    </div>
  );
}
