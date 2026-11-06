import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseDialogMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useDialog",
  title: "useDialog",
  description: "Import and use the Dialog component's Hooks in your project.",
  component: "Dialog",
  module: "@usefui/components",
  code: `import { useDialog } from "@usefui/components";

export function HookComponent() {
    const dialog = useDialog();
    const { id, states, methods } = dialog;

    const { open } = states;
    const { toggleDialog, getDialogId } = methods;

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
      name: "open",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "toggleDialog",
      type: "() => void",
    },
    {
      name: "getDialogId",
      type: "(type: 'trigger' | 'content' | 'inner-control') => string",
    },
  ],
};
