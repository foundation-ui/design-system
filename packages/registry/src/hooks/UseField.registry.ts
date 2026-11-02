import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseFieldMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useField",
  title: "useField",
  description: "Import and use the Field component's Hooks in your project.",
  component: "Field",
  module: "@usefui/components",
  code: `import { useField } from "@usefui/components";

export function HookComponent() {
    const field = useField();
    const { id } = field;

    return ( {/** Your code here **/} );
}`,
  arguments: [],
  returns: [
    {
      name: "id",
      type: "string",
      defaultValue: "React.useId",
    },
  ],
};
