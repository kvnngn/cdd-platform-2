import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, LogOut, Bell, ChevronDown,
  Briefcase, Settings, Menu, X, BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { Avatar } from '../ui/Avatar';

const NAV_ITEMS = [
  { label: 'Projets', icon: FolderOpen, path: '/projects' },
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, alerts, sidebarOpen, toggleSidebar } = useAppStore();

  const unreadAlerts = alerts.filter(a => !a.isRead && a.projectId === 'p1').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'flex flex-col bg-slate-900 transition-all duration-300 shrink-0',
        sidebarOpen ? 'w-56' : 'w-16'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-white font-bold text-sm leading-tight">CDD Platform</div>
              <div className="text-slate-400 text-xs">by StratCap</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const active = location.pathname.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-slate-700 space-y-1">
          {currentUser && (
            <div className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg', !sidebarOpen && 'justify-center')}>
              <Avatar userId={currentUser.id} size="sm" />
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{currentUser.name}</div>
                  <div className="text-slate-400 text-xs capitalize">{currentUser.role}</div>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 text-sm transition-colors',
              !sidebarOpen && 'justify-center'
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3">
            {/* Alerts bell */}
            <button
              className="relative p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
              onClick={() => navigate('/projects/p1/alerts')}
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* User menu */}
            {currentUser && (
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <Avatar userId={currentUser.id} size="sm" />
                <div className="text-sm">
                  <span className="text-slate-700 font-medium">{currentUser.name}</span>
                  <span className="ml-2 text-xs text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                    {currentUser.role === 'manager' ? 'Manager' : 'Consultant'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
