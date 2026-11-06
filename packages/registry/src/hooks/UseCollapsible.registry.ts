import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseCollapsibleMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useCollapsible",
  title: "useCollapsible",
  description:
    "Import and use the Collapsible component's Hooks in your project.",
  component: "Collapsible",
  module: "@usefui/components",
  code: `import { useCollapsible } from "@usefui/components";

export function HookComponent() {
    const collapsible = useCollapsible();
    const { id, states, methods } = collapsible;

    const { expanded, defaultOpen } = states;
    const { toggleCollapsible, applyDefaultOpen } = methods;

    return ( {/** Your code here **/} );
}`,
  arguments: [],
  returns: [
    {
      name: "id",
      type: "string",
      defaultValue: "React.useId",
    },
    {
      name: "expanded",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "toggleCollapsible",
      type: "() => void",
    },
    {
      name: "applyDefaultOpen",
      type: "() => void",
    },
  ],
};
