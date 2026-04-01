"use client";

import React from "react";
import { useMessageBubble, MessageBubbleProvider } from "./hooks";

import {
  MessageBubbleWrapper,
  MessageBubbleBadge,
  MessageBubbleContentWrapper,
  MessageBubbleMetaWrapper,
} from "./styles";

import {
  ComponentShapeEnum,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IReactChildren,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../../../types";

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
  children: string;
}

export interface IMessageBubbleMetaProperties
  extends IComponentStyling, React.HTMLAttributes<HTMLDivElement> {
  createdAt: Date;
}

const MessageBubbleRoot = ({ children }: IReactChildren) => {
  return <MessageBubbleProvider>{children}</MessageBubbleProvider>;
};
MessageBubbleRoot.displayName = "MessageBubble.Root";

/**
 * MessageBubble is used to display a chat message with an optional side and raw layout.
 *
 * **Best practices:**
 *
 * - Always wrap MessageBubble inside a MessageBubble.Root to provide the necessary context.
 * - Use `side` to visually distinguish between sent and received messages.
 * - Pair with MessageBubble.Content and MessageBubble.Meta for a complete message layout.
 *
 * @param {IMessageBubbleProperties} props - The props for the MessageBubble component.
 * @param {"left" | "right"} props.side - The side the bubble is aligned to. Propagated to all child compounds via context.
 * @param {boolean} props.raw - When true, removes default styling for custom layouts.
 * @param {ReactNode} props.children - The content to be rendered inside the bubble.
 * @returns {ReactElement} The MessageBubble component.
 */
const MessageBubble = (props: IMessageBubbleProperties) => {
  const { side, raw, children, ...restProps } = props;
  const { methods } = useMessageBubble();

  React.useEffect(() => {
    if (side && methods?.applySide) methods.applySide(side);
  }, [side]);

  return (
    <MessageBubbleWrapper
      data-raw={Boolean(raw)}
      data-side={side}
      aria-label={restProps["aria-label"] ?? `message-bubble-${side}`}
      {...restProps}
    >
      {children}
    </MessageBubbleWrapper>
  );
};
MessageBubble.displayName = "MessageBubble";

/**
 * MessageBubble.Content is used to display the text or rich content of the message.
 *
 * **Best practices:**
 *
 * - Place MessageBubble.Content inside a MessageBubble to inherit the correct side context.
 * - Avoid nesting interactive elements inside the content that may conflict with bubble focus management.
 *
 * @param {IMessageBubbleContentProperties} props - The props for the MessageBubble.Content component.
 * @param {boolean} props.raw - When true, removes default styling for custom layouts.
 * @param {ReactNode} props.children - The message text or rich content to render.
 * @returns {ReactElement} The MessageBubble.Content component.
 */
const MessageBubbleContent = (props: IMessageBubbleContentProperties) => {
  const { sizing, shape, variant, children, raw, ...restProps } = props;
  const { id, states } = useMessageBubble();

  return (
    <MessageBubbleBadge
      data-raw={Boolean(raw)}
      data-side={states?.side}
      variant={variant ?? ComponentVariantEnum.Border}
      shape={shape ?? ComponentShapeEnum.Smooth}
      sizing={sizing ?? ComponentSizeEnum.Medium}
      aria-label={`message-bubble-content-${id}`}
      {...restProps}
    >
      <MessageBubbleContentWrapper>{children}</MessageBubbleContentWrapper>
    </MessageBubbleBadge>
  );
};
MessageBubbleContent.displayName = "MessageBubble.Content";

/**
 * MessageBubble.Meta is used to display metadata associated with the message, such as its timestamp.
 *
 * **Best practices:**
 *
 * - Always provide a valid `createdAt` date for accurate timestamp display.
 * - Place MessageBubble.Meta after MessageBubble.Content for a natural reading flow.
 * - The side is automatically inherited from context — do not pass it manually.
 *
 * @param {IMessageBubbleMetaProperties} props - The props for the MessageBubble.Meta component.
 * @param {Date} props.createdAt - The date the message was created. Formatted as medium date and short time.
 * @param {boolean} props.raw - When true, removes default styling for custom layouts.
 * @returns {ReactElement} The MessageBubble.Meta component.
 */
const MessageBubbleMeta = (props: IMessageBubbleMetaProperties) => {
  const { createdAt, raw, ...restProps } = props;
  const { states } = useMessageBubble();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt);

  return (
    <MessageBubbleMetaWrapper
      data-raw={Boolean(raw)}
      data-side={states?.side}
      aria-label={`message-bubble-meta-${states?.side}`}
      className="fs-small-60 opacity-default-60"
      {...restProps}
    >
      {formattedDate}
    </MessageBubbleMetaWrapper>
  );
};
MessageBubbleMeta.displayName = "MessageBubble.Meta";

MessageBubble.Root = MessageBubbleRoot;
MessageBubble.Content = MessageBubbleContent;
MessageBubble.Meta = MessageBubbleMeta;

export {
  MessageBubble,
  MessageBubbleRoot,
  MessageBubbleContent,
  MessageBubbleMeta,
};
