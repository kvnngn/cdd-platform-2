import { X } from 'lucide-react';
import { HypothesisDetail } from './HypothesisDetail';
import type { Hypothesis } from '../../types';

interface HypothesisGraphSidebarProps {
  hypothesis: Hypothesis | null;
  onClose: () => void;
}

export function HypothesisGraphSidebar({
  hypothesis,
  onClose,
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
        <>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
            <h3 className="font-semibold text-slate-800">Détails de l'hypothèse</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Content - Reuse existing HypothesisDetail */}
          <div className="p-4">
            <HypothesisDetail hypothesis={hypothesis} onClose={onClose} />
          </div>
        </>
      )}
    </div>
  );
}
