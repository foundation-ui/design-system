import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseTabsMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useTabs",
  title: "useTabs",
  description: "Import and use the Tabs component's Hooks in your project.",
  component: "Tabs",
  module: "@usefui/components",
  code: `import { useTabs } from "@usefui/components";

export function HookComponent() {
    const tabs = useTabs();
    const { id, states, methods } = tabs;

    const { value } = states;
    const { applyValue, getTabsId } = methods;

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
      name: "value",
      type: "string | null",
      defaultValue: "null",
    },
    {
      name: "applyValue",
      type: "(value: string | null) => void",
    },
    {
      name: "getTabsId",
      type: "({ value: string | undefined; type: \"trigger\" | \"content\" }) => string",
    },
  ],
};
