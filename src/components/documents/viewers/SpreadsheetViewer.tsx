import React, { useMemo, useEffect } from 'react';
import { FileSpreadsheet, Table } from 'lucide-react';
import { Source, HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findExcerptMatches, applyHighlightsToHTML, scrollToExcerpt } from './highlightUtils';

interface SpreadsheetViewerProps {
  source: Source;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
}

export function SpreadsheetViewer({
  source,
  excerpts,
  highlightMode,
  zoom,
}: SpreadsheetViewerProps) {
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

  // Detect if content has table-like structure
  const hasTableStructure = content.includes('|') || content.match(/\t.*\t/);

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div
        className="max-w-6xl mx-auto my-6"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        {/* Spreadsheet Header */}
        <div className="bg-white rounded-t-lg shadow-sm border border-slate-200 border-b-0">
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-bold text-slate-900">{source.title}</h1>
            </div>
            {source.author && (
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>Author: {source.author}</span>
                {source.publishedAt && (
                  <>
                    <span>•</span>
                    <span>Last Modified: {source.publishedAt}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Spreadsheet toolbar */}
          <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <Table className="w-4 h-4" />
            <span className="font-medium">Sheet 1</span>
            <span className="text-slate-400">|</span>
            <span>{source.fileType?.toUpperCase()} Format</span>
          </div>
        </div>

        {/* Spreadsheet Content */}
        <div className="bg-white rounded-b-lg shadow-sm border border-slate-200">
          <div className="p-6">
            {hasTableStructure ? (
              // Render as table-like structure
              <div className="overflow-x-auto">
                <div
                  className="font-mono text-sm text-slate-800"
                  style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: processedContent
                      .split('\n')
                      .map((line) => {
                        // Format headers
                        if (line.match(/^[A-Z\s]{3,}:?$/)) {
                          return `<div class="text-base font-bold mt-6 mb-3 text-green-700 bg-green-50 px-3 py-2 rounded">${line}</div>`;
                        }
                        // Format sub-headers
                        if (line.match(/^[A-Z][^.!?]*:$/)) {
                          return `<div class="text-sm font-semibold mt-4 mb-2 text-slate-700 bg-slate-50 px-3 py-1 rounded">${line}</div>`;
                        }
                        // Format data rows with background
                        if (line.trim() && line.match(/:/)) {
                          return `<div class="px-3 py-1 hover:bg-slate-50 rounded">${line}</div>`;
                        }
                        // Regular lines
                        if (line.trim()) {
                          return `<div class="px-3 py-1">${line}</div>`;
                        }
                        return '<div class="h-2"></div>';
                      })
                      .join(''),
                  }}
                />
              </div>
            ) : (
              // Render as formatted text
              <div
                className="prose prose-sm max-w-none text-slate-800"
                dangerouslySetInnerHTML={{
                  __html: processedContent
                    .split('\n')
                    .map((line) => {
                      // Format headers
                      if (line.match(/^[A-Z\s]{3,}:?$/)) {
                        return `<h2 class="text-lg font-bold mt-6 mb-3 text-green-700">${line}</h2>`;
                      }
                      // Format sub-headers
                      if (line.match(/^[A-Z][^.!?]*:$/)) {
                        return `<h3 class="text-base font-semibold mt-4 mb-2 text-slate-700">${line}</h3>`;
                      }
                      // Format bullet points or data lines
                      if (line.match(/^-\s/) || line.match(/^\d+\./)) {
                        return `<p class="ml-4 mb-1 font-mono text-sm">${line}</p>`;
                      }
                      // Regular paragraphs
                      if (line.trim()) {
                        return `<p class="mb-2">${line}</p>`;
                      }
                      return '<br/>';
                    })
                    .join(''),
                }}
              />
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 px-6 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <FileSpreadsheet className="w-3 h-3" />
              {source.fileName || `document.${source.fileType}`}
            </span>
            <span>
              File Type: {source.fileType?.toUpperCase()} •
              Reliability Score: {source.reliabilityScore}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
