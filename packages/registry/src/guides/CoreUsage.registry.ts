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
  generateCSSClasses,
  generateCSSVariables,
} from "@usefui/core";

const emphasis = generateColorTokens("emphasis", "FF0000", {
  alpha: true,
  tint: false,
  shade: false,
});

const design_tokens = {
  ...js_design_tokens,
  color: {
    ...js_design_tokens.color,
    emphasis,
  },
};

const cssVariables = generateCSSVariables(design_tokens);
const cssClasses = generateCSSClasses(design_tokens);`,
};
