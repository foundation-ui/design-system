import {
  ColorVariantEnum,
  MeasureVariantEnum,
  SequenceVariantEnum,
} from "../types";
import type {
  IDTCGDesignTokensSet,
  TColorVariant,
  TScaleVariant,
} from "../types";

const isGroupKey = (key: string) => !key.startsWith("$");

const stepKeysOf = (group: any) =>
  Object.keys(group ?? {})
    .filter(isGroupKey)
    .sort((a, b) => Number(a) - Number(b));

export const generateCSSVariables = (payload: IDTCGDesignTokensSet) => {
  const colorVariables = (variant?: TColorVariant) => {
    const group = payload.color;
    if (!group) return [];

    return stepKeysOf(group).flatMap((name) => {
      const token = group[name];

      if (!variant) {
        const root = token?.$root ?? token;
        const hex = root?.$value?.hex ?? root?.hex;
        return `--color-${name}: ${hex};`;
      }

      const nested = token?.[variant];
      return stepKeysOf(nested).map((step) => {
        const rgb =
          nested[step]?.$extensions?.["com.usefui"]?.rgb ?? nested[step]?.rgb;
        return `--${variant}-${name}-${step}: ${rgb};`;
      });
    });
  };

  const scaleVariables = (variant: TScaleVariant) => {
    const group = payload[variant];
    if (!group) return [];

    return stepKeysOf(group).flatMap((name) => {
      const token = group[name];
      return stepKeysOf(token).map((step) => {
        const rem = token[step]?.$extensions?.["com.usefui"]?.rem;
        return `--${variant}-${name}-${step}: ${rem}rem;`;
      });
    });
  };

  const sequenceVariables = (variant: SequenceVariantEnum) => {
    const group = payload[variant];
    if (!group) return [];

    return stepKeysOf(group).flatMap((name) => {
      const token = group[name];
      return stepKeysOf(token).map(
        (step) => `--${variant}-${name}-${step}: ${token[step]?.$value};`,
      );
    });
  };

  return {
    color: colorVariables(),
    alpha: colorVariables(ColorVariantEnum.Alpha),
    tint: colorVariables(ColorVariantEnum.Tint),
    shade: colorVariables(ColorVariantEnum.Shade),
    fontsize: scaleVariables(MeasureVariantEnum.FontSize),
    measurement: scaleVariables(MeasureVariantEnum.Measurement),
    depth: sequenceVariables(SequenceVariantEnum.Depth),
    opacity: sequenceVariables(SequenceVariantEnum.Opacity),
  };
};
