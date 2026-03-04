import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, BarChart2, GitBranch, AlertCircle, Users,
  FileText, Settings, Clock, Target, Layers, ChevronRight
} from 'lucide-react';
import { cn, formatDate, getProjectStatusLabel } from '../lib/utils';
import { PROJECTS } from '../data/mockData';
import { useAppStore } from '../store/appStore';
import { WorkstreamBoard } from '../components/workstream/WorkstreamBoard';
import { ResearchPanel } from '../components/research/ResearchPanel';
import { HypothesisList } from '../components/hypothesis/HypothesisList';
import { HypothesisDetail } from '../components/hypothesis/HypothesisDetail';
import { ConfidenceMonitor } from '../components/confidence/ConfidenceMonitor';
import { AvatarGroup } from '../components/ui/Avatar';
import { HypothesisTreeView } from '../components/hypothesis/HypothesisTreeView';
import { ManagerView } from '../components/manager/ManagerView';

type ActiveView = 'board' | 'tree' | 'manager';

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { selectedHypothesisId, setSelectedHypothesis, hypotheses, currentUser, alerts } = useAppStore();
  const [activeView, setActiveView] = useState<ActiveView>('board');

  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return <div>Projet introuvable</div>;

  const hypothesis = selectedHypothesisId
    ? hypotheses.find(h => h.id === selectedHypothesisId)
    : null;

  const unreadAlerts = alerts.filter(a => a.projectId === projectId && !a.isRead).length;

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-600',
    in_progress: 'bg-blue-50 text-blue-700',
    in_review: 'bg-amber-50 text-amber-700',
    delivered: 'bg-emerald-50 text-emerald-700',
    archived: 'bg-slate-100 text-slate-500',
  };

  return (
    <div className="h-full flex flex-col">
      {/* Project topbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 shrink-0">
        <button
          onClick={() => navigate('/projects')}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-slate-900 truncate">{project.name}</h1>
            <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', statusColors[project.status])}>
              {getProjectStatusLabel(project.status)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
            <span>{project.sector}</span>
            <span>·</span>
            <span className="font-semibold text-blue-600">{project.dealSize}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Deadline: {formatDate(project.deadline)}
            </span>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          {[
            { id: 'board', label: 'Workstream', icon: Layers },
            { id: 'tree', label: 'Hypothesis Tree', icon: GitBranch },
            { id: 'manager', label: currentUser?.role === 'manager' ? 'Manager' : 'Dashboard', icon: BarChart2 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as ActiveView)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                activeView === id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {id === 'manager' && unreadAlerts > 0 && (
                <span className="w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadAlerts}
                </span>
              )}
            </button>
          ))}
        </div>

        <AvatarGroup userIds={project.members} max={4} />
      </div>

      {/* Main content */}
      {activeView === 'board' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Col 1: Workstream Board */}
          <div className="w-72 border-r border-slate-200 bg-white shrink-0 overflow-hidden">
            <WorkstreamBoard projectId={project.id} />
          </div>

          {/* Col 2: Research Engine */}
          <div className="w-72 border-r border-slate-200 bg-white shrink-0 overflow-hidden">
            <ResearchPanel />
          </div>

          {/* Col 3: Hypothesis Engine */}
          <div className={cn('border-r border-slate-200 bg-slate-50 overflow-hidden flex-shrink-0', hypothesis ? 'w-80' : 'flex-1')}>
            <HypothesisList
              projectId={project.id}
              onSelectHypothesis={(id) => setSelectedHypothesis(id)}
            />
          </div>

          {/* Col 4: Hypothesis Detail (conditional) */}
          {hypothesis && (
            <div className="flex-1 border-r border-slate-200 overflow-hidden">
              <HypothesisDetail
                hypothesis={hypothesis}
                onClose={() => setSelectedHypothesis(null)}
              />
            </div>
          )}

          {/* Col 5: Confidence Monitor */}
          <div className="w-72 bg-white shrink-0 overflow-hidden">
            <ConfidenceMonitor projectId={project.id} />
          </div>
        </div>
      )}

      {activeView === 'tree' && (
        <div className="flex-1 overflow-auto bg-slate-50">
          <HypothesisTreeView projectId={project.id} onSelectHypothesis={(id) => {
            setSelectedHypothesis(id);
            setActiveView('board');
          }} />
        </div>
      )}

      {activeView === 'manager' && (
        <div className="flex-1 overflow-auto">
          <ManagerView projectId={project.id} project={project} />
        </div>
      )}
    </div>
  );
}
