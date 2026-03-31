import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download, FileText, Users, BarChart2, Bell, CheckCircle2,
  Clock, AlertTriangle, TrendingUp, Activity, ChevronRight, Star, ClipboardCheck,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatDate, formatDateTime, timeAgo } from '@/lib/utils';
import { Project } from '@/types';
import { useAppStore } from '@/store/appStore';
import { getActivityByProject, WORKSTREAM_NODES } from '@/data/mockData';
import { ReviewQueue } from './ReviewQueue';
import { USERS, getUserById } from '@/data/users';
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
  const [reportState, setReportState] = useState<'idle' | 'generating' | 'done'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const GENERATION_STEPS = [
    { label: 'Collecting validated hypotheses...', duration: 800 },
    { label: 'Analyzing confidence scores...', duration: 1000 },
    { label: 'Cross-referencing sources...', duration: 1200 },
    { label: 'Compiling report sections...', duration: 1000 },
    { label: 'Formatting document...', duration: 600 },
    { label: 'Finalizing report...', duration: 400 },
  ];

  const runGeneration = useCallback(() => {
    setReportState('generating');
    setCurrentStep(0);

    let stepIndex = 0;
    const advanceStep = () => {
      stepIndex++;
      if (stepIndex < GENERATION_STEPS.length) {
        setCurrentStep(stepIndex);
        timerRef.current = setTimeout(advanceStep, GENERATION_STEPS[stepIndex].duration);
      } else {
        timerRef.current = setTimeout(() => {
          setReportState('done');
        }, 400);
      }
    };
    timerRef.current = setTimeout(advanceStep, GENERATION_STEPS[0].duration);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
    runGeneration();
  };

  const handleDownloadPDF = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Project Athena_CDD (Revolut).pdf';
    link.download = 'Project Athena_CDD (Revolut).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Hypotheses', value: stats.totalH, sub: 'total', color: 'text-slate-700' },
                { label: 'Validated', value: stats.validated, sub: `${Math.round(stats.validated / (stats.totalH || 1) * 100)}%`, color: 'text-emerald-600' },
                { label: 'Draft', value: stats.draft, sub: 'to validate', color: 'text-slate-500' },
                { label: 'On Hold', value: stats.onHold, sub: 'pending', color: 'text-amber-500' },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="bg-white rounded-xl border border-slate-200 px-4 py-4">
                  <div className={cn('text-2xl font-bold mb-1', color)}>{value}</div>
                  <div className="text-xs text-slate-700 font-medium">{label}</div>
                  <div className="text-xs text-slate-400">{sub}</div>
                </div>
              ))}
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
              <AnimatePresence mode="wait">
                {reportState === 'idle' && (
                  <motion.button
                    key="generate-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleGenerateReport}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Generate report
                  </motion.button>
                )}
                {reportState === 'done' && (
                  <motion.div
                    key="done-state"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-sm text-emerald-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Report generated
                    </span>
                    <motion.div
                      className="flex gap-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                      }}
                    >
                      {['Word', 'PowerPoint', 'PDF'].map(fmt => (
                        <motion.button
                          key={fmt}
                          variants={{
                            hidden: { opacity: 0, y: 6 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                          onClick={fmt === 'PDF' ? handleDownloadPDF : undefined}
                          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:border-slate-300 hover:shadow-sm transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {fmt}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Generation progress */}
            <AnimatePresence>
              {reportState === 'generating' && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="text-sm font-semibold text-slate-800 mb-3">Generating report...</div>

                    {/* Progress bar */}
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentStep + 1) / GENERATION_STEPS.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>

                    {/* Step list */}
                    <div className="space-y-2.5">
                      {GENERATION_STEPS.map((step, i) => {
                        const isDone = i < currentStep;
                        const isActive = i === currentStep;
                        const isPending = i > currentStep;
                        return (
                          <motion.div
                            key={step.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3"
                          >
                            {isDone && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                            {isActive && (
                              <Loader2 className="w-4 h-4 text-blue-500 shrink-0 animate-spin" />
                            )}
                            {isPending && (
                              <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                            )}
                            <span className={cn(
                              'text-sm',
                              isDone && 'text-slate-500',
                              isActive && 'text-slate-800 font-medium',
                              isPending && 'text-slate-300',
                            )}>
                              {step.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
