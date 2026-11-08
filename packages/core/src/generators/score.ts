import { HEXToRGB } from "./formats";
import { TRGB, TContrastScore } from "../types";

export const getRelativeLuminance = (rgb: TRGB): number => {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getContrastRatio = (a: TRGB, b: TRGB): number => {
  const la = getRelativeLuminance(a);
  const lb = getRelativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

// WCAG 2.x: 7 = AAA text, 4.5 = AA text (AAA large), 3 = AA large text / UI
export const calculateContrastScore = (
  textColor: string,
  backgroundColor: string,
): TContrastScore => {
  const ratio = getContrastRatio(
    HEXToRGB(textColor, true) as TRGB,
    HEXToRGB(backgroundColor, true) as TRGB,
  );
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "F";
};

export const calculateStackOrder = (index: number, sequence: number[]) => {
  const pos = sequence.length > 1 ? index / (sequence.length - 1) : 0;
  if (pos < 1 / 3) return { label: "low", score: 1 };
  if (pos > 2 / 3) return { label: "high", score: 3 };
  return { label: "median", score: 2 };
};

export const getSequenceUsages = (
  contrastScore: any,
  stackOrder?: { label: string; score?: number } | any,
) => {
  if (stackOrder) {
    if (stackOrder.label === "low") return ["base", "toolbar", "dropdown"];
    if (stackOrder.label === "median")
      return ["fixed", "off-canvas", "overlay"];
    if (stackOrder.label === "high") return ["notification", "above-content"];
    return [];
  }
  const failing = Object.values(contrastScore ?? {}).some((s) => s === "F");
  return failing
    ? ["backdrop", "transparent"]
    : ["icons", "animations", "layout"];
};
