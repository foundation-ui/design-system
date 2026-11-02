import React from "react";

import { ResponseStream, Page, Viewport, Button } from "@usefui/components";

const meta = {
  title: "Components/ResponseStream",
  component: ResponseStream,
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
};
export default meta;

const TEXT =
  "A streaming response arrives progressively, one character at a time, while the rest of the answer is still being generated. Once every character has been received, the response is marked as complete. A response has two distinct phases: content is still arriving, then the answer becomes available for action. The layout should remain stable across that boundary while rich content continues to render normally.";

export const Default = {
  render: () => {
    const [run, setRun] = React.useState(0);

    return (
      <div className="w-100" style={{ maxWidth: 512 }}>
        <p className="fs-medium-10 p-y-medium-60 opacity-default-30">
          <ResponseStream key={run} autoScroll content={TEXT} />
        </p>

        <Button
          sizing="small"
          shape="round"
          variant="mono"
          onClick={() => setRun((value) => value + 1)}
        >
          <span className="p-y-small-60 p-x-small-30">↺</span>
        </Button>
      </div>
    );
  },
};
export const Statuses = {
  render: () => {
    const [run, setRun] = React.useState(0);

    return (
      <div className="w-100" style={{ maxWidth: 512 }}>
        <p className="fs-medium-10 p-y-medium-60 opacity-default-30">
          <ResponseStream
            key={run}
            autoScroll
            status="pending"
            content={TEXT}
          />
        </p>
        <p className="fs-medium-10 p-y-medium-60 opacity-default-30">
          <ResponseStream
            key={run}
            autoScroll
            status="streaming"
            content={TEXT}
          />
        </p>
        <p className="fs-medium-10 p-y-medium-60 opacity-default-30">
          <ResponseStream
            key={run}
            autoScroll
            status="completed"
            content={TEXT}
          />
        </p>

        <Button
          sizing="small"
          shape="round"
          variant="mono"
          onClick={() => setRun((value) => value + 1)}
        >
          <span className="p-y-small-60 p-x-small-30">↺</span>
        </Button>
      </div>
    );
  },
};

export const WithViewport = {
  render: () => {
    const [run, setRun] = React.useState(0);

    return (
      <div className="w-100" style={{ maxWidth: 512 }}>
        <Viewport direction="y" height={68}>
          <p className="fs-medium-10 p-y-medium-60 opacity-default-30">
            <ResponseStream key={run} autoScroll content={TEXT} />
          </p>
        </Viewport>
        <Button
          sizing="small"
          shape="round"
          variant="mono"
          onClick={() => setRun((value) => value + 1)}
        >
          <span className="p-y-small-60 p-x-small-30">↺</span>
        </Button>
      </div>
    );
  },
};
