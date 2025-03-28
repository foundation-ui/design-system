"use client";

import React from "react";
import { BadgeWrapper } from "./styles";

import { IComponentStyling } from "../../../../types";

interface IBadgeProperties
  extends IComponentStyling,
    React.ComponentProps<"div"> {
  variant?:
    | "primary"
    | "secondary"
    | "border"
    | "error"
    | "warning"
    | "success"
    | "meta";
  shape?: "square" | "smooth" | "round";
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
 * @param {ComponentSizeEnum} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {ReactNode} props.children - The content to be rendered inside the Badge.
 * @returns {ReactElement} The Badge component.
 */
export const Badge = (props: IBadgeProperties) => {
  const {
    raw = false,
    variant = "primary",
    shape = "smooth",
    children,
    ...restProps
  } = props;

  return (
    <BadgeWrapper
      data-raw={raw}
      data-variant={variant}
      data-shape={shape}
      {...restProps}
    >
      {children}
    </BadgeWrapper>
  );
};
