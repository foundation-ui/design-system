import React from "react";
import type { Meta } from "@storybook/react";

import {
  useIndexedDB,
  useAppConfiguration,
  useBehaviorAnalytics,
  useABTesting,
  generateColorTokens,
  generateMeasurementTokens,
  generateSequenceTokens,
  generateTokensFromTemplate,
  generateTokensLibrary,
  generateCSSVariables,
  generateSizeClasses,
  generateLayoutClasses,
} from "@foundation-ui/core";
import { ColorModeContext } from "@foundation-ui/tokens";
import {
  design_system_themes,
  json_design_tokens_template,
} from "@foundation-ui/tokens";
import { useSaveOnUnload } from "@foundation-ui/hooks";

import {
  Page,
  Toolbar,
  Button,
  Dialog,
  Avatar,
} from "@foundation-ui/components";
import { AppSettings } from "./components/settings";
import { Loader3D, CardBody } from "./styles";
import {
  RatioEnum,
  MeasureVariantEnum,
  TComponentVariant,
} from "../../../types";

import settings from "./mocks/settings.json";
import ab_variations from "./mocks/ab_testing.json";

const meta = {
  title: "Modules/Playground",
  component: Page,
} satisfies Meta<typeof Page>;

const Loader = () => {
  return (
    <section
      className="flex justify-center align-center"
      style={{
        height: "100dvh",
        width: "100%",
      }}
    >
      <Loader3D />
    </section>
  );
};
const Layout = ({ children }: any) => {
  const [emphasisVariant, setEmphasisVariant] =
    React.useState<TComponentVariant>("border");
  const deferredVariant = React.useDeferredValue(emphasisVariant);

  const { colorMode, setColorMode } = React.useContext(ColorModeContext);

  const indexed_db = useIndexedDB(settings.idb);
  const app_config = useAppConfiguration({
    store: "properties",
    key: "app",
    config: {
      idb: settings.idb,
      app_properties: settings.app_properties,
    },
  });
  const user_behavior_analytics = useBehaviorAnalytics({
    silent: !settings.app_properties.options.analytics,
    flags: settings.uba_flags,
  });
  const ab_testing = useABTesting({
    ...settings.ab,
    enabled: Boolean(settings.app_properties.options?.ab),
    variations: ab_variations,
  });

  React.useEffect(() => {
    if (indexed_db.db) {
      Promise.allSettled([
        indexed_db.getDataFromIDB("themes", "app").then((data) => {
          if (!data)
            indexed_db.setDataInIDB("themes", "app", {
              dark: design_system_themes.dark_mono,
              light: design_system_themes.light_mono,
            });
        }),
      ]);
    }
  }, [indexed_db.db]);

  React.useEffect(() => {
    if (
      user_behavior_analytics &&
      user_behavior_analytics.time_before_interact
    ) {
      const interfactionFreqThreshold = 5;
      const targetTriggerFrequency = user_behavior_analytics.interactions.find(
        (interaction) => interaction.origin === "useless-trigger"
      )?.frequency;
      const refTriggerFrequency = user_behavior_analytics.interactions.find(
        (interaction) => interaction.origin === "settings-funnel-trigger"
      )?.frequency;

      return () => {
        if (
          Number(targetTriggerFrequency) > interfactionFreqThreshold ||
          Number(targetTriggerFrequency) > Number(refTriggerFrequency)
        ) {
          setEmphasisVariant("primary");
        }
        if (
          Number(targetTriggerFrequency) <=
          Number(refTriggerFrequency) + interfactionFreqThreshold
        ) {
          setEmphasisVariant("border");
        }
      };
    }
  }, [user_behavior_analytics]);

  useSaveOnUnload({
    url: "api.uui/sandbox",
    payload: {
      ...user_behavior_analytics,
    },
  });

  if (!app_config) return <Loader />;
  return (
    <Dialog.Root>
      <AppSettings />

      <Page>
        <Page.Content>
          <Page.Navigation className="flex justify-between align-center">
            <small>
              <code>UUI-Toolkit&nbsp;</code>
              <span style={{ opacity: 0.3 }}>
                [&nbsp;
                {ab_testing.version === settings.ab.randomize.defaultVersion
                  ? "A"
                  : "B"}
                &nbsp;]
              </span>
            </small>

            <ul className="flex g-medium-60 align-center">
              <Button variant="ghost" sizing="small">
                Documentation
              </Button>
              <Button variant="ghost" sizing="small">
                Feedback
              </Button>
              <Button variant="ghost" sizing="small">
                Assistance
              </Button>
              <Button
                variant="ghost"
                sizing="small"
                onClick={() =>
                  setColorMode(colorMode === "dark" ? "light" : "dark")
                }
              >
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  height={16}
                  width={16}
                  fill="currentColor"
                >
                  {colorMode === "dark" ? (
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z" />
                  ) : (
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1" />
                  )}
                </svg>
              </Button>
            </ul>
          </Page.Navigation>

          <Page.Menu className="flex justify-between align-center">
            <Avatar
              alt="gh-logo"
              src="https://avatars.githubusercontent.com/u/59123840?v=4"
              sizing="small"
            />

            <ul
              className={`flex align-center ${
                ab_testing.version === settings.ab.randomize.defaultVersion
                  ? "g-medium-30"
                  : "g-medium-60"
              }`}
            >
              <Button
                id="useless-trigger"
                variant={
                  (settings.app_properties.options.ab &&
                    ab_testing.variant?.components?.buttonsVariant) ||
                  deferredVariant
                }
                sizing={
                  (settings.app_properties.options.ab &&
                    ab_testing.variant?.components?.buttonsSize) ||
                  "medium"
                }
              >
                Workspaces
              </Button>
              <Button
                id="useless-trigger"
                variant={
                  (settings.app_properties.options.ab &&
                    ab_testing.variant?.components?.buttonsVariant) ||
                  deferredVariant
                }
                sizing={
                  (settings.app_properties.options.ab &&
                    ab_testing.variant?.components?.buttonsSize) ||
                  "medium"
                }
              >
                Collections
              </Button>
              <Dialog.Trigger
                id="settings-funnel-trigger"
                variant={deferredVariant}
                sizing={
                  (settings.app_properties.options.ab &&
                    ab_testing.variant?.components?.buttonsSize) ||
                  "medium"
                }
              >
                Settings
              </Dialog.Trigger>
            </ul>
          </Page.Menu>

          <section>
            <Page.Menu className="flex justify-between align-center">
              <small>
                <code>
                  <span style={{ opacity: 0.3 }}>@team_name/</span>
                  path
                </code>
              </small>
              <ul className="flex g-medium-30 align-center">
                <Button
                  id="useless-trigger"
                  name="templates"
                  title="get-templates"
                  variant="border"
                  sizing="small"
                >
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    fill="currentColor"
                  >
                    <path d="m12 2-5.5 9h11z"></path>
                    <circle cx="17.5" cy="17.5" r="4.5"></circle>
                    <path d="M3 13.5h8v8H3z"></path>
                  </svg>
                </Button>
                <Button
                  id="useless-trigger"
                  name="import"
                  title="import-payload"
                  variant="border"
                  sizing="small"
                >
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    fill="currentColor"
                  >
                    <path d="M5 4v2h14V4zm0 10h4v6h6v-6h4l-7-7z"></path>
                  </svg>
                </Button>
                <Button
                  id="useless-trigger"
                  name="download"
                  title="download-collections"
                  variant="border"
                  sizing="small"
                >
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    fill="currentColor"
                  >
                    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7zm-6 .67 2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"></path>
                  </svg>
                </Button>
                <Button
                  id="useless-trigger"
                  name="sync"
                  title="sync-collections"
                  variant="border"
                  sizing="small"
                >
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    fill="currentColor"
                  >
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4z"></path>
                  </svg>
                </Button>
                <Button
                  id="useless-trigger"
                  name="automations"
                  title="automations-collections"
                  variant="border"
                  sizing="small"
                >
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    fill="currentColor"
                  >
                    <path d="M19.03 3.56c-1.67-1.39-3.74-2.3-6.03-2.51v2.01c1.73.19 3.31.88 4.61 1.92zM11 3.06V1.05c-2.29.2-4.36 1.12-6.03 2.51l1.42 1.42C7.69 3.94 9.27 3.25 11 3.06M4.98 6.39 3.56 4.97C2.17 6.64 1.26 8.71 1.05 11h2.01c.19-1.73.88-3.31 1.92-4.61M20.94 11h2.01c-.21-2.29-1.12-4.36-2.51-6.03l-1.42 1.42c1.04 1.3 1.73 2.88 1.92 4.61M7 12l3.44 1.56L12 17l1.56-3.44L17 12l-3.44-1.56L12 7l-1.56 3.44z" />
                    <path d="M12 21c-3.11 0-5.85-1.59-7.46-4H7v-2H1v6h2v-2.7c1.99 2.84 5.27 4.7 9 4.7 4.87 0 9-3.17 10.44-7.56l-1.96-.45C19.25 18.48 15.92 21 12 21" />
                  </svg>
                </Button>
              </ul>
            </Page.Menu>

            <div className="flex justify-between">
              <Toolbar.Root>
                <Toolbar
                  side="left"
                  sizing="medium"
                  height="auto"
                  shortcut
                  hotkey="A"
                  bindkey="shiftKey"
                >
                  <Toolbar.Section>
                    <Toolbar.Item>Shift+A</Toolbar.Item>
                  </Toolbar.Section>

                  <Toolbar.Trigger variant="ghost" sizing="small">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      height={16}
                      width={16}
                      fill="currentColor"
                    >
                      <path d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z" />
                    </svg>
                  </Toolbar.Trigger>
                </Toolbar>
              </Toolbar.Root>

              <Page.Wrapper menus={2} navigations={2}>
                {children}
              </Page.Wrapper>

              <Toolbar.Root>
                <Toolbar
                  side="right"
                  sizing="large"
                  height="auto"
                  shortcut
                  hotkey="D"
                  bindkey="shiftKey"
                >
                  <Toolbar.Section>
                    <Toolbar.Item>Shift+D</Toolbar.Item>
                  </Toolbar.Section>

                  <Toolbar.Trigger variant="ghost" sizing="small">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      height={16}
                      width={16}
                      fill="currentColor"
                    >
                      <path d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z" />
                    </svg>
                  </Toolbar.Trigger>
                </Toolbar>
              </Toolbar.Root>
            </div>
          </section>

          <Page.Panel
            side="bottom"
            sizing="large"
            shortcut
            hotkey="S"
            bindkey="shiftKey"
            trigger="Shift+S"
            triggerProps={{
              sizing: "small",
              variant: "border",
            }}
          >
            <pre
              style={{
                all: "unset",
                fontSize: "66%",
                opacity: 0.8,
              }}
            >
              <code>{JSON.stringify({ ...user_behavior_analytics })}</code>
            </pre>
          </Page.Panel>
        </Page.Content>
      </Page>
    </Dialog.Root>
  );
};

export const Playground = {
  render: () => {
    return (
      <Layout>
        <Toolbar.Root>
          <Toolbar
            side="top"
            sizing="large"
            height="auto"
            shortcut
            hotkey="W"
            bindkey="shiftKey"
          >
            <Toolbar.Trigger variant="border" sizing="small">
              Shift+W
            </Toolbar.Trigger>

            <Toolbar.Section style={{ overflow: "hidden" }}></Toolbar.Section>
          </Toolbar>
        </Toolbar.Root>

        <hgroup className="p-medium-30 m-b-medium-60">
          <h3>Page content</h3>
        </hgroup>
      </Layout>
    );
  },
};

export default meta;
