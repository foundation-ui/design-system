import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Field, MessageBubble, Page, ScrollArea, Textarea } from "..";

const meta = {
  title: "Components/MessageBubble",
  component: MessageBubble,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Page>
        <Page.Content className="p-medium-30">
          <Story />
        </Page.Content>
      </Page>
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
    <ScrollArea className="h-100 w-100 flex flex-column g-medium-30 " scrollbar>
      {(
        [
          {
            variant: "primary",
            side: "left",
            message: "Hey, how are you doing?",
          },
          {
            variant: "meta",
            side: "right",
            message: "All good! What about you?",
          },
          {
            variant: "primary",
            side: "left",
            message: "Pretty great, thanks for asking",
          },
          {
            variant: "meta",
            side: "right",
            message:
              "Hic dolorum esse magnam sint quibusdam porro reprehenderit, enim, repellendus ipsam, iste est! Deserunt ipsam ullam dolores expedita rem, magni iste eveniet.",
          },
          {
            variant: "meta",
            side: "right",
            message: "Hic dolorum esse magnam sint quibusdam.",
          },
          {
            variant: "hint",
            side: "right",
            message: "Hic dolorum esse magnam sint quibusdam.",
          },
          {
            variant: "success",
            side: "right",
            message: "Hic dolorum esse magnam sint quibusdam.",
          },
          {
            variant: "warning",
            side: "right",
            message: "Ipsa nisi fugiat doloribus.",
          },
          {
            variant: "danger",
            side: "right",
            message: "Ipsa nisi fugiat doloribus.",
          },
        ] as const
      ).map(({ variant, side, message }, index) => (
        <MessageBubble.Root key={index}>
          <MessageBubble side={side}>
            {side === "left" && (
              <Field.Meta variant="hint">
                <Avatar
                  sizing="small"
                  alt="foundation-logo"
                  src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                  // shape="smooth"
                >
                  <Avatar.Badge
                    alt="foundation-logo"
                    src="https://www.untitledui.com/logos/images/Layers.jpg"
                  />
                </Avatar>
              </Field.Meta>
            )}

            <MessageBubble.Content
              variant={variant}
              className="fs-medium-20"
              shape="round"
              emphasis
            >
              {message}
            </MessageBubble.Content>
            <MessageBubble.Meta createdAt={MOCK_DATE} />
          </MessageBubble>
        </MessageBubble.Root>
      ))}
    </ScrollArea>
  ),
};
