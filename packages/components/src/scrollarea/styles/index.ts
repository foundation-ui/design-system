import styled, { css } from "styled-components";

export const HiddenScrollbar = css`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  &::-moz-scrollbar {
    display: none;
  }
`;

export const ScrollAreaWrapper = styled.div<any>`
  overflow: scroll;

  &[data-scrollbar="false"] {
    ${HiddenScrollbar}
  }
`;
