"use client";

import React from "react";
import { BadgeWrapper } from "./styles";

import {
  ComponentShapeEnum,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentSize,
  TComponentVariant,
  TComponentVariantExtended,
  type IComponentShape,
  type IComponentStyling,
} from "../../../../types";

export interface IBadgeProperties
  extends
    IComponentStyling,
    IComponentShape,
    IComponentSize,
    React.ComponentProps<"div"> {
  variant?: TComponentVariant | TComponentVariantExtended;
  emphasis?: boolean;
}

/**
 * Badges are used to convey data or states to the users.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of badges with different variants.
 * - Badge label must convey short and understandable information.
 *
 * @param {IBadgeProperties} props - The props for the Badge component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to "small".
 * @param {string} props.variant - The style definition used by the component.
 * @param {boolean} props.emphasis - Emphasis change the style definition used by the component.
 * @param {ReactNode} props.children - The content to be rendered inside the Badge.
 * @returns {ReactElement} The Badge component.
 */
export const Badge = (props: IBadgeProperties) => {
  const {
    raw = false,
    emphasis = false,
    sizing = ComponentSizeEnum.Small,
    variant = ComponentVariantEnum.Primary,
    shape = ComponentShapeEnum.Smooth,
    children,
    ...restProps
  } = props;

  return (
    <BadgeWrapper
      data-raw={raw}
      data-variant={variant}
      data-shape={shape}
      data-size={sizing}
      data-emphasis={emphasis}
      {...restProps}
    >
      {children}
    </BadgeWrapper>
  );
};

Badge.displayName = "Badge";
