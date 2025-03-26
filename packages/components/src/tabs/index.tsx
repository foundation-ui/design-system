import React, { Children } from "react";
import { TabsProvider, useTabs } from "./hooks";
import { Button, IButtonProperties } from "../button";
import { TabWrapper } from "./styles";
import { IReactChildren, ComponentVariantEnum } from "../../../../types";

export interface ITabsProperties extends React.ComponentProps<"div"> {
  value?: string;
  defaultOpen?: string;
}

export interface ITabsComposition {
  Root: typeof TabsRoot;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
}

/**
 * Tabs are components for a set of tab panels that allows the user to switch between them.
 *
 * **Best practices:**
 *
 * - Ensure that the tabs can be navigated and activated using the keyboard.
 * - Ensure that the focus is managed correctly when switching between tabs.
 * - Ensure that the active tab is visibly indicated and that its content is visible and focusable.
 *
 * @param {ITabsProperties} props - The props for the Tabs component.
 * @param {string} props.defaultOpen - The value of the tab panel that should be open by default.
 * @param {ReactNode} props.children - The content to be rendered inside the tabs component.
 * @returns {ReactElement} The Tabs component.
 */
const Tabs = (props: ITabsProperties) => {
  const { defaultOpen, children, ...restProps } = props;
  const { methods } = useTabs();
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
    <TabWrapper role="tablist" {...restProps}>
      {children}
    </TabWrapper>
  );
};
Tabs.displayName = "Tabs";

const TabsRoot = ({ children }: IReactChildren) => {
  return <TabsProvider>{children}</TabsProvider>;
};
TabsRoot.displayName = "Tabs.Root";

/**
 * Tabs.Trigger is used to triggers the expansion and collapse of the associated Tabs.Content component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated tab panel.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the Tabs.Trigger component.
 * @param {string} props.value - The value used to bind the Tabs.Trigger and Tabs.Content components.
 * @param {ReactNode} props.children - The content to be rendered inside the tabs trigger.
 * @returns {ReactElement} The Tabs.Trigger component.
 */
const TabsTrigger = (props: IButtonProperties) => {
  const { value, onClick, children, ...restProps } = props;
  const { states, methods } = useTabs();
  const { applyValue, getTabsId } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getTabsId && getTabsId({ value, type: "trigger" }),
    content: getTabsId && getTabsId({ value, type: "content" }),
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (applyValue) applyValue(value);
    if (onClick) onClick(event);
  };

  return (
    <Button
      type="button"
      role="tab"
      title={`${value}-tab`}
      id={String(IdHandler.trigger)}
      value={value}
      onClick={handleClick}
      aria-selected={hasSameValueAsContext}
      data-controls={IdHandler.content}
      data-state={hasSameValueAsContext ? "active" : "inactive"}
      variant={props.variant ?? ComponentVariantEnum.Ghost}
      {...restProps}
    >
      {children}
    </Button>
  );
};
TabsTrigger.displayName = "Tabs.Trigger";

/**
 * Tabs.Content is used to contains the content of the associated Tabs.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the associated tab panel is collapsed.
 * - Ensure that the content is properly focused when the associated tab panel is expanded.
 *
 * @param {ITabsProperties} props - The props for the Tabs.Content component.
 * @param {string} props.value - The value used to bind the Tabs.Content and Tabs.Trigger components.
 * @param {ReactNode} props.children - The content to be rendered inside the tab.
 * @returns {ReactElement} The Tabs.Content component.
 */
const TabsContent = (props: ITabsProperties) => {
  const { value, children, ...restProps } = props;
  const { states, methods } = useTabs();
  const { getTabsId } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getTabsId && getTabsId({ value, type: "trigger" }),
    content: getTabsId && getTabsId({ value, type: "content" }),
  };

  return (
    <div
      tabIndex={0}
      role="tabpanel"
      title={`${value}-tabpanel`}
      id={String(IdHandler.content)}
      data-value={value}
      data-state={hasSameValueAsContext ? "active" : "inactive"}
      aria-labelledby={IdHandler.trigger ?? restProps["aria-labelledby"]}
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
