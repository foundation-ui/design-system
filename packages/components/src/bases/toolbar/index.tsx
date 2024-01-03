import React from "react";
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
} from "../../../../../types";

export interface IToolbarBodyProperties
  extends IComponentStyling,
    IComponentSize,
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
  const { raw, sizing, side, defaultOpen, children, ...restProps } = props;
  const sideDefinition = side || ComponentSideEnum.Left;

  const toolbarContext = useToolbar();
  const { id, methods, states } = toolbarContext;
  const { toggleToolbar } = methods;
  React.useEffect(() => {
    if (defaultOpen && toggleToolbar) return toggleToolbar(true);
  }, [defaultOpen]);

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

  if (expanded) return <section {...restProps}>{children}</section>;
};

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Section = ToolbarSection;

export { Toolbar, ToolbarRoot, ToolbarTrigger, ToolbarSection };
