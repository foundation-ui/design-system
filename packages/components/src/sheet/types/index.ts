import type * as React from "react";
import type {
  IComponentControlProperties,
  IComponentSize,
  IComponentStyling,
  IReactChildren,
} from "../../types";

export interface ISheetStates {
  open: boolean;
}

export interface ISheetMethods {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  getSheetId: (type: "container" | "trigger") => string;
}

export interface ISheetContext {
  id: string;
  states: ISheetStates;
  methods: ISheetMethods;
}

export interface ISheetProviderProperties extends IReactChildren {}

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
