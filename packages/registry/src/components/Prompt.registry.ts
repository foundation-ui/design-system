import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const PromptMeta: ComponentRegistryMetadata = {
  name: "Prompt",
  title: "Prompt",
  description:
    "Composer input for chat-style prompts, built on Textarea with a fixed large secondary style and no resize handle. It submits through a global keyboard shortcut, can clear itself on submit, and ships with layout parts for a header, tool row, and horizontally scrolling auxiliary attachments.",
  category: "input",
  variants: [],
  props: [
    {
      name: "cleanup",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "onCleanup",
      type: "() => void",
    },
    {
      name: "onSubmit",
      type: "() => void",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
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
      name: "placeholder",
      type: "string",
    },
    {
      name: "value",
      type: "string",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLTextAreaElement>) => void",
    },
    {
      name: "readOnly",
      type: "boolean",
    },
  ],
  parts: {
    Root: {
      description:
        "Layout wrapper for the textarea and its Tools and Auxiliary siblings. Renders a div and forwards div props.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "className",
          type: "string",
        },
      ],
    },
    Tools: {
      description:
        "Row wrapper for submit buttons, counters, and other composer controls. Renders a div and forwards div props.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "className",
          type: "string",
        },
      ],
    },
    Auxiliary: {
      description:
        "Wraps a horizontal Viewport for attachment chips or previews. Height defaults to 0 so the row stays collapsed until content requires space.",
      props: [
        {
          name: "height",
          type: "number",
          defaultValue: "0",
        },
        {
          name: "direction",
          type: '"x" | "y" | "both"',
          defaultValue: "x",
        },
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "className",
          type: "string",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Prompt with tool row and shortcut submit",
      code: `import { Prompt } from "@usefui/components";

export function Component() {
  return (
    <Prompt.Root className="flex flex-column g-medium-30">
      <Prompt
        placeholder="Ask anything…"
        shortcut
        hotkey="Enter"
        bindkey="metaKey"
        onSubmit={() => console.log("submit")}
      />

      <Prompt.Tools className="flex justify-between align-center">
        <span>Model</span>
        <button type="button">Send</button>
      </Prompt.Tools>
    </Prompt.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Clear the prompt after submit",
      code: `import { Prompt } from "@usefui/components";

export function Component() {
  return (
    <Prompt
      placeholder="Type and press Ctrl+Enter"
      shortcut
      hotkey="Enter"
      bindkey="ctrlKey"
      cleanup
      onSubmit={() => console.log("submitted")}
      onCleanup={() => console.log("cleared")}
    />
  );
}`,
    },
    {
      kind: "note",
      title: "onSubmit fires only through the shortcut",
      description:
        "Prompt has no submit button of its own and does not listen for a plain Enter key. `onSubmit` runs when `shortcut` is enabled and the configured hotkey combination is pressed; wire any visible send button to your own handler.",
    },
    {
      kind: "note",
      title: "Styling is fixed",
      description:
        'Prompt renders its Textarea with `sizing="large"`, `variant="secondary"`, and `resizable={false}`. Passing those props does not change the result because the component\'s values are applied after the spread.',
    },
    {
      kind: "note",
      title: "Disabled blocks all interactions",
      description:
        "When `disabled` is true the textarea is also read-only, every forwarded input handler is guarded with preventDefault, and the shortcut does nothing.",
    },
    {
      kind: "note",
      title: "cleanup clears through the native setter",
      description:
        "After a shortcut submit with `cleanup`, the component sets the textarea value through the native value setter and dispatches an input event so controlled and uncontrolled consumers both observe the reset.",
    },
  ],
  a11y: {
    role: "textbox (native textarea)",
    keyboardNav:
      "Standard textarea editing keys. Submission depends on the configured modifier shortcut and has no visible button attached automatically.",
    ariaAttributes: [
      "aria-disabled when disabled",
      "aria-label or an associated label is required — Prompt does not render one",
    ],
  },
  relatedComponents: [
    "Textarea",
    "Field",
    "Button",
    "Viewport",
    "MessageBubble",
  ],
  aiHints: {
    useCases: [
      "chat composers with attachments and send tools",
      "command palettes that submit on a modifier shortcut",
      "prompt boxes that reset after each submission",
    ],
    avoid: [
      "expecting Enter alone to submit",
      "relying on `variant` or `sizing` to restyle the textarea",
      "forms that need a visible submit button without wiring one yourself",
      "using Prompt without a label or placeholder that names the field",
    ],
    composesWith: [
      "Prompt.Root",
      "Prompt.Tools",
      "Prompt.Auxiliary",
      "Button",
      "Field",
    ],
  },
};
