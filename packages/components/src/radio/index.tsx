"use client";

import React from "react";

import {
  RadioProvider,
  RadioGroupProvider,
  useRadio,
  useRadioGroup,
} from "./hooks";
import { RadioWrapper, NativeInput } from "./styles";

import {
  IReactChildren,
  ComponentSizeEnum,
  ComponentVariantEnum,
} from "../types";
import type { IRadioProperties, IRadioGroupProperties } from "./types";

export interface IRadioComposition {
  Root: typeof RadioRoot;
  Group: typeof RadioGroup;
  Indicator: typeof RadioIndicator;
}

/**
 * Radios are used to select a single option from a set.
 *
 * **Best practices:**
 *
 * - Wrap related radios in `Radio.Group` so only one can be selected.
 * - Use a clear and descriptive label for each radio.
 *
 * @param {IRadioProperties} props - The props for the Radio component.
 * @param {boolean} props.raw - Whether the radio is styled or not. Defaults to `false`.
 * @param {ComponentSizeEnum} props.sizing - The size of the radio. Defaults to `medium`.
 * @param {ComponentVariantEnum} props.variant - The styles used by the radio. Defaults to `secondary`.
 * @param {string} props.value - The value of this option (required inside a group).
 * @param {boolean} props.checked - The controlled checked state (standalone only).
 * @param {boolean} props.defaultChecked - The initial checked state when uncontrolled (standalone only).
 * @param {(checked: boolean) => void} props.onCheckedChange - Called when the radio becomes checked.
 * @param {ReactNode} props.children - The content to be rendered inside the radio.
 * @returns {ReactElement} The Radio component.
 */
const RadioInner = (props: IRadioProperties) => {
  const { states, methods } = useRadio();
  const { applyChecked } = methods;
  const group = useRadioGroup();

  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Secondary,
    name: nameProp,
    disabled: disabledProp,
    required: requiredProp,
    checked: checkedProp,
    defaultChecked,
    value,
    onChange,
    onCheckedChange,
    children,
    ...restProps
  } = props;

  const name = group?.name ?? nameProp;
  const disabled = Boolean(group?.disabled || disabledProp);
  const required = Boolean(group?.required || requiredProp);

  const isGrouped = group !== null;
  const isControlled = !isGrouped && checkedProp !== undefined;

  const isChecked = isGrouped
    ? value !== undefined && group.value === String(value)
    : Boolean(states.checked);
  const currentState = isChecked ? "checked" : "unchecked";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const next = event.target.checked;

    if (isGrouped) {
      if (value !== undefined) group.selectValue(String(value));
    } else if (!isControlled && applyChecked) {
      applyChecked(next);
    }
    if (onCheckedChange) onCheckedChange(next);
    if (onChange) onChange(event);
  };

  React.useEffect(() => {
    if (!isGrouped && !isControlled && defaultChecked && applyChecked) {
      applyChecked(defaultChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isControlled && applyChecked) applyChecked(Boolean(checkedProp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedProp]);

  React.useEffect(() => {
    if (isGrouped && applyChecked) applyChecked(isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGrouped, isChecked]);

  React.useEffect(() => {
    if (
      isGrouped &&
      defaultChecked &&
      value !== undefined &&
      group &&
      group.value === undefined
    ) {
      group.selectValue(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RadioWrapper
      data-state={currentState}
      data-disabled={disabled}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-variant={variant}
    >
      <NativeInput
        type="radio"
        tabIndex={0}
        name={name}
        value={value}
        checked={isChecked}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        data-state={currentState}
        data-raw={Boolean(raw)}
        aria-disabled={disabled}
        aria-required={required}
        aria-checked={isChecked}
        aria-label={props["aria-label"] ?? `${name}-native-radio`}
        {...restProps}
      />
      {children}
    </RadioWrapper>
  );
};
RadioInner.displayName = "Radio";

const Radio = (props: IRadioProperties) => {
  return (
    <RadioProvider>
      <RadioInner {...props} />
    </RadioProvider>
  );
};
Radio.displayName = "Radio";

/**
 * RadioRoot component. Provides per-radio state to the Indicator.
 *
 * @returns {ReactElement} The RadioRoot component.
 */
const RadioRoot = (props: IReactChildren) => {
  const { children, ...restProps } = props;
  return <RadioProvider {...restProps}>{children}</RadioProvider>;
};
RadioRoot.displayName = "Radio.Root";

/**
 * RadioGroup component. Shares name, value and disabled state
 * between radios, and keeps the selection exclusive.
 *
 * @returns {ReactElement} The RadioGroup component.
 */
const RadioGroup = (props: IRadioGroupProperties) => {
  return <RadioGroupProvider {...props} />;
};
RadioGroup.displayName = "Radio.Group";

/**
 * RadioIndicator component.
 *
 * @returns {ReactElement} The RadioIndicator component.
 */
const RadioIndicator = (props: React.ComponentProps<"svg">) => {
  const { states } = useRadio();

  return (
    <React.Fragment>
      {Boolean(states.checked) && (
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
          <title>Selected</title>
          <circle cx="6" cy="6" r="2" strokeWidth="4" />
        </svg>
      )}
    </React.Fragment>
  );
};
RadioIndicator.displayName = "Radio.Indicator";

Radio.Root = RadioRoot;
Radio.Group = RadioGroup;
Radio.Indicator = RadioIndicator;

export { Radio, RadioRoot, RadioGroup, RadioIndicator };
