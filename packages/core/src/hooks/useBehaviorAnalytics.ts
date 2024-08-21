import React from "react";
import { useTimeBeforeInteraction } from "./useTimeBeforeInteraction";
import {
  usePerformanceMetrics,
  IPerfomanceMetricsProperties,
} from "./usePerformanceMetrics";
import {
  useComponentsInteractions,
  IComponentUsage,
} from "./useComponentsInteractions";

export type TUbaConfig = {
  silent?: boolean;
  flags: string[];
};
type TUsageData = {
  origin: string;
  description: string;
  frequency: string;
  types: unknown[];
  most_frequent_interaction: string;
  last_interaction_time: string;
};
interface IBehaviorAnalyticsProperties {
  silent?: boolean;
  env: {
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
  time_before_interact: string | null;
  interactions: IComponentUsage[] | [];
  usage: TUsageData[] | [];
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

  const sessionData = React.useMemo(() => {
    return {
      env: {
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
      },
    };
  }, [innerWidth, innerHeight, location, metrics]);

  const usage = interactions?.flatMap((interaction) => {
    let interaction_types: unknown[] = [];
    let interactions_count: Record<
      string | "click" | "dblclick" | "mouseover",
      number
    > = {
      click: 0,
      dblclick: 0,
      mouseover: 0,
    };

    interaction.events.forEach((event) => {
      if (!interaction_types.includes(event.type))
        interaction_types.push(event.type);
      else {
        if (event.type === "click") interactions_count.click!++;
        if (event.type === "dblclick") interactions_count.dblclick!++;
        if (event.type === "mouseover") interactions_count.mouseover!++;
      }
    });

    const most_frequent = Object.keys(interactions_count).reduce((a, b) =>
      interactions_count[a]! > interactions_count[b]! ? a : b
    );
    const description = `\n
      ${interactions_count[most_frequent]}\n
      out of ${interaction.events.length}\n
      interactions on ${interaction.origin}\n
      ${
        Number(interactions_count[most_frequent]) > 1
          ? `are ${most_frequent}s`
          : `is a ${most_frequent}`
      }`;

    return {
      origin: interaction.origin,
      description: description,
      frequency: `${interaction.events.length}`,
      types: interaction_types,
      most_frequent_interaction: most_frequent,
      last_interaction_time: interaction.events.at(0)?.occured_at,
    };
  });

  return {
    time_before_interact: time_before_interact
      ? `${time_before_interact}s`
      : null,
    interactions,
    usage,
    ...sessionData,
  };
};
