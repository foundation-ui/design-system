import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseCheckboxMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useCheckbox",
  title: "useCheckbox",
  description: "Import and use the Checkbox component's Hooks in your project.",
  component: "Checkbox",
  module: "@usefui/components",
  code: `import { useCheckbox } from "@usefui/components";

export function HookComponent() {
    const checkbox = useCheckbox();
    const { id, states, methods } = checkbox;

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
      type: "(): => void",
    },
    {
      name: "applyChecked",
      type: "(state: boolean) => void",
    },
  ],
};
