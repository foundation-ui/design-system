"use client";

import React from "react";
import { ScrollAreaWrapper } from "./styles";

export interface IScrollAreaProperties extends React.ComponentProps<any> {
  scrollbar?: boolean;
}
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
