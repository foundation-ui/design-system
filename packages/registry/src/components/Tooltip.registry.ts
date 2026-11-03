import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const TooltipMeta: ComponentRegistryMetadata = {
  name: "Tooltip",
  title: "Tooltip",
  description:
    "Short supplementary label shown after a hover delay, with an optional keyboard shortcut hint. The popup is fixed-position and placed by useFloatingPlacement: centered over the trigger when it fits, otherwise left- or right-aligned, and flipped above the trigger when there is not enough room below. It stays hidden until measured and unmounts on leave.",
  category: "feedback",
  variants: ["primary", "secondary"],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "content",
      type: "string",
      required: true,
    },
    {
      name: "hint",
      type: "string",
    },
    {
      name: "delay",
      type: "number",
      defaultValue: "200",
    },
    {
      name: "gap",
      type: "number",
      defaultValue: "4",
    },
    {
      name: "margin",
      type: "number",
      defaultValue: "4",
    },
    {
      name: "variant",
      type: '"primary" | "secondary"',
      defaultValue: "primary",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Tooltip with a shortcut hint",
      code: `import { Tooltip } from "@usefui/components";

export function Component() {
  return (
    <Tooltip content="Copy to clipboard" hint="Ctrl+C" sizing="small">
      <span>Copy</span>
    </Tooltip>
  );
}`,
    },
    {
      kind: "executable",
      title: "Placement distance and viewport inset",
      code: `import { Button, Tooltip } from "@usefui/components";

export function Component() {
  return (
    <Tooltip
      content="Opens near the edge without overflowing"
      variant="secondary"
      gap={12}
      margin={24}
      delay={100}
    >
      <Button variant="ghost">Hover me</Button>
    </Tooltip>
  );
}`,
    },
    {
      kind: "note",
      title: "Placement adapts to the viewport",
      description:
        "The popup is measured with useFloatingPlacement. It centers on the trigger when it fits, otherwise aligns left, otherwise right, and opens above the trigger when there is not enough room below. `data-side` and `data-align` receive the chosen alignment (`center`, `left`, or `right`).",
    },
    {
      kind: "note",
      title: "`gap` and `margin` are pixel values",
      description:
        "`gap` is the distance between the trigger and the popup (default 4). `margin` is the minimum distance kept from the viewport edges (default 4).",
    },
    {
      kind: "note",
      title: "Placement is not re-measured on resize",
      description:
        "The hook recomputes when the popup becomes visible or when `content`, `hint`, `sizing`, `gap`, or `margin` change. There is no window resize or scroll listener, so resizing the viewport while the popup is shown keeps the previous placement until it is hidden and shown again.",
    },
    {
      kind: "note",
      title: "`delay` restarts on re-entry",
      description:
        "Entering the trigger starts a timer that shows the popup after `delay` milliseconds. Leaving clears the timer, and re-entering before it fires restarts the countdown instead of stacking timeouts.",
    },
    {
      kind: "note",
      title: "Hover only",
      description:
        "Visibility is driven by mouse enter and mouse leave. Focus and blur do not show or hide the tooltip, and Escape does not dismiss it, so keyboard users do not get the same help text unless you render it another way.",
    },
    {
      kind: "note",
      title: "Hidden until measured",
      description:
        "The popup mounts immediately on show but uses `visibility: hidden` until a placement is computed. This prevents a one-frame flash at the top-left corner of the viewport.",
    },
  ],
  a11y: {
    role: 'tooltip on the popup (role="tooltip")',
    keyboardNav:
      "Hover only — no focus or blur handlers, and no Escape handler. Keyboard users will not see the tooltip unless the trigger itself has an accessible name.",
    ariaAttributes: [
      'role="tooltip" on the popup',
      "data-state reflecting visibility",
      "No aria-describedby link between the trigger and the popup — add one when the tooltip carries information",
    ],
  },
  relatedComponents: ["Button", "Badge", "CopyButton", "DropdownMenu"],
  aiHints: {
    useCases: [
      "icon-only control supplementary labels",
      "truncated text expansion on hover",
      "shortcut hints via the hint prop",
      "popups near viewport edges that must stay visible",
    ],
    avoid: [
      "essential information available only on hover",
      "long or interactive tooltip content",
      "replacing aria-label on icon buttons",
      "keyboard-critical help that relies on this hover-only popup",
    ],
    composesWith: ["Button", "Badge", "CopyButton", "Icon"],
  },
};
