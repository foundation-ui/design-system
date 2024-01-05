import React from "react";
import ReactDOM from "react-dom";
import { useKeyPress } from "@bsw/ds-core";
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
  KeyBindingEnum,
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
export interface IPagePanelProperties extends IToolbarBodyProperties {
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
  const shortcutControls = useKeyPress(
    String(hotkey),
    true,
    bindkey || KeyBindingEnum.Ctrl
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (updateControls)
      updateControls({ target: controls, value: !states[controls] });
  };

  React.useLayoutEffect(() => {
    if (updateControls && defaultOpen) {
      updateControls({ target: controls, value: true });
    }
  }, []);

  React.useEffect(() => {
    if (shortcut && shortcutControls && updateControls) {
      updateControls({ target: controls, value: !states[controls] });
    }
  }, [shortcutControls]);

  return (
    <Toolbar.Root>
      <Toolbar
        id={id}
        raw={raw}
        sizing={sizing}
        side={side}
        defaultOpen={defaultOpen}
        aria-expanded={Boolean(states[controls])}
      >
        {states[controls] && <Toolbar.Section>{children}</Toolbar.Section>}
        <Toolbar.Trigger onClick={handleClick} {...triggerProps}>
          {trigger || <span>&harr;</span>}
        </Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  );
};
const PageContent = (props: any) => {
  const { children } = props;
  return <PageSectionWrapper>{children}</PageSectionWrapper>;
};
const PagePanel = (props: IPagePanelProperties) => {
  const {
    raw,
    sizing,
    side,
    defaultOpen,
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
        raw={raw}
        sizing={sizing}
        side={side}
        defaultOpen={defaultOpen}
      >
        <Toolbar.Trigger onClick={handleClick} {...triggerProps}>
          {trigger || (
            <span style={{ transform: "rotate(90deg)" }}>&harr;</span>
          )}
        </Toolbar.Trigger>
        <Toolbar.Section>{children}</Toolbar.Section>
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
