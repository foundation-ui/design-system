import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSwitchMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSwitch",
  title: "useSwitch",
  description: "Import and use the Switch component's Hooks in your project.",
  component: "Switch",
  module: "@usefui/components",
  code: `import { useSwitch } from "@usefui/components";

export function HookComponent() {
    const switchHook = useSwitch();
    const { id, states, methods } = switchHook;

    const { checked } = states;
    const { toggleChecked, applyChecked } = methods;

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
      name: "checked",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "toggleChecked",
      type: "() => void",
    },
    {
      name: "applyChecked",
      type: "(checked: boolean) => void",
    },
  ],
};
