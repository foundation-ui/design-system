import {
  HEXToRGB,
  calculateContrastScore,
  generateAlpha,
  generateVariation,
} from "../";
import { ColorModesEnum, ColorVariantEnum } from "../../../../types";

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

const generateMeasurementTokens = () => {
  return;
};
const generateSequenceTokens = () => {
  return;
};
const generateTokensLibrary = () => {
  return;
};
