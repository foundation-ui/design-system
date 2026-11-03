import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  ComponentSideEnum,
} from "../../types";

export type TooltipPlacement = {
  left: number;
  top: number;
  align: ComponentSideEnum;
};

export interface ITooltipProperties
  extends IComponentStyling, IComponentSize, React.ComponentProps<"span"> {
  delay?: number;
  content: string;
  hint?: string;
  variant?: "primary" | "secondary";
  gap?: number;
  margin?: number;
  children: React.ReactNode;
}
