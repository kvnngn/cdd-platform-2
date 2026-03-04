import { cn } from '../../lib/utils';
import { HypothesisStatus } from '../../types';

interface BadgeProps {
  status: HypothesisStatus;
  className?: string;
}

export function HypothesisBadge({ status, className }: BadgeProps) {
  const styles: Record<HypothesisStatus, string> = {
    validated: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-slate-100 text-slate-600 border-slate-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    on_hold: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const labels: Record<HypothesisStatus, string> = {
    validated: '✓ Validée',
    draft: '○ Draft',
    rejected: '✗ Rejetée',
    on_hold: '◐ On Hold',
  };

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border', styles[status], className)}>
      {labels[status]}
    </span>
  );
}

interface ConfidenceBadgeProps {
  score: number;
  className?: string;
}

export function ConfidenceBadge({ score, className }: ConfidenceBadgeProps) {
  const getStyle = () => {
    if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 65) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border', getStyle(), className)}>
      {score}%
    </span>
  );
}
