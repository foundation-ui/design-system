import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Banner, Page } from "@usefui/components";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Banners are used to convey data or states to the users.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of Banners with different variants.
 * - Banner label must convey short and understandable information.
 *
 */

const meta = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Banner>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Banner {...args} />,
};
export const Shapes: Story = {
  render: ({ ...args }) => {
    return (
      <div className="grid g-medium-30">
        {["round", "smooth", "square"].map((s) => (
          <Banner shape={s}>
            <p className="fs-medium-10">{s}&nbsp;banner</p>
            <p className="fs-small-60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </Banner>
        ))}
      </div>
    );
  },
};

export const Variants: Story = {
  render: ({ ...args }) => {
    return (
      <div className="grid g-medium-30">
        {[
          "primary",
          "secondary",
          "border",
          "meta",
          "hint",
          "success",
          "warning",
          "danger",
        ].map((v) => (
          <Banner variant={v}>
            <p className="fs-medium-10">{v}&nbsp;banner</p>
            <p className="fs-small-60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </Banner>
        ))}
      </div>
    );
  },
};
export const Emphasis: Story = {
  render: ({ ...args }) => {
    return (
      <div className="grid g-medium-30">
        {[
          "primary",
          "secondary",
          "border",
          "meta",
          "hint",
          "success",
          "warning",
          "danger",
        ].map((v) => (
          <Banner variant={v} emphasis>
            <p className="fs-medium-10">{v}&nbsp;banner</p>
            <p className="fs-small-60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </Banner>
        ))}
      </div>
    );
  },
};
