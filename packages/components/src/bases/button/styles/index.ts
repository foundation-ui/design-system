import styled, { css } from "styled-components";

const ButtonDefaultStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-30);
  font-size: var(--fontsize-medium-20);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;
  backdrop-filter: blur(var(--measurement-small-10));

  width: fit-content;
  transition: all ease-in-out 0.2s;

  svg,
  span,
  img {
    opacity: 0.6;
  }

  &:hover,
  &:focus,
  &:active {
    svg,
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
const ButtonVariantsStyles = css`
  &[data-variant="primary"] {
    color: var(--alpha-mono-light-90);
    background-color: var(--color-mono-darker);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-whitest);
      background-color: var(--color-mono-darkest);
    }
  }

  &[data-variant="secondary"] {
    color: var(--alpha-mono-dark-60);
    background-color: var(--alpha-mono-dark-10);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-dark);
    }
  }

  &[data-variant="tertiary"] {
    color: var(--alpha-mono-dark-60);
    background-color: var(--color-mono-lightest);
    border-color: var(--alpha-mono-dark-10);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-dark);
      background-color: var(--alpha-mono-dark-10);
    }
  }

  &[data-variant="ghost"] {
    padding: 0;
    border: none;
    background-color: transparent;
    min-width: fit-content;
    min-height: var(--measurement-medium-60);
    color: var(--alpha-mono-dark-60);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-dark);
    }
  }
`;
const ButtonSizeStyles = css`
  &[data-size="small"] {
    font-size: var(--fontsize-medium-10);
    border-radius: var(--measurement-medium-20);
    gap: var(--measurement-medium-10);
    padding: var(--measurement-medium-10) var(--measurement-medium-30);
    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-60);
  }
  &[data-size="medium"] {
    border-radius: var(--measurement-medium-30);
    padding: var(--measurement-medium-30) var(--measurement-medium-60);
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-90);
  }
  &[data-size="large"] {
    border-radius: var(--measurement-medium-30);
    padding: var(--measurement-medium-60);
    min-width: var(--measurement-large-60);
    min-height: var(--measurement-medium-90);
  }
`;

export const ButtonWrapper = styled.button`
  &[data-raw="false"] {
    ${ButtonDefaultStyles}
    ${ButtonSizeStyles}
    ${ButtonVariantsStyles}
  }
`;
