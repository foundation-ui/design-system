import React from "react";
import { ToolbarProvider, useToolbar } from "./hooks";
import { Button } from "../../";

export interface IToolbarBodyProperties
  extends React.ComponentPropsWithRef<"aside"> {
  open?: boolean;
  direction?: "left" | "right";
}

const ToolbarRoot = ({ children }: any) => {
  return <ToolbarProvider>{children}</ToolbarProvider>;
};

const Toolbar = (props: IToolbarBodyProperties) => {
  const { open, children, ...restProps } = props;

  const toolbarContext = useToolbar();
  const { methods, states } = toolbarContext;
  const { toggleToolbar } = methods;

  React.useEffect(() => {
    if (!open && toggleToolbar) return toggleToolbar(true);
    return;
  }, []);

  return <aside {...restProps}>{states.expended && children}</aside>;
};

const ToolbarTrigger = (props: any) => {
  const { onClick, children, ...restProps } = props;

  const toolbarContext = useToolbar();
  const { methods, states } = toolbarContext;
  const { toggleToolbar } = methods;

  const handleClick = () => {
    if (onClick) onClick();
    if (toggleToolbar) toggleToolbar();
  };
  return (
    <Button variant="ghost" onClick={handleClick} {...restProps}>
      {children}
    </Button>
  );
};

const ToolbarSection = (props: React.ComponentPropsWithRef<"section">) => {
  const { children, ...restProps } = props;

  return <section {...restProps}>{children}</section>;
};

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Section = ToolbarSection;

export { Toolbar, ToolbarRoot, ToolbarTrigger, ToolbarSection };
