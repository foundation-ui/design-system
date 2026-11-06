import type * as React from "react";
import type { IComponentStyling, IReactChildren } from "../../types";

export type SharedLayoutElementType = "div" | "ul";

export type SharedLayoutDirection = "x" | "y";

export interface ISharedLayoutPillState {
  top: number;
  height: number;
  left: number;
  width: number;
  visible: boolean;
  moving: boolean;
}

export interface ISharedLayoutProperties
  extends
    IComponentStyling,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: SharedLayoutElementType;
  /** Layout direction of the pill movement. "y" (default) moves vertically, "x" moves horizontally. */
  direction?: SharedLayoutDirection;
  /** Horizontal inset of the pill relative to each item (px). Defaults to 16. */
  inset?: number;
  children: React.ReactNode;
}

export interface ISharedLayoutItemProperties extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface ISharedLayoutStates {
  as: SharedLayoutElementType;
  direction: SharedLayoutDirection;
  pill: ISharedLayoutPillState;
}

export interface ISharedLayoutMethods {
  activate: (element: HTMLElement) => void;
  hide: () => void;
  applyAs: (value: SharedLayoutElementType) => void;
  applyDirection: (value: SharedLayoutDirection) => void;
  setHovering: (value: boolean) => void;
  isHovering: () => boolean;
  getSharedLayoutId: (params: { value: string; type: string }) => string;
}

export interface ISharedLayoutContext {
  id: string;
  states: ISharedLayoutStates;
  methods: ISharedLayoutMethods;
}

export interface ISharedLayoutProviderProperties extends IReactChildren {}