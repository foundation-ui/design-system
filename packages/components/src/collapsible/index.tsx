"use client";

import React from "react";

import { CollapsibleProvider, useCollapsible } from "./hooks";
import { Button, IButtonProperties } from "..";
import { applyDataState } from "../utils";
import { IReactChildren, ComponentVariantEnum } from "../../../../types";

export interface ICollapsibleComposition {
  Root: typeof CollapsibleRoot;
  Trigger: typeof CollapsibleTrigger;
  Content: typeof CollapsibleContent;
}
export interface ICollapsibleProperties extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  showFirstChild?: boolean;
}

/**
 * Collapsible is a component that can be expanded or collapsed by its child trigger component.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements inside the collapsible content.
 * - Ensure that the collapsible content is hidden from screen readers when it is collapsed.
 * - Provide a clear and descriptive label for the trigger element that accurately conveys the content of the collapsible section.
 *
 * @returns {ReactElement} The Collapsible component.
 */
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
Collapsible.displayName = "Collapsible";

const CollapsibleRoot = ({ children }: IReactChildren) => {
  return <CollapsibleProvider>{children}</CollapsibleProvider>;
};
CollapsibleRoot.displayName = "Collapsible.Root";

/**
 * Collapsible.Trigger is used to triggers the expansion and collapse of the associated Collapsible.Content component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated Collapsible section.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the Collapsible.Trigger component.
 * @returns {ReactElement} The Collapsible.Trigger component.
 */
const CollapsibleTrigger = (props: IButtonProperties) => {
  const { children, disabled, onClick, ...restProps } = props;
  const { id, states, methods } = useCollapsible();
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
      variant={props.variant ?? ComponentVariantEnum.Ghost}
      {...restProps}
    >
      {children}
    </Button>
  );
};
CollapsibleTrigger.displayName = "Collapsible.Trigger";

/**
 * Collapsible.Content is used to contains the content of the associated Collapsible.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the associated Collapsible section is collapsed.
 * - Ensure that the content is properly focused when the associated Collapsible section is expanded.
 *
 * @param {ICollapsibleProperties} props - The props for the Collapsible.Content component.components.
 * @param {boolean} props.defaultOpen - The initial open state of the Collapsible content. Defaults to false.
 * @param {boolean} props.showFirstChild - The props used to render the first child component whether the component is closed or not.
 * @param {ReactNode} props.children - The content to be rendered inside the Collapsible.
 * @returns {ReactElement} The Collapsible.Content component.
 */
const CollapsibleContent = (props: ICollapsibleProperties) => {
  const { defaultOpen = false, showFirstChild, children, ...restProps } = props;
  const { id, states, methods } = useCollapsible();
  const { applyDefaultOpen } = methods;

  const childArray = React.Children.toArray(children);
  const displayChildren = states.expanded ?? states.defaultOpen;

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
CollapsibleContent.displayName = "Collapsible.Content";

Collapsible.Root = CollapsibleRoot;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
