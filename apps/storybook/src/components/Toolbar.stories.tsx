import React from "react";

import { useGradient } from "@usefui/hooks";

import {
  Avatar,
  Badge,
  Button,
  Divider,
  ITreeLink,
  Page,
  ScrollArea,
  SharedLayout,
  Toolbar,
  Tree,
} from "@usefui/components";

import { ComponentSizeEnum, ComponentSideEnum } from "@usefui/components";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "inline-radio",
      options: Object.values(ComponentSideEnum),
    },
    sizing: {
      control: "inline-radio",
      options: Object.values(ComponentSizeEnum),
    },
    breakOnMobile: { control: "boolean" },
    breakpoint: { control: { type: "number", min: 320, step: 32 } },
    raw: { control: "boolean" },
  },
};

export default meta;

const go = (path: string) => () => console.log("navigate:", path);

const TREE_LINKS: ITreeLink[] = [
  { label: "Introduction", onClick: go("/docs/introduction") },
  {
    label: "Getting Started",
    links: [
      { label: "Installation", onClick: go("/docs/start/installation") },
      { label: "Theming", onClick: go("/docs/start/theming") },
    ],
  },
  {
    label: "Components",
    links: [
      { label: "Button", onClick: go("/docs/components/button") },
      {
        label: "Navigation",
        defaultOpen: false,
        links: [
          { label: "Tree", onClick: go("/docs/navigation/tree") },
          { label: "Accordion", onClick: go("/docs/navigation/accordion") },
        ],
      },
    ],
  },
  { label: "Changelog", onClick: go("/docs/changelog"), disabled: true },
];

const MENU = ["Playground", "Models", "Documentation"];

type DemoProps = {
  root?: React.ComponentProps<typeof Toolbar.Root>;
  toolbar?: React.ComponentProps<typeof Toolbar>;
  /** Hide the Tree to keep small demos compact. */
  withTree?: boolean;
  /** Extra content rendered next to the trigger. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

const Demo = ({
  root,
  toolbar,
  withTree = true,
  aside,
  children,
}: DemoProps) => {
  const gradient = useGradient({
    layerCount: 3,
    stopsPerLayer: 6,
    types: ["linear", "radial"],
    blendModes: ["overlay", "soft-light", "screen"],
  });

  const side = toolbar?.side ?? ComponentSideEnum.Left;
  const horizontal =
    side === ComponentSideEnum.Top || side === ComponentSideEnum.Bottom;
  const reversed =
    side === ComponentSideEnum.Right || side === ComponentSideEnum.Bottom;

  return (
    <Toolbar.Root {...root}>
      <Page className="flex w-100 h-100">
        <Page.Wrapper
          className={`flex p-medium-30 ${horizontal ? "flex-column" : ""} ${
            reversed
              ? horizontal
                ? "flex-column-reverse"
                : "flex-row-reverse"
              : ""
          }`}
        >
          <Toolbar {...toolbar}>
            {/* alwaysVisible: stays rendered while collapsed */}
            <Toolbar.Section className="p-r-medium-30" alwaysVisible>
              <Avatar sizing="small" src={gradient.base64} />
            </Toolbar.Section>

            <Toolbar.Content>
              <Page.Wrapper $navigations={1.3}>
                <ScrollArea scrollbar className="flex flex-column">
                  {children ?? (
                    <React.Fragment>
                      <Toolbar.Section className="p-r-medium-30">
                        <SharedLayout.Root>
                          <SharedLayout inset={0}>
                            {MENU.map((item) => (
                              <SharedLayout.Item
                                key={item}
                                className="p-l-medium-10 p-y-medium-10"
                              >
                                <Toolbar.Item className="fs-medium-20">
                                  {item}
                                </Toolbar.Item>
                              </SharedLayout.Item>
                            ))}
                          </SharedLayout>
                        </SharedLayout.Root>
                        <Divider />
                      </Toolbar.Section>

                      {withTree && (
                        <Toolbar.Section className="p-r-medium-30">
                          <Tree
                            label="Tree"
                            sizing="medium"
                            links={TREE_LINKS}
                          />
                        </Toolbar.Section>
                      )}
                    </React.Fragment>
                  )}
                </ScrollArea>
              </Page.Wrapper>
            </Toolbar.Content>
          </Toolbar>

          <Page.Content className="h-100 w-100 p-medium-30 flex justify-between">
            <Toolbar.Trigger
              aria-label="Toggle toolbar"
              variant="mono"
              sizing="small"
              shape="round"
            >
              <Icon className="m-y-small-80">
                <Icon.LayoutLeft />
              </Icon>
            </Toolbar.Trigger>
            {aside}
          </Page.Content>
        </Page.Wrapper>
      </Page>
    </Toolbar.Root>
  );
};

/** Collapsed by default. Toggle with the trigger or Ctrl/Cmd + B. */
export const Default = {
  render: () => <Demo root={{ defaultOpen: false }} />,
};

/** Starts expanded (`defaultOpen`). */
export const DefaultOpen = {
  render: () => <Demo root={{ defaultOpen: true }} />,
};

/** `sizing` changes the maximum width (vertical) or height (horizontal). */
export const Sizes = {
  render: () => {
    const [sizing, setSizing] = React.useState<ComponentSizeEnum>(
      ComponentSizeEnum.Medium,
    );

    return (
      <Demo
        root={{ defaultOpen: true }}
        toolbar={{ sizing }}
        aside={
          <div className="flex flex-column g-medium-10">
            {[
              ComponentSizeEnum.Small,
              ComponentSizeEnum.Medium,
              ComponentSizeEnum.Large,
            ].map((s) => (
              <Button
                key={s}
                variant={s === sizing ? "mono" : "secondary"}
                sizing="small"
                onClick={() => setSizing(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        }
      />
    );
  },
};

/** `Toolbar.Item showFirstChild` keeps the first child (an icon) while collapsed. */
export const ShowFirstChild = {
  render: () => (
    <Demo root={{ defaultOpen: false }}>
      <Toolbar.Section className="p-r-medium-30" alwaysVisible>
        {[
          { icon: <Icon.CodeAnnotation />, label: "Playground" },
          { icon: <Icon.OpenAi />, label: "Models" },
          { icon: <Icon.BookOpen />, label: "Documentation" },
        ].map(({ icon, label }) => (
          <Toolbar.Item
            key={label}
            showFirstChild
            className="flex align-center g-medium-30 p-y-medium-10"
          >
            <span aria-hidden="true">
              <Icon>{icon}</Icon>
            </span>
            <span className="fs-medium-20">{label}</span>
          </Toolbar.Item>
        ))}
      </Toolbar.Section>
    </Demo>
  ),
};

/**
 * `Toolbar.Section` without `alwaysVisible` is hidden while collapsed, and
 * clicking a collapsed `Toolbar.Item` expands the toolbar.
 */
export const SectionVisibility = {
  render: () => (
    <Demo root={{ defaultOpen: false }}>
      <Toolbar.Section className="p-r-medium-30" alwaysVisible>
        <Toolbar.Item showFirstChild className="flex g-medium-30">
          <span aria-hidden="true">
            <Icon>
              <Icon.Star />
            </Icon>
          </span>
          <span className="fs-medium-10">Always visible</span>
        </Toolbar.Item>
      </Toolbar.Section>
      <Toolbar.Section className="p-r-medium-30">
        <Badge variant="border">
          <span className="fs-small-50">Only visible when expanded</span>
        </Badge>
      </Toolbar.Section>
    </Demo>
  ),
};

/**
 * Below `breakpoint` (default 768px) the toolbar uses a separate mobile state.
 * Crossing the breakpoint closes it. Resize the canvas to try it.
 */
export const CustomBreakpoint = {
  args: { breakpoint: 1024 },
  render: ({ breakpoint }: { breakpoint?: number }) => (
    <Demo root={{ defaultOpen: true }} toolbar={{ breakpoint }} />
  ),
};

/** `breakOnMobile={false}` keeps the desktop behaviour at every width. */
export const NoBreakOnMobile = {
  render: () => (
    <Demo root={{ defaultOpen: true }} toolbar={{ breakOnMobile: false }} />
  ),
};

/** The `Toolbar` props override the ones set on `Toolbar.Root`. */
export const RootDefaultsOverride = {
  render: () => (
    <Demo
      root={{ defaultOpen: true, breakpoint: 1280 }}
      toolbar={{ breakpoint: 600 }}
    />
  ),
};

/** `keyboardShortcut={false}` disables Ctrl/Cmd + B. */
export const NoKeyboardShortcut = {
  render: () => <Demo root={{ defaultOpen: false, keyboardShortcut: false }} />,
};
