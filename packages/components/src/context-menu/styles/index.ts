"use client";

import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../global";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

const ContextMenuSizeStyles = css`
  &[data-size="small"] {
    width: var(--measurement-large-70);
  }
  &[data-size="medium"] {
    width: var(--measurement-large-80);
  }
  &[data-size="large"] {
    width: var(--measurement-large-90);
  }
`;
const ContextMenuShapeStyles = css`
  &[data-shape="round"] {
    border-radius: var(--measurement-medium-60);
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
  }
  &[data-shape="square"] {
    border-radius: 0;
  }
`;
const ContentWrapperVariants = css`
  &[data-variant="body"] {
    background-color: var(--body-color);
  }

  &[data-variant="contrast"] {
    background-color: var(--contrast-color);
  }
`;
export const RootWrapper = styled.div`
  position: relative;
`;
export const ContextMenuPortal = styled.div`
  position: fixed;
  z-index: 100;
  left: var(--menu-x, 0px);
  top: var(--menu-y, 0px);

  &[data-open="true"] {
    pointer-events: auto;
  }
  &[data-open="false"] {
    pointer-events: none;
  }
`;
export const ContextMenuContentWrapper = styled.div`
  ${InsetShadowCSSVariable}

  overflow: hidden;
  outline: none;

  box-shadow: var(--inset-shadow);
  color: var(--font-color);

  clip-path: var(--menu-clip);
  opacity: 0;
  transition:
    clip-path 0.2s ${EASE_OUT},
    opacity 0.2s ${EASE_OUT};

  ${ContextMenuSizeStyles}
  ${ContextMenuShapeStyles}
  ${ContentWrapperVariants}

  &[data-visible="true"] {
    opacity: 1;
  }
`;
export const ItemWrapper = styled.li<any>`
  list-style: none;
  padding: var(--measurement-medium-30);
  margin: 0;
  user-select: none;

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
