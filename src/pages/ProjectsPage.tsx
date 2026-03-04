import { useNavigate } from 'react-router-dom';
import { Plus, Clock, Users, TrendingUp, ArrowRight, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { Project, ProjectStatus } from '../types';
import { cn, formatDate, getProjectStatusLabel } from '../lib/utils';
import { AvatarGroup } from '../components/ui/Avatar';
import { useAppStore } from '../store/appStore';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600', icon: Circle },
  in_progress: { label: 'En cours', className: 'bg-blue-50 text-blue-700', icon: TrendingUp },
  in_review: { label: 'En revue', className: 'bg-amber-50 text-amber-700', icon: AlertCircle },
  delivered: { label: 'Livré', className: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  archived: { label: 'Archivé', className: 'bg-slate-100 text-slate-500', icon: Circle },
};

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { setSelectedProject } = useAppStore();
  const cfg = STATUS_CONFIG[project.status];
  const Icon = cfg.icon;

  const daysLeft = Math.ceil(
    (new Date(project.deadline).getTime() - new Date('2026-03-04').getTime()) / 86400000
  );

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
      onClick={() => {
        setSelectedProject(project.id);
        navigate(`/projects/${project.id}`);
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm leading-tight">{project.name}</h3>
          <p className="text-xs text-slate-400 mt-1">{project.sector}</p>
        </div>
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0', cfg.className)}>
          <Icon className="w-3 h-3" />
          {cfg.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 mb-4 line-clamp-2">{project.description}</p>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-4">
        <div className="text-xs text-slate-500">
          <span className="text-slate-300">Cible:</span> <span className="font-medium text-slate-600">{project.client}</span>
        </div>
        <div className="text-xs text-slate-500">
          <span className="text-slate-300">Deal:</span> <span className="font-semibold text-blue-600">{project.dealSize}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <AvatarGroup userIds={project.members} max={4} />
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {daysLeft > 0 ? `J-${daysLeft}` : 'En retard'}
          </span>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-0.5 transform" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const { currentUser } = useAppStore();

  const stats = {
    total: PROJECTS.length,
    inProgress: PROJECTS.filter(p => p.status === 'in_progress').length,
    inReview: PROJECTS.filter(p => p.status === 'in_review').length,
    delivered: PROJECTS.filter(p => p.status === 'delivered').length,
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projets CDD</h1>
          <p className="text-slate-500 text-sm mt-1">
            Bonjour {currentUser?.name?.split(' ')[0]} — {new Date('2026-03-04').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        {currentUser?.role === 'manager' && (
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Nouveau projet
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total projets', value: stats.total, color: 'text-slate-700' },
          { label: 'En cours', value: stats.inProgress, color: 'text-blue-600' },
          { label: 'En revue', value: stats.inReview, color: 'text-amber-500' },
          { label: 'Livrés', value: stats.delivered, color: 'text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <div className={cn('text-2xl font-bold', stat.color)}>{stat.value}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-3 gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
