import { useState } from 'react';
import {
  ChevronRight, ChevronDown, Circle, CheckCircle2, AlertTriangle,
  Clock, Lightbulb, Plus, PanelLeftOpen, PanelLeftClose
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { WorkstreamNode, NodeStatus } from '../../types';
import { useAppStore } from '../../store/appStore';
import { getUserById } from '../../data/users';
import { WORKSTREAM_NODES } from '../../data/mockData';

const STATUS_ICONS: Record<NodeStatus, React.ComponentType<{ className?: string }>> = {
  not_started: Circle,
  in_progress: Clock,
  complete: CheckCircle2,
  blocked: AlertTriangle,
};

const STATUS_COLORS: Record<NodeStatus, string> = {
  not_started: 'text-slate-300',
  in_progress: 'text-blue-500',
  complete: 'text-emerald-500',
  blocked: 'text-red-500',
};

const COVERAGE_COLOR = (score: number) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-400';
  return 'bg-red-400';
};

const DEADLINE_COLORS = {
  ok: 'text-emerald-500',
  warning: 'text-amber-500',
  overdue: 'text-red-500',
};

interface NodeRowProps {
  node: WorkstreamNode;
  level: number;
  isExpanded: boolean;
  onToggle: () => void;
  hasChildren: boolean;
}

function NodeRow({ node, level, isExpanded, onToggle, hasChildren }: NodeRowProps) {
  const { selectedNodeId, setSelectedNode, hypotheses } = useAppStore();
  const isActive = selectedNodeId === node.id;
  const StatusIcon = STATUS_ICONS[node.status];
  const assignee = node.assigneeId ? getUserById(node.assigneeId) : null;

  const nodeHypotheses = hypotheses.filter(h => h.nodeId === node.id);
  const validated = nodeHypotheses.filter(h => h.status === 'validated').length;
  const total = nodeHypotheses.length;

  const indent = level * 14;

  return (
    <div
      className={cn(
        'rounded-lg cursor-pointer group transition-all border',
        isActive
          ? 'bg-blue-50 border-blue-200 shadow-sm'
          : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
      )}
      style={{ marginLeft: `${indent}px` }}
      onClick={() => setSelectedNode(node.id)}
    >
      {/* Main row — always fully visible */}
      <div className="flex items-center gap-1.5 px-2 py-2">
        {/* Expand toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-slate-500 shrink-0 rounded"
        >
          {hasChildren ? (
            isExpanded
              ? <ChevronDown className="w-3.5 h-3.5" />
              : <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 block" />
          )}
        </button>

        {/* Status icon */}
        <StatusIcon className={cn('w-3.5 h-3.5 shrink-0', STATUS_COLORS[node.status])} />

        {/* Title — always visible, never hidden */}
        <span className={cn(
          'flex-1 text-xs font-semibold leading-snug',
          isActive ? 'text-blue-700' : 'text-slate-700',
          level === 0 && 'text-sm font-bold'
        )}>
          {node.title}
        </span>

        {/* Assignee avatar — always visible on active, hidden otherwise */}
        {assignee && isActive && (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: assignee.color }}
            title={assignee.name}
          >
            {assignee.initials[0]}
          </div>
        )}
      </div>

      {/* Meta row — shown on hover or active */}
      <div className={cn(
        'px-2 pb-2 flex items-center gap-2',
        isActive ? 'flex' : 'hidden group-hover:flex'
      )}>
        {/* Indent spacer */}
        <span className="w-5 shrink-0" />

        {/* Coverage bar */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <div className="flex-1 bg-slate-200 rounded-full h-1 overflow-hidden">
            <div
              className={cn('h-full rounded-full', COVERAGE_COLOR(node.coverageScore))}
              style={{ width: `${node.coverageScore}%` }}
            />
          </div>
          <span className={cn('text-xs font-medium shrink-0',
            node.coverageScore >= 80 ? 'text-emerald-600' : node.coverageScore >= 60 ? 'text-amber-500' : 'text-red-400'
          )}>
            {node.coverageScore}%
          </span>
        </div>

        {/* Hypotheses count */}
        {total > 0 && (
          <span className="text-xs text-slate-400 flex items-center gap-0.5 shrink-0">
            <Lightbulb className="w-3 h-3" />
            <span className="text-emerald-600 font-medium">{validated}</span>
            <span>/{total}</span>
          </span>
        )}

        {/* Deadline */}
        <span className={cn('text-xs font-medium shrink-0', DEADLINE_COLORS[node.deadlineStatus])}>
          {new Date(node.deadline).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

interface WorkstreamBoardProps {
  projectId: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function WorkstreamBoard({ projectId, isCollapsed, onToggleCollapse }: WorkstreamBoardProps) {
  const nodes = WORKSTREAM_NODES.filter(n => n.projectId === projectId);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['n0', 'n1', 'n2', 'n3', 'n4', 'n5']));

  // Collapsed view
  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col items-center py-4 border-r border-slate-200 bg-white">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors mb-4"
          title="Développer le workstream"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
        <div className="flex-1 overflow-y-auto space-y-2 px-2">
          {nodes.filter(n => n.level === 0).map(node => {
            const StatusIcon = STATUS_ICONS[node.status];
            return (
              <button
                key={node.id}
                onClick={onToggleCollapse}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                title={node.title}
              >
                <StatusIcon className={cn('w-4 h-4', STATUS_COLORS[node.status])} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getChildren = (parentId: string | null) =>
    nodes.filter(n => n.parentId === parentId).sort((a, b) => a.order - b.order);

  const renderNodes = (parentId: string | null, level: number): React.ReactNode => {
    const children = getChildren(parentId);
    if (children.length === 0) return null;

    return children.map(node => {
      const nodeChildren = getChildren(node.id);
      const hasChildren = nodeChildren.length > 0;
      const isExpanded = expanded.has(node.id);

      return (
        <div key={node.id} className="space-y-0.5">
          <NodeRow
            node={node}
            level={level}
            isExpanded={isExpanded}
            onToggle={() => toggleExpand(node.id)}
            hasChildren={hasChildren}
          />
          {hasChildren && isExpanded && (
            <div className="space-y-0.5">
              {renderNodes(node.id, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Workstream</span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Réduire le workstream"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-3 shrink-0">
        {[
          { icon: Clock, label: 'En cours', color: 'text-blue-500' },
          { icon: CheckCircle2, label: 'Terminé', color: 'text-emerald-500' },
          { icon: Circle, label: 'À débuter', color: 'text-slate-300' },
        ].map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-1 text-xs text-slate-400">
            <Icon className={cn('w-3 h-3', color)} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {renderNodes(null, 0)}
      </div>
    </div>
  );
}
