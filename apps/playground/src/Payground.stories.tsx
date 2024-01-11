import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ColorModeContext } from "../../../packages/core";
import {
  Portal,
  Page,
  Container,
  ContainerAlignModeEnum,
  Avatar,
  AvataStatusEnum,
  Accordion,
  Button,
  Toolbar,
} from "../../../packages/components";
import {
  ComponentVariantEnum,
  ComponentSideEnum,
  ComponentSizeEnum,
} from "../../../types";

const meta = {
  title: "Payground",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
export const App = {
  args: {},
  argTypes: {},

  render: ({ ...args }) => {
    const { colorMode, setColorMode } = React.useContext(ColorModeContext);

    const darkMode = colorMode === "dark";
    const updateColorMode = () =>
      darkMode ? setColorMode("light") : setColorMode("dark");

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
              />

              <Toolbar.Item>
                <Container.Col
                  spacing={ComponentSizeEnum.Small}
                  style={{ marginTop: 12 }}
                >
                  <p>a</p>
                </Container.Col>
              </Toolbar.Item>
            </Page.Tools>

            <Container.Col>
              <Page.Navigation>
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.SpaceBetween}
                >
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                  <Button
                    variant={ComponentVariantEnum.Ghost}
                    sizing={ComponentSizeEnum.Large}
                    onClick={updateColorMode}
                  >
                    {darkMode ? "🌞" : "🌘"}
                  </Button>
                </Container.Row>
              </Page.Navigation>
              <Page.Menu>
                <small>Generators</small>
              </Page.Menu>

              <Page.Content>
                <Container.Col spacing={ComponentSizeEnum.Large}>
                  <Container proximity spacing="medium">
                    <h3>Generate a Design Tokens Library</h3>
                    <p style={{ margin: 0, maxWidth: 480, opacity: 0.6 }}>
                      Generate Design Tokens within a single step, export your
                      library to use it in your Design System and Applications,
                      regardless of the technologies used.
                    </p>
                  </Container>
                  <Container.Row spacing={ComponentSizeEnum.Medium}>
                    <Button>Generate Colors</Button>
                    <Button>Generate Measurements</Button>
                    <Button>Generate Sequences</Button>
                    <Button>Generate Library</Button>
                  </Container.Row>
                </Container.Col>
              </Page.Content>
            </Container.Col>
          </Page>

          <Portal container="notification-page-portal" />
        </Page.Root>
      </React.Fragment>
    );
  },
};
