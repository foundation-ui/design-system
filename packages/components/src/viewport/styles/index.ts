"use client";

import styled, { css } from "styled-components";
import { HiddenScrollbar } from "../../scrollarea/styles";

const FADE = "12px";

const fade = (axis: "bottom" | "right") =>
  `linear-gradient(to ${axis}, transparent, black ${FADE}, black calc(100% - ${FADE}), transparent)`;

export const ViewportRoot = styled.div<{
  $height: number;
  $overflowX: "auto" | "hidden";
  $overflowY: "auto" | "hidden";
  $draggable?: boolean;
  $dragging?: boolean;
}>`
  height: ${(p) => p.$height}px;
  overflow-x: ${(p) => p.$overflowX};
  overflow-y: ${(p) => p.$overflowY};
  transition: height 0.3s ease;

  ${(p) =>
    p.$draggable &&
    css`
      cursor: ${p.$dragging ? "grabbing" : "grab"};
    `}

  ${(p) =>
    p.$dragging &&
    css`
      -webkit-user-select: none;
      user-select: none;
      scroll-behavior: auto;
      scroll-snap-type: none; /* snapping fights programmatic scrolling */
    `}
    
  ${HiddenScrollbar}

  ${(p) => {
    const layers: string[] = [];
    if (p.$overflowY === "auto") layers.push(fade("bottom"));
    if (p.$overflowX === "auto") layers.push(fade("right"));
    if (layers.length === 0) return null;

    const mask = layers.join(", ");
    return css`
      mask-image: ${mask};
      mask-composite: intersect;
      -webkit-mask-image: ${mask};
      -webkit-mask-composite: source-in;
    `;
  }}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
