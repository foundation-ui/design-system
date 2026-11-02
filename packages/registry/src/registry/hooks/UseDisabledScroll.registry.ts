import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseDisabledScrollMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useDisabledScroll",
  title: "useDisabledScroll",
  description:
    "Locks document body scrolling while the given state is true and returns the resulting overflow value.",
  component: "DisabledScroll",
  module: "@usefui/hooks",
  code: `import { useDisabledScroll } from "@usefui/hooks";

export function HookComponent() {
    const { overflow, disabled } = useDisabledScroll(true);

    return <p>overflow: {overflow} - disabled: {String(disabled)}</p>;
}`,
  arguments: [
    {
      name: "state",
      type: "boolean",
      required: true,
    },
  ],
  returns: [
    {
      name: "overflow",
      type: '"hidden" | ""',
      defaultValue: '""',
    },
    {
      name: "disabled",
      type: "boolean",
    },
  ],
};
