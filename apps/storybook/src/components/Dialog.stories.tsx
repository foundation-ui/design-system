import React from "react";

import {
  Dialog,
  Divider,
  Loader,
  Page,
  ResponseStream,
  ScrollArea,
  Skeleton,
  Viewport,
} from "@usefui/components";
import { useColorMode } from "@usefui/components";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
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

const DialogContent = () => {
  const [duration, setDuration] = React.useState(128);
  return (
    <section className="flex flex-column justify-between g-medium-30 h-100">
      <article className="h-100 flex flex-column g-medium-30 w-100">
        <Dialog.Menu className="flex g-medium-30 justify-start align-center p-medium-30">
          <Loader.ASCIILine sizing="small" className="opacity-default-30" />
          <p className="fs-medium-20">Adipisicing elit</p>
        </Dialog.Menu>

        <Skeleton className="w-100 h-100" sizing="large" />
      </article>

      <footer className="flex justify-between align-end">
        <Dialog.Control
          variant="mono"
          sizing="small"
          shape="round"
          sound="slide"
        >
          Close
        </Dialog.Control>
        <Dialog.Control
          variant="secondary"
          sizing="small"
          shape="round"
          sound="navigate"
          onMouseEnter={() => setDuration(64)}
          onMouseLeave={() => setDuration(128)}
          onFocus={() => setDuration(64)}
          onBlur={() => setDuration(128)}
          onMouseDown={() => setDuration(32)}
          onMouseUp={() => setDuration(64)}
        >
          Continue
          <Loader.ASCII duration={duration} sizing="small" />
        </Dialog.Control>
      </footer>
    </section>
  );
};

export const Default = {
  render: ({ ...args }) => (
    <Dialog.Root>
      <Dialog.Trigger
        variant="secondary"
        sizing="small"
        shape="round"
        sound="pop"
      >
        Open Command Menu
      </Dialog.Trigger>
      <Dialog className="h-100 w-100 flex flex-column">
        <DialogContent />
      </Dialog>
      <Dialog.Overlay />
    </Dialog.Root>
  ),
};

export const Small = {
  render: ({ ...args }) => {
    return (
      <Dialog.Root>
        <Dialog.Trigger
          variant="secondary"
          sizing="small"
          shape="round"
          sound="pop"
        >
          Open Command Menu
        </Dialog.Trigger>
        <Dialog sizing="small" className="h-100 w-100 flex flex-column">
          <DialogContent />
        </Dialog>
        <Dialog.Overlay />
      </Dialog.Root>
    );
  },
};
export const Medium = {
  render: ({ ...args }) => (
    <Dialog.Root>
      <Dialog.Trigger
        variant="secondary"
        sizing="small"
        shape="round"
        sound="pop"
      >
        Open Command Menu
      </Dialog.Trigger>
      <Dialog sizing="medium" className="h-100 w-100 flex flex-column">
        <DialogContent />
      </Dialog>
      <Dialog.Overlay />
    </Dialog.Root>
  ),
};
export const Large = {
  render: ({ ...args }) => (
    <Dialog.Root>
      <Dialog.Trigger
        variant="secondary"
        sizing="small"
        shape="round"
        sound="pop"
      >
        Open Command Menu
      </Dialog.Trigger>
      <Dialog sizing="large" className="h-100 w-100 flex flex-column">
        <DialogContent />
      </Dialog>
      <Dialog.Overlay />
    </Dialog.Root>
  ),
};

export const WithCanvasOverlay = {
  render: ({ ...args }) => {
    const { colorMode } = useColorMode();

    const particlesColor = colorMode === "light" ? "#00000010" : "#FFFFFF10";
    return (
      <Dialog.Root>
        <Dialog.Trigger
          variant="secondary"
          sizing="small"
          shape="round"
          sound="pop"
        >
          Open Command Menu
        </Dialog.Trigger>
        <Dialog className="h-100 w-100 flex flex-column">
          <DialogContent />
        </Dialog>

        <Dialog.Overlay
          canvas
          closeOnInteract
          shape="diamond"
          variant="think"
          background="noise"
          particlesColor={particlesColor}
        />
      </Dialog.Root>
    );
  },
};
export const WithoutOverlay = {
  render: ({ ...args }) => (
    <Dialog.Root>
      <Dialog.Trigger
        variant="secondary"
        sizing="small"
        shape="round"
        sound="pop"
      >
        Open Command Menu
      </Dialog.Trigger>
      <Dialog className="h-100 w-100 flex flex-column">
        <DialogContent />
      </Dialog>
    </Dialog.Root>
  ),
};
