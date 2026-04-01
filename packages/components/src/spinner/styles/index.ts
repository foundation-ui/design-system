"use client";

import styled, { css, keyframes } from "styled-components";

const Rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerSizeStyles = css`
  &[data-size="small"] {
    width: 12px;
    height: 12px;
  }
  &[data-size="medium"] {
    width: 18px;
    height: 18px;
  }
  &[data-size="large"] {
    width: 24px;
    height: 24px;
  }
`;
const CircleStyles = css`
  border: var(--measurement-small-80) solid var(--font-color-alpha-10);
  border-bottom-color: transparent;
  border-radius: var(--measurement-large-90);

  animation: ${Rotate} 0.8s linear infinite;
`;
const CircleFilledStyles = css`
  border: var(--measurement-small-60) solid var(--font-color-alpha-30);

  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;

  border-radius: var(--measurement-large-90);
  background-color: var(--font-color-alpha-10);

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: var(--body-color);
    border-radius: var(--measurement-large-90);
  }

  animation: ${Rotate} 0.8s linear infinite;
`;

export const AnimatedSpinner = styled.div`
  ${SpinnerSizeStyles}

  &[data-variant="circle"] {
    ${CircleStyles}
  }
  &[data-variant="circle-filled"] {
    ${CircleFilledStyles}
  }
`;
