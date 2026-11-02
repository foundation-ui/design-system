import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const OverlayMeta: ComponentRegistryMetadata = {
  name: "Overlay",
  description:
    "Backdrop scrim displayed on top of the current layer. Low-level primitive for modals.",
  category: "feedback",
  variants: [],
  title: "Overlay",
  props: [
    {
      name: "visible",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "closeOnInteract",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent<HTMLDivElement>) => void",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import React from "react";
import { Button, Overlay } from "@usefui/components";

function OverlayTemplate() {
const [show, setShow] = React.useState<boolean>(false);

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60 align-center justify-center">
            <Button variant="border" sizing="large" onClick={() => setShow(true)}>
                @usefui
            </Button>
            <Overlay
                visible={show}
                onClick={() => setShow(false)}
                className="flex align-center justify-center"
            >
                Click to close the overlay
            </Overlay>
        </div>
    );

}

export default OverlayTemplate;`,
  ],
  anatomy: `import { Overlay } from "@usefui/components";

export function OverlayComponent() {
    return <Overlay />;
}`,

  examples: [
    { kind: "note", title: "visible prop toggles mount and display" },
    { kind: "note", title: "closeOnInteract for click-to-dismiss" },
    {
      kind: "note",
      title: "wrapped by Dialog.Overlay and Sheet overlay patterns",
    },
    { kind: "note", title: "Button toggle in Overlay stories" },
  ],
  a11y: {
    role: "presentation backdrop",
    keyboardNav: "Not focusable (tabIndex -1, aria-hidden)",
    ariaAttributes: ["aria-hidden"],
  },
  relatedComponents: ["Dialog", "Sheet", "Button"],
  aiHints: {
    useCases: [
      "modal dimmed backdrop via Dialog.Overlay",
      "click-outside dismiss when closeOnInteract",
    ],
    avoid: [
      "standalone accessible modal without Dialog/Sheet",
      "interactive content on the overlay itself",
      "keyboard dismiss without parent handling",
    ],
    composesWith: ["Dialog.Overlay", "Sheet"],
  },
};
