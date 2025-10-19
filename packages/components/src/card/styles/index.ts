"use client";

import styled, { css } from "styled-components";

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
const CardDefaultStyles = css`
  ${CardShapeStyles}

  box-sizing: border-box;
`;

export const CardContainer = styled.div`
  width: 100%;
  background-color: var(--font-color-alpha-10);

  ${CardDefaultStyles}
`;
export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--measurement-large-10);
  padding: var(--measurement-medium-60);
  background-color: var(--contrast-color);
  border: var(--measurement-small-10) solid var(--font-color-alpha-10);

  ${CardDefaultStyles}
`;

export const CardsGrid = styled.div`
  ${GridDefaultStyles}
  ${GridSizeStyles}
`;
