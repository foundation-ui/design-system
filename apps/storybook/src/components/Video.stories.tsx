import React from "react";

import {
  Breadcrumb,
  BulkActions,
  Button,
  Video,
  Page,
  Tooltip,
  Whiteboard,
} from "@usefui/components";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/Video",
  component: Video,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content
          className="p-medium-30 flex align-center justify-center w-100 h-100"
          scrollbar
        >
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};
export default meta;

const BROKEN_URL = "https://invalid.example/broken.mp4";
const VIDEO_URL =
  "https://d4db9723-ea43-4301-bf21-b7c323a1885d.mdnplay.dev/shared-assets/videos/flower.mp4";
const VIDEO_WEBM_URL =
  "https://d4db9723-ea43-4301-bf21-b7c323a1885d.mdnplay.dev/shared-assets/videos/flower.webm";

const CAPTIONS_URL = "/captions/video.vtt";

export const Default = {
  render: () => {
    return <Video src={VIDEO_URL} label="Video" width={512} height={288} />;
  },
};
export const Fill = {
  render: () => {
    return (
      <Video
        src={VIDEO_URL}
        fill
        label="Video"
        width={512}
        height={288}
        autoPlay
      />
    );
  },
};

export const Priority = {
  render: () => {
    return (
      <Video
        src={VIDEO_URL}
        label="Video priority"
        width={512}
        height={288}
        priority
        autoPlay
      />
    );
  },
};

export const Fallback = {
  render: () => {
    return (
      <Video
        src={BROKEN_URL}
        fallbackSrc={VIDEO_URL}
        label="Video fallback"
        width={512}
        height={288}
        controls
        priority
      />
    );
  },
};

export const Sources = {
  render: () => {
    return (
      <Video
        sources={[
          { src: VIDEO_WEBM_URL, type: "video/webm" },
          { src: VIDEO_URL, type: "video/mp4" },
        ]}
        autoPlay
        label="Video sources"
        width={512}
        height={288}
      />
    );
  },
};

export const Tracks = {
  render: () => {
    return (
      <Video
        src={VIDEO_URL}
        tracks={[
          {
            src: CAPTIONS_URL,
            srcLang: "en",
            label: "English",
            kind: "captions",
            default: true,
          },
        ]}
        label="Video tracks"
        width={512}
        height={288}
        controls
      />
    );
  },
};

export const Autoplay = {
  render: () => {
    return (
      <Video
        src={VIDEO_URL}
        label="Video autoplay"
        width={512}
        height={288}
        autoPlay
        muted
        loop
      />
    );
  },
};

export const OnError = {
  render: () => {
    const [message, setMessage] = React.useState("");

    return (
      <div className="flex flex-column align-center g-medium-30">
        <Video
          src={BROKEN_URL}
          label="broken-video"
          width={512}
          height={288}
          onError={() => setMessage("onError fired: video failed to load")}
        />
        <span className="fs-small-60">{message}</span>
      </div>
    );
  },
};

export const Shapes = {
  render: () => {
    const [currentShape, setCurrentShape] = React.useState("round");

    return (
      <React.Fragment>
        <Whiteboard.Root>
          <Whiteboard>
            <div className="w-100 h-100 flex align-center justify-center">
              <Video
                src={VIDEO_URL}
                label="Video priority"
                width={1024}
                height={786}
                priority
                autoPlay
                loop
                shape={currentShape as any}
              />
            </div>
          </Whiteboard>

          <BulkActions.Root>
            <BulkActions
              className="flex align-center g-medium-60"
              shape="round"
              sizing="small"
              side="left"
              variant="secondary"
              shortcut
              hotkey="B"
              bindkey="shiftKey"
            >
              <div className="flex flex-column align-center g-medium-10">
                <Tooltip variant="secondary" content="round">
                  <BulkActions.Item>
                    <Button
                      variant="ghost"
                      sizing="small"
                      shape="round"
                      onClick={() => setCurrentShape("round")}
                      rawicon
                      sound="tick"
                    >
                      <Icon
                        className="m-y-small-80"
                        fill="none"
                        stroke="var(--font-color)"
                        opacity={0.6}
                        height={8}
                        width={8}
                      >
                        <Icon.Circle />
                      </Icon>
                    </Button>
                  </BulkActions.Item>
                </Tooltip>
                <Tooltip variant="secondary" content="smooth">
                  <BulkActions.Item>
                    <Button
                      variant="ghost"
                      sizing="small"
                      shape="round"
                      rawicon
                      onClick={() => setCurrentShape("smooth")}
                      sound="tick"
                    >
                      <Icon
                        className="m-y-small-80"
                        opacity={0.6}
                        height={8}
                        width={8}
                      >
                        <Icon.Square />
                      </Icon>
                    </Button>
                  </BulkActions.Item>
                </Tooltip>
                <Tooltip variant="secondary" content="square">
                  <BulkActions.Item>
                    <Button
                      variant="ghost"
                      sizing="small"
                      shape="round"
                      rawicon
                      onClick={() => setCurrentShape("square")}
                      sound="tick"
                    >
                      <Icon
                        className="m-y-small-80"
                        opacity={0.6}
                        height={8}
                        width={8}
                      >
                        <Icon.WarningSquare />
                      </Icon>
                    </Button>
                  </BulkActions.Item>
                </Tooltip>
              </div>
            </BulkActions>
          </BulkActions.Root>

          <BulkActions.Root>
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
          </BulkActions.Root>
        </Whiteboard.Root>
      </React.Fragment>
    );
  },
};
