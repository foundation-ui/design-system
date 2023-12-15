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
export enum MeasureVariantEnum {
  FontSize = "fontsize",
  Measurement = "measurement",
}
export enum TokenTypesEnum {
  Measurement = MeasureVariantEnum.Measurement,
  Scale = "scale",
  Color = "color",
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
export enum SizesEnum {
  XSmall = "xsmall",
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge",
}

export type TSize =
  | SizesEnum.XSmall
  | SizesEnum.Small
  | SizesEnum.Medium
  | SizesEnum.Large
  | SizesEnum.XLarge;
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
export type TScaleVariant =
  | MeasureVariantEnum.FontSize
  | MeasureVariantEnum.Measurement;
export type TDesignTokensVariant = TokenTypesEnum.Color | TScaleVariant;
export type TModularScalesOptions = {
  base: number;
  ratio: [number];
  units: number;
  convert?: boolean;
};
export type TSequencesOptions = {
  base: number;
  units: number;
  steps: number;
  decimal: boolean;
};

export interface IColorVariation {
  hex?: THex;
  rgb?: string;
  hsl?: string;
}
export interface IScaleVariation {
  px: number;
  rem: number;
  pt: number;
}
export interface IScaleProperties {
  units: number;
  ratio: number;
  variant?: TScaleVariant;
  values: IScaleVariation[] | [];
}
export interface IColorProperties {
  alpha: IColorVariation[];
  tint: IColorVariation[];
  shade: IColorVariation[];
}
export interface IComposedLibraryItem {
  name: string;
  base: number | IColorVariation;
  alpha?: IColorVariation[];
  tint?: IColorVariation[];
  shade?: IColorVariation[];
  units?: number;
  ratio?: number;
  variant?: TScaleVariant;
  values?: IScaleVariation[] | [];
}
export interface IDesignTokensSet {
  color: IComposedLibraryItem[];
  measurement: IComposedLibraryItem[];
  fontsize: IComposedLibraryItem[];
}
export interface IDesignTokensLibrary {
  name: string;
  design_tokens: IDesignTokensSet;
}
export interface IQueryProperties {
  source: IDesignTokensLibrary;
  token_category: TokenTypesEnum.Color | TokenTypesEnum.Measurement;
  query: string;
  unit?: ColorFormatEnum.Hex | ColorFormatEnum.Rgb | ColorFormatEnum.Hsl;
}

export interface IReactChildren {
  children: React.ReactNode;
}
