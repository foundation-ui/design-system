import styled, { css } from "styled-components";

const SheetStyles = css`
  all: unset;
  position: fixed;
  background-color: var(--body-color);
  border: var(--measurement-small-10) solid transparent;
  padding: var(--measurement-medium-60);
  height: 100%;
  z-index: var(--depth-default-100);

  @keyframes slide-right {
    0% {
      transform: translateX(calc(var(--measurement-large-90) * 2));
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slide-left {
    0% {
      transform: translateX(calc(var(--measurement-large-90) * -2));
    }
    100% {
      transform: translateX(0);
    }
  }

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
  &[data-side="right"] {
    right: 0;
    border-left-color: var(--font-color-alpha-10);
    animation-name: slide-right;
  }

  &[data-side="left"] {
    left: 0;
    border-right-color: var(--font-color-alpha-10);
    animation-name: slide-left;
  }
`;

export const SheetWrapper = styled.dialog`
  &[data-raw="false"] {
    ${SheetStyles}
    ${SheetSideStyles}
    ${SheetSizeStyles}
  }
`;
