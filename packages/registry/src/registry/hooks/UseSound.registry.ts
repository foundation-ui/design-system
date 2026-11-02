import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSoundMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSound",
  title: "useSound",
  description: "Plays and manages sound effects.",
  component: "Sound",
  module: "@usefui/hooks",
  code: `import { useSound } from "@usefui/hooks";

export function HookComponent() {
  const play = useSound("/sound.mp3");
  return <button onClick={play}>Play</button>;
}`,
  arguments: [],
  returns: [],
};
