import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseIsMobileMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useIsMobile",
  title: "useIsMobile",
  description:
    "Tracks whether the viewport is below a mobile breakpoint via matchMedia.",
  component: "IsMobile",
  module: "@usefui/hooks",
  code: `import { useIsMobile } from "@usefui/hooks";

export function HookComponent() {
    const isMobile = useIsMobile({ breakpoint: 768 });

    return ( {/** Your code here **/} );
}`,
  arguments: [
    {
      name: "breakpoint",
      type: "number",
      defaultValue: "768",
    },
  ],
  returns: [
    {
      name: "isMobile",
      type: "boolean",
      defaultValue: "false",
    },
  ],
};
