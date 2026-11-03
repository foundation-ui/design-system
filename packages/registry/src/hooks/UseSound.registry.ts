import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSoundMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSound",
  title: "useSound",
  description:
    "Synthesizes short UI sound effects with the Web Audio API. It lazily creates and unlocks an audio context, applies a master volume, throttles repeated sounds, persists preferences to localStorage, and disables itself when prefers-reduced-motion is set and no stored preference exists.",
  component: "Sound",
  module: "@usefui/hooks",
  code: `import { useSound } from "@usefui/hooks";

export function HookComponent() {
  const { play, enabled, volume, setEnabled, setVolume } = useSound();

  return (
    <div>
      <button type="button" onClick={() => play("click")}>
        Click
      </button>
      <button type="button" onClick={() => play("success")}>
        Success
      </button>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
        Sound
      </label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
      />
    </div>
  );
}`,
  arguments: [],
  returns: [
    {
      name: "enabled",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "volume",
      type: "number",
      defaultValue: "0.42",
    },
    {
      name: "play",
      type: "(name: SoundName, options?: SoundOptions) => void",
    },
    {
      name: "setEnabled",
      type: "(enabled: boolean) => void",
    },
    {
      name: "setVolume",
      type: "(volume: number) => void",
    },
  ],
  types: `type SoundName =
  | "click"
  | "tick"
  | "success"
  | "error"
  | "toggle"
  | "pop"
  | "navigate"
  | "select"
  | "slide"
  | "notification"
  | "delete";

interface SoundOptions {
  /** Stereo position from 0 (left) to 1 (right). Defaults to 0.5. */
  x?: number;
}`,
};
