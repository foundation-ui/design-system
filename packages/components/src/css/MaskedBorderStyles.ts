import { css } from "styled-components";

export const MaskedBorderStyles = css`
  content: "";
  inset: 0;

  border-radius: inherit;
  border: var(--measurement-small-10) solid transparent;
  position: absolute;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  mask-composite: intersect;
  -webkit-mask-composite: source-in;

  transition: all ease-in-out 0.2s;
`;
