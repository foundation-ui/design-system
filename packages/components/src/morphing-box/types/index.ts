import type * as React from "react";
import type { IComponentSize, IComponentStyling } from "../../../../../types";
import type { IButtonProperties } from "../../button/types";
import type { IScrollAreaProperties } from "../../scrollarea/types";

export interface IMorphingBoxTriggerProperties extends IButtonProperties {
  threshold?: number;
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "left";
  gap?: number;
}

export interface IMorphingBoxItemProperties
  extends
    IComponentStyling,
    IComponentSize,
    IScrollAreaProperties,
    React.ComponentProps<"dialog"> {
  lock?: boolean;
  direction?:
    | "top-left-bottom-center"
    | "top-bottom"
    | "top-right-bottom-center"
    | "right-left"
    | "bottom-right-top-center"
    | "bottom-top"
    | "bottom-left-top-center"
    | "left-right";
}
