import type * as React from "react";

export interface IScrollAreaProperties extends React.ComponentProps<any> {
  scrollbar?: boolean;
}

export interface ScrollAreaContainerProps {
  $height?: string;
  $width?: string;
  $thumbColor?: string;
  $trackColor?: string;
  $thumbHoverColor?: string;
}
