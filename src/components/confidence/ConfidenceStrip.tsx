import { BarChart2, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { AlertsPopover } from './AlertsPopover';

interface ConfidenceStripProps {
  projectId: string;
}

export function ConfidenceStrip({ projectId }: ConfidenceStripProps) {
  const { hypotheses } = useAppStore();
  const projectHypotheses = hypotheses.filter(h => h.projectId === projectId);

  const avgConfidence = Math.round(
    projectHypotheses.reduce((sum, h) => sum + h.confidence.overall, 0) / (projectHypotheses.length || 1)
  );

  const byStatus = {
    validated: projectHypotheses.filter(h => h.status === 'validated').length,
    on_hold: projectHypotheses.filter(h => h.status === 'on_hold').length,
  };

  const confidenceColor = avgConfidence >= 80
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : avgConfidence >= 65
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-red-50 text-red-700 border-red-200';

  return (
    <div className="flex items-center gap-1.5">
      {/* Confidence pill */}
      <div className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors',
        confidenceColor
      )}>
        <BarChart2 className="w-3 h-3" />
        {avgConfidence}%
      </div>

      {/* Validated pill */}
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3" />
        {byStatus.validated}
      </div>

      {/* On-hold pill (hidden if 0) */}
      {byStatus.on_hold > 0 && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3 h-3" />
          {byStatus.on_hold}
        </div>
      )}

      {/* Separator */}
      <div className="border-l border-slate-200 h-5 mx-0.5" />

      {/* Alerts popover */}
      <AlertsPopover projectId={projectId} />
    </div>
  );
}
