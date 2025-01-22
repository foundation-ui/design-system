import {
  IDesignTokensLibrary,
  TColorVariant,
  TScaleVariant,
  IComposedLibraryItem,
  ColorVariantEnum,
  MeasureVariantEnum,
  SequenceVariantEnum,
} from "../../../../types";

const DEFAULT_COLOR_TOKENS_VARIANT = "color";
const COLOR_TOKENS_VARIANT: TColorVariant[] = [
  ColorVariantEnum.Alpha,
  ColorVariantEnum.Tint,
  ColorVariantEnum.Shade,
];
const SCALE_TOKENS_VARIANT: TScaleVariant[] = [
  MeasureVariantEnum.FontSize,
  MeasureVariantEnum.Measurement,
];
const SEQUENCE_TOKENS_VARIANT: SequenceVariantEnum[] = [
  SequenceVariantEnum.Depth,
  SequenceVariantEnum.Opacity,
];

export const generateCSSVariables = (payload: IDesignTokensLibrary) => {
  const variantName = (variant: string, name: string) =>
    `--${variant}-${name}-`;
  const variantIndex = (key: number) => (key + 1) * 10;
  const variableName = (variant: string, name: string, key: number) =>
    `${variantName(variant, name)}${variantIndex(key)}`;

  const variationsTransformers = {
    color: (library: IComposedLibraryItem[], variant?: TColorVariant) => {
      if (!variant) {
        return library.map(
          (token) => `
            ${`--${DEFAULT_COLOR_TOKENS_VARIANT}-${token.name}: ${token.base["hex"]};`}
          `
        );
      }

      return library.map((token) => {
        return token[variant].map(
          (item, key) => `
            ${`${variableName(variant, token.name, key)}: ${item.rgb};`}
          `
        );
      });
    },
    scale: (library: IComposedLibraryItem[], variant: TScaleVariant) => {
      return library.map((token) =>
        token.values.map(
          (value, key) => `
            ${`${variableName(variant, token.name, key)}: ${value.rem}rem;`}
          `
        )
      );
    },
    sequence: (
      library: IComposedLibraryItem[],
      variant: SequenceVariantEnum
    ) => {
      return library.map((token) =>
        token.values.map(
          (value, key) => `
            ${`${variableName(variant, token.name, key)}: ${value.value};`}
          `
        )
      );
    },
  };

  const [color, alpha, tint, shade, fontsize, measurement, depth, opacity] = [
    variationsTransformers.color(payload.design_tokens.color),
    ...COLOR_TOKENS_VARIANT.map((variant) =>
      variationsTransformers.color(payload.design_tokens.color, variant)
    ),
    ...SCALE_TOKENS_VARIANT.map((variant) =>
      variationsTransformers.scale(payload.design_tokens[variant], variant)
    ),
    ...SEQUENCE_TOKENS_VARIANT.map((variant) =>
      variationsTransformers.sequence(payload.design_tokens[variant], variant)
    ),
  ];

  return {
    color,
    alpha,
    tint,
    shade,
    fontsize,
    measurement,
    depth,
    opacity,
  };
};
