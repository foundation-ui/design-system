import React from "react";

import { Wizard, Page, Button, Shimmer, Loader } from "@usefui/components";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/Wizard",
  component: Wizard,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Wizard.Root>
        <Page className="flex flex-column">
          <Page.Navigation className="flex align-center w-100">
            <Wizard.Trigger
              value="view-1"
              variant="secondary"
              sizing="small"
              shape="round"
            >
              <Icon className="m-y-small-80" opacity={0.6}>
                <Icon.Home />
              </Icon>
            </Wizard.Trigger>
          </Page.Navigation>

          <Page.Wrapper $navigations={1} $menus={1} className="p-medium-30">
            <Page.Content className="w-100 h-100 p-medium-30">
              <Story />
            </Page.Content>
          </Page.Wrapper>

          <Page.Menu className="flex justify-between align-center w-100">
            <Wizard.Previous variant="secondary" sizing="small" shape="round">
              <Icon className="m-y-small-80" opacity={0.6}>
                <Icon.ChevronLeft />
              </Icon>
            </Wizard.Previous>
            <Wizard.Next variant="secondary" sizing="small" shape="round">
              <Icon className="m-y-small-80" opacity={0.6}>
                <Icon.ChevronRight />
              </Icon>
            </Wizard.Next>
          </Page.Menu>
        </Page>
      </Wizard.Root>
    ),
  ],
};
export default meta;

export const Default = {
  render: ({ ...args }) => {
    const WIZARD_REFS = ["view-1", "view-2", "view-3"];

    return (
      <Wizard views={WIZARD_REFS} className="h-100 w-100 flex flex-column">
        {WIZARD_REFS.map((view) => (
          <Wizard.View
            value={view}
            className="flex align-center justify-center w-100 h-100"
          >
            <Shimmer className="fs-medium-10">{view}</Shimmer>
          </Wizard.View>
        ))}
      </Wizard>
    );
  },
};
