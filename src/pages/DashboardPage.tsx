import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, AlertTriangle, CheckCircle2, ArrowRight, BarChart3, Plus } from 'lucide-react';
import { cn, getProjectStatusLabel, formatDate } from '../lib/utils';
import { useAppStore } from '../store/appStore';
import { AvatarGroup } from '../components/ui/Avatar';
import { CreateProjectModal } from '../components/project/CreateProjectModal';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock portfolio confidence trend
const PORTFOLIO_TREND = [
  { week: 'S1', datasense: 65, nexova: 70, medicloud: 88 },
  { week: 'S2', datasense: 70, nexova: 74, medicloud: 90 },
  { week: 'S3', datasense: 75, nexova: 78, medicloud: 92 },
  { week: 'S4', datasense: 80, nexova: 80, medicloud: 93 },
  { week: 'S5', datasense: 79, nexova: 82, medicloud: 94 },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser, alerts, projects } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allAlerts = alerts.filter(a => !a.isRead);
  const activeProjects = projects.filter(p => ['in_progress', 'in_review'].includes(p.status));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Portfolio</h1>
          <p className="text-sm text-slate-400 mt-1">Vue consolidée de tous les projets CDD actifs</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nouveau projet
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Projets actifs', value: activeProjects.length, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Alertes non lues', value: allAlerts.length, icon: AlertTriangle, color: allAlerts.length > 0 ? 'text-red-500' : 'text-emerald-600', bg: allAlerts.length > 0 ? 'bg-red-50' : 'bg-emerald-50' },
          { label: 'Deals en cours', value: '€460M', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Deadline proche', value: 'J-8', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center gap-4">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bg)}>
              <Icon className={cn('w-5 h-5', color)} />
            </div>
            <div>
              <div className={cn('text-2xl font-bold', color)}>{value}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Trend chart */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-sm font-semibold text-slate-800 mb-1">Évolution confiance — Portfolio</div>
          <div className="text-xs text-slate-400 mb-4">Score de confiance moyen par projet (dernières 5 semaines)</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={PORTFOLIO_TREND}>
              <defs>
                <linearGradient id="ds" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="nex" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="med" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => v != null ? [`${v}%`] : ['']} />
              <Area type="monotone" dataKey="datasense" stroke="#3b82f6" fill="url(#ds)" strokeWidth={2} name="DataSense" />
              <Area type="monotone" dataKey="nexova" stroke="#7c3aed" fill="url(#nex)" strokeWidth={2} name="Nexova" />
              <Area type="monotone" dataKey="medicloud" stroke="#10b981" fill="url(#med)" strokeWidth={2} name="MediCloud" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            {[
              { color: '#3b82f6', label: 'DataSense' },
              { color: '#7c3aed', label: 'Nexova' },
              { color: '#10b981', label: 'MediCloud' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Alerts summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-sm font-semibold text-slate-800 mb-4">Alertes portfolio</div>
          {allAlerts.length === 0 ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Aucune alerte</p>
            </div>
          ) : (
            <div className="space-y-2">
              {allAlerts.slice(0, 5).map(a => (
                <div key={a.id} className={cn(
                  'p-3 rounded-lg border text-xs',
                  a.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                )}>
                  <div className="font-medium text-slate-700 truncate">{a.title}</div>
                  <div className="text-slate-400 mt-0.5 truncate">{a.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-800">Projets actifs</div>
        </div>
        <div className="divide-y divide-slate-100">
          {projects.map(project => {
            const daysLeft = Math.ceil(
              (new Date(project.deadline).getTime() - new Date('2026-03-04').getTime()) / 86400000
            );
            return (
              <div
                key={project.id}
                className="flex items-center gap-5 px-5 py-3.5 hover:bg-slate-50 cursor-pointer group transition-colors"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{project.name}</div>
                  <div className="text-xs text-slate-400">{project.sector} · {project.dealSize}</div>
                </div>
                <div className={cn('text-xs px-2.5 py-1 rounded-full font-medium',
                  project.status === 'in_progress' ? 'bg-blue-50 text-blue-700' :
                  project.status === 'in_review' ? 'bg-amber-50 text-amber-700' :
                  project.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' :
                  'bg-slate-100 text-slate-500'
                )}>
                  {getProjectStatusLabel(project.status)}
                </div>
                <AvatarGroup userIds={project.members} max={3} />
                <div className={cn('text-xs font-medium', daysLeft <= 7 ? 'text-amber-500' : 'text-slate-400')}>
                  {daysLeft > 0 ? `J-${daysLeft}` : 'Livré'}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
