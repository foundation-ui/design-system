"use client";

import React from "react";

enum ComponentSideEnum {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
  Center = "center",
}

export type TriggerRect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

export type FloatingPlacement = {
  left: number;
  top: number;
  align: ComponentSideEnum;
};

type UseFloatingPlacementOptions = {
  /** Whether the floating element is rendered. */
  enabled: boolean;
  /** Returns the current trigger rect (viewport coordinates). */
  getTriggerRect: () => TriggerRect | null | undefined;
  /** Ref of the floating element to position. */
  floatingRef: React.RefObject<HTMLElement | null>;
  /** Distance (px) between the trigger and the floating element. */
  gap?: number;
  /** Minimum distance (px) kept between the floating element and the viewport. */
  margin?: number;
  /** Extra dependencies that should trigger a re-computation. */
  deps?: React.DependencyList;
};

/**
 * Computes a `position: fixed` placement for a floating element.
 *
 * - Horizontal: centered on the trigger > left-aligned > right-aligned.
 * - Vertical: below the trigger if it fits, otherwise above.
 *
 * Returns `null` until measured, so the element can stay hidden meanwhile.
 */
export function useFloatingPlacement({
  enabled,
  getTriggerRect,
  floatingRef,
  gap = 4,
  margin = 4,
  deps = [],
}: UseFloatingPlacementOptions) {
  const [placement, setPlacement] = React.useState<FloatingPlacement | null>(
    null,
  );

  // Keep the latest getter without making it a dependency.
  const getTriggerRectRef = React.useRef(getTriggerRect);
  getTriggerRectRef.current = getTriggerRect;

  React.useLayoutEffect(() => {
    if (!enabled) {
      setPlacement(null);
      return;
    }

    const trigger = getTriggerRectRef.current();
    const floating = floatingRef.current?.getBoundingClientRect();
    if (!trigger || !floating) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal: center > left-aligned > right-aligned
    const centeredLeft = trigger.left + trigger.width / 2 - floating.width / 2;
    const fitsCentered =
      centeredLeft >= margin &&
      centeredLeft + floating.width <= viewportWidth - margin;
    const fitsLeftAligned =
      trigger.left + floating.width <= viewportWidth - margin;

    let left: number;
    let align: ComponentSideEnum;

    if (fitsCentered) {
      left = centeredLeft;
      align = ComponentSideEnum.Center;
    } else if (fitsLeftAligned) {
      left = trigger.left;
      align = ComponentSideEnum.Left;
    } else {
      left = trigger.right - floating.width;
      align = ComponentSideEnum.Right;
    }

    // Vertical: below the trigger if it fits, otherwise above
    const fitsBelow =
      trigger.bottom + gap + floating.height <= viewportHeight - margin;
    const top = fitsBelow
      ? trigger.bottom + gap
      : trigger.top - floating.height - gap;

    setPlacement({ left, top, align });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, gap, margin, ...deps]);

  return placement;
}
