import React from "react";
import { useKeyPress } from "@foundation-ui/core";

import { ToolbarProvider, useToolbar } from "./hooks";
import { ToolbarWrapper, ToolbarTriggerWrapper } from "./styles";
import { Button, IButtonProperties } from "../..";
import {
  IComponentStyling,
  ComponentSizeEnum,
  ComponentHeightEnum,
  ComponentVariantEnum,
  IComponentSize,
  IReactChildren,
  ComponentSideEnum,
  IComponentControlProperties,
  KeyBindingEnum,
} from "../../../../../types";

export interface IToolbarBodyProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentControlProperties,
    React.ComponentProps<"aside"> {
  defaultOpen?: boolean;
  side?: ComponentSideEnum;
  height?: ComponentHeightEnum;
}
export interface IToolbarSectionProperties
  extends React.ComponentProps<"section"> {
  showoncollapse?: boolean;
}
export interface IToolbarItemProperties extends React.ComponentProps<"div"> {
  showfirstchild?: boolean;
}

export interface IToolbaromposition {
  Root: typeof ToolbarRoot;
  Trigger: typeof ToolbarTrigger;
  Item: typeof ToolbarItem;
  Section: typeof ToolbarSection;
}

/**
 * Toolbar are container component that provides a set of tools or actions for the user.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the toolbar.
 * - Ensure that the toolbar is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the toolbar.
 * - Ensure that the toolbar is responsive and adapts to different screen sizes and orientations.
 *
 * @param {IToolbarBodyProperties} props - The props for the Toolbar component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {string} props.shortcut - The key combination used as keyboard shortcuts to trigger the toolbar.
 * @param {string} props.hotkey - The key to use in the key combination for the keyboard shortcuts.
 * @param {KeyBindingEnum} props.bindkey - The modifier key to use in the key combination.
 * @param {ComponentSizeEnum} props.sizing - The size of the toolbar.
 * @param {ComponentHeightEnum} props.height - The height definition of the toolbar.
 * @param {ComponentSideEnum} props.side - The side of the toolbar.
 * @param {boolean} props.defaultOpen - Whether the toolbar should be open by default.
 * @param {ReactNode} props.children - The content to be rendered inside the toolbar.
 * @returns {ReactElement} The Toolbar component.
 */
const Toolbar = (props: IToolbarBodyProperties) => {
  const {
    shortcut,
    hotkey,
    bindkey,
    raw,
    sizing,
    side,
    height,
    defaultOpen,
    children,
    ...restProps
  } = props;
  const { id, methods, states } = useToolbar();
  const { toggleToolbar } = methods;

  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);
  const orientation =
    side && [ComponentSideEnum.Left, ComponentSideEnum.Right].includes(side)
      ? "vertical"
      : "horizontal";

  React.useEffect(() => {
    if (defaultOpen && toggleToolbar) return toggleToolbar(true);
  }, [defaultOpen]);

  React.useEffect(() => {
    if (shortcut && shortcutControls && toggleToolbar) toggleToolbar();
  }, [shortcutControls]);

  return (
    <ToolbarWrapper
      id={id}
      role="toolbar"
      aria-label={props["aria-label"] || `${id}-toolbar`}
      aria-controls={`${id}-trigger`}
      aria-expanded={Boolean(states.expanded)}
      aria-orientation={orientation}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-height={height}
      data-side={side}
      {...restProps}
    >
      {children}
    </ToolbarWrapper>
  );
};
Toolbar.displayName = "Toolbar";
Toolbar.defaultProps = {
  side: ComponentSideEnum.Left,
  sizing: ComponentSizeEnum.Medium,
  bindkey: KeyBindingEnum.Ctrl,
  height: ComponentHeightEnum.Fullscreen,
};

const ToolbarRoot = ({ children }: IReactChildren) => {
  return <ToolbarProvider>{children}</ToolbarProvider>;
};
ToolbarRoot.displayName = "Toolbar.Root";

/**
 * Accordion.Trigger are used to triggers the expansion and collapse of the associated Toolbar component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated toolbar section.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the Toolbar.Trigger component.
 * @param {ReactNode} props.children - The content to be rendered inside the Toolbar trigger.
 * @returns {ReactElement} The Toolbar.Trigger component.
 */
const ToolbarTrigger = (props: IButtonProperties) => {
  const { raw, onClick, variant, sizing, children, ...restProps } = props;
  const { id, methods, states } = useToolbar();
  const { toggleToolbar } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (toggleToolbar) toggleToolbar(!states.expanded);
  };

  return (
    <ToolbarTriggerWrapper data-raw={Boolean(raw)}>
      <Button
        id={`${id}-trigger`}
        variant={variant}
        sizing={sizing}
        raw={Boolean(raw)}
        onClick={handleClick}
        {...restProps}
      >
        {children}
      </Button>
    </ToolbarTriggerWrapper>
  );
};
ToolbarTrigger.displayName = "Toolbar.Trigger";
ToolbarTrigger.defaultProps = {
  raw: false,
  variant: ComponentVariantEnum.Ghost,
  sizing: ComponentSizeEnum.Small,
};

/**
 * ToolbarSection are used to hold components within a toolbar.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the toolbar section.
 * - Ensure that the toolbar section is visible and accessible to all users, including those using assistive technologies.
 *
 * @param {IToolbarSectionProperties} props - The props for the Toolbar.Section component.
 * @param {boolean} props.showoncollapse - Whether the section should be shown only when the toolbar is collapsed.
 * @param {ReactNode} props.children - The content to be rendered inside the toolbar section.
 * @returns {ReactElement} The Toolbar.Section component.
 */
const ToolbarSection = (props: IToolbarSectionProperties) => {
  const { showoncollapse, children, ...restProps } = props;
  const { states } = useToolbar();
  const { expanded } = states;

  if (showoncollapse) return <section {...restProps}>{children}</section>;
  return <section {...restProps}>{expanded && children}</section>;
};
ToolbarSection.displayName = "Toolbar.Section";
ToolbarSection.defaultProps = {
  showoncollapse: false,
};

/**
 * ToolbarItem is a component that represents an item within a toolbar.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the toolbar item.
 * - Ensure that the toolbar item is visible and accessible to all users, including those using assistive technologies.
 * - Ensure that the toolbar item is focusable and can be interacted with using the keyboard.
 *
 * @param {IToolbarItemProperties} props - The props for the Toolbar.Item component.
 * @param {boolean} props.showfirstchild - Whether to show only the first child of the toolbar item when the toolbar is collapsed.
 * @param {ReactNode} props.children - The content to be rendered inside the toolbar item.
 * @returns {ReactElement} The Toolbar.Item component.
 */
const ToolbarItem = (props: IToolbarItemProperties) => {
  const { showfirstchild, onClick, children, ...restProps } = props;
  const childArray = React.Children.toArray(children);

  const { id, states, methods } = useToolbar();
  const { expanded } = states;
  const { toggleToolbar } = methods;

  const displayFirstChild =
    showfirstchild && childArray.length > 1 && !expanded;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(event);
    if (toggleToolbar && !expanded) toggleToolbar(true);
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden
      aria-describedby={id}
      data-expanded={expanded}
      onClick={handleClick}
      {...restProps}
    >
      {displayFirstChild && childArray[0]}
      {expanded && children}
    </div>
  );
};
ToolbarItem.displayName = "Toolbar.Item";

Toolbar.Root = ToolbarRoot;
Toolbar.Trigger = ToolbarTrigger;
Toolbar.Item = ToolbarItem;
Toolbar.Section = ToolbarSection;

export { Toolbar, ToolbarRoot, ToolbarTrigger, ToolbarItem, ToolbarSection };
