"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  IMessageBubbleContext,
  IMessageBubbleProviderProperties,
  MessageBubbleSide,
} from "../types";

const noop = (): void => {};

const defaultMessageBubbleContext: IMessageBubbleContext = {
  id: "",
  states: {
    side: null,
  },
  methods: {
    applySide: noop,
  },
};

const MessageBubbleContext = createContext<IMessageBubbleContext>(
  defaultMessageBubbleContext,
);

export const useMessageBubble = (): IMessageBubbleContext =>
  useContext(MessageBubbleContext);

export const MessageBubbleProvider = ({
  children,
}: IMessageBubbleProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [side, setSide] = useState<MessageBubbleSide | null>(null);

  return (
    <MessageBubbleContext.Provider
      value={{
        id,
        states: {
          side,
        },
        methods: {
          applySide: (nextSide) => setSide(nextSide),
        },
      }}
    >
      {children}
    </MessageBubbleContext.Provider>
  );
};
