import { css } from "styled-components";

export const InsetShadowCSSVariable = css`
  --inset-shadow:
    0px 2px 3px -2px var(--alpha-mono-darkest-30),
    inset 0px 0.5px 0px 0.5px var(--font-color-alpha-10),
    inset 0px 0.25px 0px 0px var(--font-color-alpha-10),
    inset 0px 0 2px 0.1px var(--body-color);
`;

export const FETurbulenceCSSVariable = css`
  --fe-turbulence: url("data:image/svg+xml,%3Csvg opacity='0.08' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
`;

export const LayerSizeStyles = css``;
export const ExtendedLayerSizeStyles = css``;
