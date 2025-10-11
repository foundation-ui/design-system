"use client";

import styled, { css, keyframes } from "styled-components";

const Rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const FieldSizeStyles = css`
  &[data-size="small"] {
    width: var(--measurement-medium-40);
    height: var(--measurement-medium-40);
  }
  &[data-size="medium"] {
    width: var(--measurement-medium-50);
    height: var(--measurement-medium-50);
  }
  &[data-size="large"] {
    width: var(--measurement-medium-60);
    height: var(--measurement-medium-60);
  }
`;

export const RotatingSpinner = styled.span`
  padding: 0;
  margin: 0;

  display: inline-block;
  box-sizing: border-box;

  border: var(--measurement-small-60) solid var(--font-color-alpha-30);
  border-bottom-color: transparent;
  border-radius: var(--measurement-large-90);

  animation: ${Rotate} 1s linear infinite;

  ${FieldSizeStyles}
`;
