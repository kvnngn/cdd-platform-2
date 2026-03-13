'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { CellGenerationJob } from '@/types/matrix';
import { cellGenerationQueue } from '@/services/cellGenerationQueue';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerationProgressOverlayProps {
  matrixScopeId: string;
  columnLabels?: Map<string, string>;
}

export function GenerationProgressOverlay({
  matrixScopeId,
  columnLabels = new Map(),
}: GenerationProgressOverlayProps) {
  const [jobs, setJobs] = useState<CellGenerationJob[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Subscribe to job updates
    const unsubscribe = cellGenerationQueue.subscribe(allJobs => {
      const scopeJobs = allJobs.filter(j => j.matrixScopeId === matrixScopeId);
      setJobs(scopeJobs);

      // Show overlay if there are active jobs
      const hasActiveJobs = scopeJobs.some(
        j => j.status === 'queued' || j.status === 'processing'
      );
      setIsVisible(hasActiveJobs || scopeJobs.some(j => j.status === 'completed' && !j.completedAt));
    });

    return unsubscribe;
  }, [matrixScopeId]);

  const activeJobs = jobs.filter(j => j.status === 'queued' || j.status === 'processing');
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const failedJobs = jobs.filter(j => j.status === 'failed');

  const totalCells = jobs.reduce((sum, j) => sum + j.totalCount, 0);
  const processedCells = jobs.reduce((sum, j) => sum + j.processedCount, 0);
  const overallProgress = totalCells > 0 ? (processedCells / totalCells) * 100 : 0;

  const handleCancel = (jobId: string) => {
    cellGenerationQueue.cancelJob(jobId);
  };

  const handleDismiss = () => {
    // Clear old completed jobs and hide overlay
    cellGenerationQueue.clearOldJobs(0);
    setIsVisible(false);
  };

  if (!isVisible || jobs.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="shadow-lg border-2">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            {activeJobs.length > 0 ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : completedJobs.length > 0 ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-destructive" />
            )}
            <span className="font-medium text-sm">
              {activeJobs.length > 0
                ? `Generating ${processedCells}/${totalCells} cells`
                : completedJobs.length > 0
                ? 'Generation Complete'
                : 'Generation Failed'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </Button>
            {activeJobs.length === 0 && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={handleDismiss}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {!isCollapsed && (
          <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
            {/* Overall Progress */}
            {activeJobs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Overall Progress</span>
                  <span className="text-xs font-medium">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
            )}

            {/* Active Jobs */}
            {activeJobs.map(job => (
              <Card key={job.id} className="p-3 bg-muted/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {columnLabels.get(job.columnId) || 'Column'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {job.processedCount} of {job.totalCount} cells
                      {job.status === 'processing' && ' • Processing...'}
                      {job.status === 'queued' && ' • Queued'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleCancel(job.id)}
                  >
                    Cancel
                  </Button>
                </div>
                <Progress value={job.progress} className="h-1.5" />
              </Card>
            ))}

            {/* Completed Jobs */}
            {completedJobs.length > 0 && (
              <div className="space-y-2">
                {completedJobs.map(job => (
                  <div
                    key={job.id}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="truncate">
                      {columnLabels.get(job.columnId) || 'Column'} ({job.totalCount} cells)
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Failed Jobs */}
            {failedJobs.length > 0 && (
              <div className="space-y-2">
                {failedJobs.map(job => (
                  <Card key={job.id} className="p-2 bg-destructive/5 border-destructive/20">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {columnLabels.get(job.columnId) || 'Column'}
                        </p>
                        {job.error && (
                          <p className="text-xs text-destructive mt-1">{job.error}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Summary */}
            <div className="flex items-center gap-2 pt-2 border-t">
              {completedJobs.length > 0 && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {completedJobs.length} completed
                </Badge>
              )}
              {activeJobs.length > 0 && (
                <Badge variant="outline" className="text-primary border-primary">
                  {activeJobs.length} active
                </Badge>
              )}
              {failedJobs.length > 0 && (
                <Badge variant="outline" className="text-destructive border-destructive">
                  {failedJobs.length} failed
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
