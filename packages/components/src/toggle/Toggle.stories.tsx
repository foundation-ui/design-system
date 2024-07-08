import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "..";
import { ComponentVariantEnum } from "../../../../types";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(false);
    const variant = checked
      ? ComponentVariantEnum.Secondary
      : ComponentVariantEnum.Border;

    return <Toggle variant={variant} onClick={() => setChecked(!checked)} />;
  },
};
export const DefaultChecked: Story = {
  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(true);
    const variant = checked
      ? ComponentVariantEnum.Secondary
      : ComponentVariantEnum.Border;

    return (
      <Toggle
        defaultChecked
        variant={variant}
        onClick={() => setChecked(!checked)}
      />
    );
  },
};
export const Group: Story = {
  render: ({ ...args }) => {
    const [checkedItems, setCheckedItems] = React.useState<object>({
      primary: false,
      secondary: true,
      tertiary: false,
    });

    const getVariant = (label) => {
      return Boolean(checkedItems[label])
        ? ComponentVariantEnum.Secondary
        : ComponentVariantEnum.Border;
    };
    const handleCheckedItem = (event: any) => {
      checkedItems[event.target.name] = !checkedItems[event.target.name];
      setCheckedItems({ ...checkedItems });
    };

    return (
      <div className="flex justify-start align-center g-medium-30">
        {[
          Object.keys(checkedItems).map((item) => (
            <Toggle
              key={item}
              name={item}
              variant={getVariant(item)}
              onClick={handleCheckedItem}
            />
          )),
        ]}
      </div>
    );
  },
};
export const Sizes: Story = {
  render: ({ ...args }) => {
    const [checkedItems, setCheckedItems] = React.useState<object>({
      large: false,
      medium: false,
      small: false,
    });

    const getVariant = (label) => {
      return Boolean(checkedItems[label])
        ? ComponentVariantEnum.Secondary
        : ComponentVariantEnum.Border;
    };
    const handleCheckedItem = (event: any) => {
      checkedItems[event.target.name] = !checkedItems[event.target.name];
      setCheckedItems({ ...checkedItems });
    };

    return (
      <div className="flex justify-start align-center g-medium-30">
        {[
          Object.keys(checkedItems).map((item) => (
            <Toggle
              key={item}
              name={item}
              variant={getVariant(item)}
              sizing={item}
              onClick={handleCheckedItem}
            >
              {item}
            </Toggle>
          )),
        ]}
      </div>
    );
  },
};
