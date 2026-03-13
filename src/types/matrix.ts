// ═══════════════════════════════════════════════════════════════════════════════
// ANALYSIS MATRIX TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Chat message in the document discovery conversation.
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  metadata?: {
    suggestedDocCount?: number;
    searchSteps?: string[];
    isCollapsed?: boolean;
  };
}

/**
 * Matrix Scope defines the research scope for a matrix analysis.
 * It includes a semantic search prompt that discovers relevant documents.
 */
export interface MatrixScope {
  id: string;
  nodeId: string;                    // The node this matrix belongs to
  scopePrompt: string;               // Semantic search prompt (e.g., "unit economics of European competitors")
  discoveredSourceIds: string[];     // Sources found by semantic search
  createdBy: string;
  createdAt: string;
  updatedAt?: string;

  // Hebbia-style chat discovery
  discoveryConversation?: ChatMessage[];
  suggestedSourceIds?: string[];     // Documents suggested by agent (before user validation)
  discoveryStatus: 'idle' | 'searching' | 'reviewing' | 'validated';
  lastValidatedAt?: string;
}

/**
 * Column template for common analysis types.
 * Used in the column template picker UI.
 */
export interface MatrixColumnTemplate {
  id: string;
  label: string;
  prompt: string;
  type: MatrixColumnType;
  category: 'financial' | 'market' | 'product' | 'competitive' | 'custom';
  description: string;
  examples?: string[];
}

/**
 * Column in an analysis matrix.
 * Each column represents a question/prompt applied to all sources in the scope.
 */
export type MatrixColumnType = 'text' | 'number' | 'boolean' | 'list';

export interface MatrixColumn {
  id: string;
  matrixScopeId: string;            // Links to the matrix scope (replaces nodeId)
  label: string;                     // Column header (e.g., "ARPU")
  prompt: string;                    // Extraction prompt for this column
  type: MatrixColumnType;
  order: number;                     // Display order
  isSystemGenerated?: boolean;       // true for auto-generated "Synthèse" column
  dependsOn?: string[];              // IDs of columns this depends on
  aiSuggested?: boolean;             // Was this column suggested by AI?
  isAutoExecute?: boolean;           // Auto-execute on new documents (default: true)
  createdBy: string;
  createdAt: string;
}

/**
 * Individual cell in the matrix grid.
 * Represents the intersection of a source (row) and a column.
 */
export type MatrixCellStatus = 'idle' | 'generating' | 'done' | 'error';

export interface MatrixCell {
  id: string;
  columnId: string;
  sourceId: string;
  matrixScopeId: string;            // Links to matrix scope (replaces nodeId)
  value: string | null;              // Generated content
  status: MatrixCellStatus;
  generatedAt?: string;
  hypothesisId?: string;             // If cell was promoted to a hypothesis
  isSelected?: boolean;              // For multi-cell hypothesis generation
}

/**
 * Extended HypothesisSource for matrix-generated hypotheses.
 * Used when creating hypotheses from matrix cells (single or multiple).
 */
export interface MatrixHypothesisSource {
  sourceId: string;
  excerpt: string;                   // Cell value or synthesis
  matrixColumnId?: string;           // Which column this came from
  matrixCellId?: string;             // Which cell this came from
  addedBy: string;
  addedAt: string;
  note?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CELL GENERATION JOB QUEUE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Background job for generating matrix cells.
 * Supports batch generation with progress tracking and cancellation.
 */
export interface CellGenerationJob {
  id: string;
  matrixScopeId: string;
  columnId: string;
  sourceIds: string[];               // Documents to process
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;                  // 0-100
  processedCount: number;            // Number of cells completed
  totalCount: number;                // Total cells to generate
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MULTI-STRATEGY SYNTHESIS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Synthesis strategy for multi-cell hypothesis generation.
 * Strategy selection depends on cell selection geometry.
 */
export type SynthesisStrategy =
  | 'reliable_source'      // Same column, different docs → choose most reliable source
  | 'intelligent_average'  // Same column, different docs → weighted average/consensus
  | 'row_synthesis'        // Same doc, different prompts → synthesize insights
  | 'global_synthesis';    // Mixed selection → intelligent global synthesis

/**
 * Geometry of cell selection.
 * Determines which synthesis strategy to use.
 */
export interface SelectionGeometry {
  type: 'same_column' | 'same_row' | 'mixed';
  columnIds: string[];
  sourceIds: string[];
  cellCount: number;
}

/**
 * Context for synthesis operation.
 * Includes selected cells and recommended strategy.
 */
export interface SynthesisContext {
  strategy: SynthesisStrategy;
  selectedCells: MatrixCell[];
  selectionGeometry: SelectionGeometry;
  columnLabels: Map<string, string>;  // columnId → label
  sourceNames: Map<string, string>;   // sourceId → document name
}
