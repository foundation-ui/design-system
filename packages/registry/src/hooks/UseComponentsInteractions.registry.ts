import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseComponentsInteractionsMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useComponentsInteractions",
  title: "useComponentsInteractions",
  description:
    "Tracks user interactions (click, dblclick, mouseover, focusin, focusout, touchstart, touchend) on elements matching the given IDs.",
  component: "ComponentsInteractions",
  module: "@usefui/hooks",
  code: `import { useComponentsInteractions } from "@usefui/hooks";

export function HookComponent() {
    const { interactions } = useComponentsInteractions(["btn-primary"]);

    return (
        <div>
            {interactions.map((interaction) => (
                <div key={interaction.origin}>
                    <strong>{interaction.origin}</strong>:{" "}
                    {interaction.frequency} interactions
                </div>
            ))}
        </div>
    );
}`,
  arguments: [
    {
      name: "references",
      type: "string[]",
      required: true,
    },
  ],
  returns: [
    {
      name: "interactions",
      type: "IComponentUsage[]",
    },
  ],
  types: `interface IEventPayload {
  type: string;
  occured_at: string;
  occured_at_epoch: number;
  dimension: { width: number; height: number };
  position: {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

interface IComponentUsage {
  origin: string;
  frequency: number;
  events: IEventPayload[];
  element?: string;
  content?: string;
}

type TTrackedEvent =
  | "click"
  | "dblclick"
  | "mouseover"
  | "focusin"
  | "focusout"
  | "touchstart"
  | "touchend";

const TRACKED_EVENTS: TTrackedEvent[];`,
};
