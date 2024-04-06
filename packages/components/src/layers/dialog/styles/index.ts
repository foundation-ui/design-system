import styled, { css } from "styled-components";

const DialogDefaultStyles = css`
  position: fixed;
  top: var(--measurement-large-60);
  padding: var(--measurement-medium-60);
  width: 100%;

  background-color: ${({ theme }) => theme.colors.body.base};
  border: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.text.alpha[0].rgb};
  border-radius: var(--measurement-medium-60);
  box-shadow: 0 var(--measurement-medium-30) var(--measurement-medium-30)
    var(--alpha-mono-darkest-10);
`;
const DialogSizeStyles = css`
  &[data-size="small"] {
    max-width: var(--measurement-large-90);
  }
  &[data-size="medium"] {
    max-width: calc(var(--measurement-large-90) * 1.33);
  }
  &[data-size="large"] {
    max-width: calc(var(--measurement-large-90) * 2);
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
  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    ${DialogDefaultStyles}
    ${DialogSizeStyles}
  }
`;
