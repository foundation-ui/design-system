import type * as React from "react";
import type {
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IReactChildren,
} from "../../../../../types";

export type SwitchVariants = "primary" | "accent";

export interface ISwitchProperties
  extends
    Omit<React.ComponentProps<"button">, "value">,
    IComponentSize,
    IComponentShape,
    IComponentStyling {
  variant?: SwitchVariants;
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean;
  /** Form field name. Enables form submission. */
  name?: string;
  /** Form value submitted when checked. Defaults to `on`. */
  value?: string;
  /** Marks the field as required in a form. */
  required?: boolean;
  /** Called with the next checked value when the user toggles the switch. */
  onCheckedChange?: (checked: boolean) => void;
}

export interface ISwitchThumbProperties
  extends
    React.ComponentProps<"span">,
    IComponentSize,
    IComponentShape,
    IComponentStyling {}

export interface ISwitchStates {
  checked: boolean;
}

export interface ISwitchMethods {
  toggleChecked: () => void;
  applyChecked: (checked: boolean) => void;
}

export interface ISwitchContext {
  id: string;
  states: ISwitchStates;
  methods: ISwitchMethods;
}

export interface ISwitchProviderProperties extends IReactChildren {}
