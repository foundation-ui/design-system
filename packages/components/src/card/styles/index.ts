"use client";

import styled, { css } from "styled-components";
import { FETurbulenceCSSVariable, InsetShadowCSSVariable } from "../../";

const GridDefaultStyles = css`
  display: grid;
  grid-gap: var(--measurement-medium-30) var(--measurement-medium-30);
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

const GridSizeStyles = css`
  &[data-size="small"] {
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--measurement-large-80), 1fr)
    );
  }
  &[data-size="medium"] {
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--measurement-large-90), 1fr)
    );
  }
  &[data-size="large"] {
    grid-template-columns: repeat(
      auto-fill,
      minmax(calc(var(--measurement-large-90) * 1.2), 1fr)
    );
  }
`;
const CardShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-medium-60);
  }
`;

export const CardsGrid = styled.div`
  ${GridDefaultStyles}
  ${GridSizeStyles}
`;
export const CardContainer = styled.div`
  width: 100%;
  background-color: var(--font-color-alpha-10);

  ${CardShapeStyles}
`;
export const CardWrapper = styled.div`
  ${InsetShadowCSSVariable}
  ${FETurbulenceCSSVariable}
  ${CardShapeStyles}

  display: flex;
  flex-direction: column;
  gap: var(--measurement-large-10);
  padding: var(--measurement-medium-60);

  background-color: var(--contrast-color);
  background-image: var(--fe-turbulence);
  background-repeat: repeat;
  background-size: 128px 128px;

  box-shadow: var(--inset-shadow);
`;
