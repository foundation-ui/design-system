import styled, { css } from "styled-components";

const RadioDefaultStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  -webkit-backdrop-filter: blur(var(--measurement-small-10));
  backdrop-filter: blur(var(--measurement-small-10));
  transition: all ease-in-out 0.2s;
`;

const RadioBeforeDefaultStyles = css`
  content: "";
  inset: 0;

  border-radius: inherit;
  border: var(--measurement-small-10) solid transparent;
  position: absolute;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  mask-composite: intersect;
  -webkit-mask-composite: source-in;

  transition: all ease-in-out 0.2s;
`;

const createColorVariant = (variant: string, color: string) => css`
  &[data-variant="${variant}"] {
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--alpha-${color}-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &::before {
      ${RadioBeforeDefaultStyles}
      border-color: var(--alpha-${color}-30);
      mask-image: linear-gradient(var(--alpha-${color}-30), transparent);
    }

    &:hover,
    &:focus-within,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      &::before {
        border-color: var(--color-${color});
        background-color: var(--alpha-${color}-60);
      }

      svg {
        stroke: var(--color-${color});
      }
    }
  }
`;

const RadioVariantsStyles = css`
  &[data-variant="accent"] {
    background-color: var(--alpha-accent-30);

    &::before {
      ${RadioBeforeDefaultStyles}
      border-color: var(--alpha-accent-30);
      mask-image: linear-gradient(var(--alpha-accent-30), transparent);
    }

    &:hover,
    &:focus-within,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      &::before {
        border-color: var(--color-accent);
      }

      svg {
        stroke: var(--color-accent);
      }
    }
  }
  &[data-variant="primary"] {
    background-color: var(--contrast-color);

    &::before {
      ${RadioBeforeDefaultStyles}
      border-color: var(--font-color-alpha-60);
      mask-image: linear-gradient(var(--font-color-alpha-60), transparent);
    }

    &:hover,
    &:focus-within,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      &::before {
        border-color: var(--font-color-alpha-80);
      }

      svg {
        stroke: var(--font-color);
      }
    }
  }
  &[data-variant="secondary"] {
    background-color: var(--contrast-color);

    &::before {
      ${RadioBeforeDefaultStyles}
      border-color: var(--font-color-alpha-30);
      mask-image: linear-gradient(var(--font-color-alpha-30), transparent);
    }

    &:hover,
    &:focus-within,
    &:active,
    &[data-state="checked"] {
      color: var(--font-color);

      &::before {
        border-color: var(--font-color-alpha-60);
      }

      svg {
        stroke: var(--font-color);
      }
    }
  }
  &[data-variant="tertiary"] {
    border-color: var(--font-color-alpha-10);
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--contrast-color) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    &::before {
      ${RadioBeforeDefaultStyles}
      border-color: var(--font-color-alpha-10);
      mask-image: linear-gradient(var(--font-color-alpha-30), transparent);
    }

    &:hover,
    &:focus-within,
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
  ${createColorVariant("success", "green")}
  ${createColorVariant("meta", "blue")}
  ${createColorVariant("hint", "purple")}
  ${createColorVariant("danger", "red")}
  ${createColorVariant("warning", "orange")}
`;

const RadioSizeStyles = css`
  &[data-size="small"] {
    width: var(--measurement-medium-60);
    height: var(--measurement-medium-60);
  }
  &[data-size="medium"] {
    width: var(--measurement-medium-70);
    height: var(--measurement-medium-70);
  }
  &[data-size="large"] {
    width: var(--fontsize-medium-60);
    height: var(--fontsize-medium-60);
  }
`;

export const RadioWrapper = styled.div`
  cursor: pointer;

  &[data-raw="false"] {
    ${RadioDefaultStyles}
    ${RadioVariantsStyles}
    ${RadioSizeStyles}
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
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
