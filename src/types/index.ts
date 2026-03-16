export type UserRole = 'consultant' | 'manager';

export interface User {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  email: string;
  avatar?: string;
  color: string;
}

export type ProjectStatus = 'draft' | 'in_progress' | 'in_review' | 'delivered' | 'archived';
export type ProjectTemplate = 'generic' | 'saas_b2b' | 'industrial' | 'retail' | 'custom';

export interface Project {
  id: string;
  name: string;
  client: string;
  acquirer: string;
  status: ProjectStatus;
  template: ProjectTemplate;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  members: string[];
  managerId: string;
  description: string;
  sector: string;
  dealSize: string;
}

export type NodeStatus = 'not_started' | 'in_progress' | 'complete' | 'blocked';
export type NodeDeadlineStatus = 'ok' | 'warning' | 'overdue';

export interface NodeComment {
  id: string;
  nodeId: string;
  authorId: string;
  content: string;
  createdAt: string;
  resolved: boolean;
}

export interface NodeVersion {
  nodeId: string;
  version: number;
  title: string;
  changedBy: string;
  changedAt: string;
  changeNote: string;
}

export interface WorkstreamNode {
  id: string;
  projectId: string;
  parentId: string | null;
  title: string;
  description: string;
  level: number;
  order: number;
  status: NodeStatus;
  assigneeId: string | null;
  deadline: string;
  deadlineStatus: NodeDeadlineStatus;
  coverageScore: number; // 0-100
  sourceCount: number;
  hypothesisCount: number;
  validatedCount: number;
  children?: WorkstreamNode[];
  updatedAt?: string; // ISO timestamp of last modification
  updatedBy?: string; // userId of last modifier
}

// ─── SCOPING AGENT ────────────────────────────────────────────────────────────

export type ScopingQuestionType = 'checkbox' | 'radio' | 'text';

export interface ScopingQuestion {
  id: string;
  text: string;
  type: ScopingQuestionType;
  options?: string[];
}

export interface ScopingAnswers {
  [questionId: string]: string | string[];
}

export type SourceCategory = 'data_room' | 'premium_report' | 'api' | 'web' | 'interview' | 'connector';

export type ConnectorProvider = 'google_drive' | 'dropbox' | 'sharepoint' | 'box' | 'capitaliq' | 'pitchbook' | 'bloomberg' | 'intralinks' | 'datasite';

export interface ConnectorConfig {
  id: string;
  type: ConnectorProvider;
  name: string;
  status?: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config?: Record<string, any>;
  category?: 'cloud' | 'financial_api' | 'data_room';
  icon?: string;
  logoUrl?: string;
  scopes?: string[];
}

export type SyncStatus = 'synced' | 'syncing' | 'error' | 'pending';

export interface Source {
  id: string;
  title: string;
  url?: string;
  category: SourceCategory;
  fileType?: 'xlsx' | 'csv' | 'pdf'; // format fichier pour data_room / API
  fileName?: string; // nom de fichier réaliste (ex: DataSense_Financial_Model_FY2025.xlsx)
  publishedAt: string;
  author?: string;
  excerpt: string;
  content?: string; // Full content for NotebookLM-style viewing
  reliabilityScore: number; // 0-100
  isDeprecated?: boolean;
  connectorId?: string; // ID du connector si source vient d'une app externe
  externalId?: string; // ID externe (ex: fileId Drive, ID doc CapitalIQ)
  syncStatus?: SyncStatus;
  lastSyncAt?: string;
}

export interface ResearchSynthesis {
  nodeId: string;
  summary: string;
  keyPoints: string[];
  sources: Source[];
  lastUpdated: string;
  coverageScore: number;
}

export type HypothesisStatus = 'draft' | 'validated' | 'rejected' | 'on_hold';

// Junction type: link a hypothesis to a specific quote within a source
export interface HypothesisSource {
  sourceId: string;   // references Source.id
  excerpt: string;    // the exact quote that proves the hypothesis
  addedBy: string;    // userId
  addedAt: string;    // ISO timestamp
  note?: string;      // optional analyst note contextualizing the excerpt
  matrixColumnId?: string;  // If hypothesis was created from a matrix column
  matrixCellId?: string;    // If hypothesis was created from a matrix cell
}

export interface ConfidenceBreakdown {
  sourceQuality: number; // 0-100
  crossVerification: number;
  dataFreshness: number;
  internalConsistency: number;
  overall: number;
}

export interface HypothesisRelation {
  hypothesisId: string;
  type: 'supports' | 'contradicts' | 'nuances';
}

export interface HypothesisVersion {
  version: number;
  content: string;
  changedBy: string;
  changedAt: string;
  changeNote: string;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  resolved: boolean;
}

export interface HypothesisMetadata {
  source: 'manual' | 'ai_synthesis' | 'matrix';      // Origin of the hypothesis
  modified?: boolean;                                  // If from AI, was it edited?
  original_synthesis_content?: string;                // Original AI text (if modified)
  created_from_synthesis_id?: string;                 // Link to original synthesis message
  author?: string;                                    // For manual hypotheses
}

export interface Hypothesis {
  id: string;
  projectId: string;
  nodeId: string;
  title: string;
  body: string;
  status: HypothesisStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  validatedBy?: string;
  validatedAt?: string;
  // Rejection fields (required when status === 'rejected')
  rejectionReason?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  confidence: ConfidenceBreakdown;
  sourceIds: string[];                // legacy — kept for backward compat
  sources: HypothesisSource[];        // rich source links with excerpts
  relations: HypothesisRelation[];
  tags: string[];
  comments: Comment[];
  versions: HypothesisVersion[];
  includedInReport: boolean;
  confidenceHistory: { date: string; score: number; event?: string }[];
  metadata: HypothesisMetadata;       // Origin and modification tracking
}

export type AlertSeverity = 'high' | 'medium' | 'low';
export type AlertType = 'contradiction' | 'deprecated' | 'on_hold' | 'reinforced';

export interface Alert {
  id: string;
  projectId: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  nodeId?: string;
  hypothesisId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface ActivityLog {
  id: string;
  projectId: string;
  action: string;
  actor: string;
  actorId: string;
  targetType: 'hypothesis' | 'node' | 'project' | 'source' | 'report';
  targetId: string;
  targetName: string;
  timestamp: string;
  detail?: string;
}

// ─── ANALYSIS MATRIX ──────────────────────────────────────────────────────────
// Matrix types are now defined in ./matrix.ts

export type {
  MatrixScope,
  MatrixColumn,
  MatrixColumnType,
  MatrixCell,
  MatrixCellStatus,
} from './matrix';
