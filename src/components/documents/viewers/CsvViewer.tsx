import React, { useMemo, useEffect } from 'react';
import { HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findMatchesInTable, CellHighlight } from './shared/HighlightEngine';

interface CsvViewerProps {
  content: string;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
}

interface ParsedCsv {
  headers: string[];
  rows: string[][];
}

/**
 * Parse CSV content with auto-detection of delimiter
 */
function parseCSV(content: string): ParsedCsv {
  const lines = content.trim().split('\n');
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Detect delimiter (comma, semicolon, or tab)
  const firstLine = lines[0];
  let delimiter = ',';
  if (firstLine.includes('\t')) {
    delimiter = '\t';
  } else if (firstLine.includes(';') && !firstLine.includes(',')) {
    delimiter = ';';
  }

  // Parse lines
  const parsedLines = lines.map((line) => {
    // Simple CSV parsing (handles quoted fields)
    const fields: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        fields.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    fields.push(currentField.trim());

    return fields;
  });

  // First line as headers, rest as rows
  const headers = parsedLines[0];
  const rows = parsedLines.slice(1);

  return { headers, rows };
}

export function CsvViewer({ content, excerpts, highlightMode, zoom }: CsvViewerProps) {
  const { activeExcerptIndex } = useDocumentViewerStore();

  const { headers, rows } = useMemo(() => parseCSV(content), [content]);

  const highlights = useMemo(
    () => (highlightMode ? findMatchesInTable(rows, excerpts) : []),
    [rows, excerpts, highlightMode]
  );

  // Scroll to active excerpt when it changes
  useEffect(() => {
    if (activeExcerptIndex !== null && highlightMode) {
      const element = document.querySelector(`[data-excerpt-index="${activeExcerptIndex}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Briefly highlight the active cell
        (element as HTMLElement).style.backgroundColor = 'rgb(251, 191, 36)'; // amber-400
        setTimeout(() => {
          (element as HTMLElement).style.backgroundColor = '';
        }, 1500);
      }
    }
  }, [activeExcerptIndex, highlightMode]);

  // Check if a cell is highlighted
  const isCellHighlighted = (rowIdx: number, colIdx: number): CellHighlight | undefined => {
    return highlights.find((h) => h.row === rowIdx && h.col === colIdx);
  };

  const scaleFactor = zoom / 100;

  if (headers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">No CSV data available</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <div className="p-6">
        <div
          className="inline-block min-w-full"
          style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top left' }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    {headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-r border-slate-200 last:border-r-0"
                      >
                        {header || `Column ${idx + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                      {row.map((cell, colIdx) => {
                        const highlight = isCellHighlighted(rowIdx, colIdx);
                        return (
                          <td
                            key={colIdx}
                            className={`px-4 py-3 text-sm text-slate-700 border-r border-slate-100 last:border-r-0 ${
                              highlight ? 'bg-amber-200/40 border-l-2 border-l-amber-400' : ''
                            }`}
                            data-excerpt-index={highlight?.excerptIndex}
                          >
                            {cell || '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rows.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <p>No data rows found</p>
              </div>
            )}
          </div>

          {highlightMode && highlights.length > 0 && (
            <div className="mt-4 px-2">
              <p className="text-xs text-slate-500">
                {highlights.length} cell{highlights.length !== 1 ? 's' : ''} highlighted from{' '}
                {excerpts.length} excerpt{excerpts.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
