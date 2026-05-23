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
  &[data-variant="accent"] {
    background-color: var(--alpha-accent-30);

    ::before {
      border-color: var(--alpha-accent-30);
      mask-image: linear-gradient(var(--alpha-accent-30), transparent);
    }

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      ::before {
        border-color: var(--color-accent);
      }

      svg {
        stroke: var(--color-accent);
      }
    }
  }
  &[data-variant="primary"] {
    background-color: var(--font-color);
    background: linear-gradient(
      180deg,
      var(--font-color) 50%,
      var(--font-color-alpha-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      background-position: 0% 25%;

      svg {
        stroke: var(--body-color);
      }
    }
  }
  &[data-variant="secondary"] {
    background-color: var(--contrast-color);

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      svg {
        stroke: var(--font-color);
      }
    }
  }
  &[data-variant="tertiary"] {
    border-color: var(--font-color-alpha-10);

    background-color: var(--body-color);
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--contrast-color) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      background-color: var(--font-color-alpha-10);
      background-position: 0% 75%;
      border-color: transparent;

      svg {
        stroke: var(--font-color);
      }
    }
  }
  &[data-variant="success"] {
    background-color: var(--alpha-green-30);

    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--alpha-green-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      svg {
        stroke: var(--color-green);
      }
    }
  }
  &[data-variant="meta"] {
    background-color: var(--alpha-blue-30);

    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--alpha-blue-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      svg {
        stroke: var(--color-blue);
      }
    }
  }
  &[data-variant="hint"] {
    background-color: var(--alpha-purple-30);

    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--alpha-purple-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      svg {
        stroke: var(--color-purple);
      }
    }
  }
  &[data-variant="danger"] {
    background-color: var(--alpha-red-30);

    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--alpha-red-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      svg {
        stroke: var(--color-red);
      }
    }
  }
  &[data-variant="warning"] {
    background-color: var(--alpha-orange-30);

    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--alpha-orange-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      svg {
        stroke: var(--color-orange);
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
export const NativeInput = styled.input<any>`
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
export const Indicator = styled.span<any>`
  line-height: 0;
  pointer-events: none;
`;
