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

    const { open } = states;
    const { toggle, setOpen, getSheetId } = methods;

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
      name: "getSheetId",
      type: "(type: 'trigger' | 'content' | 'inner-control') => string",
    },
    {
      name: "open",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "toggle",
      type: "() => void",
    },
    {
      name: "setOpen",
      type: "(state: boolean) => void",
    },
  ],
};
