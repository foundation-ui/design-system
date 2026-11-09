import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";
import { PanelSizeStyles, PanelMenuStyles } from "../../css/PanelStyles";
import { ScaleInKeyframes } from "../../css/AnimationStyles";

const DialogDefaultStyles = css`
  ${InsetShadowCSSVariable}

  position: fixed;
  inset: 0;
  margin: auto;

  padding: var(--measurement-medium-30);
  width: 100%;
  height: fit-content;

  border-radius: var(--measurement-medium-60);
  background: var(--contrast-color);
  box-shadow: var(--inset-shadow);

  transition: all ease-in-out 0.2s;
  z-index: var(--depth-default-100);
`;
const DialogSizeStyles = PanelSizeStyles;

export const Menu = styled.menu<any>`
  margin: 0;
  padding: 0;

  ${PanelMenuStyles}
`;
export const DialogWrapper = styled.dialog<any>`
  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    ${DialogDefaultStyles}
    ${DialogSizeStyles}

    animation-duration: 0.2s;
    animation-name: ${ScaleInKeyframes};
    animation-fill-mode: backwards;
  }
`;
