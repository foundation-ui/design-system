import React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../types";

export interface IRadioProperties
  extends IComponentStyling, IComponentSize, React.ComponentProps<"input"> {
  variant?: TComponentVariant | TComponentVariantExtended | "accent";
  onCheckedChange?: (checked: boolean) => void;
}

export interface IRadioStates {
  checked: boolean;
}

export interface IRadioMethods {
  applyChecked: (checked: boolean) => void;
}

export interface IRadioContext {
  id: string;
  states: IRadioStates;
  methods: IRadioMethods;
}

export interface IRadioProviderProperties extends IReactChildren {}

export interface IRadioGroupProperties
  extends
    React.ComponentProps<"div">,
    Omit<React.ComponentProps<"div">, "defaultValue"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

export interface IRadioGroupContext {
  name?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  selectValue: (value: string) => void;
}
