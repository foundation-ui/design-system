"use client";

import React from "react";

import { useClickOutside } from "@usefui/hooks";
import { SelectProvider, useSelect } from "./hooks";

import { Wrapper, Trigger, Label, Content, List, Item } from "./styles";
import { ScrollArea } from "../scrollarea";

import { applyDataState } from "../utils";
import { IButtonProperties } from "../button";
import {
  IComponentStyling,
  ComponentVariantEnum,
  ComponentShapeEnum,
  ComponentSizeEnum,
} from "../../../../types";

export interface ISelectTriggerProperties extends IButtonProperties {
  error?: boolean;
  children?: React.ReactNode;
}

export interface ISelectContentProperties
  extends IComponentStyling, React.ComponentPropsWithRef<"ul"> {
  defaultOpen?: boolean;
}

export interface ISelectItemProperties
  extends IComponentStyling, Omit<React.ComponentProps<"li">, "onClick"> {
  value?: string;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
}

const SelectRoot = ({ children }: { children: React.ReactElement }) => {
  return <SelectProvider>{children}</SelectProvider>;
};
SelectRoot.displayName = "Select.Root";

/**
 * Select is used to allow users to choose a single value from a list of options.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for the trigger that accurately conveys he purpose of the select.
 * - Ensure that the select can be opened and closed using the keyboard.
 * - Ensure that the select is dismissed when the user clicks outside of it or presses the Esc key.
 * - Wrap this component with `Select.Root` to provide the necessary context.
 *
 * @param {React.ComponentProps<"div">} props - The props for the Select component.
 * @param {ReactNode} props.children - The content to be rendered inside the select.
 * @returns {ReactElement} The Select component.
 */
const Select = ({ children }: React.ComponentProps<"div">) => {
  const selectRef = React.useRef<HTMLDivElement | null>(null);
  const { states, methods } = useSelect();

  const handleClickOutside = () => {
    if (states.open && methods.setOpen) {
      methods.setOpen(false);
    }
  };

  useClickOutside(
    selectRef as React.RefObject<HTMLElement>,
    handleClickOutside,
  );

  return <Wrapper ref={selectRef}>{children}</Wrapper>;
};
Select.displayName = "Select";

/**
 * Select.Trigger is used to control the expansion and collapse of the associated Select.Content component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label that accurately conveys the purpose of the select field.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 * - Use the `error` prop to indicate a validation error state.
 *
 * @param {ISelectTriggerProperties} props - The props for the Select.Trigger component.
 * @param {ComponentVariantEnum} props.variant - The visual variant of the trigger. Defaults to "secondary".
 * @param {ComponentShapeEnum} props.shape - The shape of the trigger. Defaults to "smooth".
 * @param {ComponentSizeEnum} props.sizing - The size of the trigger. Defaults to "medium".
 * @param {boolean} props.error - Whether the trigger should display an error state. Defaults to false.
 * @param {boolean} props.disabled - Whether the trigger is disabled.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ReactNode} props.children - The content to be rendered inside the trigger.
 * @returns {ReactElement} The Select.Trigger component.
 */
const SelectTrigger = (props: ISelectTriggerProperties) => {
  const {
    raw,
    variant,
    shape,
    sizing,
    error = false,
    disabled,
    children,
    ...restProps
  } = props;

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const triggerRect = () => triggerRef.current?.getBoundingClientRect();

  const { id, states, methods } = useSelect();
  const { toggleOpen, setTriggerProps } = methods;

  const handleClick = () => {
    if (disabled) return;
    if (toggleOpen) toggleOpen();
    if (setTriggerProps) {
      setTriggerProps({
        top: Number(triggerRect()?.top),
        right: Number(triggerRect()?.right),
        bottom: Number(triggerRect()?.bottom),
        left: Number(triggerRect()?.left),
        width: Number(triggerRect()?.width),
        height: Number(triggerRect()?.height),
      });
    }
  };

  return (
    <Trigger
      ref={triggerRef}
      type="button"
      role="combobox"
      id={id.split("|").at(0)}
      onClick={handleClick}
      aria-haspopup="listbox"
      aria-expanded={Boolean(states.open)}
      aria-controls={id.split("|").at(-1)}
      data-state={states.open ? "open" : "closed"}
      data-variant={variant ?? ComponentVariantEnum.Secondary}
      data-shape={shape ?? ComponentShapeEnum.Smooth}
      data-size={sizing ?? ComponentSizeEnum.Medium}
      data-error={error}
      data-raw={Boolean(raw)}
      disabled={disabled}
      {...restProps}
    >
      <Label>{children}</Label>
    </Trigger>
  );
};
SelectTrigger.displayName = "Select.Trigger";

/**
 * Select.Content contains the list of options associated with the Select.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the select is collapsed.
 * - Ensure that the content is properly positioned relative to the trigger,
 *   accounting for available viewport space.
 * - Ensure that the content can be dismissed using the Esc key.
 *
 * @param {ISelectContentProperties} props - The props for the Select.Content component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.defaultOpen - The initial open state of the select. Defaults to false.
 * @param {ReactNode} props.children - The list of Select.Item components to render.
 * @returns {ReactElement} The Select.Content component.
 */
const SelectContent = (props: ISelectContentProperties) => {
  const { raw, defaultOpen, children, ...restProps } = props;
  const { id, states, methods } = useSelect();
  const { toggleOpen, setContentProps } = methods;

  const mounted = React.useRef(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const contentRect = () => contentRef?.current?.getBoundingClientRect();
  const bodyRect = (): DOMRect | undefined => {
    if (typeof document !== "undefined") {
      return document?.body?.getBoundingClientRect();
    }
    return undefined;
  };

  const positions = {
    btt: `calc((${states?.triggerProps?.top}px - ${states?.contentProps?.height}px) - (var(--measurement-medium-10) * 2))`,
    ttb: `calc((${states?.triggerProps?.top}px + ${states?.triggerProps?.height}px) + var(--measurement-medium-10))`,
  };

  const dimensions = {
    body_height: bodyRect()?.height ?? 0,
    content_height: states.contentProps.height,
    content_bottom: states.contentProps.bottom,
  };

  const hasEnoughVerticalSpace =
    dimensions.body_height - dimensions.content_bottom >
    dimensions.content_height - dimensions.content_height * 0.9;

  React.useEffect(() => {
    if (defaultOpen && toggleOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    mounted.current = true;

    if (setContentProps) {
      setContentProps({
        top: Number(contentRect()?.top),
        right: Number(contentRect()?.right),
        bottom: Number(contentRect()?.bottom),
        left: Number(contentRect()?.left),
        width: Number(contentRect()?.width),
        height: Number(contentRect()?.height),
      });
    }

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.open]);

  React.useEffect(() => {
    if (!states.open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && methods.setOpen) {
        methods.setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.open]);

  if (!states.open) return null;
  return (
    <ScrollArea
      scrollbar
      as={Content}
      ref={contentRef}
      id={id.split("|").at(-1)}
      role="listbox"
      tabIndex={-1}
      aria-labelledby={id.split("|").at(0)}
      data-state={applyDataState(Boolean(states.open))}
      data-side={hasEnoughVerticalSpace ? "bottom" : "top"}
      data-raw={Boolean(raw)}
      style={{
        top: hasEnoughVerticalSpace ? positions.ttb : positions.btt,
        left: `${states?.triggerProps?.left}px`,
        width: `${states?.triggerProps?.width}px`,
      }}
      {...restProps}
    >
      {children}
    </ScrollArea>
  );
};
SelectContent.displayName = "Select.Content";

/**
 * Select.Item represents a single option within Select.Content.
 *
 * **Best practices:**
 *
 * - Use a clear and concise label that accurately describes the option.
 * - Ensure that the item can be selected using only the keyboard (Space or Enter).
 * - Use the `disabled` prop to prevent selection of unavailable options.
 * - Provide a meaningful `value` prop that will be stored in the select state upon selection.
 *
 * @param {ISelectItemProperties} props - The props for the Select.Item component.
 * @param {string} props.value - The value associated with this option, stored in the select state on selection.
 * @param {boolean} props.disabled - Whether the item is disabled and cannot be selected. Defaults to false.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {Function} props.onClick - Optional callback fired when the item is selected via click or keyboard.
 * @param {ReactNode} props.children - The content to be rendered inside the item.
 * @returns {ReactElement} The Select.Item component.
 */
const SelectItem = (props: ISelectItemProperties) => {
  const { raw, value, disabled, onClick, children, ...restProps } = props;
  const { states, methods } = useSelect();

  const isSelected = states?.value === value;
  const handleSelect = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    if (disabled) return;

    if (methods.setValue) methods.setValue(value);
    if (methods.setOpen) methods.setOpen(false);
    if (onClick) onClick(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (["Space", "Enter"].includes(event.code || event.key) && !disabled) {
      event.preventDefault();
      handleSelect(event);
    }
  };

  return (
    <List
      role="option"
      tabIndex={0}
      aria-disabled={disabled}
      aria-selected={isSelected}
      data-orientation="vertical"
      data-selected={isSelected}
      data-raw={Boolean(raw)}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      <Item>{children}</Item>
    </List>
  );
};
SelectItem.displayName = "Select.Item";

Select.Root = SelectRoot;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;

export { SelectRoot, Select, SelectTrigger, SelectContent, SelectItem };
