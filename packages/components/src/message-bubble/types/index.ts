import type * as React from "react";
import type {
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../../../../types";

export type MessageBubbleSide = "left" | "right";

export interface IMessageBubbleContext {
  side: MessageBubbleSide;
}

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
