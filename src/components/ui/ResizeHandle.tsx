import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ResizeHandle({
  onMouseDown,
  isDragging,
  isCollapsed,
  onToggleCollapse,
}: ResizeHandleProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 group/handle',
        isDragging ? 'w-1' : 'w-0'
      )}
    >
      {/* Drag zone — wider invisible hit area */}
      <div
        onMouseDown={onMouseDown}
        className={cn(
          'absolute inset-y-0 -left-[3px] w-[7px] z-30 cursor-col-resize',
          'flex items-center justify-center',
          // Visual feedback line
          'after:absolute after:inset-y-0 after:left-[3px] after:w-px',
          'after:bg-slate-200',
          isDragging
            ? 'after:bg-blue-500 after:w-[2px] after:left-[2.5px]'
            : 'hover:after:bg-blue-400 hover:after:w-[2px] hover:after:left-[2.5px]',
          'transition-colors'
        )}
      >
        {/* Drag dots indicator — visible on hover */}
        <div className={cn(
          'absolute z-40 flex flex-col gap-[3px] items-center',
          'opacity-0 group-hover/handle:opacity-100 transition-opacity',
          isDragging && 'opacity-100'
        )}>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={cn(
                'w-1 h-1 rounded-full',
                isDragging ? 'bg-blue-500' : 'bg-slate-400'
              )}
            />
          ))}
        </div>
      </div>

      {/* Collapse/expand toggle button */}
      <button
        onClick={onToggleCollapse}
        className={cn(
          'absolute top-2 z-40 w-5 h-5 rounded-full',
          'bg-white border border-slate-200 shadow-sm',
          'flex items-center justify-center',
          'text-slate-400 hover:text-blue-500 hover:border-blue-300',
          'transition-all duration-150',
          '-left-2.5',
          // Always visible when collapsed, hover-only when expanded
          isCollapsed
            ? 'opacity-100'
            : 'opacity-0 group-hover/handle:opacity-100',
        )}
      >
        {isCollapsed ? (
          <PanelRightOpen className="w-3 h-3" />
        ) : (
          <PanelRightClose className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}
