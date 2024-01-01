import styled, { css } from "styled-components";

const CheckboxDefaultStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(var(--measurement-small-10));
  transition: all ease-in-out 0.2s;
`;
const CheckboxVariantsStyles = css`
  &[data-variant="primary"] {
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    border: var(--measurement-small-10) solid transparent;

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }

    &:active,
    &[data-state="checked"] {
      background-color: ${({ theme }) => theme.colors.text.base};
    }

    &[data-state="checked"] {
      svg {
        stroke: ${({ theme }) => theme.colors.body.base};
      }
    }
  }

  &[data-variant="secondary"] {
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    border: var(--measurement-small-10) solid transparent;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }

    &[data-state="checked"] {
      svg {
        stroke: ${({ theme }) => theme.colors.text.base};
      }
    }
  }

  &[data-variant="tertiary"] {
    background-color: ${({ theme }) => theme.colors.body.base};
    border: var(--measurement-small-10) solid
      ${({ theme }) => theme.colors.text.alpha[0].rgb};

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
      border-color: transparent;
    }

    &[data-state="checked"] {
      svg {
        stroke: ${({ theme }) => theme.colors.text.base};
      }
    }
  }

  &[data-variant="ghost"] {
    border: var(--measurement-small-10) solid transparent;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

      svg {
        stroke: ${({ theme }) => theme.colors.text.base};
      }
    }
  }
`;
const CheckboxSizeStyles = css`
  &[data-size="small"] {
    width: var(--measurement-medium-60);
    height: var(--measurement-medium-60);
    border-radius: var(--measurement-small-80);
  }
  &[data-size="medium"] {
    width: var(--measurement-medium-70);
    height: var(--measurement-medium-70);
    border-radius: var(--measurement-medium-10);
  }
  &[data-size="large"] {
    width: var(--measurement-large-10);
    height: var(--measurement-large-10);
    border-radius: var(--measurement-medium-20);
  }
`;

export const CheckboxWrapper = styled.div`
  cursor: pointer;

  &[data-raw="false"] {
    ${CheckboxDefaultStyles}
    ${CheckboxVariantsStyles}
    ${CheckboxSizeStyles}
  }

  &[data-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;

    svg {
      stroke-opacity: 0.6;
    }
  }
`;
export const NativeInput = styled.input`
  &[data-raw="false"] {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
export const Indicator = styled.span`
  line-height: 0;
  pointer-events: none;
`;
