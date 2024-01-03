import React from "react";
import { ToolbarProvider, useToolbar } from "./hooks";
import { ToolbarWrapper, ToolbarTriggerWrapper } from "./styles";
import { Button, IButtonProperties } from "../../";
import {
  IComponentStyling,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentSize,
} from "../../../../../types";

export interface IToolbarBodyProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentPropsWithRef<"aside"> {
  open?: boolean;
  direction?: "top" | "right" | "bottom" | "left";
}

export interface IToolbarTriggerProperties extends IButtonProperties {}

const ToolbarRoot = ({ children }: any) => {
  return <ToolbarProvider>{children}</ToolbarProvider>;
};

const Toolbar = (props: IToolbarBodyProperties) => {
  const { raw, sizing, direction, open, children, ...restProps } = props;

  const toolbarContext = useToolbar();
  const { id, methods, states } = toolbarContext;
  const { toggleToolbar } = methods;

  React.useEffect(() => {
    if (!open && toggleToolbar) return toggleToolbar(true);
    return;
  }, []);

  return (
    <ToolbarWrapper
      role="toolbar"
      id={id}
      aria-label={props["aria-label"] || `${id}-toolbar`}
      aria-controls={`${id}-trigger`}
      aria-expanded={Boolean(states.expanded)}
      aria-orientation={
        ["left", "right"].includes(String(direction))
          ? "vertical"
          : "horizontal"
      }
      data-raw={Boolean(raw)}
      data-size={sizing || ComponentSizeEnum.Medium}
      data-side={direction}
      {...restProps}
    >
      {children}
    </ToolbarWrapper>
  );
};

const ToolbarTrigger = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;

  const toolbarContext = useToolbar();
  const { id, methods, states } = toolbarContext;
  const { toggleToolbar } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (toggleToolbar) toggleToolbar(!states.expanded);
  };

  return (
    <ToolbarTriggerWrapper>
      <Button
        id={`${id}-trigger`}
        variant={ComponentVariantEnum.Tertiary}
        sizing={ComponentSizeEnum.Small}
        onClick={handleClick}
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

  if (expanded) return <section {...restProps}>{children}</section>;
};

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Section = ToolbarSection;

export { Toolbar, ToolbarRoot, ToolbarTrigger, ToolbarSection };
