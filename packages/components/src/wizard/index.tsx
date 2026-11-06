"use client";

import React from "react";

import { WizardProvider, useWizard } from "./hooks";

import { Button } from "../button";

import { IReactChildren, ComponentVariantEnum } from "../types";
import type {
  IWizardProperties,
  IWizardTriggerProperties,
  IWizardViewProperties,
  IWizardNavigationProperties,
} from "./types";

export interface IWizardComposition {
  Root: typeof WizardRoot;
  Trigger: typeof WizardTrigger;
  View: typeof WizardView;
  Next: typeof WizardNext;
  Previous: typeof WizardPrevious;
}

/**
 * Wizard guides the user through a sequence of views, one at a time.
 *
 * **Best practices:**
 *
 * - Ensure that the wizard can be navigated using the keyboard.
 * - Ensure that the focus is managed correctly when moving between views.
 * - Ensure that the current view is visibly indicated.
 * - Ensure that the Previous and Next controls are disabled at the boundaries.
 *
 * @param {IWizardProperties} props - The props for the Wizard component.
 * @param {string[]} props.views - The ordered list of view values.
 * @param {ReactNode} props.children - The content to be rendered inside the wizard component.
 * @returns {ReactElement} The Wizard component.
 */
const Wizard = (props: IWizardProperties) => {
  const { views, children, ...restProps } = props;
  const { methods } = useWizard();
  const { applyValue, applyViews } = methods;

  React.useEffect(() => {
    if (applyViews) applyViews(views);
    if (views.length > 0 && applyValue) applyValue(views[0]!);
  }, []);

  return (
    <div role="group" {...restProps}>
      {children}
    </div>
  );
};
Wizard.displayName = "Wizard";

/**
 * WizardRoot component.
 *
 * @returns {ReactElement} The WizardRoot component.
 */
const WizardRoot = ({ children }: IReactChildren) => {
  return <WizardProvider>{children}</WizardProvider>;
};
WizardRoot.displayName = "Wizard.Root";

/**
 * Wizard.Trigger is used to show the associated Wizard.View component on click.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated view.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IWizardTriggerProperties} props - The props for the Wizard.Trigger component.
 * @param {string} props.value - The value used to bind the Wizard.Trigger and Wizard.View components.
 * @param {ReactNode} props.children - The content to be rendered inside the wizard trigger.
 * @returns {ReactElement} The Wizard.Trigger component.
 */
const WizardTrigger = (props: IWizardTriggerProperties) => {
  const { value, onClick, children, ...restProps } = props;
  const { states, methods } = useWizard();
  const { applyValue, getWizardId } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getWizardId && getWizardId({ value, type: "trigger" }),
    content: getWizardId && getWizardId({ value, type: "content" }),
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (applyValue) applyValue(value);
    if (onClick) onClick(event);
  };

  return (
    <Button
      type="button"
      role="tab"
      title={`${value}-trigger`}
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
WizardTrigger.displayName = "Wizard.Trigger";

/**
 * Wizard.View is used to contain the content of the associated Wizard.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the associated view is not active.
 * - Ensure that the content is properly focused when the associated view is active.
 *
 * @param {IWizardViewProperties} props - The props for the Wizard.View component.
 * @param {string} props.value - The value used to bind the Wizard.View and Wizard.Trigger components.
 * @param {ReactNode} props.children - The content to be rendered inside the view.
 * @returns {ReactElement} The Wizard.View component.
 */
const WizardView = (props: IWizardViewProperties) => {
  const { value, children, ...restProps } = props;
  const { states, methods } = useWizard();
  const { getWizardId } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getWizardId && getWizardId({ value, type: "trigger" }),
    content: getWizardId && getWizardId({ value, type: "content" }),
  };

  if (!hasSameValueAsContext) return;

  return (
    <div
      tabIndex={0}
      role="tabpanel"
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
WizardView.displayName = "Wizard.View";

/**
 * Wizard.Previous shows the previous view, following the order of the views property.
 * It is disabled when the current view is the first one.
 *
 * @param {IWizardNavigationProperties} props - The props for the Wizard.Previous component.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @returns {ReactElement} The Wizard.Previous component.
 */
const WizardPrevious = (props: IWizardNavigationProperties) => {
  const { onClick, children, ...restProps } = props;
  const { states, methods } = useWizard();
  const { applyValue } = methods;

  const index = states.views.indexOf(states.value ?? "");
  const isFirst = index <= 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isFirst && applyValue) applyValue(states.views[index - 1]!);
    if (onClick) onClick(event);
  };

  return (
    <Button
      type="button"
      title="previous-view"
      disabled={isFirst}
      onClick={handleClick}
      variant={props.variant ?? ComponentVariantEnum.Ghost}
      {...restProps}
    >
      {children}
    </Button>
  );
};
WizardPrevious.displayName = "Wizard.Previous";

/**
 * Wizard.Next shows the next view, following the order of the views property.
 * It is disabled when the current view is the last one.
 *
 * @param {IWizardNavigationProperties} props - The props for the Wizard.Next component.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @returns {ReactElement} The Wizard.Next component.
 */
const WizardNext = (props: IWizardNavigationProperties) => {
  const { onClick, children, ...restProps } = props;
  const { states, methods } = useWizard();
  const { applyValue } = methods;

  const index = states.views.indexOf(states.value ?? "");
  const isLast = index === -1 || index >= states.views.length - 1;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLast && applyValue) applyValue(states.views[index + 1]!);
    if (onClick) onClick(event);
  };

  return (
    <Button
      type="button"
      title="next-view"
      disabled={isLast}
      onClick={handleClick}
      variant={props.variant ?? ComponentVariantEnum.Ghost}
      {...restProps}
    >
      {children}
    </Button>
  );
};
WizardNext.displayName = "Wizard.Next";

Wizard.Root = WizardRoot;
Wizard.Trigger = WizardTrigger;
Wizard.View = WizardView;
Wizard.Next = WizardNext;
Wizard.Previous = WizardPrevious;

export {
  WizardRoot,
  Wizard,
  WizardTrigger,
  WizardView,
  WizardNext,
  WizardPrevious,
};
