import styled, { css } from "styled-components";
import { FETurbulenceCSSVariable } from "../../";

const OverlayBackgroundStyles = css`
  &[data-background="blur"] {
    backdrop-filter: blur(var(--measurement-medium-10));
    -webkit-backdrop-filter: blur(var(--measurement-medium-10));
  }
  &[data-background="noise"] {
    backdrop-filter: blur(var(--measurement-medium-10));
    -webkit-backdrop-filter: blur(var(--measurement-medium-10));

    /* feTurbulence filter */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;

      background-image: var(--fe-turbulence);
      background-repeat: repeat;
      background-size: 128px 128px;
    }
  }
`;

export const OverlayWrapper = styled.div<any>`
  ${FETurbulenceCSSVariable}
  @keyframes animate-fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--depth-default-90);

  &[data-raw="false"] {
    background-color: var(--alpha-mono-darkest-60);

    ${OverlayBackgroundStyles}

    animation-duration: 0.5s;
    animation-name: animate-fade;
    animation-fill-mode: backwards;
  }
`;
