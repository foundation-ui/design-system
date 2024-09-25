import React from "react";

import { useApp } from "../../contexts/AppProvider";
import { useSaveOnUnload } from "@foundation-ui/hooks";

import { Page, Button, Dialog } from "@foundation-ui/components";
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

export const AppLayout = () => {
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
                <section
                  className="p-medium-80 grid g-large-30"
                  style={{ maxWidth: 768 }}
                >
                  <hgroup>
                    <h1 className="m-b-medium-30">User Behavior Analytics</h1>
                    <p className="opacity-default-60 m-b-medium-60">
                      User Behavior Analytics (UBA) is the process of collecting
                      and analyzing data on the behavior of users within a
                      digital environment, such as a website, application, or
                      network. UBA is increasingly referred to as user and
                      entity behavior analytics (UEBA) to reflect that the user
                      is just one category of entities with observable behaviors
                      on modern networks. Other entities can include processes,
                      applications, and network devices.
                    </p>
                    <Button
                      variant="border"
                      onClick={() => console.log(user_behavior_analytics)}
                    >
                      Log UBA
                    </Button>
                  </hgroup>

                  <hgroup>
                    <h2 className="m-b-medium-30">
                      What is UEBA and what are the differences with UBA
                    </h2>
                    <p className="opacity-default-60">
                      UEBA stands for User and Entity Behavior Analytics, which
                      is an advanced form of UBA (User Behavior Analytics). The
                      main difference between UBA and UEBA is that while UBA
                      focuses on the behavior of individual users, UEBA takes a
                      broader approach by analyzing the behavior of not only
                      users but also entities, such as devices, applications,
                      and systems
                    </p>
                  </hgroup>

                  <hgroup>
                    <h3 className="m-b-medium-30">
                      How and why apply User Analytics
                    </h3>
                    <p className="opacity-default-60">
                      User analytics is applied in various industries and
                      settings to gain insights into user behavior and improve
                      user experience. By analyzing user behavior, organizations
                      can identify areas where users may be experiencing
                      difficulties or frustration, take steps to improve their
                      product, and then, improve user experience. User analytics
                      allows you to personalize experiences and better
                      understand customer needs.
                    </p>
                  </hgroup>

                  <hgroup>
                    <h4 className="m-b-medium-30">Application optimization</h4>
                    <p className="opacity-default-60">
                      User analytics can be used to monitor and analyze user
                      behavior on websites and applications, such as clicks,
                      scrolls, and page views. This information can be used to
                      identify areas where users may be experiencing
                      difficulties or frustration and take steps to improve the
                      product and the user experience.
                    </p>
                    <br />
                    <h4 className="m-b-medium-30">Product development</h4>
                    <p className="opacity-default-60">
                      To gain insights into how users interact with products,
                      such as how often they use certain features, user
                      analytics can be useful. This information is used to
                      inform the product development team and improve user
                      experience.
                    </p>
                    <br />
                    <h4 className="m-b-medium-30">User engagement</h4>
                    <p className="opacity-default-60">
                      To increase user engagement and retention, user analytics
                      is used to monitor and analyze information such as how
                      often users return to a website or application, or how
                      long they spend using a particular product. By increasing
                      the number of insights into user behavior and preferences,
                      organizations can make informed decisions that lead to
                      better user experiences and increased customer
                      satisfaction to drive business outcomes.
                    </p>
                  </hgroup>
                </section>
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
