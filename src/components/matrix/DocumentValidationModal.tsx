'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { SOURCES } from '@/data/mockData';
import { Plus, X, AlertCircle } from 'lucide-react';

interface DocumentValidationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[]) => void;
  currentSourceIds: string[];
  newSourceIds: string[];
  columnCount: number;
}

export function DocumentValidationModal({
  open,
  onClose,
  onConfirm,
  currentSourceIds,
  newSourceIds,
  columnCount,
}: DocumentValidationModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(newSourceIds);

  const addedIds = newSourceIds.filter(id => !currentSourceIds.includes(id));
  const removedIds = currentSourceIds.filter(id => !newSourceIds.includes(id));
  const unchangedIds = currentSourceIds.filter(id => newSourceIds.includes(id));

  const toggleSelection = (sourceId: string) => {
    setSelectedIds(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedIds);
    onClose();
  };

  const totalCellsToGenerate = addedIds.length * columnCount;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Review Document Selection</DialogTitle>
          <DialogDescription>
            Review the changes before validating. New documents will trigger automatic cell generation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {/* Impact Summary */}
          <Card className="p-4 bg-primary/5 border-primary">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Impact Summary</p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">{addedIds.length}</span> new documents
                    {addedIds.length > 0 && (
                      <> × <span className="font-medium text-foreground">{columnCount}</span> columns = </>
                    )}
                    <span className="font-medium text-primary">{totalCellsToGenerate} cells</span> to generate
                  </p>
                  {removedIds.length > 0 && (
                    <p>
                      <span className="font-medium text-destructive">{removedIds.length}</span> documents removed
                    </p>
                  )}
                  {unchangedIds.length > 0 && (
                    <p>
                      <span className="font-medium text-foreground">{unchangedIds.length}</span> documents unchanged
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Added Documents */}
          {addedIds.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-4 h-4 text-green-500" />
                <h3 className="font-medium text-sm">Added ({addedIds.length})</h3>
              </div>
              <div className="space-y-2">
                {addedIds.map(sourceId => {
                  const source = SOURCES.find(s => s.id === sourceId);
                  if (!source) return null;

                  return (
                    <Card
                      key={sourceId}
                      className="p-3 border-green-500/20 bg-green-500/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{source.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {source.excerpt}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          New
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Removed Documents */}
          {removedIds.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <X className="w-4 h-4 text-destructive" />
                <h3 className="font-medium text-sm">Removed ({removedIds.length})</h3>
              </div>
              <div className="space-y-2">
                {removedIds.map(sourceId => {
                  const source = SOURCES.find(s => s.id === sourceId);
                  if (!source) return null;

                  return (
                    <Card
                      key={sourceId}
                      className="p-3 border-destructive/20 bg-destructive/5 opacity-60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-through">{source.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {source.excerpt}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-destructive border-destructive">
                          Removed
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Unchanged Documents */}
          {unchangedIds.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Unchanged ({unchangedIds.length})
                </h3>
              </div>
              <div className="space-y-1">
                {unchangedIds.slice(0, 3).map(sourceId => {
                  const source = SOURCES.find(s => s.id === sourceId);
                  if (!source) return null;

                  return (
                    <p key={sourceId} className="text-sm text-muted-foreground truncate">
                      • {source.title}
                    </p>
                  );
                })}
                {unchangedIds.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    ...and {unchangedIds.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Confirm & Start Generation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
