import type * as React from "react";
import type { IReactChildren } from "../../types";

export interface ICollapsibleProperties extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  showFirstChild?: boolean;
}

export interface ICollapsibleStates {
  expanded: boolean;
  defaultOpen: boolean;
}

export interface ICollapsibleMethods {
  toggleCollapsible: () => void;
  applyDefaultOpen: () => void;
}

export interface ICollapsibleContext {
  id: string;
  states: ICollapsibleStates;
  methods: ICollapsibleMethods;
}

export interface ICollapsibleProviderProperties extends IReactChildren {}
