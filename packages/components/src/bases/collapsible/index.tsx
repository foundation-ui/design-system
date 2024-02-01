import React from "react";
import { CollapsibleProvider, useCollapsible } from "./hooks";
import { Button, IButtonProperties } from "../../";
import { applyDataState } from "../../utils";
import { IReactChildren } from "../../../../../types";

export interface ICollapsibleProperties extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  showFirstChild?: boolean;
}

const CollapsibleRoot = ({ children }: IReactChildren) => {
  return <CollapsibleProvider>{children}</CollapsibleProvider>;
};

const Collapsible = (props: ICollapsibleProperties) => {
  const { children, ...restProps } = props;
  const collapsibleContext = useCollapsible();

  return (
    <div
      data-state={applyDataState(Boolean(collapsibleContext.states.expanded))}
      {...restProps}
    >
      {children}
    </div>
  );
};

const CollapsibleTrigger = (props: IButtonProperties) => {
  const { children, disabled, onClick, ...restProps } = props;

  const collapsibleContext = useCollapsible();
  const { id, states, methods } = collapsibleContext;
  const { toggleCollapsible } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleCollapsible) toggleCollapsible();
    if (onClick) onClick(event);
  };

  return (
    <Button
      disabled={disabled}
      aria-controls={id}
      data-state={applyDataState(Boolean(states.expanded))}
      data-expanded={states.expanded}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Button>
  );
};

const CollapsibleContent = (props: ICollapsibleProperties) => {
  const { defaultOpen, showFirstChild, children, ...restProps } = props;

  const collapsibleContext = useCollapsible();
  const { id, states, methods } = collapsibleContext;
  const { applyDefaultOpen } = methods;

  const childArray = React.Children.toArray(children);
  const displayChildren = states.expanded || states.defaultOpen;

  const displayFirstChild =
    showFirstChild && childArray.length > 1 && !states.expanded;

  React.useEffect(() => {
    if (defaultOpen && applyDefaultOpen) applyDefaultOpen();
  }, []);

  return (
    <div
      id={id}
      data-state={applyDataState(Boolean(states.expanded))}
      role="region"
      {...restProps}
    >
      {displayFirstChild && childArray[0]}
      {displayChildren && children}
    </div>
  );
};

Collapsible.Root = CollapsibleRoot;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
