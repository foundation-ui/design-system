import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../global";

export const BadgeBaseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  gap: var(--measurement-medium-10);

  min-width: var(--measurement-medium-60);
  min-height: var(--measurement-medium-60);
  width: fit-content;

  padding: 0 var(--measurement-medium-30);

  font-size: var(--fontsize-small-60);
  font-weight: 500;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );
  line-height: 0;

  transition: all ease-in-out 0.2s;
`;
export const BadgeVariantStyles = css`
  ${InsetShadowCSSVariable}
  box-shadow: var(--inset-shadow);

  &[data-variant="primary"] {
    background-color: var(--font-color);
    color: var(--body-color);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="secondary"] {
    background-color: var(--font-color-alpha-10);
    color: var(--font-color-alpha-80);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="border"] {
    background-color: transparent;
    color: var(--font-color-alpha-80);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="danger"] {
    background-color: var(--alpha-red-30);
    border-color: var(--alpha-red-10);
    color: var(--tint-red-60);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="warning"] {
    background-color: var(--alpha-orange-30);
    color: var(--color-orange);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="success"] {
    background-color: var(--alpha-green-30);
    color: var(--color-green);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="meta"] {
    background-color: var(--alpha-indigo-30);
    color: var(--color-indigo);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="hint"] {
    background-color: var(--alpha-purple-30);
    color: var(--color-purple);

    * {
      color: currentColor !important;
    }
  }
`;
export const BadgeEmphasisVariantStyles = css`
  &[data-variant="danger"] {
    background-color: var(--color-red) !important;
    color: var(--color-mono-white) !important;
  }
  &[data-variant="warning"] {
    background-color: var(--color-orange) !important;
    color: var(--color-mono-dark) !important;
  }
  &[data-variant="success"] {
    background-color: var(--color-green) !important;
    color: var(--color-mono-white) !important;
  }
  &[data-variant="meta"] {
    background-color: var(--color-blue) !important;
    color: var(--color-mono-white) !important;
  }
  &[data-variant="hint"] {
    background-color: var(--color-purple) !important;
    color: var(--color-mono-white) !important;
  }
`;
export const BadgeShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-20);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-medium-60);
  }
`;
export const BadgeSizeStyles = css`
  &[data-size="small"] {
    padding: 0 var(--measurement-medium-30);

    min-width: var(--measurement-medium-70);
    min-height: var(--measurement-medium-70);
  }
  &[data-size="medium"] {
    padding: 0 var(--measurement-medium-40);

    min-width: var(--fontsize-medium-60);
    min-height: var(--fontsize-medium-60);
  }
  &[data-size="large"] {
    padding: 0 var(--measurement-medium-40);

    min-width: var(--fontsize-medium-70);
    min-height: var(--fontsize-medium-70);
  }
`;

export const BadgeWrapper = styled.div<any>`
  &[data-raw="false"] {
    ${BadgeBaseStyles}
    ${BadgeVariantStyles}
    ${BadgeShapeStyles}
    ${BadgeSizeStyles}

    &[data-emphasis="true"] {
      ${BadgeEmphasisVariantStyles}
    }
  }
`;
