import styled, { css } from "styled-components";
import { Button } from "..";

export const ButtonDefaultStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--fontsize-medium-20);
  line-height: 1.1;

  border: var(--measurement-small-10) solid transparent;
  border-radius: var(--measurement-medium-30);
  backdrop-filter: blur(var(--measurement-small-10));

  gap: var(--measurement-medium-30);
  padding: var(--measurement-medium-30) var(--measurement-medium-60);
  min-width: var(--measurement-medium-90);
  min-height: var(--measurement-medium-90);
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
export const ButtonVariantsStyles = css`
  &[data-variant="primary"] {
    color: var(--alpha-mono-light-90);
    background-color: var(--color-mono-dark);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-light);
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

export const DefaultButton = styled(Button)`
  margin: var(--measurement-medium-60);
`;
export const StyledButton = styled(Button)`
  margin: var(--measurement-medium-60);
  ${ButtonDefaultStyles}
  ${ButtonVariantsStyles}
`;
