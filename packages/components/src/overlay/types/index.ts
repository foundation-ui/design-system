import type * as React from "react";
import type { IComponentStyling } from "../../../../../types";

export interface IOverlayProperties
  extends IComponentStyling, React.ComponentProps<"div"> {
  visible?: boolean;
  closeOnInteract?: boolean;
}
