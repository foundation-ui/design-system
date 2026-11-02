import type * as React from "react";
import type { IComponentSize, IComponentStyling } from "../../../../../types";

export interface ITooltipProperties
  extends IComponentStyling, IComponentSize, React.ComponentProps<"span"> {
  delay?: number;
  content: string;
  hint?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}
