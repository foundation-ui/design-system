import {
  MeasureVariantEnum,
  ColorFormatEnum,
  TScaleVariant,
  IColorVariation,
  IScaleVariation,
} from "./";

export enum TokenTypesEnum {
  Measurement = MeasureVariantEnum.Measurement,
  Scale = "scale",
  Color = "color",
}

export type TDesignTokensVariant = TokenTypesEnum.Color | TScaleVariant;

export interface IQueryProperties {
  source: IDesignTokensLibrary;
  token_category: TokenTypesEnum.Color | TokenTypesEnum.Measurement;
  query: string;
  unit?: ColorFormatEnum.Hex | ColorFormatEnum.Rgb | ColorFormatEnum.Hsl;
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
