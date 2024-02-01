import React from "react";
import { CheckboxProvider, useCheckbox } from "./hooks";
import { CheckboxWrapper, NativeInput, Indicator } from "./styles";
import {
  IReactChildren,
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentVariantEnum,
  IComponentVariant,
} from "../../../../../types";

export interface ICheckboxProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentVariant,
    React.ComponentProps<"input"> {}

const CheckboxRoot = (props: IReactChildren) => {
  const { children, ...restProps } = props;
  return <CheckboxProvider {...restProps}>{children}</CheckboxProvider>;
};

const Checkbox = (props: ICheckboxProperties) => {
  const checkboxContext = useCheckbox();
  const { states, methods } = checkboxContext;
  const { applyChecked, toggleChecked } = methods;
  const {
    raw,
    sizing,
    variant,
    name,
    disabled,
    required,
    defaultChecked,
    value,
    onClick,
    children,
    ...restProps
  } = props;
  const defaultValue = states.checked ? "checked" : "unchecked";

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (toggleChecked) toggleChecked();
    if (onClick) onClick(event);
  };

  React.useEffect(() => {
    if (defaultChecked && applyChecked) applyChecked(defaultChecked);
  }, []);

  return (
    <CheckboxWrapper
      role="checkbox"
      aria-hidden="true"
      data-state={defaultValue}
      data-disabled={disabled}
      data-raw={Boolean(raw)}
      data-size={sizing || ComponentSizeEnum.Medium}
      data-variant={variant || ComponentVariantEnum.Tertiary}
      aria-label={props["aria-label"] || `${name}-checkbox`}
    >
      <NativeInput
        type="checkbox"
        tabIndex={0}
        name={name}
        value={value || defaultValue}
        checked={Boolean(states.checked)}
        required={required}
        disabled={disabled}
        onInput={handleClick}
        data-state={defaultValue}
        data-raw={Boolean(raw)}
        aria-disabled={Boolean(disabled)}
        aria-required={Boolean(required)}
        aria-checked={Boolean(states.checked)}
        aria-label={props["aria-label"] || `${name}-native-checkbox`}
        {...restProps}
      />
      {children}
    </CheckboxWrapper>
  );
};

const CheckboxIndicator = (props: React.ComponentProps<"span">) => {
  const checkboxContext = useCheckbox();
  const { states } = checkboxContext;
  const { children, ...restProps } = props;

  return (
    <React.Fragment>
      {states.checked && (
        <Indicator {...restProps}>
          {children || (
            <svg
              tabIndex={-1}
              aria-hidden="true"
              aria-label="checked-icon"
              focusable="false"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <title>Checked</title>
              <path
                d="M2 5.5L4.12132 7.62132L8.36396 3.37868"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Indicator>
      )}
    </React.Fragment>
  );
};

Checkbox.Root = CheckboxRoot;
Checkbox.Indicator = CheckboxIndicator;

export { Checkbox, CheckboxRoot, CheckboxIndicator };
