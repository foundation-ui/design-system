import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
  TComponentHeight,
  TComponentSide,
} from "../../types";
import type { IButtonProperties } from "../../button/types";

export interface IToolbarStates {
  state: "expanded" | "collapsed";
  /** Desktop open state. */
  open: boolean;
  /** True only when below the breakpoint AND `breakOnMobile` is enabled. */
  isMobile: boolean;
  openMobile: boolean;
  /** Effective state: `openMobile` on mobile, `open` otherwise. */
  expanded: boolean;
}

export interface IToolbarMobileConfig {
  /** Switch to the mobile behaviour below `breakpoint`. Defaults to `true`. */
  breakOnMobile?: boolean;
  /** Viewport width (px) under which the toolbar is considered mobile. Defaults to `768`. */
  breakpoint?: number;
}

export interface IToolbarMethods {
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  /** Sets the effective state, routed by viewport. */
  setExpanded: (open: boolean) => void;
  toggle: () => void;
  configure: (config: IToolbarMobileConfig) => void;
}

export interface IToolbarContext {
  id: string;
  states: IToolbarStates;
  methods: IToolbarMethods;
}

export interface IToolbarProviderProps
  extends IReactChildren, IToolbarMobileConfig {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Enable the Ctrl/Cmd + B shortcut. Defaults to `true`. */
  keyboardShortcut?: boolean;
}

export interface IToolbarBodyProperties
  extends
    IComponentStyling,
    IComponentSize,
    IToolbarMobileConfig,
    React.ComponentProps<"div"> {
  side?: TComponentSide;
  height?: TComponentHeight;
}

export interface IToolbarContentProperties extends React.ComponentProps<"div"> {
  raw?: boolean;
}

export interface IToolbarRootProperties extends IToolbarProviderProps {}

export interface IToolbarSectionProperties extends React.ComponentProps<"section"> {
  /** Keep the section visible when the toolbar is collapsed. */
  alwaysVisible?: boolean;
}

export interface IToolbarItemProperties extends React.ComponentProps<"div"> {
  /** Keep the first child visible when the toolbar is collapsed. */
  showFirstChild?: boolean;
}

export interface IToolbarTriggerProperties extends IButtonProperties {}
