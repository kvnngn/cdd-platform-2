import React, { useState } from 'react';
import { FileText, MessageSquare, Info, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Source, HypothesisSource } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface DocumentSidebarProps {
  source: Source;
  excerpts: HypothesisSource[];
  activeExcerptId?: string;
  onExcerptClick?: (excerptId: string) => void;
}

type TabType = 'excerpts' | 'info' | 'comments';

// Helper to get connector config
function getConnectorConfig(connectorId: string) {
  const configs: Record<string, { name: string; logoUrl: string }> = {
    'google-drive': { name: 'Google Drive', logoUrl: '/icons/google-drive.svg' },
    'dropbox': { name: 'Dropbox', logoUrl: '/icons/dropbox.svg' },
    'sharepoint': { name: 'SharePoint', logoUrl: '/icons/sharepoint.svg' },
  };
  return configs[connectorId] || { name: 'Unknown Provider', logoUrl: '/icons/default-cloud.svg' };
}

// Helper to format date
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Helper to format relative time
function formatRelativeTime(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function DocumentSidebar({
  source,
  excerpts,
  activeExcerptId,
  onExcerptClick,
}: DocumentSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('excerpts');

  return (
    <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setActiveTab('excerpts')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'excerpts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          )}
        >
          <FileText className="w-4 h-4" />
          <span>Excerpts ({excerpts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('info')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'info'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          )}
        >
          <Info className="w-4 h-4" />
          <span>Info</span>
        </button>

        <button
          onClick={() => setActiveTab('comments')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'comments'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          )}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Comments</span>
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'excerpts' && (
          <div className="p-4 space-y-3">
            {excerpts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No excerpts highlighted</p>
              </div>
            ) : (
              excerpts.map((excerpt, index) => (
                <button
                  key={excerpt.sourceId + index}
                  onClick={() => onExcerptClick?.(excerpt.sourceId + index)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all',
                    activeExcerptId === excerpt.sourceId + index
                      ? 'bg-amber-50 border-amber-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Excerpt {index + 1}
                    </span>
                    {activeExcerptId === excerpt.sourceId + index && (
                      <div className="px-2 py-0.5 bg-amber-200 text-amber-900 text-xs font-medium rounded">
                        Active
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-4">
                    {excerpt.excerpt}
                  </p>
                  {excerpt.note && (
                    <p className="text-xs text-slate-500 mt-2 italic">
                      Note: {excerpt.note}
                    </p>
                  )}
                  <div className="text-xs text-slate-400 mt-2">
                    Added by {excerpt.addedBy} • {formatRelativeTime(excerpt.addedAt)}
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="p-4">
            <div className="space-y-4">
              {/* Document metadata */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Document Info
                </h3>

                {/* Reliability score */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-600">Reliability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full',
                          source.reliabilityScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                        )}
                        style={{ width: `${source.reliabilityScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {source.reliabilityScore}%
                    </span>
                  </div>
                </div>

                {/* Cloud provider info */}
                {source.connectorId && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-600">Source</span>
                      <div className="flex items-center gap-1.5">
                        <img
                          src={getConnectorConfig(source.connectorId).logoUrl}
                          className="w-3.5 h-3.5"
                          alt=""
                        />
                        <span className="text-xs font-medium text-slate-700">
                          {getConnectorConfig(source.connectorId).name}
                        </span>
                      </div>
                    </div>

                    {/* Sync status */}
                    {source.syncStatus && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-slate-600">Sync Status</span>
                        <div
                          className={cn(
                            'flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
                            source.syncStatus === 'synced' && 'bg-emerald-50 text-emerald-700',
                            source.syncStatus === 'syncing' && 'bg-blue-50 text-blue-700',
                            source.syncStatus === 'error' && 'bg-red-50 text-red-700'
                          )}
                        >
                          {source.syncStatus === 'synced' && <CheckCircle2 className="w-3 h-3" />}
                          {source.syncStatus === 'syncing' && (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          )}
                          {source.syncStatus === 'error' && <AlertCircle className="w-3 h-3" />}
                          <span className="capitalize">{source.syncStatus}</span>
                        </div>
                      </div>
                    )}

                    {/* Last sync time */}
                    {source.lastSyncAt && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-slate-600">Last Synced</span>
                        <span className="text-xs text-slate-700">
                          {formatRelativeTime(source.lastSyncAt)}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Publish date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-600">Published</span>
                  <span className="text-xs text-slate-700">
                    {formatDate(source.publishedAt)}
                  </span>
                </div>

                {/* Author */}
                {source.author && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-600">Author</span>
                    <span className="text-xs text-slate-700">{source.author}</span>
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-600">Category</span>
                  <span className="text-xs text-slate-700 capitalize">
                    {source.category.replace('_', ' ')}
                  </span>
                </div>

                {/* File type */}
                {source.fileType && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">File Type</span>
                    <span className="text-xs text-slate-700 uppercase">
                      {source.fileType}
                    </span>
                  </div>
                )}
              </div>

              {/* Excerpt summary */}
              {source.excerpt && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                    Summary
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {source.excerpt}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="p-4">
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Comments coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
