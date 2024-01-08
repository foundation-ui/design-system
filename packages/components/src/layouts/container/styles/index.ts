import styled, { css } from "styled-components";

const ContainerBaseStyles = css`
  position: relative;
  width: 100%;
`;
const ContainerAlignModeStyles = css`
  &[data-align="start"] {
    justify-content: start;
  }
  &[data-align="end"] {
    justify-content: end;
  }
  &[data-align="space-between"] {
    justify-content: space-between;
  }
`;
const ContainerSpacingStyles = css`
  &[data-spacing="small"] {
    gap: var(--measurement-medium-10);
  }
  &[data-spacing="medium"] {
    gap: var(--measurement-medium-30);
  }
  &[data-spacing="large"] {
    gap: var(--measurement-medium-60);
  }
`;

export const ContainerGridWrapper = styled.section`
  display: grid;
  grid-template-rows: min-content;
  ${ContainerBaseStyles}
  ${ContainerSpacingStyles}
`;
export const ContainerRowWrapper = styled.section`
  display: flex;
  ${ContainerAlignModeStyles}
  ${ContainerBaseStyles}
  ${ContainerSpacingStyles}
`;
export const ContainerTitleWrapper = styled.hgroup`
  max-width: calc(var(--measurement-large-90) * 2);
`;
