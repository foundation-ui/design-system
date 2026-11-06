import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const MessageBubbleMeta: ComponentRegistryMetadata = {
  name: "MessageBubble",
  description:
    "Chat message layout with side alignment, styled content, and optional timestamp meta.",
  category: "feedback",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
    ComponentVariantEnum.Meta,
    ComponentVariantEnum.Hint,
    ComponentVariantEnum.Success,
    ComponentVariantEnum.Warning,
    ComponentVariantEnum.Danger,
  ],
  title: "MessageBubble",
  props: [
    {
      name: "side",
      type: '"left" | "right"',
      required: true,
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  parts: {
    Root: {
      description:
        "MessageBubble.Root provides the side context for all child compounds.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Content: {
      description: "MessageBubble.Content renders the message text.",
      props: [
        {
          name: "children",
          type: "string",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint"',
          defaultValue: "border",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "round",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "emphasis",
          type: "boolean",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Meta: {
      description: "MessageBubble.Meta displays a timestamp for the message.",
      props: [
        {
          name: "createdAt",
          type: "Date",
          required: true,
        },
      ],
    },
  },

  examples: [
    {
      kind: "note",
      title: "MessageBubble.Root > MessageBubble side left or right",
    },
    { kind: "note", title: "MessageBubble.Content for message text" },
    { kind: "note", title: "MessageBubble.Meta with createdAt Date" },
    { kind: "note", title: "Left, Right, and Conversation stories" },
  ],
  a11y: {
    role: "labeled regions via aria-label",
    keyboardNav: "Not interactive on bubble itself",
    ariaAttributes: ["aria-label on bubble, content, and meta"],
  },
  relatedComponents: ["Badge", "Avatar", "Field", "ScrollArea", "Page"],
  aiHints: {
    useCases: [
      "chat threads with sent right vs received left",
      "status styling on messages in Conversation",
      "timestamps via MessageBubble.Meta",
    ],
    avoid: [
      "interactive message bodies without extra a11y",
      "use without MessageBubble.Root",
      "non-string children on Content",
    ],
    composesWith: [
      "MessageBubble.Root",
      "MessageBubble.Content",
      "MessageBubble.Meta",
      "Avatar",
      "ScrollArea",
    ],
  },
};
