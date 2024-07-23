import React from "react";
import styled, { css } from "styled-components";
import type { Meta } from "@storybook/react";

import { ColorModeContext } from "@foundation-ui/tokens";
import { useBehaviorAnalytics, useABTesting } from "@foundation-ui/core";
import { useSaveOnUnload } from "@foundation-ui/hooks";

import { Page, Button } from "@foundation-ui/components";

const meta = {
  title: "Sandbox/Sandbox",
  component: Page,
} satisfies Meta<typeof Page>;
export default meta;

const TRACKED_ITEMS = [
  "primary-funnel-trigger",
  "secondary-funnel-trigger",
  "tertiary-funnel-trigger",
];

const AB_CONFIG = {
  enabled: true,
  randomize: {
    defaultVersion: 0,
    targetVersion: 2,

    triggerKey: 1,
    threshold: 2,
  },
  variations: [
    {
      theme: "dark",
      components: {
        buttonsSize: "medium",
        buttonsVariant: "secondary",
      },
      translations: {
        pageDescription:
          "User Behavior Analytics (UBA) is the process of collecting and analyzing data on the behavior of users within a digital environment, such as a website, application, or network.",
      },
    },
    {
      theme: "dark",
      components: {
        buttonsSize: "large",
        buttonsVariant: "tertiary",
      },
      translations: {
        pageDescription:
          "With the application of user behavior analytics software and tools, you will help your company in the process of identifying and responding to security threats and other risks more quickly and effectively.",
      },
    },
    {
      theme: "light",
      components: {
        buttonsSize: "small",
        buttonsVariant: "primary",
      },
      translations: {
        pageDescription:
          "By monitoring and analyzing user behavior, UBA systems can detect abnormal patterns of activity, such as unauthorized access attempts, unusual login times, and suspicious data transfers.",
      },
    },
  ],
};

const Component = () => {
  const hasMounted = React.useRef(false);
  const colorMode = React.useContext(ColorModeContext);

  const uba = useBehaviorAnalytics(TRACKED_ITEMS);
  const ab = useABTesting(AB_CONFIG);

  React.useEffect(() => {
    hasMounted.current = true;

    return () => {
      hasMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (hasMounted && AB_CONFIG.enabled)
      colorMode.setColorMode(ab?.variant?.theme);
  }, [ab]);

  useSaveOnUnload({
    url: "api.foundation/sandbox",
    payload: { ...uba },
  });

  return (
    <section style={{ height: "100dvh", width: "100%" }}>
      <Page.Content>
        <hgroup className="m-b-medium-80" style={{ width: 768 }}>
          <h2>User Behavior Analytics</h2>
          <p className="m-b-medium-60">
            <small>
              AB version:&nbsp;
              <b>{AB_CONFIG.enabled ? ab.version : "disabled"}</b>
            </small>
          </p>

          <div style={{ opacity: 0.6 }}>
            <p className="m-b-medium-30">
              {(AB_CONFIG.enabled &&
                ab.variant?.translations?.pageDescription) || (
                <>
                  With the application of user behavior analytics software and
                  tools, you will help your company in the process of
                  identifying and responding to security threats and other risks
                  more quickly and effectively.
                </>
              )}
            </p>
          </div>
        </hgroup>

        <p className="m-b-medium-60">
          <b>Time before interaction:</b>&nbsp;{uba.time_before_interact}
        </p>

        <div className="flex g-medium-10 m-b-medium-60">
          {TRACKED_ITEMS.map((item: string, key: number) => (
            <Button
              id={item}
              key={`${item}${key}`}
              variant={
                (AB_CONFIG.enabled && ab.variant?.components?.buttonsVariant) ||
                "mono"
              }
              sizing={
                (AB_CONFIG.enabled && ab.variant?.components?.buttonsSize) ||
                "medium"
              }
            >
              {item}&nbsp;
              {uba.interactions.find(
                (interaction: any) => interaction.origin === item
              )?.frequency || 0}
            </Button>
          ))}
        </div>

        <div className="flex g-medium-10">
          <Button
            variant="tertiary"
            sizing="small"
            onClick={() => ab.forceABVersion(1)}
          >
            Force AB version
          </Button>
          <Button
            variant="tertiary"
            sizing="small"
            onClick={() =>
              console.log({
                ...uba,
                ab,
              })
            }
          >
            Log output
          </Button>
        </div>
      </Page.Content>

      <Page.Panel side="bottom" sizing="medium" fixed defaultOpen>
        <code
          data-emphasis-level="low"
          style={{
            fontSize: "66%",
            opacity: 0.8,
          }}
        >
          {JSON.stringify({ ...uba })}
        </code>
      </Page.Panel>
    </section>
  );
};

export const Sandbox = {
  render: () => {
    return (
      <Page>
        <Component />
      </Page>
    );
  },
};
