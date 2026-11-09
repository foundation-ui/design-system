import styled, { css, keyframes } from "styled-components";
import { InsetShadowCSSVariable } from "../../";
import { Button } from "../../button";
import {
  PanelDefaultStyles,
  PanelSizeStyles,
  PanelMenuStyles,
} from "../../css/PanelStyles";

const hidden = {
  "bottom-top": "translateY(100vh)",
  "top-bottom": "translateY(-100vh)",
  "right-left": "translateX(100vw)",
  "left-right": "translateX(-100vw)",
} as const;

const createSlide = (from: string, to: string) => keyframes`
  from { transform: ${from}; }
  to { transform: ${to}; }
`;

const SlideIn = {
  "bottom-top": createSlide(hidden["bottom-top"], "translate(0)"),
  "top-bottom": createSlide(hidden["top-bottom"], "translate(0)"),
  "right-left": createSlide(hidden["right-left"], "translate(0)"),
  "left-right": createSlide(hidden["left-right"], "translate(0)"),
};
const SlideOut = {
  "bottom-top": createSlide("translate(0)", hidden["bottom-top"]),
  "top-bottom": createSlide("translate(0)", hidden["top-bottom"]),
  "right-left": createSlide("translate(0)", hidden["right-left"]),
  "left-right": createSlide("translate(0)", hidden["left-right"]),
};

const directions = [
  "bottom-top",
  "top-bottom",
  "right-left",
  "left-right",
] as const;

const DrawerDefaultStyles = PanelDefaultStyles;

const DrawerAnimationStyles = css`
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;

  &[data-state="closed"] {
    pointer-events: none;
  }

  ${directions.map(
    (dir) => css`
      &[data-direction="${dir}"][data-state="open"] {
        animation-name: ${SlideIn[dir]};
      }
      &[data-direction="${dir}"][data-state="closed"] {
        animation-name: ${SlideOut[dir]};
      }
    `,
  )}

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 0.01s;
  }
`;
const DrawerDirectionStyles = css`
  --edge-offset: calc(var(--measurement-medium-60) * -1);

  /* bottom-top: default, anchored to the bottom (original layout) */
  &[data-direction="bottom-top"] {
    bottom: var(--edge-offset);
  }

  /* top-bottom: anchored to the top */
  &[data-direction="top-bottom"] {
    top: var(--edge-offset);
    bottom: auto;
    padding-top: calc(
      var(--measurement-medium-30) + var(--measurement-medium-60)
    );
  }

  /* right-left: anchored to the right, full height */
  &[data-direction="right-left"][data-size] {
    top: 0;
    bottom: 0;
    left: auto;
    right: var(--edge-offset);
    margin: 0;
    width: 100%;
    height: 100%;
    max-height: none;
  }

  /* left-right: anchored to the left, full height */
  &[data-direction="left-right"][data-size] {
    top: 0;
    bottom: 0;
    left: var(--edge-offset);
    right: auto;
    margin: 0;
    width: 100%;
    height: 100%;
    max-height: none;
  }
`;

const DrawerSizeStyles = PanelSizeStyles;
const DrawerTriggerPositionStyles = css`
  &[data-position="top"] {
    top: var(--gap);
    left: 50%;
    transform: translateX(-50%);

    width: var(--measurement-medium-90);
    height: var(--measurement-medium-10);

    &:hover,
    &:active,
    &:focus {
      width: var(--measurement-large-30);
      background-color: var(--font-color);
    }
  }
  &[data-position="right"] {
    right: var(--gap);
    top: 50%;
    transform: translateY(-50%);

    width: var(--measurement-medium-10);
    height: var(--measurement-medium-90);

    &:hover,
    &:active,
    &:focus {
      height: var(--measurement-large-30);
      background-color: var(--font-color);
    }
  }
  &[data-position="bottom"] {
    bottom: var(--gap);
    left: 50%;
    transform: translateX(-50%);

    width: var(--measurement-medium-90);
    height: var(--measurement-medium-10);
    &:hover,
    &:active,
    &:focus {
      width: var(--measurement-large-30);
      background-color: var(--font-color);
    }
  }
  &[data-position="left"] {
    left: var(--gap);
    top: 50%;
    transform: translateY(-50%);

    width: var(--measurement-medium-10);
    height: var(--measurement-medium-90);

    &:hover,
    &:active,
    &:focus {
      height: var(--measurement-large-30);
      background-color: var(--font-color);
    }
  }
`;

export const Trigger = styled(Button)<any>`
  --gap: ${({ $gap }) => ($gap ? `${$gap}px` : `var(--measurement-medium-30)`)};

  all: unset;
  position: fixed;

  background-color: var(--font-color-alpha-60);
  border-radius: var(--measurement-large-10);

  transition: all 0.2s;
  cursor: pointer;
  z-index: 100;

  ${DrawerTriggerPositionStyles}
`;
export const DrawerWrapper = styled.dialog<any>`
  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    ${DrawerDefaultStyles}
    ${DrawerSizeStyles}
    ${DrawerAnimationStyles}
    ${DrawerDirectionStyles}
  }
`;
export const Menu = styled.menu<any>`
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;

  ${PanelMenuStyles}
`;
