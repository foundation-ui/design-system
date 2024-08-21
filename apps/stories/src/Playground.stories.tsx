import React from "react";
import type { Meta } from "@storybook/react";

import { UIProvider } from "./contexts/UIProvider";

import { Page } from "@foundation-ui/components";
import { AppLayout } from "./components/layouts";

import uiprops from "./mocks/settings.json";

{
  /* <TODO>Enhance color mode context</TODO> */
  /* ———————————————————————————————————————————————— */
  /* <TODO>Add ScrollArea component (https://www.radix-ui.com/primitives/docs/components/scroll-area)</TODO> */
  /* <TODO>Add AspectRatio component (https://ui.shadcn.com/docs/components/aspect-ratio)</TODO> */
  /* <TODO>Add Sheet component (https://ui.shadcn.com/docs/components/sheet)</TODO> */
  /* <TODO>Add Drawer component (https://ui.shadcn.com/docs/components/drawer, https://vaul.emilkowal.ski/)</TODO> */
  /* <TODO>Add Badge component (https://ui.shadcn.com/docs/components/badge)</TODO> */
  /* <TODO>Add Breadcrumb component (https://ui.shadcn.com/docs/components/breadcrumb)</TODO> */
  /* <TODO>Enhance Fields: Number, OTP(?), Range</TODO> */
  /* ———————————————————————————————————————————————— */
  /* <TODO>Add Tooltip component (https://ui.shadcn.com/docs/components/tooltip)</TODO> */
  /* <TODO>Enhance Dropdown: Auto position</TODO> */
  /* <TODO>Add Toast component (https://ui.shadcn.com/docs/components/toast, https://sonner.emilkowal.ski/)</TODO> */
}

const meta = {
  title: "Modules/Playground",
  component: Page,
} satisfies Meta<typeof Page>;

export const Playground = {
  render: () => {
    const { idb, uba, ab, ui } = uiprops;
    return (
      <UIProvider idb={idb} uba={uba} ab={ab} ui={ui}>
        <AppLayout>
          <section className="p-x-medium-30 p-y-medium-80">
            <hgroup className="m-b-medium-60">
              <h3>Playground</h3>
            </hgroup>
          </section>
        </AppLayout>
      </UIProvider>
    );
  },
};

export default meta;
