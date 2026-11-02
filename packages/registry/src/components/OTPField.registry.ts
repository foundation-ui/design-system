import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const OTPFieldMeta: ComponentRegistryMetadata = {
  name: "OTPField",
  description:
    "One-time password entry with grouped slots, paste support, and onComplete callback.",
  category: "input",
  variants: [],
  title: "OTP Field",
  props: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "id",
      type: "string",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
    },
    {
      name: "length",
      type: "number",
      defaultValue: "6",
    },
    {
      name: "onComplete",
      type: "(value: string) => void",
    },
  ],
  parts: {
    Group: {
      description: "A container for the OTP input slots.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
        },
      ],
    },
    Slot: {
      description: "Represents a single character input slot in the OTP field.",
      props: [
        {
          name: "index",
          type: "number",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
  },
  usage: [
    `import { OTPField } from "@usefui/components";

export function OTPFieldComponent() {
    return (
        <div className="grid align-center justify-center g-medium-60 p-t-large-30 p-x-medium-60">
            <OTPField length={6} onComplete={(value:string) => console.log(value)}>
              <OTPField.Group>
                {Array.from({ length: 6 }).map((_, index) => (
                  <OTPField.Slot key={index} index={index} />
                ))}
              </OTPField.Group>
            </OTPField>
        </div>
    );
}`,
  ],
  anatomy: `import { Field } from "@usefui/components";

export function FieldComponent() {
    return (
      <OTPField>
        <OTPField.Group>
            <OTPField.Slot />
        </OTPField.Group>
      </OTPField>
    );
}`,

  examples: [
    { kind: "note", title: "OTPField with length default 6" },
    { kind: "note", title: "OTPField.Group wrapping OTPField.Slot per index" },
    { kind: "note", title: "pair with Field.Label in Default story" },
    { kind: "note", title: "custom length via length prop and slot count" },
  ],
  a11y: {
    role: "text inputs with autoComplete one-time-code",
    keyboardNav: "Backspace chains; Tab/arrows blocked when empty",
    ariaAttributes: ["data-active on focused slot"],
  },
  relatedComponents: ["Field"],
  aiHints: {
    useCases: [
      "SMS or email verification codes",
      "paste full code from clipboard",
      "4- or 8-digit codes via length",
    ],
    avoid: [
      "alphanumeric passwords",
      "general PIN without OTP semantics",
      "unlabeled fields in production",
    ],
    composesWith: [
      "OTPField.Group",
      "OTPField.Slot",
      "Field.Label",
      "Field.Wrapper",
    ],
  },
};
