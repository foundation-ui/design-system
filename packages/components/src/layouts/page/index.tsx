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
import {
  IReactChildren,
  IComponentControlProperties,
  IComponentStyling,
  IComponentSize,
  IComponentVariant,
} from "../../../../../types";

interface IToolTriggerProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentVariant {}
export interface IPageToolsProperties
  extends IToolbarBodyProperties,
    IComponentControlProperties {
  trigger?: React.ReactNode | string;
  triggerProps?: IToolTriggerProperties;
}

const PageRoot = ({ children }: IReactChildren) => {
  return <PageProvider>{children}</PageProvider>;
};
const PageNavigation = (props: any) => {
  const { children } = props;
  return <PageNavWrapper>{children}</PageNavWrapper>;
};
const PageTools = (props: IPageToolsProperties) => {
  const {
    controls,
    shortcut,
    hotkey,
    combokey,
    bindkey,
    raw,
    sizing,
    side,
    defaultOpen,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;

  const pageContext = usePage();
  const { id, states, methods } = pageContext;
  const { updateControls } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);

    updateControls &&
      updateControls({ target: controls, value: !states[controls] });
  };

  return (
    <Toolbar.Root>
      <Toolbar raw={raw} sizing={sizing} side={side} defaultOpen={defaultOpen}>
        <Toolbar.Section>{children}</Toolbar.Section>
        <Toolbar.Trigger onClick={handleClick} {...triggerProps}>
          {trigger || <React.Fragment>&hArr;</React.Fragment>}
        </Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  );
};
const PageContent = (props: any) => {
  const { children } = props;
  return <PageSectionWrapper>{children}</PageSectionWrapper>;
};
const PagePanel = (props: IPageToolsProperties) => {
  const {
    controls,
    shortcut,
    hotkey,
    combokey,
    bindkey,
    sizing,
    side,
    defaultOpen,
    children,
  } = props;

  const pageContext = usePage();
  const { id, states, methods } = pageContext;
  const { panelTool, primaryTool, secondaryTool } = states;
  const { updateControls } = methods;

  return (
    <Toolbar.Root>
      <PagePanelWrapper>
        <Toolbar raw sizing={sizing} side={side} defaultOpen={defaultOpen}>
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
  PageContent,
  PageMenu,
  PagePortal,
};
