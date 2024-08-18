import styled from "styled-components";

export const OverlayWrapper = styled.div`
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
    background-color: transparent;
    backdrop-filter: blur(var(--measurement-medium-30));

    animation-duration: 0.2s;
    animation-name: animate-fade;
    animation-fill-mode: backwards;
  }
`;
