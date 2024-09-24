import React from "react";
import type { Meta } from "@storybook/react";

import { AppProvider } from "./contexts/AppProvider";

import { Divider, Page } from "@foundation-ui/components";
import { AppLayout } from "./components/layouts";

import settings from "./mocks/settings.json";

const meta = {
  title: "Modules/Playground",
  component: Page,
} satisfies Meta<typeof Page>;

export const Playground = {
  render: () => {
    const { idb, uba, ab, app } = settings;

    return (
      <AppProvider idb={idb} uba={uba} ab={ab} app={app}>
        <AppLayout>
          <section
            className="p-medium-80 grid g-large-30"
            style={{ maxWidth: 768 }}
          >
            <hgroup>
              <h1 className="m-b-medium-30">User Behavior Analytics</h1>
              <p className="opacity-default-60">
                User Behavior Analytics (UBA) is the process of collecting and
                analyzing data on the behavior of users within a digital
                environment, such as a website, application, or network. UBA is
                increasingly referred to as user and entity behavior analytics
                (UEBA) to reflect that the user is just one category of entities
                with observable behaviors on modern networks. Other entities can
                include processes, applications, and network devices.
              </p>
            </hgroup>

            <hgroup>
              <h2 className="m-b-medium-30">
                What is UEBA and what are the differences with UBA
              </h2>
              <p className="opacity-default-60">
                UEBA stands for User and Entity Behavior Analytics, which is an
                advanced form of UBA (User Behavior Analytics). The main
                difference between UBA and UEBA is that while UBA focuses on the
                behavior of individual users, UEBA takes a broader approach by
                analyzing the behavior of not only users but also entities, such
                as devices, applications, and systems
              </p>
            </hgroup>

            <hgroup>
              <h3 className="m-b-medium-30">
                How and why apply User Analytics
              </h3>
              <p className="opacity-default-60">
                User analytics is applied in various industries and settings to
                gain insights into user behavior and improve user experience. By
                analyzing user behavior, organizations can identify areas where
                users may be experiencing difficulties or frustration, take
                steps to improve their product, and then, improve user
                experience. User analytics allows you to personalize experiences
                and better understand customer needs.
              </p>
            </hgroup>

            <hgroup>
              <h4 className="m-b-medium-30">Application optimization</h4>
              <p className="opacity-default-60">
                User analytics can be used to monitor and analyze user behavior
                on websites and applications, such as clicks, scrolls, and page
                views. This information can be used to identify areas where
                users may be experiencing difficulties or frustration and take
                steps to improve the product and the user experience.
              </p>
              <br />
              <h4 className="m-b-medium-30">Product development</h4>
              <p className="opacity-default-60">
                To gain insights into how users interact with products, such as
                how often they use certain features, user analytics can be
                useful. This information is used to inform the product
                development team and improve user experience.
              </p>
              <br />
              <h4 className="m-b-medium-30">User engagement</h4>
              <p className="opacity-default-60">
                To increase user engagement and retention, user analytics is
                used to monitor and analyze information such as how often users
                return to a website or application, or how long they spend using
                a particular product. By increasing the number of insights into
                user behavior and preferences, organizations can make informed
                decisions that lead to better user experiences and increased
                customer satisfaction to drive business outcomes.
              </p>
            </hgroup>
          </section>
        </AppLayout>
      </AppProvider>
    );
  },
};

export default meta;
