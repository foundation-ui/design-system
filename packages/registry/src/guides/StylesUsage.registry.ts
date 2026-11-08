import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const StylesUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "styles",
  title: "Styles",
  description:
    "Global style components shipped by @usefui/components: ResetGlobalStyles (CSS reset) and TypographyGlobalStyles (base font and heading styles).",
  module: "@usefui/components",
  code: `import { createGlobalStyle } from "styled-components";
import { ColorModeProvider } from "@usefui/components";
import { js_design_tokens } from "@usefui/tokens";
import { ResetGlobalStyles, TypographyGlobalStyles } from "@usefui/components";
import {
  generateCSSClasses,
  generateCSSVariables,
} from "@usefui/core";

const design_tokens = js_design_tokens;

const cssVariables = generateCSSVariables(design_tokens);
const cssClasses = generateCSSClasses(design_tokens);

const CSSRoot = createGlobalStyle\`
  :root {
    \${Object.values(cssVariables).flat()}
    \${cssClasses}
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
