import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const ButtonMeta: ComponentRegistryMetadata = {
  name: "Button",
  description:
    "Initializes an action. Use variants and sizing to express hierarchy; pair with icons, loading states, or reflective animation for emphasis.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Hint,
    ComponentVariantEnum.Meta,
    ComponentVariantEnum.Success,
    ComponentVariantEnum.Danger,
    ComponentVariantEnum.Warning,
    ComponentVariantEnum.Ghost,
    "link",
    "accent",
  ],
  title: "Button",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
      defaultValue: "primary",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "shape",
      type: '"round" | "smooth" | "square"',
      defaultValue: "smooth",
    },
    {
      name: "animation",
      type: '"reflective" | "float" | "scale" | "bounce" | "shake" | "wiggle" | "lift"',
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent<HTMLButtonElement>) => void",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "rawicon",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "sound",
      type: "SoundName",
    },
  ],
  usage: [
    `import React from "react";
import { Button } from "@usefui/components";

function ButtonTemplate() {

    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <div className="flex flex-wrap align-center g-medium-10 justify-center">
          {([
            "primary",
            "danger",
            "warning",
            "secondary",
            "tertiary",
            "mono",
            "border",
            "ghost",
          ] as const).map((variant, key) => (
            <Button key={key} variant={variant}>
              @usefui
            </Button>
          ))}
        </div>
        <div className="flex align-center g-medium-10 justify-center">
          {(["round", "smooth", "square"] as const).map((shape, key) => (
            <Button key={key} sizing="medium" shape={shape}>
              @usefui
            </Button>
          ))}
        </div>
        <div className="flex align-center g-medium-10 justify-center">
          {(["small", "medium", "large"] as const).map((size, key) => (
            <Button key={key} sizing={size}>
              @usefui
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap align-center g-medium-10 justify-center">
          {(["primary", "secondary", "tertiary", "mono", "border"] as const).map(
            (variant, key) => (
              <Button
                key={key}
                animation="reflective"
                variant={variant}
              >
                @usefui
              </Button>
            ),
          )}
        </div>
      </div>
    );

}

export default ButtonTemplate;`,
  ],
  anatomy: `import { Button } from "@usefui/components";

export function ButtonComponent() {
    return (
      <Button>Click me</Button>
    );
}`,

  examples: [
    {
      kind: "note",
      title:
        "default primary action (variant primary, sizing medium, shape smooth)",
    },
    { kind: "note", title: "size scale: large, medium, small" },
    { kind: "note", title: "shapes: square, smooth, round" },
    {
      kind: "note",
      title: "semantic feedback: success, danger, warning, hint, meta",
    },
    { kind: "note", title: "low-emphasis actions: ghost, link, tertiary" },
    {
      kind: "note",
      title: "accent or border for highlighted or outlined CTAs",
    },
    {
      kind: "note",
      title: "label with inline SVG icon (VariantsWithIcon story)",
    },
    {
      kind: "note",
      title: "reflective hover animation (animation reflective; not on ghost)",
    },
    {
      kind: "note",
      title: "form submit or reset (type submit | reset | button)",
    },
    { kind: "note", title: "dialog, sheet, or overlay open trigger" },
    { kind: "note", title: "dropdown or menu trigger (often ghost)" },
    {
      kind: "note",
      title: "tabs, accordion, or collapsible section trigger (often ghost)",
    },
    {
      kind: "note",
      title:
        "card footer secondary action (border, small) and primary CTA (large)",
    },
    {
      kind: "note",
      title: "tag remove control inside Field (ghost, small, aria-label)",
    },
    {
      kind: "note",
      title: "breadcrumb segment (ghost, small via Breadcrumb.Item)",
    },
    {
      kind: "note",
      title: "clipboard copy affordance (prefer ActionSwap.Copy)",
    },
  ],
  a11y: {
    role: "button",
    keyboardNav: "Enter and Space activate; Tab moves focus",
    ariaAttributes: [
      "aria-label",
      "aria-description",
      "aria-disabled",
      "aria-expanded",
      "aria-controls",
      "aria-haspopup",
      "aria-selected",
      "aria-checked",
    ],
  },
  relatedComponents: [
    "ActionSwap",
    "Toggle",
    "DropdownMenu",
    "Tabs",
    "Accordion",
    "Collapsible",
    "Dialog",
    "Sheet",
    "Toolbar",
    "Select",
    "Breadcrumb",
    "Field",
    "Tooltip",
    "Loader",
  ],
  aiHints: {
    useCases: [
      "single-step actions: save, cancel, confirm, delete",
      "establish visual hierarchy with primary + secondary + ghost on the same surface",
      "destructive flows with variant danger",
      "status or contextual actions with success, warning, hint, or meta",
      "icon-leading or icon-only labels using SVG children",
      "marketing or hero CTAs with animation reflective (non-ghost variants)",
      "compound *.Trigger APIs that extend Button props (Dialog, Sheet, DropdownMenu, Tabs, Accordion, Collapsible, Toolbar)",
      "inline compact controls with sizing small and variant ghost or border",
    ],
    avoid: [
      "route navigation — use a link component or Breadcrumb with href semantics",
      "persistent on/off state — use Toggle or Switch instead of a plain Button",
      "list or combobox selection UI — use Select and its trigger, not a raw Button",
      "reflective animation on ghost (ignored by implementation)",
      "multiple primary buttons in one group without clear hierarchy",
      "long or paragraph-length labels — keep copy short",
    ],
    composesWith: [
      "Icon",
      "Loader",
      "Tooltip",
      "ActionSwap",
      "Toggle",
      "DropdownMenu.Trigger",
      "Tabs.Trigger",
      "Accordion.Trigger",
      "Collapsible.Trigger",
      "Dialog.Trigger",
      "Dialog.Control",
      "Sheet.Trigger",
      "Toolbar.Trigger",
    ],
  },
};
