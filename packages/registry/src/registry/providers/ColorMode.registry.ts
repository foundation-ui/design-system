import type { ProviderRegistryMetadata } from "@chambellan/contracts";

export const ColorModeMeta: ProviderRegistryMetadata = {
  kind: "provider",
  name: "ColorMode",
  title: "Color Mode",
  description: "Setup and use @usefui/tokens's color mode in your project.",
  module: "@usefui/tokens",
  code: `import { ColorModeProvider } from "@usefui/tokens";

function Provider() {
  return (
    <ColorModeProvider config={/** */}>
      <Component />
    </ColorModeProvider>
  );
}

function Component() {
  const { colorMode, setColorMode } = useColorMode();

  return ( {/** Your code here **/} );
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
