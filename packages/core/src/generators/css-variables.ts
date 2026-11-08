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

const UF = "com.usefui";
const round = (n: number) => Math.round(n * 10000) / 10000;

export const isTokenKey = (key: string) => !key.startsWith("$");

export const stepKeysOf = (group: any): string[] =>
  Object.keys(group ?? {})
    .filter(isTokenKey)
    .sort((a, b) => Number(a) - Number(b));

export const ext = (token: any) => token?.$extensions?.[UF] ?? {};

export const varName = (...parts: (string | number | undefined)[]) =>
  `--${parts.filter((p) => p !== undefined).join("-")}`;

export const varRef = (...parts: (string | number | undefined)[]) =>
  `var(${varName(...parts)})`;

export interface ITokenEntry {
  name: string;
  step?: string;
  token: any;
}

/** Handles both `name -> step -> token` and flat `name -> token` groups. */
export const tokenEntries = (group: any): ITokenEntry[] =>
  stepKeysOf(group).flatMap((name) => {
    const token = group[name];
    if (token && typeof token === "object" && "$value" in token) {
      return [{ name, token }];
    }
    return stepKeysOf(token).map((step) => ({
      name,
      step,
      token: token[step],
    }));
  });

const dimension = (token: any) => {
  const v = token?.$value;
  return v && typeof v === "object" && typeof v.value === "number"
    ? (v as { value: number; unit?: string })
    : undefined;
};

/** px is the pivot: 1rem = 16px, 1pt = 4/3px. Falls back to $value. */
export const toPx = (token: any): number | undefined => {
  const e = ext(token);
  if (typeof e.px === "number") return e.px;
  if (typeof e.rem === "number") return round(e.rem * 16);
  if (typeof e.pt === "number") return round((e.pt * 4) / 3);
  const d = dimension(token);
  if (d) {
    if (d.unit === "rem") return round(d.value * 16);
    if (d.unit === "pt") return round((d.value * 4) / 3);
    return d.value;
  }
  return typeof token?.px === "number" ? token.px : undefined;
};

export const toRem = (token: any): number | undefined => {
  const e = ext(token);
  if (typeof e.rem === "number") return e.rem;
  const px = toPx(token);
  return px === undefined ? undefined : round(px / 16);
};

export const toPt = (token: any): number | undefined => {
  const e = ext(token);
  if (typeof e.pt === "number") return e.pt;
  const px = toPx(token);
  return px === undefined ? undefined : round((px * 3) / 4);
};

export const colorHex = (token: any): string | undefined => {
  const root = token?.$root ?? token;
  return root?.$value?.hex ?? ext(root).hex ?? root?.hex;
};

/** Emits nothing instead of `--x: undefined;` */
const decl = (name: string, value: unknown): string[] =>
  value === undefined || value === null || value === ""
    ? []
    : [`${name}: ${value};`];

export const generateCSSVariables = (payload: IDTCGDesignTokensSet) => {
  const colorVariables = (variant?: TColorVariant) => {
    const group = payload.color;
    if (!group) return [];

    return stepKeysOf(group).flatMap((name) => {
      const token = group[name];

      if (!variant) return decl(varName("color", name), colorHex(token));

      const nested = token?.[variant];
      return stepKeysOf(nested).flatMap((step) => {
        const item = nested[step];
        const value = ext(item).rgb ?? item?.rgb ?? item?.$value?.hex;
        return decl(varName(variant, name, step), value);
      });
    });
  };

  const scaleVariables = (variant: TScaleVariant) => {
    const group = payload[variant];
    if (!group) return [];

    return tokenEntries(group).flatMap(({ name, step, token }) => {
      const value = toRem(token);
      if (value === undefined) return [];
      return decl(varName(variant, name, step), `${value}rem`);
    });
  };

  const sequenceVariables = (variant: SequenceVariantEnum) => {
    const group = payload[variant];
    if (!group) return [];

    return tokenEntries(group).flatMap(({ name, step, token }) =>
      decl(varName(variant, name, step), token?.$value ?? token?.value),
    );
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

/** Flattens every variable group into a ready-to-inject stylesheet. */
export const generateCSSVariablesStylesheet = (
  payload: IDTCGDesignTokensSet,
  selector = ":root",
) => {
  const lines = Object.values(generateCSSVariables(payload)).flat();
  return `${selector} {\n${lines.map((l) => `  ${l}`).join("\n")}\n}\n`;
};
