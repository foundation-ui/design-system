import styled, { css } from "styled-components";

const ButtonDefaultStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-30);
  font-size: var(--fontsize-medium-20);
  font-weight: 500;
  line-height: 1;
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
    background-color: ${({ theme }) => theme.colors.primary.base};

    &:hover,
    &:focus {
      color: var(--color-mono-light);
      background-color: ${({ theme }) => theme.colors.primary.contrast[0].rgb};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.primary.contrast[1].rgb};
    }
  }
  &[data-variant="secondary"] {
    color: ${({ theme }) => theme.colors.primary.alpha[6].rgb};
    background-color: ${({ theme }) => theme.colors.primary.alpha[0].rgb};
    border-color: ${({ theme }) => theme.colors.primary.alpha[0].rgb};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.primary.base};
      background-color: ${({ theme }) => theme.colors.primary.alpha[1].rgb};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.primary.alpha[2].rgb};
    }
  }
  &[data-variant="tertiary"] {
    color: ${({ theme }) => theme.colors.primary.alpha[6].rgb};
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.primary.base};
      border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }
    &:active {
      border-color: ${({ theme }) => theme.colors.text.alpha[2].rgb};
    }
  }

  &[data-variant="mono"] {
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.text.base};
      border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }
    &:active {
      border-color: ${({ theme }) => theme.colors.text.alpha[2].rgb};
    }
  }
  &[data-variant="border"] {
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
    border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    background-color: transparent;

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.text.base};
      background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
      border-color: transparent;
    }
    &:active {
      border-color: ${({ theme }) => theme.colors.text.alpha[2].rgb};
    }
  }
  &[data-variant="ghost"] {
    padding: 0;
    border: none;
    background-color: transparent;
    min-width: fit-content;
    min-height: var(--measurement-medium-60);
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.text.alpha[8].rgb};
    }
    &:active {
      color: ${({ theme }) => theme.colors.text.base};
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
