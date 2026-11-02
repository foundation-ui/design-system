import type * as React from "react";
import type {
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IReactChildren,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../types";

export type MessageBubbleSide = "left" | "right";

export interface IMessageBubbleStates {
  side: MessageBubbleSide | null;
}

export interface IMessageBubbleMethods {
  applySide: (side: MessageBubbleSide) => void;
}

export interface IMessageBubbleContext {
  id: string;
  states: IMessageBubbleStates;
  methods: IMessageBubbleMethods;
}

export interface IMessageBubbleProviderProperties extends IReactChildren {}

export interface IMessageBubbleProperties
  extends IComponentStyling, React.HTMLAttributes<HTMLDivElement> {
  side: MessageBubbleSide;
}

export interface IMessageBubbleContentProperties
  extends
    IComponentStyling,
    IComponentShape,
    IComponentSize,
    React.HTMLAttributes<HTMLDivElement> {
  variant?: TComponentVariant | TComponentVariantExtended;
  emphasis?: boolean;
  children: string;
}

export interface IMessageBubbleMetaProperties
  extends IComponentStyling, React.HTMLAttributes<HTMLDivElement> {
  createdAt: Date;
}
