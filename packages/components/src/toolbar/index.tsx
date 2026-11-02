"use client";

import React from "react";

import { ToolbarProvider, useToolbar } from "./hooks";
import {
  ToolbarWrapper,
  ToolbarTriggerWrapper,
  ToolbarContentWrapper,
} from "./styles";
import { Button } from "..";
import {
  ComponentSizeEnum,
  ComponentHeightEnum,
  ComponentVariantEnum,
  ComponentSideEnum,
} from "../types";
import type {
  IToolbarBodyProperties,
  IToolbarContentProperties,
  IToolbarItemProperties,
  IToolbarRootProperties,
  IToolbarSectionProperties,
  IToolbarTriggerProperties,
} from "./types";

export interface IToolbarComposition {
  Root: typeof ToolbarRoot;
  Trigger: typeof ToolbarTrigger;
  Content: typeof ToolbarContent;
  Item: typeof ToolbarItem;
  Section: typeof ToolbarSection;
}

const Toolbar = (props: IToolbarBodyProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    side = ComponentSideEnum.Left,
    height = ComponentHeightEnum.Fullscreen,
    breakOnMobile,
    breakpoint,
    children,
    ...restProps
  } = props;
  const { states, methods } = useToolbar();
  const { state, isMobile, expanded } = states;
  const { configure } = methods;

  // Undefined values keep what <Toolbar.Root> provided
  React.useEffect(() => {
    configure({ breakOnMobile, breakpoint });
  }, [breakOnMobile, breakpoint, configure]);

  return (
    <ToolbarWrapper
      role="toolbar"
      aria-label="Toolbar"
      {...restProps}
      data-sidebar="toolbar"
      data-state={state}
      data-collapsible={expanded ? "" : "icon"}
      data-mobile={isMobile}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-height={height}
      data-side={side}
    >
      {children}
    </ToolbarWrapper>
  );
};

/**
 * Toolbar.Root owns the open state and exposes it through context.
 *
 * @param {IToolbarRootProperties} props
 * @param {boolean} props.open - Controlled open state.
 * @param {boolean} props.defaultOpen - Initial open state when uncontrolled.
 * @param {(open: boolean) => void} props.onOpenChange - Called when the state changes.
 */
const ToolbarRoot = ({
  children,
  ...providerProps
}: IToolbarRootProperties) => {
  return <ToolbarProvider {...providerProps}>{children}</ToolbarProvider>;
};
ToolbarRoot.displayName = "Toolbar.Root";

/**
 * Toolbar.Trigger toggles the toolbar. It exposes `aria-expanded` and
 * `aria-controls` so assistive technology knows what it controls.
 *
 * **Best practices:**
 *
 * - Give the trigger a clear accessible name, as icon-only triggers need an `aria-label`.
 * - Keep the trigger reachable with the keyboard.
 *
 * @param {IToolbarTriggerProperties} props - The props for the Toolbar.Trigger component.
 * @returns {ReactElement} The Toolbar.Trigger component.
 */
const ToolbarTrigger = (props: IToolbarTriggerProperties) => {
  const {
    raw,
    onClick,
    variant = ComponentVariantEnum.Ghost,
    sizing = ComponentSizeEnum.Small,
    children,
    ...restProps
  } = props;
  const { id, states, methods } = useToolbar();
  const { expanded } = states;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) methods.toggle();
  };

  return (
    <ToolbarTriggerWrapper data-raw={Boolean(raw)}>
      <Button
        aria-label={typeof children === "string" ? undefined : "Toggle toolbar"}
        variant={variant}
        sizing={sizing}
        raw={Boolean(raw)}
        {...restProps}
        data-sidebar="trigger"
        data-state={expanded ? "expanded" : "collapsed"}
        aria-controls={`${id}-content`}
        aria-expanded={expanded}
        onClick={handleClick}
      >
        {children}
      </Button>
    </ToolbarTriggerWrapper>
  );
};

ToolbarTrigger.displayName = "Toolbar.Trigger";

/**
 * Toolbar.Content wraps the tools. It stays visible while collapsed so `Item showFirstChild`
 * and `Section alwaysVisible` can render. Sections and Items decide what to show.
 *
 * @param {React.ComponentProps<"div">} props
 * @returns {ReactElement} The Toolbar.Content component.
 */
const ToolbarContent = (props: IToolbarContentProperties) => {
  const { raw, children, ...restProps } = props;
  const { id, states } = useToolbar();

  return (
    <ToolbarContentWrapper
      {...restProps}
      id={`${id}-content`}
      data-raw={Boolean(raw)}
      data-state={states.expanded ? "expanded" : "collapsed"}
    >
      {children}
    </ToolbarContentWrapper>
  );
};

ToolbarContent.displayName = "Toolbar.Content";

/**
 * ToolbarSection groups related tools. Hidden while collapsed unless
 * `alwaysVisible` is set.
 *
 * @param {IToolbarSectionProperties} props - The props for the Toolbar.Section component.
 * @param {boolean} props.alwaysVisible - Keep the section visible when collapsed.
 * @returns {ReactElement} The Toolbar.Section component.
 */
const ToolbarSection = (props: IToolbarSectionProperties) => {
  const { alwaysVisible, children, ...restProps } = props;
  const { expanded } = useToolbar().states;

  return (
    <section
      {...restProps}
      data-sidebar="section"
      data-state={expanded ? "expanded" : "collapsed"}
      hidden={!alwaysVisible && !expanded}
    >
      {children}
    </section>
  );
};

ToolbarSection.displayName = "Toolbar.Section";

/**
 * ToolbarItem is a single tool. When `showFirstChild` is set, the first
 * child stays visible while collapsed. Clicking a collapsed item expands
 * the toolbar.
 *
 * @param {IToolbarItemProperties} props - The props for the Toolbar.Item component.
 * @param {boolean} props.showFirstChild - Keep the first child visible when collapsed.
 * @returns {ReactElement} The Toolbar.Item component.
 */
const ToolbarItem = (props: IToolbarItemProperties) => {
  const { showFirstChild, onClick, children, ...restProps } = props;
  const childArray = React.Children.toArray(children);
  const { states, methods } = useToolbar();
  const { expanded } = states;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && !expanded) methods.setExpanded(true);
  };

  return (
    <div
      {...restProps}
      data-sidebar="item"
      data-state={expanded ? "expanded" : "collapsed"}
      onClick={handleClick}
    >
      {expanded ? children : showFirstChild ? childArray[0] : null}
    </div>
  );
};
ToolbarItem.displayName = "Toolbar.Item";

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Content = ToolbarContent;
Toolbar.Item = ToolbarItem;
Toolbar.Section = ToolbarSection;

export {
  Toolbar,
  ToolbarRoot,
  ToolbarTrigger,
  ToolbarContent,
  ToolbarItem,
  ToolbarSection,
};
