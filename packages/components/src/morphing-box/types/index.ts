import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
} from "../../../../../types";
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

export interface IMorphingBoxStates {
  open: boolean;
}

export interface IMorphingBoxMethods {
  toggleMorphingBox: () => void;
  getMorphingBoxId: (type: "trigger" | "content" | "inner-control") => string;
}

export interface IMorphingBoxContext {
  id: string;
  states: IMorphingBoxStates;
  methods: IMorphingBoxMethods;
}

export interface IMorphingBoxProviderProperties extends IReactChildren {}
