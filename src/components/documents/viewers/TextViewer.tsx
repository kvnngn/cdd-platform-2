import React, { useMemo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findExcerptMatches, HighlightMatch } from './shared/HighlightEngine';

interface TextViewerProps {
  content: string;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
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
