import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";
import {
  MenuRootStyles,
  MenuSurfaceVariants,
  MenuItemStyles,
} from "../../css/MenuStyles";
import { createSlideInY } from "../../css/AnimationStyles";

const SlideIn = createSlideInY("calc(var(--measurement-small-30) * -1)");

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
const ContentWrapperVariants = MenuSurfaceVariants;
export const RootWrapper = styled.div`
  ${MenuRootStyles}
`;
export const ContentWrapper = styled.ul<any>`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  ${InsetShadowCSSVariable}

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
    animation-name: ${SlideIn};
    animation-fill-mode: backwards;
  }
`;

export const ItemWrapper = styled.li<any>`
  ${MenuItemStyles}
`;
