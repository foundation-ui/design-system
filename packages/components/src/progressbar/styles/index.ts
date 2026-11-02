"use client";

import styled, { keyframes } from "styled-components";
import type { RangeProps } from "../types";

const RangeAnimation = keyframes`
  from {
    width: 0px;
  }
`;

export const RangeContainer = styled.div`
  background-color: var(--font-color-alpha-10);
  width: 100%;
  border-radius: var(--measurement-large-90);
  height: fit-content;
  overflow: hidden;
`;

export const RangeSegment = styled.div<RangeProps>`
  border-radius: var(--measurement-large-90);
  height: var(--measurement-medium-30);
  width: ${({ $percentage }) => `${$percentage}%`};
  background-color: var(--color-green);

  will-change: width;
  transition:
    width 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  animation: ${RangeAnimation} 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);

  &[data-threshold="true"] {
    background-color: var(--color-orange);
  }

  &[data-empty="true"] {
    background-color: var(--color-red);
  }
`;
