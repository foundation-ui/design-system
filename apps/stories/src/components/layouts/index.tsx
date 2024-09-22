import React from "react";

import { useApp } from "../../contexts/AppProvider";
import { useSaveOnUnload } from "@foundation-ui/hooks";

import { Page, Dialog } from "@foundation-ui/components";
import { Loader3D } from "../../styles";

import { AppSettings } from "../settings";
import {
  ExternalLinksNavigation,
  InternalActionsNavigation,
} from "./Navigations";
import { QuickActionsMenu } from "./Menus";
import { InternalLinksSheet, ToolsSheet } from "./Sheets";
import { AnalyticsDrawer } from "./Drawers";

const Loader = () => {
  return (
    <Page.Wrapper className="flex justify-center align-center">
      <Loader3D />
    </Page.Wrapper>
  );
};

export const AppLayout = ({ children }: any) => {
  const { app_properties, user_behavior_analytics, ab_testing } = useApp();

  // React.useEffect(() => {
  //   if (indexed_db.db) {
  //     Promise.allSettled([
  //       indexed_db.getDataFromIDB("themes", "app").then((data) => {
  //         if (!data)
  //           indexed_db.setDataInIDB("themes", "app", {
  //             dark: design_system_themes.dark_mono,
  //             light: design_system_themes.light_mono,
  //           });
  //       }),
  //     ]);
  //   }
  // }, [indexed_db.db]);

  useSaveOnUnload({
    url: "api.uui/sandbox",
    payload: {
      app_properties,
      user_behavior_analytics,
      ab_testing,
    },
  });

  if (!app_properties) return <Loader />;
  return (
    <Dialog.Root>
      <AppSettings />

      <Page>
        <Page.Content>
          <ExternalLinksNavigation />
          <InternalActionsNavigation />

          <section>
            <QuickActionsMenu />

            <div className="flex justify-between">
              <InternalLinksSheet />

              <Page.Wrapper $menus={2} $navigations={2}>
                {/* <OptionsSheet /> */}
                {children}
              </Page.Wrapper>

              <ToolsSheet />
            </div>
          </section>

          <AnalyticsDrawer />
        </Page.Content>
      </Page>
    </Dialog.Root>
  );
};
