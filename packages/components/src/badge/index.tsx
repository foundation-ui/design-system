import React from "react";
import { BadgeWrapper } from "./styles";

import { IComponentStyling } from "../../../../types";

type IBadgeProperties = {
  variant?: "primary" | "secondary" | "border" | "warning" | "meta";
  shape?: "square" | "smooth" | "round";
} & IComponentStyling &
  React.ComponentProps<"div">;

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
