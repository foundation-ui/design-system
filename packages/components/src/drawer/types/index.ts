import type * as React from "react";
import type { IComponentSize, IComponentStyling } from "../../../../../types";
import type { IButtonProperties } from "../../button/types";
import type { IScrollAreaProperties } from "../../scrollarea/types";

export interface IDrawerTriggerProperties extends IButtonProperties {
  threshold?: number;
  position?: "top" | "right" | "bottom" | "left";
  gap?: number;
}

export interface IDrawerItemProperties
  extends
    IComponentStyling,
    IComponentSize,
    IScrollAreaProperties,
    React.ComponentProps<"dialog"> {
  lock?: boolean;
  direction?: "top-bottom" | "right-left" | "bottom-top" | "left-right";
}
