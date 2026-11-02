import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tree, Page } from "@usefui/components";
import type { ITreeLink } from "@usefui/components";

const meta = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex flex-wrap align-center justify-center h-100 g-large-10">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Tree>;
export default meta;

type Story = StoryObj<typeof meta>;

const go = (path: string) => () => console.log("navigate:", path);

const TREE_LINKS: ITreeLink[] = [
  { label: "Introduction", onClick: go("/docs/introduction") },
  {
    label: "Getting Started",
    links: [
      {
        label: "Installation",
        onClick: go("/docs/start/installation"),
      },
      { label: "Theming", onClick: go("/docs/start/theming") },
    ],
  },
  {
    label: "Components",
    links: [
      { label: "Button", onClick: go("/docs/components/button") },
      {
        label: "Overlays",
        links: [
          {
            label: "Drawer",
            links: [
              { label: "Overview", onClick: go("/docs/overlays/drawer") },
              {
                label: "API",
                links: [
                  {
                    label: "Props",
                    onClick: go("/docs/overlays/drawer/api/props"),
                  },
                  {
                    label: "Events",
                    onClick: go("/docs/overlays/drawer/api/events"),
                  },
                  {
                    label: "Internals",
                    defaultOpen: false,
                    links: [
                      {
                        label: "Hooks",
                        onClick: go("/docs/overlays/drawer/api/hooks"),
                      },
                      {
                        label: "Animations",
                        onClick: go("/docs/overlays/drawer/api/animations"),
                      },
                    ],
                  },
                ],
              },
              {
                label: "Recipes",
                disabled: true,
                onClick: go("/docs/overlays/drawer/recipes"),
              },
            ],
          },
          {
            label: "MorphingBox",
            links: [
              { label: "Overview", onClick: go("/docs/overlays/morphing-box") },
              {
                label: "Directions",
                onClick: go("/docs/overlays/morphing-box/directions"),
              },
            ],
          },
        ],
      },
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

export const Small: Story = {
  render: () => <Tree label="Tree" sizing="small" links={TREE_LINKS} />,
};
export const Medium: Story = {
  render: () => <Tree label="Tree" sizing="medium" links={TREE_LINKS} />,
};
export const Large: Story = {
  render: () => <Tree label="Tree" sizing="large" links={TREE_LINKS} />,
};
