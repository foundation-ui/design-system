import type { ButtonHTMLAttributes } from "react";
import type { IButtonProperties } from "../../button/types";

export interface IToggleProperties
  extends
    IButtonProperties,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean;
  /** Called with the next checked state. */
  onCheckedChange?: (checked: boolean) => void;
  /** Form field name. Submits `value` when checked. */
  name?: string;
  /** Value submitted when checked. Defaults to "on". */
  value?: string;
}
