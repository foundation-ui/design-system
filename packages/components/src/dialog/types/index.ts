import type * as React from "react";
import type { IComponentSize, IComponentStyling } from "../../../../../types";
import type { IScrollAreaProperties } from "../../scrollarea/types";

export interface IDialogItemProperties
  extends
    IComponentStyling,
    IComponentSize,
    IScrollAreaProperties,
    React.ComponentProps<"dialog"> {
  lock?: boolean;
}
