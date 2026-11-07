import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SharedLayout, Page } from "@usefui/components";

const meta = {
  title: "Components/SharedLayout",
  component: SharedLayout,
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
} satisfies Meta<typeof SharedLayout>;
export default meta;

type Story = StoryObj<typeof meta>;

const ITEMS = [
  { title: "Overview", description: "A summary of your workspace." },
  { title: "Analytics", description: "Track usage and performance." },
  { title: "Billing", description: "Manage plans and invoices." },
  { title: "Settings", description: "Configure your preferences." },
];

export const Default: Story = {
  render: () => (
    <div className="w-100" style={{ maxWidth: 248 }}>
      <SharedLayout.Root>
        <SharedLayout>
          {ITEMS.map((item) => (
            <SharedLayout.Item key={item.title}>
              <div className="flex flex-column g-small-60 p-y-medium-30">
                <p className="fs-medium-20">{item.title}</p>
                <span className="fs-medium-10 opacity-default-30">
                  {item.description}
                </span>
              </div>
            </SharedLayout.Item>
          ))}
        </SharedLayout>
      </SharedLayout.Root>
    </div>
  ),
};
export const CustomInset: Story = {
  render: () => (
    <div className="w-100" style={{ maxWidth: 248, padding: "0 16px" }}>
      <SharedLayout.Root>
        <SharedLayout inset={6}>
          {ITEMS.map((item) => (
            <SharedLayout.Item key={item.title}>
              <div className="flex flex-column g-small-60 p-y-medium-10">
                <p className="fs-medium-20">{item.title}</p>
              </div>
            </SharedLayout.Item>
          ))}
        </SharedLayout>
      </SharedLayout.Root>
    </div>
  ),
};
export const Horizontal: Story = {
  render: () => (
    <SharedLayout.Root>
      <SharedLayout
        direction="x"
        inset={4}
        className="w-100 flex align-center justify-center flex-row"
      >
        {ITEMS.map((item) => (
          <SharedLayout.Item key={item.title}>
            <p className="fs-medium-20 p-x-medium-30">{item.title}</p>
          </SharedLayout.Item>
        ))}
      </SharedLayout>
    </SharedLayout.Root>
  ),
};
