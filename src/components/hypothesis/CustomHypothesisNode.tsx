import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { getUserById } from '@/data/users';
import { cn } from '@/lib/utils';

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
  return (
    <div
      className="px-3 py-2"
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
          <span className="text-[9px] text-blue-200 opacity-70">
            Hypothesis {data.hypothesisId?.replace('h', '')}
          </span>
        </div>
      </div>
    </div>
  );
});

CustomHypothesisNode.displayName = 'CustomHypothesisNode';
