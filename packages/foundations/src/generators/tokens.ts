import {
  HEXToRGB,
  calculateContrastScore,
  generateAlpha,
  generateVariation,
  generateModularScales,
} from "../";
import { ColorModesEnum, MeasureVariantEnum } from "../../../../types";

export const generateColorTokens = (
  name: string,
  hex: string,
  variations: {
    alpha?: boolean;
    tint?: boolean;
    shade?: boolean;
  }
) => {
  const HEXRegExp = new RegExp("^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");

  if (!HEXRegExp.test(hex)) return;
  return {
    name: name,
    base: {
      hex: hex,
      rgb: HEXToRGB(hex),
      hsl: HEXToRGB(hex),
      contrast_score: {
        light: calculateContrastScore(hex, "ffffff"),
        dark: calculateContrastScore(hex, "000000"),
      },
    },
    alpha: variations.alpha ? generateAlpha(hex) : [],
    tint: variations.tint ? generateVariation(hex, ColorModesEnum.Lighten) : [],
    shade: variations.shade
      ? generateVariation(hex, ColorModesEnum.Darken)
      : [],
  };
};

export const generateMeasurementTokens = (
  name: string,
  base: number,
  units: number,
  ratio: number,
  variant: MeasureVariantEnum
) => {
  return {
    name: name,
    base: base,
    units: units,
    ratio: ratio,
    values: generateModularScales({
      base: base,
      ratio: [ratio],
      units: units,
      convert:
        variant === MeasureVariantEnum.Measurement ||
        variant === MeasureVariantEnum.FontSize,
    }),
  };
};

const generateSequenceTokens = () => {
  return;
};
const generateTokensLibrary = () => {
  return;
};
