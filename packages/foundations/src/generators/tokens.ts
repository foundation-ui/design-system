import {
  HEXToRGB,
  HEXToHSL,
  calculateContrastScore,
  generateAlpha,
  generateVariation,
  generateModularScales,
  generateSequences,
  generateSequenceVariation,
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
      hsl: HEXToHSL(hex),
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
export const generateSequenceTokens = (
  name: string,
  base: number,
  units: number,
  steps: number,
  decimal: boolean
) => {
  const sequenceValues = generateSequences({
    base: base,
    units: units,
    steps: steps,
    decimal,
  });

  const sequencePayload = sequenceValues.map((value: number, key: number) => {
    const sequenceDetails = decimal
      ? generateSequenceVariation({ contrast: value })
      : generateSequenceVariation({
          sequence: sequenceValues,
          index: key || 0,
        });

    return {
      value: value,
      ...sequenceDetails,
    };
  });

  return {
    name: name,
    base: base,
    units: units,
    steps: steps,
    values: sequencePayload,
  };
};
export const generateTokensFromTemplate = (payload) =>
  payload.values.map((value) => {
    if (payload.type === "color") {
      return generateColorTokens(value.name, value.base, value.variations);
    }
    if (payload.type === "measurement") {
      return generateMeasurementTokens(
        value.name,
        value.base,
        value.units,
        value.ratio,
        value.variant
      );
    }
    if (payload.type === "sequence") {
      return generateSequenceTokens(
        value.name,
        value.base,
        value.units,
        value.steps,
        value.decimal
      );
    }
  });
export const generateTokensLibrary = (name: string, template: any) => {
  template.forEach((token) => {
    if (!token.type) return;
    if (token.type && token.values) {
      return {
        name,
        design_tokens: generateTokensFromTemplate(token),
      };
    }
  });
};
