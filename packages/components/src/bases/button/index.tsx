import React from "react";
import { ButtonWrapper } from "./styles";
import { IComponentStyling } from "../../../../../types";

export enum ButtonVariantEnum {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Ghost = "ghost",
}

export type TButtonVariant =
  | ButtonVariantEnum.Primary
  | ButtonVariantEnum.Secondary
  | ButtonVariantEnum.Tertiary
  | ButtonVariantEnum.Ghost;

export interface IButtonProperties
  extends IComponentStyling,
    React.ComponentPropsWithoutRef<"button"> {
  name?: string;
  variant?: TButtonVariant;
}

export const Button = (props: IButtonProperties) => {
  const { name, variant, raw, children, ...restProps } = props;

  const defaultName = "button";
  const ariaLabel = `${name || defaultName}-action`;
  const disabledState = props.disabled || false;
  const buttonType = props.type || "button";

  const buttonDescription = `A ${buttonType} action named ${ariaLabel}`;
  const buttonStateDescription = `The action has a disabled state of: ${disabledState}`;
  const ButtonFullDesc = `${buttonDescription}. ${buttonStateDescription}`;

  return (
    <ButtonWrapper
      role="button"
      type={buttonType}
      name={name || defaultName}
      aria-label={ariaLabel}
      aria-description={ButtonFullDesc}
      aria-disabled={disabledState}
      data-variant={variant}
      data-raw={raw}
      tabIndex={0}
      {...restProps}
    >
      {children}
    </ButtonWrapper>
  );
};
Button.defaultProps = {
  raw: false,
};
