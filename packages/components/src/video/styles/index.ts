"use client";

import styled, { css } from "styled-components";

const VideoShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-medium-60);
  }
`;

export const VideoWrapper = styled.video<{ $fill: boolean }>`
  display: block;
  object-fit: cover;

  ${VideoShapeStyles}

  ${({ $fill }) =>
    $fill
      ? "position: absolute; inset: 0; width: 100%; height: 100%;"
      : "max-width: 100%; height: auto;"}
`;
