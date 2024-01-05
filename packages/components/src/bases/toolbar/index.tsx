import React from "react";
import { useKeyPress } from "@bsw/ds-core";

import { ToolbarProvider, useToolbar } from "./hooks";
import { ToolbarWrapper, ToolbarTriggerWrapper } from "./styles";
import { Button, IButtonProperties } from "../..";
import {
  IComponentStyling,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentSize,
  IReactChildren,
  ComponentSideEnum,
  IComponentControlProperties,
  KeyBindingEnum,
} from "../../../../../types";

export interface IToolbarBodyProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentControlProperties,
    React.ComponentPropsWithoutRef<"aside"> {
  defaultOpen?: boolean;
  side?:
    | ComponentSideEnum.Top
    | ComponentSideEnum.Right
    | ComponentSideEnum.Bottom
    | ComponentSideEnum.Left;
}

const ToolbarRoot = ({ children }: IReactChildren) => {
  return <ToolbarProvider>{children}</ToolbarProvider>;
};
const Toolbar = (props: IToolbarBodyProperties) => {
  const {
    shortcut,
    hotkey,
    bindkey,
    raw,
    sizing,
    side,
    defaultOpen,
    onClick,
    children,
    ...restProps
  } = props;
  const sideDefinition = side || ComponentSideEnum.Left;

  const toolbarContext = useToolbar();
  const { id, methods, states } = toolbarContext;
  const { toggleToolbar } = methods;

  const shortcutControls = useKeyPress(
    String(hotkey),
    true,
    bindkey || KeyBindingEnum.Ctrl
  );

  React.useEffect(() => {
    if (defaultOpen && toggleToolbar) return toggleToolbar(true);
  }, [defaultOpen]);

  React.useEffect(() => {
    if (shortcut && shortcutControls && toggleToolbar) toggleToolbar();
  }, [shortcutControls]);

  return (
    <ToolbarWrapper
      role="toolbar"
      id={id}
      aria-label={props["aria-label"] || `${id}-toolbar`}
      aria-controls={`${id}-trigger`}
      aria-expanded={Boolean(states.expanded)}
      aria-orientation={
        [ComponentSideEnum.Left, ComponentSideEnum.Right].includes(
          sideDefinition
        )
          ? "vertical"
          : "horizontal"
      }
      data-raw={Boolean(raw)}
      data-size={sizing || ComponentSizeEnum.Medium}
      data-side={sideDefinition}
      {...restProps}
    >
      {children}
    </ToolbarWrapper>
  );
};
const ToolbarTrigger = (props: IButtonProperties) => {
  const { raw, onClick, children, ...restProps } = props;

  const toolbarContext = useToolbar();
  const { id, methods, states } = toolbarContext;
  const { toggleToolbar } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (toggleToolbar) toggleToolbar(!states.expanded);
  };

  return (
    <ToolbarTriggerWrapper data-raw={Boolean(raw)}>
      <Button
        id={`${id}-trigger`}
        variant={ComponentVariantEnum.Tertiary}
        sizing={ComponentSizeEnum.Small}
        onClick={handleClick}
        data-raw={Boolean(raw)}
        {...restProps}
      >
        {children}
      </Button>
    </ToolbarTriggerWrapper>
  );
};
const ToolbarSection = (props: React.ComponentPropsWithRef<"section">) => {
  const { children, ...restProps } = props;

  const toolbarContext = useToolbar();
  const { expanded } = toolbarContext.states;

  return <section {...restProps}>{expanded && children}</section>;
};

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Section = ToolbarSection;

export { Toolbar, ToolbarRoot, ToolbarTrigger, ToolbarSection };
