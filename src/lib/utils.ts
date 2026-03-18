import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HypothesisStatus, NodeStatus, SourceCategory, ProjectStatus, AlertType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function timeAgo(dateStr: string): string {
  const now = new Date('2026-03-04T12:00:00Z');
  const d = new Date(dateStr);
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function getStatusLabel(status: HypothesisStatus): string {
  const labels: Record<HypothesisStatus, string> = {
    draft: 'Draft',
    validated: 'Validated',
    rejected: 'Rejected',
    on_hold: 'On Hold',
  };
  return labels[status];
}

export function getNodeStatusLabel(status: NodeStatus): string {
  const labels: Record<NodeStatus, string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    complete: 'Complete',
    blocked: 'Blocked',
  };
  return labels[status];
}

export function getProjectStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    draft: 'Draft',
    in_progress: 'In Progress',
    in_review: 'In Review',
    delivered: 'Delivered',
    archived: 'Archived',
  };
  return labels[status];
}

export function getSourceCategoryLabel(cat: SourceCategory): string {
  const labels: Record<SourceCategory, string> = {
    data_room: 'Data Room',
    premium_report: 'Premium Report',
    api: 'Financial API',
    web: 'Web / Press',
    interview: 'Interview',
    connector: 'Connector',
    expert_network: 'Expert Network',
    regulatory: 'Regulatory',
  };
  return labels[cat];
}

export function getAlertTypeLabel(type: AlertType): string {
  const labels: Record<AlertType, string> = {
    contradiction: 'Contradiction',
    deprecated: 'Deprecated Source',
    on_hold: 'Pending',
    reinforced: 'Reinforced',
  };
  return labels[type];
}

export function getConfidenceColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 65) return 'text-amber-500';
  return 'text-red-500';
}

export function getConfidenceBg(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 65) return 'bg-amber-400';
  return 'bg-red-400';
}

export function getConfidenceBadgeClass(score: number): string {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score >= 65) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}
