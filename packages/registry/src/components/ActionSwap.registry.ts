import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ActionSwapMeta: ComponentRegistryMetadata = {
  name: "ActionSwap",
  title: "ActionSwap",
  description: "Swaps between two actions on click, commonly used for copy/confirmation feedback.",
  category: "input",
  variants: [],
  props: [
    { name: "delay", type: "number", defaultValue: "1000" },
    { name: "actions", type: "ReactNode[]", required: true },
    { name: "onClick", type: "(event: MouseEvent<HTMLButtonElement>) => void" },
    { name: "children", type: "ReactNode" },
  ],
  examples: [{ kind: "note", title: "default usage" }],
  a11y: { role: "button", keyboardNav: "Enter and Space activate" },
  relatedComponents: ["Button", "CopyButton"],
  aiHints: {
    useCases: ["copy-to-clipboard feedback", "toggle between two labels"],
    avoid: ["persistent state controls"],
    composesWith: ["Button"],
  },
};
