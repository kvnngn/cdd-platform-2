import { CheckCircle2, Clock, Circle, XCircle, ChevronRight, GitBranch } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { WORKSTREAM_NODES } from '../../data/mockData';
import { Hypothesis, HypothesisStatus } from '../../types';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';

const STATUS_ICONS: Record<HypothesisStatus, React.ComponentType<{ className?: string }>> = {
  validated: CheckCircle2,
  draft: Circle,
  on_hold: Clock,
  rejected: XCircle,
};

const STATUS_COLORS: Record<HypothesisStatus, string> = {
  validated: 'text-emerald-500',
  draft: 'text-slate-400',
  on_hold: 'text-amber-500',
  rejected: 'text-red-400',
};

interface HypothesisRowProps {
  hypothesis: Hypothesis;
  onSelect: (id: string) => void;
}

function HypothesisRow({ hypothesis: h, onSelect }: HypothesisRowProps) {
  const StatusIcon = STATUS_ICONS[h.status];
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-left group rounded-lg transition-colors"
      onClick={() => onSelect(h.id)}
    >
      <StatusIcon className={cn('w-4 h-4 shrink-0', STATUS_COLORS[h.status])} />
      <span className="flex-1 text-sm text-slate-700 font-medium leading-snug">{h.title}</span>
      <ConfidenceBadge score={h.confidence.overall} />
      <HypothesisBadge status={h.status} />
      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400 shrink-0" />
    </button>
  );
}

interface HypothesisTreeViewProps {
  projectId: string;
  onSelectHypothesis: (id: string) => void;
}

export function HypothesisTreeView({ projectId, onSelectHypothesis }: HypothesisTreeViewProps) {
  const { hypotheses } = useAppStore();
  const nodes = WORKSTREAM_NODES.filter(n => n.projectId === projectId);

  const rootNode = nodes.find(n => n.parentId === null);
  const level1Nodes = nodes.filter(n => n.level === 1);

  const getNodeHypotheses = (nodeId: string) =>
    hypotheses.filter(h => h.nodeId === nodeId && h.projectId === projectId);

  const stats = {
    total: hypotheses.filter(h => h.projectId === projectId).length,
    validated: hypotheses.filter(h => h.projectId === projectId && h.status === 'validated').length,
    avgConf: Math.round(
      hypotheses.filter(h => h.projectId === projectId).reduce((s, h) => s + h.confidence.overall, 0) /
      (hypotheses.filter(h => h.projectId === projectId).length || 1)
    ),
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <GitBranch className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Hypothesis Tree</h2>
        </div>
        {rootNode && (
          <div className="bg-slate-900 text-white rounded-xl px-5 py-4 mb-4">
            <div className="text-xs text-slate-400 mb-1">Thèse principale</div>
            <p className="text-sm font-medium">{rootNode.description}</p>
          </div>
        )}

        <div className="flex items-center gap-6">
          {[
            { label: 'Hypothèses totales', value: stats.total, color: 'text-slate-700' },
            { label: 'Validées', value: stats.validated, color: 'text-emerald-600' },
            { label: 'Confiance moyenne', value: `${stats.avgConf}%`, color: stats.avgConf >= 80 ? 'text-emerald-600' : 'text-amber-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg border border-slate-200 px-4 py-3 text-center">
              <div className={cn('text-xl font-bold', s.color)}>{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tree by driver */}
      <div className="space-y-6">
        {level1Nodes.map((node, idx) => {
          const nodeHypotheses = getNodeHypotheses(node.id);
          const childNodes = nodes.filter(n => n.parentId === node.id);
          const allChildHypotheses = childNodes.flatMap(cn => getNodeHypotheses(cn.id));
          const allHypotheses = [...nodeHypotheses, ...allChildHypotheses];

          if (allHypotheses.length === 0 && nodeHypotheses.length === 0) return null;

          return (
            <div key={node.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Driver header */}
              <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{node.title}</div>
                    <div className="text-xs text-slate-400">{allHypotheses.length} hypothèse{allHypotheses.length > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {allHypotheses.length > 0 && (
                    <ConfidenceBadge
                      score={Math.round(allHypotheses.reduce((s, h) => s + h.confidence.overall, 0) / allHypotheses.length)}
                    />
                  )}
                </div>
              </div>

              {/* Direct hypotheses */}
              {nodeHypotheses.length > 0 && (
                <div className="divide-y divide-slate-50">
                  {nodeHypotheses.map(h => (
                    <HypothesisRow key={h.id} hypothesis={h} onSelect={onSelectHypothesis} />
                  ))}
                </div>
              )}

              {/* Child node hypotheses */}
              {childNodes.map(childNode => {
                const childHypotheses = getNodeHypotheses(childNode.id);
                if (childHypotheses.length === 0) return null;
                return (
                  <div key={childNode.id} className="border-t border-slate-100">
                    <div className="px-4 py-2 bg-slate-50/50">
                      <span className="text-xs font-medium text-slate-500">{childNode.title}</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {childHypotheses.map(h => (
                        <div key={h.id} className="pl-4">
                          <HypothesisRow hypothesis={h} onSelect={onSelectHypothesis} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
