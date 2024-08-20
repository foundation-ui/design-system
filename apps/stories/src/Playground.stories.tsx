import React from "react";
import type { Meta } from "@storybook/react";

import {
  useIndexedDB,
  useAppConfiguration,
  useBehaviorAnalytics,
  useABTesting,
  generateOpacityClasses,
} from "@foundation-ui/core";
import { ColorModeContext } from "@foundation-ui/tokens";
import { design_system_themes, js_design_tokens } from "@foundation-ui/tokens";
import { useSaveOnUnload } from "@foundation-ui/hooks";

import {
  Page,
  Toolbar,
  Button,
  Dialog,
  Avatar,
  DropdownMenu,
  Divider,
  Checkbox,
  Field,
  Accordion,
  Table,
} from "@foundation-ui/components";

import { AppSettings } from "./components/settings";

import { Loader3D, ChipBody } from "./styles";
import { TComponentVariant } from "../../../types";

import settings from "./mocks/settings.json";
import ab_variations from "./mocks/ab_testing.json";

{
  /* <TODO>Update ab-config: threshold = odds</TODO> */
  /* <TODO>Extract logic from Layout to a Component API</TODO> */
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
  /* <TODO>Add Island component (https://emilkowal.ski/ui/dynamic-island)</TODO> */
  /* <TODO>Add Resizable component (https://ui.shadcn.com/docs/components/resizable)</TODO> */
}

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
  const [custom_ab, setCustomAb] = React.useState({
    default: 0,
    alternative: 1,
    gamble: 1,
    odds: 2,
  });

  const interaction_data = user_behavior_analytics?.interactions?.flatMap(
    (interaction) => {
      let interaction_types: unknown[] = [];
      let interactions_count: Record<
        string | "click" | "dblclick" | "mouseover",
        number
      > = {
        click: 0,
        dblclick: 0,
        mouseover: 0,
      };

      interaction.events.forEach((event) => {
        if (!interaction_types.includes(event.type))
          interaction_types.push(event.type);
        else {
          if (event.type === "click") interactions_count.click!++;
          if (event.type === "dblclick") interactions_count.dblclick!++;
          if (event.type === "mouseover") interactions_count.mouseover!++;
        }
      });

      const most_frequent = Object.keys(interactions_count).reduce((a, b) =>
        interactions_count[a]! > interactions_count[b]! ? a : b
      );
      const description = `\n
      ${interactions_count[most_frequent]}\n
      out of ${interaction.events.length}\n
      interactions on ${interaction.origin}\n
      ${
        Number(interactions_count[most_frequent]) > 1
          ? `are ${most_frequent}s`
          : `is a ${most_frequent}`
      }`;

      return {
        origin: interaction.origin,
        description: description,
        frequency: `${interaction.events.length}`,
        types: interaction_types,
        most_frequent_interaction: most_frequent,
        last_interaction_time: interaction.events.at(0)?.occured_at,
      };
    }
  );
  const deferred_interaction_data = React.useDeferredValue(interaction_data);

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
                [&nbsp;v0.0.1&nbsp;-&nbsp;
                {ab_testing.version === settings.ab.versions.default
                  ? "A"
                  : "B"}
                &nbsp;]
              </span>
            </small>

            <ul className="flex g-medium-30 align-center">
              <Button id="useless-trigger" variant="ghost" sizing="small">
                Documentation
              </Button>
              <Button id="useless-trigger" variant="ghost" sizing="small">
                Feedback
              </Button>
              <Button id="useless-trigger" variant="ghost" sizing="small">
                Assistance
              </Button>
              <Button
                id="theme-trigger"
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
                    <li className="grid p-medium-30">
                      <b>Niki#1234</b>
                      <small className="opacity-default-60">
                        mail@example.com
                      </small>
                    </li>
                    <Divider />
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
                    id="workspace-funnel-trigger"
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
                id="collections-funnel-trigger"
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
                  id="templates-funnel-trigger"
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
                  id="upload-funnel-trigger"
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
                  id="download-funnel-trigger"
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
                  id="save-funnel-trigger"
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
                  id="automations-funnel-trigger"
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
                    {/* <Toolbar.Item>Shift+A</Toolbar.Item> */}
                  </Toolbar.Section>

                  <Toolbar.Trigger
                    id="nav-funnel-trigger"
                    variant="border"
                    sizing="small"
                  >
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
                    sizing="medium"
                    height="auto"
                    shortcut
                    hotkey="W"
                    bindkey="shiftKey"
                  >
                    <Toolbar.Trigger variant="border" sizing="small">
                      <svg viewBox="0 0 24 24">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4z" />
                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5.99 13c-.59 0-1.05-.47-1.05-1.05 0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04-.01.58-.45 1.05-1.04 1.05m2.5-6.17c-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c0-.41-.06-1.08.26-1.65.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.61.58 1.73.01 2.57" />
                      </svg>
                    </Toolbar.Trigger>

                    <Toolbar.Section>
                      <hgroup className="grid g-medium-10 m-y-medium-60">
                        <p>Configure AB Testing</p>
                        <p
                          className="opacity-default-60 "
                          style={{
                            maxWidth: "var(--breakpoint-tablet-small)",
                          }}
                        >
                          AB is a statistical comparison method used to compare
                          different variations of a basic version of an element
                          and is used in this Application.
                        </p>
                      </hgroup>

                      <form className="flex g-medium-30">
                        <Field.Root>
                          <Field.Wrapper>
                            <Field.Label optional>Default version</Field.Label>
                            <Field
                              type="number"
                              name="default-ab-version"
                              variant="secondary"
                              sizing="medium"
                              placeholder=""
                              value={custom_ab.default}
                              onChange={(event) =>
                                setCustomAb((prevItems) => ({
                                  ...prevItems,
                                  default: Number(event.target.value),
                                }))
                              }
                            />
                          </Field.Wrapper>
                        </Field.Root>
                        <Field.Root>
                          <Field.Wrapper>
                            <Field.Label optional>Target version</Field.Label>
                            <Field
                              type="number"
                              name="target-ab-version"
                              variant="secondary"
                              sizing="medium"
                              placeholder=""
                              value={custom_ab.alternative}
                              onChange={(event) =>
                                setCustomAb((prevItems) => ({
                                  ...prevItems,
                                  alternative: Number(event.target.value),
                                }))
                              }
                            />
                          </Field.Wrapper>
                        </Field.Root>
                        <Field.Root>
                          <Field.Wrapper>
                            <Field.Label optional>Trigger Key</Field.Label>
                            <Field
                              type="number"
                              name="ab-trigger-key"
                              variant="secondary"
                              sizing="medium"
                              placeholder=""
                              value={custom_ab.gamble}
                              onChange={(event) =>
                                setCustomAb((prevItems) => ({
                                  ...prevItems,
                                  gamble: Number(event.target.value),
                                }))
                              }
                            />
                          </Field.Wrapper>
                        </Field.Root>
                        <Field.Root>
                          <Field.Wrapper>
                            <Field.Label optional>Threshold</Field.Label>
                            <Field
                              type="number"
                              name="ab-treshold"
                              variant="secondary"
                              sizing="medium"
                              placeholder=""
                              value={custom_ab.odds}
                              onChange={(event) =>
                                setCustomAb((prevItems) => ({
                                  ...prevItems,
                                  threshold: Number(event.target.value),
                                }))
                              }
                            />
                          </Field.Wrapper>
                        </Field.Root>
                      </form>
                    </Toolbar.Section>
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
                    {/* <Toolbar.Item>Shift+D</Toolbar.Item> */}
                  </Toolbar.Section>

                  <Toolbar.Trigger
                    id="tools-funnel-trigger"
                    variant="border"
                    sizing="small"
                  >
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
            height="display"
            shortcut={
              deferred_interaction_data &&
              deferred_interaction_data.length !== 0
            }
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
              </React.Fragment>
            }
            triggerProps={{
              sizing: "small",
              variant: "border",
              disabled:
                !deferred_interaction_data ||
                deferred_interaction_data.length === 0,
            }}
          >
            {deferred_interaction_data &&
              deferred_interaction_data.length !== 0 && (
                <div className="m-y-medium-60">
                  <hgroup className="m-b-medium-30 flex align-center g-medium-30">
                    <Field.Root>
                      <Field.Wrapper>
                        <Field
                          name="search-uba"
                          variant="secondary"
                          sizing="medium"
                          placeholder="Search.."
                          onChange={() => null}
                        />
                      </Field.Wrapper>
                    </Field.Root>
                    <DropdownMenu.Root>
                      <DropdownMenu>
                        <DropdownMenu.Trigger variant="border" sizing="medium">
                          Columns
                          <svg
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M3 9h14V7H3zm0 4h14v-2H3zm0 4h14v-2H3zm16 0h2v-2h-2zm0-10v2h2V7zm0 6h2v-2h-2z" />
                          </svg>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content side="left" sizing="medium">
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Origin<b>✓</b>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Description<b>✓</b>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Frequency<b>✓</b>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Last interaction<b>✓</b>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>
                    </DropdownMenu.Root>
                    <DropdownMenu.Root>
                      <DropdownMenu>
                        <DropdownMenu.Trigger variant="border" sizing="medium">
                          Filter by
                          <svg
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M7 6h10l-5.01 6.3zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61" />
                          </svg>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content side="left" sizing="small">
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Click<b>◭</b>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Dbl Click<b>◭◭</b>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Hover<b>❏</b>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>
                    </DropdownMenu.Root>
                    <DropdownMenu.Root>
                      <DropdownMenu>
                        <DropdownMenu.Trigger variant="border" sizing="medium">
                          Sort by
                          <svg
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99zM9 3 5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99zM9 3 5 6.99h3V14h2V6.99h3z"></path>
                          </svg>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content side="left" sizing="small">
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Asc<b>↑</b>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="flex align-center justify-between">
                            Desc<b>↓</b>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>
                    </DropdownMenu.Root>
                  </hgroup>

                  <Table>
                    <Table.Head>
                      <Table.Row>
                        <Table.HeadCell>
                          <Checkbox.Root>
                            <Checkbox onChange={() => null}>
                              <Checkbox.Indicator />
                            </Checkbox>
                          </Checkbox.Root>
                        </Table.HeadCell>
                        <Table.HeadCell>Origin</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Frequency</Table.HeadCell>
                        <Table.HeadCell>Types</Table.HeadCell>
                        <Table.HeadCell>
                          <DropdownMenu.Root>
                            <DropdownMenu>
                              <DropdownMenu.Trigger
                                variant="ghost"
                                sizing="small"
                              >
                                Most frequent<b>⋮</b>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Content side="left" sizing="small">
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Click<b>◭</b>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Dbl Click<b>◭◭</b>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Hover<b>❏</b>
                                </DropdownMenu.Item>
                                <Divider />
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Hide<b>✗</b>
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu>
                          </DropdownMenu.Root>
                        </Table.HeadCell>
                        <Table.HeadCell>
                          <DropdownMenu.Root>
                            <DropdownMenu>
                              <DropdownMenu.Trigger
                                variant="ghost"
                                sizing="small"
                              >
                                Last interaction<b>⋮</b>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Content side="left" sizing="small">
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Asc<b>↑</b>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Desc<b>↓</b>
                                </DropdownMenu.Item>
                                <Divider />
                                <DropdownMenu.Item className="flex align-center justify-between">
                                  Hide<b>✗</b>
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu>
                          </DropdownMenu.Root>
                        </Table.HeadCell>

                        <Table.HeadCell />
                      </Table.Row>
                    </Table.Head>

                    <Table.Body>
                      {deferred_interaction_data.map(
                        (interaction: any, parent_key) => (
                          <Table.Row key={parent_key}>
                            <Table.Cell>
                              <Checkbox.Root>
                                <Checkbox onChange={() => null}>
                                  <Checkbox.Indicator />
                                </Checkbox>
                              </Checkbox.Root>
                            </Table.Cell>
                            {Object.keys(interaction).map((obj_key, key) => (
                              <Table.Cell key={`${obj_key}_${key}`}>
                                <div className="flex flex-wrap align-center g-medium-10">
                                  {typeof interaction[obj_key] === typeof ""
                                    ? interaction[obj_key]
                                    : interaction[obj_key]?.map(
                                        (item: string) => (
                                          <ChipBody
                                            key={item}
                                            className="fs-medium-10 p-y-medium-10 p-x-medium-30"
                                          >
                                            <code>{item}</code>
                                          </ChipBody>
                                        )
                                      )}
                                </div>
                              </Table.Cell>
                            ))}
                            <Table.Cell>
                              <Button sizing="small" variant="border">
                                Delete
                                <svg
                                  focusable="false"
                                  aria-hidden="true"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H7.07L2.4 12l4.66-7H22zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
                                </svg>
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                </div>
              )}
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
        <section className="p-x-medium-30 p-y-medium-80">
          <hgroup className="m-b-medium-60">
            <h3>Playground</h3>
          </hgroup>
        </section>
      </Layout>
    );
  },
};

export default meta;
