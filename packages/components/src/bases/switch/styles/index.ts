import styled, { css } from "styled-components";

const SwitchDefaultStyles = css`
  all: unset;

  border: var(--measurement-small-10) solid transparent;
  border-radius: var(--measurement-large-90);
  transition: all 0.2s ease-in-out 0s;

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const SwitchVariantsStyles = css`
  &[data-variant="primary"] {
    &[aria-checked="true"] {
      background-color: var(--color-mono-dark);
    }
    &[aria-checked="false"] {
      background-color: var(--alpha-mono-dark-10);
    }
  }

  &[data-variant="ghost"] {
    &[aria-checked="true"] {
      border-color: var(--alpha-mono-dark-10);

      span {
        border: var(--measurement-small-10) solid var(--alpha-mono-dark-10);
        background-color: transparent;
      }
    }
    &[aria-checked="false"] {
      border-color: var(--alpha-mono-dark-10);

      span {
        border: var(--measurement-small-10) solid var(--alpha-mono-dark-10);
        background-color: transparent;
      }
    }
  }
`;
const SwitchSizeStyles = css`
  &[data-size="small"] {
    width: calc(var(--measurement-medium-60) * 1.33);
    height: var(--measurement-medium-50);

    span {
      width: var(--measurement-medium-40);
      height: var(--measurement-medium-40);
      &[data-checked="true"] {
        transform: translateX(var(--measurement-medium-40));
      }
      &[data-checked="false"] {
        transform: translateX(var(--measurement-small-60));
      }
    }
  }

  &[data-size="medium"] {
    width: calc(var(--measurement-medium-60) * 1.66);
    height: var(--measurement-medium-60);

    span {
      width: var(--measurement-medium-50);
      height: var(--measurement-medium-50);
      &[data-checked="true"] {
        transform: translateX(var(--measurement-medium-50));
      }
      &[data-checked="false"] {
        transform: translateX(var(--measurement-small-60));
      }
    }
  }

  &[data-size="large"] {
    width: calc(var(--measurement-medium-60) * 2.33);
    height: var(--measurement-medium-70);

    span {
      width: var(--measurement-medium-60);
      height: var(--measurement-medium-60);
      &[data-checked="true"] {
        transform: translateX(calc(var(--measurement-medium-60) * 1.133));
      }
      &[data-checked="false"] {
        transform: translateX(var(--measurement-small-80));
      }
    }
  }
`;

export const TriggerWrapper = styled.button`
  &[data-raw="false"] {
    ${SwitchDefaultStyles}
    ${SwitchVariantsStyles}
    ${SwitchSizeStyles}
  }
`;
export const Thumb = styled.span`
  &[data-raw="false"] {
    all: unset;
    display: block;

    background: var(--color-mono-whitest);
    border-radius: 100%;
    transition: all 0.1s ease-in-out 0s;
  }
`;
