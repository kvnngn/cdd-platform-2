import { useState, useRef, useEffect } from 'react';
import {
  ChevronRight, ChevronDown, Circle, CheckCircle2, AlertTriangle,
  Clock, Lightbulb, Plus, PanelLeftOpen, PanelLeftClose,
  Trash2, Check, X, MessageSquare
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { WorkstreamNode, NodeStatus } from '../../types';
import { useAppStore } from '../../store/appStore';
import { getUserById } from '../../data/users';
import { NodeCommentsPanel } from './NodeCommentsPanel';

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

// Fonction pour calculer le numéro hiérarchique d'un node (même logique que le graph)
const getHierarchicalNumber = (node: WorkstreamNode, allNodes: WorkstreamNode[]): string => {
  const buildNumber = (nodeId: string, accumulated: number[] = []): number[] => {
    const current = allNodes.find(n => n.id === nodeId);
    if (!current) return accumulated;

    // Le root n'a pas de numéro (level 0)
    if (current.level === 0) {
      return accumulated;
    }

    // Ajouter l'order du node actuel
    const newAccumulated = [current.order, ...accumulated];

    // Si on a un parent, continuer récursivement
    if (current.parentId) {
      return buildNumber(current.parentId, newAccumulated);
    }

    return newAccumulated;
  };

  const numbers = buildNumber(node.id);
  return numbers.length > 0 ? numbers.join('.') : '';
};

interface NodeRowProps {
  node: WorkstreamNode;
  level: number;
  isExpanded: boolean;
  onToggle: () => void;
  hasChildren: boolean;
  onAddChild: (parentId: string) => void;
  onOpenComments: (nodeId: string) => void;
  commentCount: number;
  onCreateHypothesis?: (nodeId: string) => void;
  nodeNumber: string;
}

function NodeRow({ node, level, isExpanded, onToggle, hasChildren, onAddChild, onOpenComments, commentCount, onCreateHypothesis, nodeNumber }: NodeRowProps) {
  const { selectedNodeId, setSelectedNode, hypotheses, updateNode, addNodeVersion, deleteNode, currentUser } = useAppStore();
  const isActive = selectedNodeId === node.id;
  const StatusIcon = STATUS_ICONS[node.status];
  const assignee = node.assigneeId ? getUserById(node.assigneeId) : null;

  const nodeHypotheses = hypotheses.filter(h => h.nodeId === node.id);
  const validated = nodeHypotheses.filter(h => h.status === 'validated').length;
  const total = nodeHypotheses.length;

  const indent = level * 14;

  // Inline rename state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Delete confirmation state
  const [pendingDelete, setPendingDelete] = useState(false);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const commitRename = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== node.title) {
      updateNode(node.id, { title: trimmed });
      if (currentUser) {
        addNodeVersion({
          nodeId: node.id,
          version: Date.now(),
          title: trimmed,
          changedBy: currentUser.id,
          changedAt: new Date().toISOString(),
          changeNote: `Renommé de "${node.title}"`,
        });
      }
    } else {
      setEditTitle(node.title); // reset if empty
    }
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'rounded-lg cursor-pointer group transition-all border',
        isActive
          ? 'bg-blue-50 border-blue-200 shadow-sm'
          : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
      )}
      style={{ marginLeft: `${indent}px` }}
      onClick={() => !isEditing && setSelectedNode(node.id)}
    >
      {/* Main row */}
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

        {/* Node number */}
        <span className={cn(
          'font-mono text-xs shrink-0 min-w-[2rem] text-right',
          isActive ? 'text-blue-600 font-semibold' : 'text-slate-400'
        )}>
          {nodeNumber}
        </span>

        {/* Status icon */}
        <StatusIcon className={cn('w-3.5 h-3.5 shrink-0', STATUS_COLORS[node.status])} />

        {/* Title — inline edit on double-click */}
        {isEditing ? (
          <input
            ref={inputRef}
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') { setEditTitle(node.title); setIsEditing(false); }
            }}
            onClick={e => e.stopPropagation()}
            className={cn(
              'flex-1 text-xs font-semibold bg-white border border-blue-300 rounded px-1 outline-none',
              level === 0 && 'text-sm font-bold'
            )}
          />
        ) : (
          <span
            className={cn(
              'flex-1 text-xs font-semibold leading-snug select-none',
              isActive ? 'text-blue-700' : 'text-slate-700',
              level === 0 && 'text-sm font-bold'
            )}
            onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            title="Double-cliquer pour renommer"
          >
            {node.title}
          </span>
        )}

        {/* Assignee avatar */}
        {assignee && isActive && (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: assignee.color }}
            title={assignee.name}
          >
            {assignee.initials[0]}
          </div>
        )}

        {/* Action buttons — visible on hover, hidden otherwise */}
        {!isEditing && !pendingDelete && (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
            {/* Add child */}
            <button
              onClick={e => { e.stopPropagation(); onAddChild(node.id); }}
              className="p-0.5 rounded text-slate-300 hover:text-blue-500 transition-colors"
              title="Add sub-node"
            >
              <Plus className="w-3 h-3" />
            </button>
            {/* Create hypothesis */}
            {onCreateHypothesis && (
              <button
                onClick={e => { e.stopPropagation(); onCreateHypothesis(node.id); }}
                className="p-0.5 rounded text-slate-300 hover:text-violet-500 transition-colors"
                title="Create hypothesis"
              >
                <Lightbulb className="w-3 h-3" />
              </button>
            )}
            {/* Comments */}
            <button
              onClick={e => { e.stopPropagation(); onOpenComments(node.id); }}
              className="p-0.5 rounded text-slate-300 hover:text-amber-500 transition-colors relative"
              title="Commentaires"
            >
              <MessageSquare className="w-3 h-3" />
              {commentCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
              )}
            </button>
            {/* Delete (not root) */}
            {node.level > 0 && (
              <button
                onClick={e => { e.stopPropagation(); setPendingDelete(true); }}
                className="p-0.5 rounded text-slate-300 hover:text-red-400 transition-colors"
                title="Supprimer le nœud"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Delete confirmation inline */}
        {pendingDelete && (
          <div className="flex items-center gap-1 ml-1" onClick={e => e.stopPropagation()}>
            <span className="text-[11px] text-red-500 font-medium">Supprimer ?</span>
            <button
              onClick={() => deleteNode(node.id)}
              className="p-0.5 text-red-500 hover:text-red-700 transition-colors"
            >
              <Check className="w-3 h-3" />
            </button>
            <button
              onClick={() => setPendingDelete(false)}
              className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Meta row — shown on hover or active */}
      <div className={cn(
        'px-2 pb-2 flex items-center gap-2',
        isActive ? 'flex' : 'hidden group-hover:flex'
      )}>
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
          {new Date(node.deadline).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

interface WorkstreamBoardProps {
  projectId: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onCreateHypothesis?: (nodeId: string) => void;
}

export function WorkstreamBoard({ projectId, isCollapsed, onToggleCollapse, onCreateHypothesis }: WorkstreamBoardProps) {
  const { nodes: allNodes, addNode, nodeComments, projects } = useAppStore();
  const nodes = allNodes.filter(n => n.projectId === projectId);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Auto-expand all nodes on first load
    const initial = new Set<string>();
    allNodes.filter(n => n.projectId === projectId).forEach(n => initial.add(n.id));
    return initial;
  });
  const [commentsNodeId, setCommentsNodeId] = useState<string | null>(null);

  const project = projects.find(p => p.id === projectId);

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

  const handleAddChild = (parentId: string) => {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;
    const siblings = nodes.filter(n => n.parentId === parentId);
    const newNode: WorkstreamNode = {
      id: `${projectId}-custom-${Date.now()}`,
      projectId,
      parentId,
      title: 'Nouveau nœud',
      description: '',
      level: parent.level + 1,
      order: siblings.length + 1,
      status: 'not_started',
      assigneeId: null,
      deadline: project?.deadline ?? new Date().toISOString(),
      deadlineStatus: 'ok',
      coverageScore: 0,
      sourceCount: 0,
      hypothesisCount: 0,
      validatedCount: 0,
    };
    addNode(newNode);
    // Auto-expand parent
    setExpanded(prev => new Set(prev).add(parentId));
  };

  const commentsNode = commentsNodeId ? nodes.find(n => n.id === commentsNodeId) : null;

  const renderNodes = (parentId: string | null, level: number): React.ReactNode => {
    const children = getChildren(parentId);
    if (children.length === 0) return null;

    return children.map((node) => {
      const nodeChildren = getChildren(node.id);
      const hasChildren = nodeChildren.length > 0;
      const isExpandedNode = expanded.has(node.id);
      const nodeCommentCount = nodeComments.filter(c => c.nodeId === node.id && !c.resolved).length;

      // Calculate hierarchical number using the same logic as the graph
      const nodeNumber = getHierarchicalNumber(node, nodes);

      return (
        <div key={node.id} className="space-y-0.5">
          <NodeRow
            node={node}
            level={level}
            isExpanded={isExpandedNode}
            onToggle={() => toggleExpand(node.id)}
            hasChildren={hasChildren}
            onAddChild={handleAddChild}
            onOpenComments={(id) => setCommentsNodeId(prev => prev === id ? null : id)}
            commentCount={nodeCommentCount}
            onCreateHypothesis={onCreateHypothesis}
            nodeNumber={nodeNumber}
          />
          {hasChildren && isExpandedNode && (
            <div className="space-y-0.5">
              {renderNodes(node.id, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Workstream</span>
        <div className="flex items-center gap-1">
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
          { icon: Clock, label: 'In Progress', color: 'text-blue-500' },
          { icon: CheckCircle2, label: 'Complete', color: 'text-emerald-500' },
          { icon: Circle, label: 'Not Started', color: 'text-slate-300' },
        ].map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-1 text-xs text-slate-400">
            <Icon className={cn('w-3 h-3', color)} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-2">
          <p className="text-xs text-slate-400 leading-relaxed">
            No workstream defined.<br />Use the scoping agent to generate the tree structure.
          </p>
        </div>
      )}

      {/* Tree */}
      {nodes.length > 0 && (
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {renderNodes(null, 0)}
        </div>
      )}

      {/* Node Comments Panel (slide-in within column) */}
      {commentsNodeId && commentsNode && (
        <NodeCommentsPanel
          nodeId={commentsNodeId}
          nodeTitle={commentsNode.title}
          onClose={() => setCommentsNodeId(null)}
        />
      )}
    </div>
  );
}
