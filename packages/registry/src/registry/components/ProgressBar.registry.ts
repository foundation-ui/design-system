import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ProgressBarMeta: ComponentRegistryMetadata = {
  name: "ProgressBar",
  description:
    "Determinate progress bar with warning threshold and empty states, exposed as an accessible progressbar.",
  category: "feedback",
  variants: [],
  title: "Progress Bar",
  props: [
    {
      name: "consumption",
      type: "number",
      required: true,
    },
    {
      name: "remaining",
      type: "number",
      required: true,
    },
    {
      name: "percentage",
      type: "number",
      required: true,
    },
    {
      name: "threshold",
      type: "number",
      defaultValue: "0.3",
    },
  ],
  usage: [
    `import { ProgressBar } from "@usefui/components";

export function ProgressBarComponent() {
    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
            <ProgressBar consumption={4} remaining={6} percentage={0.4} />
            <ProgressBar
                consumption={9}
                remaining={1}
                percentage={0.9}
                threshold={0.7}
            />
        </div>
    );
}`,
  ],
  anatomy: `import { ProgressBar } from "@usefui/components";

export function ProgressBarComponent() {
    return <ProgressBar consumption={4} remaining={6} percentage={0.4} />;
}`,
  examples: [
    { kind: "note", title: "quota or budget consumption meters" },
    {
      kind: "note",
      title: "green below threshold, orange above, red when empty",
    },
    {
      kind: "note",
      title: "Empty, BelowThreshold, AboveThreshold, Full stories",
    },
  ],
  a11y: {
    role: "progressbar",
    keyboardNav: "Not interactive",
    ariaAttributes: [
      "aria-valuemin",
      "aria-valuemax",
      "aria-valuenow",
      "aria-valuetext",
    ],
  },
  relatedComponents: ["Field", "Skeleton", "Shimmer", "Loader"],
  aiHints: {
    useCases: [
      "usage quotas and budgets",
      "task or upload progress",
      "capacity meters with warning states",
    ],
    avoid: [
      "indeterminate loading — use Loader or Shimmer",
      "interactive sliders — use Field.Range",
      "values outside the 0..1 percentage range",
    ],
    composesWith: ["Field.Wrapper", "Badge", "Skeleton"],
  },
};
