import styled, { css, keyframes } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const MorphIn = keyframes`
  from {
    visibility: hidden;
    width: 0;
    height: 0;
    padding: 0;
  }
`;
const MorphOut = keyframes`
  to {
    visibility: visible;
    width: 0;
    height: 0;
    padding: 0;
    z-index: 0;
  }
`;
const FadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const FadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const MorphingBoxDefaultStyles = css`
  ${InsetShadowCSSVariable}

  position: fixed;
  bottom: calc(var(--measurement-medium-60) * -1);

  padding: var(--measurement-medium-30);
  width: 100%;

  border-radius: var(--measurement-medium-60);
  background: var(--contrast-color);
  box-shadow: var(--inset-shadow);

  z-index: var(--depth-default-100);
`;

const MorphingBoxAnimationStyles = css`
  --morph-duration: 0.25s;

  /* Lets width/height animate to and from their intrinsic (auto) size */
  @supports (interpolate-size: allow-keywords) {
    interpolate-size: allow-keywords;
  }
  overflow: hidden;

  transition: all ease-in-out 0.2s;
  animation-duration: var(--morph-duration);
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;

  /* Every child fades; "both" keeps it hidden during its delay */
  & > * {
    animation-duration: var(--morph-duration);
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }

  /* Open: the box expands first, then the children fade in */
  &[data-state="open"] {
    animation-name: ${MorphIn};

    & > * {
      animation-name: ${FadeIn};
      animation-delay: calc(var(--morph-duration) * 0.5);
    }
  }

  /* Close: the children fade out first, then the box collapses */
  &[data-state="closed"] {
    animation-name: ${MorphOut};
    animation-delay: calc(var(--morph-duration) * 0.5);
    pointer-events: none;

    & > * {
      animation-name: ${FadeOut};
      animation-delay: 0s;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    --morph-duration: 0.01s;
  }
`;
const MorphingBoxDirectionStyles = css`
  --anchor-gap: var(--measurement-medium-30);

  /* Reset the <dialog> defaults and the Default styles' bottom offset */
  inset: auto;
  margin: 0;
  height: fit-content;

  /* Edge anchors: centered on the cross axis */
  &[data-direction="top-bottom"] {
    top: var(--anchor-gap);
    left: 0;
    right: 0;
    margin-inline: auto;
  }
  &[data-direction="bottom-top"] {
    bottom: var(--anchor-gap);
    left: 0;
    right: 0;
    margin-inline: auto;
  }
  &[data-direction="right-left"] {
    right: var(--anchor-gap);
    top: 0;
    bottom: 0;
    margin-block: auto;
  }
  &[data-direction="left-right"] {
    left: var(--anchor-gap);
    top: 0;
    bottom: 0;
    margin-block: auto;
  }

  /* Corner anchors */
  &[data-direction="top-left-bottom-center"] {
    top: var(--anchor-gap);
    left: var(--anchor-gap);
    transform-origin: top left;
  }
  &[data-direction="top-right-bottom-center"] {
    top: var(--anchor-gap);
    right: var(--anchor-gap);
    transform-origin: top right;
  }
  &[data-direction="bottom-left-top-center"] {
    bottom: var(--anchor-gap);
    left: var(--anchor-gap);
    transform-origin: bottom left;
  }
  &[data-direction="bottom-right-top-center"] {
    bottom: var(--anchor-gap);
    right: var(--anchor-gap);
    transform-origin: bottom right;
  }
`;
const MorphingBoxSizeStyles = css`
  --max-width: calc(var(--measurement-large-90) * 1.33);

  &[data-size="small"] {
    max-width: var(--max-width);
    max-height: 25vh;
    max-height: 25dvh;
  }
  &[data-size="medium"] {
    max-width: var(--max-width);
    max-height: 50vh;
    max-height: 50dvh;
  }

  &[data-size="large"] {
    max-width: var(--max-width);
    height: 75vh;
    height: 75dvh;
  }
`;
const MorphingBoxTriggerPositionStyles = css`
  &[data-position="top"] {
    top: var(--gap);
    left: 50%;
    transform: translateX(-50%);
  }
  &[data-position="top-right"] {
    top: var(--gap);
    right: var(--gap);
  }
  &[data-position="top-left"] {
    top: var(--gap);
    left: var(--gap);
  }
  &[data-position="right"] {
    right: var(--gap);
    top: 50%;
    transform: translateY(-50%);
  }
  &[data-position="bottom"] {
    bottom: var(--gap);
    left: 50%;
    transform: translateX(-50%);
  }
  &[data-position="bottom-right"] {
    bottom: var(--gap);
    right: var(--gap);
  }
  &[data-position="bottom-left"] {
    bottom: var(--gap);
    left: var(--gap);
  }
  &[data-position="left"] {
    left: var(--gap);
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Trigger = styled.div<any>`
  --gap: ${({ $gap }) => ($gap ? `${$gap}px` : `var(--measurement-medium-30)`)};

  all: unset;
  position: fixed;

  transition: all 0.2s;
  cursor: pointer;
  z-index: 100;

  ${MorphingBoxTriggerPositionStyles}
`;
export const MorphingBoxWrapper = styled.dialog<any>`
  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    ${MorphingBoxDefaultStyles}
    ${MorphingBoxSizeStyles}
    ${MorphingBoxAnimationStyles}
    ${MorphingBoxDirectionStyles}
  }
`;
