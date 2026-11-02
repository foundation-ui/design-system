import type * as React from "react";
import type { IComponentStyling, IReactChildren } from "../../types";
import type { IButtonProperties } from "../../button/types";

export interface ISelectTriggerProperties extends IButtonProperties {
  error?: boolean;
  children?: React.ReactNode;
}

export interface ISelectContentProperties
  extends IComponentStyling, React.ComponentPropsWithRef<"ul"> {
  defaultOpen?: boolean;
}

export interface ISelectItemProperties
  extends IComponentStyling, Omit<React.ComponentProps<"li">, "onClick"> {
  value?: string;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
}

export interface ISelectPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ISelectDimensions {
  width: number;
  height: number;
}

export interface ISelectMetrics extends ISelectPosition, ISelectDimensions {}

export interface ISelectStates {
  open: boolean;
  value: string | null;
  label: string;
  contentProps: ISelectMetrics;
  triggerProps: ISelectMetrics;
}

export interface ISelectMethods {
  toggleOpen: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  setContentProps: React.Dispatch<React.SetStateAction<ISelectMetrics>>;
  setTriggerProps: React.Dispatch<React.SetStateAction<ISelectMetrics>>;
}

export interface ISelectContext {
  id: string;
  states: ISelectStates;
  methods: ISelectMethods;
}

export interface ISelectProviderProperties extends IReactChildren {}
