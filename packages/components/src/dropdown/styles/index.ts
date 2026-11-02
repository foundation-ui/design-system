import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../global";

const ContentWrapperSizes = css`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  max-height: var(--measurement-large-90);

  &[data-sizing="small"] {
    width: var(--small);
    max-width: var(--small);
  }

  &[data-sizing="medium"] {
    width: var(--medium);
    max-width: var(--medium);
  }

  &[data-sizing="large"] {
    width: var(--large);
    max-width: var(--large);
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
export const ContentWrapper = styled.ul<any>`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  ${InsetShadowCSSVariable}

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(calc(var(--measurement-small-30) * -1));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &[data-raw="false"] {
    position: fixed;
    margin: 0;
    padding: 0;

    box-shadow: var(--inset-shadow);
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);
    overflow-x: hidden;

    ${ContentWrapperSizes}
    ${ContentWrapperVariants}

    animation-duration: 0.2s;
    animation-name: slide-in;
    animation-fill-mode: backwards;
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
