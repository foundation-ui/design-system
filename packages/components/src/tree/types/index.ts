import type * as React from "react";
import type { IComponentSize, IComponentStyling } from "../../../../../types";

export interface ITreeLink {
  label: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  disabled?: boolean;
  links?: ITreeLink[];
  defaultOpen?: boolean;
}

export interface ITreeProperties
  extends
    IComponentStyling,
    IComponentSize,
    Omit<React.ComponentProps<"ul">, "children"> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  links: ITreeLink[];
  defaultOpen?: boolean;
}

export interface ITreeBranchProperties extends ITreeProperties {
  nested?: boolean;
}
