import React from "react";

export interface IPerformanceMetricsProperties {
  memory_usage: string;
  network_latency: string;
}

const getMemoryUsage = (): string => {
  const memory = (
    performance as Performance & { memory?: { usedJSHeapSize: number } }
  ).memory;

  if (!memory) return "N/A";

  return `${(memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)}MB`;
};

const getNetworkLatency = (): string => {
  const [navigation] = performance.getEntriesByType("navigation");

  if (navigation instanceof PerformanceNavigationTiming) {
    if (navigation.responseStart > 0) {
      return `${(navigation.responseStart - navigation.requestStart).toFixed(
        2
      )}ms`;
    }
    return `${navigation.duration.toFixed(2)}ms`;
  }

  return "N/A";
};

export const usePerformanceMetrics = (): {
  metrics: IPerformanceMetricsProperties;
} => {
  const [metrics, setMetrics] = React.useState<IPerformanceMetricsProperties>(
    () => ({
      memory_usage: getMemoryUsage(),
      network_latency: getNetworkLatency(),
    })
  );

  React.useEffect(() => {
    setMetrics({
      memory_usage: getMemoryUsage(),
      network_latency: getNetworkLatency(),
    });
  }, []);

  return {
    metrics,
  };
};
