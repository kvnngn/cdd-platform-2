import React, { useMemo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findExcerptMatches, scrollToExcerpt, type HighlightMatch } from './highlightUtils';

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
    if (highlightMode) {
      scrollToExcerpt(activeExcerptIndex);
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
