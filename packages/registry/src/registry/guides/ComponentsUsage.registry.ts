import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const ComponentsUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "components-usage",
  title: "Components",
  description:
    "Compose compound components via their static parts and drive shared state with their context hooks.",
  module: "@usefui/components",
  code: `import { Dialog, useDialog } from "@usefui/components";

function Trigger() {
    const { methods } = useDialog();
    return <button onClick={methods.toggleDialog}>Open</button>;
}

function App() {
    return (
        <Dialog.Root>
            <Trigger />
            <Dialog>
                <Dialog.Content>
                    { /** Your content here **/ }
                </Dialog.Content>
            </Dialog>
        </Dialog.Root>
    );
}`,
};
