import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
} from "../../../../../types";
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

export interface IDrawerStates {
  open: boolean;
}

export interface IDrawerMethods {
  toggleDrawer: () => void;
  getDrawerId: (type: "trigger" | "content" | "inner-control") => string;
}

export interface IDrawerContext {
  id: string;
  states: IDrawerStates;
  methods: IDrawerMethods;
}

export interface IDrawerProviderProperties extends IReactChildren {}
