"use client";

import styled, { css, keyframes } from "styled-components";

const Rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const FadePulse = keyframes`
  0% { opacity: var(--opacity-default-10); }
  50% { opacity: var(--opacity-default-60); }
  100% { opacity: var(--opacity-default-10); }

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
const DitherSizeStyles = css`
  &[data-size="small"] {
    width: var(--fontsize-medium-20);
    height: var(--fontsize-medium-20);
  }
  &[data-size="medium"] {
    width: var(--measurement-medium-70);
    height: var(--measurement-medium-70);
  }
  &[data-size="large"] {
    width: var(--fontsize-medium-70);
    height: var(--fontsize-medium-70);
  }
`;
const AsciiSizeStyles = css`
  &[data-size="small"] {
    font-size: var(--fontsize-medium-20);
  }
  &[data-size="medium"] {
    font-size: var(--measurement-medium-70);
  }
  &[data-size="large"] {
    font-size: var(--fontsize-medium-70);
  }
`;
const CircleStyles = css`
  border: var(--measurement-small-80) solid var(--font-color-alpha-30);
  border-bottom-color: transparent;
  border-radius: var(--measurement-large-90);
  position: relative;

  animation: ${Rotate} 0.9s linear infinite;
`;
const CircleFilledStyles = css`
  border-radius: var(--measurement-large-90);
  background-color: var(--font-color-alpha-10);
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: var(--measurement-large-90);

    border: var(--measurement-small-60) solid var(--font-color-alpha-30);
    border-top-color: transparent;
  }

  animation: ${Rotate} 0.9s linear infinite;
`;

export const AnimatedSpinner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${SpinnerSizeStyles}

  &[data-variant="circle"] {
    ${CircleStyles}
  }
  &[data-variant="circle-filled"] {
    ${CircleFilledStyles}
  }
`;
export const DitherContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${DitherSizeStyles}
`;
export const DitherCell = styled.div<{ $order: number; $total: number }>`
  --order: ${({ $order }) => $order};
  --total: ${({ $total }) => $total};

  width: 100%;
  height: 100%;
  background-color: currentColor;

  animation: ${FadePulse} 1.2s ease-in-out infinite;
  animation-delay: calc((var(--order, 0) / var(--total, 16)) * 1.2s);
`;
export const AsciiContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-family: monospace;
  line-height: 1;

  ${AsciiSizeStyles}
`;
