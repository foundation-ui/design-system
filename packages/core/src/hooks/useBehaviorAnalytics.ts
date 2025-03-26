import React from "react";
import { useTimeBeforeInteraction } from "./useTimeBeforeInteraction";
import {
  usePerformanceMetrics,
  IPerfomanceMetricsProperties,
} from "./usePerformanceMetrics";
import {
  TTrackedEvent,
  TRACKED_EVENTS,
  IComponentUsage,
  useComponentsInteractions,
  IEventPayload,
} from "./useComponentsInteractions";

export type TUbaConfig = {
  silent?: boolean;
  flags: string[];
};

type TInteractionsData = {
  origin: string;
  frequency: number;
  types: unknown[];
  events: IEventPayload[] | [];
};
interface IBehaviorAnalyticsProperties {
  silent?: boolean;
  interactions: TInteractionsData[] | [];
  session: {
    html_snapshot: string;
    entry_time: string;
    entry_epoch: number;
    last_interaction_time: string | null;
    last_interaction_epoch: number | null;
    time_before_interact: number | null;
  };
  system: {
    path: string;
    user_agent: string;
    device_os: string;
    performances: IPerfomanceMetricsProperties | null;
    viewport: {
      width: number;
      height: number;
    };
    screen: {
      width: number;
      height: number;
      pixel_depth: number;
      orientation: {
        angle: number;
        type: string;
      };
    };
  };
}

const getDeviceOs = (): string | undefined => {
  const userAgent = navigator.userAgent.toLowerCase();

  // Match iPhone and iPad models with iOS version
  const iosRegex = /(ipad|iphone);.*cpu os ([\d_]+) like mac os x/;
  const iosMatch = userAgent.match(iosRegex);

  if (iosMatch) {
    const iosVersion = iosMatch[2]?.replace(/_/g, ".");
    return `iOS ${iosVersion}`;
  }

  // Match Android models with version
  const androidRegex =
    /(android)\s([\d.]+)(?:;|)\s((?:(?:[a-zA-Z0-9]+\s?){1,3})(?:build|))/;
  const androidMatch = userAgent.match(androidRegex);

  if (androidMatch) {
    return `Android ${androidMatch[2]} ${androidMatch[3]}`;
  }

  // Match Windows with version
  const windowsRegex = /windows nt ([\d._]+)/;
  const windowsMatch = userAgent.match(windowsRegex);

  if (windowsMatch) {
    return `Windows ${windowsMatch[1]}`;
  }

  // Match macOS with version
  const macOsRegex = /mac os x ([\d._]+)/;
  const macOsMatch = userAgent.match(macOsRegex);

  if (macOsMatch) {
    return `macOS ${macOsMatch[1]}`;
  }

  // Match Linux with kernel version
  const linuxRegex = /linux(?:.*?)(([\d._]+))/;
  const linuxMatch = userAgent.match(linuxRegex);

  if (linuxMatch) {
    return `Linux ${linuxMatch[1]}`;
  }

  return undefined;
};

export const useBehaviorAnalytics = ({
  silent,
  flags,
}: TUbaConfig): IBehaviorAnalyticsProperties | void => {
  if (silent) return;

  const { metrics } = usePerformanceMetrics();
  const { time_before_interact } = useTimeBeforeInteraction();
  const { interactions } = useComponentsInteractions(flags);

  const { innerWidth, innerHeight, screen, location } = window;

  const getLastInteractionEpoch = (): number => {
    const maxEpoch = Math.max(
      ...interactions.flatMap(({ events }: IComponentUsage) =>
        events.map(({ occured_at_epoch }: IEventPayload) => occured_at_epoch)
      )
    );
    if (maxEpoch === -Infinity) return 0;
    else return maxEpoch;
  };

  const system_data = React.useMemo(() => {
    return {
      path: location.href,
      user_agent: navigator.userAgent,
      device_os: getDeviceOs(),
      viewport: {
        width: innerWidth,
        height: innerHeight,
      },
      performances: {
        ...metrics,
      },
      screen: {
        width: screen.availWidth,
        height: screen.availHeight,
        pixel_depth: screen.pixelDepth,
        orientation: {
          angle: screen.orientation.angle,
          type: screen.orientation.type,
        },
      },
    };
  }, [innerWidth, innerHeight, location, metrics]);

  const page_snapshot = React.useMemo(
    () => document.getElementsByTagName("html")[0]?.innerHTML,
    [location]
  );

  const session_data = React.useMemo(() => {
    const hasTrackedInteractions = getLastInteractionEpoch() !== 0;
    return {
      entry_time: new Date(Date.now()).toISOString(),
      entry_epoch: Date.now(),
      last_interaction_time: hasTrackedInteractions
        ? new Date(getLastInteractionEpoch()).toISOString()
        : null,
      last_interaction_epoch: hasTrackedInteractions
        ? getLastInteractionEpoch()
        : null,
      time_before_interact: time_before_interact ?? null,
    };
  }, [interactions, time_before_interact]);

  const interactions_data = interactions?.flatMap((interaction) => {
    let interaction_types: unknown[] = [];
    let interactions_count: Record<string | TTrackedEvent, number> = {
      click: 0,
      dblclick: 0,
      mouseover: 0,
      focusin: 0,
      focusout: 0,
      touchstart: 0,
      touchend: 0,
    };

    interaction.events.forEach((event) => {
      if (!interaction_types.includes(event.type))
        interaction_types.push(event.type);
      else
        TRACKED_EVENTS.forEach((eventType: TTrackedEvent) => {
          if (event.type === eventType) interactions_count[eventType]++;
        });
    });

    return {
      ...interaction,
      frequency: interaction.events.length,
      types: interaction_types,
    };
  });

  return {
    session: {
      ...session_data,
      html_snapshot: page_snapshot,
    },
    interactions: interactions_data,
    system: system_data,
  };
};
