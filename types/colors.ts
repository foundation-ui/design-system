export enum ColorModesEnum {
  Darken = "darken",
  Lighten = "lighten",
  Dark = "dark",
  Light = "light",
  System = "system",
}
export enum ColorFormatEnum {
  Hex = "hex",
  Rgb = "rgb",
  Hsl = "hsl",
}
export enum ColorVariantEnum {
  Alpha = "alpha",
  Tint = "tint",
  Shade = "shade",
}
export enum LuminanceFactorsEnum {
  Lum0 = 0,
  Lum10 = 0.1,
  Lum20 = 0.2,
  Lum30 = 0.3,
  Lum40 = 0.4,
  Lum50 = 0.5,
  Lum60 = 0.6,
  Lum70 = 0.7,
  Lum80 = 0.8,
  Lum90 = 0.9,
  Lum100 = 1,
}

export type TColorMode =
  | ColorModesEnum.Dark
  | ColorModesEnum.Light
  | ColorModesEnum.System;
export type THex = string;
export type TTone = number;
export type TMode = ColorModesEnum.Darken | ColorModesEnum.Lighten;
export type TLuminance = LuminanceFactorsEnum | undefined;
export type TColorVariant =
  | ColorVariantEnum.Alpha
  | ColorVariantEnum.Tint
  | ColorVariantEnum.Shade;

export interface IContrastScore {
  light: string;
  dark: string;
}
export interface IColorVariation {
  hex?: THex;
  rgb?: string;
  hsl?: string;
  contrast_score?: IContrastScore;
}
export interface IColorProperties {
  alpha?: IColorVariation[] | [];
  tint?: IColorVariation[] | [];
  shade?: IColorVariation[] | [];
}
