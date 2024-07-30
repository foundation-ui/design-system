import React from "react";

export interface IPerfomanceMetricsProperties {
  memory_usage: string;
  network_latency: string;
}
export const usePerformanceMetrics = (): {
  metrics: IPerfomanceMetricsProperties;
} => {
  const [metrics, setMetrics] = React.useState<{
    memory_usage: string;
    network_latency: string;
  } | null>(null);

  const performance = window.performance;

  React.useEffect(() => {
    // Measure memory usage as MB
    let memoryUsage = "N/A";
    if ((performance as any).memory) {
      const memory = (performance as any).memory;
      memoryUsage = `${(memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)}MB`; // Convert the memory usage from bytes to megabytes
    }

    // Measure network latency
    let networkLatency = "N/A";
    const resourceEntries = performance.getEntriesByType("resource");

    if (resourceEntries.length > 0) {
      const firstResource = resourceEntries[0];
      networkLatency = firstResource
        ? `${firstResource.duration.toFixed(2)}ms`
        : "N/A";
    }

    setMetrics({
      memory_usage: memoryUsage,
      network_latency: networkLatency,
    });
  }, []);

  return {
    metrics,
  };
};
