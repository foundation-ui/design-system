import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ResponseStreamMeta: ComponentRegistryMetadata = {
  name: "ResponseStream",
  title: "ResponseStream",
  description:
    "Progressively reveals a string of text at a fixed characters-per-second rate, with pending, streaming, and completed states. It can keep the nearest scrollable ancestor pinned to the bottom and reports its own height so a parent can adapt layout while the text grows.",
  category: "feedback",
  variants: [],
  props: [
    {
      name: "content",
      type: "string",
      required: true,
    },
    {
      name: "status",
      type: '"streaming" | "completed" | "pending"',
      defaultValue: "streaming",
    },
    {
      name: "charactersPerSecond",
      type: "number",
      defaultValue: "248",
    },
    {
      name: "autoScroll",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "offset",
      type: "number",
      defaultValue: "0",
    },
    {
      name: "onHeightChange",
      type: "(height: number) => void",
    },
    {
      name: "onComplete",
      type: "() => void",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Stream a response",
      code: `import { ResponseStream } from "@usefui/components";

export function Component() {
  return (
    <ResponseStream
      content="Here is a streamed answer that arrives one character at a time."
      status="streaming"
      charactersPerSecond={248}
      autoScroll
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Pending, completed, and measured",
      code: `import { useState } from "react";
import { ResponseStream } from "@usefui/components";

export function Component() {
  const [height, setHeight] = useState(0);
  const [done, setDone] = useState(false);

  return (
    <>
      <ResponseStream
        content="Completed responses are rendered in full with no animation."
        status={done ? "completed" : "streaming"}
        offset={12}
        onHeightChange={setHeight}
        onComplete={() => setDone(true)}
      />
      <small>Height: {height}px</small>
    </>
  );
}`,
    },
    {
      kind: "note",
      title: "Changing content restarts the reveal",
      description:
        "The animation effect depends on `content`, `charactersPerSecond`, and `status`. A new content string resets the cursor to 0 and starts over.",
    },
    {
      kind: "note",
      title: "Status overrides the cursor",
      description:
        "`completed` renders the full content immediately and `pending` renders nothing. Only `streaming` advances the cursor. `onComplete` fires when the last character is revealed.",
    },
    {
      kind: "note",
      title: "Reduced motion reveals immediately",
      description:
        "When `prefers-reduced-motion: reduce` matches, the component sets the cursor to the full length and calls `onComplete` on the next effect run instead of animating.",
    },
    {
      kind: "note",
      title: "Auto-scroll respects manual scrolling",
      description:
        "Auto-scroll only follows the nearest scrollable ancestor while the user is pinned within 8px of the bottom. Scrolling up releases the pin until the user returns to the bottom.",
    },
  ],
  a11y: {
    role: "text region (no explicit role)",
    keyboardNav: "Not interactive.",
    ariaAttributes: [
      "aria-busy during streaming",
      "aria-hidden while pending",
      'aria-live="polite" on the text span while streaming',
    ],
  },
  relatedComponents: ["MessageBubble", "Shimmer", "Loader", "ScrollArea"],
  aiHints: {
    useCases: [
      "streaming assistant or completion text",
      "typewriter-style status messages",
      "responses that should keep a chat scroller pinned to the bottom",
    ],
    avoid: [
      "long documents — per-frame slicing becomes expensive",
      "multiple live regions announcing the same stream",
      "determinate progress indicators",
      "replacing real token streaming when exact timing matters",
    ],
    composesWith: ["MessageBubble", "ScrollArea", "Loader", "Shimmer"],
  },
};
