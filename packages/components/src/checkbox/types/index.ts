import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
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
