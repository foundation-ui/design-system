import {
  ColorFormatEnum,
  TScaleVariant,
  IColorVariation,
  IScaleVariation,
  ISequenceVariation,
  MeasurementFormatEnum,
} from "./";

export enum TokenTypesEnum {
  Measurement = "measurement",
  Scale = "scale",
  Color = "color",
}

export type TDesignTokensVariant = TokenTypesEnum.Color | TScaleVariant;

export interface IQueryProperties {
  source: IDesignTokensLibrary;
  token_category: "color" | "measurement" | "fontsize" | "depth" | "opacity";
  query: string;
  unit?: ColorFormatEnum | MeasurementFormatEnum;
}
export interface IComposedLibraryItem {
  name?: string;
  base?: number | IColorVariation;
  alpha?: any[] | [];
  tint?: any[] | [];
  shade?: any[] | [];
  units?: number;
  ratio?: number;
  variant?: TScaleVariant;
  values?: ISequenceVariation[] | IScaleVariation[] | [];
}
export interface IDesignTokensSet {
  color: IComposedLibraryItem[];
  measurement: IComposedLibraryItem[];
  fontsize: IComposedLibraryItem[];
  depth: IComposedLibraryItem[];
  opacity: IComposedLibraryItem[];
}
export interface IDesignTokensLibrary {
  name: string;
  design_tokens: IDesignTokensSet;
}
