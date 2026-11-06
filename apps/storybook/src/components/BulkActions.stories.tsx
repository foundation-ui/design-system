import React from "react";

import { useGradient } from "@usefui/hooks";

import {
  Page,
  BulkActions,
  Avatar,
  Tooltip,
  VoiceControl,
} from "@usefui/components";
import { Icon } from "@usefui/icons";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/BulkActions",
  component: BulkActions,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <VoiceControl.Root>
        <BulkActions.Root>
          <Page className="flex flex-column">
            <Page.Navigation className="flex align-center">
              <Tooltip variant="secondary" content="Shortcut" hint="Shift+B">
                <BulkActions.Trigger
                  variant="secondary"
                  sizing="small"
                  animation="reflective"
                  shape="round"
                >
                  Toggle&nbsp;Bulk Actions
                </BulkActions.Trigger>
              </Tooltip>
            </Page.Navigation>
            <Page.Wrapper $navigations={1} $menus={1} className="p-medium-30">
              <Page.Content className="w-100 h-100 p-medium-30">
                <Story />
              </Page.Content>
            </Page.Wrapper>
            <Page.Menu />
          </Page>
        </BulkActions.Root>
      </VoiceControl.Root>
    ),
  ],
} satisfies Meta<typeof BulkActions>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    const randomMultiLayer = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });

    return (
      <BulkActions
        className="flex align-center g-medium-60"
        shape="round"
        sizing="small"
        side="bottom"
        variant="secondary"
        shortcut
        hotkey="B"
        bindkey="shiftKey"
      >
        <Avatar sizing="medium" src={randomMultiLayer.base64}>
          <Avatar.Badge src="https://avatars.githubusercontent.com/u/242926543?s=200&v=4" />
        </Avatar>

        <BulkActions.Handle variant="ghost">
          <span className=" m-y-medium-10 m-x-small-70">
            <Icon opacity={0.1}>
              <Icon.Handle />
            </Icon>
          </span>
        </BulkActions.Handle>
      </BulkActions>
    );
  },
};
