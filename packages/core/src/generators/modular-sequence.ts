import { PXToREM, PXToPT } from "./formats";
import {
  TModularScalesOptions,
  TSequencesOptions,
  IScaleVariation,
  RatioEnum,
} from "../../../../types";

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
export const generateModularScales = (
  options: TModularScalesOptions
): IScaleVariation[] | number[] => {
  const { base, ratio, units, convert } = options;
  const scalesArray: number[] = [base];
  const convertedScalesArray: Array<IScaleVariation> = [];

  for (let i = 0; i < units - 1; i++) {
    const modulo = i % ratio.length;
    const ratioValue = ratio[modulo];
    const value = Number(scalesArray[scalesArray.length - 1]);

    scalesArray.push(value * ratioValue);

    if (convert)
      convertedScalesArray.push({
        px: value * ratioValue,
        rem: PXToREM(value * ratioValue),
        pt: PXToPT(value * ratioValue),
      });
  }

  return convert ? convertedScalesArray : scalesArray;
};
export const generateSequences = (options: TSequencesOptions): number[] => {
  const { base, units, steps, decimal } = options;
  const sequences: number[] = [];

  for (let i = 0; i < units; i++) {
    if (decimal) sequences.push(((base + i) * steps) / 100);
    else sequences.push(base + i * steps);
  }

  return sequences;
};
