import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseClickOutsideMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useClickOutside",
  title: "useClickOutside",
  description:
    "Invokes a handler when a pointer event occurs outside the referenced element.",
  component: "ClickOutside",
  module: "@usefui/hooks",
  code: `import { useRef } from "react";
import { useClickOutside } from "@usefui/hooks";

export function HookComponent() {
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, (event) => {
        console.log("clicked outside", event.target);
    });

    return <div ref={ref}>{ /** Your code here **/ }</div>;
}`,
  arguments: [
    {
      name: "ref",
      type: "RefObject<T>",
      required: true,
    },
    {
      name: "handler",
      type: "(event: MouseEvent) => void",
      required: true,
    },
    {
      name: "mouseEvent",
      type: '"mousedown" | "mouseup"',
      defaultValue: "mousedown",
    },
  ],
  returns: [],
};
