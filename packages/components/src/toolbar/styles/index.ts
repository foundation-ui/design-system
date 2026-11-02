import styled, { css } from "styled-components";

export const ToolbarDefaultStyles = css`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--measurement-medium-30);

  min-height: fit-content;
  height: 100%;

  box-sizing: border-box;
  overflow: hidden;

  /* Lets browsers that support it animate to/from intrinsic sizes */
  interpolate-size: allow-keywords;
  transition: width 0.25s ease-in-out;

  &[data-state="expanded"] {
    width: 100%;
  }
  &[data-state="collapsed"] {
    width: fit-content;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ToolbarSizeStyles = css`
  /* Vertical: numeric widths so the transition can interpolate */
  &[data-orientation="vertical"] {
    &[data-state="collapsed"] {
      width: var(--measurement-medium-80);
    }
    &[data-size="small"][data-state="expanded"] {
      width: var(--measurement-large-70);
    }
    &[data-size="medium"][data-state="expanded"] {
      width: var(--measurement-large-80);
    }
    &[data-size="large"][data-state="expanded"] {
      width: var(--measurement-large-90);
    }
  }

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

export const ToolbarWrapper = styled.div<any>`
  &[data-raw="false"] {
    ${ToolbarDefaultStyles}
    ${ToolbarSizeStyles}
  }
`;

export const ToolbarTriggerWrapper = styled.div<any>`
  &[data-raw="false"] {
    display: flex;
    align-self: flex-end;
  }
`;

export const ToolbarContentWrapper = styled.div<any>`
  &[data-raw="false"] {
    display: flex;
    flex-direction: inherit;
    gap: inherit;
    overflow: hidden;
    min-width: 0;
    white-space: nowrap; /* avoid text re-wrapping while the width animates */
  }
  &[hidden] {
    display: none;
  }
`;
