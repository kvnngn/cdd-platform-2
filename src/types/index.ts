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
}

export type SourceCategory = 'data_room' | 'premium_report' | 'api' | 'web' | 'interview';

export interface Source {
  id: string;
  title: string;
  url?: string;
  category: SourceCategory;
  publishedAt: string;
  author?: string;
  excerpt: string;
  reliabilityScore: number; // 0-100
  isDeprecated?: boolean;
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
  confidence: ConfidenceBreakdown;
  sourceIds: string[];
  relations: HypothesisRelation[];
  tags: string[];
  comments: Comment[];
  versions: HypothesisVersion[];
  includedInReport: boolean;
  confidenceHistory: { date: string; score: number; event?: string }[];
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
