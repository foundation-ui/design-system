import type * as React from "react";
import type { IComponentStyling } from "../../../../../types";
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
