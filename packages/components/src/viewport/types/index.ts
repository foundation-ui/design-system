import type * as React from "react";

export interface IViewportProperties {
  children?: React.ReactNode;
  height: number;
  direction?: ScrollDirection;
  className?: string;
}

export type ScrollDirection = "x" | "y" | "both";
