import { DTCG_NAMESPACE } from "../constants";

export interface IDTCGUseFuiExtensions {
  // color
  rgb?: string;
  hsl?: string;
  hex?: string;
  contrast_score?: { light: string; dark: string };
  // scale
  px?: number;
  rem?: number;
  pt?: number;
  // sequence
  usage?: string[];
  stack_order?: { label: string; score: number };
  [key: string]: any;
}

export interface IDTCGExtensions {
  [DTCG_NAMESPACE]?: IDTCGUseFuiExtensions;
  [key: string]: any;
}

export interface IDTCGColorValue {
  colorSpace: "srgb";
  components: [number, number, number];
  alpha: number;
  hex: string;
}

export interface IDTCGDimensionValue {
  value: number;
  unit: "px" | "rem" | "pt";
}

export interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $root?: IDTCGToken;
  $extensions?: IDTCGExtensions;
  [key: string]: any;
}

export interface IDTCGGroup extends IDTCGToken {
  [key: string]: any;
}

export type IDTCGColorGroup = IDTCGGroup;
export type IDTCGScaleGroup = IDTCGGroup;
export type IDTCGSequenceGroup = IDTCGGroup;

export interface IDTCGDesignTokensSet extends IDTCGToken {
  color?: IDTCGGroup;
  measurement?: IDTCGGroup;
  fontsize?: IDTCGGroup;
  depth?: IDTCGGroup;
  opacity?: IDTCGGroup;
  [key: string]: any;
}
