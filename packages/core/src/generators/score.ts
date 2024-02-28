import { HEXToRGB, RGBAToHEX } from "../utils";
import { getRelativeLuminance } from "./colors";

export const getContrastRatio = (
  textRgb: [number, number, number],
  backgroundRgb: [number, number, number]
): number => {
  const textLuminance = getRelativeLuminance(textRgb);
  const backgroundLuminance = getRelativeLuminance(backgroundRgb);
  return (
    (Math.max(textLuminance, backgroundLuminance) + 0.05) /
    (Math.min(textLuminance, backgroundLuminance) + 0.05)
  );
};
export const calculateContrastScore = (
  textColor: string,
  backgroundColor: string
): string => {
  const textRgb = HEXToRGB(textColor, true);
  const backgroundRgb = HEXToRGB(backgroundColor, true);

  // Calculate the contrast ratio using the relative luminance formula
  const contrastRatio =
    typeof textRgb !== "string" &&
    typeof backgroundRgb !== "string" &&
    getContrastRatio(textRgb, backgroundRgb);

  // Determine the WCAG level based on the contrast ratio
  if (Number(contrastRatio) >= 7) {
    return "AAA";
  } else if (Number(contrastRatio) >= 4.5) {
    return "AA";
  } else {
    return "F";
  }
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
