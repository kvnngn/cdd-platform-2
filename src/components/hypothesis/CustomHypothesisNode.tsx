import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { getUserById } from '@/data/users';
import { cn } from '@/lib/utils';
import { GitBranch, FileText } from 'lucide-react';
import ReactDOM from 'react-dom';

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Mini Avatar component for graph nodes
function MiniAvatar({ userId }: { userId: string }) {
  const user = getUserById(userId);
  const [imageError, setImageError] = useState(false);

  if (!user) return null;

  const showImage = user.avatar && !imageError;

  return (
    <div
      className={cn(
        'w-5 h-5 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-white/30',
        !showImage && 'text-white text-[8px] font-semibold'
      )}
      style={!showImage ? { backgroundColor: user.color } : undefined}
      title={user.name}
    >
      {showImage ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        user.initials
      )}
    </div>
  );
}

export const CustomHypothesisNode = memo(({ data, selected }: NodeProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    data.onMouseEnter?.();
    const rect = e.currentTarget.getBoundingClientRect();
    // Position tooltip above and to the right of the node
    // Approximate tooltip height: ~250px, position it above
    setTooltipPosition({
      x: rect.left + (rect.width * 0.7), // Align to right side of node
      y: rect.top - 10, // Above the node with small gap
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    data.onMouseLeave?.();
    setShowTooltip(false);
  };

  const relationsCount = data.relationsCount || 0;
  const sourcesCount = data.sourcesCount || 0;

  return (
    <>
    <div
      className="px-3 py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: data.backgroundColor,
        color: data.color || 'white',
        borderRadius: '6px',
        border: selected ? '2px solid #3b82f6' : data.border || '1px solid rgba(255,255,255,0.3)',
        boxShadow: data.boxShadow || (selected ? '0 4px 12px rgba(59, 130, 246, 0.4)' : '0 1px 2px rgba(0,0,0,0.2)'),
        width: '280px',
        height: '70px',
        fontSize: '11px',
        overflow: 'hidden',
        transition: 'all 0.15s ease-out',
      }}
    >
      {/* Handle à GAUCHE pour connexions depuis workstream - INVISIBLE */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
          opacity: 0, // Invisible mais fonctionnel
          width: '8px',
          height: '8px',
        }}
      />

      {/* Handle à DROITE pour relations entre hypothèses (source ET target) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          background: '#64748b',
          width: '8px',
          height: '8px',
          border: '2px solid white',
        }}
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{
          background: '#64748b',
          width: '8px',
          height: '8px',
          border: '2px solid white',
        }}
      />

      <div className="text-white h-full flex flex-col justify-between py-1 px-1">
        <div className="text-[11px] font-medium overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}>
          {data.label}
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center gap-1.5">
            {data.updatedBy && <MiniAvatar userId={data.updatedBy} />}
            <span className="text-[8px] opacity-70">
              {data.updatedAt ? formatRelativeTime(data.updatedAt) : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <GitBranch className="w-3 h-3 opacity-70" />
              <span className="text-[9px] opacity-70">{relationsCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <FileText className="w-3 h-3 opacity-70" />
              <span className="text-[9px] opacity-70">{sourcesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Tooltip rendered in portal */}
    {showTooltip && data.tooltip && ReactDOM.createPortal(
      <div
        className="fixed z-[9999] bg-slate-800 text-white rounded-lg shadow-xl border border-slate-700 p-3 max-w-xs animate-in fade-in duration-150"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          transform: 'translateY(-100%)', // Position above the anchor point
        }}
      >
        <div className="space-y-2">
          {/* Relations */}
          {data.tooltip.relations && data.tooltip.relations.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-300">Relations ({data.tooltip.relations.length})</span>
              </div>
              <div className="space-y-1 pl-5">
                {data.tooltip.relations.map((rel: any, i: number) => (
                  <div key={i} className="text-[11px]">
                    <span className={cn(
                      'font-medium',
                      rel.type === 'supports' && 'text-emerald-400',
                      rel.type === 'contradicts' && 'text-red-400',
                      rel.type === 'nuances' && 'text-amber-400'
                    )}>
                      {rel.type === 'supports' ? 'Supports' : rel.type === 'contradicts' ? 'Contradicts' : 'Nuances'}
                    </span>
                    <span className="text-slate-400"> → </span>
                    <span className="text-slate-300">{rel.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          {data.tooltip.sources && data.tooltip.sources.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-300">Sources ({data.tooltip.sources.length})</span>
              </div>
              <div className="space-y-0.5 pl-5">
                {data.tooltip.sources.map((source: any, i: number) => (
                  <div key={i} className="text-[11px] text-slate-300 truncate">
                    • {source.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confidence */}
          {data.tooltip.confidence !== undefined && (
            <div className="pt-1 border-t border-slate-700">
              <span className="text-[10px] text-slate-400">Confidence: </span>
              <span className={cn(
                "text-[10px] font-semibold",
                data.tooltip.confidence >= 80 ? 'text-emerald-400' :
                data.tooltip.confidence >= 60 ? 'text-amber-400' : 'text-red-400'
              )}>
                {data.tooltip.confidence}%
              </span>
            </div>
          )}
        </div>
      </div>,
      document.body
    )}
    </>
  );
});

CustomHypothesisNode.displayName = 'CustomHypothesisNode';
