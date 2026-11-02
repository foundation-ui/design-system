"use client";

import styled, { css } from "styled-components";

export const WhiteboardWrapper = styled.div<{
  $isDragging: boolean;
  $allowDrag: boolean;
  $allowWheelZoom: boolean;
}>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: ${(props) =>
    props.$allowDrag ? (props.$isDragging ? "grabbing" : "grab") : "default"};

  ${(props) =>
    props.$allowDrag &&
    css`
      user-select: none;
    `}

  ${(props) =>
    props.$allowWheelZoom &&
    css`
      touch-action: pan-x pan-y;
    `}
`;

export const WhiteboardContent = styled.div<{
  $offsetX: number;
  $offsetY: number;
  $zoom: number;
  $isDragging: boolean;
}>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform: translate(
      ${(props) => props.$offsetX}px,
      ${(props) => props.$offsetY}px
    )
    scale(${(props) => props.$zoom});
  transform-origin: center center;
  z-index: 0;
  will-change: transform;
  transition: ${(props) =>
    props.$isDragging ? "none" : "transform 0.12s ease-out"};
`;
