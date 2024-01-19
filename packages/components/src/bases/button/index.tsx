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
      data-variant={variant || ComponentVariantEnum.Tertiary}
      data-size={sizing || ComponentSizeEnum.Medium}
      data-raw={Boolean(raw)}
      tabIndex={0}
      {...restProps}
    >
      {children}
    </ButtonWrapper>
  );
};
