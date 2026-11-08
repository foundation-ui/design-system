import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const StylesUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "styles",
  title: "Styles",
  description:
    "Global style components shipped by @usefui/components: ResetGlobalStyles (CSS reset) and TypographyGlobalStyles (base font and heading styles).",
  module: "@usefui/components",
  code: `import { createGlobalStyle } from "styled-components";
import { ColorModeProvider, js_design_tokens } from "@usefui/tokens";
import { ResetGlobalStyles, TypographyGlobalStyles } from "@usefui/components";
import {
  generateCSSVariables,
  generateColorClasses,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "@usefui/core";

const design_tokens = js_design_tokens;

const cssVariables = generateCSSVariables(design_tokens);

const CSSRoot = createGlobalStyle\`
  :root {
    \${cssVariables.color}
    \${cssVariables.alpha}
    \${cssVariables.tint}
    \${cssVariables.shade}
    \${cssVariables.fontsize}
    \${cssVariables.measurement}
    \${cssVariables.depth}
    \${cssVariables.opacity}

    \${generateSizeClasses(design_tokens.measurement)}
    \${generateFontSizesClasses(design_tokens.fontsize)}
    \${generateOpacityClasses(design_tokens.opacity)}
    \${generateColorClasses(design_tokens.color)}
    \${generateLayoutClasses()}
    \${generateDimensionClasses()}
  }
\`;

function App() {
  return (
    <ColorModeProvider>
      <ResetGlobalStyles />
      <TypographyGlobalStyles />
      <CSSRoot />
      { /** Your app here **/ }
    </ColorModeProvider>
  );
}`,
};
