import type * as React from "react";

import type { IComponentStyling } from "../../types";
import type { ShapeType, VariantTpe } from "../../state-canvas/types";

export interface IOverlayProperties
  extends IComponentStyling, React.ComponentProps<"div"> {
  visible?: boolean;
  closeOnInteract?: boolean;
  canvas?: boolean;
  particlesColor?: string;
  shape?: ShapeType;
  background?: "noise" | "blur";
  variant?: VariantTpe;
}
