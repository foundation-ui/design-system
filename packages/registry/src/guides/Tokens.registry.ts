import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const TokensMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "tokens",
  title: "Design Tokens",
  description: "Setup and use @usefui/tokens in your project.",
  module: "@usefui/tokens",
  code: `import { js_design_tokens } from "@usefui/tokens";

import {
  generateAlpha,
  generateCSSVariables,
} from "@usefui/core";

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
