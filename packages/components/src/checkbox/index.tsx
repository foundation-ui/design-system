"use client";

import React from "react";

import { CheckboxProvider, useCheckbox } from "./hooks";
import { CheckboxWrapper, NativeInput } from "./styles";

import {
  IReactChildren,
  ComponentSizeEnum,
  ComponentVariantEnum,
} from "../types";
import type { ICheckboxProperties } from "./types";

export interface ICheckboxComposition {
  Root: typeof CheckboxRoot;
  Indicator: typeof CheckboxIndicator;
}

/**
 * Checkbox are used to select one or more options from a set.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for each checkbox.
 *
 * @param {ICheckboxProperties} props - The props for the Checkbox component.
 * @param {boolean} props.raw - Whether the checkbox is styled or not. Defaults to `false`.
 * @param {ComponentSizeEnum} props.sizing - The size of the checkbox. Defaults to `medium`.
 * @param {ComponentVariantEnum} props.variant - The styles used by the checkbox. Defaults to `tertiary`.
 * @param {boolean} props.checked - The controlled checked state of the checkbox.
 * @param {boolean} props.defaultChecked - The initial checked state when uncontrolled.
 * @param {boolean} props.indeterminate - Whether the checkbox is in a mixed state.
 * @param {(checked: boolean) => void} props.onCheckedChange - Called when the checked state changes.
 * @param {ReactNode} props.children - The content to be rendered inside the checkbox.
 * @returns {ReactElement} The Checkbox component.
 */
const Checkbox = (props: ICheckboxProperties) => {
  const { states, methods } = useCheckbox();
  const { applyChecked, applyIndeterminate } = methods;
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    name,
    disabled,
    required,
    checked: checkedProp,
    defaultChecked,
    indeterminate,
    value,
    onChange,
    onCheckedChange,
    children,
    ...restProps
  } = props;

  const isControlled = checkedProp !== undefined;
  const isChecked = Boolean(states.checked);
  const isIndeterminate = Boolean(states.indeterminate);
  const currentState = isIndeterminate
    ? "indeterminate"
    : isChecked
      ? "checked"
      : "unchecked";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = event.target.checked;

    // Uncontrolled: own the state. Controlled: the parent drives it.
    if (!isControlled && applyChecked) applyChecked(next);
    if (onCheckedChange) onCheckedChange(next);
    if (onChange) onChange(event);
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

  // Keep context in sync with indeterminate
  React.useEffect(() => {
    if (applyIndeterminate) applyIndeterminate(Boolean(indeterminate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indeterminate]);

  return (
    <CheckboxWrapper
      data-state={currentState}
      data-disabled={disabled}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-variant={variant}
    >
      <NativeInput
        type="checkbox"
        tabIndex={0}
        name={name}
        value={value}
        checked={isChecked}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        data-state={currentState}
        data-raw={Boolean(raw)}
        aria-disabled={Boolean(disabled)}
        aria-required={Boolean(required)}
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        aria-label={props["aria-label"] ?? `${name}-native-checkbox`}
        {...restProps}
      />
      {children}
    </CheckboxWrapper>
  );
};
Checkbox.displayName = "Checkbox";

/**
 * CheckboxRoot component.
 *
 * @returns {ReactElement} The CheckboxRoot component.
 */
const CheckboxRoot = (props: IReactChildren) => {
  const { children, ...restProps } = props;
  return <CheckboxProvider {...restProps}>{children}</CheckboxProvider>;
};
CheckboxRoot.displayName = "Checkbox.Root";

/**
 * CheckboxIndicator component.
 *
 * @returns {ReactElement} The CheckboxIndicator component.
 */
const CheckboxIndicator = (props: React.ComponentProps<"svg">) => {
  const { states } = useCheckbox();
  const indeterminate = Boolean(states.indeterminate);
  const showMark = Boolean(states.checked) || indeterminate;

  return (
    <React.Fragment>
      {showMark && (
        <svg
          tabIndex={-1}
          aria-hidden="true"
          focusable="false"
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          {...props}
        >
          <title>{indeterminate ? "Partially selected" : "Checked"}</title>
          <path
            d={
              indeterminate
                ? "M2 5H8"
                : "M2 5.5L4.12132 7.62132L8.36396 3.37868"
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </React.Fragment>
  );
};
CheckboxIndicator.displayName = "Checkbox.Indicator";

Checkbox.Root = CheckboxRoot;
Checkbox.Indicator = CheckboxIndicator;

export { Checkbox, CheckboxRoot, CheckboxIndicator };
