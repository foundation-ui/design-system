import styled, { css } from "styled-components";

interface OverlayProps {
  $isHovering: boolean;
}

interface MaskProps {
  $mouseX: number;
  $mouseY: number;
}

const ButtonDefaultStyles = css`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-30);
  font-size: var(--fontsize-medium-20);
  height: fit-content;
  font-weight: 500;
  line-height: 1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;
  backdrop-filter: blur(var(--measurement-small-10));

  width: fit-content;
  transition: all ease-in-out 0.2s;

  span,
  img {
    opacity: 0.6;
  }

  svg,
  span {
    transition: all 0.2s ease-in-out;
  }

  &:hover,
  &:focus,
  &:active {
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
const ButtonIconStyles = css`
  svg {
    width: var(--fontsize-medium-20);
    height: var(--fontsize-medium-20);
  }
`;
const ButtonSizeStyles = css`
  &[data-size="small"] {
    font-size: var(--fontsize-small-60);

    gap: var(--measurement-medium-10);
    padding: var(--measurement-medium-10) var(--measurement-medium-30);
    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-60);

    svg {
      width: var(--fontsize-medium-10);
      height: var(--fontsize-medium-10);
    }
  }
  &[data-size="medium"] {
    padding: var(--measurement-medium-10) var(--measurement-medium-60);
    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-80);
  }
  &[data-size="large"] {
    padding: var(--measurement-medium-10) var(--measurement-medium-60);
    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-90);
  }
`;
const ButtonShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-20);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
  }
`;
const ButtonBeforeDefaultStyles = css`
  content: "";
  inset: 0;

  border-radius: inherit;
  border: var(--measurement-small-10) solid transparent;
  position: absolute;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  mask-composite: intersect;

  transition: all ease-in-out 0.2s;
`;
const ButtonVariantsStyles = css`
  &[data-variant="primary"] {
    background-color: var(--font-color);
    background: linear-gradient(
      180deg,
      var(--font-color) 50%,
      var(--font-color-alpha-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--body-color) !important;
    svg * {
      stroke: var(--body-color) !important;
    }

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--body-color-alpha-20);
      mask-image: linear-gradient(var(--body-color-alpha-90), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--body-color);
      background-position: 0% 25%;

      ::before {
        border-color: var(--body-color-alpha-10);
      }
    }
  }
  &[data-variant="secondary"] {
    border-color: var(--font-color-alpha-10);

    background-color: var(--body-color);
    background: linear-gradient(
      180deg,
      transparent 50%,
      var(--body-color) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--font-color-alpha-60) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--font-color-alpha-10);
      mask-image: linear-gradient(var(--font-color-alpha-30), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      background-color: var(--font-color-alpha-10);
      background-position: 0% 75%;
      border-color: transparent;

      ::before {
        border-color: var(--font-color-alpha-20);
      }
    }
  }
  &[data-variant="tertiary"] {
    background-color: transparent;
    background: linear-gradient(
      -180deg,
      transparent 50%,
      var(--font-color-alpha-10) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 10%;

    color: var(--font-color-alpha-60) !important;

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      background-color: var(--font-color-alpha-10);
      background-position: 0% 75%;

      ::before {
        ${ButtonBeforeDefaultStyles}
        border-color: var(--font-color-alpha-10);
        mask-image: linear-gradient(var(--font-color-alpha-30), transparent);
      }
    }
  }
  &[data-variant="mono"] {
    background-color: var(--contrast-color);
    color: var(--font-color-alpha-80) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--font-color-alpha-10);
      mask-image: linear-gradient(var(--font-color-alpha-30), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);

      ::before {
        border-color: var(--font-color-alpha-30);
      }
    }
  }
  &[data-variant="border"] {
    background-color: transparent;
    border-color: var(--font-color-alpha-10);
    color: var(--font-color-alpha-60) !important;

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      border-color: var(--font-color-alpha-20);
    }

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--font-color-alpha-10);
      mask-image: linear-gradient(var(--font-color-alpha-20), transparent);
    }
  }

  &[data-variant="accent"] {
    background-color: var(--color-accent);
    background: linear-gradient(
      180deg,
      var(--color-accent) 50%,
      var(--shade-accent-30) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-20) * -1) var(--alpha-mono-darkest-60);

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--shade-accent-10);
      mask-image: linear-gradient(var(--shade-accent-10), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      background-color: var(--tint-accent-10);

      background-position: 0% 75%;
    }
  }

  &[data-variant="meta"] {
    background-color: var(--color-blue);
    background: linear-gradient(
      180deg,
      var(--tint-blue-10) 50%,
      var(--alpha-blue-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--alpha-mono-white-80) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--tint-blue-30);
      mask-image: linear-gradient(var(--tint-blue-10), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-white);
      background-color: var(--shade-blue-10);

      background-position: 0% 25%;

      ::before {
        border-color: var(--tint-blue-40);
      }
    }
  }
  &[data-variant="hint"] {
    background-color: var(--color-purple);
    background: linear-gradient(
      180deg,
      var(--shade-purple-10) 50%,
      var(--alpha-purple-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--alpha-mono-white-80) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--shade-purple-20);
      mask-image: linear-gradient(var(--shade-purple-10), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-white);
      background-color: var(--shade-purple-10);

      background-position: 0% 25%;
    }
  }
  &[data-variant="success"] {
    background-color: var(--shade-green-30);
    background: linear-gradient(
      180deg,
      var(--shade-green-10) 50%,
      var(--alpha-green-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--alpha-mono-white-80) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--shade-green-20);
      mask-image: linear-gradient(var(--shade-green-10), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-white);
      background-color: var(--shade-green-10);

      background-position: 0% 75%;
    }
  }
  &[data-variant="danger"] {
    background-color: var(--color-red);
    background: linear-gradient(
      180deg,
      var(--tint-red-10) 50%,
      var(--alpha-red-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--alpha-mono-white-80) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--tint-red-60);
      mask-image: linear-gradient(var(--tint-red-10), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-white);
      background-color: var(--shade-red-10);
      background-position: 0% 25%;

      ::before {
        border-color: var(--tint-red-80);
      }
    }
  }
  &[data-variant="warning"] {
    background-color: var(--color-orange);
    background: linear-gradient(
      180deg,
      var(--tint-orange-10) 50%,
      var(--alpha-orange-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--alpha-mono-dark-80) !important;

    ::before {
      ${ButtonBeforeDefaultStyles}
      border-color: var(--tint-orange-30);
      mask-image: linear-gradient(var(--tint-orange-10), transparent);
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-dark);
      background-color: var(--shade-orange-10);

      background-position: 0% 25%;

      ::before {
        border-color: var(--tint-orange-40);
      }
    }
  }

  &[data-variant="link"] {
    position: relative;
    border: none;
    padding: 0;
    background-color: transparent;
    min-width: fit-content;
    min-height: var(--measurement-medium-60);
    color: currentColor;
    opacity: 0.6;

    ::before {
      content: "";
      position: absolute;
      width: 0;
      height: var(--measurement-small-30);
      background-color: transparent;
      bottom: calc(var(--measurement-small-80) * -1);
      left: var(--measurement-small-10);

      transition: all ease-in-out 0.2s;
      transform-origin: left left;
    }

    &:hover,
    &:focus,
    &:active {
      opacity: 1;

      ::before {
        width: calc(100% - var(--measurement-small-10));
        background-color: currentColor;
      }
    }
  }
  &[data-variant="ghost"] {
    border: none;
    padding: 0;
    background-color: transparent;
    min-width: fit-content;
    min-height: fit-content;
    color: var(--font-color-alpha-60);
    line-height: 0;

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
    }
  }
`;

export const ButtonWrapper = styled.button`
  &[data-raw="false"] {
    ${ButtonDefaultStyles}
    ${ButtonSizeStyles}
    ${ButtonShapeStyles}
    ${ButtonVariantsStyles}

    &[data-rawIcon="false"] {
      ${ButtonIconStyles}
    }
  }
`;
export const ButtonOverlay = styled.div<OverlayProps>`
  position: absolute;
  inset: -1px;
  pointer-events: none;
  opacity: ${(props) => (props.$isHovering ? 1 : 0)};
  background: transparent;
  transition: opacity 0.2s ease-in-out;

  ${ButtonShapeStyles}
`;
export const ButtonMaskElement = styled.div<MaskProps>`
  position: absolute;
  inset: 0;
  background: transparent;
  border: var(--measurement-small-10) solid var(--font-color-alpha-20);
  clip-path: inset(0 round var(--measurement-medium-30));

  mask-image: radial-gradient(
    circle at ${(props) => props.$mouseX}% ${(props) => props.$mouseY}%,
    var(--body-color),
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle at ${(props) => props.$mouseX}% ${(props) => props.$mouseY}%,
    var(--body-color),
    transparent 100%
  );

  ${ButtonShapeStyles}
`;
