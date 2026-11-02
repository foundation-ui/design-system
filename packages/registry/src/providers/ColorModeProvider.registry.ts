import type { ProviderRegistryMetadata } from "@chambellan/contracts";

export const ColorModeProviderMeta: ProviderRegistryMetadata = {
  kind: "provider",
  name: "ColorModeProvider",
  title: "Color Mode Provider",
  description:
    "Setup and use @usefui/tokens's color mode context in your project.",
  module: "@usefui/tokens",
  code: `import { ColorModeProvider } from "@usefui/tokens";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider config={/** */}>
      {children}
    </ColorModeProvider>
  );
}`,
  properties: [
    {
      name: "config",
      type: "ColorModeConfig",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
    },
  ],
  notes: [
    {
      kind: "note",
      title: "Pitfall",
      description:
        "If you are not planning to use the pre-built Design Token libraries, there are a few variables that must be defined in your config in order to get the expected behavior from useColorMode.",
    },
  ],
  functions: [
    {
      name: "getPreferredColorScheme",
      description: "Read preferred user color mode from system preferences.",
      code: `const getPreferredColorScheme = (): TColorMode => {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia(DARK_QUERY).matches) return "dark";
    if (window.matchMedia(LIGHT_QUERY).matches) return "light";
    if (window.matchMedia(SYSTEM_QUERY).matches) return "system";
  }

  return "system"; // Safe initialization
};`,
    },
    {
      name: "writeColorModeStyles",
      description:
        "Write the current color mode design token values as CSS variables into the document head.",
      code: `const writeColorModeStyles = (
  colorMode: TColorMode,
  config?: ColorModeConfig
) => {
  // Ensure safe usage of window and document
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const head = document.head ?? document?.getElementsByTagName("head")[0];
  const current = head.querySelector('style[title="color_mode_vars"]');

  // Remove existing value if defined to prevent duplication
  if (current) head.removeChild(current);

  const style = document.createElement("style");
  style.type = "text/css";
  style.title = "color_mode_vars";

  // Build --font-color, --body-color, --contrast-color
  // and their -alpha-NNN values for the active colorMode.
  const variables = [
    "width:100",
    "font",
    "body",
    "contrast",
  ].join(" ");

  style.textContent = ""; // e.g. "--font-color: var(--color-mono-white); ..."

  head.appendChild(style);
};`,
    },
  ],
  types: `type ColorModeItem = {
  light: string;
  dark: string;
};

type ColorModeConfig = {
  font?: ColorModeItem;
  body?: ColorModeItem;
  contrast?: ColorModeItem;
};`,
};
