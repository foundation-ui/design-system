import React from "react";
import type { Meta } from "@storybook/react";

import {
  useIndexedDB,
  useAppConfiguration,
  useBehaviorAnalytics,
  useABTesting,
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
  DropdownMenu,
  Divider,
} from "@foundation-ui/components";
import { AppSettings } from "./components/settings";
import { Loader3D, CardBody } from "./styles";
import { TComponentVariant } from "../../../types";

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

  const triggerRef = React.useRef(null);
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

            <ul className="flex g-medium-30 align-center">
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
                variant="border"
                sizing="small"
                onClick={() =>
                  setColorMode(colorMode === "dark" ? "light" : "dark")
                }
              >
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {colorMode === "dark" ? (
                    <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z" />
                  ) : (
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1" />
                  )}
                </svg>
              </Button>
            </ul>
          </Page.Navigation>

          <Page.Menu className="flex justify-between align-center">
            <div className="flex align-center g-medium-30">
              <Avatar
                alt="gh-logo"
                src="https://avatars.githubusercontent.com/u/59123840?v=4"
                sizing="small"
              />
              <DropdownMenu.Root>
                <DropdownMenu>
                  <DropdownMenu.Trigger variant="border" sizing="small">
                    <b>⋮</b>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item className="flex align-center justify-between">
                      Open profile
                      <code>
                        <small>SHIFT&nbsp;+&nbsp;P</small>
                      </code>
                    </DropdownMenu.Item>
                    <Divider />
                    <DropdownMenu.Item>Teams</DropdownMenu.Item>
                    <DropdownMenu.Item>Members</DropdownMenu.Item>
                    <Divider />
                    <DropdownMenu.Item className="flex align-center justify-between">
                      Try Pro
                      <span>✨</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>Features roadmap</DropdownMenu.Item>
                    <Divider />
                    <DropdownMenu.Item className="flex align-center justify-between">
                      Sign out
                      <code>↳</code>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </DropdownMenu.Root>
            </div>

            <ul className="flex align-center g-medium-30">
              <DropdownMenu.Root>
                <DropdownMenu>
                  <DropdownMenu.Trigger
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
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content side="right">
                    <DropdownMenu.Item className="flex align-center justify-between">
                      New Workspace
                      <code>
                        <small>SHIFT&nbsp;+&nbsp;N</small>
                      </code>
                    </DropdownMenu.Item>
                    <Divider />
                    <DropdownMenu.Item>All workspaces</DropdownMenu.Item>
                    <DropdownMenu.Item>Team workspaces</DropdownMenu.Item>
                    <DropdownMenu.Item>Personal workspaces</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </DropdownMenu.Root>

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
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 17v2h6v-2zM3 5v2h10V5zm10 16v-2h8v-2h-8v-2h-2v6zM7 9v2H3v2h4v2h2V9zm14 4v-2H11v2zm-6-4h2V7h4V5h-4V3h-2z"></path>
                </svg>
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

                  <Toolbar.Trigger variant="border" sizing="small">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="m20.5 3-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5M15 19l-6-2.11V5l6 2.11z" />
                    </svg>
                  </Toolbar.Trigger>
                </Toolbar>
              </Toolbar.Root>

              <Page.Wrapper $menus={2} $navigations={2}>
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
                      <svg
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 13h2v-2H3zm0 4h2v-2H3zm0-8h2V7H3zm4 4h14v-2H7zm0 4h14v-2H7zM7 7v2h14V7z" />
                      </svg>
                      <small>Options</small>
                    </Toolbar.Trigger>

                    <Toolbar.Section
                      style={{ overflow: "hidden" }}
                    ></Toolbar.Section>
                  </Toolbar>
                </Toolbar.Root>

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

                  <Toolbar.Trigger variant="border" sizing="small">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="m16.24 11.51 1.57-1.57-3.75-3.75-1.57 1.57-4.14-4.13c-.78-.78-2.05-.78-2.83 0l-1.9 1.9c-.78.78-.78 2.05 0 2.83l4.13 4.13L3 17.25V21h3.75l4.76-4.76 4.13 4.13c.95.95 2.23.6 2.83 0l1.9-1.9c.78-.78.78-2.05 0-2.83zm-7.06-.44L5.04 6.94l1.89-1.9L8.2 6.31 7.02 7.5l1.41 1.41 1.19-1.19 1.45 1.45zm7.88 7.89-4.13-4.13 1.9-1.9 1.45 1.45-1.19 1.19 1.41 1.41 1.19-1.19 1.27 1.27zm3.65-11.92c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.47-.47-1.12-.29-1.41 0l-1.83 1.83 3.75 3.75z" />
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
            trigger={
              <React.Fragment>
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.06 9.94 12 9l2.06-.94L15 6l.94 2.06L18 9l-2.06.94L15 12zM4 14l.94-2.06L7 11l-2.06-.94L4 8l-.94 2.06L1 11l2.06.94zm4.5-5 1.09-2.41L12 5.5 9.59 4.41 8.5 2 7.41 4.41 5 5.5l2.41 1.09zm-4 11.5 6-6.01 4 4L23 8.93l-1.41-1.41-7.09 7.97-4-4L3 19z" />
                </svg>
                <small>Analytics</small>
              </React.Fragment>
            }
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
        <hgroup className="p-medium-30 m-b-medium-60">
          <h3>Page content</h3>
        </hgroup>
      </Layout>
    );
  },
};

export default meta;
