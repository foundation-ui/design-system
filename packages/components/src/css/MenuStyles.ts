import { css } from "styled-components";

export const MenuRootStyles = css`
  position: relative;
`;

export const MenuSurfaceVariants = css`
  &[data-variant="body"] {
    background-color: var(--body-color);
  }

  &[data-variant="contrast"] {
    background-color: var(--contrast-color);
  }
`;

export const MenuItemStyles = css`
  list-style: none;
  padding: var(--measurement-medium-30);
  margin: 0;
  -webkit-user-select: none;
  user-select: none;

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
