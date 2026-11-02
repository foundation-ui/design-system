import styled, { css } from "styled-components";

export const ToolbarDefaultStyles = css`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--measurement-medium-30);

  min-height: fit-content;
  height: 100%;

  box-sizing: border-box;
  /* transition: all ease-in-out 0.2s; */

  &[data-state="expanded"] {
    width: 100%;
  }
  &[data-state="collapsed"] {
    width: fit-content;
  }

  &[data-orientation="horizontal"] {
    flex-direction: row;
    align-items: center;
    height: 100%;
  }
`;

export const ToolbarSizeStyles = css`
  &[data-size="small"] {
    &[data-orientation="vertical"] {
      max-width: var(--measurement-large-70);
    }
    &[data-orientation="horizontal"] {
      max-height: var(--measurement-large-70);
    }
  }
  &[data-size="medium"] {
    &[data-orientation="vertical"] {
      max-width: var(--measurement-large-80);
    }
    &[data-orientation="horizontal"] {
      max-height: var(--measurement-large-80);
    }
  }
  &[data-size="large"] {
    &[data-orientation="vertical"] {
      max-width: var(--measurement-large-90);
    }
    &[data-orientation="horizontal"] {
      max-height: var(--measurement-large-90);
    }
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
  }
`;
