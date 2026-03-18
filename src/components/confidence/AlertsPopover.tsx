import * as Popover from '@radix-ui/react-popover';
import { AlertTriangle, TrendingUp, Clock, RefreshCw, Bell, X, CheckCircle2 } from 'lucide-react';
import { cn, getAlertTypeLabel, timeAgo } from '@/lib/utils';
import { Alert, AlertType } from '@/types';
import { useAppStore } from '@/store/appStore';

const ALERT_CONFIG: Record<AlertType, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
  contradiction: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  deprecated: { icon: RefreshCw, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  on_hold: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  reinforced: { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  cascade_rejection: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
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
      alert.type === 'cascade_rejection' && !alert.isRead ? 'ring-red-300' :
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
            onClick={(e) => {
              e.stopPropagation();
              onRead();
            }}
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

interface AlertsPopoverProps {
  projectId: string;
}

export function AlertsPopover({ projectId }: AlertsPopoverProps) {
  const { alerts, markAlertRead } = useAppStore();
  const projectAlerts = alerts.filter(a => a.projectId === projectId);
  const unread = projectAlerts.filter(a => !a.isRead).length;

  const high = projectAlerts.filter(a => a.severity === 'high');
  const medium = projectAlerts.filter(a => a.severity === 'medium');
  const low = projectAlerts.filter(a => a.severity === 'low');

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="relative p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold leading-none">
              {unread}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={8}
          className="w-96 bg-white rounded-xl border border-slate-200 shadow-xl z-50 animate-fade-in"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Consistency Alerts</h3>
            {unread > 0 && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-medium">
                {unread} unread
              </span>
            )}
          </div>

          {/* Alert list */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-3">
            {projectAlerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No alerts — everything is consistent</p>
              </div>
            ) : (
              <>
                {high.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
                      High Priority ({high.length})
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
                      Medium Priority ({medium.length})
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
                      Informative ({low.length})
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

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
