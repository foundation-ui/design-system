import React from "react";
import { useTimeBeforeInteraction } from "./useTimeBeforeInteraction";
import {
  usePerformanceMetrics,
  IPerformanceMetricsProperties,
} from "./usePerformanceMetrics";
import {
  useComponentsInteractions,
  IEventPayload,
} from "./useComponentsInteractions";

export type TUbaConfig = {
  silent?: boolean;
  flags: string[];
  captureSnapshot?: boolean;
};

type TInteractionsData = {
  origin: string;
  frequency: number;
  types: string[];
  events: IEventPayload[];
  element?: string;
  content?: string;
};

export interface IBehaviorAnalyticsProperties {
  interactions: TInteractionsData[];
  session: {
    html_snapshot: string | null;
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
    performances: IPerformanceMetricsProperties | null;
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
  captureSnapshot,
}: TUbaConfig): IBehaviorAnalyticsProperties => {
  const { metrics } = usePerformanceMetrics();
  const { time_before_interact } = useTimeBeforeInteraction({ silent });
  const { interactions } = useComponentsInteractions(flags, { silent });

  const { innerWidth, innerHeight, screen, location } = window;
  const href = location.href;

  const entry = React.useMemo(
    () => ({
      entry_time: new Date().toISOString(),
      entry_epoch: Date.now(),
    }),
    []
  );

  const lastInteractionEpoch = React.useMemo(() => {
    const epochs = interactions.flatMap((interaction) =>
      interaction.events.map((event) => event.occurred_at_epoch)
    );

    return epochs.length > 0 ? Math.max(...epochs) : null;
  }, [interactions]);

  const system_data = React.useMemo(() => {
    return {
      path: href,
      user_agent: navigator.userAgent,
      device_os: getDeviceOs() ?? "Unknown",
      viewport: {
        width: innerWidth,
        height: innerHeight,
      },
      performances: metrics,
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
  }, [href, innerWidth, innerHeight, metrics, screen]);

  const page_snapshot = React.useMemo(
    () => (captureSnapshot ? document.documentElement.innerHTML : null),
    [captureSnapshot, href]
  );

  if (silent) {
    return {
      session: {
        html_snapshot: null,
        entry_time: "",
        entry_epoch: 0,
        last_interaction_time: null,
        last_interaction_epoch: null,
        time_before_interact: null,
      },
      interactions: [],
      system: {
        path: "",
        user_agent: "",
        device_os: "Unknown",
        performances: null,
        viewport: {
          width: 0,
          height: 0,
        },
        screen: {
          width: 0,
          height: 0,
          pixel_depth: 0,
          orientation: {
            angle: 0,
            type: "",
          },
        },
      },
    };
  }

  const interactions_data: TInteractionsData[] = interactions.map(
    (interaction) => {
      const types: string[] = [];

      interaction.events.forEach((event) => {
        if (!types.includes(event.type)) types.push(event.type);
      });

      return {
        ...interaction,
        frequency: interaction.events.length,
        types,
      };
    }
  );

  return {
    session: {
      ...entry,
      html_snapshot: page_snapshot,
      last_interaction_time:
        lastInteractionEpoch !== null
          ? new Date(lastInteractionEpoch).toISOString()
          : null,
      last_interaction_epoch: lastInteractionEpoch,
      time_before_interact: time_before_interact ?? null,
    },
    interactions: interactions_data,
    system: system_data,
  };
};
