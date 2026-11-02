import type * as React from "react";
import type { IComponentControlProperties } from "../../../../../types";

export interface IPromptProperties
  extends
    IComponentControlProperties,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  cleanup?: boolean;
  onCleanup?: () => void;
  onSubmit?: () => void;
}
