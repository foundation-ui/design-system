import { RefObject } from "react";
import useEventListener from "./useEventListener";

type Handler = (event: MouseEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event: MouseEvent) => {
    const element = ref && ref.current;

    if (!element || element.contains(event.target as Node)) return;
    handler(event);
  });
}
