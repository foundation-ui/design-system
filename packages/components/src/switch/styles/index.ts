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
      background-color: var(--color-green);
      border-color: var(--font-color-alpha-10);
    }
    &[aria-checked="false"] {
      background-color: var(--font-color-alpha-10);
      border-color: var(--font-color-alpha-10);
    }
  }
  &[data-variant="secondary"] {
    &[aria-checked="true"] {
      background-color: var(--font-color-alpha-10);
      border-color: var(--font-color-alpha-10);
    }
    &[aria-checked="false"] {
      background-color: var(--body-color-alpha-10);
    }
  }

  &[data-variant="ghost"] {
    &[aria-checked="true"] {
      border-color: var(--font-color-alpha-10);
      background-color: var(--body-color-alpha-10);
    }
    &[aria-checked="false"] {
      border-color: var(--font-color-alpha-10);
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

export const TriggerWrapper = styled.button<any>`
  &[data-raw="false"] {
    ${SwitchDefaultStyles}
    ${SwitchVariantsStyles}
    ${SwitchSizeStyles}
  }
`;
export const Thumb = styled.span<any>`
  &[data-raw="false"] {
    all: unset;
    display: block;

    background: var(--font-color-alpha-60);
    border-radius: 100%;
    transition: all 0.1s ease-in-out 0.2s;

    &[data-checked="true"] {
      background: var(--font-color);
    }
  }
`;
