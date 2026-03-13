import { useState } from 'react';
import {
  Download, FileText, Users, BarChart2, Bell, CheckCircle2,
  Clock, AlertTriangle, TrendingUp, Activity, ChevronRight, Star, ClipboardCheck
} from 'lucide-react';
import { cn, formatDate, formatDateTime, timeAgo } from '../../lib/utils';
import { Project } from '../../types';
import { useAppStore } from '../../store/appStore';
import { getActivityByProject, WORKSTREAM_NODES } from '../../data/mockData';
import { ReviewQueue } from './ReviewQueue';
import { USERS, getUserById } from '../../data/users';
import { Avatar } from '../ui/Avatar';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';
import { ConfidenceBreakdown } from '../ui/ConfidenceBar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface ManagerViewProps {
  projectId: string;
  project: Project;
}

export function ManagerView({ projectId, project }: ManagerViewProps) {
  const { hypotheses, alerts, currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'report' | 'review'>('overview');
  const [reportGenerated, setReportGenerated] = useState(false);

  const projectHypotheses = hypotheses.filter(h => h.projectId === projectId);
  const projectAlerts = alerts.filter(a => a.projectId === projectId);
  const activity = getActivityByProject(projectId);
  const nodes = WORKSTREAM_NODES.filter(n => n.projectId === projectId);

  const memberUsers = project.members.map(id => USERS.find(u => u.id === id)).filter(Boolean);

  const stats = {
    totalH: projectHypotheses.length,
    validated: projectHypotheses.filter(h => h.status === 'validated').length,
    draft: projectHypotheses.filter(h => h.status === 'draft').length,
    onHold: projectHypotheses.filter(h => h.status === 'on_hold').length,
    avgConf: Math.round(projectHypotheses.reduce((s, h) => s + h.confidence.overall, 0) / (projectHypotheses.length || 1)),
    unreadAlerts: projectAlerts.filter(a => !a.isRead).length,
    highAlerts: projectAlerts.filter(a => a.severity === 'high').length,
  };

  // Activity by member
  const activityByMember = project.members.map(id => {
    const user = getUserById(id);
    const actions = activity.filter(a => a.actorId === id).length;
    const hCount = projectHypotheses.filter(h => h.createdBy === id).length;
    return { user, actions, hCount };
  }).filter(m => m.user);

  // Confidence by node
  const nodeConfData = nodes
    .filter(n => n.level === 1)
    .map(n => {
      const nHypotheses = projectHypotheses.filter(h => h.nodeId === n.id ||
        nodes.filter(cn => cn.parentId === n.id).some(cn => cn.id === h.nodeId));
      const avg = nHypotheses.length > 0
        ? Math.round(nHypotheses.reduce((s, h) => s + h.confidence.overall, 0) / nHypotheses.length)
        : 0;
      return {
        name: n.title.split(' ')[0],
        fullName: n.title,
        score: avg,
        count: nHypotheses.length,
      };
    })
    .filter(n => n.count > 0);

  const includedH = projectHypotheses.filter(h => h.includedInReport);

  const handleGenerateReport = () => {
    setReportGenerated(true);
  };

  const draftCount = projectHypotheses.filter(h => h.status === 'draft').length;
  const isManager = currentUser?.role === 'manager';

  const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart2, badge: null },
    { id: 'team', label: 'Team', icon: Users, badge: null },
    { id: 'report', label: 'Report', icon: FileText, badge: null },
    { id: 'review', label: 'Review', icon: ClipboardCheck, badge: draftCount > 0 ? draftCount : null },
  ] as const;

  return (
    <div className="h-full flex flex-col">
      {/* Sub tabs */}
      <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-1">
        {TABS.map(({ id, label, icon: Icon, badge }) => {
          if (id === 'review' && !isManager) return null;
          return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors',
              activeTab === id
                ? 'text-blue-600 border-blue-500'
                : 'text-slate-500 border-transparent hover:text-slate-700'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
            {badge !== null && (
              <span className="ml-0.5 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold leading-none">
                {badge}
              </span>
            )}
          </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto flex flex-col">
        {activeTab === 'review' && isManager && (
          <div className="flex-1 flex flex-col h-full">
            <ReviewQueue projectId={projectId} />
          </div>
        )}
        {activeTab === 'overview' && (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-6 gap-4">
              {[
                { label: 'Hypotheses', value: stats.totalH, sub: 'total', color: 'text-slate-700' },
                { label: 'Validated', value: stats.validated, sub: `${Math.round(stats.validated / (stats.totalH || 1) * 100)}%`, color: 'text-emerald-600' },
                { label: 'Draft', value: stats.draft, sub: 'to validate', color: 'text-slate-500' },
                { label: 'On Hold', value: stats.onHold, sub: 'pending', color: 'text-amber-500' },
                { label: 'Confidence', value: `${stats.avgConf}%`, sub: 'average', color: stats.avgConf >= 80 ? 'text-emerald-600' : 'text-amber-500' },
                { label: 'Alerts', value: stats.highAlerts, sub: 'high priority', color: stats.highAlerts > 0 ? 'text-red-500' : 'text-emerald-600' },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="bg-white rounded-xl border border-slate-200 px-4 py-4">
                  <div className={cn('text-2xl font-bold mb-1', color)}>{value}</div>
                  <div className="text-xs text-slate-700 font-medium">{label}</div>
                  <div className="text-xs text-slate-400">{sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Confidence chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="text-sm font-semibold text-slate-800 mb-4">Confidence by analysis axis</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={nodeConfData} margin={{ left: -20, right: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                      formatter={(v) => v != null ? [`${v}%`] : ['']}
                      labelFormatter={(l) => nodeConfData.find(n => n.name === l)?.fullName || l}
                    />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                      {nodeConfData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={entry.score >= 80 ? '#10b981' : entry.score >= 65 ? '#f59e0b' : '#ef4444'}
                          fillOpacity={0.85}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-slate-800">Active alerts</div>
                  {stats.unreadAlerts > 0 && (
                    <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      {stats.unreadAlerts} unread
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {projectAlerts.slice(0, 4).map(alert => (
                    <div key={alert.id} className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border text-xs',
                      alert.severity === 'high' ? 'bg-red-50 border-red-200' :
                      alert.severity === 'medium' ? 'bg-amber-50 border-amber-200' :
                      'bg-emerald-50 border-emerald-200'
                    )}>
                      {alert.severity === 'high' ? <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" /> :
                       alert.severity === 'medium' ? <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /> :
                       <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="font-medium text-slate-700">{alert.title}</div>
                        <div className="text-slate-500 mt-0.5 line-clamp-1">{alert.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity feed */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-semibold text-slate-800 mb-4">Recent activity log</div>
              <div className="space-y-3">
                {activity.slice(0, 8).map(log => {
                  const user = getUserById(log.actorId);
                  return (
                    <div key={log.id} className="flex items-start gap-3">
                      {user ? (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 mt-0.5" style={{ backgroundColor: user.color }}>
                          {user.initials}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Activity className="w-3 h-3 text-slate-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs">
                          <span className="font-medium text-slate-700">{log.actor}</span>
                          <span className="text-slate-400"> — {log.action}</span>
                          <span className="text-slate-600 font-medium"> {log.targetName}</span>
                          {log.detail && <span className="text-slate-400"> ({log.detail})</span>}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{timeAgo(log.timestamp)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="text-lg font-bold text-slate-900 mb-6">Project team</div>

            <div className="grid grid-cols-2 gap-4">
              {activityByMember.map(({ user, actions, hCount }) => {
                if (!user) return null;
                return (
                  <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
                        style={{ backgroundColor: user.color }}>
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block',
                          user.role === 'manager' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                        )}>
                          {user.role === 'manager' ? 'Manager' : 'Consultant'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-slate-700">{hCount}</div>
                        <div className="text-xs text-slate-400">Hypotheses created</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-slate-700">{actions}</div>
                        <div className="text-xs text-slate-400">Total actions</div>
                      </div>
                    </div>

                    {/* Assigned nodes */}
                    <div className="mt-4">
                      <div className="text-xs font-medium text-slate-500 mb-2">Assigned nodes</div>
                      <div className="space-y-1">
                        {nodes.filter(n => n.assigneeId === user.id && n.level >= 1).map(n => (
                          <div key={n.id} className="flex items-center gap-2 text-xs">
                            <div className={cn('w-2 h-2 rounded-full', n.status === 'complete' ? 'bg-emerald-500' : n.status === 'in_progress' ? 'bg-blue-500' : 'bg-slate-300')} />
                            <span className="text-slate-600 truncate">{n.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-slate-900">Report generation</div>
                <div className="text-sm text-slate-400 mt-1">
                  {includedH.length}/{projectHypotheses.length} hypotheses included in the report
                </div>
              </div>
              {!reportGenerated ? (
                <button
                  onClick={handleGenerateReport}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  Generate report
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-emerald-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Report generated
                  </span>
                  <div className="flex gap-2">
                    {['Word', 'PowerPoint', 'PDF'].map(fmt => (
                      <button key={fmt} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:border-slate-300 hover:shadow-sm transition-all">
                        <Download className="w-3.5 h-3.5" />
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hypothesis selection */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-700">Hypothesis selection</div>
                <div className="text-xs text-slate-400 mt-0.5">Check/uncheck hypotheses to include in the final report</div>
              </div>

              <div className="divide-y divide-slate-100">
                {projectHypotheses.filter(h => h.status !== 'rejected').map(h => (
                  <div key={h.id} className="flex items-center gap-4 px-5 py-3.5">
                    <input
                      type="checkbox"
                      defaultChecked={h.includedInReport}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">{h.title}</div>
                    </div>
                    <HypothesisBadge status={h.status} />
                    <ConfidenceBadge score={h.confidence.overall} />
                  </div>
                ))}
              </div>
            </div>

            {/* Report options */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-semibold text-slate-800 mb-4">Export options</div>
              <div className="space-y-3">
                {[
                  { label: 'Confidentiality watermark', sublabel: '"Confidential — DataSense"', default: true },
                  { label: 'Footer mention', sublabel: 'StratCap Partners © 2026', default: true },
                  { label: 'Include Confidence Breakdowns', sublabel: 'Score detail by dimension', default: true },
                  { label: 'Include hypothesis history', sublabel: 'Change log', default: false },
                ].map(opt => (
                  <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked={opt.default} className="w-4 h-4 accent-blue-600" />
                    <div>
                      <div className="text-sm text-slate-700">{opt.label}</div>
                      <div className="text-xs text-slate-400">{opt.sublabel}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
