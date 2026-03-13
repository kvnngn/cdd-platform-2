import { useState } from 'react';
import {
  CheckCircle2, Clock, Circle, XCircle, ChevronRight, GitBranch,
  X, Tag, History, Link2, AlertTriangle, TrendingUp, MessageSquare,
  ArrowRight, ChevronDown, ChevronUp, Network, List, FileText
} from 'lucide-react';
import { cn, formatDate, formatDateTime, getStatusLabel, getSourceCategoryLabel } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { WORKSTREAM_NODES } from '@/data/mockData';
import { Hypothesis, HypothesisStatus } from '@/types';
import { HypothesisBadge, ConfidenceBadge } from '../ui/Badge';
import { ConfidenceBreakdown } from '../ui/ConfidenceBar';
import { Avatar } from '../ui/Avatar';
import { getUserById } from '@/data/users';
import { getSourceById } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { HypothesisGraphView } from './HypothesisGraphView';

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

// --- Inline detail panel for a hypothesis ---

function InlineHypothesisDetail({ hypothesis: h, onClose }: { hypothesis: Hypothesis; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'confidence' | 'history' | 'comments'>('overview');
  const { currentUser, updateHypothesisStatus } = useAppStore();
  const canValidate = currentUser?.role === 'manager';

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'confidence', label: 'Confidence' },
    { id: 'history', label: `History (${h.versions.length})` },
    { id: 'comments', label: `Comments (${h.comments.length})` },
  ] as const;

  return (
    <div className="mb-4 bg-white border-l-3 border-l-blue-500 border-y border-r border-slate-200 animate-in slide-in-from-top-2 duration-200">
      {/* Header actions */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          {h.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200">
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {h.validatedBy && (
            <span className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Validated by {getUserById(h.validatedBy)?.name?.split(' ')[0]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Actions */}
          {canValidate && (
            <>
              {h.status !== 'validated' && (
                <button
                  onClick={() => updateHypothesisStatus(h.id, 'validated')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Validate
                </button>
              )}
              {h.status !== 'rejected' && (
                <button
                  onClick={() => updateHypothesisStatus(h.id, 'rejected')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Reject
                </button>
              )}
              {h.status !== 'on_hold' && (
                <button
                  onClick={() => updateHypothesisStatus(h.id, 'on_hold')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" />
                  On Hold
                </button>
              )}
            </>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="flex gap-1 px-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2.5 text-xs font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-500'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 pb-5 max-h-[500px] overflow-y-auto bg-white">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hypothesis Body */}
            <div>
              <p className="text-sm text-slate-700 leading-relaxed">{h.body}</p>
            </div>

            {/* Sources Section */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4 border-l-3 border-amber-500 pl-3">
                Sources ({(h.sources || []).length + (h.sourceIds || []).filter(id => !(h.sources || []).some(s => s.sourceId === id)).length})
              </h4>
              <div className="space-y-6">
                {/* Rich sources with excerpts */}
                {(h.sources || []).map(hs => {
                  const src = getSourceById(hs.sourceId);
                  if (!src) return null;
                  return (
                    <div key={hs.sourceId} className="border-l-3 border-amber-500 pl-4">
                      {/* Source header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 text-sm">{src.title}</div>
                            <div className="text-slate-500 text-xs mt-0.5">{getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={cn('font-bold text-sm', src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-600')}>
                            {src.reliabilityScore}%
                          </div>
                          <div className="text-xs text-slate-400">reliability</div>
                        </div>
                      </div>
                      {/* Excerpt */}
                      {hs.excerpt && (
                        <div className="mb-2">
                          <p className="text-sm text-slate-600 leading-relaxed italic pl-6">"{hs.excerpt}"</p>
                        </div>
                      )}
                      {/* Note */}
                      {hs.note && (
                        <div className="text-slate-500 text-xs pl-6">
                          <span className="font-medium">Analyst Note:</span> {hs.note}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Legacy sources without excerpts */}
                {(h.sourceIds || []).filter(sid => !(h.sources || []).some(s => s.sourceId === sid)).map(sid => {
                  const src = getSourceById(sid);
                  if (!src) return null;
                  return (
                    <div key={sid} className="border-l-3 border-slate-300 pl-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 text-sm">{src.title}</div>
                            <div className="text-slate-500 text-xs mt-0.5">{getSourceCategoryLabel(src.category)} · {formatDate(src.publishedAt)}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={cn('font-bold text-sm', src.reliabilityScore >= 80 ? 'text-emerald-600' : 'text-amber-600')}>
                            {src.reliabilityScore}%
                          </div>
                          <div className="text-xs text-slate-400">reliability</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'confidence' && (
          <div className="space-y-5">
            <div className="flex items-center gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 shrink-0">
                <div className={cn(
                  'text-3xl font-bold mb-0.5',
                  h.confidence.overall >= 80 ? 'text-emerald-600' : h.confidence.overall >= 65 ? 'text-amber-500' : 'text-red-500'
                )}>
                  {h.confidence.overall}%
                </div>
                <div className="text-xs text-slate-400">Overall</div>
              </div>
              <div className="flex-1">
                <ConfidenceBreakdown breakdown={h.confidence} />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Score Evolution</div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={h.confidenceHistory}>
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={d => d.slice(5)} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} width={28} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`${v}%`]} />
                    <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" />
                    <ReferenceLine y={65} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            {h.versions.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No previous versions</p>
            ) : (
              h.versions.map((v, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600">Version {v.version}</span>
                    <span className="text-xs text-slate-400">{formatDateTime(v.changedAt)}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{v.content}</p>
                  <div className="flex items-center gap-2">
                    <Avatar userId={v.changedBy} size="sm" />
                    <span className="text-xs text-slate-400">{v.changeNote}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-3">
            {h.comments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No comments</p>
            ) : (
              h.comments.map(c => (
                <div key={c.id} className={cn('border rounded-lg p-3', c.resolved ? 'bg-slate-50 border-slate-200' : 'bg-amber-50 border-amber-200')}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar userId={c.authorId} size="sm" showName />
                    </div>
                    <div className="flex items-center gap-2">
                      {c.resolved && <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Resolved</span>}
                      <span className="text-xs text-slate-400">{formatDateTime(c.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{c.content}</p>
                </div>
              ))
            )}
            <div className="mt-4">
              <textarea
                placeholder="Add a comment..."
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 bg-white"
                rows={2}
              />
              <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Hypothesis row in the tree ---

interface HypothesisRowProps {
  hypothesis: Hypothesis;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function HypothesisRow({ hypothesis: h, isSelected, onSelect }: HypothesisRowProps) {
  const StatusIcon = STATUS_ICONS[h.status];
  const totalSources = (h.sources || []).length + (h.sourceIds || []).filter(id => !(h.sources || []).some(s => s.sourceId === id)).length;

  return (
    <button
      className={cn(
        'w-full flex items-center gap-4 py-3 text-left group transition-all border-b border-slate-100',
        isSelected
          ? 'bg-blue-50 border-b-0 border-l-4 border-l-blue-500 pl-5 pr-6'
          : 'hover:bg-slate-50 px-6'
      )}
      onClick={() => onSelect(h.id)}
    >
      <StatusIcon className={cn('w-4 h-4 shrink-0', STATUS_COLORS[h.status])} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            'text-sm font-medium leading-snug',
            isSelected ? 'text-blue-700' : 'text-slate-800'
          )}>
            {h.title}
          </span>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Avatar userId={h.createdBy} size="sm" />
            <span>{getUserById(h.createdBy)?.name?.split(' ')[0]}</span>
          </div>
          <span>·</span>
          <span>{formatDate(h.createdAt)}</span>
          {totalSources > 0 && (
            <>
              <span>·</span>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span className="font-medium">{totalSources} source{totalSources > 1 ? 's' : ''}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfidenceBadge score={h.confidence.overall} />
      <HypothesisBadge status={h.status} />
      <ChevronDown className={cn(
        'w-4 h-4 shrink-0 transition-transform',
        isSelected ? 'text-blue-500 rotate-180' : 'text-slate-400 group-hover:text-slate-600'
      )} />
    </button>
  );
}

// --- Main tree view ---

interface HypothesisTreeViewProps {
  projectId: string;
  onSelectHypothesis?: (id: string) => void;
}

export function HypothesisTreeView({ projectId }: HypothesisTreeViewProps) {
  const { hypotheses } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph'); // Default to graph view
  const nodes = WORKSTREAM_NODES.filter(n => n.projectId === projectId);

  const rootNode = nodes.find(n => n.parentId === null);
  const level1Nodes = nodes.filter(n => n.level === 1);

  const getNodeHypotheses = (nodeId: string) =>
    hypotheses.filter(h => h.nodeId === nodeId && h.projectId === projectId);

  const projectHypotheses = hypotheses.filter(h => h.projectId === projectId);

  const stats = {
    total: projectHypotheses.length,
    validated: projectHypotheses.filter(h => h.status === 'validated').length,
    draft: projectHypotheses.filter(h => h.status === 'draft').length,
    onHold: projectHypotheses.filter(h => h.status === 'on_hold').length,
    avgConf: Math.round(
      projectHypotheses.reduce((s, h) => s + h.confidence.overall, 0) / (projectHypotheses.length || 1)
    ),
  };

  const selectedHypothesis = selectedId ? projectHypotheses.find(h => h.id === selectedId) : null;

  const handleSelect = (id: string) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <GitBranch className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Hypothesis Tree</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{stats.total} hypotheses</span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs text-emerald-600 font-medium">{stats.validated} validated</span>
            {stats.onHold > 0 && (
              <>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-amber-500 font-medium">{stats.onHold} on hold</span>
              </>
            )}
            {stats.draft > 0 && (
              <>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">{stats.draft} draft</span>
              </>
            )}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('graph')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              viewMode === 'graph'
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            )}
          >
            <Network className="w-4 h-4" />
            Graph
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              viewMode === 'list'
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            )}
          >
            <List className="w-4 h-4" />
            List
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'graph' ? (
          // Graph view - DEFAULT for consultants
          <HypothesisGraphView projectId={projectId} />
        ) : (
          // List view - Secondary for detailed reading
          <div className="p-6 overflow-y-auto h-full">
            {/* Tree by driver */}
            <div className="space-y-4">
        {level1Nodes.map((node, idx) => {
          const nodeHypotheses = getNodeHypotheses(node.id);
          const childNodes = nodes.filter(n => n.parentId === node.id);
          const allChildHypotheses = childNodes.flatMap(cn => getNodeHypotheses(cn.id));
          const allHypotheses = [...nodeHypotheses, ...allChildHypotheses];

          if (allHypotheses.length === 0 && nodeHypotheses.length === 0) return null;

          return (
            <div key={node.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              {/* Driver header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-base">{node.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{allHypotheses.length} hypothesis{allHypotheses.length > 1 ? 'es' : ''}</div>
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
                <div>
                  {nodeHypotheses.map(h => (
                    <div key={h.id}>
                      <HypothesisRow
                        hypothesis={h}
                        isSelected={selectedId === h.id}
                        onSelect={handleSelect}
                      />
                      {selectedId === h.id && selectedHypothesis && (
                        <InlineHypothesisDetail
                          hypothesis={selectedHypothesis}
                          onClose={() => setSelectedId(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Child node hypotheses */}
              {childNodes.map(childNode => {
                const childHypotheses = getNodeHypotheses(childNode.id);
                if (childHypotheses.length === 0) return null;
                return (
                  <div key={childNode.id} className="border-t border-slate-200 bg-slate-50/30">
                    <div className="px-6 py-2.5">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{childNode.title}</span>
                    </div>
                    {childHypotheses.map(h => (
                      <div key={h.id}>
                        <HypothesisRow
                          hypothesis={h}
                          isSelected={selectedId === h.id}
                          onSelect={handleSelect}
                        />
                        {selectedId === h.id && selectedHypothesis && (
                          <InlineHypothesisDetail
                            hypothesis={selectedHypothesis}
                            onClose={() => setSelectedId(null)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
