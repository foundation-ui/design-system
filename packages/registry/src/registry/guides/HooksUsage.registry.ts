import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const HooksUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "hooks-usage",
  title: "Component Hooks",
  description: "Import and use Component Hooks in your project.",
  module: "@usefui/components",
  code: `import { Dialog, useDialog } from "@usefui/components";

function Provider() {
    return (
      <Dialog.Root>
        <Component />
      </Dialog.Root>
    );
}

function Component() {
    const dialog = useDialog();
    const { states, methods } = dialog;

    return ( {/** Your code here **/} );
}`,
};
