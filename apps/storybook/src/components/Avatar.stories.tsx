import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, Page, Tooltip } from "@usefui/components";
import { useGradient } from "@usefui/hooks";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
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
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Avatar {...args} />,
};

export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar sizing="large" {...args} />
      <Avatar sizing="medium" {...args} />
      <Avatar sizing="small" {...args} />
    </div>
  ),
};
export const Shapes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar shape="square" status="online" {...args} />
      <Avatar shape="smooth" status="online" {...args} />
      <Avatar shape="round" status="online" {...args} />
    </div>
  ),
};
export const Status: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar status="online" {...args} />
      <Avatar status="away" {...args} />
      <Avatar status="busy" {...args} />
      <Avatar status="offline" {...args} />
      <Avatar {...args} />
    </div>
  ),
};
export const Badges: Story = {
  render: ({ ...args }) => {
    const randomMultiLayer = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });
    const randomMultiLayerNoNoise = useGradient({
      noise: false,
      layerCount: 6,
      stopsPerLayer: 3,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
      colors: ["#ff0080", "#7928ca", "#0070f3", "#00dfd8"],
    });
    const manual = useGradient({
      width: 600,
      height: 300,
      background: "#0b0b12",
      layers: [
        {
          type: "linear",
          angle: 135,
          stops: [
            { color: "#ff0080", offset: 0 },
            { color: "#7928ca", offset: 50 },
            { color: "#0070f3", offset: 100 },
          ],
        },
        {
          type: "radial",
          cx: 20,
          cy: 10,
          r: 60,
          stops: [
            { color: "#fff", opacity: 0.6 },
            { color: "#fff", opacity: 0 },
          ],
          blendMode: "soft-light",
        },
      ],
      noise: {
        type: "turbulence",
        frequency: [0.6, 0.9],
        opacity: 0.3,
        monochrome: false,
      },
    });

    return (
      <div className="flex g-medium-30">
        {[randomMultiLayer, randomMultiLayerNoNoise, manual].map((variant) => (
          <Avatar src={variant.base64}>
            <Avatar.Badge src="https://avatars.githubusercontent.com/u/242926543?s=200&v=4" />
          </Avatar>
        ))}
      </div>
    );
  },
};
