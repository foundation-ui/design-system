import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page } from ".";
import { Container } from "../../";
import { Button } from "../../";
import {
  IComponentStyling,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentSize,
  IReactChildren,
  ComponentSideEnum,
} from "../../../../../types";

const meta = {
  title: "Components/Layouts/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
  argTypes: {},
  render: ({ ...args }) => {
    return (
      <React.Fragment>
        <div id="notification-page-portal" />

        <Page.Root>
          <Page>
            <Page.Tools
              shortcut
              hotkey=";"
              controls="secondaryTool"
              side={ComponentSideEnum.Left}
              sizing={ComponentSizeEnum.Small}
            >
              Tools
            </Page.Tools>

            <Container.Col>
              <Page.Navigation>Nav</Page.Navigation>
              <Page.Menu>Menu</Page.Menu>
              <Page.Content>
                <Container.Title>
                  <h1>Title sample</h1>
                  <p>
                    An open-source design system providing low-level components
                    and foundations to help you build high-quality, accessible
                    applications. An open-source design system providing
                    low-level components and foundations to help you build
                    high-quality, accessible applications. An open-source design
                    system providing low-level components and foundations to
                    help you build high-quality, accessible applications.
                  </p>
                  <Button>Sample button</Button>
                </Container.Title>
              </Page.Content>
              <Page.Panel
                side={ComponentSideEnum.Bottom}
                sizing={ComponentSizeEnum.Large}
              >
                <p style={{ height: 325 }}>Page panel</p>
              </Page.Panel>
            </Container.Col>

            <Page.Tools
              defaultOpen
              shortcut
              hotkey=":"
              controls="primaryTool"
              side={ComponentSideEnum.Right}
              sizing={ComponentSizeEnum.Large}
            >
              Tools
            </Page.Tools>
          </Page>
          <Page.Portal container="notification-page-portal" />
        </Page.Root>
      </React.Fragment>
    );
  },
};
