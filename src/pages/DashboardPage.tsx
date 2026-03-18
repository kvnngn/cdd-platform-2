import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { cn, getProjectStatusLabel } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { AvatarGroup } from '@/components/ui/Avatar';
import { CreateProjectModal } from '@/components/project/CreateProjectModal';
import { Project } from '@/types';

// Helper functions
function calculateTotalDealValue(projects: Project[]): string {
  const total = projects.reduce((sum, p) => {
    const value = parseInt(p.dealSize.replace(/[€M]/g, ''));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
  return `€${total}M`;
}

function getNextDeadline(projects: Project[]): string {
  const now = new Date('2026-03-04');
  const upcoming = projects
    .map(p => ({
      project: p,
      daysLeft: Math.ceil((new Date(p.deadline).getTime() - now.getTime()) / 86400000)
    }))
    .filter(p => p.daysLeft > 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return upcoming.length > 0 ? `${upcoming[0].daysLeft} days` : 'None';
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser, alerts, projects } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on role
  const userProjects = currentUser?.role === 'manager'
    ? projects  // Managers see all
    : projects.filter(p => p.members.includes(currentUser?.id || '')); // Consultants see only their projects

  // Filter alerts based on role
  const relevantAlerts = currentUser?.role === 'manager'
    ? alerts.filter(a => !a.isRead)  // All unread alerts
    : alerts.filter(a => !a.isRead && userProjects.some(p => p.id === a.projectId)); // Only alerts from their projects

  // Calculate stats based on filtered projects
  const activeProjects = userProjects.filter(p => ['in_progress', 'in_review'].includes(p.status));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {currentUser?.role === 'manager' ? 'Portfolio Dashboard' : 'My Projects'}
          </h1>
          <p className="text-slate-600 mt-1">
            {currentUser?.role === 'manager'
              ? 'Overview of all active projects'
              : 'Your assigned projects and tasks'}
          </p>
        </div>
        {currentUser?.role === 'manager' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: currentUser?.role === 'manager' ? 'Active Projects' : 'My Projects', value: activeProjects.length },
          { label: 'Total Deal Value', value: calculateTotalDealValue(userProjects) },
          { label: 'Next Deadline', value: getNextDeadline(userProjects) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-lg border border-slate-200 px-5 py-4">
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Projects list */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="font-semibold text-slate-900">
            {currentUser?.role === 'manager' ? 'Active Projects' : 'My Projects'}
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {userProjects.map(project => {
            const daysLeft = Math.ceil(
              (new Date(project.deadline).getTime() - new Date('2026-03-04').getTime()) / 86400000
            );
            return (
              <div
                key={project.id}
                className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50 cursor-pointer group transition-colors"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {project.client === 'Revolut Ltd' && (
                  <div className="h-12 w-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm">
                    <img
                      src="/revolut.jpg"
                      alt="Revolut"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900 truncate">
                    {project.name}
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">{project.sector} · {project.dealSize}</div>
                </div>
                <div className={cn('text-xs px-2.5 py-1 rounded-md font-medium border',
                  project.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  project.status === 'in_review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  project.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  'bg-slate-100 text-slate-500 border-slate-200'
                )}>
                  {getProjectStatusLabel(project.status)}
                </div>
                <AvatarGroup userIds={project.members} max={3} />
                <div className={cn('text-sm font-medium min-w-[60px] text-right', daysLeft <= 7 ? 'text-amber-600' : 'text-slate-500')}>
                  {daysLeft > 0 ? `${daysLeft} days` : 'Done'}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
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
