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
  name?: string;
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
  type: string;
  values: ITemplateValues[];
  data?: any[];
}
