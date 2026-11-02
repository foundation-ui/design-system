import type * as React from "react";
import type { IComponentShape, IComponentSize } from "../../../../../types";

export interface IPillProperties
  extends
    IComponentSize,
    IComponentShape,
    React.HTMLAttributes<HTMLDivElement> {
  pulse?: boolean;
  fixed?: boolean;
  color?: string;
  status?: "success" | "warning" | "danger";
}
