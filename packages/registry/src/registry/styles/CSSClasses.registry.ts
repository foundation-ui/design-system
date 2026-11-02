import { js_design_tokens } from "@usefui/tokens";
import {
  generateColorClasses,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "@usefui/core";

import type { StylingRegistryMetadata } from "@chambellan/contracts";

const { design_tokens } = js_design_tokens;

const cssLayoutClasses = generateLayoutClasses();
const cssDimensionClasses = generateDimensionClasses();
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);
const cssFontSizeClasses = generateFontSizesClasses(design_tokens.fontsize);
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);
const cssColorClasses = generateColorClasses(design_tokens.color);

const extractClassNames = (css: string): string[] => {
  const names = new Set<string>();
  const pattern = /\.([a-zA-Z][\w-]*)\s*\{/g;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(css)) !== null) {
    names.add(match[1]!);
  }

  return [...names].sort();
};

export interface CSSClassesRegistryEntry extends StylingRegistryMetadata {
  generatedCss: string;
}

const layoutClasses = extractClassNames(cssLayoutClasses);
const dimensionClasses = extractClassNames(cssDimensionClasses);
const measurementClasses = extractClassNames(cssSizeClasses);
const fontSizeClasses = extractClassNames(cssFontSizeClasses);
const opacityClasses = extractClassNames(cssOpacityClasses);
const colorClasses = extractClassNames(cssColorClasses);

export const layoutClassesMeta: CSSClassesRegistryEntry = {
  name: "layout",
  description:
    "Flex and grid display utilities with alignment, wrapping, and direction helpers. Apply on containers (className on a div or Page regions).",
  category: "layout",
  examples: [
    "flex flex-column align-center justify-between g-medium-30",
    "grid with child alignment via align-* and justify-*",
    "flex-wrap for responsive toolbars and chip rows",
    "flex-column for stacked form fields and card sections",
  ],
  classes: layoutClasses,
  generatedCss: cssLayoutClasses,
};

export const dimensionClassesMeta: CSSClassesRegistryEntry = {
  name: "dimension",
  description:
    "Width and height utilities (w-* and h-*) using percentage, auto, and intrinsic sizing keywords.",
  category: "other",
  examples: [
    "w-100 on tables and page sections",
    "h-100 for full-height story layouts",
    "w-fit-content for compact dropdown triggers",
    "w-50 paired with flex for split panes",
  ],
  classes: dimensionClasses,
  generatedCss: cssDimensionClasses,
};

export const measurementClassesMeta: CSSClassesRegistryEntry = {
  name: "measurement",
  description:
    "Spacing scale from design tokens: padding (p-*), margin (m-*), gap (g-*), with axis suffixes (-x, -y, -t, -r, -b, -l). Steps end in 10, 20, … 90 per scale name (small, medium, large).",
  category: "measurement",
  examples: [
    "p-medium-30 for card body padding",
    "p-y-medium-60 for vertical page section rhythm",
    "g-small-30 between stacked controls",
    "g-medium-10 for inline button groups",
    "m-t-small-10 for subtle separation",
  ],
  classes: measurementClasses,
  generatedCss: cssSizeClasses,
};

export const fontSizeClassesMeta: CSSClassesRegistryEntry = {
  name: "fontsize",
  description:
    "Font-size utilities (fs-{scale}-{step}) generated from token scales small, medium, and large.",
  category: "fontsize",
  examples: [
    "fs-large-30 for page titles",
    "fs-medium-10 for labels and table headers",
    "fs-medium-20 for secondary copy",
    "fs-small-60 for Field.Meta hint text",
  ],
  classes: fontSizeClasses,
  generatedCss: cssFontSizeClasses,
};

export const opacityClassesMeta: CSSClassesRegistryEntry = {
  name: "opacity",
  description:
    "Opacity utilities (opacity-{scale}-{step}) from token sequences default and extended.",
  category: "opacity",
  examples: [
    "opacity-default-30 for de-emphasized body text",
    "opacity-default-60 on icons and shimmer bases",
    "opacity-extended-* for finer backdrop steps",
  ],
  classes: opacityClasses,
  generatedCss: cssOpacityClasses,
};

export const colorClassesMeta: CSSClassesRegistryEntry = {
  name: "color",
  description:
    "Text (color-*) and background (bg-*) utilities bound to CSS variables --color-{token}. Requires global CSS variables from ClientProvider / generateCSSVariables.",
  category: "color",
  examples: [
    "color-mono-white on primary buttons",
    "bg-accent for highlighted surfaces",
    "semantic hues: color-red, bg-green, color-blue",
  ],
  classes: colorClasses,
  generatedCss: cssColorClasses,
};
