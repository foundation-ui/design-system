import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSelectMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSelect",
  title: "useSelect",
  description: "Import and use the Select component's Hooks in your project.",
  component: "Select",
  module: "@usefui/components",
  code: `import { useSelect } from "@usefui/components";

export function HookComponent() {
    const select = useSelect();
    const { id, states, methods } = select;

    const { open, value, label, contentProps, triggerProps } = states;
    const { toggleOpen, setOpen, setValue, setLabel, setContentProps, setTriggerProps } = methods;

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
      name: "value",
      type: "string | null",
      defaultValue: "null",
    },
    {
      name: "label",
      type: "string",
      defaultValue: '""',
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
      type: "(): => boolean | void",
    },
    {
      name: "setOpen",
      type: "(value: boolean) => void",
    },
    {
      name: "setValue",
      type: "(value: string | null) => void",
    },
    {
      name: "setLabel",
      type: "(value: string) => void",
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
