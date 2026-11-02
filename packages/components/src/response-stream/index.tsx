"use client";

import React from "react";
import { ResponseStreamWrapper } from "./styles";
import type { IResponseStreamProperties } from "./types";

const SCROLLABLE = ["auto", "scroll", "overlay", "hidden"];
const PIN_THRESHOLD = 8;

/**
 * getScrollParent component.
 *
 * @returns {ReactElement} The getScrollParent component.
 */
const getScrollParent = (node: HTMLElement): HTMLElement | null => {
  let parent = node.parentElement;

  while (parent) {
    const { overflowY } = getComputedStyle(parent);

    if (
      SCROLLABLE.includes(overflowY) &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent;
    }

    parent = parent.parentElement;
  }
  return null;
};

export const ResponseStream = (props: IResponseStreamProperties) => {
  const {
    content,
    status = "streaming",
    charactersPerSecond = 248,
    autoScroll = true,
    offset = 0,
    onHeightChange,
    onComplete,
  } = props;

  const [cursor, setCursor] = React.useState(0);

  const visibleCursor =
    status === "completed" ? content.length : status === "pending" ? 0 : cursor;

  const state =
    status === "pending"
      ? "pending"
      : visibleCursor >= content.length
        ? "complete"
        : "streaming";

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const heightRef = React.useRef(onHeightChange);
  const completeRef = React.useRef(onComplete);
  const pinnedRef = React.useRef(true);

  heightRef.current = onHeightChange;
  completeRef.current = onComplete;

  // Text animation
  React.useEffect(() => {
    if (status !== "streaming") {
      setCursor(status === "completed" ? content.length : 0);
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      setCursor(content.length);
      completeRef.current?.();
      return;
    }

    setCursor(0);
    const startedAt = performance.now();
    let frame = 0;

    const stream = (now: number) => {
      const next = Math.min(
        content.length,
        Math.floor(((now - startedAt) / 1000) * charactersPerSecond),
      );
      setCursor(next);

      if (next < content.length) frame = requestAnimationFrame(stream);
      else completeRef.current?.();
    };

    frame = requestAnimationFrame(stream);
    return () => cancelAnimationFrame(frame);
  }, [content, charactersPerSecond, status]);

  // Observer + auto-scroll
  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    let scroller: HTMLElement | null = null;

    const onScroll = () => {
      if (!scroller) return;
      pinnedRef.current =
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <
        PIN_THRESHOLD;
    };

    const measure = () => {
      heightRef.current?.(wrapper.offsetHeight);
      if (!autoScroll) return;

      const next = getScrollParent(wrapper);
      if (next !== scroller) {
        scroller?.removeEventListener("scroll", onScroll);
        scroller = next;
        scroller?.addEventListener("scroll", onScroll, { passive: true });
      }
      if (scroller && pinnedRef.current) {
        scroller.scrollTop = scroller.scrollHeight;
      }
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      return () => scroller?.removeEventListener("scroll", onScroll);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      scroller?.removeEventListener("scroll", onScroll);
    };
  }, [autoScroll]);

  return (
    <ResponseStreamWrapper
      ref={wrapperRef}
      $offset={offset}
      data-state={state}
      aria-busy={state === "streaming"}
      aria-hidden={state === "pending" || undefined}
    >
      <span
        ref={contentRef}
        aria-live={state === "streaming" ? "polite" : "off"}
      >
        {content.slice(0, visibleCursor)}
      </span>
    </ResponseStreamWrapper>
  );
};

ResponseStream.displayName = "ResponseStream";
