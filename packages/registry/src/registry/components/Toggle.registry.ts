import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ToggleMeta: ComponentRegistryMetadata = {
  name: "Toggle",
  description:
    "Button that switches on or off with role switch. Wraps Button with internal checked state.",
  category: "input",
  variants: [],
  title: "Toggle",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
      defaultValue: "mono",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "value",
      type: "string",
      defaultValue: "false",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      defaultValue: "false",
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
  usage: [
    `import React from "react";
import { Toggle } from "@usefui/components";

function ToggleTemplate() {
const [checkedItem, setCheckedItem] = React.useState<string>("primary");

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60 flex align-center g-medium-10 justify-center">
            <Badge
                variant="border"
                className="flex align-center g-medium-10 justify-center"
            >
                {["primary", "secondary", "tertiary"].map((variant, key) => (
                    <Toggle
                        key={key}
                        variant={variant === checkedItem ? "primary" : "border"}
                        value={variant}
                        sizing="small"
                        onClick={() => setCheckedItem(variant)}
                    >
                        <Icon>
                        {variant === checkedItem ? (
                            <Icon.Check />
                        ) : (
                            <PixelIcon.Downasaur />
                        )}
                        </Icon>
                    </Toggle>
                ))}
            </Badge>
        </div>
    );

}

export default ToggleTemplate;`,
  ],
  anatomy: `import { Toggle } from "@usefui/components";

export function ToggleComponent() {
    return <Toggle>Toggle</Toggle>;
}`,

  examples: [
    { kind: "note", title: "defaultChecked for initial pressed state" },
    { kind: "note", title: "Group story: multiple independent toggles" },
    { kind: "note", title: "Sizes story via inherited Button sizing" },
    { kind: "note", title: "inherits full IButtonProperties" },
  ],
  a11y: {
    role: "switch",
    keyboardNav: "Enter and Space toggle",
    ariaAttributes: ["aria-checked", "data-checked", "data-disabled"],
  },
  relatedComponents: ["Button", "Switch", "Page"],
  aiHints: {
    useCases: [
      "toolbar formatting toggles (bold, mute)",
      "filter chips with pressed appearance",
      "icon-only toggles at various sizes",
    ],
    avoid: [
      "form boolean settings — prefer Switch",
      "mutually exclusive group — use radio or Tabs",
      "parent-controlled checked without syncing variant",
    ],
    composesWith: ["Button"],
  },
};
