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
import {
  IDesignTokensLibrary,
  ColorModesEnum,
  MeasureVariantEnum,
  SequenceVariantEnum,
  TokenTypesEnum,
  ITemplatePayload,
} from "../../../../types";

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
      hex: `#${hex}`,
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
export const generateTokensFromTemplate = (payload) => {
  return payload.values.map((value) => {
    const isColorType = payload.type === TokenTypesEnum.Color;

    const isMeasurementType = [
      MeasureVariantEnum.Measurement,
      MeasureVariantEnum.FontSize,
    ].includes(payload.type);

    const isSequenceType = [
      SequenceVariantEnum.Depth,
      SequenceVariantEnum.Opacity,
    ].includes(payload.type);

    if (isColorType) {
      return generateColorTokens(value.name, value.base, value.variations);
    }
    if (isMeasurementType) {
      return generateMeasurementTokens(
        value.name,
        value.base,
        value.units,
        value.ratio,
        value.variant
      );
    }
    if (isSequenceType) {
      return generateSequenceTokens(
        value.name,
        value.base,
        value.units,
        value.steps,
        value.decimal
      );
    }
  });
};
export const generateTokensLibrary = (
  name: string,
  template: ITemplatePayload[]
): IDesignTokensLibrary => {
  let design_tokens = {
    color: [],
    measurement: [],
    fontsize: [],
    opacity: [],
    depth: [],
  };

  template.forEach((token) => {
    if (!token.type) return;
    if (token.type && token.values)
      return design_tokens[token.type].push(
        ...generateTokensFromTemplate(token)
      );
  });

  return {
    name: name.trim().replace(" ", "-").toLowerCase(),
    design_tokens: design_tokens,
  };
};
