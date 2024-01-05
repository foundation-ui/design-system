import styled, { css } from "styled-components";

export const ToolbarDefaultStyles = css`
  height: 100dvh;
  display: grid;
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  padding: var(--measurement-medium-30);

  &[aria-expanded="true"] {
    width: 100%;

    &[aria-orientation="horizontal"] {
      height: 100%;
      width: 100%;
    }
  }

  &[aria-expanded="false"] {
    width: fit-content;

    &[aria-orientation="horizontal"] {
      height: fit-content;
      width: 100%;
    }
  }
`;
export const ToolbarSizeStyles = css`
  &[data-size="small"] {
    &[aria-orientation="vertical"] {
      max-width: var(--measurement-large-70);
    }
    &[aria-orientation="horizontal"] {
      max-height: var(--measurement-large-70);
    }
  }

  &[data-size="medium"] {
    &[aria-orientation="vertical"] {
      max-width: var(--measurement-large-80);
    }
    &[aria-orientation="horizontal"] {
      max-height: var(--measurement-large-80);
    }
  }

  &[data-size="large"] {
    &[aria-orientation="vertical"] {
      max-width: var(--measurement-large-90);
    }
    &[aria-orientation="horizontal"] {
      max-height: var(--measurement-large-90);
    }
  }
`;
export const ToolbarSideStyles = css`
  &[data-side="top"] {
    border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
  &[data-side="right"] {
    border-left-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
  &[data-side="bottom"] {
    border-top-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
  &[data-side="left"] {
    border-right-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
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
  &[data-raw="false"] {
    all: unset;
    align-self: flex-end;
  }
`;
