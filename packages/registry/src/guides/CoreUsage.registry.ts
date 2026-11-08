import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const CoreUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "core-usage",
  title: "Core usage",
  description: "Use @usefui/core generators at build-time or on demand.",
  module: "@usefui/core",
  code: `import { js_design_tokens } from "@usefui/tokens";

import {
  generateColorTokens,
  generateCSSVariables,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "@usefui/core";

const design_tokens = js_design_tokens;

const cssLayoutClasses = generateLayoutClasses();
const cssWidthHeightClasses = generateDimensionClasses();
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);
const cssFSClasses = generateFontSizesClasses(design_tokens.fontsize);
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);

const emphasis = generateColorTokens("emphasis", "FF0000", {
  alpha: true,
  tint: false,
  shade: false,
});

const cssVariables = generateCSSVariables({
  ...design_tokens,
  color: {
    ...design_tokens.color,
    emphasis,
  },
});`,
};
