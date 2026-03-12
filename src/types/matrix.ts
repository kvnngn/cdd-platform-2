// ═══════════════════════════════════════════════════════════════════════════════
// ANALYSIS MATRIX TYPES
// ═══════════════════════════════════════════════════════════════════════════════

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
