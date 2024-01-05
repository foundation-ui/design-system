import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page } from ".";
import { Container } from "../../";
import { Avatar, AvataStatusEnum, Accordion, Button } from "../../";
import {
  ComponentSizeEnum,
  ComponentVariantEnum,
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
              showOnCollapse
              side={ComponentSideEnum.Left}
              sizing={ComponentSizeEnum.Small}
            >
              <Avatar
                src="https://avatars.githubusercontent.com/u/153380498?s=160&v=4"
                alt="external-source-avatar"
                sizing={ComponentSizeEnum.Small}
                status={AvataStatusEnum.Online}
              />
              <Accordion.Root>
                <Accordion>
                  <Accordion.Trigger
                    value="primary-tools"
                    sizing={ComponentSizeEnum.Medium}
                    variant={ComponentVariantEnum.Ghost}
                  >
                    Primary nav tools
                  </Accordion.Trigger>
                  <Accordion.Content value="primary-tools">
                    Tool
                  </Accordion.Content>
                </Accordion>
              </Accordion.Root>
              <Accordion.Root>
                <Accordion>
                  <Accordion.Trigger
                    value="secondary-tools"
                    sizing={ComponentSizeEnum.Medium}
                    variant={ComponentVariantEnum.Ghost}
                  >
                    Secondary nav tools
                  </Accordion.Trigger>
                  <Accordion.Content value="secondary-tools">
                    Tool
                  </Accordion.Content>
                </Accordion>
              </Accordion.Root>
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
                shortcut
                hotkey=","
                trigger={<span>ctrl&nbsp;+&nbsp;,</span>}
                side={ComponentSideEnum.Bottom}
                sizing={ComponentSizeEnum.Large}
              >
                <div
                  style={{
                    background: "red",
                    opacity: 0.1,
                    width: "100%",
                    height: "90%",
                    marginTop: 12,
                    borderRadius: 4,
                  }}
                />
              </Page.Panel>
            </Container.Col>

            <Page.Tools
              shortcut
              hotkey=":"
              defaultOpen
              showOnCollapse
              side={ComponentSideEnum.Right}
              sizing={ComponentSizeEnum.Large}
            >
              <Accordion.Root>
                <Accordion>
                  <Accordion.Trigger
                    value="primary-tools"
                    sizing={ComponentSizeEnum.Medium}
                    variant={ComponentVariantEnum.Ghost}
                  >
                    Primary tools
                  </Accordion.Trigger>
                  <Accordion.Content value="primary-tools">
                    Tool
                  </Accordion.Content>

                  <Accordion.Trigger
                    value="secondary-tools"
                    sizing={ComponentSizeEnum.Medium}
                    variant={ComponentVariantEnum.Ghost}
                  >
                    Secondary tools
                  </Accordion.Trigger>
                  <Accordion.Content value="secondary-tools">
                    Tool
                  </Accordion.Content>
                </Accordion>
              </Accordion.Root>
            </Page.Tools>
          </Page>
          <Page.Portal container="notification-page-portal" />
        </Page.Root>
      </React.Fragment>
    );
  },
};
