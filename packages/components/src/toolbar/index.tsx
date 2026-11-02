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
} from "../../../../types";
import type {
  IToolbarBodyProperties,
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

/**
 * Toolbar is a collapsible set of tools or actions.
 *
 * Follows the shadcn Sidebar conventions: state is owned by `Toolbar.Root`,
 * `Toolbar.Trigger` toggles it, and `Ctrl/Cmd + B` toggles it from anywhere.
 *
 * **Best practices:**
 *
 * - Wrap the trigger and content in `Toolbar.Root` to share state.
 * - Use `open` / `onOpenChange` on `Toolbar.Root` to control the state from outside.
 * - Keep the trigger visible at all times so users can always expand the toolbar.
 *
 * @param {IToolbarBodyProperties} props - The props for the Toolbar component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the toolbar.
 * @param {ComponentHeightEnum} props.height - The height definition of the toolbar.
 * @param {ComponentSideEnum} props.side - The side of the toolbar. Drives orientation.
 * @returns {ReactElement} The Toolbar component.
 */
const Toolbar = (props: IToolbarBodyProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    side = ComponentSideEnum.Left,
    height = ComponentHeightEnum.Fullscreen,
    children,
    ...restProps
  } = props;
  const { id, state, open, isMobile, openMobile } = useToolbar();

  const orientation =
    side === "left" || side === "right" ? "vertical" : "horizontal";
  const expanded = isMobile ? openMobile : open;

  return (
    <ToolbarWrapper
      role="toolbar"
      aria-orientation={orientation}
      aria-label={props["aria-label"] ?? "Toolbar"}
      data-sidebar="toolbar"
      data-state={state}
      data-collapsible={expanded ? "" : "icon"}
      data-mobile={isMobile}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-height={height}
      data-side={side}
      data-orientation={orientation}
      data-id={id}
      {...restProps}
    >
      {children}
    </ToolbarWrapper>
  );
};
Toolbar.displayName = "Toolbar";

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
  const { id, open, isMobile, openMobile, toggle } = useToolbar();
  const expanded = isMobile ? openMobile : open;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) toggle();
  };

  return (
    <ToolbarTriggerWrapper data-raw={Boolean(raw)}>
      <Button
        data-sidebar="trigger"
        data-state={expanded ? "expanded" : "collapsed"}
        aria-controls={`${id}-content`}
        aria-expanded={expanded}
        aria-label={
          typeof children === "string"
            ? undefined
            : (props["aria-label"] ?? "Toggle toolbar")
        }
        variant={variant}
        sizing={sizing}
        raw={Boolean(raw)}
        onClick={handleClick}
        {...restProps}
      >
        {children}
      </Button>
    </ToolbarTriggerWrapper>
  );
};
ToolbarTrigger.displayName = "Toolbar.Trigger";

/**
 * Toolbar.Content wraps the toolbar's tools. Its `id` is referenced by the
 * trigger's `aria-controls`. Children stay mounted while collapsed so they
 * can animate, and are hidden from assistive technology when collapsed.
 *
 * @param {React.ComponentProps<"div">} props
 * @returns {ReactElement} The Toolbar.Content component.
 */
const ToolbarContent = (props: React.ComponentProps<"div">) => {
  const { children, ...restProps } = props;
  const { id, open, isMobile, openMobile } = useToolbar();
  const expanded = isMobile ? openMobile : open;

  return (
    <ToolbarContentWrapper
      id={`${id}-content`}
      data-raw="false"
      data-state={expanded ? "expanded" : "collapsed"}
      hidden={!expanded}
      {...restProps}
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
  const { open, isMobile, openMobile } = useToolbar();
  const expanded = isMobile ? openMobile : open;

  return (
    <section
      data-sidebar="section"
      data-state={expanded ? "expanded" : "collapsed"}
      hidden={!alwaysVisible && !expanded}
      {...restProps}
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
  const { open, setOpen, isMobile, openMobile, setOpenMobile } = useToolbar();
  const expanded = isMobile ? openMobile : open;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!expanded) {
      if (isMobile) setOpenMobile(true);
      else setOpen(true);
    }
  };

  return (
    <div
      data-sidebar="item"
      data-state={expanded ? "expanded" : "collapsed"}
      onClick={handleClick}
      {...restProps}
    >
      {!expanded && showFirstChild ? childArray[0] : null}
      {expanded ? children : null}
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
