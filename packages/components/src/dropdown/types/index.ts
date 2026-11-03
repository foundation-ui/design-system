import type * as React from "react";
import type {
  IComponentSize,
  IComponentStyling,
  IReactChildren,
} from "../../types";

export type DropdownContentVariant = "body" | "contrast";

export interface IDropdownContentProperties
  extends IComponentStyling, IComponentSize, React.ComponentPropsWithRef<"ul"> {
  defaultOpen?: boolean;
  variant?: DropdownContentVariant;
  gap?: number;
  margin?: number;
}

export interface IDropdownItemProperties
  extends IComponentStyling, React.ComponentProps<"li"> {
  radio?: boolean;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
}

export interface IDropdownPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface IDropdownDimensions {
  width: number;
  height: number;
}

export interface IDropdownMetrics
  extends IDropdownPosition, IDropdownDimensions {}

export interface IDropdownStates {
  open: boolean;
  contentProps: IDropdownMetrics;
  triggerProps: IDropdownMetrics;
}

export interface IDropdownMethods {
  toggleOpen: () => void;
  setContentProps: React.Dispatch<React.SetStateAction<IDropdownMetrics>>;
  setTriggerProps: React.Dispatch<React.SetStateAction<IDropdownMetrics>>;
}

export interface IDropdownContext {
  id: string;
  states: IDropdownStates;
  methods: IDropdownMethods;
}

export interface IDropdownProviderProperties extends IReactChildren {}
