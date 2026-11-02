import type * as React from "react";
import type { IButtonProperties } from "../../button/types";

export interface IWhiteboardOptionsProperties {
  step?: number;
  min?: number;
  max?: number;
}

export interface IWhiteboardZoomProperties
  extends IButtonProperties, IWhiteboardOptionsProperties {
  direction: "in" | "out" | "reset";
  initial?: number;
  children: React.ReactNode;
}

export interface IWhiteboardProperties extends IWhiteboardOptionsProperties {
  allowWheelZoom?: boolean;
  allowDrag?: boolean;
  children: React.ReactNode;
}
