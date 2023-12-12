import React, { Children, useCallback } from "react";
import { CollapsibleProvider, useCollapsible } from "./hooks/useCollapsible";
import { applyDataState } from "../../utils";
import { Button } from "../../";

const CollapsibleRoot = ({
  children,
}: React.ComponentPropsWithoutRef<"div">) => {
  return <CollapsibleProvider>{children}</CollapsibleProvider>;
};
CollapsibleRoot.displayName = "Collapsible.Root";

const Collapsible: React.FC & any = (
  props: React.ComponentPropsWithoutRef<"div">
) => {
  const { children, ...restProps } = props;
  const collapsible = useCollapsible();
  return (
    <div
      data-state={applyDataState(collapsible.states.expanded)}
      {...restProps}
    >
      {children}
    </div>
  );
};
Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = (props: any) => {
  const { children, disabled, onClickCallback, ...restProps } = props;
  const collapsible = useCollapsible();

  const handleClickCallback = useCallback(
    () => onClickCallback && onClickCallback(),
    []
  );
  const handleClick = () => {
    collapsible.methods.toggleCollapsible();
    handleClickCallback();
  };

  return (
    <Button
      disabled={disabled}
      aria-expanded={collapsible.states.expanded}
      aria-controls={collapsible.id}
      data-state={applyDataState(collapsible.states.expanded)}
      data-disabled={disabled}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Button>
  );
};
CollapsibleTrigger.displayName = "Collapsible.Trigger";
CollapsibleRoot.defaultProps = {
  disabled: false,
};

const CollapsibleContent = (props: any) => {
  const { defaultOpen, showFirstChild, children, ...restProps } = props;
  const collapsible = useCollapsible();
  const childArray = Children.toArray(children);
  const displayChildren =
    collapsible.states.expanded || collapsible.states.defaultOpen;
  const displayFirstChild =
    !defaultOpen &&
    showFirstChild &&
    childArray.length > 1 &&
    !collapsible.states.expanded;

  React.useEffect(() => {
    const applyDefaultOpen = async () =>
      defaultOpen && collapsible.methods.applyDefaultOpen();
    applyDefaultOpen();
  }, []);

  return (
    <div
      id={collapsible.id}
      data-state={applyDataState(collapsible.states.expanded)}
      {...restProps}
    >
      {displayFirstChild && childArray[0]}
      {displayChildren && children}
    </div>
  );
};
CollapsibleContent.displayName = "Collapsible.Content";
CollapsibleContent.defaultProps = {
  defaultOpen: false,
  showFirstChild: true,
};

Collapsible.Root = CollapsibleRoot;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
