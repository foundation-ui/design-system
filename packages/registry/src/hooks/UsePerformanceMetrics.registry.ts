import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UsePerformanceMetricsMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "usePerformanceMetrics",
  title: "usePerformanceMetrics",
  description:
    "Collects JS heap usage and first resource network latency from the browser performance APIs.",
  component: "PerformanceMetrics",
  module: "@usefui/hooks",
  code: `import { usePerformanceMetrics } from "@usefui/hooks";

export function HookComponent() {
    const { metrics } = usePerformanceMetrics();

    if (!metrics) return null;

    return (
        <div>
            <div>Memory: {metrics.memory_usage}</div>
            <div>Network latency: {metrics.network_latency}</div>
        </div>
    );
}`,
  arguments: [],
  returns: [
    {
      name: "metrics",
      type: "IPerfomanceMetricsProperties",
    },
  ],
  types: `interface IPerfomanceMetricsProperties {
  memory_usage: string;
  network_latency: string;
}`,
};
