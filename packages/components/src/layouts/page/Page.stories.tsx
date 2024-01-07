import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page } from ".";
import {
  Container,
  Portal,
  Avatar,
  AvataStatusEnum,
  Accordion,
  Button,
  Toolbar,
} from "../../";

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
              <Toolbar.Item
                showFirstChild
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src="https://avatars.githubusercontent.com/u/153380498?s=160&v=4"
                  alt="external-source-avatar"
                  sizing={ComponentSizeEnum.Large}
                  // status={AvataStatusEnum.Online}
                />
                <span />
              </Toolbar.Item>

              <Toolbar.Item>
                <Container.Col style={{ gap: 6, marginTop: 24 }}>
                  {[1, 2, 3].map((item) => (
                    <small key={item}>Tool n°{item}</small>
                  ))}
                </Container.Col>
              </Toolbar.Item>
            </Page.Tools>

            <Container.Col>
              <Page.Navigation>
                <Container.Row>
                  <Container.Row style={{ gap: 6 }}>
                    <Button sizing={ComponentSizeEnum.Small}>
                      &nbsp;&nbsp;&nbsp;
                    </Button>
                    <Button sizing={ComponentSizeEnum.Small}>
                      &nbsp;&nbsp;&nbsp;
                    </Button>
                  </Container.Row>
                  <Container.Row style={{ gap: 6 }}>
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
                <Container.Row>
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                  <Container.Row style={{ gap: 6 }}>
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
                <Container.Title>
                  <Button>Sample button</Button>
                </Container.Title>
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
              showOnCollapse
              side={ComponentSideEnum.Right}
              sizing={ComponentSizeEnum.Large}
            >
              <Container.Col style={{ gap: 6 }}>
                {[4, 5, 6, 7, 8].map((item) => (
                  <Toolbar.Item
                    key={item}
                    showFirstChild
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Button sizing={ComponentSizeEnum.Small}>
                      &nbsp;&nbsp;&nbsp;
                    </Button>
                    <small>Tool n°{item}</small>
                  </Toolbar.Item>
                ))}
              </Container.Col>
            </Page.Tools>
          </Page>

          <Portal container="notification-page-portal" />
        </Page.Root>
      </React.Fragment>
    );
  },
};
