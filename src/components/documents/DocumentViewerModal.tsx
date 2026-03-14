import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useDocumentViewerStore } from '@/store/documentViewerStore';
import { useDocumentNavigation } from './hooks/useDocumentNavigation';
import { DocumentToolbar } from './DocumentToolbar';
import { DocumentViewer } from './DocumentViewer';
import { HighlightsSidebar } from './HighlightsSidebar';
import { SOURCES } from '@/data/mockData';

export function DocumentViewerModal() {
  const {
    openDocumentId,
    highlightMode,
    activeExcerpts,
    currentPage,
    zoom,
    toggleHighlights,
    closeDocument,
    setActiveExcerptIndex,
  } = useDocumentViewerStore();

  const source = SOURCES.find((s) => s.id === openDocumentId);

  const {
    goToNextPage,
    goToPreviousPage,
    zoomIn,
    zoomOut,
    handleClose,
    canGoNext,
    canGoPrevious,
  } = useDocumentNavigation({
    totalPages: 1, // Will be updated in Phase 2 for PDF
    onClose: closeDocument,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (openDocumentId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openDocumentId]);

  if (!source || !openDocumentId) {
    return null;
  }

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download', source.id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality (Phase 6)
    console.log('Share', source.id);
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
    window.print();
  };

  return (
    <Dialog.Root open={!!openDocumentId} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

        {/* Modal */}
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-[90vw] h-[90vh] max-w-7xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
            {/* Toolbar */}
            <DocumentToolbar
              source={source}
              currentPage={currentPage}
              totalPages={1} // Will be updated in Phase 2 for PDF
              zoom={zoom}
              highlightMode={highlightMode}
              onPreviousPage={goToPreviousPage}
              onNextPage={goToNextPage}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onToggleHighlights={toggleHighlights}
              onDownload={handleDownload}
              onShare={handleShare}
              onPrint={handlePrint}
              onClose={handleClose}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
            />

            {/* Main content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Document viewer */}
              <DocumentViewer
                source={source}
                excerpts={activeExcerpts}
                highlightMode={highlightMode}
                zoom={zoom}
                currentPage={currentPage}
              />

              {/* Highlights sidebar */}
              {highlightMode && (
                <HighlightsSidebar
                  excerpts={activeExcerpts}
                  onExcerptClick={setActiveExcerptIndex}
                />
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
