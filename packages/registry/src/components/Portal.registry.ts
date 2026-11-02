import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const PortalMeta: ComponentRegistryMetadata = {
  name: "Portal",
  description:
    "Renders children into a DOM node outside the parent hierarchy by container id.",
  category: "layout",
  variants: [],
  title: "Portal",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "container",
      type: "string",
      required: true,
    },
  ],
  usage: [
    `import React from "react";
import { Portal } from "@usefui/components";

function PortalTemplate() {
const [container, setContainer] = React.useState<string>("portal-demo-1");

    const handlePortalChange = () => {
      if (container === "portal-demo-1") setContainer("portal-demo-2");
      if (container === "portal-demo-2") setContainer("portal-demo-1");
    };

    return (
      <React.Fragment>
        <div className="w-100 h-100 p-t-large-30 p-x-medium-60">
          <hgroup className="flex align-center justify-center g-medium-30">
            <p className="fs-medium-20 opacity-default-60">Click the Downasaur</p>

            <Portal container={container}>
              <Button variant="ghost" onClick={handlePortalChange}>
                <Icon>
                  <PixelIcon.Downasaur />
                </Icon>
              </Button>
            </Portal>
          </hgroup>
        </div>

        <div className="flex align-center justify-center w-100 h-100 p-medium-60 g-large-10">
          <div id="portal-demo-1" className="flex align-center g-medium-30">
            <small className="opacity-default-10">#portal-demo-1</small>
          </div>
          <div id="portal-demo-2" className="flex align-center g-medium-30">
            <small className="opacity-default-10">#portal-demo-2</small>
          </div>
        </div>
      </React.Fragment>
    );

}

export default PortalTemplate;`,
  ],
  anatomy: `import { Portal } from "@usefui/components";

export function PortalComponent() {
    return <Portal container="portal-demo">Content</Portal>;
}`,

  examples: [
    { kind: "note", title: "container prop as element id (queries #id)" },
    { kind: "note", title: "Default story with sibling portal-container div" },
    { kind: "note", title: "SSR-safe: null until mounted and target exists" },
  ],
  a11y: {
    role: "depends on portaled children",
    keyboardNav: "Not managed by Portal",
    ariaAttributes: [],
  },
  relatedComponents: ["Tooltip", "Dropdown", "Dialog"],
  aiHints: {
    useCases: [
      "mount overlays at document root",
      "escape overflow-hidden parents",
      "dedicated mount nodes in Electron or Next apps",
    ],
    avoid: [
      "missing or non-unique container id",
      "assuming focus trap is included",
      "portaling without SSR mount guard",
    ],
    composesWith: [],
  },
};
