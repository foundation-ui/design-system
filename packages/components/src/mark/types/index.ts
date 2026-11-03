import type * as React from "react";
import type {
  IComponentStyling,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../types";

export interface IMarkProperties
  extends IComponentStyling, React.ComponentProps<"span"> {
  variant?: TComponentVariant | TComponentVariantExtended;
  fontFamily?: "monospace" | "inherit";
  children: React.ReactNode;
}
