import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const TokensMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "tokens",
  title: "Design Tokens",
  description: "Setup and use @usefui/tokens in your project.",
  module: "@usefui/tokens",
  code: `import React from "react";
import { ColorModeProvider } from "@usefui/components";
import { js_design_tokens } from "@usefui/tokens";

import {
  generateColorTokens,
  generateCSSVariables,
} from "@usefui/core";

const design_tokens = js_design_tokens;

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
});

function ClientProvider({ children }: { children: React.ReactNode }) {
  const colorModeConfig = React.useMemo(() => ({
    body: {
      light: "var(--color-mono-light)",
      dark: "var(--color-mono-darkest)",
    },
    contrast: {
      light: "var(--color-mono-white)",
      dark: "var(--color-mono-darker)",
    },
  }));

  return (
    <ColorModeProvider config={colorModeConfig}>
      {children}
    </ColorModeProvider>
  );
}`,
};
