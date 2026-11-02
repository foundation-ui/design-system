import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  BulkActions,
  Avatar,
  Drawer,
  Sheet,
  Page,
  Tooltip,
  Portal,
  VoiceControl,
  Shimmer,
  useVoiceControl,
  Pill,
  useDrawer,
  ScrollArea,
} from "@usefui/components";
import { useGradient, useSound } from "@usefui/hooks";

const meta = {
  title: "Components/BulkActions",
  component: BulkActions,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Drawer.Root>
        <Sheet.Root>
          <VoiceControl.Root>
            <BulkActions.Root>
              <Page className="flex flex-column">
                <Page.Navigation className="flex align-center">
                  <Tooltip
                    variant="secondary"
                    content="Shortcut"
                    hint="Shift+B"
                  >
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
                <Page.Wrapper
                  $navigations={1}
                  $menus={1}
                  className="p-medium-30"
                >
                  <Page.Content className="w-100 h-100 p-medium-30">
                    <Story />
                  </Page.Content>
                </Page.Wrapper>
                <Page.Menu />
              </Page>
            </BulkActions.Root>
          </VoiceControl.Root>
        </Sheet.Root>
      </Drawer.Root>
    ),
  ],
} satisfies Meta<typeof BulkActions>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    const vc = useVoiceControl();
    const drawer = useDrawer();

    const randomMultiLayer = useGradient({
      layerCount: 3,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      blendModes: ["overlay", "soft-light", "screen"],
    });

    const transcriptStatus = () => {
      if (drawer.states.open) return "processing";
      else return "idle";
    };
    const actionStatus = () => {
      if (drawer.states.status === "idle") return "idle";
      if (vc.states.status === "denied") return "idle";
      if (vc.states.status === "error") return "idle";
      if (vc.states.status === "requesting-permission") return "pending";
      if (vc.states.status === "listening") return "running";
      if (vc.states.status === "processing") return "processing";
    };

    return (
      <React.Fragment>
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

          <div className="flex align-center g-medium-10">
            <Tooltip
              variant="secondary"
              content={vc.states.record ? vc.states.status : "Start recording"}
            >
              <BulkActions.Item status={actionStatus()}>
                <VoiceControl.Trigger
                  variant="secondary"
                  sizing="small"
                  shape="round"
                >
                  <span className="m-y-medium-10 m-x-small-60">
                    <VoiceControl.Indicator lines={4} />
                  </span>
                </VoiceControl.Trigger>
              </BulkActions.Item>
            </Tooltip>
            <Tooltip variant="secondary" content="Live transcript">
              <BulkActions.Item status={transcriptStatus()}>
                <Drawer.Control
                  variant="secondary"
                  sizing="small"
                  shape="round"
                >
                  <span className="m-y-medium-10 m-x-small-60">☱</span>
                </Drawer.Control>
              </BulkActions.Item>
            </Tooltip>
          </div>

          <BulkActions.Handle variant="ghost">
            <span className=" m-y-medium-10 m-x-small-70">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                opacity={0.3}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="9" r="1"></circle>
                <circle cx="19" cy="9" r="1"></circle>
                <circle cx="5" cy="9" r="1"></circle>
                <circle cx="12" cy="15" r="1"></circle>
                <circle cx="19" cy="15" r="1"></circle>
                <circle cx="5" cy="15" r="1"></circle>
              </svg>
            </span>
          </BulkActions.Handle>
        </BulkActions>

        <Portal container="dialog-portal">
          <Drawer.Trigger position="top" />

          <Drawer
            shortcut
            bindkey="shiftKey"
            hotkey="T"
            sizing="medium"
            direction="top-bottom"
            className="flex flex-column g-medium-10 h-100"
          >
            <Drawer.Menu className="w-100 justify-between flex align-center g-medium-30 p-medium-30 m-b-medium-60">
              <div className="flex align-center g-medium-30">
                <VoiceControl.Indicator sizing="small" />
                <Pill
                  sizing="small"
                  shape="smooth"
                  status={vc.states.record ? "danger" : undefined}
                />
                <Shimmer className="fs-medium-20">
                  {vc.states.record && <VoiceControl.Status />}
                </Shimmer>
              </div>

              <Drawer.Control variant="mono" sizing="small" shape="round">
                <span className=" m-y-medium-10 m-x-small-60">✕</span>
              </Drawer.Control>
            </Drawer.Menu>

            <ScrollArea
              className="w-100 h-100 p-t-medium-40 flex align-center justify-center"
              scrollbar
            >
              <div className="w-100 h-100">
                <VoiceControl.Error className="fs-medium-10 " />
                <VoiceControl.Transcript live className="fs-medium-10 " />
              </div>
            </ScrollArea>

            <Drawer.Trigger position="bottom" gap={0} />
          </Drawer>

          <Drawer.Overlay closeOnInteract />
        </Portal>
      </React.Fragment>
    );
  },
};
