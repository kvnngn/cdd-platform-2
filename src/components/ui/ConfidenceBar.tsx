import { cn } from '@/lib/utils';

interface ConfidenceBarProps {
  label: string;
  score: number;
  className?: string;
}

export function ConfidenceBar({ label, score, className }: ConfidenceBarProps) {
  const getColor = () => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 65) return 'bg-amber-400';
    return 'bg-red-400';
  };

  const getLabel = () => {
    if (score >= 80) return 'High';
    if (score >= 65) return 'Medium';
    return 'Low';
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-xs text-slate-500 w-40 shrink-0">{label}</span>
      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', getColor())}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn('text-xs font-medium w-14 text-right', score >= 80 ? 'text-emerald-600' : score >= 65 ? 'text-amber-500' : 'text-red-500')}>
        {getLabel()}
      </span>
    </div>
  );
}

interface ConfidenceBreakdownProps {
  breakdown: {
    sourceQuality: number;
    crossVerification: number;
    dataFreshness: number;
    internalConsistency: number;
    overall: number;
  };
}

export function ConfidenceBreakdown({ breakdown }: ConfidenceBreakdownProps) {
  const dimensions = [
    { label: 'Source quality', score: breakdown.sourceQuality },
    { label: 'Cross-verification', score: breakdown.crossVerification },
    { label: 'Data freshness', score: breakdown.dataFreshness },
    { label: 'Internal consistency', score: breakdown.internalConsistency },
  ];

  return (
    <div className="space-y-2.5">
      {dimensions.map((d) => (
        <ConfidenceBar key={d.label} label={d.label} score={d.score} />
      ))}
    </div>
  );
}
