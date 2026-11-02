import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Viewport, Page, Button, Shimmer, Loader } from "..";

const meta = {
  title: "Components/Viewport",
  component: Viewport,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "inline-radio",
      options: [undefined, "x", "y", "both"],
    },
    height: { control: { type: "number", min: 32, step: 8 } },
  },
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Viewport>;
export default meta;

type Story = StoryObj<typeof meta>;

const LOREM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas sed illo assumenda corrupti suscipit velit repellendus ea ab. Autem accusamus quam impedit odio nobis atque minima nam beatae debitis sapiente. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste porro unde labore adipisci, veritatis consequatur repellat numquam qui id voluptates. Minus a et repudiandae eligendi. Officiis quam officia praesentium accusamus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda error nostrum mollitia, deleniti corporis facilis illum dolore voluptatum perspiciatis velit, provident facere placeat. Sint alias non ullam maxime pariatur fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, ducimus! Velit nulla quia odio vitae quod saepe ad eveniet incidunt cupiditate dolorum, nam minima repellendus nesciunt deserunt! Nesciunt, reiciendis natus?";

export const XAxis: Story = {
  render: ({ ...args }) => (
    <div style={{ width: 512 }}>
      <Viewport height={64} direction="x">
        <div
          className="flex align-center g-medium-10 h-100"
          style={{ width: "max-content" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ flexShrink: 0 }}>
              <Button variant="secondary" sizing="small" shape="round">
                Lorem&nbsp;Ipsum&nbsp;{i + 1}
              </Button>
            </div>
          ))}
        </div>
      </Viewport>
    </div>
  ),
};

export const YAxis: Story = {
  args: { height: 124, direction: "y" },
  render: ({ ...args }) => (
    <div
      className="flex flex-column g-medium-30 w-100"
      style={{ maxWidth: 512 }}
    >
      <hgroup className="flex align-center g-medium-30">
        <Loader.ASCIILine sizing="small" />
        <Shimmer className="fs-medium-20">Lorem...</Shimmer>
      </hgroup>
      <Viewport {...args}>
        <p className="fs-medium-10 opacity-default-30 p-y-medium-30">{LOREM}</p>
      </Viewport>
    </div>
  ),
};

export const BothAxes: Story = {
  args: { height: 160, direction: "both" },
  render: ({ ...args }) => (
    <div style={{ width: 512 }}>
      <Viewport {...args}>
        <div
          className="flex flex-column g-medium-10 p-medium-30"
          style={{ width: 960 }}
        >
          {Array.from({ length: 8 }).map((_, row) => (
            <div
              key={row}
              className="flex g-medium-10"
              style={{ flexShrink: 0 }}
            >
              {Array.from({ length: 8 }).map((_, col) => (
                <div key={col} style={{ flexShrink: 0 }}>
                  <Button variant="secondary" sizing="small" shape="round">
                    {row + 1}:{col + 1}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Viewport>
    </div>
  ),
};

export const Static: Story = {
  args: { height: 96 },
  render: ({ ...args }) => (
    <div style={{ width: 512 }}>
      <Viewport {...args}>
        <p className="fs-medium-10 opacity-default-30">{LOREM}</p>
      </Viewport>
    </div>
  ),
};
