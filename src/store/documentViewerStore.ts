import { create } from 'zustand';
import { HypothesisSource } from '@/types';

interface DocumentViewerState {
  // Current viewer state
  openDocumentId: string | null;
  highlightMode: boolean;
  activeExcerpts: HypothesisSource[];
  activeExcerptIndex: number | null;

  // Navigation
  currentPage: number;
  zoom: number;

  // Collaboration
  activeUsers: string[];

  // Actions
  openDocument: (
    sourceId: string,
    options?: {
      excerpts?: HypothesisSource[];
      initialPage?: number;
      highlightMode?: boolean;
    }
  ) => void;
  closeDocument: () => void;
  toggleHighlights: () => void;
  setCurrentPage: (page: number) => void;
  setZoom: (zoom: number) => void;
  setActiveUsers: (users: string[]) => void;
  setActiveExcerptIndex: (index: number | null) => void;
}

export const useDocumentViewerStore = create<DocumentViewerState>((set) => ({
  // Initial state
  openDocumentId: null,
  highlightMode: true,
  activeExcerpts: [],
  activeExcerptIndex: null,
  currentPage: 1,
  zoom: 100,
  activeUsers: [],

  // Actions
  openDocument: (sourceId, options = {}) => {
    set({
      openDocumentId: sourceId,
      activeExcerpts: options.excerpts || [],
      activeExcerptIndex: null,
      currentPage: options.initialPage || 1,
      highlightMode: options.highlightMode !== undefined ? options.highlightMode : true,
      zoom: 100,
    });
  },

  closeDocument: () => {
    set({
      openDocumentId: null,
      activeExcerpts: [],
      activeExcerptIndex: null,
      currentPage: 1,
      zoom: 100,
      highlightMode: true,
    });
  },

  toggleHighlights: () => {
    set((state) => ({ highlightMode: !state.highlightMode }));
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setZoom: (zoom) => {
    set({ zoom: Math.min(200, Math.max(50, zoom)) });
  },

  setActiveUsers: (users) => {
    set({ activeUsers: users });
  },

  setActiveExcerptIndex: (index) => {
    set({ activeExcerptIndex: index });
  },
}));

// Hook for easy component integration
export function useDocumentViewer() {
  const { openDocument } = useDocumentViewerStore();

  return {
    openSourceDocument: (
      sourceId: string,
      options?: {
        excerpts?: HypothesisSource[];
        initialPage?: number;
        highlightMode?: boolean;
      }
    ) => openDocument(sourceId, options),
  };
}
