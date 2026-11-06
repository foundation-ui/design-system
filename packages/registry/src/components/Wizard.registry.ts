import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const WizardMeta: ComponentRegistryMetadata = {
  name: "Wizard",
  title: "Wizard",
  description:
    "Ordered sequence of views shown one at a time. Wizard.Root provides the state, Trigger selects a view, View renders the active panel, and Next/Previous step through the declared `views` order.",
  category: "navigation",
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
  props: [
    {
      name: "views",
      type: "string[]",
      required: true,
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Root: {
      description:
        "Contains the Wizard component provider. It renders no DOM element and only accepts children.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Trigger: {
      description:
        "Wizard.Trigger is a Button that selects the associated Wizard.View. Extends Button props and defaults to the ghost variant.",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: "primary | secondary | tertiary | mono | border | hint | meta | success | danger | warning | ghost | link | accent",
          defaultValue: "ghost",
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
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    View: {
      description:
        "Wizard.View renders the panel associated with a Trigger value. Inactive views return nothing and unmount their content.",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "className",
          type: "string",
        },
      ],
    },
    Next: {
      description:
        "Wizard.Next advances to the next value in `views`. Extends Button props, defaults to ghost, and is disabled on the last view.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: "primary | secondary | tertiary | mono | border | hint | meta | success | danger | warning | ghost | link | accent",
          defaultValue: "ghost",
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
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    Previous: {
      description:
        "Wizard.Previous returns to the previous value in `views`. Extends Button props, defaults to ghost, and is disabled on the first view.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: "primary | secondary | tertiary | mono | border | hint | meta | success | danger | warning | ghost | link | accent",
          defaultValue: "ghost",
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
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Three-step wizard with navigation",
      code: `import { Wizard } from "@usefui/components";

const VIEWS = ["account", "profile", "confirm"];

export function Component() {
  return (
    <Wizard.Root>
      <Wizard views={VIEWS}>
        <Wizard.Trigger value="account" variant="secondary" sizing="small">
          Account
        </Wizard.Trigger>
        <Wizard.Trigger value="profile" variant="secondary" sizing="small">
          Profile
        </Wizard.Trigger>
        <Wizard.Trigger value="confirm" variant="secondary" sizing="small">
          Confirm
        </Wizard.Trigger>

        {VIEWS.map((view) => (
          <Wizard.View key={view} value={view}>
            <p>{view}</p>
          </Wizard.View>
        ))}

        <Wizard.Previous variant="secondary" sizing="small">
          Back
        </Wizard.Previous>
        <Wizard.Next variant="primary" sizing="small">
          Continue
        </Wizard.Next>
      </Wizard>
    </Wizard.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Triggers act as a step indicator",
      code: `import { Wizard } from "@usefui/components";

const STEPS = ["details", "shipping", "payment"];

export function Component() {
  return (
    <Wizard.Root>
      <Wizard views={STEPS} role="group" aria-label="Checkout steps">
        <div className="flex align-center g-medium-30">
          {STEPS.map((step) => (
            <Wizard.Trigger key={step} value={step} variant="ghost" sizing="small">
              {step}
            </Wizard.Trigger>
          ))}
        </div>
        <Wizard.View value="details">Details</Wizard.View>
        <Wizard.View value="shipping">Shipping</Wizard.View>
        <Wizard.View value="payment">Payment</Wizard.View>
      </Wizard>
    </Wizard.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "`views` order drives Next and Previous",
      description:
        "The first value becomes the initial view. Next and Previous look up the current value in `views` and move one position, disabling themselves at the boundaries.",
    },
    {
      kind: "note",
      title: "Every Trigger needs a matching View",
      description:
        "Trigger and View bind by `value`. A Trigger without a View selects an empty step; a View without a Trigger is unreachable except through Next/Previous.",
    },
    {
      kind: "note",
      title: "Trigger, Next, and Previous extend Button",
      description:
        "All three forward the full Button prop set (variant, sizing, shape, sound, animation, and native button attributes) and default to the ghost variant.",
    },
    {
      kind: "note",
      title: "Only the active View is mounted",
      description:
        "Inactive views return `null`, so their content unmounts. Keep expensive state in a parent if it must survive navigation.",
    },
  ],
  a11y: {
    role: "group (Wizard), tab (Trigger), tabpanel (View)",
    keyboardNav:
      "Tab reaches each Trigger and navigation control; Enter or Space activates it. Arrow-key navigation between tabs is not implemented.",
    ariaAttributes: [
      "aria-selected",
      "aria-labelledby",
      "data-controls",
      "data-state",
      "role=group on the Wizard container",
    ],
  },
  relatedComponents: ["Tabs", "Button", "Page", "Accordion"],
  aiHints: {
    useCases: [
      "multi-step onboarding and setup flows",
      "guided forms split into ordered views",
      "step-by-step product tours",
    ],
    avoid: [
      "primary app navigation — use a router",
      "expecting arrow-key navigation between steps",
      "duplicating Trigger values, which break value binding",
      "state inside a View that must survive step changes",
    ],
    composesWith: [
      "Wizard.Root",
      "Wizard.Trigger",
      "Wizard.View",
      "Wizard.Next",
      "Wizard.Previous",
      "Button",
      "Page",
    ],
  },
};
