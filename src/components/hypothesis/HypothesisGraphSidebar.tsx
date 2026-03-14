import { HypothesisDetail } from './HypothesisDetail';
import type { Hypothesis } from '@/types';

interface HypothesisGraphSidebarProps {
  hypothesis: Hypothesis | null;
  onClose: () => void;
  onNavigateToHypothesis?: (hypothesisId: string) => void;
}

export function HypothesisGraphSidebar({
  hypothesis,
  onClose,
  onNavigateToHypothesis,
}: HypothesisGraphSidebarProps) {
  const isOpen = hypothesis !== null;

  return (
    <div
      className={`h-full bg-white shadow-2xl border-l border-slate-200 overflow-y-auto transition-all duration-300 ${
        isOpen ? 'w-[450px]' : 'w-0'
      }`}
      style={{ minWidth: isOpen ? '450px' : '0' }}
    >
      {isOpen && hypothesis && (
        <HypothesisDetail
          hypothesis={hypothesis}
          onClose={onClose}
          onNavigateToHypothesis={onNavigateToHypothesis}
        />
      )}
    </div>
  );
}
