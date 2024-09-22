import React from "react";
import type { Meta } from "@storybook/react";

import { AppProvider } from "./contexts/AppProvider";

import { Page } from "@foundation-ui/components";
import { AppLayout } from "./components/layouts";

import uiprops from "./mocks/settings.json";

{
  /* <TODO>Enhance Dropdown: Auto ltr rtl</TODO> */
}

const meta = {
  title: "Modules/Playground",
  component: Page,
} satisfies Meta<typeof Page>;

export const Playground = {
  render: () => {
    const { idb, uba, ab, ui } = uiprops;
    return (
      <AppProvider idb={idb} uba={uba} ab={ab} ui={ui}>
        <AppLayout>
          <section className="p-x-medium-30 p-y-medium-80">
            <hgroup className="grid g-medium-30 m-b-medium-60">
              <h3>Playground</h3>
            </hgroup>
          </section>
        </AppLayout>
      </AppProvider>
    );
  },
};

export default meta;
