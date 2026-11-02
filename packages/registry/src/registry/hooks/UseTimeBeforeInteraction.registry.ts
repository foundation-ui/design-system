import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseTimeBeforeInteractionMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useTimeBeforeInteraction",
  title: "useTimeBeforeInteraction",
  description:
    "Measures the seconds elapsed between page load and the first click, keydown, or touchstart interaction.",
  component: "TimeBeforeInteraction",
  module: "@usefui/analytics",
  code: `import { useTimeBeforeInteraction } from "@usefui/analytics";

export function HookComponent() {
    const { time_before_interact } = useTimeBeforeInteraction();

    return <div>Time before first interaction: {time_before_interact}s</div>;
}`,
  arguments: [],
  returns: [
    {
      name: "time_before_interact",
      type: "number",
      defaultValue: "0",
    },
  ],
};
