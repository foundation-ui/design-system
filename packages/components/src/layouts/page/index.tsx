import React from "react";
import { usePage, PageProvider } from "./hooks";
import { Container } from "../../";
import {
  Toolbar,
  IToolbarBodyProperties,
  IToolbarSectionProperties,
} from "../../";
import {
  PageNavWrapper,
  PageMenuWrapper,
  PagePanelWrapper,
  PageSectionWrapper,
} from "./styles";
import {
  IReactChildren,
  IComponentStyling,
  IComponentSize,
  IComponentVariant,
} from "../../../../../types";

export interface IPageToolsProperties
  extends IToolbarBodyProperties,
    IToolbarSectionProperties {
  trigger?: React.ReactNode | string;
  triggerProps?: IComponentStyling & IComponentSize & IComponentVariant;
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
    shortcut,
    hotkey,
    bindkey,
    raw,
    sizing,
    side,
    defaultOpen,
    fixed,
    showOnCollapse,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;
  const { id, states, methods } = usePage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <Toolbar.Root>
      <Toolbar
        id={id}
        raw={raw}
        sizing={sizing}
        side={side}
        shortcut={!fixed && shortcut}
        hotkey={hotkey}
        bindkey={bindkey}
        defaultOpen={defaultOpen}
      >
        <Toolbar.Section showOnCollapse={showOnCollapse}>
          {children}
        </Toolbar.Section>

        {!fixed && (
          <Toolbar.Trigger
            title={
              shortcut
                ? `${bindkey || "ctrl"} + ${hotkey}`
                : `${id}-toolbar-trigger`
            }
            onClick={handleClick}
            {...triggerProps}
          >
            {trigger || <span>&harr;</span>}
          </Toolbar.Trigger>
        )}
      </Toolbar>
    </Toolbar.Root>
  );
};

const PageContent = (props: any) => {
  const { children } = props;
  const { id } = usePage();

  return <PageSectionWrapper id={id}>{children}</PageSectionWrapper>;
};

const PagePanel = (props: IPageToolsProperties) => {
  const {
    shortcut,
    hotkey,
    bindkey,
    raw,
    sizing,
    side,
    defaultOpen,
    fixed,
    showOnCollapse,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;

  const { id, states, methods } = usePage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <Toolbar.Root>
      <PagePanelWrapper
        as={Toolbar}
        id={id}
        raw={raw}
        sizing={sizing}
        side={side}
        shortcut={!fixed && shortcut}
        hotkey={hotkey}
        bindkey={bindkey}
        defaultOpen={defaultOpen}
      >
        {!fixed && (
          <Toolbar.Trigger
            title={
              shortcut
                ? `${bindkey || "ctrl"} + ${hotkey}`
                : `${id}-toolbar-trigger`
            }
            onClick={handleClick}
            {...triggerProps}
          >
            {trigger || (
              <span style={{ transform: "rotate(90deg)" }}>&harr;</span>
            )}
          </Toolbar.Trigger>
        )}

        <Toolbar.Section showOnCollapse={showOnCollapse}>
          {children}
        </Toolbar.Section>
      </PagePanelWrapper>
    </Toolbar.Root>
  );
};

const PageMenu = (props: any) => {
  const { children } = props;
  return <PageMenuWrapper>{children}</PageMenuWrapper>;
};

const Page = (props: any) => {
  const { children } = props;
  return <Container.Row>{children}</Container.Row>;
};

Page.Root = PageRoot;
Page.Navigation = PageNavigation;
Page.Tools = PageTools;
Page.Content = PageContent;
Page.Panel = PagePanel;
Page.Menu = PageMenu;

export {
  Page,
  PageRoot,
  PageNavigation,
  PageTools,
  PagePanel,
  PageContent,
  PageMenu,
};
