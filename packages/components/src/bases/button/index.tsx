import React from "react";
import { ButtonWrapper } from "./styles";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentVariantEnum,
  IComponentVariant,
} from "../../../../../types";

export interface IButtonProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentVariant,
    React.ComponentPropsWithoutRef<"button"> {}

/**
 * Buttons are used to initialize an action.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of buttons with different variants.
 * - Button label must be short and understandable.
 *
 * @param {IButtonProperties} props - The props for the Button component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @returns {ReactElement} The Button component.
 */
export const Button = (props: IButtonProperties) => {
  const { name, variant, sizing, raw, children, ...restProps } = props;

  const defaultName = "button";
  const ariaLabel = `${name || defaultName}-action`;
  const disabledState = props.disabled || false;
  const buttonType = props.type || "button";

  const buttonDescription = `${ariaLabel}:${buttonType}`;
  const buttonStateDescription = `disabled:${disabledState}`;
  const ButtonFullDesc = `${buttonDescription}/${buttonStateDescription}`;

  return (
    <ButtonWrapper
      role="button"
      type={buttonType}
      name={name || defaultName}
      aria-label={ariaLabel}
      aria-description={ButtonFullDesc}
      aria-disabled={disabledState}
      data-variant={variant}
      data-size={sizing}
      data-raw={Boolean(raw)}
      tabIndex={0}
      {...restProps}
    >
      {children}
    </ButtonWrapper>
  );
};
Button.displayName = "Button";
Button.defaultProps = {
  variant: ComponentVariantEnum.Mono,
  sizing: ComponentSizeEnum.Medium,
  raw: false,
};
