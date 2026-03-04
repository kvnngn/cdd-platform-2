import { useState, useCallback, useRef, useEffect } from 'react';

interface UseResizableOptions {
  /** Initial width in pixels */
  initialWidth: number;
  /** Minimum width in pixels */
  minWidth: number;
  /** Maximum width in pixels */
  maxWidth: number;
  /** Width below which the panel collapses to 0 */
  collapseThreshold?: number;
  /** Direction of resize: 'right' means dragging the right edge */
  direction?: 'right' | 'left';
}

interface UseResizableReturn {
  width: number;
  isCollapsed: boolean;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  toggleCollapse: () => void;
  setWidth: (w: number) => void;
}

export function useResizable({
  initialWidth,
  minWidth,
  maxWidth,
  collapseThreshold = 80,
  direction = 'right',
}: UseResizableOptions): UseResizableReturn {
  const [width, setWidth] = useState(initialWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const lastWidthBeforeCollapse = useRef(initialWidth);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startXRef.current = e.clientX;
    startWidthRef.current = isCollapsed ? 0 : width;
    setIsDragging(true);
  }, [width, isCollapsed]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = direction === 'right'
        ? e.clientX - startXRef.current
        : startXRef.current - e.clientX;

      const newWidth = startWidthRef.current + delta;

      if (newWidth < collapseThreshold) {
        setIsCollapsed(true);
        setWidth(0);
      } else {
        setIsCollapsed(false);
        const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
        setWidth(clampedWidth);
        lastWidthBeforeCollapse.current = clampedWidth;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, direction, minWidth, maxWidth, collapseThreshold]);

  const toggleCollapse = useCallback(() => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setWidth(lastWidthBeforeCollapse.current || initialWidth);
    } else {
      lastWidthBeforeCollapse.current = width;
      setIsCollapsed(true);
      setWidth(0);
    }
  }, [isCollapsed, width, initialWidth]);

  return {
    width: isCollapsed ? 0 : width,
    isCollapsed,
    isDragging,
    handleMouseDown,
    toggleCollapse,
    setWidth,
  };
}
