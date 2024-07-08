import styled from "styled-components";

export const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &[data-raw="false"] {
    background-color: ${({ theme }) => theme.colors.body.alpha[0].rgb};
    backdrop-filter: blur(var(--measurement-medium-30));
  }
`;
