import React from "react";
import type { IComponentShape } from "../../types";

type NativeImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
>;

export interface IImageSource {
  srcSet: string;
  type?: string;
  media?: string;
}

export interface ISources {
  srcSet: string;
  type?: string;
  media?: string;
}

export interface IImageProperties extends NativeImgProps, IComponentShape {
  src: string;
  alt: string;
  sources?: ISources[];
  priority?: boolean;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
}
