"use client";

import React from "react";
import { TextCarrouselWrapper } from "./styles";

interface ITextCarrouselProperties {
  auto?: boolean;
  duration?: number;
  content: string[];
}

export const TextCarrousel = (props: ITextCarrouselProperties) => {
  const { auto = true, duration, content } = props;

  const messages = [...content];
  const [currentMsgIndex, setCurrentMsgIndex] = React.useState<number>(0);

  const shuffleIndex = React.useCallback(() => {
    setCurrentMsgIndex((prev) => (prev + 1) % messages.length);
  }, [messages.length]);

  const handleShuffle = () => {
    if (auto) return;
    shuffleIndex();
  };

  React.useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      shuffleIndex();
    }, duration ?? 3000);

    return () => clearInterval(interval);
  }, [duration, messages.length, shuffleIndex]);

  return (
    <TextCarrouselWrapper data-auto={Boolean(auto)} onClick={handleShuffle}>
      {messages[currentMsgIndex]}
    </TextCarrouselWrapper>
  );
};

TextCarrousel.displayName = "TextCarrousel";
