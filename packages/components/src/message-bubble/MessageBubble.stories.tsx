import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { MessageBubble } from "..";

const meta = {
  title: "Components/MessageBubble",
  component: MessageBubble,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageBubble>;
export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_DATE = new Date("2026-03-17T13:00:00Z");
const MOCK_MESSAGE = "Hey, how are you doing?";

export const Default: Story = {
  args: {
    side: "left",
    raw: false,
  },
  argTypes: {
    side: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    raw: {
      control: { type: "boolean" },
    },
  },
  render: ({ ...args }) => (
    <MessageBubble.Root>
      <MessageBubble {...args}>
        <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
        <MessageBubble.Meta createdAt={MOCK_DATE} />
      </MessageBubble>
    </MessageBubble.Root>
  ),
};

export const Left: Story = {
  render: () => (
    <MessageBubble.Root>
      <MessageBubble side="left">
        <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
        <MessageBubble.Meta createdAt={MOCK_DATE} />
      </MessageBubble>
    </MessageBubble.Root>
  ),
};

export const Right: Story = {
  render: () => (
    <MessageBubble.Root>
      <MessageBubble side="right">
        <MessageBubble.Content>{MOCK_MESSAGE}</MessageBubble.Content>
        <MessageBubble.Meta createdAt={MOCK_DATE} />
      </MessageBubble>
    </MessageBubble.Root>
  ),
};

export const Conversation: Story = {
  render: () => (
    <React.Fragment>
      {(
        [
          { side: "left", message: "Hey, how are you doing?" },
          { side: "right", message: "All good! What about you?" },
          { side: "left", message: "Pretty great, thanks for asking 🐻" },
          { side: "right", message: "Glad to hear it! 🐻❄️" },
        ] as const
      ).map(({ side, message }, index) => (
        <MessageBubble.Root key={index}>
          <MessageBubble side={side}>
            <MessageBubble.Content>{message}</MessageBubble.Content>
            <MessageBubble.Meta createdAt={MOCK_DATE} />
          </MessageBubble>
        </MessageBubble.Root>
      ))}
    </React.Fragment>
  ),
};
