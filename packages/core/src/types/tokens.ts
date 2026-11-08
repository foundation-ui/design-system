import { TColorFormat, TScaleVariant, TScaleFormat } from "./";
import type { IDTCGDesignTokensSet } from "./dtcg";

export enum TokenTypesEnum {
  Measurement = "measurement",
  Scale = "scale",
  Color = "color",
}

export type TDesignTokensVariant = "color" | TScaleVariant;

export interface IQueryProperties {
  source: IDTCGDesignTokensSet;
  token_category: "color" | "measurement" | "fontsize" | "depth" | "opacity";
  query: string;
  unit?: TColorFormat | TScaleFormat;
}
