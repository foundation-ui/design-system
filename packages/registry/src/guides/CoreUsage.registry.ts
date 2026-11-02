import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const CoreUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "core-usage",
  title: "Core usage",
  description: "Use @usefui/core generators at build-time or on demand.",
  module: "@usefui/core",
  code: `import { js_design_tokens } from "@usefui/tokens";

import {
  generateAlpha,
  generateCSSVariables,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "@usefui/core";

const cssLayoutClasses = generateLayoutClasses();
const cssWidthHeightClasses = generateDimensionClasses();
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);
const cssFSClasses = generateFontSizesClasses(design_tokens.fontsize);
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);

const cssVariables = generateCSSVariables({
  name: js_design_tokens.name,
  design_tokens: {
    color: [
      ...design_tokens.color,
      {
        name: "emphasis",
        base: { hex: "#FF0000" },
        alpha: generateAlpha("#FF0000"),
        tint: [],
        shade: [],
      },
    ],
    measurement: [...design_tokens.measurement],
    fontsize: [...design_tokens.fontsize],
    opacity: [...design_tokens.opacity],
    depth: [...design_tokens.depth],
  },
});`,
};
