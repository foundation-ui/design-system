import styled, { css } from "styled-components";

const DialogDefaultStyles = css`
  position: fixed;
  top: 15dvh;
  bottom: auto;

  padding: var(--measurement-medium-30);
  width: 100%;

  border-radius: var(--measurement-medium-30);
  background: var(--body-color);

  border: var(--measurement-small-10) solid var(--contrast-color);
  box-shadow: 0 var(--measurement-medium-40) var(--measurement-medium-60)
    calc(var(--measurement-medium-60) * -1) rgba(0, 0, 0, 0.3);

  transition: all ease-in-out 0.2s;
  z-index: var(--depth-default-100);
`;
const DialogSizeStyles = css`
  --base-size: var(--measurement-medium-60);
  --computed-size: calc(100% - (var(--base-size) * 2));
  --max-height: 75dvh;

  &[data-size="small"] {
    max-width: calc(var(--measurement-large-90) * 1.33);
    max-height: var(--max-height);
  }
  &[data-size="medium"] {
    max-width: calc(var(--measurement-large-90) * 2);
    max-height: var(--max-height);
  }

  &[data-size="large"] {
    top: var(--base-size);
    max-width: var(--computed-size);
    height: var(--computed-size);
    padding: var(--measurement-medium-80);
  }
`;

export const Menu = styled.menu<any>`
  margin: 0;
  padding: 0;

  &[data-raw="false"] {
    display: flex;
    justify-content: flex-end;
    gap: var(--measurement-medium-30);
  }
`;
export const DialogWrapper = styled.dialog<any>`
  @keyframes scale-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: Scale(1);
    }
  }

  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    ${DialogDefaultStyles}
    ${DialogSizeStyles}

    animation-duration: 0.2s;
    animation-name: scale-in;
    animation-fill-mode: backwards;
  }
`;
