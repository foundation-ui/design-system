import React from "react";
import { useColorMode } from "@usefui/tokens";

import {
  Button,
  ComponentSizeEnum,
  Loader,
  Page,
  Sheet,
  Skeleton,
} from "@usefui/components";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex flex-column align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};

export default meta;

const SheetContent = () => {
  const [duration, setDuration] = React.useState(128);
  return (
    <section className="flex flex-column justify-between g-medium-30 h-100">
      <article className="h-100 flex flex-column g-medium-30 w-100">
        <nav className="flex g-medium-30 justify-start align-center p-medium-30">
          <Loader.ASCIILine sizing="small" className="opacity-default-30" />
          <p className="fs-medium-20">Adipisicing elit</p>
        </nav>

        <Skeleton className="w-100 h-100" sizing="large" />
      </article>

      <footer className="flex justify-between align-end">
        <Sheet.Trigger
          variant="mono"
          sizing="small"
          shape="round"
          sound="slide"
        >
          Close
        </Sheet.Trigger>
        <Sheet.Trigger
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
        </Sheet.Trigger>
      </footer>
    </section>
  );
};

export const Default = {
  render: ({ ...args }) => (
    <Sheet.Root>
      <Sheet.Trigger
        variant="secondary"
        sizing="small"
        shape="round"
        animation="wiggle"
      >
        <Icon className="m-y-small-80" opacity={0.6}>
          <Icon.Menu />
        </Icon>
      </Sheet.Trigger>
      <Sheet>
        <SheetContent />
      </Sheet>
      <Sheet.Overlay />
    </Sheet.Root>
  ),
};
export const DefaultOpen = {
  render: ({ ...args }) => (
    <Sheet.Root>
      <Sheet.Trigger
        variant="secondary"
        sizing="small"
        shape="round"
        animation="wiggle"
      >
        <Icon className="m-y-small-80" opacity={0.6}>
          <Icon.Menu />
        </Icon>
      </Sheet.Trigger>
      <Sheet open lock={false}>
        <SheetContent />
      </Sheet>
      <Sheet.Overlay />
    </Sheet.Root>
  ),
};
export const Sides = {
  render: ({ ...args }) => {
    const [side, setSide] = React.useState<"left" | "right">("right");

    return (
      <Sheet.Root>
        <div className="flex flex-column align-center jusitfy-center g-medium-30">
          <Sheet.Trigger
            variant="secondary"
            sizing="small"
            shape="round"
            animation="float"
          >
            <Icon className="m-y-small-90" opacity={0.6}>
              <Icon.LayoutRight />
            </Icon>
          </Sheet.Trigger>
          <div className="flex align-center g-medium-30 justify-center">
            {["left", "right"].map((s) => (
              <Button
                key={s}
                variant={s === side ? "primary" : "secondary"}
                sizing="small"
                onClick={() => setSide(s as any)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        <Sheet side={side as any} open>
          <SheetContent />
        </Sheet>
      </Sheet.Root>
    );
  },
};
export const Sizes = {
  render: ({ ...args }) => {
    const [sizing, setSizing] = React.useState<ComponentSizeEnum>(
      ComponentSizeEnum.Medium,
    );

    return (
      <Sheet.Root>
        <div className="flex flex-column align-center jusitfy-center g-medium-30">
          <Sheet.Trigger
            variant="secondary"
            sizing="small"
            shape="round"
            animation="float"
          >
            <Icon className="m-y-small-90" opacity={0.6}>
              <Icon.LayoutRight />
            </Icon>
          </Sheet.Trigger>
          <div className="flex align-center g-medium-30 justify-center">
            {[
              ComponentSizeEnum.Small,
              ComponentSizeEnum.Medium,
              ComponentSizeEnum.Large,
            ].map((s) => (
              <Button
                key={s}
                variant={s === sizing ? "primary" : "secondary"}
                sizing="small"
                onClick={() => setSizing(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        <Sheet sizing={sizing as any} open>
          <SheetContent />
        </Sheet>
      </Sheet.Root>
    );
  },
};
export const Shortcut = {
  render: ({ ...args }) => {
    const { colorMode } = useColorMode();

    const particlesColor = colorMode === "light" ? "#00000010" : "#FFFFFF10";

    return (
      <Sheet.Root>
        <div className="flex flex-column align-center jusitfy-center g-medium-30">
          <Sheet.Trigger
            variant="secondary"
            sizing="small"
            shape="round"
            animation="float"
          >
            <Icon className="m-y-small-90" opacity={0.6}>
              <Icon.LayoutRight />
            </Icon>
          </Sheet.Trigger>
          <p className="fs-small-50 opacity-default-10">
            Press Shift + K to open the Sheet component.
          </p>
        </div>

        <Sheet
          shortcut
          bindkey="shiftKey"
          hotkey="K"
          sizing="large"
          side="right"
        >
          <SheetContent />
        </Sheet>

        <Sheet.Overlay
          canvas
          variant="analysis"
          shape="square"
          background="noise"
          particlesColor={particlesColor}
          closeOnInteract
        />
      </Sheet.Root>
    );
  },
};
