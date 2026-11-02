import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseGradientMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useGradient",
  title: "useGradient",
  description: "Generates and applies gradient values.",
  component: "Gradient",
  module: "@usefui/hooks",
  code: `import { useGradient } from "@usefui/hooks";

export function HookComponent() {
  const gradient = useGradient();
  return <img src={gradient.base64} />;
}`,
  arguments: [],
  returns: [],
};
