import styled from "styled-components";
import { HiddenScrollbar } from "../../scrollarea/styles";
import { IPageWrapperProperties } from "../";

export const PageRootWrapper = styled.div`
  height: 100dvh;
  width: 100%;
`;
export const PageNavWrapper = styled.nav`
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  width: 100%;
  height: 100%;
  max-height: var(--measurement-large-20);
  padding: var(--measurement-medium-30);
`;
export const PageMenuWrapper = styled.menu`
  background-color: ${({ theme }) => theme.colors.body.contrast};
  border: var(--measurement-small-10) solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  width: 100%;
  height: 100%;
  max-height: var(--measurement-large-30);
  margin: 0;
  padding: var(--measurement-medium-60) var(--measurement-medium-30);
`;
export const PagePanelWrapper = styled.aside`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  ${HiddenScrollbar}
`;
export const PageSectionWrapper = styled.div`
  background: ${({ theme }) => theme.colors.body.contrast};
  width: 100%;
  height: 100%;
`;
export const PageBodyWrapper = styled.div<IPageWrapperProperties>`
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
