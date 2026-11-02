import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const HooksAPIReferenceMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "hooks-api-reference",
  title: "API Reference",
  description: "How Component Hooks are built and how do they work.",
  module: "@usefui/components",
  code: `import { useAccordion } from "@usefui/components";

const accordion = useAccordion();
const { id, states, methods } = accordion;`,
};
