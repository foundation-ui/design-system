import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const SheetMeta: ComponentRegistryMetadata = {
  name: "Sheet",
  description:
    "Side panel overlay with optional backdrop, scroll lock, and keyboard shortcuts.",
  category: "layout",
  variants: [],
  title: "Sheet",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "open",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "side",
      type: '"left" | "right"',
      defaultValue: "right",
    },
    {
      name: "lock",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "overlay",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "closeOnInteract",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "shortcut",
      type: "boolean",
    },
    {
      name: "hotkey",
      type: "string",
    },
    {
      name: "bindkey",
      type: '"ctrlKey" | "metaKey" | "altKey" | "shiftKey"',
      defaultValue: "ctrlKey",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Sheet component provider.",
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
        "Sheet.Trigger is used to triggers the expansion and collapse of the associated Sheet component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
          defaultValue: "ghost",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "small",
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
      ],
    },
  },
  usage: [
    `import { Sheet } from "@usefui/components";

export function SheetComponent() {
    return (
        <Sheet.Root>
            <div className="grid g-medium-10 align-center justify-center w-100 h-100 p-t-large-30 p-x-medium-60">
              <Sheet.Trigger variant="border" sizing="large">
                @usefui
              </Sheet.Trigger>
              <div className="w-100 flex justify-center">
                <small className="opacity-default-10">{"Ctrl + $"}</small>
              </div>
            </div>

            <Sheet sizing="medium" shortcut bindkey="ctrlKey" hotkey="$">
                <div className="flex justify-between">
                <p className="fs-medium-20">@usefui</p>

                <Sheet.Trigger variant="ghost">
                    <Icon>
                    <Icon.Remove />
                    </Icon>
                </Sheet.Trigger>
                </div>

                <Divider className="m-y-medium-60" />

                <p className="fs-medium-10 opacity-default-30">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
                    distinctio nemo delectus in ex. Sed quam labore ut quae dicta aperiam
                    delectus numquam alias reiciendis? Dolore placeat repellendus voluptas
                    et.
                </p>
            </Sheet>
        </Sheet.Root>
    );

}`,
  ],
  anatomy: `import { Sheet } from "@usefui/components";

export function SheetComponent() {
    return (
        <Sheet.Root>
            <Sheet.Trigger>Open</Sheet.Trigger>
            <Sheet>Panel content</Sheet>
        </Sheet.Root>
    );
}`,

  examples: [
    { kind: "note", title: "Sheet.Root > Sheet.Trigger + Sheet panel" },
    { kind: "note", title: "side left or right; sizing small, medium, large" },
    { kind: "note", title: "DefaultOpen and Shortcut stories" },
    { kind: "note", title: "open, lock, overlay, closeOnInteract props" },
  ],
  a11y: {
    role: "dialog on panel",
    keyboardNav: "hotkey + bindkey when shortcut enabled",
    ariaAttributes: [
      "aria-label",
      "aria-labelledby",
      "aria-controls",
      "data-state",
      "data-expanded",
    ],
  },
  relatedComponents: ["Button", "Overlay", "Page"],
  aiHints: {
    useCases: [
      "mobile nav drawer",
      "filters or settings side panel",
      "detail peek without full page navigation",
    ],
    avoid: [
      "primary page content only in sheet",
      "nested sheets without focus plan",
      "long forms without labelled title",
    ],
    composesWith: ["Sheet.Root", "Sheet.Trigger", "Overlay", "Button"],
  },
};
