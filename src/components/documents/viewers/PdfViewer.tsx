import React, { useMemo, useEffect, useState, useRef } from 'react';
import { HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findExcerptMatches, HighlightMatch } from './shared/HighlightEngine';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface PdfViewerProps {
  content: string;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
}

/**
 * Split content into pages
 * Looks for page break markers or splits by character count
 */
function splitIntoPages(content: string, charsPerPage: number = 3000): string[] {
  // Look for common page break markers
  const pageBreakPatterns = [
    /\n={3,}\n/g, // === page break
    /\n-{3,}\n/g, // --- page break
    /\f/g, // Form feed character
    /Page \d+/gi, // "Page 1", "Page 2", etc.
  ];

  let pages: string[] = [];

  // Try to split by page markers
  for (const pattern of pageBreakPatterns) {
    const splits = content.split(pattern);
    if (splits.length > 1) {
      pages = splits.filter((p) => p.trim().length > 0);
      break;
    }
  }

  // If no markers found, split by character count
  if (pages.length === 0) {
    const paragraphs = content.split(/\n\n+/);
    let currentPage = '';
    pages = [];

    paragraphs.forEach((para) => {
      if (currentPage.length + para.length > charsPerPage && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = para;
      } else {
        currentPage += (currentPage ? '\n\n' : '') + para;
      }
    });

    if (currentPage) {
      pages.push(currentPage);
    }
  }

  // Ensure we have at least one page
  if (pages.length === 0) {
    pages = [content];
  }

  return pages;
}

/**
 * Apply highlights to text content
 */
function HighlightedText({ content, matches }: { content: string; matches: HighlightMatch[] }) {
  if (matches.length === 0) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, idx) => {
    // Add text before highlight
    if (match.startOffset > lastIndex) {
      result.push(
        <span key={`text-${idx}`}>{content.substring(lastIndex, match.startOffset)}</span>
      );
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
    result.push(<span key="text-end">{content.substring(lastIndex)}</span>);
  }

  return <div className="whitespace-pre-wrap">{result}</div>;
}

export function PdfViewer({ content, excerpts, highlightMode, zoom }: PdfViewerProps) {
  const { activeExcerptIndex, setCurrentPage } = useDocumentViewerStore();
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const pages = useMemo(() => splitIntoPages(content), [content]);

  const currentPageContent = pages[currentPageNum - 1] || '';

  const allMatches = useMemo(
    () => (highlightMode ? findExcerptMatches(content, excerpts) : []),
    [content, excerpts, highlightMode]
  );

  // Filter matches for current page
  const pageStartOffset = useMemo(() => {
    let offset = 0;
    for (let i = 0; i < currentPageNum - 1; i++) {
      offset += pages[i].length;
    }
    return offset;
  }, [pages, currentPageNum]);

  const pageEndOffset = pageStartOffset + currentPageContent.length;

  const currentPageMatches = useMemo(() => {
    return allMatches
      .filter((m) => m.startOffset >= pageStartOffset && m.startOffset < pageEndOffset)
      .map((m) => ({
        ...m,
        startOffset: m.startOffset - pageStartOffset,
        endOffset: m.endOffset - pageStartOffset,
      }));
  }, [allMatches, pageStartOffset, pageEndOffset]);

  // Scroll to active excerpt when it changes
  useEffect(() => {
    if (activeExcerptIndex !== null && highlightMode) {
      // Find which page contains this excerpt
      const match = allMatches.find((m) => m.excerptIndex === activeExcerptIndex);
      if (match) {
        // Calculate which page this match is on
        let offset = 0;
        let pageNum = 1;
        for (let i = 0; i < pages.length; i++) {
          if (match.startOffset >= offset && match.startOffset < offset + pages[i].length) {
            pageNum = i + 1;
            break;
          }
          offset += pages[i].length;
        }

        // Navigate to that page if different
        if (pageNum !== currentPageNum) {
          setCurrentPageNum(pageNum);
          setCurrentPage(pageNum);
        }

        // Scroll to element
        setTimeout(() => {
          const element = document.getElementById(`excerpt-highlight-${activeExcerptIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Briefly highlight
            element.style.backgroundColor = 'rgb(251, 191, 36)'; // amber-400
            setTimeout(() => {
              element.style.backgroundColor = '';
            }, 1500);
          }
        }, 100);
      }
    }
  }, [activeExcerptIndex, highlightMode, allMatches, pages, currentPageNum, setCurrentPage]);

  const handlePrevPage = () => {
    if (currentPageNum > 1) {
      const newPage = currentPageNum - 1;
      setCurrentPageNum(newPage);
      setCurrentPage(newPage);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPageNum < pages.length) {
      const newPage = currentPageNum + 1;
      setCurrentPageNum(newPage);
      setCurrentPage(newPage);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scaleFactor = zoom / 100;

  if (!content) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No PDF content available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 flex flex-col bg-slate-100 overflow-auto">
      {/* Page navigation */}
      {pages.length > 1 && (
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPageNum === 1}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-slate-600">
            Page <span className="font-semibold text-slate-900">{currentPageNum}</span> of{' '}
            <span className="font-semibold text-slate-900">{pages.length}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPageNum === pages.length}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PDF page content */}
      <div className="flex-1 p-8">
        <div
          className="max-w-4xl mx-auto"
          style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top center' }}
        >
          <div className="bg-white shadow-lg rounded-sm p-12 min-h-[800px]">
            <div className="font-serif text-base leading-relaxed text-slate-800">
              <HighlightedText content={currentPageContent} matches={currentPageMatches} />
            </div>

            {highlightMode && currentPageMatches.length > 0 && (
              <div className="mt-8 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  {currentPageMatches.length} highlight{currentPageMatches.length !== 1 ? 's' : ''}{' '}
                  on this page
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
