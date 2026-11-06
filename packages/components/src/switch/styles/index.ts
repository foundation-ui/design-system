import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const SwitchDefaultStyles = css`
  all: unset;
  ${InsetShadowCSSVariable}

  box-shadow: var(--inset-shadow);
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
    }
    &[aria-checked="false"] {
      background-color: var(--font-color-alpha-10);
    }
  }
  &[data-variant="primary"] {
    &[aria-checked="true"] {
      background-color: var(--color-green);
    }
    &[aria-checked="false"] {
      background-color: var(--font-color-alpha-10);
    }
  }
`;
const SwitchSizeStyles = css`
  &[data-size="small"] {
    --thumb-size: var(--measurement-medium-40);

    padding: 0;

    height: var(--measurement-medium-40);
    width: calc(var(--thumb-size) * 2);

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
const SwitchShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    &[data-size="small"] {
      border-radius: var(--measurement-small-60);
    }

    &[data-size="medium"],
    &[data-size="large"] {
      border-radius: var(--measurement-medium-10);
    }
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
  }
`;

export const TriggerWrapper = styled.button<any>`
  &[data-raw="false"] {
    ${SwitchDefaultStyles}
    ${SwitchVariantsStyles}
    ${SwitchSizeStyles}
    ${SwitchShapeStyles}
  }
`;
export const Thumb = styled.span<any>`
  &[data-raw="false"] {
    all: unset;
    display: block;

    background: white;

    box-shadow:
      0 var(--measurement-small-30) var(--measurement-small-80)
        var(--alpha-mono-darkest-10),
      0 var(--measurement-small-30) var(--measurement-small-60)
        calc(var(--measurement-small-30) * -1) var(--alpha-mono-darkest-10);

    ${SwitchShapeStyles}
    transition: all 0.1s ease-in-out 0.2s;
  }
`;
