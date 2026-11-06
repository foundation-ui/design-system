import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseToolbarMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useToolbar",
  title: "useToolbar",
  description:
    "Access the Toolbar component state and methods. Must be used within Toolbar.Root; throws otherwise.",
  component: "Toolbar",
  module: "@usefui/components",
  code: `import { useToolbar } from "@usefui/components";

export function HookComponent() {
    const toolbar = useToolbar();
    const { id, states, methods } = toolbar;
    const { state, open, isMobile, expanded } = states;
    const { toggle, setOpen, setOpenMobile, setExpanded, configure } = methods;

    return ( {/** Your code here **/} );
}`,
  arguments: [],
  returns: [
    {
      name: "id",
      type: "string",
    },
    {
      name: "state",
      type: '"expanded" | "collapsed"',
    },
    {
      name: "open",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "setOpen",
      type: "(open: boolean) => void",
    },
    {
      name: "toggle",
      type: "() => void",
    },
    {
      name: "isMobile",
      type: "boolean",
    },
    {
      name: "openMobile",
      type: "boolean",
    },
    {
      name: "setOpenMobile",
      type: "(open: boolean) => void",
    },
    {
      name: "expanded",
      type: "boolean",
    },
    {
      name: "setExpanded",
      type: "(open: boolean) => void",
    },
    {
      name: "configure",
      type: "(config: IToolbarMobileConfig) => void",
    },
  ],
};
