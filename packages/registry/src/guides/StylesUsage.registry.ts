import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const StylesUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "styles",
  title: "Styles",
  description:
    "Global style components shipped by @usefui/styles: ResetStyles (CSS reset) and TypographyRoot (base font and heading styles). CSSRoot is no longer shipped — build it in your app from @usefui/core generators to inject the design tokens as CSS variables and utility classes.",
  module: "@usefui/styles",
  code: `import { createGlobalStyle } from "styled-components";
import { ColorModeProvider, js_design_tokens } from "@usefui/tokens";
import { ResetStyles, TypographyRoot } from "@usefui/styles";
import {
  generateCSSVariables,
  generateColorClasses,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "@usefui/core";

const { design_tokens } = js_design_tokens;

const cssVariables = generateCSSVariables({
  name: js_design_tokens.name,
  design_tokens,
});

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
      <ResetStyles />
      <TypographyRoot />
      <CSSRoot />
      { /** Your app here **/ }
    </ColorModeProvider>
  );
}`,
};
