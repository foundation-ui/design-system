import styled, { css } from "styled-components";

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
  max-height: var(--measurement-large-30);
  padding: var(--measurement-medium-60) var(--measurement-medium-30);
`;
export const PageMenuWrapper = styled.menu`
  position: absolute;
  top: var(--measurement-large-30);
  width: 100%;
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

  height: 100%;
  max-height: var(--measurement-large-30);
  margin: 0;
  padding: var(--measurement-medium-60) var(--measurement-medium-30);
`;
export const PagePanelWrapper = styled.menu`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  border-top-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};

  position: absolute;
  bottom: 0;

  height: fit-content;
  min-height: var(--measurement-large-20);
  max-height: var(--measurement-large-90);
  margin: 0;
  padding: var(--measurement-medium-30);
  overflow-y: scroll;
  ${ScrollbarReset}
`;
export const PageSectionWrapper = styled.div`
  height: calc(100dvh - (var(--measurement-large-30) * 2));
  background: ${({ theme }) => theme.colors.body.base};
  position: absolute;
  width: 100%;
  top: calc(var(--measurement-large-30) * 2);
  padding: var(--measurement-medium-60) var(--measurement-medium-30);

  overflow-y: scroll;
  ${ScrollbarReset}
`;
