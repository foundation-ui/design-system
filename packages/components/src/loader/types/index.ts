import type * as React from "react";
import type { IComponentSize } from "../../../../../types";

export interface LoaderSpinnerProperties extends IComponentSize {
  variant?: "circle" | "circle-filled";
}

export interface LoaderBaseProperties
  extends IComponentSize, React.ComponentProps<"div"> {
  duration?: number;
}

export interface LoaderDitherProperties
  extends IComponentSize, React.ComponentProps<"div"> {}
