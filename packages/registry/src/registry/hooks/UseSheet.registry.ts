import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSheetMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSheet",
  title: "useSheet",
  description: "Import and use the Sheet component's Hooks in your project.",
  component: "Sheet",
  module: "@usefui/components",
  code: `import { useSheet } from "@usefui/components";

export function HookComponent() {
    const sheet = useSheet();
    const { id, states, methods } = sheet;

    const { containerId, triggerId, controlId } = id;
    const { open } = states;
    const { toggle, setOpen } = methods;

    return ( {/** Your code here **/} );
}`,
  arguments: [],
  returns: [
    {
      name: "containerId",
      type: "string",
      defaultValue: "React.useId",
    },
    {
      name: "triggerId",
      type: "string",
      defaultValue: "React.useId",
    },
    {
      name: "controlId",
      type: "string",
      defaultValue: "React.useId",
    },
    {
      name: "open",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "toggle",
      type: "(): => void",
    },
    {
      name: "setOpen",
      type: "(state: boolean): => void",
    },
  ],
};
