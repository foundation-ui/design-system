"use client";

import styled, { css, keyframes } from "styled-components";
import { FETurbulenceCSSVariable, InsetShadowCSSVariable } from "../../";

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Blink = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const BulkActionActivity = css`
  &::before {
    content: "";
    position: absolute;
    bottom: calc(var(--measurement-medium-20) * -1);
    left: 50%;
    transform: translateX(-50%);
    width: var(--measurement-medium-10);
    height: var(--measurement-medium-10);
    background-color: var(--font-color);
    border-radius: 100%;
  }
`;
const BulkActionsBaseStyles = css`
  ${InsetShadowCSSVariable}
  ${FETurbulenceCSSVariable}

  position: fixed;
  display: block;
  z-index: var(--depth-default-90);

  animation: ${FadeIn} ease-in-out alternate 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
const BulkActionsVariantStyles = css`
  border: var(--measurement-small-10) solid transparent;
  &[data-variant="primary"] {
    background-color: var(--body-color);
    background-image: var(--fe-turbulence);
    background-repeat: repeat;
    background-size: 128px 128px;
    box-shadow: var(--inset-shadow);
  }
  &[data-variant="secondary"] {
    box-shadow: var(--inset-shadow);
    background-color: var(--contrast-color);
  }
  &[data-variant="tertiary"] {
    background-color: var(--body-color);
  }
  &[data-variant="border"] {
    background-color: var(--font-color-alpha-10);
    border-color: var(--font-color-alpha-10);
  }
`;
const BulkActionsShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-medium-90);
  }
`;
const BulkActionsSizeStyles = css`
  height: fit-content;
  width: max-content;

  &[data-size="small"] {
    min-height: var(--measurement-medium-80);
    padding: var(--measurement-medium-30) var(--measurement-medium-40);
  }
  &[data-size="medium"] {
    min-height: var(--measurement-medium-90);
    padding: var(--measurement-medium-50) var(--measurement-medium-60);
  }
  &[data-size="large"] {
    min-height: var(--measurement-large-20);
    padding: var(--measurement-medium-60) var(--measurement-medium-70);
  }
`;
const BulkActionsSideStyles = css<{ $x: number; $y: number }>`
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
`;

export const BulkActionsWrapper = styled.div<any>`
  &[data-raw="false"] {
    ${BulkActionsBaseStyles}
    ${BulkActionsSizeStyles}
    ${BulkActionsShapeStyles}
    ${BulkActionsVariantStyles}
    ${BulkActionsSideStyles}
  }
`;
export const ActionWrapper = styled.div<any>`
  display: inline-block;
  position: relative;

  &:active {
    scale: 0.95;
  }

  &[data-status="pending"] {
    animation: ${Blink} 0.75s ease-in-out infinite alternate;
  }

  &[data-status="processing"] {
    ${BulkActionActivity}
  }

  &[data-status="running"] {
    scale: 1.1;
    ${BulkActionActivity}
  }

  transition: all 0.2s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
