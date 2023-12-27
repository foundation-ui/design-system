import React from "react";
import { CheckboxProvider, useCheckbox } from "./hooks";
import { CheckboxWrapper, NativeInput, Indicator } from "./styles";
import { IReactChildren, IComponentStyling } from "../../../../../types";

export interface ICheckboxProperties
  extends IComponentStyling,
    React.ComponentPropsWithoutRef<"input"> {}

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
      data-raw={Boolean(raw)}
      data-state={defaultValue}
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
        aria-disabled={disabled}
        aria-required={required}
        data-state={defaultValue}
        data-raw={Boolean(raw)}
        {...restProps}
      />
      {children}
    </CheckboxWrapper>
  );
};

const CheckboxIndicator = (props: React.ComponentPropsWithoutRef<"span">) => {
  const checkboxContext = useCheckbox();
  const { states } = checkboxContext;
  const { children, ...restProps } = props;

  return (
    <React.Fragment>
      {states.checked && (
        <Indicator {...restProps}>
          {children || (
            <svg
              aria-label="checked-icon"
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
