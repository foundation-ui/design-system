import { PXToREM, PXToPT } from "./formats";
import {
  TModularScalesOptions,
  TSequencesOptions,
  IScaleVariation,
  RatioEnum,
} from "../types";

export const MeasurementRatios = [
  {
    name: "Minor Second",
    value: RatioEnum.MinorSecond,
  },
  {
    name: "Major Second",
    value: RatioEnum.MajorSecond,
  },
  {
    name: "Minor Third",
    value: RatioEnum.MinorThird,
  },
  {
    name: "Major Third",
    value: RatioEnum.MajorThird,
  },
  {
    name: "Perfect Fourth",
    value: RatioEnum.PerfectFourth,
  },
  {
    name: "Perfect Fifth",
    value: RatioEnum.PerfectFifth,
  },
  {
    name: "Golden Ratio",
    value: RatioEnum.GoldenRatio,
  },
];

export const generateModularScales = (options: TModularScalesOptions) => {
  const { base, ratio, units, convert } = options;
  const scales: number[] = [base];

  for (let i = 0; i < units - 1; i++) {
    scales.push(scales[scales.length - 1] * ratio[i % ratio.length]);
  }

  return convert
    ? scales.slice(1).map((px) => ({ px, rem: PXToREM(px), pt: PXToPT(px) }))
    : scales;
};

export const generateSequences = ({
  base,
  units,
  steps,
  decimal,
}: TSequencesOptions): number[] =>
  Array.from({ length: units }, (_, i) => {
    const v = decimal ? (base + i) * steps : base + i * steps;
    // decimal = opacity: 0–1, rounded to kill float noise
    return decimal ? Math.min(1, Math.max(0, Math.round(v) / 100)) : v;
  });
