import React from "react";
import type { IComponentShape } from "../../types";

type NativeVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "width" | "height" | "poster"
>;

export interface IVideoSource {
  src: string;
  type?: string;
}

export interface IVideoTrack {
  src: string;
  srcLang: string;
  label: string;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  default?: boolean;
}

export interface IVideoProperties extends NativeVideoProps, IComponentShape {
  src?: string;
  label: string;
  sources?: IVideoSource[];
  tracks?: IVideoTrack[];
  poster?: string;
  priority?: boolean;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
}
