import styled, { css } from "styled-components";

export const ToolbarDefaultStyles = css`
  margin: 0;
  display: grid;
  grid-template-rows: min-content;
  background-color: var(--body-color);
  border: var(--measurement-small-10) solid transparent;
  padding: var(--measurement-medium-30);
  min-width: var(--measurement-large-30);
  min-height: fit-content;

  &[aria-expanded="true"] {
    width: 100%;

    &[aria-orientation="horizontal"] {
      height: 100%;
      width: 100%;
    }

    menu {
      display: flex;
    }
  }

  &[aria-expanded="false"] {
    width: fit-content;
    justify-items: center;

    &[aria-orientation="horizontal"] {
      justify-items: start;
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

  &[data-height="display"] {
    &[aria-orientation="vertical"] {
      max-width: calc(var(--measurement-large-90) * 1.618);
    }
    &[aria-orientation="horizontal"] {
      max-height: calc(var(--measurement-large-90) * 1.618);
    }
  }

  &[data-height="fullscreen"] {
    &[aria-orientation="vertical"] {
      max-width: 100dvw;
    }
    &[aria-orientation="horizontal"] {
      max-height: 100dvh;
    }
  }
`;
export const ToolbarSideStyles = css`
  &[data-side="top"] {
    border-bottom-color: var(--font-color-alpha-10);
  }
  &[data-side="right"] {
    border-left-color: var(--font-color-alpha-10);

    &[aria-expanded="true"] {
      menu {
        justify-content: flex-end;
      }
    }
    &[aria-expanded="false"] {
      justify-items: end;
    }
  }
  &[data-side="bottom"] {
    border-top-color: var(--font-color-alpha-10);
  }
  &[data-side="left"] {
    border-right-color: var(--font-color-alpha-10);

    &[aria-expanded="true"] {
      menu {
        justify-content: flex-start;
      }
    }
    &[aria-expanded="false"] {
      justify-items: start;
    }
  }
`;

export const ToolbarWrapper = styled.menu`
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
