import { IContrastScore } from ".";
export enum SequenceVariantEnum {
  Depth = "depth",
  Opacity = "opacity",
}

export interface IStackOrder {
  label: string;
  score: number;
}
export interface ISequenceVariation {
  value: number;
  usage: string[];
  contrast_score?: IContrastScore;
  stack_order?: IStackOrder;
}
