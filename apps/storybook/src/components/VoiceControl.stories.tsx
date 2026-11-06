import React from "react";

import { useGradient } from "@usefui/hooks";
import { useColorMode } from "@usefui/tokens";
import { useDrawer, useSheet, useVoiceControl } from "@usefui/components";

import {
  Avatar,
  BulkActions,
  Drawer,
  Page,
  Pill,
  Portal,
  ScrollArea,
  Sheet,
  Shimmer,
  StateCanvas,
  Tooltip,
  VoiceControl,
} from "@usefui/components";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/VoiceControl",
  component: VoiceControl,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => {
      const { colorMode } = useColorMode();

      const particlesColor = colorMode === "light" ? "#00000010" : "#FFFFFF10";

      return (
        <Drawer.Root>
          <Sheet.Root>
            <VoiceControl.Root>
              <BulkActions.Root>
                <Page className="flex flex-column">
                  <StateCanvas>
                    <StateCanvas.Variant
                      variant="ripple"
                      color={particlesColor}
                      speed={0.25}
                      shape="diamond"
                    >
                      <Page.Navigation className="flex align-center" />
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
                    </StateCanvas.Variant>
                  </StateCanvas>
                </Page>
              </BulkActions.Root>
            </VoiceControl.Root>
          </Sheet.Root>
        </Drawer.Root>
      );
    },
  ],
};
export default meta;

export const Default = {
  render: () => (
    <VoiceControl.Root>
      <VoiceControl.Trigger>Record</VoiceControl.Trigger>
      <VoiceControl.Indicator />
      <VoiceControl.Indicator sizing="medium" />
      <VoiceControl.Indicator sizing="large" lines={8} />
      <VoiceControl.Status />
      <VoiceControl.Error />
      <VoiceControl.Transcript live />
    </VoiceControl.Root>
  ),
};

export const Composed = {
  render: ({ ...args }) => {
    const vc = useVoiceControl();
    const drawer = useDrawer();
    const sheet = useSheet();

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

    const detailsStatus = () => {
      if (sheet.states.open) return "processing";
      else return "idle";
    };

    const actionStatus = () => {
      if (vc.states.status === "idle") return "idle";
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
              content={vc.states.record ? "Stop" : "Start recording"}
            >
              <BulkActions.Item status={actionStatus()}>
                <VoiceControl.Trigger
                  variant={vc.states.record ? "danger" : "secondary"}
                  sizing="small"
                  shape="round"
                  animation={vc.states.record ? "bounce" : undefined}
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
                  rawicon
                >
                  <Icon className="m-y-small-90" opacity={0.3}>
                    <Icon.Translate />
                  </Icon>
                </Drawer.Control>
              </BulkActions.Item>
            </Tooltip>
            <Tooltip variant="secondary" content="Context Details">
              <BulkActions.Item status={detailsStatus()}>
                <Sheet.Trigger
                  variant="secondary"
                  sizing="small"
                  shape="round"
                  rawicon
                >
                  <Icon className="m-y-small-90" opacity={0.3}>
                    <Icon.Menu />
                  </Icon>
                </Sheet.Trigger>
              </BulkActions.Item>
            </Tooltip>
          </div>

          <BulkActions.Handle variant="ghost">
            <span className=" m-y-medium-10 m-x-small-70">
              <Icon opacity={0.1}>
                <Icon.Handle />
              </Icon>
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
                {/* <VoiceControl.Error className="fs-medium-10 " /> */}
                <VoiceControl.Transcript live className="fs-medium-10 " />
              </div>
            </ScrollArea>

            <Drawer.Trigger position="bottom" gap={0} />
          </Drawer>
        </Portal>

        <Portal container="dialog-portal">
          <Sheet
            shortcut
            bindkey="shiftKey"
            hotkey="K"
            sizing="medium"
            className="flex flex-column g-medium-60"
          >
            <nav className="w-100 justify-between flex align-center g-medium-30">
              <Sheet.Trigger variant="mono" sizing="small" shape="round">
                <span className=" m-y-medium-10 m-x-small-60">✕</span>
              </Sheet.Trigger>
            </nav>

            <ScrollArea
              className="w-100 h-100 flex flex-column g-medium-10"
              scrollbar
            >
              {[
                { name: "id", value: vc.id },
                { name: "status", value: vc.states.status },
                { name: "record", value: vc.states.record },
                { name: "permission", value: vc.states.permission },
                { name: "processing", value: vc.states.processing },
                { name: "transcript", value: vc.states.transcript },
                { name: "chunks", value: vc.states.chunks.length },
              ].map((item) => (
                <div className="flex justify-between g-medium-30">
                  <p className="fs-medium-20 opacity-default-30">{item.name}</p>
                  <p className="fs-medium-20">{item.value}</p>
                </div>
              ))}
            </ScrollArea>
          </Sheet>
        </Portal>
      </React.Fragment>
    );
  },
};
