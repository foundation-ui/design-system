import styled, { css } from "styled-components";

export const ToolbarDefaultStyles = css`
  height: 100dvh;
  display: grid;
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  padding: var(--measurement-medium-30);

  &[aria-expanded="true"] {
    width: 100%;
  }
  &[aria-expanded="false"] {
    width: fit-content;
  }
`;
export const ToolbarSizeStyles = css`
  &[data-size="small"] {
    max-width: var(--measurement-large-70);
  }
  &[data-size="medium"] {
    max-width: var(--measurement-large-80);
  }
  &[data-size="large"] {
    max-width: var(--measurement-large-90);
  }
`;
export const ToolbarSideStyles = css`
  &[data-side="top"] {
    border-top-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
  &[data-side="right"] {
    border-right-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
  &[data-side="bottom"] {
    border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
  &[data-side="left"] {
    border-left-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
`;

export const ToolbarWrapper = styled.aside`
  &[data-raw="false"] {
    ${ToolbarDefaultStyles}
    ${ToolbarSizeStyles}
    ${ToolbarSideStyles}
  }
`;
export const ToolbarTriggerWrapper = styled.menu`
  all: unset;
  align-self: flex-end;
`;
