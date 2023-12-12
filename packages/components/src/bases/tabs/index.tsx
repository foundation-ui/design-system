import React, { Children, useCallback } from "react";
import { TabsProvider, useTabs } from "./hooks/useTabs";
import { IReactChildren } from "../../../../../types";
// import {
//   ITabsContext,
//   ITabsComposition,
//   ITabsTrigger,
//   ITabsContent,
// } from "./interfaces/Tabs.interface";
import { Button } from "../button";

const TabsRoot = ({ children }: IReactChildren) => {
  return <TabsProvider>{children}</TabsProvider>;
};
TabsRoot.displayName = "Tabs.Root";

const Tabs: React.FC & any = (props: any) => {
  const { children, ...restProps } = props;
  const tabs = useTabs();
  const childArray = Children.toArray(children);
  const firstChild = childArray[0];

  React.useEffect(() => {
    if (React.isValidElement<{ value: string }>(firstChild)) {
      childArray.length > 0 && tabs.methods.applyValue(firstChild.props.value);
    }
  }, []);

  return (
    <div role="tablist" {...restProps}>
      {children}
    </div>
  );
};
Tabs.displayName = "Tabs";

const TabsTrigger = (props: any) => {
  const { value, disabled, onClickCallback, children, ...restProps } = props;
  const tabs = useTabs();
  const triggerId = tabs.methods.getTabsId(value, "trigger");
  const contentId = tabs.methods.getTabsId(value, "content");
  const hasSameValueAsContext = value === tabs.states.value;

  const handleCallback = useCallback(
    () => onClickCallback && onClickCallback(),
    []
  );

  const handleClick = () => {
    if (!disabled) {
      handleCallback();
      tabs.methods.applyValue(value);
    }
  };

  return (
    <Button
      id={triggerId}
      value={value}
      type="button"
      role="tab"
      disabled={disabled}
      onClick={handleClick}
      aria-selected={hasSameValueAsContext}
      aria-controls={contentId}
      data-state={hasSameValueAsContext ? "active" : "inactive"}
      {...restProps}
    >
      {children}
    </Button>
  );
};
TabsTrigger.displayName = "Tabs.Trigger";
TabsTrigger.defaultProps = {
  disabled: false,
};

const TabsContent = (props: any) => {
  const { value, children, ...restProps } = props;
  const tabs = useTabs();
  const triggerId = tabs.methods.getTabsId(value, "trigger");
  const contentId = tabs.methods.getTabsId(value, "content");
  const hasSameValueAsContext = value === tabs.states.value;

  return (
    <div
      id={contentId}
      tabIndex={0}
      role="tabpanel"
      value={value}
      aria-labelledby={triggerId}
      data-state={hasSameValueAsContext ? "active" : "inactive"}
      {...restProps}
    >
      {hasSameValueAsContext && children}
    </div>
  );
};
TabsContent.displayName = "Tabs.Content";

Tabs.Root = TabsRoot;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { TabsRoot, Tabs, TabsTrigger, TabsContent };
