"use client";

import styled, { css, keyframes } from "styled-components";
import { FETurbulenceCSSVariable } from "../../global";

const SkeletonBlink = keyframes`
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 0.3;
    }
`;

const SkeletonBaseStyles = css`
  ${FETurbulenceCSSVariable}

  background-color: var(--font-color-alpha-10);
  background-image: var(--fe-turbulence);
  background-repeat: repeat;
  background-size: 128px 128px;

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

export const SkeletonLoader = styled.div`
  ${SkeletonBaseStyles}
  ${SkeletonSizeStyles}
  ${SkeletonShapeStyles}
`;
