import styled, { css, RuleSet } from "styled-components";

const ContainerBaseStyles = css`
  position: relative;
  width: 100%;
  height: fit-content;
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
  &[data-align="center"] {
    align-items: center;
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

const proximityBase = (spacing: RuleSet<object>) => {
  return css`
    * {
      &:nth-child(1) {
        ${spacing};
      }
    }
    &[data-global="true"] {
      * {
        ${spacing};

        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
  `;
};
const ContainerProximityStyles = css`
  &[data-spacing="small"] {
    ${proximityBase(
      css`
        margin-bottom: var(--measurement-medium-10);
      `
    )}
  }
  &[data-spacing="medium"] {
    ${proximityBase(
      css`
        margin-bottom: var(--measurement-medium-30);
      `
    )}
  }
  &[data-spacing="large"] {
    ${proximityBase(
      css`
        margin-bottom: var(--measurement-medium-60);
      `
    )}
  }
`;

export const ContainerColWrapper = styled.section`
  display: flex;
  flex-direction: column;
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
export const ContainerWrapper = styled.div`
  &[data-proximity="true"] {
    ${ContainerProximityStyles}
  }
`;
