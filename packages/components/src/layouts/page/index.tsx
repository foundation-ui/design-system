import React from "react";
import ReactDOM from "react-dom";

import { usePage, PageProvider } from "./hooks";
import { Container } from "../../";
import { Toolbar, IToolbarBodyProperties } from "../../";
import {
  PageNavWrapper,
  PageMenuWrapper,
  PagePanelWrapper,
  PageSectionWrapper,
} from "./styles";
import { IReactChildren } from "../../../../../types";
import styled from "styled-components";

const PageRoot = ({ children }: IReactChildren) => {
  return <PageProvider>{children}</PageProvider>;
};
const PageNavigation = (props: any) => {
  const { children } = props;
  return <PageNavWrapper>{children}</PageNavWrapper>;
};
const PageTools = (props: IToolbarBodyProperties) => {
  const { children } = props;
  return (
    <Toolbar.Root>
      <Toolbar {...props}>
        <Toolbar.Section>{children}</Toolbar.Section>
        <Toolbar.Trigger>Toolbar</Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  );
};
const PageSection = (props: any) => {
  const { children } = props;
  return <Container.Col>{children}</Container.Col>;
};
const PageContent = (props: any) => {
  const { children } = props;
  return <PageSectionWrapper>{children}</PageSectionWrapper>;
};
const PagePanel = (props: any) => {
  const { children } = props;
  return (
    <Toolbar.Root>
      <PagePanelWrapper>
        <Toolbar raw {...props}>
          <Toolbar.Section>{children}</Toolbar.Section>
          <Toolbar.Trigger>Panel</Toolbar.Trigger>
        </Toolbar>
      </PagePanelWrapper>
    </Toolbar.Root>
  );
};
const PageMenu = (props: any) => {
  const { children } = props;
  return <PageMenuWrapper>{children}</PageMenuWrapper>;
};
const PagePortal = (props: any) => {
  const { children } = props;
  return <React.Fragment>{children}</React.Fragment>;
};
const Page = (props: any) => {
  const { children } = props;

  const pageContext = usePage();
  const { id, states, methods } = pageContext;

  return <Container.Row>{children}</Container.Row>;
};

Page.Root = PageRoot;
Page.Navigation = PageNavigation;
Page.Tools = PageTools;
Page.Section = PageSection;
Page.Content = PageContent;
Page.Panel = PagePanel;
Page.Menu = PageMenu;
Page.Portal = PagePortal;

export {
  Page,
  PageRoot,
  PageNavigation,
  PageTools,
  PagePanel,
  PageSection,
  PageContent,
  PageMenu,
  PagePortal,
};
