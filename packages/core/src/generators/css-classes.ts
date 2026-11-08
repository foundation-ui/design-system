import type { IDTCGDesignTokensSet, IDTCGGroup } from "../types";
import { ColorVariantEnum } from "../types";
import { stepKeysOf, tokenEntries, toRem, varRef } from "./css-variables";

export interface IClassOptions {
  useVars?: boolean;
}

interface IEntry {
  name: string;
  step?: string;
  value: string;
}

const esc = (s: string) => s.replace(/[^\w-]/g, "\\$&");
const rule = (cls: string, decls: string[]) =>
  `.${esc(cls)} { ${decls.join(" ")} }`;
const keyOf = ({ name, step }: IEntry) =>
  [name, step].filter((p) => p !== undefined).join("-");
const wrap = (rules: string[]) => `\n${rules.join("\n")}\n`;

const scaleEntries = (
  input: IDTCGGroup | undefined,
  variant: string,
  { useVars = true }: IClassOptions,
): IEntry[] =>
  tokenEntries(input).flatMap(({ name, step, token }) => {
    const rem = toRem(token);
    if (rem === undefined) return [];
    return [
      {
        name,
        step,
        value: useVars ? varRef(variant, name, step) : `${rem}rem`,
      },
    ];
  });

const sequenceEntries = (
  input: IDTCGGroup | undefined,
  variant: string,
  { useVars = true }: IClassOptions,
): IEntry[] =>
  tokenEntries(input).flatMap(({ name, step, token }) => {
    const raw = token?.$value ?? token?.value;
    if (raw === undefined) return [];
    return [
      {
        name,
        step,
        value: useVars ? varRef(variant, name, step) : String(raw),
      },
    ];
  });

/** prefix -> css properties, applied to every entry */
const emit = (entries: IEntry[], table: [string, string[]][]) =>
  entries.flatMap((e) =>
    table.map(([prefix, props]) =>
      rule(
        `${prefix}-${keyOf(e)}`,
        props.map((p) => `${p}: ${e.value};`),
      ),
    ),
  );

const SIDES: Record<string, string[]> = {
  "": [""],
  x: ["-left", "-right"],
  y: ["-top", "-bottom"],
  t: ["-top"],
  r: ["-right"],
  b: ["-bottom"],
  l: ["-left"],
};

export const generateSizeClasses = (
  sizes: IDTCGGroup | undefined,
  opts: IClassOptions = {},
) => {
  const entries = scaleEntries(sizes, "measurement", opts);

  const rules = entries.flatMap((e) => {
    const key = keyOf(e);
    const spacing = (["padding", "margin"] as const).flatMap((prop) =>
      Object.entries(SIDES).map(([dir, suffixes]) =>
        rule(
          `${prop[0]}${dir ? `-${dir}` : ""}-${key}`,
          suffixes.map((s) => `${prop}${s}: ${e.value};`),
        ),
      ),
    );
    const gap = [
      rule(`g-${key}`, [`gap: ${e.value};`]),
      rule(`g-x-${key}`, [`column-gap: ${e.value};`]),
      rule(`g-y-${key}`, [`row-gap: ${e.value};`]),
    ];
    return [...spacing, ...gap];
  });

  // margin auto helpers
  const auto = Object.entries(SIDES).map(([dir, suffixes]) =>
    rule(
      `m${dir ? `-${dir}` : ""}-auto`,
      suffixes.map((s) => `margin${s}: auto;`),
    ),
  );

  return wrap([...rules, ...auto]);
};

export const generateBoxClasses = (
  sizes: IDTCGGroup | undefined,
  opts: IClassOptions = {},
) =>
  wrap(
    emit(scaleEntries(sizes, "measurement", opts), [
      ["w", ["width"]],
      ["h", ["height"]],
      ["size", ["width", "height"]],
      ["min-w", ["min-width"]],
      ["max-w", ["max-width"]],
      ["min-h", ["min-height"]],
      ["max-h", ["max-height"]],
      ["inset", ["inset"]],
      ["top", ["top"]],
      ["right", ["right"]],
      ["bottom", ["bottom"]],
      ["left", ["left"]],
      ["border-w", ["border-width"]],
      ["rounded", ["border-radius"]],
    ]),
  );

export const generateFontSizesClasses = (
  fs: IDTCGGroup | undefined,
  opts: IClassOptions = {},
) => wrap(emit(scaleEntries(fs, "fontsize", opts), [["fs", ["font-size"]]]));

export const generateOpacityClasses = (
  opacity: IDTCGGroup | undefined,
  opts: IClassOptions = {},
) =>
  wrap(
    emit(sequenceEntries(opacity, "opacity", opts), [["opacity", ["opacity"]]]),
  );

export const generateDepthClasses = (
  depth: IDTCGGroup | undefined,
  opts: IClassOptions = {},
) => wrap(emit(sequenceEntries(depth, "depth", opts), [["z", ["z-index"]]]));

const COLOR_PROPS: [string, string][] = [
  ["color", "color"],
  ["bg", "background-color"],
  ["border-color", "border-color"],
  ["outline-color", "outline-color"],
  ["fill", "fill"],
  ["stroke", "stroke"],
  ["decoration", "text-decoration-color"],
  ["accent", "accent-color"],
  ["caret", "caret-color"],
];

const COLOR_VARIANTS = [
  ColorVariantEnum.Alpha,
  ColorVariantEnum.Tint,
  ColorVariantEnum.Shade,
] as string[];

export const generateColorClasses = (color: IDTCGGroup | undefined) => {
  // [class suffix, css variable]
  const targets: [string, string][] = stepKeysOf(color).flatMap((name) => {
    const base: [string, string] = [name, `--color-${name}`];
    const variants = COLOR_VARIANTS.flatMap((variant) =>
      stepKeysOf(color?.[name]?.[variant]).map((step): [string, string] => [
        `${variant}-${name}-${step}`,
        `--${variant}-${name}-${step}`,
      ]),
    );
    return [base, ...variants];
  });

  return wrap(
    targets.flatMap(([suffix, variable]) =>
      COLOR_PROPS.map(([prefix, prop]) =>
        rule(`${prefix}-${suffix}`, [`${prop}: var(${variable}) !important;`]),
      ),
    ),
  );
};

const keyword = (
  prefix: string,
  prop: string,
  values: string[],
  nameOf: (value: string) => string = (v) =>
    `${prefix}-${v.replace(/^space-/, "")}`,
) => values.map((v) => rule(nameOf(v), [`${prop}: ${v};`]));

export const generateLayoutClasses = () => {
  const display = [
    "flex",
    "grid",
    "block",
    "inline",
    "inline-block",
    "inline-flex",
    "inline-grid",
    "contents",
  ].map((d) => rule(d, [`display: ${d};`]));
  display.push(rule("hidden", ["display: none;"]));

  const align = [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "start",
    "end",
    "left",
    "right",
    "baseline",
  ];

  const rules = [
    ...display,
    ...keyword("justify", "justify-content", align),
    ...keyword("align", "align-items", align),
    ...keyword("justify-items", "justify-items", [
      "start",
      "end",
      "center",
      "stretch",
    ]),
    ...keyword("self", "align-self", [
      "auto",
      "start",
      "end",
      "center",
      "stretch",
      "baseline",
    ]),
    ...keyword("content", "align-content", [
      "start",
      "end",
      "center",
      "stretch",
      "space-between",
      "space-around",
      "space-evenly",
    ]),
    ...keyword("place-center", "place-items", ["center"], () => "place-center"),
    ...["wrap", "wrap-reverse", "nowrap"].map((v) =>
      rule(`flex-${v}`, [`flex-wrap: ${v};`]),
    ),
    ...["row", "row-reverse", "column", "column-reverse"].map((v) =>
      rule(`flex-${v}`, [`flex-direction: ${v};`]),
    ),
    rule("flex-1", ["flex: 1 1 0%;"]),
    rule("flex-auto", ["flex: 1 1 auto;"]),
    rule("flex-none", ["flex: none;"]),
    rule("grow", ["flex-grow: 1;"]),
    rule("shrink-0", ["flex-shrink: 0;"]),
    ...Array.from({ length: 12 }, (_, i) =>
      rule(`grid-cols-${i + 1}`, [
        `grid-template-columns: repeat(${i + 1}, minmax(0, 1fr));`,
      ]),
    ),
    ...keyword("position", "position", [
      "static",
      "relative",
      "absolute",
      "fixed",
      "sticky",
    ]),
    ...keyword("overflow", "overflow", ["auto", "hidden", "scroll", "visible"]),
    ...keyword("text", "text-align", ["left", "center", "right", "justify"]),
    ...keyword("cursor", "cursor", ["pointer", "default", "not-allowed"]),
    ...keyword(
      "pointer",
      "pointer-events",
      ["none", "auto"],
      (v) => `pointer-events-${v}`,
    ),
  ];

  return wrap(rules);
};

/* ---------- dimensions (percent / keyword / viewport) ---------- */

export const generateDimensionClasses = () => {
  const axes = [
    ["w", "width", "vw"],
    ["h", "height", "vh"],
  ] as const;
  const options = [
    "100%",
    "95%",
    "90%",
    "85%",
    "80%",
    "75%",
    "70%",
    "66%",
    "50%",
    "33%",
    "25%",
    "10%",
    "auto",
    "fit-content",
    "max-content",
    "min-content",
  ];

  const rules = axes.flatMap(([short, prop, vu]) => [
    ...options.flatMap((o) => {
      const v = o.replaceAll("%", "");
      return [
        rule(`${short}-${v}`, [`${prop}: ${o};`]),
        rule(`min-${short}-${v}`, [`min-${prop}: ${o};`]),
        rule(`max-${short}-${v}`, [`max-${prop}: ${o};`]),
      ];
    }),
    rule(`${short}-screen`, [`${prop}: 100${vu};`]),
    rule(`${short}-full`, [`${prop}: 100%;`]),
    ...(short === "h"
      ? [
          rule("h-dvh", ["height: 100dvh;"]),
          rule("min-h-screen", ["min-height: 100vh;"]),
        ]
      : []),
  ]);

  return wrap(rules);
};

export const generateCSSClasses = (
  payload: IDTCGDesignTokensSet,
  opts: IClassOptions = {},
) =>
  [
    generateColorClasses(payload.color),
    generateSizeClasses(payload.measurement, opts),
    generateBoxClasses(payload.measurement, opts),
    generateFontSizesClasses(payload.fontsize, opts),
    generateOpacityClasses(payload.opacity, opts),
    generateDepthClasses(payload.depth, opts),
    generateLayoutClasses(),
    generateDimensionClasses(),
  ].join("\n");
