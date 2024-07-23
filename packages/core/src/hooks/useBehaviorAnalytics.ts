import React from "react";
import { useTimeBeforeInteraction } from "./useTimeBeforeInteraction";
import { useA11YTracking, IA11YProperties } from "./useA11YTracking";
import {
  useComponentsInteractions,
  IComponentUsage,
} from "./useComponentsInteractions";

interface IBehaviorAnalyticsProperties {
  env: {
    path: string;
    user_agent: string;
    device_os: string;
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
  a11y: IA11YProperties;
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

export const useBehaviorAnalytics = (
  references: string[]
): IBehaviorAnalyticsProperties => {
  const { time_before_interact } = useTimeBeforeInteraction();
  const { interactions } = useComponentsInteractions(references);
  const { a11y } = useA11YTracking(references);

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
  }, [innerWidth, innerHeight, location]);

  return {
    time_before_interact: time_before_interact
      ? `${time_before_interact}s`
      : null,
    interactions,
    a11y,
    ...sessionData,
  };
};
