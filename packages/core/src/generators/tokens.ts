import { DTCG_NAMESPACE } from "../constants";

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
  normalizeHex,
} from "..";

import { ColorModesEnum, SequenceVariantEnum, TokenTypesEnum } from "../types";
import type {
  TMeasureVariant,
  ITemplatePayload,
  IDTCGDesignTokensSet,
  IDTCGGroup,
  IDTCGColorValue,
} from "../types";

const normalizeName = (name: string) =>
  name.trim().replace(/\s+/g, "-").toLowerCase();

const hexToComponents = (hex: string): [number, number, number] => {
  const rgb = HEXToRGB(hex, true) as [number, number, number];
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
};

export const generateColorTokens = (
  name: string,
  hex: string,
  variations: {
    alpha?: boolean;
    tint?: boolean;
    shade?: boolean;
  },
) => {
  // accepts #abc, abc, #aabbcc; returns 6 digits
  try {
    hex = normalizeHex(hex);
  } catch {
    return;
  }

  const baseRgb = HEXToRGB(hex, true) as [number, number, number];
  const baseHslString = HEXToHSL(hex) as string;
  const baseRgbString = HEXToRGB(hex) as string;

  const base: IDTCGGroup = {
    $type: "color",
    $value: {
      colorSpace: "srgb",
      components: [baseRgb[0] / 255, baseRgb[1] / 255, baseRgb[2] / 255],
      alpha: 1,
      hex: `#${hex}`,
    } as IDTCGColorValue,
    $extensions: {
      [DTCG_NAMESPACE]: {
        rgb: baseRgbString,
        hsl: baseHslString,
        contrast_score: {
          light: calculateContrastScore(hex, "ffffff"),
          dark: calculateContrastScore(hex, "000000"),
        },
      },
    },
  };

  const result: IDTCGGroup = {
    $type: "color",
    $description: name,
    $root: base,
  };

  if (variations.alpha) {
    const alphaEntries: Record<string, IDTCGGroup> = {};
    generateAlpha(hex).forEach((item, index) => {
      const step = (index + 1) * 10;
      const alphaValue = index === 9 ? 1 : Number(`0.${index + 1}`);
      alphaEntries[String(step)] = {
        $type: "color",
        $value: {
          colorSpace: "srgb",
          components: [baseRgb[0] / 255, baseRgb[1] / 255, baseRgb[2] / 255],
          alpha: alphaValue,
          hex: `#${hex}`,
        } as IDTCGColorValue,
        $extensions: {
          [DTCG_NAMESPACE]: {
            rgb: item.rgb,
            hsl: item.hsl,
            contrast_score: item.contrast_score,
          },
        },
      };
    });
    result.alpha = {
      $type: "color",
      ...alphaEntries,
    };
  }

  if (variations.tint) {
    const tintEntries: Record<string, IDTCGGroup> = {};
    generateVariation(hex, ColorModesEnum.Lighten).forEach((item, index) => {
      const step = (index + 1) * 10;
      tintEntries[String(step)] = {
        $type: "color",
        $value: {
          colorSpace: "srgb",
          components: hexToComponents(item.hex),
          alpha: 1,
          hex: item.hex,
        } as IDTCGColorValue,
        $extensions: {
          [DTCG_NAMESPACE]: {
            rgb: item.rgb,
            hsl: item.hsl,
            contrast_score: item.contrast_score,
          },
        },
      };
    });
    result.tint = {
      $type: "color",
      ...tintEntries,
    };
  }

  if (variations.shade) {
    const shadeEntries: Record<string, IDTCGGroup> = {};
    generateVariation(hex, ColorModesEnum.Darken).forEach((item, index) => {
      const step = (index + 1) * 10;
      shadeEntries[String(step)] = {
        $type: "color",
        $value: {
          colorSpace: "srgb",
          components: hexToComponents(item.hex),
          alpha: 1,
          hex: item.hex,
        } as IDTCGColorValue,
        $extensions: {
          [DTCG_NAMESPACE]: {
            rgb: item.rgb,
            hsl: item.hsl,
            contrast_score: item.contrast_score,
          },
        },
      };
    });
    result.shade = {
      $type: "color",
      ...shadeEntries,
    };
  }

  return result;
};

export const generateMeasurementTokens = (
  name: string,
  base: number,
  units: number,
  ratio: number,
  _variant?: TMeasureVariant,
) => {
  const scales = generateModularScales({
    base: base,
    ratio: [ratio],
    units: units,
    convert: true,
  }) as { px: number; rem: number; pt: number }[];

  const entries: Record<string, IDTCGGroup> = {};
  scales.forEach((value, index) => {
    const step = (index + 1) * 10;
    entries[String(step)] = {
      $type: "dimension",
      $value: { value: value.px, unit: "px" },
      $extensions: {
        [DTCG_NAMESPACE]: { px: value.px, rem: value.rem, pt: value.pt },
      },
    };
  });

  return {
    $type: "dimension",
    $description: name,
    ...entries,
  } as IDTCGGroup;
};

export const generateSequenceVariation = ({
  contrast,
  sequence,
  index,
}: any) => {
  const isOpacity = contrast !== undefined;
  const stackOrder =
    index !== undefined && sequence
      ? calculateStackOrder(index, sequence)
      : { label: "low", score: 1 };

  const contrastScore = {
    light: isOpacity
      ? calculateContrastScore(
          RGBAToHEX(`rgba(0, 0, 0, ${contrast})`, "ffffff"),
          "ffffff",
        )
      : undefined,
    dark: isOpacity
      ? calculateContrastScore(
          RGBAToHEX(`rgba(255, 255, 255, ${contrast})`, "000000"),
          "000000",
        )
      : undefined,
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

  return isOpacity ? variations.opacity : variations.depth;
};

export const generateSequenceTokens = (
  name: string,
  base: number,
  units: number,
  steps: number,
  decimal: boolean,
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
          index: key ?? 0,
        });

    return {
      value: value,
      ...sequenceDetails,
    };
  });

  const entries: Record<string, IDTCGGroup> = {};
  sequencePayload.forEach((item, index) => {
    const step = (index + 1) * 10;
    const { value, ...rest } = item;
    entries[String(step)] = {
      $type: "number",
      $value: value,
      $extensions: {
        [DTCG_NAMESPACE]: rest,
      },
    };
  });

  return {
    $type: "number",
    $description: name,
    ...entries,
  } as IDTCGGroup;
};

export const generateTokensFromTemplate = (payload: any) => {
  return payload.values
    .map((value: any) => {
      const isColorType = payload.type === TokenTypesEnum.Color;

      const isMeasurementType = ["measurement", "fontsize"].includes(
        payload.type,
      );

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
          value.variant,
        );
      }
      if (isSequenceType) {
        return generateSequenceTokens(
          value.name,
          value.base,
          value.units,
          value.steps,
          value.decimal,
        );
      }
    })
    .filter(Boolean);
};

export const generateTokensLibrary = (
  name: string,
  template: ITemplatePayload[],
): IDTCGDesignTokensSet => {
  const categories: Record<string, Record<string, IDTCGGroup>> = {
    color: {},
    measurement: {},
    fontsize: {},
    opacity: {},
    depth: {},
  };

  const categoryType: Record<string, string> = {
    color: "color",
    measurement: "dimension",
    fontsize: "dimension",
    opacity: "number",
    depth: "number",
  };

  template.forEach((token) => {
    if (!token.type || !token.values) return;
    const generated = generateTokensFromTemplate(token) as IDTCGGroup[];
    const bucket = categories[token.type];
    if (!bucket) return;
    generated.forEach((group) => {
      const key = group.$description ?? "token";
      bucket[key] = group;
    });
  });

  const design_tokens: IDTCGDesignTokensSet = {
    $description: normalizeName(name),
  };

  Object.keys(categories).forEach((category) => {
    const bucket = categories[category];
    if (Object.keys(bucket).length === 0) return;
    design_tokens[category] = {
      $type: categoryType[category],
      ...bucket,
    } as IDTCGGroup;
  });

  return design_tokens;
};
