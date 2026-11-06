import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../css/GlobalCSSVariables";

const AvatarSizesStyles = css`
  &[data-size="small"] {
    width: var(--measurement-medium-70);
    height: var(--measurement-medium-70);
    min-width: var(--measurement-medium-70);
    min-height: var(--measurement-medium-70);
  }

  &[data-size="medium"] {
    width: var(--measurement-large-10);
    height: var(--measurement-large-10);
    min-width: var(--measurement-large-10);
    min-height: var(--measurement-large-10);
  }

  &[data-size="large"] {
    width: var(--measurement-large-20);
    height: var(--measurement-large-20);
    min-width: var(--measurement-large-20);
    min-height: var(--measurement-large-20);
  }
`;
const AvatarShapesStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
    img {
      border-radius: 0;
    }
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
    img {
      border-radius: var(--measurement-medium-30);
    }
  }
  &[data-shape="round"] {
    border-radius: 100%;
    img {
      border-radius: 100%;
    }
  }
`;

export const AvatarWrapper = styled.div`
  &[data-raw="false"] {
    ${InsetShadowCSSVariable}

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--font-color-alpha-10);
    box-shadow: var(--inset-shadow);

    img {
      width: 100%;
      height: 100%;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
    }

    ${AvatarShapesStyles}
    ${AvatarSizesStyles}
  }
`;
export const StatusWrapper = styled.div`
  display: inline-block;
  position: relative;

  /** Reduced to 80% to make the Pill overflow the Avatar */
  width: 80%;
  height: 80%;
`;
export const BadgeWrapper = styled.div`
  ${InsetShadowCSSVariable}

  --status-position: calc(
    var(--measurement-medium-10) - (var(--measurement-medium-10) * 2)
  );

  position: absolute;

  bottom: var(--status-position);
  right: var(--status-position);

  width: var(--fontsize-medium-40);
  height: var(--fontsize-medium-40);

  background-color: var(--font-color-alpha-10);
  border-radius: 100%;

  img {
    width: inherit;
    height: inherit;
    min-width: inherit;
    min-height: inherit;
    border-radius: 100%;
    box-shadow: var(--inset-shadow);
  }
`;
