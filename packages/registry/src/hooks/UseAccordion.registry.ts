import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseAccordionMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useAccordion",
  title: "useAccordion",
  description:
    "Import and use the Accordion component's Hooks in your project.",
  component: "Accordion",
  module: "@usefui/components",
  code: `import { useAccordion } from "@usefui/components";

export function HookComponent() {
    const accordion = useAccordion();
    const { id, states, methods } = accordion;

    const { value } = states;
    const { applyValue, getAccordionId } = methods;

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
      name: "getAccordionId",
      type: "({ value: string; type: \"trigger\" | \"content\" }) => string",
    },
  ],
};
