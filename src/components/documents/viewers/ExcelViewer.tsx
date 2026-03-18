import React, { useMemo, useEffect, useState } from 'react';
import { HypothesisSource } from '@/types';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { findMatchesInTable, CellHighlight } from './shared/HighlightEngine';
import { FileSpreadsheet } from 'lucide-react';

interface ExcelViewerProps {
  content: string;
  excerpts: HypothesisSource[];
  highlightMode: boolean;
  zoom: number;
}

interface Sheet {
  name: string;
  headers: string[];
  rows: string[][];
}

/**
 * Parse Excel content (stored as text) into sheets
 * Detects sheet markers like "Sheet 1:", "Sheet1:", etc.
 */
function parseExcel(content: string): Sheet[] {
  const lines = content.split('\n');
  const sheets: Sheet[] = [];
  let currentSheet: Sheet | null = null;
  let currentLines: string[] = [];

  // Sheet name pattern: "Sheet 1:", "Sheet1:", "Feuille 1:", etc.
  const sheetPattern = /^(Sheet|Feuille|Tab)\s*\d+\s*:?\s*(.*)$/i;

  lines.forEach((line) => {
    const match = line.match(sheetPattern);

    if (match) {
      // Save previous sheet if exists
      if (currentSheet && currentLines.length > 0) {
        const parsed = parseSheetLines(currentLines);
        const sheet: Sheet = currentSheet; // Type assertion to help TS
        const sheetToAdd: Sheet = {
          name: sheet.name,
          headers: parsed.headers,
          rows: parsed.rows,
        };
        sheets.push(sheetToAdd);
      }

      // Start new sheet
      currentSheet = {
        name: match[2] || `Sheet ${sheets.length + 1}`,
        headers: [],
        rows: [],
      };
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  });

  // Add last sheet
  if (currentSheet && currentLines.length > 0) {
    const parsed = parseSheetLines(currentLines);
    const sheet: Sheet = currentSheet; // Type assertion to help TS
    const sheetToAdd: Sheet = {
      name: sheet.name,
      headers: parsed.headers,
      rows: parsed.rows,
    };
    sheets.push(sheetToAdd);
  }

  // If no sheets detected, treat entire content as single sheet
  if (sheets.length === 0) {
    const parsed = parseSheetLines(lines);
    sheets.push({
      name: 'Sheet 1',
      headers: parsed.headers,
      rows: parsed.rows,
    });
  }

  return sheets;
}

/**
 * Parse sheet lines as tabular data
 */
function parseSheetLines(lines: string[]): { headers: string[]; rows: string[][] } {
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);

  if (nonEmptyLines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Detect delimiter (tab, comma, or semicolon)
  const firstLine = nonEmptyLines[0];
  let delimiter = '\t';
  if (!firstLine.includes('\t')) {
    delimiter = firstLine.includes(';') ? ';' : ',';
  }

  // Parse lines
  const parsedLines = nonEmptyLines.map((line) => {
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

  const headers = parsedLines[0];
  const rows = parsedLines.slice(1);

  return { headers, rows };
}

export function ExcelViewer({ content, excerpts, highlightMode, zoom }: ExcelViewerProps) {
  const { activeExcerptIndex } = useDocumentViewerStore();
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const sheets = useMemo(() => parseExcel(content), [content]);

  const currentSheet = sheets[activeSheetIndex] || sheets[0];

  const highlights = useMemo(
    () => (highlightMode && currentSheet ? findMatchesInTable(currentSheet.rows, excerpts) : []),
    [currentSheet, excerpts, highlightMode]
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

  if (!currentSheet || currentSheet.headers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <FileSpreadsheet className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No Excel data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Sheet tabs (if multiple sheets) */}
      {sheets.length > 1 && (
        <div className="bg-white border-b border-slate-200 px-6 pt-4">
          <div className="flex gap-1 overflow-x-auto">
            {sheets.map((sheet, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSheetIndex(idx)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  idx === activeSheetIndex
                    ? 'bg-slate-100 text-slate-900 border-t-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {sheet.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table content */}
      <div className="flex-1 overflow-auto p-6">
        <div
          className="inline-block min-w-full"
          style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top left' }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-emerald-50 sticky top-0 z-10">
                  <tr>
                    {currentSheet.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider border-r border-emerald-100 last:border-r-0"
                      >
                        {header || `Column ${String.fromCharCode(65 + idx)}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {currentSheet.rows.map((row, rowIdx) => (
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

            {currentSheet.rows.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <p>No data rows found in this sheet</p>
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
