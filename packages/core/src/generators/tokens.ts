import {
  HEXToRGB,
  HEXToHSL,
  RGBAToHEX,
  calculateStackOrder,
  getSequenceUsages,
  calculateContrastScore,
  generateAlpha,
  generateVariation,
  generateModularScales,
  generateSequences,
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
      convert: true,
    }),
  };
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
