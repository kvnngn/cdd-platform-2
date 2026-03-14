import { HypothesisSource } from '@/types';
import { FileText } from 'lucide-react';
import { getUserById } from '@/data/users';
import { formatDate, cn } from '@/lib/utils';
import { useDocumentViewerStore } from '@/store/documentViewerStore';

interface HighlightsSidebarProps {
  excerpts: HypothesisSource[];
  onExcerptClick?: (index: number) => void;
}

export function HighlightsSidebar({ excerpts, onExcerptClick }: HighlightsSidebarProps) {
  const { activeExcerptIndex } = useDocumentViewerStore();

  if (excerpts.length === 0) {
    return (
      <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col">
        <div className="px-4 py-3 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-semibold text-slate-900">Highlights</h3>
          <p className="text-xs text-slate-500 mt-0.5">{excerpts.length} excerpts</p>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No highlights in this document</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <h3 className="text-sm font-semibold text-slate-900">Highlights</h3>
        <p className="text-xs text-slate-500 mt-0.5">{excerpts.length} excerpt{excerpts.length > 1 ? 's' : ''}</p>
      </div>

      {/* Excerpts list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-3">
          {excerpts.map((excerpt, index) => {
            const user = getUserById(excerpt.addedBy);

            return (
              <button
                key={index}
                onClick={() => onExcerptClick?.(index)}
                className={cn(
                  'w-full text-left rounded-lg border transition-all p-3 group',
                  activeExcerptIndex === index
                    ? 'bg-amber-50 border-amber-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-sm'
                )}
              >
                {/* Excerpt text */}
                <div className="mb-2">
                  <div className="text-xs text-slate-700 leading-relaxed">
                    "{excerpt.excerpt}"
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{user?.name || 'Unknown'}</span>
                  <span>·</span>
                  <span>{formatDate(excerpt.addedAt)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
