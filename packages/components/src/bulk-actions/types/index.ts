import type * as React from "react";
import type {
  IComponentControlProperties,
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IComponentVariant,
  TComponentSide,
} from "../../../../../types";
import type { IButtonProperties } from "../../button/types";

export interface IBulkActionsProperties
  extends
    IComponentStyling,
    IComponentShape,
    IComponentSize,
    IComponentVariant,
    IComponentControlProperties,
    React.ComponentProps<"div"> {
  side?: TComponentSide;
  gap?: number;
}

export interface IBulkActionsBodyProperties
  extends IComponentStyling, React.ComponentProps<"div"> {
  side?: TComponentSide;
}

export interface IBulkActionsTriggerProperties extends IButtonProperties {}

export interface IBulkActionsItemProperties extends React.ComponentProps<"div"> {
  status?: "idle" | "pending" | "processing" | "running";
}
