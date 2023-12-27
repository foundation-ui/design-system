import React, { Children, useCallback } from "react";
import { TabsProvider, useTabs } from "./hooks";
import { IReactChildren } from "../../../../../types";
import { Button, IButtonProperties } from "../button";

export interface ITabsProperties extends React.ComponentPropsWithoutRef<"div"> {
  value?: string;
  defaultOpen?: string;
}

const TabsRoot = ({ children }: IReactChildren) => {
  return <TabsProvider>{children}</TabsProvider>;
};

const Tabs = (props: ITabsProperties) => {
  const { defaultOpen, children, ...restProps } = props;

  const tabsContext = useTabs();
  const { methods } = tabsContext;
  const { applyValue } = methods;

  const childArray = Children.toArray(children);
  const firstChild = childArray[0];

  React.useEffect(() => {
    if (React.isValidElement<{ value: string }>(firstChild)) {
      if (childArray.length > 0 && applyValue)
        applyValue(firstChild.props.value);
    }
  }, []);

  React.useEffect(() => {
    if (defaultOpen && applyValue) applyValue(defaultOpen);
  }, []);

  return (
    <div role="tablist" {...restProps}>
      {children}
    </div>
  );
};

const TabsTrigger = (props: IButtonProperties) => {
  const { value, onClick, children, ...restProps } = props;

  const tabsContext = useTabs();
  const { states, methods } = tabsContext;
  const { applyValue, getTabsId } = methods;

  const triggerId = getTabsId && getTabsId({ value, type: "trigger" });
  const contentId = getTabsId && getTabsId({ value, type: "content" });

  const hasSameValueAsContext = value === states.value;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (applyValue) applyValue(value);
    if (onClick) onClick(event);
  };

  return (
    <Button
      type="button"
      role="tab"
      id={String(triggerId)}
      value={value}
      onClick={handleClick}
      aria-selected={hasSameValueAsContext}
      data-controls={contentId}
      data-state={hasSameValueAsContext ? "active" : "inactive"}
      {...restProps}
    >
      {children}
    </Button>
  );
};

const TabsContent = (props: ITabsProperties) => {
  const { value, children, ...restProps } = props;

  const tabsContext = useTabs();
  const { states, methods } = tabsContext;
  const { getTabsId } = methods;

  const triggerId = getTabsId && getTabsId({ value, type: "trigger" });
  const contentId = getTabsId && getTabsId({ value, type: "content" });

  const hasSameValueAsContext = value === states.value;

  return (
    <div
      tabIndex={0}
      role="tabpanel"
      id={String(contentId)}
      data-value={value}
      data-state={hasSameValueAsContext ? "active" : "inactive"}
      aria-labelledby={triggerId || restProps["aria-labelledby"]}
      {...restProps}
    >
      {hasSameValueAsContext && children}
    </div>
  );
};

Tabs.Root = TabsRoot;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { TabsRoot, Tabs, TabsTrigger, TabsContent };
