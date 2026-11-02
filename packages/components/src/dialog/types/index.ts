import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
} from "../../../../../types";
import type { IScrollAreaProperties } from "../../scrollarea/types";

export interface IDialogItemProperties
  extends
    IComponentStyling,
    IComponentSize,
    IScrollAreaProperties,
    React.ComponentProps<"dialog"> {
  lock?: boolean;
}

export interface IDialogStates {
  open: boolean;
}

export interface IDialogMethods {
  toggleDialog: () => void;
  getDialogId: (type: "trigger" | "content" | "inner-control") => string;
}

export interface IDialogContext {
  id: string;
  states: IDialogStates;
  methods: IDialogMethods;
}

export interface IDialogProviderProperties extends IReactChildren {}
