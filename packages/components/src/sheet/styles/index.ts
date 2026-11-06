import styled, { css, keyframes } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const SlideRight = keyframes`
  0% {
    transform: translateX(calc(var(--measurement-large-90) * 2));
  }
  100% {
    transform: translateX(0);
  }
`;
const SlideLeft = keyframes`
  0% {
    transform: translateX(calc(var(--measurement-large-90) * -2));
  }
  100% {
    transform: translateX(0);
  }
`;

const SheetStyles = css`
  all: unset;

  ${InsetShadowCSSVariable}

  position: fixed;

  background-color: var(--contrast-color);
  box-shadow: var(--inset-shadow);

  padding: var(--measurement-medium-30);
  margin: var(--measurement-medium-30);

  height: calc(100% - (var(--measurement-medium-30) * 4));
  border-radius: var(--measurement-medium-60);

  z-index: var(--depth-default-100);

  animation-delay: 0.2s;
  animation-duration: 0.2s;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  animation-fill-mode: backwards;
`;
const SheetSizeStyles = css`
  &[data-size="small"] {
    width: var(--measurement-large-80);
  }

  &[data-size="medium"] {
    width: var(--measurement-large-90);
  }

  &[data-size="large"] {
    width: calc(var(--measurement-large-90) * 1.5);
  }
`;
const SheetSideStyles = css`
  top: 0;

  &[data-side="right"] {
    right: 0;
    animation-name: ${SlideRight};
  }

  &[data-side="left"] {
    left: 0;
    animation-name: ${SlideLeft};
  }
`;

export const SheetWrapper = styled.dialog<any>`
  &[data-raw="false"] {
    ${SheetStyles}
    ${SheetSideStyles}
    ${SheetSizeStyles}
  }
`;
