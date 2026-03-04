import { cn } from '../../lib/utils';
import { getUserById } from '../../data/users';

interface AvatarProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function Avatar({ userId, size = 'md', showName = false, className }: AvatarProps) {
  const user = getUserById(userId);
  if (!user) return null;

  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn('rounded-full flex items-center justify-center text-white font-semibold shrink-0', sizes[size])}
        style={{ backgroundColor: user.color }}
        title={user.name}
      >
        {user.initials}
      </div>
      {showName && <span className="text-sm text-slate-700">{user.name}</span>}
    </div>
  );
}

interface AvatarGroupProps {
  userIds: string[];
  max?: number;
}

export function AvatarGroup({ userIds, max = 4 }: AvatarGroupProps) {
  const visible = userIds.slice(0, max);
  const remaining = userIds.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((id) => {
        const user = getUserById(id);
        if (!user) return null;
        return (
          <div
            key={id}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
            style={{ backgroundColor: user.color }}
            title={user.name}
          >
            {user.initials}
          </div>
        );
      })}
      {remaining > 0 && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200 text-slate-600 text-xs font-semibold border-2 border-white">
          +{remaining}
        </div>
      )}
    </div>
  );
}
