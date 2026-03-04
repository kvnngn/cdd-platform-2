import { AlertTriangle, TrendingUp, Clock, RefreshCw, Bell, X, CheckCircle2 } from 'lucide-react';
import { cn, formatDateTime, getAlertTypeLabel, timeAgo } from '../../lib/utils';
import { Alert, AlertType } from '../../types';
import { useAppStore } from '../../store/appStore';
import { HYPOTHESES } from '../../data/mockData';

const ALERT_CONFIG: Record<AlertType, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
  contradiction: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  deprecated: { icon: RefreshCw, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  on_hold: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  reinforced: { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

function AlertCard({ alert, onRead }: { alert: Alert; onRead: () => void }) {
  const cfg = ALERT_CONFIG[alert.type];
  const Icon = cfg.icon;

  return (
    <div className={cn(
      'border rounded-xl p-3.5 transition-all',
      cfg.bg, cfg.border,
      !alert.isRead && 'ring-1',
      alert.type === 'contradiction' && !alert.isRead ? 'ring-red-300' :
      alert.type === 'deprecated' && !alert.isRead ? 'ring-red-300' :
      alert.type === 'on_hold' && !alert.isRead ? 'ring-amber-300' : ''
    )}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Icon className={cn('w-4 h-4 shrink-0', cfg.color)} />
          <span className={cn('text-xs font-semibold', cfg.color)}>
            {getAlertTypeLabel(alert.type)}
          </span>
          {!alert.isRead && (
            <span className="w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>
        {!alert.isRead && (
          <button
            onClick={onRead}
            className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="text-xs font-medium text-slate-800 mb-1">{alert.title}</div>
      <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>
      <div className="mt-2 text-xs text-slate-400">{timeAgo(alert.createdAt)}</div>
    </div>
  );
}

interface ConfidenceMonitorProps {
  projectId: string;
}

export function ConfidenceMonitor({ projectId }: ConfidenceMonitorProps) {
  const { alerts, markAlertRead, hypotheses } = useAppStore();
  const projectAlerts = alerts.filter(a => a.projectId === projectId);
  const unread = projectAlerts.filter(a => !a.isRead).length;

  const projectHypotheses = hypotheses.filter(h => h.projectId === projectId);

  // Stats
  const avgConfidence = Math.round(
    projectHypotheses.reduce((sum, h) => sum + h.confidence.overall, 0) / (projectHypotheses.length || 1)
  );
  const byStatus = {
    validated: projectHypotheses.filter(h => h.status === 'validated').length,
    draft: projectHypotheses.filter(h => h.status === 'draft').length,
    on_hold: projectHypotheses.filter(h => h.status === 'on_hold').length,
  };

  const high = projectAlerts.filter(a => a.severity === 'high');
  const medium = projectAlerts.filter(a => a.severity === 'medium');
  const low = projectAlerts.filter(a => a.severity === 'low');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">📊 Confidence Monitor</div>
            <h3 className="text-sm font-semibold text-slate-800">Synthèse de cohérence</h3>
          </div>
          {unread > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-full">
              <Bell className="w-3 h-3" />
              {unread} alerte{unread > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-50 rounded-lg px-3 py-2 text-center">
            <div className={cn('text-xl font-bold', avgConfidence >= 80 ? 'text-emerald-600' : avgConfidence >= 65 ? 'text-amber-500' : 'text-red-500')}>
              {avgConfidence}%
            </div>
            <div className="text-xs text-slate-400">Confiance moy.</div>
          </div>
          <div className="bg-emerald-50 rounded-lg px-3 py-2 text-center">
            <div className="text-xl font-bold text-emerald-600">{byStatus.validated}</div>
            <div className="text-xs text-slate-400">Validées</div>
          </div>
          <div className="bg-amber-50 rounded-lg px-3 py-2 text-center">
            <div className="text-xl font-bold text-amber-500">{byStatus.on_hold}</div>
            <div className="text-xs text-slate-400">On Hold</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {projectAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Aucune alerte — tout est cohérent</p>
          </div>
        ) : (
          <>
            {high.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
                  🔴 Priorité haute ({high.length})
                </div>
                <div className="space-y-2">
                  {high.map(a => (
                    <AlertCard key={a.id} alert={a} onRead={() => markAlertRead(a.id)} />
                  ))}
                </div>
              </div>
            )}

            {medium.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-amber-500 uppercase tracking-wide mb-2">
                  🟡 Priorité moyenne ({medium.length})
                </div>
                <div className="space-y-2">
                  {medium.map(a => (
                    <AlertCard key={a.id} alert={a} onRead={() => markAlertRead(a.id)} />
                  ))}
                </div>
              </div>
            )}

            {low.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wide mb-2">
                  🔵 Informatif ({low.length})
                </div>
                <div className="space-y-2">
                  {low.map(a => (
                    <AlertCard key={a.id} alert={a} onRead={() => markAlertRead(a.id)} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
