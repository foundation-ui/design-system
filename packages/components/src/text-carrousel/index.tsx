"use client";

import React from "react";
import { TextCarrouselWrapper } from "./styles";
import type { ITextCarrouselProperties } from "./types";

/**
 * TextCarrousel is used to cycle through a list of messages.
 *
 * **Best practices:**
 *
 * - Keep messages concise.
 * - Provide a reasonable duration.
 *
 * @param {ITextCarrouselProperties} props - The props for the TextCarrousel component.
 * @param {boolean} props.auto - Whether to auto-cycle messages. Defaults to `true`.
 * @param {number} props.duration - The interval duration in ms. Defaults to `3000`.
 * @param {ReactNode[]} props.content - The messages to display.
 * @returns {ReactElement} The TextCarrousel component.
 */
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
