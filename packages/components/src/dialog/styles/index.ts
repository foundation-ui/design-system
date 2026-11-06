import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const DialogDefaultStyles = css`
  ${InsetShadowCSSVariable}

  position: fixed;
  inset: 0;
  margin: auto;

  padding: var(--measurement-medium-30);
  width: 100%;
  height: fit-content;

  border-radius: var(--measurement-medium-60);
  background: var(--contrast-color);
  box-shadow: var(--inset-shadow);

  transition: all ease-in-out 0.2s;
  z-index: var(--depth-default-100);
`;
const DialogSizeStyles = css`
  --base-size: var(--measurement-medium-60);
  --computed-size: calc(100% - (var(--base-size) * 2));
  --max-height: 75vh;
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
    max-width: var(--computed-size);
    height: var(--computed-size);
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
