import { useState } from 'react';
import { Play, RefreshCw, Sparkles, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MatrixCell as MatrixCellType, MatrixCellStatus } from '../../types';
import { useAppStore } from '../../store/appStore';

interface MatrixCellProps {
  cell: MatrixCellType | undefined;
  columnId: string;
  sourceId: string;
  nodeId: string;
  onPromoteToHypothesis: (cell: MatrixCellType) => void;
}

function HypothesisBadge({ hypothesisId }: { hypothesisId: string }) {
  const { hypotheses } = useAppStore();
  const hyp = hypotheses.find(h => h.id === hypothesisId);
  if (!hyp) return null;

  const statusConfig = {
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-500 border-slate-200' },
    validated: { label: 'Validée', className: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    rejected: { label: 'Rejetée', className: 'bg-red-50 text-red-500 border-red-200' },
    on_hold: { label: 'En attente', className: 'bg-amber-50 text-amber-600 border-amber-200' },
  };
  const cfg = statusConfig[hyp.status];

  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border',
      cfg.className
    )}>
      <CheckCircle2 className="w-2.5 h-2.5" />
      Hyp {cfg.label}
    </span>
  );
}

export function MatrixCell({ cell, columnId, sourceId, nodeId, onPromoteToHypothesis }: MatrixCellProps) {
  const { generateMatrixCell } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);

  const status: MatrixCellStatus = cell?.status ?? 'idle';

  const handleGenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    generateMatrixCell(columnId, sourceId, nodeId);
  };

  // ── Idle ──────────────────────────────────────────────────────────────────
  if (status === 'idle') {
    return (
      <div className="flex items-center justify-center h-full min-h-[72px] group/cell">
        <button
          onClick={handleGenerate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-400 text-xs font-medium transition-colors group-hover/cell:opacity-100 opacity-0 group-hover/cell:opacity-100"
        >
          <Play className="w-3 h-3" />
          Générer
        </button>
      </div>
    );
  }

  // ── Generating ────────────────────────────────────────────────────────────
  if (status === 'generating') {
    return (
      <div className="flex flex-col gap-1.5 p-3 min-h-[72px]">
        <div className="h-2.5 rounded bg-slate-200 animate-pulse w-full" />
        <div className="h-2.5 rounded bg-slate-200 animate-pulse w-4/5" />
        <div className="h-2.5 rounded bg-slate-200 animate-pulse w-3/5" />
        <div className="flex items-center gap-1 mt-1">
          <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />
          <span className="text-[10px] text-blue-400">Analyse en cours…</span>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="flex items-start gap-2 p-3 min-h-[72px]">
        <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-red-500">Erreur lors de la génération</p>
          <button
            onClick={handleGenerate}
            className="text-[10px] text-blue-500 hover:underline mt-0.5"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative h-full min-h-[72px] group/cell"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cell content */}
      <div className="p-3 h-full overflow-hidden">
        <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-4 whitespace-pre-line">
          {cell!.value}
        </p>
        {cell!.hypothesisId && (
          <div className="mt-1.5">
            <HypothesisBadge hypothesisId={cell!.hypothesisId} />
          </div>
        )}
      </div>

      {/* Hover overlay */}
      {isHovered && !cell!.hypothesisId && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 rounded">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPromoteToHypothesis(cell!);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            → Hypothèse
          </button>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            Regénérer
          </button>
        </div>
      )}

      {/* Already has hypothesis — show badge on hover */}
      {isHovered && cell!.hypothesisId && (
        <div className="absolute bottom-2 right-2">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600"
          >
            <RefreshCw className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </div>
  );
}
