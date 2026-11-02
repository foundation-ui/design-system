import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const IconsMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "icons",
  title: "Icons",
  description: "Setup and use @usefui/icons in your project.",
  module: "@usefui/icons",
  code: `import { Icon } from "@usefui/icons";

function IconContainer() {
  return (
    <Icon>
      <Icon.Add />
    </Icon>
  );
}`,
};
