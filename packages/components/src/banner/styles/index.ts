import styled, { css } from "styled-components";
import {
  BadgeEmphasisVariantStyles,
  BadgeVariantStyles,
} from "../../badge/styles";
import { createShapeStyles } from "../../css/ShapeStyles";

const BannerBaseStyles = css`
  padding: var(--measurement-medium-30);
  transition: all ease-in-out 0.2s;
`;

const BannerShapeStyles = createShapeStyles({
  smooth: "border-radius: var(--measurement-medium-30);",
  round: "border-radius: var(--measurement-medium-90);",
});

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
