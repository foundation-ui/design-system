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
  &[data-variant="accent"] {
    &[aria-checked="true"] {
      background-color: var(--color-accent);
      border-color: var(--alpha-accent-10);
    }
    &[aria-checked="false"] {
      background-color: var(--font-color-alpha-10);
      border-color: var(--font-color-alpha-10);
    }
  }
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
`;
const SwitchSizeStyles = css`
  &[data-size="small"] {
    --thumb-size: calc(
      var(--measurement-medium-40) - var(--measurement-small-10)
    );

    padding: 0 var(--measurement-small-10);
    width: calc(var(--thumb-size) * 2);
    height: var(--measurement-medium-40);

    span {
      width: var(--thumb-size);
      height: var(--thumb-size);

      &[data-checked="true"] {
        transform: translateX(var(--thumb-size));
      }
    }
  }
  &[data-size="medium"] {
    --thumb-size: calc(
      var(--measurement-medium-60) - var(--measurement-small-10)
    );

    padding: 0 var(--measurement-small-10);
    width: calc(var(--thumb-size) * 2);
    height: var(--measurement-medium-60);

    span {
      width: var(--thumb-size);
      height: var(--thumb-size);

      &[data-checked="true"] {
        transform: translateX(var(--thumb-size));
      }
    }
  }
  &[data-size="large"] {
    --thumb-size: calc(
      var(--measurement-medium-70) - var(--measurement-small-30)
    );

    padding: 0 var(--measurement-small-30);
    width: calc(var(--thumb-size) * 2);
    height: var(--measurement-medium-70);

    span {
      width: var(--thumb-size);
      height: var(--thumb-size);

      &[data-checked="true"] {
        transform: translateX(var(--thumb-size));
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

    background: white;
    border-radius: var(--measurement-large-90);
    box-shadow:
      0 var(--measurement-small-30) var(--measurement-small-80)
        var(--alpha-mono-darkest-10),
      0 var(--measurement-small-30) var(--measurement-small-60)
        calc(var(--measurement-small-30) * -1) var(--alpha-mono-darkest-10);

    transition: all 0.1s ease-in-out 0.2s;
  }
`;
