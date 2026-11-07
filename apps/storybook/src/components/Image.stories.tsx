import React from "react";

import { useGradient } from "@usefui/hooks";
import {
  Breadcrumb,
  BulkActions,
  Button,
  Image,
  Overlay,
  Page,
  StateCanvas,
  Tooltip,
  Whiteboard,
} from "@usefui/components";
import { Icon } from "@usefui/icons";
import { useColorMode } from "@usefui/tokens";

const meta = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content
          className="flex align-center justify-center w-100 h-100"
          scrollbar
        >
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};
export default meta;

const useThumbnail = (size = 512) =>
  useGradient({
    width: size,
    height: size,
    layerCount: 3,
    stopsPerLayer: 6,
    types: ["linear", "radial"],
    blendModes: ["overlay", "soft-light", "screen"],
  });

const BROKEN_URL = "https://invalid.example/broken.png";

export const Default = {
  render: () => {
    const thumbnail = useThumbnail();

    return (
      <Image
        src={thumbnail.base64}
        alt="gradient-cover"
        width={512}
        height={512}
      />
    );
  },
};
export const Fill = {
  render: () => {
    const thumbnail = useThumbnail();

    return <Image src={thumbnail.base64} alt="gradient-cover-fill" fill />;
  },
};
export const FillWithCanvas = {
  render: () => {
    const { colorMode } = useColorMode();
    const thumbnail = useGradient({
      width: 1920,
      height: 1080,
      layerCount: 2,
      stopsPerLayer: 6,
      types: ["linear", "radial"],
      noise: false,
      blendModes: ["overlay", "soft-light", "screen"],
      colors: ["transparent", "#7928ca90", "#0070f390", "#00dfd890"],
    });

    const particlesColor = colorMode === "light" ? "#000000" : "#FFFFFF";

    return (
      <StateCanvas>
        <StateCanvas.Variant variant="analysis" color={particlesColor}>
          <Image src={thumbnail.base64} alt="gradient-cover-fill" fill />
        </StateCanvas.Variant>
      </StateCanvas>
    );
  },
};
export const Priority = {
  render: () => {
    const thumbnail = useThumbnail();

    return (
      <Image
        src={thumbnail.base64}
        alt="gradient-cover-priority"
        width={512}
        height={512}
        priority
      />
    );
  },
};
export const Fallback = {
  render: () => {
    const fallback = useThumbnail(256);

    return (
      <Image
        src={BROKEN_URL}
        fallbackSrc={fallback.base64}
        alt="gradient-cover-fallback"
        width={256}
        height={256}
      />
    );
  },
};
export const Responsive = {
  render: () => {
    const small = useThumbnail(256);
    const medium = useThumbnail(512);
    const large = useThumbnail(1024);

    return (
      <Image
        src={medium.base64}
        srcSet={`${small.base64} 256w, ${medium.base64} 512w, ${large.base64} 1024w`}
        sizes="(max-width: 600px) 256px, 512px"
        alt="gradient-cover-responsive"
        width={512}
        height={512}
      />
    );
  },
};
export const Sources = {
  render: () => {
    const avif = useThumbnail();
    const webp = useThumbnail();
    const fallback = useThumbnail();

    return (
      <Image
        src={fallback.base64}
        sources={[
          { srcSet: avif.base64, type: "image/avif" },
          { srcSet: webp.base64, type: "image/webp" },
        ]}
        sizes="512px"
        alt="gradient-cover-sources"
        width={512}
        height={512}
      />
    );
  },
};
export const Decorative = {
  render: () => {
    const thumbnail = useThumbnail();

    return <Image src={thumbnail.base64} alt="" width={512} height={512} />;
  },
};
export const OnError = {
  render: () => {
    const [message, setMessage] = React.useState("Waiting for error...");

    return (
      <div className="flex flex-column align-center g-medium-30">
        <Image
          src={BROKEN_URL}
          alt="broken-image"
          width={256}
          height={256}
          onError={() => setMessage("onError fired: image failed to load")}
        />
        <span className="fs-small-60">{message}</span>
      </div>
    );
  },
};

export const Shapes = {
  render: () => {
    const [currentShape, setCurrentShape] = React.useState("round");

    const thumbnail = useThumbnail();

    return (
      <React.Fragment>
        <Whiteboard.Root>
          <Whiteboard>
            <div className="w-100 h-100 flex align-center justify-center">
              <Image
                src={thumbnail.base64}
                alt="gradient-cover"
                shape={currentShape as any}
                width={256}
                height={256}
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
