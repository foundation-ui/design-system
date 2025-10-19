"use client";

import React from "react";

import {
  SplitContainer,
  Panel,
  Divider,
  DragHandle,
  DragIndicator,
  DragOverlay,
} from "./styles";

type ResizableEditorProperties = {
  defaultWidth?: number;
  left: React.ReactNode;
  right: React.ReactNode;
};

/**
 * Resizable are used to render children into separated sections that can be resized by users.
 *
 * @param {ResizableEditorProperties} props - The props for the Resizable component.
 * @param {number} props.defaultWidth - The default width of the Resizable left section.
 * @param {ReactNode} props.left - The content to be rendered inside the Left panel of the Resizable component.
 * @param {ReactNode} props.right - The content to be rendered inside the Right panel of the Resizable component.
 * @returns {ReactElement} The Resizable component.
 */
export const Resizable = ({
  defaultWidth,
  left,
  right,
}: ResizableEditorProperties) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [leftWidth, setLeftWidth] = React.useState(defaultWidth ?? 50); // Percentage
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = React.useCallback(() => setIsDragging(true), []);
  const handleMouseUp = React.useCallback(() => setIsDragging(false), []);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 20% and 80%
      const threshold = { min: 30, max: 70 };

      const constrainedWidth = Math.min(
        Math.max(newLeftWidth, threshold.min),
        threshold.max
      );
      setLeftWidth(constrainedWidth);
    },
    [isDragging]
  );

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <React.Fragment>
      <SplitContainer ref={containerRef} className="h-100 flex">
        <Panel width={leftWidth}>{left}</Panel>

        <Divider
          $dragging={isDragging}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <DragHandle
            className="flex align-center justify-center"
            id="drag-handle"
          >
            <DragIndicator className="drag-indicator-handle" />
          </DragHandle>
        </Divider>

        <Panel width={100 - leftWidth}>{right}</Panel>
      </SplitContainer>

      {isDragging && <DragOverlay />}
    </React.Fragment>
  );
};
Resizable.displayName = "Resizable";
