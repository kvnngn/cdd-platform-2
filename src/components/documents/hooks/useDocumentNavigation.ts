import { useEffect, useCallback } from 'react';
import { useDocumentViewerStore } from '@/store/documentViewerStore';

interface UseDocumentNavigationOptions {
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onZoomChange?: (zoom: number) => void;
  onClose?: () => void;
}

export function useDocumentNavigation(options: UseDocumentNavigationOptions = {}) {
  const {
    currentPage,
    zoom,
    setCurrentPage,
    setZoom,
    closeDocument,
  } = useDocumentViewerStore();

  const { totalPages = 1, onPageChange, onZoomChange, onClose } = options;

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, totalPages, setCurrentPage, onPageChange]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, setCurrentPage, onPageChange]);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
    onPageChange?.(validPage);
  }, [totalPages, setCurrentPage, onPageChange]);

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(200, zoom + 25);
    setZoom(newZoom);
    onZoomChange?.(newZoom);
  }, [zoom, setZoom, onZoomChange]);

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(50, zoom - 25);
    setZoom(newZoom);
    onZoomChange?.(newZoom);
  }, [zoom, setZoom, onZoomChange]);

  const setZoomLevel = useCallback((level: number) => {
    setZoom(level);
    onZoomChange?.(level);
  }, [setZoom, onZoomChange]);

  const handleClose = useCallback(() => {
    closeDocument();
    onClose?.();
  }, [closeDocument, onClose]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      // Navigation shortcuts (only if not typing in input/textarea)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          goToPreviousPage();
          break;
        case 'ArrowRight':
          goToNextPage();
          break;
        case '+':
        case '=':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomIn();
          }
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomOut();
          }
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoomLevel(100);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPreviousPage, zoomIn, zoomOut, setZoomLevel, handleClose]);

  return {
    currentPage,
    zoom,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    zoomIn,
    zoomOut,
    setZoomLevel,
    handleClose,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
  };
}
