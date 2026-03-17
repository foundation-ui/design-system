"use client";

import React, { useState, createContext, useContext } from "react";

import { IReactChildren, IComponentAPI } from "../../../../../types";
import { MessageBubbleSide } from "../";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const MessageBubbleContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useMessageBubble = () => useContext(MessageBubbleContext);

export const MessageBubbleProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useMessageBubbleProvider();

  return (
    <MessageBubbleContext.Provider value={context}>
      {children}
    </MessageBubbleContext.Provider>
  );
};

function useMessageBubbleProvider(): IComponentAPI {
  const [side, setSide] = useState<MessageBubbleSide | null>(null);
  const MessageBubbleId = React.useId();

  return {
    id: MessageBubbleId,
    states: {
      side,
    },
    methods: {
      applySide: (side: MessageBubbleSide): string | void => setSide(side),
    },
  };
}
