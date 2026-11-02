import type * as React from "react";
import type {
  IComponentControlProperties,
  IComponentSize,
  IComponentStyling,
} from "../../../../../types";

export type MethodsType = React.Dispatch<React.SetStateAction<boolean>> | any;

export interface IContextProperties {
  id: Record<string, string>;
  states: Record<string, string | boolean>;
  methods: Record<string, MethodsType>;
}

export interface ISheetProperties
  extends
    IComponentStyling,
    IComponentSize,
    IComponentControlProperties,
    React.ComponentProps<"dialog"> {
  side?: "left" | "right";
  lock?: boolean;
  overlay?: boolean;
  closeOnInteract?: boolean;
  open?: boolean;
}
