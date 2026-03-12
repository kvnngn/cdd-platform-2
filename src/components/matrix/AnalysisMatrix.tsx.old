import { useState, useMemo } from 'react';
import {
  Plus, Sparkles, Download, TableProperties,
  Hash, AlignLeft, List, ToggleLeft,
  MoreHorizontal, Pencil, Trash2,
  FileText, BarChart3, Globe, Database,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import { MatrixCell as MatrixCellType, MatrixColumnType, Source } from '../../types';
import { SOURCES, NODE_SOURCES } from '../../data/mockData';
import { MatrixCell } from './MatrixCell';
import { MatrixColumnPanel } from './MatrixColumnPanel';
import { AISuggestColumns } from './AISuggestColumns';

interface AnalysisMatrixProps {
  projectId: string;
  onPromoteToHypothesis: (cell: MatrixCellType, source: Source) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<MatrixColumnType, React.ElementType> = {
  text: AlignLeft,
  number: Hash,
  list: List,
  boolean: ToggleLeft,
};

const TYPE_LABELS: Record<MatrixColumnType, string> = {
  text: 'Texte',
  number: 'Nombre',
  list: 'Liste',
  boolean: 'Oui / Non',
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  data_room: Database,
  premium_report: BarChart3,
  web: Globe,
  api: Database,
  connector: Database,
  interview: FileText,
};

const CATEGORY_LABELS: Record<string, string> = {
  data_room: 'Data Room',
  premium_report: 'Rapport',
  web: 'Web',
  api: 'API',
  connector: 'Connecteur',
  interview: 'Interview',
};

function exportToCsv(
  nodeTitle: string,
  sourceIds: string[],
  columns: ReturnType<typeof useAppStore>['matrixColumns'],
  cells: ReturnType<typeof useAppStore>['matrixCells'],
  nodeId: string
) {
  const header = ['Source', 'Fiabilité', ...columns.filter(c => c.nodeId === nodeId).sort((a, b) => a.order - b.order).map(c => c.label)];
  const rows = sourceIds.map(sid => {
    const source = SOURCES.find(s => s.id === sid);
    const rowCols = columns.filter(c => c.nodeId === nodeId).sort((a, b) => a.order - b.order);
    const values = rowCols.map(col => {
      const cell = cells.find(c => c.columnId === col.id && c.sourceId === sid && c.nodeId === nodeId);
      return cell?.value ? `"${cell.value.replace(/"/g, '""')}"` : '';
    });
    return [
      `"${source?.title ?? sid}"`,
      source?.reliabilityScore ?? '',
      ...values,
    ].join(',');
  });
  const csv = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `matrix_${nodeTitle.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ─── Column Header Menu ────────────────────────────────────────────────────────

function ColumnHeaderMenu({
  columnId,
  onEdit,
  onDelete,
}: {
  columnId: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 opacity-0 group-hover/col:opacity-100 transition-opacity"
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
            <button
              onClick={() => { onEdit(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
            >
              <Pencil className="w-3 h-3" /> Modifier
            </button>
            <button
              onClick={() => { onDelete(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" /> Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function AnalysisMatrix({ projectId, onPromoteToHypothesis }: AnalysisMatrixProps) {
  const {
    nodes, matrixColumns, matrixCells,
    deleteMatrixColumn, generateMatrixCell,
  } = useAppStore();

  // Level-1 nodes for this project
  const level1Nodes = nodes.filter(n => n.projectId === projectId && n.level === 1);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(level1Nodes[0]?.id ?? '');

  // Panel states
  const [panelOpen, setPanelOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [prefillLabel, setPrefillLabel] = useState('');
  const [prefillPrompt, setPrefillPrompt] = useState('');

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Sources for selected node
  const sourceIds = NODE_SOURCES[selectedNodeId] ?? [];
  const sources = sourceIds.map(sid => SOURCES.find(s => s.id === sid)).filter(Boolean) as Source[];

  // Columns for selected node, sorted by order
  const columns = useMemo(
    () => matrixColumns.filter(c => c.nodeId === selectedNodeId).sort((a, b) => a.order - b.order),
    [matrixColumns, selectedNodeId]
  );

  const handleGenerateAll = () => {
    columns.forEach(col => {
      sourceIds.forEach(sid => {
        const existing = matrixCells.find(c => c.columnId === col.id && c.sourceId === sid && c.nodeId === selectedNodeId);
        if (!existing || existing.status === 'idle') {
          generateMatrixCell(col.id, sid, selectedNodeId);
        }
      });
    });
  };

  const handleDeleteColumn = (colId: string) => {
    if (confirm('Supprimer cette colonne et toutes ses cellules ?')) {
      deleteMatrixColumn(colId);
    }
  };

  const handleEditColumn = (colId: string) => {
    const col = matrixColumns.find(c => c.id === colId);
    if (col) {
      setPrefillLabel(col.label);
      setPrefillPrompt(col.prompt);
      setEditingColumnId(colId);
      setPanelOpen(true);
    }
  };

  const openNewColumn = () => {
    setPrefillLabel('');
    setPrefillPrompt('');
    setEditingColumnId(null);
    setPanelOpen(true);
  };

  const handleSuggestionSelect = (suggestion: { label: string; prompt: string }) => {
    setPrefillLabel(suggestion.label);
    setPrefillPrompt(suggestion.prompt);
    setEditingColumnId(null);
    setPanelOpen(true);
  };

  const COLUMN_WIDTH = 220;
  const SOURCE_COL_WIDTH = 220;

  // Stats
  const totalCells = columns.length * sourceIds.length;
  const doneCells = matrixCells.filter(c => c.nodeId === selectedNodeId && c.status === 'done').length;
  const promotedCells = matrixCells.filter(c => c.nodeId === selectedNodeId && c.hypothesisId).length;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Node tabs */}
      <div className="bg-white border-b border-slate-200 px-4 flex items-center gap-1 shrink-0 overflow-x-auto">
        {level1Nodes.map(node => (
          <button
            key={node.id}
            onClick={() => setSelectedNodeId(node.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors',
              selectedNodeId === node.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            <TableProperties className="w-3.5 h-3.5 shrink-0" />
            {node.title}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center gap-3 shrink-0">
        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-slate-400 flex-1">
          <span>{sources.length} sources</span>
          <span>·</span>
          <span>{columns.length} colonnes</span>
          {totalCells > 0 && (
            <>
              <span>·</span>
              <span className="text-emerald-500 font-medium">{doneCells}/{totalCells} générées</span>
            </>
          )}
          {promotedCells > 0 && (
            <>
              <span>·</span>
              <span className="text-blue-500 font-medium">{promotedCells} hypothèses</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {totalCells > doneCells && totalCells > 0 && (
            <button
              onClick={handleGenerateAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tout générer
            </button>
          )}

          {/* AI Suggestions */}
          <div className="relative">
            <button
              onClick={() => setSuggestOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              Suggestions IA
            </button>
            <AISuggestColumns
              isOpen={suggestOpen}
              onClose={() => setSuggestOpen(false)}
              nodeId={selectedNodeId}
              existingLabels={columns.map(c => c.label)}
              onSelect={handleSuggestionSelect}
            />
          </div>

          {/* Add column */}
          <button
            onClick={openNewColumn}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Colonne
          </button>

          {/* Export */}
          <button
            onClick={() => exportToCsv(selectedNode?.title ?? 'matrix', sourceIds, matrixColumns, matrixCells, selectedNodeId)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Exporter en CSV"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Matrix table */}
      <div className="flex-1 overflow-auto">
        {columns.length === 0 && sources.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <TableProperties className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Aucune donnée pour ce nœud</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Ajoutez des sources dans le panneau de recherche, puis créez des colonnes pour analyser vos documents.
              </p>
            </div>
          </div>
        ) : columns.length === 0 ? (
          /* Has sources but no columns */
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700">{sources.length} source{sources.length > 1 ? 's' : ''} prête{sources.length > 1 ? 's' : ''} à analyser</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Créez votre première colonne ou utilisez les suggestions IA pour commencer l'analyse.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSuggestOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-violet-200 text-violet-600 hover:bg-violet-50 font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Suggestions IA
              </button>
              <button
                onClick={openNewColumn}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Créer une colonne
              </button>
            </div>
          </div>
        ) : (
          /* Full table */
          <table className="border-collapse min-w-full" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: SOURCE_COL_WIDTH }} />
              {columns.map(col => (
                <col key={col.id} style={{ width: COLUMN_WIDTH }} />
              ))}
              <col style={{ width: 80 }} />
            </colgroup>

            {/* Header row */}
            <thead className="sticky top-0 z-10">
              <tr>
                {/* Source column header */}
                <th className="bg-slate-100 border border-slate-200 px-3 py-2.5 text-left sticky left-0 z-20">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Source</span>
                </th>

                {/* Prompt columns */}
                {columns.map(col => {
                  const TypeIcon = TYPE_ICONS[col.type];
                  return (
                    <th
                      key={col.id}
                      className="bg-slate-100 border border-slate-200 px-3 py-2.5 text-left group/col"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <TypeIcon className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-[11px] font-semibold text-slate-700 truncate" title={col.label}>
                            {col.label}
                          </span>
                          {col.aiSuggested && (
                            <Sparkles className="w-2.5 h-2.5 text-violet-400 shrink-0" title="Suggéré par l'IA" />
                          )}
                        </div>
                        <ColumnHeaderMenu
                          columnId={col.id}
                          onEdit={() => handleEditColumn(col.id)}
                          onDelete={() => handleDeleteColumn(col.id)}
                        />
                      </div>
                      <div className="mt-0.5">
                        <span className="text-[9px] text-slate-400">{TYPE_LABELS[col.type]}</span>
                      </div>
                    </th>
                  );
                })}

                {/* Add column button */}
                <th className="bg-slate-100 border border-slate-200 px-2 py-2.5">
                  <button
                    onClick={openNewColumn}
                    className="flex items-center justify-center w-full h-full text-slate-400 hover:text-blue-500 transition-colors"
                    title="Ajouter une colonne"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </th>
              </tr>
            </thead>

            {/* Source rows */}
            <tbody>
              {sources.map(source => {
                const CategoryIcon = CATEGORY_ICONS[source.category] ?? FileText;
                const reliabilityColor =
                  source.reliabilityScore >= 80 ? 'text-emerald-500' :
                  source.reliabilityScore >= 60 ? 'text-amber-500' :
                  'text-red-400';

                return (
                  <tr key={source.id} className="group/row hover:bg-blue-50/30 transition-colors">
                    {/* Source cell — sticky */}
                    <td className="bg-white group-hover/row:bg-blue-50/30 border border-slate-200 px-3 py-2 sticky left-0 z-10 transition-colors">
                      <div className="flex items-start gap-2">
                        <CategoryIcon className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium text-slate-800 truncate" title={source.title}>
                            {source.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] text-slate-400">
                              {CATEGORY_LABELS[source.category] ?? source.category}
                            </span>
                            <span className="text-[9px] text-slate-300">·</span>
                            <span className={cn('text-[9px] font-semibold', reliabilityColor)}>
                              {source.reliabilityScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Data cells */}
                    {columns.map(col => {
                      const cell = matrixCells.find(
                        c => c.columnId === col.id && c.sourceId === source.id && c.nodeId === selectedNodeId
                      );
                      return (
                        <td
                          key={col.id}
                          className="bg-white border border-slate-200 p-0 align-top"
                          style={{ height: 88 }}
                        >
                          <MatrixCell
                            cell={cell}
                            columnId={col.id}
                            sourceId={source.id}
                            nodeId={selectedNodeId}
                            onPromoteToHypothesis={(c) => onPromoteToHypothesis(c, source)}
                          />
                        </td>
                      );
                    })}

                    {/* Add column spacer */}
                    <td className="bg-white border border-slate-200" />
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Column panel */}
      <MatrixColumnPanel
        isOpen={panelOpen}
        onClose={() => { setPanelOpen(false); setEditingColumnId(null); }}
        nodeId={selectedNodeId}
        prefillLabel={prefillLabel}
        prefillPrompt={prefillPrompt}
      />
    </div>
  );
}
