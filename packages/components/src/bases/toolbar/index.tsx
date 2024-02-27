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
    React.ComponentProps<"aside"> {
  defaultOpen?: boolean;
  fixed?: boolean;
  side?:
    | ComponentSideEnum.Top
    | ComponentSideEnum.Right
    | ComponentSideEnum.Bottom
    | ComponentSideEnum.Left;
}
export interface IToolbarSectionProperties
  extends React.ComponentProps<"section"> {
  showoncollapse?: boolean;
}
export interface IToolbarItemProperties extends React.ComponentProps<"div"> {
  showFirstChild?: boolean;
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
    fixed,
    onClick,
    children,
    ...restProps
  } = props;
  const sideDefinition = side || ComponentSideEnum.Left;

  const { id, methods, states } = useToolbar();
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
    if (!fixed) {
      if (shortcut && shortcutControls && toggleToolbar) toggleToolbar();
    }
  }, [shortcutControls]);

  return (
    <ToolbarWrapper
      id={id}
      role="toolbar"
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
  const { id, methods, states } = useToolbar();
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
const ToolbarSection = (props: IToolbarSectionProperties) => {
  const { showoncollapse, children, ...restProps } = props;
  const { states } = useToolbar();
  const { expanded } = states;

  if (showoncollapse) return <section {...restProps}>{children}</section>;
  return <section {...restProps}>{expanded && children}</section>;
};
const ToolbarItem = (props: IToolbarItemProperties) => {
  const { showFirstChild, onClick, children, ...restProps } = props;
  const childArray = React.Children.toArray(children);

  const { id, states, methods } = useToolbar();
  const { expanded } = states;
  const { toggleToolbar } = methods;

  const displayFirstChild =
    showFirstChild && childArray.length > 1 && !expanded;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(event);
    if (toggleToolbar && !expanded) toggleToolbar(true);
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden
      aria-describedby={id}
      data-expanded={expanded}
      onClick={handleClick}
      {...restProps}
    >
      {displayFirstChild && childArray[0]}
      {expanded && children}
    </div>
  );
};

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Item = ToolbarItem;
Toolbar.Section = ToolbarSection;

export { Toolbar, ToolbarRoot, ToolbarTrigger, ToolbarItem, ToolbarSection };
