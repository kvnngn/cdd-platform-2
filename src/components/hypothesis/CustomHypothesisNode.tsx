import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const CustomHypothesisNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className="px-3 py-2"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.color || 'white',
        borderRadius: '6px',
        border: selected ? '2px solid #3b82f6' : data.border || '1px solid rgba(255,255,255,0.3)',
        boxShadow: selected ? '0 4px 12px rgba(59, 130, 246, 0.4)' : '0 1px 2px rgba(0,0,0,0.2)',
        width: '280px',
        height: '70px',
        fontSize: '11px',
        overflow: 'hidden',
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

      {data.label}
    </div>
  );
});

CustomHypothesisNode.displayName = 'CustomHypothesisNode';
