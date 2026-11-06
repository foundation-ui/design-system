import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseKeyPressMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useKeyPress",
  title: "useKeyPress",
  description:
    "Tracks whether a key (optionally with a modifier) is currently pressed on the window.",
  component: "KeyPress",
  module: "@usefui/hooks",
  code: `import { useKeyPress } from "@usefui/hooks";

export function HookComponent() {
    const pressed = useKeyPress("k", true, "ctrlKey");

    return <p>{pressed ? "Pressed" : "Idle"}</p>;
}`,
  arguments: [
    {
      name: "targetKey",
      type: "string",
      required: true,
    },
    {
      name: "hotkey",
      type: "boolean",
    },
    {
      name: "bindKey",
      type: '"ctrlKey" | "metaKey" | "altKey" | "shiftKey"',
      defaultValue: "metaKey",
    },
  ],
  returns: [
    {
      name: "keyPressed",
      type: "boolean",
    },
  ],
  types: `enum KeyBindingEnum {
  Meta = "metaKey",
  Ctrl = "ctrlKey",
  Alt = "altKey",
  Shift = "shiftKey",
}`,
};
