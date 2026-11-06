import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseDropdownMenuMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useDropdownMenu",
  title: "useDropdownMenu",
  description:
    "Import and use the DropdownMenu component's Hooks in your project.",
  component: "DropdownMenu",
  module: "@usefui/components",
  code: `import { useDropdownMenu } from "@usefui/components";

export function HookComponent() {
    const dropdown = useDropdownMenu();
    const { id, states, methods } = dropdown;

    const { open, contentProps, triggerProps } = states;
    const { toggleOpen, setContentProps, setTriggerProps } = methods;

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
      name: "contentProps",
      type: "PositionProperties",
    },
    {
      name: "triggerProps",
      type: "PositionProperties",
    },
    {
      name: "toggleOpen",
      type: "() => void",
    },
    {
      name: "setContentProps",
      type: "(props: PositionProperties) => void",
    },
    {
      name: "setTriggerProps",
      type: "(props: PositionProperties) => void",
    },
  ],
  types: `interface RectProperties {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
interface DimensionsProperties {
  width: number;
  height: number;
}
interface PositionProperties extends RectProperties, DimensionsProperties {}`,
};
