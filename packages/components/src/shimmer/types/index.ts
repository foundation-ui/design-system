import type * as React from "react";
import type { IComponentStyling } from "../../types";

export interface ITextShimmerProperties
  extends IComponentStyling, React.HTMLAttributes<HTMLSpanElement> {
  duration?: number;
  spread?: number;
  shimmerColor?: string;
  baseColor?: string;
}
