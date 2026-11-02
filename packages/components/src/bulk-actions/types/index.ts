import type * as React from "react";
import type {
  IComponentControlProperties,
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IComponentVariant,
  IReactChildren,
  TComponentSide,
} from "../../types";
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

export interface IBulkActionsCoordinates {
  x: number;
  y: number;
}

export interface IBulkActionsStates {
  open: boolean;
  position: IBulkActionsCoordinates;
  isDragging: boolean;
  dragOffsetRef: React.MutableRefObject<IBulkActionsCoordinates | null>;
}

export interface IBulkActionsMethods {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPosition: React.Dispatch<React.SetStateAction<IBulkActionsCoordinates>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  getId: (type: "trigger" | "bulk-actions" | "inner-control") => string;
}

export interface IBulkActionsContext {
  id: string;
  states: IBulkActionsStates;
  methods: IBulkActionsMethods;
}

export interface IBulkActionsProviderProperties extends IReactChildren {}
