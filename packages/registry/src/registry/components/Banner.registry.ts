import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const BannerMeta: ComponentRegistryMetadata = {
  name: "Banner",
  description:
    "Presentational banner surface for status or notification content with variants and an emphasis flag.",
  category: "feedback",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Danger,
    ComponentVariantEnum.Warning,
    ComponentVariantEnum.Success,
    ComponentVariantEnum.Meta,
    ComponentVariantEnum.Hint,
  ],
  title: "Banner",
  props: [
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint"',
      defaultValue: "primary",
    },
    {
      name: "emphasis",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "shape",
      type: '"square" | "smooth" | "round"',
      defaultValue: "smooth",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import { Banner } from "@usefui/components";

export function BannerComponent() {
    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
            <Banner variant="success">
                Deployment completed successfully.
            </Banner>
            <Banner variant="danger" emphasis>
                Your session is about to expire.
            </Banner>
        </div>
    );
}`,
  ],
  anatomy: `import { Banner } from "@usefui/components";

export function BannerComponent() {
    return <Banner>Message</Banner>;
}`,
  examples: [
    { kind: "note", title: "status or notification surfaces" },
    { kind: "note", title: "semantic variants: success, warning, danger" },
    { kind: "note", title: "emphasis flag for solid callouts" },
    { kind: "note", title: "Emphasis story with all styled variants" },
  ],
  a11y: {
    role: "div (presentational)",
    keyboardNav: "Not interactive",
    ariaAttributes: [],
  },
  relatedComponents: ["Badge", "Card", "MessageBubble", "Overlay"],
  aiHints: {
    useCases: [
      "inline status messages above content",
      "warning or danger callouts",
      "system notification surfaces",
    ],
    avoid: [
      "interactive affordances — use Button",
      "transient toasts — use MessageBubble or Overlay",
      "color-only status without text",
    ],
    composesWith: ["Badge", "Card", "Icon", "Button"],
  },
};
