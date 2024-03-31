import React from "react";
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
  IComponentStyling,
  IComponentSize,
  IComponentVariant,
} from "../../../../../types";

export interface IPageToolsProperties
  extends IToolbarBodyProperties,
    IToolbarSectionProperties {
  trigger?: React.ReactNode | string;
  triggerProps?: IComponentStyling & IComponentSize & IComponentVariant;
  fixed?: boolean;
}

const Page = (props: any) => {
  const { children } = props;
  return <Container.Row {...props}>{children}</Container.Row>;
};

const PageNavigation = (props: any) => {
  const { children } = props;
  return <PageNavWrapper {...props}>{children}</PageNavWrapper>;
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
    showoncollapse,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <Toolbar.Root>
      <Toolbar
        raw={raw}
        sizing={sizing}
        side={side}
        shortcut={!fixed && shortcut}
        hotkey={hotkey}
        bindkey={bindkey}
        defaultOpen={defaultOpen}
        {...props}
      >
        <Toolbar.Section showoncollapse={showoncollapse}>
          {children}
        </Toolbar.Section>

        {!fixed && (
          <Toolbar.Trigger
            title={
              shortcut ? `${bindkey || "ctrl"} + ${hotkey}` : "toolbar-trigger"
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
  return <PageSectionWrapper {...props}>{children}</PageSectionWrapper>;
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
    showoncollapse,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <Toolbar.Root>
      <PagePanelWrapper
        as={Toolbar}
        raw={raw}
        sizing={sizing}
        side={side}
        shortcut={!fixed && shortcut}
        hotkey={hotkey}
        bindkey={bindkey}
        defaultOpen={defaultOpen}
        aria-label={props["aria-label"]}
      >
        {!fixed && (
          <Toolbar.Trigger
            title={
              shortcut ? `${bindkey || "ctrl"} + ${hotkey}` : "toolbar-trigger"
            }
            onClick={handleClick}
            {...triggerProps}
          >
            {trigger || (
              <span style={{ transform: "rotate(90deg)" }}>&harr;</span>
            )}
          </Toolbar.Trigger>
        )}

        <Toolbar.Section showoncollapse={showoncollapse}>
          {children}
        </Toolbar.Section>
      </PagePanelWrapper>
    </Toolbar.Root>
  );
};

const PageMenu = (props: any) => {
  const { children } = props;
  return <PageMenuWrapper {...props}>{children}</PageMenuWrapper>;
};

Page.Navigation = PageNavigation;
Page.Tools = PageTools;
Page.Content = PageContent;
Page.Panel = PagePanel;
Page.Menu = PageMenu;

export { Page, PageNavigation, PageTools, PagePanel, PageContent, PageMenu };
