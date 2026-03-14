import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Printer,
  X,
  Highlighter,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Source } from '@/types';

interface DocumentToolbarProps {
  source: Source;
  currentPage: number;
  totalPages: number;
  zoom: number;
  highlightMode: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleHighlights: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onClose: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

// Helper to get connector config (mock - would come from actual config)
function getConnectorConfig(connectorId: string) {
  const configs: Record<string, { name: string; logoUrl: string }> = {
    'google-drive': { name: 'Google Drive', logoUrl: '/icons/google-drive.svg' },
    'dropbox': { name: 'Dropbox', logoUrl: '/icons/dropbox.svg' },
    'sharepoint': { name: 'SharePoint', logoUrl: '/icons/sharepoint.svg' },
  };
  return configs[connectorId] || { name: 'Unknown Provider', logoUrl: '/icons/default-cloud.svg' };
}

export function DocumentToolbar({
  source,
  currentPage,
  totalPages,
  zoom,
  highlightMode,
  onPreviousPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onToggleHighlights,
  onDownload,
  onShare,
  onPrint,
  onClose,
  canGoPrevious,
  canGoNext,
}: DocumentToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
      {/* Left: Document info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          title="Close (Esc)"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-900 max-w-xs truncate">
            {source.title}
          </h2>

          {/* Cloud provider badge */}
          {source.connectorId && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <img
                src={getConnectorConfig(source.connectorId).logoUrl}
                className="w-4 h-4"
                alt={getConnectorConfig(source.connectorId).name}
              />
              <span className="text-xs text-slate-600">
                {getConnectorConfig(source.connectorId).name}
              </span>
            </div>
          )}

          {/* Sync status */}
          {source.syncStatus && (
            <div
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded text-xs',
                source.syncStatus === 'synced' && 'bg-emerald-50 text-emerald-700',
                source.syncStatus === 'syncing' && 'bg-blue-50 text-blue-700',
                source.syncStatus === 'error' && 'bg-red-50 text-red-700'
              )}
            >
              {source.syncStatus === 'synced' && <CheckCircle2 className="w-3 h-3" />}
              {source.syncStatus === 'syncing' && <Loader2 className="w-3 h-3 animate-spin" />}
              {source.syncStatus === 'error' && <AlertCircle className="w-3 h-3" />}
              <span>
                {source.syncStatus === 'synced' && 'Synced'}
                {source.syncStatus === 'syncing' && 'Syncing...'}
                {source.syncStatus === 'error' && 'Sync failed'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Center: Navigation & zoom controls */}
      <div className="flex items-center gap-6">
        {/* Page navigation */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={onPreviousPage}
              disabled={!canGoPrevious}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                canGoPrevious
                  ? 'hover:bg-slate-100 text-slate-700'
                  : 'text-slate-300 cursor-not-allowed'
              )}
              title="Previous page (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-sm text-slate-600 min-w-[80px] text-center">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={onNextPage}
              disabled={!canGoNext}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                canGoNext
                  ? 'hover:bg-slate-100 text-slate-700'
                  : 'text-slate-300 cursor-not-allowed'
              )}
              title="Next page (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            disabled={zoom <= 50}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              zoom > 50
                ? 'hover:bg-slate-100 text-slate-700'
                : 'text-slate-300 cursor-not-allowed'
            )}
            title="Zoom out (Ctrl -)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-sm text-slate-600 min-w-[60px] text-center font-medium">
            {zoom}%
          </span>

          <button
            onClick={onZoomIn}
            disabled={zoom >= 200}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              zoom < 200
                ? 'hover:bg-slate-100 text-slate-700'
                : 'text-slate-300 cursor-not-allowed'
            )}
            title="Zoom in (Ctrl +)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight toggle */}
        <button
          onClick={onToggleHighlights}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium',
            highlightMode
              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          )}
          title="Toggle highlights (H)"
        >
          <Highlighter className="w-4 h-4" />
          <span>Highlights</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-slate-600" />
          </button>
        )}

        {onPrint && (
          <button
            onClick={onPrint}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Print"
          >
            <Printer className="w-4 h-4 text-slate-600" />
          </button>
        )}

        {onShare && (
          <button
            onClick={onShare}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
          </button>
        )}

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          title="Close (Esc)"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
