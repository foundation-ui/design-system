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
    background-color: var(--alpha-mono-dark-10);
    border: var(--measurement-small-10) solid transparent;

    &:hover,
    &:focus {
      border-color: var(--alpha-mono-dark-10);
    }

    &:active,
    &[data-state="checked"] {
      background-color: var(--color-mono-darker);
    }

    &[data-state="checked"] {
      svg {
        stroke: var(--color-mono-white);
      }
    }
  }

  &[data-variant="secondary"] {
    background-color: var(--alpha-mono-dark-10);
    border: var(--measurement-small-10) solid transparent;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      border-color: var(--alpha-mono-dark-10);
    }

    &[data-state="checked"] {
      svg {
        stroke: var(--color-mono-dark);
      }
    }
  }

  &[data-variant="tertiary"] {
    background-color: var(--color-mono-lightest);
    border: var(--measurement-small-10) solid var(--alpha-mono-dark-10);

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      background-color: var(--alpha-mono-dark-10);
      border-color: transparent;
    }

    &[data-state="checked"] {
      svg {
        stroke: var(--color-mono-dark);
      }
    }
  }

  &[data-variant="ghost"] {
    border: var(--measurement-small-10) solid transparent;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      border-color: var(--alpha-mono-dark-10);

      svg {
        stroke: var(--color-mono-dark);
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
