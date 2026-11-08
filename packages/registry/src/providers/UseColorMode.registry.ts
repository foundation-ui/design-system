import type { ProviderRegistryMetadata } from "@chambellan/contracts";

export const UseColorModeMeta: ProviderRegistryMetadata = {
  kind: "provider",
  name: "useColorMode",
  title: "useColorMode",
  description: "Switch between color modes.",
  module: "@usefui/components",
  code: `import { useColorMode } from "@usefui/components";

export function HookComponent() {
    const { colorMode, setColorMode } = useColorMode();

    return ( {/** Your code here **/} );
}`,
  properties: [
    {
      name: "colorMode",
      type: "string | undefined | null",
    },
    {
      name: "setColorMode",
      type: "(mode: 'light' | 'dark' | 'system') => void",
    },
  ],
  types: `type TColorMode = "dark" | "light" | "system";
type FetchedColorModeType = string | undefined | null;`,
};
