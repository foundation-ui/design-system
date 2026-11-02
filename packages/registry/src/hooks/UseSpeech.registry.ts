import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSpeechMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSpeech",
  title: "useSpeech",
  description: "Handles speech recognition and synthesis.",
  component: "Speech",
  module: "@usefui/hooks",
  code: `import { useSpeech } from "@usefui/hooks";

export function HookComponent() {
  const { transcript } = useSpeech();
  return <p>{transcript}</p>;
}`,
  arguments: [],
  returns: [],
};
