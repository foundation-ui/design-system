import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const AvatarMeta: ComponentRegistryMetadata = {
  name: "Avatar",
  description:
    "Represents a user or entity. Supports image or initials fallback, presence status, and badge overlay.",
  category: "data",
  variants: [],
  title: "Avatar",
  props: [
    {
      name: "src",
      type: "string",
    },
    {
      name: "alt",
      type: "string",
    },
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "sizing",
      type: "small | medium | large",
      defaultValue: "medium",
    },
    {
      name: "shape",
      type: "square | smooth | round",
      defaultValue: "round",
    },
    {
      name: "status",
      type: '"online" | "away" | "busy" | "offline"',
    },
    {
      name: "raw",
      type: "boolean",
    },
  ],
  parts: {
    Status: {
      description: "Avatar.Status renders a presence indicator for the avatar.",
      props: [
        {
          name: "status",
          type: '"online" | "away" | "busy" | "offline"',
        },
      ],
    },
    Badge: {
      description:
        "Avatar.Badge renders an overlay badge (logo or notification) on the avatar.",
      props: [
        {
          name: "src",
          type: "string",
        },
        {
          name: "alt",
          type: "string",
        },
      ],
    },
  },
  usage: [
    `import React from "react";
import { Avatar } from "@usefui/components";

function AvatarTemplate() {

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
            <div className="flex align-center g-medium-10 justify-center">
                {(["small", "medium", "large"] as const).map((size, key) => (
                    <Avatar
                        key={key}
                        sizing={size}
                        src="https://avatars.githubusercontent.com/u/59123840?s=96&v=4"
                    />
                ))}
            </div>
            <div className="flex align-center g-medium-10 justify-center">
                {(["online", "away", "busy", "offline"] as const).map((status, key) => (
                    <Avatar
                        key={key}
                        status={status}
                        style={{ background: "var(--font-color-alpha-10)" }}
                    >
                        <small>UI</small>
                    </Avatar>
                ))}
            </div>
        </div>
    );

}

export default AvatarTemplate;`,
  ],
  anatomy: `import { Avatar } from "@usefui/components";

export function AvatarComponent() {
    return <Avatar />;
}`,

  examples: [
    { kind: "note", title: "profile photo with src and alt" },
    { kind: "note", title: "initials fallback when no image" },
    { kind: "note", title: "Avatar.Status for online, away, busy, offline" },
    {
      kind: "note",
      title: "Avatar.Badge for org logo or notification overlay",
    },
    { kind: "note", title: "Sizes and Shapes stories: square, smooth, round" },
  ],
  a11y: {
    role: "div with aria-label; Status/Badge use role img",
    keyboardNav: "Not focusable by default",
    ariaAttributes: ["aria-label", "alt on image"],
  },
  relatedComponents: ["Badge", "Page", "MessageBubble"],
  aiHints: {
    useCases: [
      "user profile in nav, comments, or chat headers",
      "presence indicators in messaging",
      "logo or rank badge via Avatar.Badge",
    ],
    avoid: [
      "long text inside avatar — use initials sparingly",
      "status dot as sole indicator of critical state",
      "missing alt on meaningful images",
    ],
    composesWith: ["Avatar.Status", "Avatar.Badge", "MessageBubble", "Page"],
  },
};
