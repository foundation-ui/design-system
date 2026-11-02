import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
  TComponentHeight,
  TComponentSide,
} from "../../../../../types";
import type { IButtonProperties } from "../../button/types";

export interface IToolbarContext {
  id: string;
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}

export interface IToolbarProviderProps extends IReactChildren {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface IToolbarBodyProperties
  extends IComponentStyling, IComponentSize, React.ComponentProps<"div"> {
  side?: TComponentSide;
  height?: TComponentHeight;
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
