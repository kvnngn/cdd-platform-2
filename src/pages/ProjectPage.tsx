import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, BarChart2, GitBranch, AlertCircle, Users,
  FileText, Settings, Clock, Target, Layers, ChevronRight, PanelLeftOpen
} from 'lucide-react';
import { cn, formatDate, getProjectStatusLabel } from '../lib/utils';
import { PROJECTS } from '../data/mockData';
import { useAppStore } from '../store/appStore';
import { useResizable } from '../hooks/useResizable';
import { WorkstreamBoard } from '../components/workstream/WorkstreamBoard';
import { ResearchPanel } from '../components/research/ResearchPanel';
import { HypothesisList } from '../components/hypothesis/HypothesisList';
import { HypothesisDetail } from '../components/hypothesis/HypothesisDetail';
import { ConfidenceStrip } from '../components/confidence/ConfidenceStrip';
import { ResizeHandle } from '../components/ui/ResizeHandle';
import { AvatarGroup } from '../components/ui/Avatar';
import { HypothesisTreeView } from '../components/hypothesis/HypothesisTreeView';
import { ManagerView } from '../components/manager/ManagerView';

type ActiveView = 'board' | 'tree' | 'manager';

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { selectedHypothesisId, setSelectedHypothesis, hypotheses, currentUser, alerts } = useAppStore();
  const [activeView, setActiveView] = useState<ActiveView>('board');
  const [detailOpen, setDetailOpen] = useState(false);

  // Sidebar collapse states
  const [isWorkstreamCollapsed, setIsWorkstreamCollapsed] = useState(false);
  const [isSourcesCollapsed, setIsSourcesCollapsed] = useState(false);

  // Resizable Hypothesis Panel (starts compact to maximize Research space)
  const hypothesisPanel = useResizable({
    initialWidth: 340,
    minWidth: 280,
    maxWidth: 700,
    collapseThreshold: 100,
    direction: 'left',
  });

  // Sync slide-over state with selected hypothesis
  useEffect(() => {
    setDetailOpen(!!selectedHypothesisId);
  }, [selectedHypothesisId]);

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

        <ConfidenceStrip projectId={project.id} />

        <AvatarGroup userIds={project.members} max={4} />
      </div>

      {/* Main content */}
      {activeView === 'board' && (
        <div className="flex-1 flex overflow-hidden relative">
          {/* Col 1: Workstream Board */}
          <div
            className={cn(
              'border-r border-slate-200 bg-white shrink-0 overflow-hidden transition-all duration-300',
              isWorkstreamCollapsed ? 'w-12' : 'w-72'
            )}
          >
            <WorkstreamBoard
              projectId={project.id}
              isCollapsed={isWorkstreamCollapsed}
              onToggleCollapse={() => setIsWorkstreamCollapsed(!isWorkstreamCollapsed)}
            />
          </div>

          {/* Col 2: Research Engine (flex — takes max space) */}
          <div className="flex-1 bg-white overflow-hidden min-w-[200px]">
            <ResearchPanel
              sourcesCollapsed={isSourcesCollapsed}
              onToggleSourcesCollapse={() => setIsSourcesCollapsed(!isSourcesCollapsed)}
            />
          </div>

          {/* Resize handle between Research & Hypothesis */}
          <ResizeHandle
            onMouseDown={hypothesisPanel.handleMouseDown}
            isDragging={hypothesisPanel.isDragging}
            isCollapsed={hypothesisPanel.isCollapsed}
            onToggleCollapse={hypothesisPanel.toggleCollapse}
          />

          {/* Col 3: Hypothesis Engine (resizable, starts compact) */}
          {!hypothesisPanel.isCollapsed && (
            <div
              className="bg-slate-50 shrink-0 overflow-hidden"
              style={{ width: hypothesisPanel.width }}
            >
              <HypothesisList
                projectId={project.id}
                onSelectHypothesis={(id) => setSelectedHypothesis(id)}
              />
            </div>
          )}

          {/* Slide-over panel for Hypothesis Detail */}
          {hypothesis && (
            <>
              {/* Backdrop */}
              <div
                className={cn(
                  'absolute inset-0 bg-black/20 transition-opacity duration-300 z-40',
                  detailOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setSelectedHypothesis(null)}
              />
              {/* Slide-over panel */}
              <div
                className={cn(
                  'absolute inset-y-0 right-0 w-1/2 max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 border-l border-slate-200',
                  detailOpen ? 'translate-x-0' : 'translate-x-full'
                )}
              >
                <HypothesisDetail
                  hypothesis={hypothesis}
                  onClose={() => setSelectedHypothesis(null)}
                />
              </div>
            </>
          )}
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
