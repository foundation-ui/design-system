import React from "react";

export interface IEventPayload {
  type: string;
  occured_at: string;
  occured_at_epoch: number;
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
  references: string[]
): { interactions: IComponentUsage[] } => {
  const [componentUsage, setComponentUsage] = React.useState<IComponentUsage[]>(
    []
  );

  const handleInteraction = (event: MouseEvent) => {
    const target = event.target as Element;

    if (references.includes(target.id)) {
      setComponentUsage((prevData) => {
        const usageRef = [...prevData];
        const index = prevData.findIndex((item) => item.origin === target.id);
        const targetRect = target.getBoundingClientRect();

        const eventData: IEventPayload = {
          type: event.type,
          occured_at: new Date().toISOString(),
          occured_at_epoch: Date.now(),
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

        if (index !== -1) {
          usageRef[index] = {
            origin: target.id,
            element: target.nodeName.toLowerCase(),
            content: target.textContent || target.firstChild.nodeName,
            frequency: usageRef[index]!.frequency + 1,
            events: [...usageRef[index]!.events, eventData],
          };

          return usageRef;
        } else {
          return [
            ...prevData,
            {
              origin: target.id,
              frequency: 1,
              events: [eventData],
            },
          ];
        }
      });
    }
  };

  React.useEffect(() => {
    TRACKED_EVENTS.forEach((eventType) =>
      document.addEventListener(eventType, handleInteraction)
    );

    return () => {
      TRACKED_EVENTS.forEach((eventType) =>
        document.removeEventListener(eventType, handleInteraction)
      );
    };
  }, [references]);

  return { interactions: componentUsage };
};
