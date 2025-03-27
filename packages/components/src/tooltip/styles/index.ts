import styled, { css, keyframes } from "styled-components";

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ContentBox = styled.div<any>`
  display: inline-block;
  position: relative;
`;
export const ContentWrapper = styled.span<any>`
  &[data-raw="false"] {
    width: fit-content;
    max-width: var(--measurement-large-60);

    * {
      color: var(--body-color) !important;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    background: var(--font-color);
    padding: var(--measurement-medium-10) var(--measurement-medium-30);
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);
    border-radius: var(--measurement-medium-20);
    font-size: var(--fontsize-medium-10);
    z-index: var(--depth-default-100);
    animation-duration: 0.2s;
    animation-name: ${FadeIn};
    animation-fill-mode: backwards;
  }
`;
