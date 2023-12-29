export enum MeasureVariantEnum {
  FontSize = "fontsize",
  Measurement = "measurement",
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
export type TScaleVariant =
  | MeasureVariantEnum.FontSize
  | MeasureVariantEnum.Measurement;

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
