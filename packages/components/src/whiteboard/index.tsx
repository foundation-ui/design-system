"use client";

import React from "react";
import { WhiteboardProvider, useWhiteboard } from "./hooks";

import { Button } from "../";
import { WhiteboardWrapper, WhiteboardContent } from "./styles";
import type { IWhiteboardProperties, IWhiteboardZoomProperties } from "./types";

export interface WhiteboardComposition {
  Root: typeof WhiteboardRoot;
  Zoom: typeof WhiteboardZoom;
  Indicator: typeof WhiteboardIndicator;
}

/**
 * WhiteboardRoot component.
 *
 * @returns {ReactElement} The WhiteboardRoot component.
 */
const WhiteboardRoot = ({ children }: { children: React.ReactNode }) => {
  return <WhiteboardProvider>{children}</WhiteboardProvider>;
};
WhiteboardRoot.displayName = "Whiteboard.Root";

/**
 * Whiteboard component.
 *
 * @returns {ReactElement} The Whiteboard component.
 */
const Whiteboard = (props: IWhiteboardProperties) => {
  const {
    allowWheelZoom = true,
    allowDrag = true,
    step,
    min,
    max,
    children,
  } = props;
  const { states, methods } = useWhiteboard();

  const { whiteboardOffset, isDraggingWhiteboard, dragStart, zoomLevel } =
    states;
  const {
    setWhiteboardOffset,
    setIsDraggingWhiteboard,
    setDragStart,
    setZoomLevel,
  } = methods;

  const zoomStep = step ?? 0.1;
  const zoomMin = min ?? 0.25;
  const zoomMax = max ?? 3;

  const handleWhiteboardWheel = (e: React.WheelEvent) => {
    if (!allowWheelZoom) return;

    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();

      const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
      setZoomLevel((scale: number) =>
        Math.max(zoomMin, Math.min(zoomMax, scale + delta)),
      );
    }
  };

  const handleWhiteboardMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (!allowDrag) return;

      // Only start Whiteboard drag if clicking on Whiteboard background
      if (
        e.target === e.currentTarget ||
        (e.target as HTMLElement).classList.contains("Whiteboard-background")
      ) {
        setIsDraggingWhiteboard(true);
        setDragStart({
          x: e.clientX - whiteboardOffset.x,
          y: e.clientY - whiteboardOffset.y,
        });
        e.preventDefault();
      }
    },
    [
      allowDrag,
      whiteboardOffset.x,
      whiteboardOffset.y,
      setDragStart,
      setIsDraggingWhiteboard,
    ],
  );

  const handleWhiteboardMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDraggingWhiteboard) return;

      const newOffset = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      setWhiteboardOffset(newOffset);
    },
    [isDraggingWhiteboard, dragStart.x, dragStart.y, setWhiteboardOffset],
  );

  const handleWhiteboardMouseUp = React.useCallback(() => {
    setIsDraggingWhiteboard(false);
  }, [setIsDraggingWhiteboard]);

  // Stop an in-progress drag if dragging gets disabled
  React.useEffect(() => {
    if (!allowDrag && isDraggingWhiteboard) setIsDraggingWhiteboard(false);
  }, [allowDrag, isDraggingWhiteboard, setIsDraggingWhiteboard]);

  React.useEffect(() => {
    if (isDraggingWhiteboard) {
      document.addEventListener("mousemove", handleWhiteboardMouseMove);
      document.addEventListener("mouseup", handleWhiteboardMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleWhiteboardMouseMove);
        document.removeEventListener("mouseup", handleWhiteboardMouseUp);
      };
    }
  }, [
    isDraggingWhiteboard,
    handleWhiteboardMouseMove,
    handleWhiteboardMouseUp,
  ]);

  return (
    <WhiteboardWrapper
      $isDragging={isDraggingWhiteboard}
      $allowDrag={allowDrag}
      $allowWheelZoom={allowWheelZoom}
      onMouseDown={handleWhiteboardMouseDown}
      onWheel={allowWheelZoom ? handleWhiteboardWheel : undefined}
    >
      <WhiteboardContent
        $offsetX={whiteboardOffset.x}
        $offsetY={whiteboardOffset.y}
        $zoom={zoomLevel}
        $isDragging={isDraggingWhiteboard}
      >
        {children}
      </WhiteboardContent>
    </WhiteboardWrapper>
  );
};
Whiteboard.displayName = "Whiteboard";

/**
 * WhiteboardZoom component.
 *
 * @returns {ReactElement} The WhiteboardZoom component.
 */
const WhiteboardZoom = (props: IWhiteboardZoomProperties) => {
  const {
    onClick,
    direction,
    step,
    min,
    max,
    initial,
    children,
    ...restProps
  } = props;

  const { states, methods } = useWhiteboard();

  const { zoomLevel } = states;
  const { setZoomLevel, setWhiteboardOffset } = methods;

  const zoomStep = step ?? 0.25;
  const zoomMin = min ?? 0.25;
  const zoomMax = max ?? 3;
  const zoomDefault = initial ?? 1;

  const isDisabled =
    direction === "in"
      ? zoomLevel >= zoomMax
      : direction === "out"
        ? zoomLevel <= zoomMin
        : zoomLevel === zoomDefault;

  const handleZoomControl = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (direction === "in") {
      setZoomLevel((prev: number) => Math.min(prev + zoomStep, zoomMax));
    } else if (direction === "out") {
      setZoomLevel((prev: number) => Math.max(prev - zoomStep, zoomMin));
    } else {
      setZoomLevel(zoomDefault);
      setWhiteboardOffset({ x: 0, y: 0 });
    }
  };

  return (
    <Button onClick={handleZoomControl} {...restProps} disabled={isDisabled}>
      {children}
    </Button>
  );
};
WhiteboardZoom.displayName = "Whiteboard.Zoom";

/**
 * WhiteboardIndicator component.
 *
 * @returns {ReactElement} The WhiteboardIndicator component.
 */
const WhiteboardIndicator = () => {
  const { states } = useWhiteboard();
  const { zoomLevel } = states;

  return <React.Fragment>{Math.round(zoomLevel * 100)}%</React.Fragment>;
};
WhiteboardIndicator.displayName = "Whiteboard.Indicator";

Whiteboard.Root = WhiteboardRoot;
Whiteboard.Zoom = WhiteboardZoom;
Whiteboard.Indicator = WhiteboardIndicator;

export { Whiteboard, WhiteboardRoot, WhiteboardZoom, WhiteboardIndicator };
