import styled, { css } from "styled-components";

const ButtonDefaultStyles = css`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-30);
  font-size: var(--fontsize-medium-20);
  height: fit-content;
  font-weight: 500;
  line-height: 1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;
  backdrop-filter: blur(var(--measurement-small-10));

  width: fit-content;
  transition: all ease-in-out 0.2s;

  span,
  img {
    opacity: 0.6;
  }

  &:hover,
  &:focus,
  &:active {
    span,
    img {
      opacity: 1;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const ButtonIconStyles = css`
  svg {
    width: var(--fontsize-medium-20);
    height: var(--fontsize-medium-20);
    fill: currentColor;
  }

  svg {
    opacity: 0.6;
  }

  &:hover,
  &:focus,
  &:active {
    svg {
      opacity: 1;
    }
  }

  &[data-variant="primary"] {
    svg {
      fill: var(--body-color);
    }
  }
`;
const ButtonVariantsStyles = css`
  &[data-variant="primary"] {
    color: var(--body-color) !important;
    background-color: var(--font-color);

    &:hover,
    &:focus,
    &:active {
      color: var(--body-color);
    }
  }
  &[data-variant="secondary"] {
    color: var(--font-color-alpha-60);
    background-color: transparent;
    border-color: var(--font-color-alpha-10);

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      background-color: var(--font-color-alpha-10);
      border-color: transparent;
    }
  }
  &[data-variant="tertiary"] {
    color: var(--font-color-alpha-80);
    background-color: transparent;

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      background-color: var(--font-color-alpha-10);
    }
  }
  &[data-variant="border"] {
    color: var(--font-color-alpha-60);
    background-color: transparent;
    border-color: var(--font-color-alpha-10);

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      border-color: var(--font-color-alpha-20);
    }
  }
  &[data-variant="danger"] {
    color: var(--color-mono-white);
    background-color: var(--color-red);

    &:hover,
    &:focus,
    &:active {
      background-color: var(--shade-red-10);
    }
  }
  &[data-variant="warning"] {
    color: var(--color-mono-dark);
    background-color: var(--color-orange);

    &:hover,
    &:focus,
    &:active {
      background-color: var(--shade-orange-10);
    }
  }
  &[data-variant="mono"] {
    color: var(--font-color-alpha-80);
    background-color: var(--font-color-alpha-10);

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      border-color: var(--font-color-alpha-10);
    }
  }
  &[data-variant="ghost"] {
    border: none;
    padding: 0;
    background-color: transparent;
    min-width: fit-content;
    min-height: var(--measurement-medium-60);
    color: var(--font-color-alpha-60);

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
    }
  }
`;
const ButtonSizeStyles = css`
  &[data-size="small"] {
    font-size: var(--fontsize-small-60);

    gap: var(--measurement-medium-10);
    padding: var(--measurement-medium-10) var(--measurement-medium-30);
    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-60);

    svg {
      width: var(--fontsize-medium-10);
      height: var(--fontsize-medium-10);
    }
  }
  &[data-size="medium"] {
    padding: var(--measurement-medium-10) var(--measurement-medium-60);
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-80);
  }
  &[data-size="large"] {
    padding: var(--measurement-medium-10) var(--measurement-medium-60);
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-90);
  }
`;
const ButtonShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-20);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
  }
`;

export const ButtonWrapper = styled.button`
  &[data-raw="false"] {
    ${ButtonDefaultStyles}
    ${ButtonSizeStyles}
    ${ButtonShapeStyles}
    ${ButtonVariantsStyles}
      &[data-rawIcon="false"] {
      ${ButtonIconStyles}
    }
  }
`;
