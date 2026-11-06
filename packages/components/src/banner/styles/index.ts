import styled, { css } from "styled-components";
import {
  BadgeEmphasisVariantStyles,
  BadgeVariantStyles,
} from "../../badge/styles";

const BannerBaseStyles = css`
  padding: var(--measurement-medium-30);
  transition: all ease-in-out 0.2s;
`;

const BannerShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-medium-90);
  }
`;

export const BannerWrapper = styled.div<any>`
  &[data-raw="false"] {
    ${BannerBaseStyles}
    ${BadgeVariantStyles}
    ${BannerShapeStyles}

    &[data-emphasis="true"] {
      ${BadgeEmphasisVariantStyles}
    }
  }
`;
