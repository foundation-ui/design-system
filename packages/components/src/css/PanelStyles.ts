import { css } from "styled-components";
import { InsetShadowCSSVariable } from "./GlobalCSSVariables";

export const PanelDefaultStyles = css`
  ${InsetShadowCSSVariable}

  position: fixed;
  bottom: calc(var(--measurement-medium-60) * -1);

  padding: var(--measurement-medium-30);
  width: 100%;

  border-radius: var(--measurement-medium-60);
  background: var(--contrast-color);
  box-shadow: var(--inset-shadow);

  z-index: var(--depth-default-100);
`;

export const PanelSizeStyles = css`
  --base-size: var(--measurement-medium-60);
  --computed-size: calc(100% - (var(--base-size) * 2));
  --max-height: 75vh;
  --max-height: 75dvh;

  &[data-size="small"] {
    max-width: calc(var(--measurement-large-90) * 1.33);
    max-height: var(--max-height);
  }
  &[data-size="medium"] {
    max-width: calc(var(--measurement-large-90) * 2);
    max-height: var(--max-height);
  }

  &[data-size="large"] {
    max-width: var(--computed-size);
    height: var(--computed-size);
  }
`;

export const PanelMenuStyles = css`
  &[data-raw="false"] {
    display: flex;
    justify-content: flex-end;
    gap: var(--measurement-medium-30);
  }
`;
