import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from ".";
import { Container } from "../../";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const meta = {
  title: "Components/Bases/Toggle",
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
// type Story = StoryObj<typeof meta>;

export const Default = {
  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(false);
    const variant = checked
      ? ComponentVariantEnum.Mono
      : ComponentVariantEnum.Border;

    return (
      <Toggle variant={variant} onClick={() => setChecked(!checked)}>
        {checked ? "👍" : "👎"}
      </Toggle>
    );
  },
};
export const DefaultChecked = {
  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(true);
    const variant = checked
      ? ComponentVariantEnum.Mono
      : ComponentVariantEnum.Border;

    return (
      <Toggle
        defaultChecked
        variant={variant}
        onClick={() => setChecked(!checked)}
      >
        {checked ? "👍" : "👎"}
      </Toggle>
    );
  },
};
export const Group = {
  render: ({ ...args }) => {
    const [checkedItems, setCheckedItems] = React.useState<object>({
      primary: false,
      secondary: false,
      tertiary: false,
    });

    const getVariant = (label) => {
      return Boolean(checkedItems[label])
        ? ComponentVariantEnum.Mono
        : ComponentVariantEnum.Border;
    };
    const handleCheckedItem = (event: any) => {
      checkedItems[event.target.name] = !checkedItems[event.target.name];
      setCheckedItems({ ...checkedItems });
    };

    return (
      <Container.Row spacing="small" alignmode="center">
        {[
          Object.keys(checkedItems).map((item) => (
            <Toggle
              key={item}
              name={item}
              variant={getVariant(item)}
              onClick={handleCheckedItem}
            >
              {Boolean(checkedItems[item]) ? "👍" : "👎"}
            </Toggle>
          )),
        ]}
      </Container.Row>
    );
  },
};
