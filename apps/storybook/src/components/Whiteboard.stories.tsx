import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Whiteboard,
  Page,
  BulkActions,
  Avatar,
  Breadcrumb,
} from "@usefui/components";
import { useGradient } from "@usefui/hooks";

const meta = {
  title: "Components/Whiteboard",
  component: Whiteboard,
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
} satisfies Meta<typeof Whiteboard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => {
    const randomMultiLayer = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
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
    const nonoise = useGradient({
      noise: false,
      layerCount: 6,
      stopsPerLayer: 3,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
      colors: ["#ff0080", "#7928ca", "#0070f3", "#00dfd8"],
    });

    return (
      <BulkActions.Root>
        <Whiteboard.Root>
          <Whiteboard>
            <div className="w-100 h-100 flex align-center justify-center">
              <Avatar src={randomMultiLayer.base64} sizing="large">
                <Avatar.Badge src="https://avatars.githubusercontent.com/u/242926543?s=200&v=4" />
              </Avatar>
            </div>
          </Whiteboard>

          <BulkActions
            className="flex align-center g-medium-30"
            shape="round"
            sizing="small"
            side="bottom"
            variant="secondary"
            shortcut
            hotkey="B"
            bindkey="shiftKey"
            gap={16}
          >
            <Whiteboard.Zoom
              direction="in"
              sizing="small"
              shape="round"
              variant="mono"
              sound="tick"
            >
              <span className="p-y-small-60 p-x-small-60">+</span>
            </Whiteboard.Zoom>
            <span className="fs-small-60 opacity-default-30">
              <Whiteboard.Indicator />
            </span>
            <Whiteboard.Zoom
              direction="out"
              sizing="small"
              shape="round"
              variant="mono"
              sound="tick"
            >
              <span className="p-y-small-60 p-x-small-80">-</span>
            </Whiteboard.Zoom>
            <Breadcrumb.Separator />
            <Whiteboard.Zoom
              direction="reset"
              sizing="small"
              shape="round"
              variant="mono"
              sound="click"
            >
              <span className="p-y-small-60 p-x-small-30">↺</span>
            </Whiteboard.Zoom>
          </BulkActions>
        </Whiteboard.Root>
      </BulkActions.Root>
    );
  },
};
