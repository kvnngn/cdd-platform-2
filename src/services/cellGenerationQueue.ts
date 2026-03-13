import { CellGenerationJob, MatrixCell } from '@/types/matrix';
import { nanoid } from 'nanoid';
import { generateMatrixCell } from './matrixSynthesis';

/**
 * Cell generation queue service.
 * Manages background jobs for auto-executing column prompts on documents.
 */
class CellGenerationQueue {
  private jobs: Map<string, CellGenerationJob> = new Map();
  private activeJobId: string | null = null;
  private listeners: Set<(jobs: CellGenerationJob[]) => void> = new Set();

  /**
   * Create a batch job to generate cells for a column across multiple sources.
   */
  createBatchJob(
    columnId: string,
    sourceIds: string[],
    matrixScopeId: string
  ): CellGenerationJob {
    const job: CellGenerationJob = {
      id: nanoid(),
      matrixScopeId,
      columnId,
      sourceIds,
      status: 'queued',
      progress: 0,
      processedCount: 0,
      totalCount: sourceIds.length,
      createdAt: new Date().toISOString(),
    };

    this.jobs.set(job.id, job);
    this.notifyListeners();

    return job;
  }

  /**
   * Execute a batch job with progress tracking.
   * @param jobId - Job to execute
   * @param onProgress - Callback for progress updates (optional)
   * @param getCellData - Function to retrieve cell and column data
   */
  async executeBatchJob(
    jobId: string,
    onProgress?: (progress: number, processedCount: number) => void,
    getCellData?: (columnId: string, sourceId: string) => Promise<{
      cell: MatrixCell;
      columnPrompt: string;
      columnLabel: string;
    } | null>
  ): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error(`Job ${jobId} not found`);

    // Update status to processing
    job.status = 'processing';
    job.startedAt = new Date().toISOString();
    this.activeJobId = jobId;
    this.notifyListeners();

    try {
      // Process each source sequentially (can be parallelized later)
      for (let i = 0; i < job.sourceIds.length; i++) {
        const sourceId = job.sourceIds[i];

        // Check if job was cancelled
        if (this.jobs.get(jobId)?.status === 'queued') {
          throw new Error('Job cancelled');
        }

        // Get cell and column data
        if (!getCellData) {
          throw new Error('getCellData function required');
        }

        const data = await getCellData(job.columnId, sourceId);
        if (!data) {
          console.warn(`Skipping cell generation for ${sourceId} - data not found`);
          continue;
        }

        // Generate cell content
        try {
          await generateMatrixCell(
            data.cell,
            data.columnPrompt,
            data.columnLabel
          );
        } catch (error) {
          console.error(`Failed to generate cell for ${sourceId}:`, error);
          // Continue with next cell instead of failing entire job
        }

        // Update progress
        job.processedCount = i + 1;
        job.progress = Math.round((job.processedCount / job.totalCount) * 100);
        this.notifyListeners();

        if (onProgress) {
          onProgress(job.progress, job.processedCount);
        }
      }

      // Mark as completed
      job.status = 'completed';
      job.completedAt = new Date().toISOString();
      job.progress = 100;
      this.activeJobId = null;
      this.notifyListeners();
    } catch (error) {
      // Mark as failed
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : 'Unknown error';
      job.completedAt = new Date().toISOString();
      this.activeJobId = null;
      this.notifyListeners();

      throw error;
    }
  }

  /**
   * Get all active jobs for a matrix scope.
   */
  getActiveJobs(matrixScopeId: string): CellGenerationJob[] {
    return Array.from(this.jobs.values())
      .filter(
        job =>
          job.matrixScopeId === matrixScopeId &&
          (job.status === 'queued' || job.status === 'processing')
      )
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  /**
   * Get all jobs (active and completed) for a matrix scope.
   */
  getAllJobs(matrixScopeId: string): CellGenerationJob[] {
    return Array.from(this.jobs.values())
      .filter(job => job.matrixScopeId === matrixScopeId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Most recent first
  }

  /**
   * Cancel a job.
   * If the job is currently processing, it will be stopped after the current cell.
   */
  cancelJob(jobId: string): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    if (job.status === 'processing') {
      // Set back to queued to signal cancellation
      job.status = 'queued';
      job.error = 'Cancelled by user';
    } else if (job.status === 'queued') {
      // Remove from queue
      this.jobs.delete(jobId);
    }

    this.notifyListeners();
  }

  /**
   * Get a specific job by ID.
   */
  getJob(jobId: string): CellGenerationJob | undefined {
    return this.jobs.get(jobId);
  }

  /**
   * Clear completed jobs older than the specified age.
   * @param maxAgeMs - Maximum age in milliseconds (default: 1 hour)
   */
  clearOldJobs(maxAgeMs: number = 60 * 60 * 1000): void {
    const now = Date.now();
    const jobsToDelete: string[] = [];

    for (const [id, job] of this.jobs.entries()) {
      if (
        (job.status === 'completed' || job.status === 'failed') &&
        job.completedAt
      ) {
        const age = now - new Date(job.completedAt).getTime();
        if (age > maxAgeMs) {
          jobsToDelete.push(id);
        }
      }
    }

    jobsToDelete.forEach(id => this.jobs.delete(id));
    if (jobsToDelete.length > 0) {
      this.notifyListeners();
    }
  }

  /**
   * Subscribe to job updates.
   */
  subscribe(listener: (jobs: CellGenerationJob[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of job changes.
   */
  private notifyListeners(): void {
    const allJobs = Array.from(this.jobs.values());
    this.listeners.forEach(listener => listener(allJobs));
  }

  /**
   * Get currently executing job ID.
   */
  getActiveJobId(): string | null {
    return this.activeJobId;
  }

  /**
   * Check if any jobs are currently processing.
   */
  hasActiveJobs(): boolean {
    return this.activeJobId !== null;
  }
}

// Singleton instance
export const cellGenerationQueue = new CellGenerationQueue();
