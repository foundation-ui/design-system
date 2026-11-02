import React from "react";

export interface IEventPayload {
  type: string;
  occurred_at: string;
  occurred_at_epoch: number;
  dimension: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
export interface IComponentUsage {
  origin: string;
  frequency: number;
  events: IEventPayload[];
  element?: string;
  content?: string;
}

export type TTrackedEvent =
  | "click"
  | "dblclick"
  | "mouseover"
  | "focusin"
  | "focusout"
  | "touchstart"
  | "touchend";

export const TRACKED_EVENTS: TTrackedEvent[] = [
  "click",
  "dblclick",
  "mouseover",
  "focusin",
  "focusout",
  "touchstart",
  "touchend",
];

export const useComponentsInteractions = (
  references: string[],
  options?: { silent?: boolean }
): { interactions: IComponentUsage[] } => {
  const [componentUsage, setComponentUsage] = React.useState<IComponentUsage[]>(
    []
  );
  const silent = options?.silent ?? false;

  const handleInteraction = React.useCallback(
    (event: Event) => {
      const target = event.target;

      if (!(target instanceof Element) || !references.includes(target.id)) {
        return;
      }

      const targetRect = target.getBoundingClientRect();

      const eventData: IEventPayload = {
        type: event.type,
        occurred_at: new Date().toISOString(),
        occurred_at_epoch: Date.now(),
        dimension: {
          width: targetRect.width,
          height: targetRect.height,
        },
        position: {
          x: targetRect.x,
          y: targetRect.y,
          top: targetRect.top,
          right: targetRect.right,
          bottom: targetRect.bottom,
          left: targetRect.left,
        },
      };

      setComponentUsage((prevData) => {
        const index = prevData.findIndex((item) => item.origin === target.id);
        const element = target.nodeName.toLowerCase();
        const content = target.textContent?.trim() ?? "";

        if (index === -1) {
          return [
            ...prevData,
            {
              origin: target.id,
              element,
              content,
              frequency: 1,
              events: [eventData],
            },
          ];
        }

        const existing = prevData[index];
        if (!existing) return prevData;

        return prevData.map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...existing,
                element,
                content,
                frequency: existing.frequency + 1,
                events: [...existing.events, eventData],
              }
            : item
        );
      });
    },
    [references]
  );

  React.useEffect(() => {
    if (silent) return;

    TRACKED_EVENTS.forEach((eventType) =>
      document.addEventListener(eventType, handleInteraction)
    );

    return () => {
      TRACKED_EVENTS.forEach((eventType) =>
        document.removeEventListener(eventType, handleInteraction)
      );
    };
  }, [silent, handleInteraction]);

  return { interactions: componentUsage };
};
