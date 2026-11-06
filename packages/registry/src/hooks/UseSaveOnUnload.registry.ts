import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSaveOnUnloadMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSaveOnUnload",
  title: "useSaveOnUnload",
  description:
    "Sends a payload to an endpoint when the page unloads, using navigator.sendBeacon with an XHR fallback.",
  component: "SaveOnUnload",
  module: "@usefui/hooks",
  code: `import { useSaveOnUnload } from "@usefui/hooks";

export function HookComponent() {
    useSaveOnUnload({
        url: "/api/analytics/session",
        payload: { sessionId: "abc123" },
    });

    return ( {/** Your code here **/} );
}`,
  arguments: [
    {
      name: "url",
      type: "string",
      required: true,
    },
    {
      name: "payload",
      type: "Record<string, unknown>",
      required: true,
    },
    {
      name: "options",
      type: "BlobPropertyBag",
      defaultValue: '{ type: "application/json" }',
    },
  ],
  returns: [],
};
