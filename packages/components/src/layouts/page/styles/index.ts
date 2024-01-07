import styled, { css } from "styled-components";
import { Toolbar } from "../../../";

export const ScrollbarReset = css`
  scrollbar-width: none;
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    display: none;
    height: 0;
    width: 0;
  }
`;

export const PageNavWrapper = styled.nav`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

  height: 100%;
  max-height: var(--measurement-large-20);
  padding: var(--measurement-medium-30);
`;
export const PageMenuWrapper = styled.menu`
  position: absolute;
  top: var(--measurement-large-20);
  width: 100%;
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

  height: 100%;
  max-height: var(--measurement-large-30);
  margin: 0;
  padding: var(--measurement-medium-60) var(--measurement-medium-30);
`;
export const PagePanelWrapper = styled.aside`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  ${ScrollbarReset}
`;
export const PageSectionWrapper = styled.div`
  background: ${({ theme }) => theme.colors.body.contrast};
  position: absolute;
  width: 100%;
  padding: var(--measurement-medium-60) var(--measurement-medium-30);
  top: calc(var(--measurement-large-30) + var(--measurement-large-20));
  height: calc(
    100dvh - (var(--measurement-large-30) + var(--measurement-large-20))
  );

  overflow-y: scroll;
  ${ScrollbarReset}
`;
