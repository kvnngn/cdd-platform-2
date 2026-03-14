'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SOURCES } from '@/data/mockData';
import { FileText, Search, Check, Plus, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddDocumentsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[], autoGenerate?: boolean) => void;
  currentSourceIds: string[];
  columnCount: number;
}

export function AddDocumentsModal({
  open,
  onClose,
  onConfirm,
  currentSourceIds,
  columnCount,
}: AddDocumentsModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter out already added sources
  const availableSources = useMemo(
    () => SOURCES.filter(s => !currentSourceIds.includes(s.id)),
    [currentSourceIds]
  );

  // Filter by search query
  const filteredSources = useMemo(() => {
    if (!searchQuery.trim()) return availableSources;

    const query = searchQuery.toLowerCase();
    return availableSources.filter(
      s =>
        s.title.toLowerCase().includes(query) ||
        s.fileName?.toLowerCase().includes(query) ||
        s.author?.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );
  }, [availableSources, searchQuery]);

  const toggleSelection = (sourceId: string) => {
    setSelectedIds(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleConfirm = (autoGenerate: boolean = false) => {
    if (selectedIds.length === 0) return;
    onConfirm(selectedIds, autoGenerate);
    setSelectedIds([]);
    setSearchQuery('');
    onClose();
  };

  const handleCancel = () => {
    setSelectedIds([]);
    setSearchQuery('');
    onClose();
  };

  const totalCellsToGenerate = selectedIds.length * columnCount;

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Documents to Knowledge Base</DialogTitle>
          <DialogDescription>
            Select documents to add to your matrix. Cells will be automatically generated for each new document.
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search documents by title, filename, author, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Impact Summary */}
        {selectedIds.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-blue-900">
                  {selectedIds.length} document{selectedIds.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-blue-700 text-xs mt-1">
                  {totalCellsToGenerate} cells will be generated ({selectedIds.length} documents × {columnCount} columns)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto border rounded-lg">
          {filteredSources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-600">
                {availableSources.length === 0
                  ? 'All documents are already added'
                  : 'No documents match your search'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-blue-600 hover:text-blue-700 mt-2"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredSources.map(source => {
                const isSelected = selectedIds.includes(source.id);

                return (
                  <button
                    key={source.id}
                    onClick={() => toggleSelection(source.id)}
                    className={cn(
                      'w-full px-4 py-3 text-left transition-colors hover:bg-slate-50',
                      isSelected && 'bg-blue-50 hover:bg-blue-100'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <div className={cn(
                        'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0',
                        isSelected
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-slate-300 bg-white'
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>

                      {/* Document info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {source.fileName || source.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {source.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={cn(
                                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                                source.category === 'data_room' && 'bg-cyan-100 text-cyan-700',
                                source.category === 'premium_report' && 'bg-purple-100 text-purple-700',
                                source.category === 'api' && 'bg-indigo-100 text-indigo-700',
                                source.category === 'web' && 'bg-blue-100 text-blue-700',
                                source.category === 'interview' && 'bg-green-100 text-green-700',
                                source.category === 'connector' && 'bg-orange-100 text-orange-700'
                              )}>
                                {source.category.replace(/_/g, ' ').toUpperCase()}
                              </span>
                              {source.fileType && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                                  {source.fileType.toUpperCase()}
                                </span>
                              )}
                              {source.publishedAt && (
                                <span className="text-xs text-slate-400">
                                  {new Date(source.publishedAt).getFullYear()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConfirm(false)}
            disabled={selectedIds.length === 0}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add {selectedIds.length > 0 && `${selectedIds.length} `}Document{selectedIds.length !== 1 ? 's' : ''}
          </Button>
          <Button
            onClick={() => handleConfirm(true)}
            disabled={selectedIds.length === 0}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Add and apply columns
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
