# Document Viewers - Highlighting System

This directory contains the document viewer components with advanced highlighting capabilities.

## Overview

All document viewers (PDF, Spreadsheet, Text) share a unified highlighting system that:
- Automatically finds and highlights excerpts within documents
- Supports fuzzy matching for better excerpt detection
- Provides smooth scrolling to active excerpts
- Animates the currently selected excerpt

## Components

### Core Viewers

- **PDFViewer** - Displays PDF files with professional formatting
- **SpreadsheetViewer** - Displays Excel (.xlsx) and CSV files
- **TextViewer** - Displays text and Markdown files

### Shared Utilities

**highlightUtils.ts** - Centralized highlighting logic:
- `findExcerptMatches()` - Intelligent matching algorithm with:
  - Exact text matching
  - Phrase-level matching (split by punctuation)
  - Keyword phrase matching (5+ word sequences)
  - Text normalization (whitespace, quotes, numbers)
  - Overlap merging for clean highlights

- `applyHighlightsToHTML()` - Converts matches to highlighted HTML
- `scrollToExcerpt()` - Smooth scroll with temporary animation

## Features

### Intelligent Matching

The system uses a multi-tier matching strategy:

1. **Exact Match** - Direct text match after normalization
2. **Phrase Match** - Splits excerpts by punctuation and finds phrases
3. **Keyword Match** - Extracts 5+ word sequences for partial matching

### Text Normalization

Normalizes both content and excerpts for better matching:
- Lowercase conversion
- Whitespace normalization
- Quote standardization
- Number format handling (European ↔ US decimals)

### Visual Feedback

- **Highlight color**: Amber with border (`bg-amber-200/40 border-b-2 border-amber-400`)
- **Active excerpt**: Temporarily brightens to amber-400
- **Smooth scroll**: Centers the active excerpt in view
- **Animation**: 1.5s fade from bright to normal highlight

## Usage

All viewers accept the same props:

```tsx
interface ViewerProps {
  source: Source;              // Document data
  excerpts: HypothesisSource[]; // Excerpts to highlight
  highlightMode: boolean;       // Enable/disable highlighting
  zoom: number;                 // Zoom level (50-150)
  currentPage?: number;         // For multi-page documents
}
```

## Integration with Highlights Sidebar

The viewers work seamlessly with `HighlightsSidebar`:

1. Sidebar displays all excerpts with metadata
2. Clicking an excerpt sets `activeExcerptIndex` in store
3. Viewers detect the change and scroll to that excerpt
4. Active excerpt is temporarily animated for visibility

## File Type Support

| Type | Extensions | Viewer | Status |
|------|-----------|---------|--------|
| PDF | .pdf | PDFViewer | ✅ Full support |
| Spreadsheet | .xlsx, .csv | SpreadsheetViewer | ✅ Full support |
| Text | .txt, .md | TextViewer | ✅ Full support |

## Performance

- Uses `useMemo` for match computation (only recalculates when needed)
- Efficient HTML string building instead of React reconciliation
- Lazy scroll animations with `requestAnimationFrame`
- Minimal re-renders with store integration
