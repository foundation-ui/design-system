import type * as React from "react";
import type {
  IComponentStyling,
  IComponentVariant,
} from "../../../../../types";

export interface IMarkProperties
  extends IComponentStyling, IComponentVariant, React.ComponentProps<"span"> {
  fontFamily?: "monospace" | "inherit";
  children: React.ReactNode;
}
