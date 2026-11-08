import type { ProviderRegistryMetadata } from "@chambellan/contracts";

export const ColorModeProviderMeta: ProviderRegistryMetadata = {
  kind: "provider",
  name: "ColorModeProvider",
  title: "Color Mode Provider",
  description:
    "Setup and use @usefui/components's color mode context in your project.",
  module: "@usefui/components",
  code: `import { ColorModeProvider } from "@usefui/components";

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
      name: "disableTransitionOnChange",
      type: "boolean",
      required: false,
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
    {
      kind: "note",
      title: "Transition suppression",
      description:
        "By default, ColorModeProvider suppresses CSS transitions during a theme switch so every element does not animate. Set disableTransitionOnChange={false} (or config.disableTransitionOnChange = false) to keep transitions enabled.",
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
  disableTransitionOnChange?: boolean;
};`,
};
