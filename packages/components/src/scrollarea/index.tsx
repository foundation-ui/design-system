"use client";

import React from "react";
import { ScrollAreaWrapper } from "./styles";
import type { IScrollAreaProperties } from "./types";

/**
 * Add native scroll functionality to custom components.
 */
export const ScrollArea = ({
  scrollbar = false,
  children,
  ...restProps
}: IScrollAreaProperties) => {
  return (
    <ScrollAreaWrapper
      aria-hidden="true"
      data-scrollbar={scrollbar}
      {...restProps}
    >
      {children}
    </ScrollAreaWrapper>
  );
};
