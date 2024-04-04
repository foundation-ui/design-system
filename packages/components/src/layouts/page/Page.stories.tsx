import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Page,
  Container,
  ContainerAlignModeEnum,
  Portal,
  Avatar,
  Button,
  Toolbar,
} from "../../";
import { ComponentSizeEnum, ComponentSideEnum } from "../../../../../types";

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
    const links = [
      "Requests",
      "History",
      "Peoples",
      "Metrics",
      "API",
      "Settings",
    ];
    const tools = [
      "Color",
      "Font Size",
      "Measurement",
      "Opacity",
      "Depth",
      "Library",
    ];
    return (
      <React.Fragment>
        <div id="notification-page-portal" />

        <Page>
          <Page.Tools
            shortcut
            hotkey=";"
            showoncollapse
            side={ComponentSideEnum.Left}
            sizing={ComponentSizeEnum.Medium}
          >
            <Avatar
              src="https://avatars.githubusercontent.com/u/153380498?s=160&v=4"
              alt="external-source-avatar"
              sizing={ComponentSizeEnum.Small}
            />

            <Toolbar.Item>
              <Container
                proximity
                global
                spacing={ComponentSizeEnum.Medium}
                style={{ marginTop: 12 }}
              >
                {links.map((item) => (
                  <Button variant="ghost" key={item}>
                    {item}
                  </Button>
                ))}
              </Container>
            </Toolbar.Item>
          </Page.Tools>

          <Container.Col>
            <Page.Navigation>
              <Container.Row
                spacing={ComponentSizeEnum.Small}
                alignmode={ContainerAlignModeEnum.SpaceBetween}
              >
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.Start}
                >
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                </Container.Row>
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.End}
                >
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                </Container.Row>
              </Container.Row>
            </Page.Navigation>
            <Page.Menu>
              <Container.Row
                spacing={ComponentSizeEnum.Small}
                alignmode={ContainerAlignModeEnum.SpaceBetween}
              >
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.Start}
                >
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                </Container.Row>
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.End}
                >
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                </Container.Row>
              </Container.Row>
            </Page.Menu>

            <Page.Content>
              <Button>Sample button</Button>
            </Page.Content>

            <Page.Panel
              shortcut
              hotkey=","
              // trigger="panel"
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
            // showoncollapse
            side={ComponentSideEnum.Right}
            sizing={ComponentSizeEnum.Large}
          >
            <Container
              proximity
              global
              spacing={ComponentSizeEnum.Medium}
              style={{ marginTop: 12 }}
            >
              {tools.map((item) => (
                <Button variant="ghost" key={item}>
                  {item}
                </Button>
              ))}
            </Container>
          </Page.Tools>
        </Page>

        <Portal container="notification-page-portal" />
      </React.Fragment>
    );
  },
};
