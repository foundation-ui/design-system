import styled, { css } from "styled-components";

const BadgeBaseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-10);

  min-width: var(--measurement-medium-60);
  min-height: var(--measurement-medium-60);
  width: fit-content;

  border: var(--measurement-small-10) solid transparent;
  padding: 0 var(--measurement-medium-30);

  font-size: var(--fontsize-small-60);
  font-weight: 500;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );
  line-height: 0;

  transition: all ease-in-out 0.2s;
`;
const BadgeVariantStyles = css`
  border: var(--measurement-small-10) solid transparent;

  &[data-variant="primary"] {
    background-color: var(--font-color-alpha-10);
    color: var(--font-color-alpha-80);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="secondary"] {
    background-color: var(--contrast-color);
    color: var(--font-color-alpha-80);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="border"] {
    background-color: transparent;
    border-color: var(--font-color-alpha-10);
    color: var(--font-color-alpha-80);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="danger"] {
    background-color: var(--alpha-red-10);
    border-color: var(--alpha-red-10);
    color: var(--shade-red-20);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="warning"] {
    background-color: var(--alpha-orange-10);
    border-color: var(--alpha-orange-10);
    color: var(--shade-orange-20);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="success"] {
    background-color: var(--alpha-green-10);
    border-color: var(--alpha-green-10);
    color: var(--shade-lime-20);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="meta"] {
    background-color: var(--alpha-indigo-10);
    border-color: var(--alpha-indigo-10);
    color: var(--shade-indigo-20);

    * {
      color: currentColor !important;
    }
  }
  &[data-variant="hint"] {
    background-color: var(--alpha-purple-10);
    border-color: var(--alpha-purple-10);
    color: var(--shade-purple-20);

    * {
      color: currentColor !important;
    }
  }
`;
const BadgeShapeStyles = css`
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
const BadgeSizeStyles = css`
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
  }
`;
