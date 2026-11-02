import type * as React from "react";
import type { IComponentSize, IComponentStyling } from "../../../../../types";

export type DropdownContentVariant = "body" | "contrast";

export interface IDropdownContentProperties
  extends IComponentStyling, IComponentSize, React.ComponentPropsWithRef<"ul"> {
  defaultOpen?: boolean;
  variant?: DropdownContentVariant;
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
