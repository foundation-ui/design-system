"use client";

import styled from "styled-components";

export const SplitContainer = styled.div`
  position: relative;
`;
export const Panel = styled.div<{ width: number }>`
  overflow: hidden;
  width: ${(props) => props.width}%;
`;
export const Divider = styled.div<{ $dragging: boolean }>`
  width: var(--measurement-medium-10);
  height: 100%;
  top: 0;

  border-radius: var(--measurement-medium-60);
  background-color: transparent;

  /* background-color: ${(props) =>
    props.$dragging ? "var(--font-color-alpha-10)" : "transparent"}; */

  cursor: col-resize;
  transition: background-color 0.2s;
  position: relative;

  /** Shows DragIndicator on hover */
  &:hover .drag-indicator-handle,
  &:active .drag-indicator-handle {
    opacity: 1;
  }

  .drag-indicator-handle {
    height: ${(props) =>
      props.$dragging
        ? "var(--measurement-large-10)"
        : "var(--measurement-medium-60)"};
  }
`;
export const DragHandle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--measurement-medium-10) * -1);
  right: calc(var(--measurement-medium-10) * -1);
`;
export const DragIndicator = styled.div`
  position: fixed;
  width: var(--measurement-medium-10);
  /* height: var(--measurement-medium-60); */
  background-color: var(--font-color-alpha-60);
  border-radius: var(--measurement-large-10);

  opacity: 0;
  transition: all 0.2s;
`;
export const DragOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--depth-default-90);
  cursor: col-resize;
`;
