import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, LogOut, Bell, ChevronDown, ChevronRight,
  Menu, X, BarChart3, LayoutGrid, Clock, CheckCircle2, AlertCircle,
  Plus, Circle, FolderOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { Avatar } from '../ui/Avatar';
import { USERS } from '@/data/users';
import { NodeStatus } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type DateBucket = 'today' | 'yesterday' | 'week' | 'earlier';

function getDateBucket(isoString: string): DateBucket {
  const now = new Date();
  const date = new Date(isoString);
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((nowDay.getTime() - dateDay.getTime()) / 86400000);
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays <= 7) return 'week';
  return 'earlier';
}

const BUCKET_LABELS: Record<DateBucket, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  week: 'This Week',
  earlier: 'Earlier',
};

const BUCKET_ORDER: DateBucket[] = ['today', 'yesterday', 'week', 'earlier'];

function NodeStatusIcon({ status, className }: { status: NodeStatus; className?: string }) {
  const base = cn('w-3 h-3 shrink-0', className);
  if (status === 'complete') return <CheckCircle2 className={cn(base, 'text-emerald-400')} />;
  if (status === 'in_progress') return <Clock className={cn(base, 'text-blue-400')} />;
  if (status === 'blocked') return <AlertCircle className={cn(base, 'text-red-400')} />;
  return <Circle className={cn(base, 'text-slate-500')} />;
}

// Short project label: use client name up to first space or comma
function shortProjectName(name: string): string {
  // "DataSense — Nordic Capital Acquisition" → "DataSense"
  return name.split(/[\s—]/)[0];
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUser, logout, alerts, sidebarOpen, toggleSidebar,
    nodes, projects, recentNodes, selectedNodeId, setSelectedNode, setSelectedProject,
  } = useAppStore();

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(['p1']));

  const unreadAlerts = alerts.filter(a => !a.isRead && a.projectId === 'p1').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Recents: resolve node + project for each recent entry
  const resolvedRecents = recentNodes
    .map(r => ({
      ...r,
      node: nodes.find(n => n.id === r.nodeId),
      project: projects.find(p => p.id === r.projectId),
    }))
    .filter(r => r.node && r.project);

  // Group recents by date bucket
  const recentsByBucket = resolvedRecents.reduce<Record<DateBucket, typeof resolvedRecents>>(
    (acc, r) => {
      const bucket = getDateBucket(r.visitedAt);
      acc[bucket].push(r);
      return acc;
    },
    { today: [], yesterday: [], week: [], earlier: [] }
  );

  // User's projects (member of)
  const userProjects = currentUser
    ? projects.filter(p => p.members.includes(currentUser.id))
    : projects;

  const handleNodeClick = (projectId: string, nodeId: string) => {
    setSelectedProject(projectId);
    setSelectedNode(nodeId);
    navigate(`/projects/${projectId}`);
  };

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      next.has(projectId) ? next.delete(projectId) : next.add(projectId);
      return next;
    });
  };

  const hasAnyRecents = resolvedRecents.length > 0;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'flex flex-col bg-[#0f1117] transition-all duration-300 shrink-0 border-r border-slate-800',
        sidebarOpen ? 'w-64' : 'w-16'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-800 shrink-0">
          {sidebarOpen ? (
            <img
              src="/Ophys_Logo_white.png"
              alt="Ophys"
              className="h-6 w-auto"
            />
          ) : (
            <img
              src="/ophys-icon.svg"
              alt="Ophys"
              className="w-8 h-8"
            />
          )}
          {sidebarOpen && (
            <>
              <div className="flex-1 min-w-0"></div>
              {currentUser?.role === 'manager' && (
                <button
                  onClick={() => navigate('/')}
                  className="p-1 rounded-md text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  title="New project"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Scrollable nav area */}
        <div className="flex-1 overflow-y-auto min-h-0 py-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {sidebarOpen ? (
            <>
              {/* ── Recents ───────────────────────────────────────────── */}
              {hasAnyRecents && (
                <div className="mb-2">
                  {BUCKET_ORDER.map(bucket => {
                    const items = recentsByBucket[bucket];
                    if (!items.length) return null;
                    return (
                      <div key={bucket}>
                        <div className="px-3 pt-3 pb-1">
                          <span className="text-[10px] uppercase tracking-widest font-medium text-slate-500">
                            {BUCKET_LABELS[bucket]}
                          </span>
                        </div>
                        {items.map(r => (
                          <button
                            key={`${r.nodeId}-${r.visitedAt}`}
                            onClick={() => handleNodeClick(r.projectId, r.nodeId!)}
                            className={cn(
                              'w-full flex items-start gap-2 px-3 py-1.5 text-left transition-colors group',
                              selectedNodeId === r.nodeId
                                ? 'bg-slate-800'
                                : 'hover:bg-slate-800/60'
                            )}
                          >
                            <LayoutGrid className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="text-[12px] text-slate-300 truncate leading-snug group-hover:text-white">
                                {r.node!.title}
                              </div>
                              <div className="text-[10px] text-slate-600 truncate mt-0.5">
                                {shortProjectName(r.project!.name)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── Projects ──────────────────────────────────────────── */}
              <div className="mb-2">
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[10px] uppercase tracking-widest font-medium text-slate-500">
                    Projets
                  </span>
                </div>
                {userProjects.map(project => {
                  const isExpanded = expandedProjects.has(project.id);
                  const level1Nodes = nodes.filter(n => n.projectId === project.id && n.level === 1);
                  const isActive = location.pathname.includes(`/projects/${project.id}`);

                  return (
                    <div key={project.id}>
                      {/* Project row */}
                      <button
                        onClick={() => {
                          navigate(`/projects/${project.id}`);
                          toggleProjectExpand(project.id);
                        }}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors group',
                          isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        )}
                      >
                        <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                        <span className="flex-1 text-[12px] truncate font-medium">
                          {shortProjectName(project.name)}
                        </span>
                        {level1Nodes.length > 0 && (
                          isExpanded
                            ? <ChevronDown className="w-3 h-3 text-slate-600 shrink-0" />
                            : <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                        )}
                      </button>

                      {/* Level-1 nodes */}
                      {isExpanded && level1Nodes.map((node, i) => (
                        <button
                          key={node.id}
                          onClick={() => handleNodeClick(project.id, node.id)}
                          className={cn(
                            'w-full flex items-center gap-2 pl-7 pr-3 py-1 text-left transition-colors group',
                            selectedNodeId === node.id
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-300'
                          )}
                        >
                          {/* tree line */}
                          <span className="text-slate-700 text-[10px] shrink-0 leading-none">
                            {i < level1Nodes.length - 1 ? '├' : '└'}
                          </span>
                          <NodeStatusIcon status={node.status} />
                          <span className="text-[11px] truncate flex-1">{node.title}</span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>

        {/* Bottom: user + logout */}
        <div className="px-2 py-3 border-t border-slate-800 space-y-1 shrink-0">
          {currentUser && (
            <div className={cn('flex items-center gap-3 px-3 py-2 rounded-lg', !sidebarOpen && 'justify-center')}>
              <Avatar userId={currentUser.id} size="sm" />
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{currentUser.name}</div>
                  <div className="text-slate-500 text-[10px] capitalize">{currentUser.role}</div>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-red-400 text-sm transition-colors',
              !sidebarOpen && 'justify-center'
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              onClick={() => navigate('/projects/p1/alerts')}
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {currentUser && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <Avatar userId={currentUser.id} size="md" />
                <div>
                  <div className="text-sm font-medium text-slate-900">{currentUser.name}</div>
                  <div className="text-xs text-slate-500 capitalize">
                    {currentUser.role === 'manager' ? 'Manager' : 'Consultant'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
