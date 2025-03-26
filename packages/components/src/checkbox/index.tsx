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
} from "../../../../types";

export interface ICheckboxComposition {
  Root: typeof CheckboxRoot;
  Indicator: typeof CheckboxIndicator;
}

export interface ICheckboxProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentVariant,
    React.ComponentProps<"input"> {}

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
 * @param {boolean} props.defaultChecked - The initial checked state of the checkbox..
 * @param {ReactNode} props.children - The content to be rendered inside the checkbox.
 * @returns {ReactElement} The Checkbox component.
 */
const Checkbox = (props: ICheckboxProperties) => {
  const { states, methods } = useCheckbox();
  const { applyChecked, toggleChecked } = methods;
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Mono,
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
      data-state={value ?? defaultValue}
      data-disabled={disabled}
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-variant={variant}
      aria-label={props["aria-label"] ?? `${name}-checkbox`}
    >
      <NativeInput
        type="checkbox"
        tabIndex={0}
        name={name}
        value={value ?? defaultValue}
        defaultChecked={Boolean(states.checked)}
        required={required}
        disabled={disabled}
        onInput={handleClick}
        data-state={defaultValue}
        data-raw={Boolean(raw)}
        aria-disabled={Boolean(disabled)}
        aria-required={Boolean(required)}
        aria-checked={Boolean(states.checked)}
        aria-label={props["aria-label"] ?? `${name}-native-checkbox`}
        {...restProps}
      />
      {children}
    </CheckboxWrapper>
  );
};
Checkbox.displayName = "Checkbox";

const CheckboxRoot = (props: IReactChildren) => {
  const { children, ...restProps } = props;
  return <CheckboxProvider {...restProps}>{children}</CheckboxProvider>;
};
CheckboxRoot.displayName = "Checkbox.Root";

const CheckboxIndicator = (props: React.ComponentProps<"span">) => {
  const { states } = useCheckbox();
  const { children, ...restProps } = props;

  return (
    <React.Fragment>
      {states.checked && (
        <Indicator {...restProps}>
          {children ?? (
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
CheckboxIndicator.displayName = "Checkbox.Indicator";

Checkbox.Root = CheckboxRoot;
Checkbox.Indicator = CheckboxIndicator;

export { Checkbox, CheckboxRoot, CheckboxIndicator };
