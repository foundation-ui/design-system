import React from "react";
import ReactDOM from "react-dom";

import { usePage, PageProvider } from "./hooks";
import { IReactChildren } from "../../../../../types";

const PageRoot = ({ children }: IReactChildren) => {
  return <PageProvider>{children}</PageProvider>;
};
const PageNavigation = (props: any) => {
  return;
};
const PageTools = (props: any) => {
  return;
};
const PagePanel = (props: any) => {
  return;
};
const PageMenu = (props: any) => {
  return;
};
const PagePortal = (props: any) => {
  return;
};
const Page = (props: any) => {
  const pageContext = usePage();
  const { id, states, methods } = pageContext;

  return;
};

Page.Root = PageRoot;
Page.Navigation = PageNavigation;
Page.Tools = PageTools;
Page.Panel = PagePanel;
Page.Menu = PageMenu;
Page.Portal = PagePortal;

export {
  Page,
  PageRoot,
  PageNavigation,
  PageTools,
  PagePanel,
  PageMenu,
  PagePortal,
};
