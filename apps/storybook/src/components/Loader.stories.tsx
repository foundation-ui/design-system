import React from "react";
import { Loader, Page, Shimmer, TextCarrousel } from "@usefui/components";

const meta = {
  title: "Components/Loader",
  component: Loader,
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],

  tags: ["autodocs"],
};
export default meta;

export const Default = {
  args: {},
  render: ({ ...args }) => (
    <div className="flex align-center g-medium-30">
      <Loader.Spinner variant="circle" sizing="small" {...args} />
      <Loader.Spinner variant="circle" sizing="medium" {...args} />
      <Loader.Spinner variant="circle" sizing="large" {...args} />
      <Loader.Spinner variant="circle-filled" sizing="small" {...args} />
      <Loader.Spinner variant="circle-filled" sizing="medium" {...args} />
      <Loader.Spinner variant="circle-filled" sizing="large" {...args} />
      <Loader.Dither sizing="small" {...args} />
      <Loader.Dither sizing="medium" {...args} />
      <Loader.Dither sizing="large" {...args} />
      <Loader.ASCII sizing="small" duration={80} {...args} />
      <Loader.ASCII sizing="medium" duration={120} {...args} />
      <Loader.ASCII sizing="large" duration={160} {...args} />
      <Loader.ASCIIBraille duration={80} sizing="small" {...args} />
      <Loader.ASCIIBraille sizing="medium" duration={120} {...args} />
      <Loader.ASCIIBraille sizing="large" duration={160} {...args} />
      <Loader.ASCIILine duration={80} sizing="small" {...args} />
      <Loader.ASCIILine sizing="medium" duration={120} {...args} />
      <Loader.ASCIILine sizing="large" duration={160} {...args} />
      <Loader.ASCIIBounce duration={80} sizing="small" {...args} />
      <Loader.ASCIIBounce sizing="medium" duration={120} {...args} />
      <Loader.ASCIIBounce sizing="large" duration={160} {...args} />
      <Loader.ASCIIBlocks duration={80} sizing="small" {...args} />
      <Loader.ASCIIBlocks sizing="medium" duration={120} {...args} />
      <Loader.ASCIIBlocks sizing="large" duration={160} {...args} />
    </div>
  ),
};
export const WithShimmer = {
  args: {},
  render: ({ ...args }) => (
    <div className="flex align-center g-medium-30">
      <Loader.Dither sizing="small" {...args} />
      <code className="fs-small-70">bash</code>
      <Shimmer className="fs-medium-20">
        chambellan code:validate "**/*.tsx"
      </Shimmer>
    </div>
  ),
};
export const WithShimmerAndTextCarrousel = {
  args: {},
  render: ({ ...args }) => (
    <div className="flex align-center g-medium-30">
      <Loader.ASCII sizing="small" {...args} />
      <Shimmer className="fs-medium-20">
        <TextCarrousel
          auto
          content={[
            "Thinking...",
            "Thinking deeper...",
            "Lost in thoughts...",
            "Back to thinking...",
          ]}
        />
      </Shimmer>
    </div>
  ),
};
