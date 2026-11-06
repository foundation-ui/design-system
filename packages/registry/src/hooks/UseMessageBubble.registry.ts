import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseMessageBubbleMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useMessageBubble",
  title: "useMessageBubble",
  description:
    "Import and use the MessageBubble component's Hooks in your project.",
  component: "MessageBubble",
  module: "@usefui/components",
  code: `import { useMessageBubble } from "@usefui/components";

export function HookComponent() {
    const bubble = useMessageBubble();
    const { id, states, methods } = bubble;

    const { side } = states;
    const { applySide } = methods;

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
      name: "side",
      type: '"left" | "right" | null',
    },
    {
      name: "applySide",
      type: "(side: MessageBubbleSide) => void",
    },
  ],
};
