import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Banner,
  Card,
  Page,
  Resizable,
  Shimmer,
  VoiceControl,
  VoiceControlRoot,
  useVoiceControl,
} from "..";

const meta = {
  title: "Components/VoiceControl",
  component: VoiceControlRoot,
  tags: ["autodocs"],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof VoiceControlRoot>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

const HookStateReadoutDemo = () => {
  const { id, states } = useVoiceControl();

  return (
    <Page className="flex flex-column">
      <Page.Navigation className="flex align-center g-medium-10 justify-between">
        <VoiceControl.Trigger
          variant="secondary"
          sizing="small"
          animation="reflective"
          shape="round"
        >
          <Shimmer
            className="m-r-medium-10"
            baseColor="var(--font-color)"
            duration={states.record ? 1 : 4}
          >
            {states.record ? <VoiceControl.Status /> : "Record"}
          </Shimmer>
          <VoiceControl.Indicator lines={4} />
        </VoiceControl.Trigger>
      </Page.Navigation>
      <Page.Wrapper $navigations={1} className="flex p-medium-30">
        <Page.Content className="w-100 h-100 p-medium-30">
          <Resizable
            left={
              <div className="w-100 h-100 p-medium-60 flex flex-column g-medium-30">
                <p className="fs-medium-10 opacity-default-30">Hook states</p>

                <pre className="fs-small-50">
                  {JSON.stringify(
                    {
                      id,
                      status: states.status,
                      record: states.record,
                      permission: states.permission,
                      processing: states.processing,
                      transcript: states.transcript,
                      chunks: states.chunks.length,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            }
            right={
              <Page.Content
                className="w-100 h-100 flex flex-column g-medium-30"
                style={{ backgroundColor: "var(--body-color)" }}
              >
                <div className="w-100 h-100 p-medium-60 flex flex-column g-medium-30">
                  <p className="fs-medium-10 opacity-default-30">Transcript</p>

                  <VoiceControl.Transcript live />
                  <VoiceControl.Error className="fs-small-60 color-red" />
                </div>
              </Page.Content>
            }
            defaultWidth={30}
            maxWidth={70}
          />
        </Page.Content>
      </Page.Wrapper>
    </Page>
  );
};
export const HookStateReadout: Story = {
  render: () => {
    return (
      <VoiceControl.Root>
        <HookStateReadoutDemo />
      </VoiceControl.Root>
    );
  },
};
