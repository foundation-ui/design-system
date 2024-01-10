import { RGBAToHEX, calculateContrastScore, PXToREM, PXToPT } from "../";
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

  if (base <= 0 || units <= 0 || steps <= 0) {
    throw new Error("Base, units, and steps must be positive numbers.");
  }
  if (decimal && units * steps !== 100) {
    throw new Error("The sum of units*steps must equal 100");
  }

  for (let i = 0; i < units; i++) {
    if (decimal) sequences.push(((base + i) * steps) / 100);
    else sequences.push(base + i * steps);
  }

  return sequences;
};
export const calculateStackOrder = (index: number, sequence: number[]) => {
  const midSequenceIndex = sequence.length / 2;

  if (index < midSequenceIndex) return { label: "low", score: 1 };
  if (index > midSequenceIndex) return { label: "high", score: 3 };

  if (
    index === midSequenceIndex ||
    index === Math.floor(midSequenceIndex) ||
    index === Math.ceil(midSequenceIndex)
  ) {
    return { label: "median", score: 2 };
  }

  return;
};
export const getSequenceUsages = (
  contrastScore: any | null,
  stackOrder?: any
) => {
  const contrastScoreRef = JSON.stringify(Object.values(contrastScore || ""));
  const scores = {
    depth: {
      low: stackOrder?.label === "low",
      median: stackOrder?.label === "median",
      high: stackOrder?.label === "high",
    },
    opacity: {
      low: contrastScoreRef.includes("F"),
      high:
        (contrastScoreRef.includes("AA") || contrastScoreRef.includes("AAA")) &&
        !contrastScoreRef.includes("F"),
    },
  };

  if (stackOrder) {
    if (scores.depth.low) return ["base", "toolbar", "dropdown"];
    if (scores.depth.median) return ["fixed", "off-canvas", "overlay"];
    if (scores.depth.high) return ["notification", "above-content"];
  } else {
    if (scores.opacity.low) return ["backdrop", "transparent"];
    if (scores.opacity.high) return ["icons", "animations", "layout"];
  }

  return [];
};
export const generateSequenceVariation = ({
  contrast,
  sequence,
  index,
}: any) => {
  const stackOrder =
    index && sequence
      ? calculateStackOrder(index, sequence)
      : { label: "low", score: 1 }; // Fallback
  const contrastScore = {
    light:
      contrast &&
      calculateContrastScore(
        RGBAToHEX(`rgba(0, 0, 0, ${contrast})`, "ffffff"),
        "ffffff"
      ),
    dark:
      contrast &&
      calculateContrastScore(
        RGBAToHEX(`rgba(255, 255, 255, ${contrast})`, "000000"),
        "000000"
      ),
  };

  const variations = {
    depth: {
      usage: getSequenceUsages(null, stackOrder),
      stack_order: stackOrder,
    },
    opacity: {
      usage: getSequenceUsages(contrastScore),
      contrast_score: contrastScore,
    },
  };

  return !contrast ? variations.depth : variations.opacity;
};
