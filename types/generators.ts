import { TokenTypesEnum, MeasureVariantEnum, SequenceVariantEnum } from ".";

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

export interface ITemplateValues {
  base?: string | number;
  ratio?: number;
  units?: number;
  steps?: number;
  decimal?: boolean;
  variations?: {
    alpha?: boolean;
    shade?: boolean;
    tint?: boolean;
  };
}
export interface ITemplatePayload {
  name: string;
  type:
    | TokenTypesEnum.Color
    | MeasureVariantEnum.FontSize
    | MeasureVariantEnum.Measurement
    | SequenceVariantEnum.Depth
    | SequenceVariantEnum.Opacity;
  values: ITemplateValues[];
  data?: any[];
}
