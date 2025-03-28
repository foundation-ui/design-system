"use client";

import React from "react";
import { ButtonWrapper } from "./styles";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentVariantEnum,
  IComponentVariant,
} from "../../../../types";

export interface IButtonProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentVariant,
    React.ComponentPropsWithRef<"button"> {
  ref?: any;
  rawicon?: boolean;
}

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
 * @param {boolean} props.rawicon - Define whether the component is styles its svg children.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @returns {ReactElement} The Button component.
 */
export const Button = React.forwardRef(
  (props: IButtonProperties, forwardedRef): React.ReactElement => {
    const {
      name,
      variant = ComponentVariantEnum.Mono,
      sizing = ComponentSizeEnum.Medium,
      raw,
      rawicon,
      children,
      ...restProps
    } = props;

    const defaultName = "button";
    const ariaLabel = `${name ?? defaultName}-action`;
    const disabledState = props.disabled ?? false;
    const buttonType = props.type ?? "button";

    const buttonDescription = `${ariaLabel}:${buttonType}`;
    const buttonStateDescription = `disabled:${disabledState}`;
    const ButtonFullDesc = `${buttonDescription}/${buttonStateDescription}`;

    return (
      <ButtonWrapper
        ref={forwardedRef}
        role="button"
        type={buttonType}
        name={name ?? defaultName}
        aria-label={ariaLabel}
        aria-description={ButtonFullDesc}
        aria-disabled={disabledState}
        data-variant={variant}
        data-size={sizing}
        data-raw={Boolean(raw)}
        data-rawicon={Boolean(rawicon)}
        tabIndex={0}
        {...restProps}
      >
        {children}
      </ButtonWrapper>
    );
  }
);
Button.displayName = "Button";
