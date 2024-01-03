import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page } from ".";
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
              side={ComponentSideEnum.Left}
              sizing={ComponentSizeEnum.Small}
            >
              Tools
            </Page.Tools>
            <Page.Section>
              <Page.Navigation>Nav</Page.Navigation>
              <Page.Menu>Menu</Page.Menu>
              <Page.Content>
                <h1>Birbs UI</h1>
                <p>
                  An open-source design system providing low-level components
                  and foundations to help you build high-quality, accessible
                  applications. An open-source design system providing low-level
                  components and foundations to help you build high-quality,
                  accessible applications. An open-source design system
                  providing low-level components and foundations to help you
                  build high-quality, accessible applications.
                </p>
              </Page.Content>

              <Page.Panel>
                <p>Page panel</p>
              </Page.Panel>
            </Page.Section>
            <Page.Tools
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
