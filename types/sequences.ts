export enum SequenceVariantEnum {
  Depth = "depth",
  Opacity = "opacity",
}

export interface IContrastScore {
  light: string;
  dark: string;
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
