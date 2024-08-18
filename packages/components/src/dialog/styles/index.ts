import styled, { css } from "styled-components";

const HiddenScrollbar = css`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  &::-moz-scrollbar {
    display: none;
  }
`;
const DialogDefaultStyles = css`
  position: fixed;
  top: 15dvh;
  padding: var(--measurement-medium-60);
  width: 100%;

  border: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.body.base};
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border-radius: var(--measurement-medium-30);
  box-shadow: 0 var(--measurement-medium-30) var(--measurement-medium-30)
    var(--alpha-mono-darkest-10);

  overflow-y: scroll;
  transition: all ease-in-out 0.2s;
  z-index: var(--depth-default-100);

  ${HiddenScrollbar}
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
    max-width: calc(var(--measurement-large-90) * 2.66);
    max-height: var(--max-height);
  }

  &[data-size="large"] {
    top: var(--base-size);
    max-width: var(--computed-size);
    height: var(--computed-size);
    padding: var(--measurement-medium-80);
  }
`;

export const Menu = styled.menu`
  margin: 0;
  padding: 0;

  &[data-raw="false"] {
    display: flex;
    justify-content: flex-end;
    gap: var(--measurement-medium-30);
  }
`;
export const DialogWrapper = styled.dialog`
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(var(--measurement-medium-30));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    ${DialogDefaultStyles}
    ${DialogSizeStyles}

    animation-duration: 0.2s;
    animation-name: slide-in;
    animation-fill-mode: backwards;
  }
`;
