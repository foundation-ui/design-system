import React from "react";

export interface IEventPayload {
  type: string;
  occured_at: string;
  position: {
    x: number;
    y: number;
  };
}
export interface IComponentUsage {
  origin: string;
  frequency: number;
  events: IEventPayload[];
}

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
        const index = prevData.findIndex((item) => item.origin === target.id);
        const usageRef = [...prevData];
        const eventData: IEventPayload = {
          type: event.type,
          occured_at: new Date(Date.now()).toISOString(),
          position: {
            x: event.x,
            y: event.y,
          },
        };

        if (index !== -1) {
          usageRef[index] = {
            origin: target.id,
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
    document.addEventListener("click", handleInteraction);
    document.addEventListener("dblclick", handleInteraction);
    document.addEventListener("mouseover", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("dblclick", handleInteraction);
      document.removeEventListener("mouseover", handleInteraction);
    };
  }, [references]);

  return { interactions: componentUsage };
};
