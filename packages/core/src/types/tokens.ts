import {
  TColorFormat,
  TScaleVariant,
  IColorVariation,
  IScaleVariation,
  ISequenceVariation,
  TScaleFormat,
} from "./";

export enum TokenTypesEnum {
  Measurement = "measurement",
  Scale = "scale",
  Color = "color",
}

export type TDesignTokensVariant = "color" | TScaleVariant;

export interface IQueryProperties {
  source: IDesignTokensLibrary;
  token_category: "color" | "measurement" | "fontsize" | "depth" | "opacity";
  query: string;
  unit?: TColorFormat | TScaleFormat;
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
