import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseBehaviorAnalyticsMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useBehaviorAnalytics",
  title: "useBehaviorAnalytics",
  description:
    "Composes performance, time-to-interaction, and component interaction hooks into a single user behavior snapshot.",
  component: "BehaviorAnalytics",
  module: "@usefui/analytics",
  code: `import { useBehaviorAnalytics } from "@usefui/analytics";

export function HookComponent() {
    const data = useBehaviorAnalytics({
        silent: false,
        flags: ["btn-primary", "cta"],
    });

    if (!data) return null;

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
  arguments: [
    {
      name: "silent",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "flags",
      type: "string[]",
      required: true,
    },
  ],
  returns: [
    {
      name: "interactions",
      type: "TInteractionsData[]",
    },
    {
      name: "session",
      type: "{ html_snapshot, entry_time, entry_epoch, last_interaction_time, last_interaction_epoch, time_before_interact }",
    },
    {
      name: "system",
      type: "{ path, user_agent, device_os, performances, viewport, screen }",
    },
  ],
  types: `type TUbaConfig = {
  silent?: boolean;
  flags: string[];
};

type TInteractionsData = {
  origin: string;
  frequency: number;
  types: unknown[];
  events: IEventPayload[];
};`,
};
