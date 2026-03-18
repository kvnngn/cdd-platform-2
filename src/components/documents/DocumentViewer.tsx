import React from 'react';
import { FileText, FileSpreadsheet, Presentation, AlertCircle } from 'lucide-react';
import { Source, HypothesisSource } from '@/types';
import { TextViewer } from './viewers/TextViewer';
import { CsvViewer } from './viewers/CsvViewer';
import { ExcelViewer } from './viewers/ExcelViewer';
import { PdfViewer } from './viewers/PdfViewer';

interface DocumentViewerProps {
  source: Source;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

// Fallback component for unsupported file types
function UnsupportedViewer({ source }: { source: Source }) {
  const getIcon = () => {
    switch (source.fileType) {
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="w-16 h-16 text-slate-300" />;
      case 'pdf':
        return <FileText className="w-16 h-16 text-slate-300" />;
      default:
        return <Presentation className="w-16 h-16 text-slate-300" />;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md">
        <div className="mb-4 flex justify-center">{getIcon()}</div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Preview Not Available
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Preview for {source.fileType?.toUpperCase() || 'this file type'} files is coming soon.
          You can download the file to view it locally.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Download File
        </button>
      </div>
    </div>
  );
}

// Error component
function ErrorViewer({ error }: { error: string }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Error Loading Document
        </h3>
        <p className="text-sm text-slate-600">{error}</p>
      </div>
    </div>
  );
}

// Loading component
function LoadingViewer() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-slate-600">Loading document...</p>
      </div>
    </div>
  );
}

export function DocumentViewer({
  source,
  excerpts,
  highlightMode,
  zoom,
  currentPage,
  onPageChange,
}: DocumentViewerProps) {
  // Route to appropriate viewer based on file type
  const fileType = source.fileType;

  // Route to appropriate viewer based on file type
  switch (fileType) {
    case 'pdf':
      if (source.content) {
        return (
          <PdfViewer
            content={source.content}
            excerpts={excerpts}
            highlightMode={highlightMode}
            zoom={zoom}
          />
        );
      }
      return <UnsupportedViewer source={source} />;

    case 'xlsx':
      if (source.content) {
        return (
          <ExcelViewer
            content={source.content}
            excerpts={excerpts}
            highlightMode={highlightMode}
            zoom={zoom}
          />
        );
      }
      return <UnsupportedViewer source={source} />;

    case 'csv':
      if (source.content) {
        return (
          <CsvViewer
            content={source.content}
            excerpts={excerpts}
            highlightMode={highlightMode}
            zoom={zoom}
          />
        );
      }
      return <UnsupportedViewer source={source} />;

    default:
      // Text/Markdown viewer (Phase 1)
      if (source.content) {
        return (
          <TextViewer
            content={source.content}
            excerpts={excerpts}
            highlightMode={highlightMode}
            zoom={zoom}
          />
        );
      }

      // If no full content but has excerpt, display that with metadata
      if (source.excerpt) {
        return (
          <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="max-w-3xl mx-auto p-8">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Document Summary</span>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{source.title}</h2>
                  {source.author && (
                    <p className="text-sm text-slate-600 mt-1">
                      By {source.author} · {source.publishedAt}
                    </p>
                  )}
                </div>

                <div className="prose prose-sm max-w-none">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Key Extract</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{source.excerpt}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 italic">
                    Full document content not available. This is a summary based on available metadata.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return <ErrorViewer error="No content available for this document" />;
  }
}
