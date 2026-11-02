import type { DocsGuideRegistryMetadata } from "@chambellan/contracts";

export const AnalyticsUsageMeta: DocsGuideRegistryMetadata = {
  kind: "guide",
  name: "analytics-usage",
  title: "Analytics",
  description:
    "Programmatically track user behavior with analytics hooks: timers, interaction tracking, A/B testing, performance metrics, and IndexedDB-backed app properties.",
  module: "@usefui/analytics",
  code: `import {
  useComponentsInteractions,
  useTimeBeforeInteraction,
  useBehaviorAnalytics,
} from "@usefui/analytics";

function App() {
    const { time_before_interact } = useTimeBeforeInteraction();
    const { interactions } = useComponentsInteractions(["cta-primary"]);
    const snapshot = useBehaviorAnalytics({
        silent: false,
        flags: ["cta-primary"],
    });

    return ( {/** Your code here **/} );
}`,
};
