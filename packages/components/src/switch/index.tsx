"use client";

import React from "react";
import { SwitchProvider, useSwitch } from "./hooks";
import { TriggerWrapper, Thumb } from "./styles";
import {
  IReactChildren,
  ComponentSizeEnum,
  ComponentVariantEnum,
  ComponentShapeEnum,
} from "../types";
import type { ISwitchProperties, ISwitchThumbProperties } from "./types";

export interface ISwitchComposition {
  Root: typeof SwitchRoot;
  Thumb: typeof SwitchThumb;
}

/**
 * Switch are toggle components that allows the user to turn a setting on or off.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for each switch.
 * - The interaction must have predictable behavior.
 *
 * @param {ISwitchProperties} props - The props for the Switch component.
 * @param {boolean} props.raw - Whether the switch should be rendered without any styles.
 * @param {ComponentSizeEnum} props.sizing - The size of the switch.
 * @param {SwitchVariants} props.variant - The variant of the switch.
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @param {boolean} props.checked - The controlled checked state.
 * @param {boolean} props.defaultChecked - The initial state when uncontrolled.
 * @param {(checked: boolean) => void} props.onCheckedChange - Called when the state changes.
 * @param {ReactNode} props.children - The content to be rendered inside the switch.
 * @returns {ReactElement} The Switch component.
 */
const Switch = (props: ISwitchProperties) => {
  const { states, methods } = useSwitch();
  const { applyChecked } = methods;
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    shape = ComponentShapeEnum.Smooth,
    variant = ComponentVariantEnum.Primary,
    name,
    value,
    required,
    disabled,
    checked: checkedProp,
    defaultChecked,
    onClick,
    onCheckedChange,
    children,
    ...restProps
  } = props;

  const isControlled = checkedProp !== undefined;
  const isChecked = Boolean(states.checked);
  const currentState = isChecked ? "checked" : "unchecked";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(event);
    if (event.defaultPrevented) return;

    const next = !isChecked;
    // Uncontrolled: own the state. Controlled: the parent drives it.
    if (!isControlled && applyChecked) applyChecked(next);
    onCheckedChange?.(next);
  };

  // Initial state (uncontrolled)
  React.useEffect(() => {
    if (!isControlled && defaultChecked && applyChecked) {
      applyChecked(defaultChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep context in sync with the controlled value
  React.useEffect(() => {
    if (isControlled && applyChecked) applyChecked(checkedProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedProp]);

  return (
    <React.Fragment>
      <TriggerWrapper
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleClick}
        data-state={currentState}
        data-disabled={Boolean(disabled)}
        data-variant={variant}
        data-shape={shape}
        data-size={sizing}
        data-raw={Boolean(raw)}
        {...restProps}
      >
        {children}
      </TriggerWrapper>

      {/* Buttons don't submit values, so mirror the state in a hidden input */}
      {name && (
        <input
          type="checkbox"
          hidden
          aria-hidden="true"
          tabIndex={-1}
          name={name}
          value={value ?? "on"}
          checked={isChecked}
          required={required}
          disabled={disabled}
          readOnly
        />
      )}
    </React.Fragment>
  );
};
Switch.displayName = "Switch";

const SwitchRoot = (props: IReactChildren) => {
  const { children, ...restProps } = props;
  return <SwitchProvider {...restProps}>{children}</SwitchProvider>;
};
SwitchRoot.displayName = "Switch.Root";

const SwitchThumb = (props: ISwitchThumbProperties) => {
  const {
    raw,
    shape = ComponentShapeEnum.Smooth,
    sizing = ComponentSizeEnum.Medium,
    ...restProps
  } = props;
  const { states } = useSwitch();
  const isChecked = Boolean(states.checked);

  return (
    <Thumb
      aria-hidden="true"
      {...restProps}
      data-state={isChecked ? "checked" : "unchecked"}
      data-checked={isChecked}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-shape={shape}
    />
  );
};
SwitchThumb.displayName = "Switch.Thumb";

Switch.Root = SwitchRoot;
Switch.Thumb = SwitchThumb;

export { SwitchRoot, Switch, SwitchThumb };
