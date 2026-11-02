import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseEventListenerMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useEventListener",
  title: "useEventListener",
  description:
    "Subscribes a window or element event listener with latest-handler semantics. Currently exposed only as a default export in @usefui/hooks.",
  component: "EventListener",
  module: "@usefui/hooks",
  code: `import { useRef } from "react";
import useEventListener from "@usefui/hooks/useEventListener";

export function HookComponent() {
    const ref = useRef<HTMLDivElement>(null);

    useEventListener("click", (event) => {
        console.log("clicked", event.target);
    }, ref);

    return <div ref={ref}> {/** Your code here **/} </div>;
}`,
  arguments: [
    {
      name: "eventName",
      type: "keyof WindowEventMap | keyof HTMLElementEventMap",
      required: true,
    },
    {
      name: "handler",
      type: "(event: Event) => void",
      required: true,
    },
    {
      name: "element",
      type: "RefObject<T>",
    },
  ],
  returns: [],
};
