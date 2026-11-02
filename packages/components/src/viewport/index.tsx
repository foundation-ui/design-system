"use client";

import React from "react";
import { ViewportRoot } from "./styles";
import type { IViewportProperties } from "./types";

const DRAG_THRESHOLD = 4; // px before a press becomes a drag

/**
 * Viewport is used to create a scrollable, draggable viewport region.
 *
 * **Best practices:**
 *
 * - Provide a height to constrain the viewport.
 * - Use direction to enable drag scrolling.
 *
 * @param {IViewportProperties} props - The props for the Viewport component.
 * @param {ReactNode} props.children - The content to be rendered inside the viewport.
 * @returns {ReactElement} The Viewport component.
 */
export const Viewport = React.forwardRef<HTMLDivElement, IViewportProperties>(
  function Viewport({ children, height, direction, className }, ref) {
    const scrollX = direction === "x" || direction === "both";
    const scrollY = direction === "y" || direction === "both";

    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const [dragging, setDragging] = React.useState(false);

    const drag = React.useRef({
      active: false,
      moved: false,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
    });

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!direction) return;
      if (e.pointerType === "touch") return; // native touch scrolling
      if (e.button !== 0) return;

      const el = innerRef.current;
      if (!el) return;

      drag.current = {
        active: true,
        moved: false,
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
      };
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      const el = innerRef.current;
      if (!d.active || !el) return;

      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;

      if (!d.moved) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        d.moved = true;
        el.setPointerCapture(e.pointerId);
        setDragging(true);
      }

      if (scrollX) el.scrollLeft = d.scrollLeft - dx;
      if (scrollY) el.scrollTop = d.scrollTop - dy;
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = innerRef.current;
      if (el?.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
      drag.current.active = false;
      setDragging(false);
    };

    // Swallow the click that follows a drag so links/buttons don't fire
    const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    };

    return (
      <ViewportRoot
        ref={setRefs}
        className={className}
        $height={height}
        $overflowX={scrollX ? "auto" : "hidden"}
        $overflowY={scrollY ? "auto" : "hidden"}
        $draggable={!!direction}
        $dragging={dragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </ViewportRoot>
    );
  },
);

Viewport.displayName = "Viewport";
