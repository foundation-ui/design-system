"use client";

import styled, { css, keyframes } from "styled-components";

const SkeletonBlink = keyframes`
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.1;
    }
`;

const SkeletonBaseStyles = css`
  background: linear-gradient(
    45deg,
    var(--font-color-alpha-10),
    var(--font-color-alpha-20)
  );
  animation: ${SkeletonBlink} 1s ease-in-out alternate-reverse infinite;
`;
const SkeletonSizeStyles = css`
  &[data-size="small"] {
    width: 100%;

    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-70);
  }
  &[data-size="medium"] {
    width: 100%;
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-80);
  }
  &[data-size="large"] {
    width: 100%;
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-90);
  }
`;
const SkeletonShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-20);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
  }
`;

export const SkeletonLoader = styled.span`
  ${SkeletonBaseStyles}
  ${SkeletonSizeStyles}
  ${SkeletonShapeStyles}
`;
