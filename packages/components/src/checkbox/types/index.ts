import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../../../../types";

export interface ICheckboxProperties
  extends IComponentStyling, IComponentSize, React.ComponentProps<"input"> {
  variant?: TComponentVariant | TComponentVariantExtended | "accent";
  /** Shows the mixed state. Takes visual precedence over `checked`. */
  indeterminate?: boolean;
  /** Called with the next checked value when the user toggles the checkbox. */
  onCheckedChange?: (checked: boolean) => void;
}

export interface ICheckboxStates {
  checked: boolean;
  indeterminate: boolean;
}

export interface ICheckboxMethods {
  toggleChecked: () => void;
  applyChecked: (checked: boolean) => void;
  applyIndeterminate: (indeterminate: boolean) => void;
}

export interface ICheckboxContext {
  id: string;
  states: ICheckboxStates;
  methods: ICheckboxMethods;
}

export interface ICheckboxProviderProperties extends IReactChildren {}
