import React, { useMemo, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Source, HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findExcerptMatches, applyHighlightsToHTML, scrollToExcerpt } from './highlightUtils';

interface PDFViewerProps {
  source: Source;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
  currentPage?: number;
}

export function PDFViewer({
  source,
  excerpts,
  highlightMode,
  zoom,
}: PDFViewerProps) {
  const { activeExcerptIndex } = useDocumentViewerStore();
  const content = source.content || source.excerpt || 'No content available';

  // Find matches using the shared utility
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

  // Apply highlights to content
  const processedContent = useMemo(() => {
    if (!highlightMode || matches.length === 0) {
      return content;
    }
    return applyHighlightsToHTML(content, matches);
  }, [content, matches, highlightMode]);

  return (
    <div className="flex-1 bg-slate-100 overflow-y-auto">
      <div
        className="max-w-4xl mx-auto my-8 bg-white shadow-lg"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        {/* PDF Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-12 py-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-slate-900">{source.title}</h1>
          </div>
          {source.author && (
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span>Author: {source.author}</span>
              {source.publishedAt && (
                <>
                  <span>•</span>
                  <span>Published: {source.publishedAt}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* PDF Content */}
        <div className="px-12 py-8">
          <div
            className="prose prose-sm max-w-none text-slate-800"
            style={{
              fontFamily: 'Georgia, serif',
              lineHeight: '1.8',
            }}
            dangerouslySetInnerHTML={{
              __html: processedContent
                .split('\n')
                .map((line) => {
                  // Format headers
                  if (line.match(/^[A-Z\s]{3,}:?$/)) {
                    return `<h2 class="text-lg font-bold mt-6 mb-3 text-slate-900">${line}</h2>`;
                  }
                  // Format sub-headers
                  if (line.match(/^[A-Z][^.!?]*:$/)) {
                    return `<h3 class="text-base font-semibold mt-4 mb-2 text-slate-800">${line}</h3>`;
                  }
                  // Format bullet points
                  if (line.match(/^-\s/)) {
                    return `<p class="ml-4 mb-1">${line}</p>`;
                  }
                  // Regular paragraphs
                  if (line.trim()) {
                    return `<p class="mb-3">${line}</p>`;
                  }
                  return '<br/>';
                })
                .join(''),
            }}
          />
        </div>

        {/* PDF Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-12 py-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>{source.fileName || 'document.pdf'}</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
