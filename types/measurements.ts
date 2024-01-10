export enum MeasureVariantEnum {
  FontSize = "fontsize",
  Measurement = "measurement",
}
export enum MeasurementFormatEnum {
  Px = "px",
  Rem = "rem",
  Pt = "pt",
}
export enum SizesEnum {
  XSmall = "xsmall",
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge",
}
export enum RatioEnum {
  MinorSecond = 16 / 15,
  MajorSecond = 9 / 8,
  MinorThird = 6 / 5,
  MajorThird = 5 / 4,
  PerfectFourth = 4 / 3,
  PerfectFifth = 3 / 2,
  GoldenRatio = 1.618 / 1,
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
