"use client";

import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";
import {
  MenuRootStyles,
  MenuSurfaceVariants,
  MenuItemStyles,
} from "../../css/MenuStyles";
import { createShapeStyles } from "../../css/ShapeStyles";

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
const ContextMenuShapeStyles = createShapeStyles({
  smooth: "border-radius: var(--measurement-medium-30);",
  round: "border-radius: var(--measurement-medium-60);",
});
const ContentWrapperVariants = MenuSurfaceVariants;
export const RootWrapper = styled.div`
  ${MenuRootStyles}
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

  -webkit-clip-path: var(--menu-clip);
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
  ${MenuItemStyles}
`;
