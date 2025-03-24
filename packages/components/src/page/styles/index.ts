import styled from "styled-components";
import { HiddenScrollbar } from "../../scrollarea/styles";

export const PageRootWrapper = styled.div<any>`
  height: 100dvh;
  width: 100%;
`;
export const PageNavWrapper = styled.nav<any>`
  background-color: var(--body-color);
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: var(--font-color-alpha-10);
  width: 100%;
  height: 100%;
  max-height: var(--measurement-large-20);
  padding: var(--measurement-medium-30);
`;
export const PageMenuWrapper = styled.menu<any>`
  background-color: var(--body-color);
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: var(--font-color-alpha-10);
  width: 100%;
  height: 100%;
  max-height: var(--measurement-large-30);
  margin: 0;
  padding: var(--measurement-medium-60) var(--measurement-medium-30);
`;
export const PagePanelWrapper = styled.aside<any>`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  ${HiddenScrollbar}
`;
export const PageSectionWrapper = styled.div<any>`
  background: var(--body-color);
  width: 100%;
  height: 100%;
`;
export const PageBodyWrapper = styled.div<any>`
  --menus-height: calc(
    var(--measurement-large-30) *
      ${({ $menus }) => ($menus ? Number($menus) : 0)}
  );
  --navs-height: calc(
    var(--measurement-large-20) *
      ${({ $navigations }) => ($navigations ? Number($navigations) : 0)}
  );
  --page-height: calc(100dvh - (var(--menus-height) + var(--navs-height)));

  outline: none;
  display: inline-block;

  height: var(--page-height);
  max-height: var(--page-height);

  width: 100%;
  overflow: scroll;
  ${HiddenScrollbar}
`;
