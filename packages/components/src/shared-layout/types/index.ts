import type * as React from "react";
import type { IComponentStyling } from "../../../../../types";

export type SharedLayoutElementType = "div" | "ul";

export interface ISharedLayoutPillState {
  top: number;
  height: number;
  visible: boolean;
  moving: boolean;
}

export interface ISharedLayoutProperties
  extends
    IComponentStyling,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: SharedLayoutElementType;
  /** Horizontal inset of the pill relative to each item (px). Defaults to 16. */
  inset?: number;
  children: React.ReactNode;
}

export interface ISharedLayoutItemProperties extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}
