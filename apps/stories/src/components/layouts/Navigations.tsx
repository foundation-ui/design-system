import React from "react";
import { useApp } from "../../contexts/AppProvider";
import { ColorModeContext } from "@foundation-ui/tokens";
import {
  Page,
  Button,
  Badge,
  Dialog,
  Avatar,
  DropdownMenu,
  Divider,
  Portal,
  Checkbox,
  Sheet,
} from "@foundation-ui/components";

import { TComponentVariant } from "../../../../../types";
import uiprops from "../../mocks/settings.json";

export const ExternalLinksNavigation = () => {
  const { ab_testing } = useApp();

  return (
    <Page.Navigation className="flex justify-between align-center">
      <small className="flex g-medium-30 align-center">
        <span style={{ opacity: 0.3 }}>
          [v0.0.1-
          {ab_testing.version === uiprops.ab.versions?.default ? "A" : "B"}]
        </span>
        <Sheet.Root>
          <Sheet.Trigger>
            <svg viewBox="0 0 24 24">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4z" />
              <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5.99 13c-.59 0-1.05-.47-1.05-1.05 0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04-.01.58-.45 1.05-1.04 1.05m2.5-6.17c-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c0-.41-.06-1.08.26-1.65.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.61.58 1.73.01 2.57" />
            </svg>
          </Sheet.Trigger>

          <Portal container="dialog-portal">
            <Sheet side="right" sizing="large">
              <div className="grid justify-between">
                <hgroup className="grid g-medium-30">
                  <h3>AB Testing</h3>
                  <small className="opacity-default-60">
                    AB is a statistical comparison method used to compare
                    different variations of a basic version of an element and is
                    used in this Application.
                    <br />
                    Your interaction data will be anonymized and used only for
                    the purpose of this test. We will not use your personal
                    information for any other purposes without your consent. By
                    continuing, you agree to participate in this test and
                    understand that your interactions will be recorded and
                    analyzed anonymously as described above. If you have any
                    concerns or do not wish to participate, you may exit this
                    test at any time without any negative consequences.
                  </small>
                  <Checkbox.Root>
                    <label
                      className="flex align-center g-medium-30"
                      htmlFor="consent"
                      id="consent-label"
                    >
                      <Checkbox
                        id="consent"
                        name="consent"
                        variant="border"
                        sizing="small"
                        defaultChecked
                        onChange={() => null}
                      >
                        <Checkbox.Indicator />
                      </Checkbox>
                      <small>Agree to the terms of consent</small>
                    </label>
                  </Checkbox.Root>
                </hgroup>
              </div>
            </Sheet>
          </Portal>
        </Sheet.Root>
      </small>

      <ul className="flex g-medium-30 align-center">
        <Button id="useless-trigger" variant="border" sizing="small">
          Documentation
        </Button>
        <Button id="useless-trigger" variant="border" sizing="small">
          Feedback
        </Button>
        <Button id="useless-trigger" variant="border" sizing="small">
          Assistance
        </Button>
      </ul>
    </Page.Navigation>
  );
};

export const InternalActionsNavigation = () => {
  const { colorMode, setColorMode } = React.useContext(ColorModeContext);
  const { ab_testing, user_behavior_analytics } = useApp();

  const [emphasisVariant, setEmphasisVariant] =
    React.useState<TComponentVariant>("border");
  const deferredVariant = React.useDeferredValue(emphasisVariant);

  React.useEffect(() => {
    if (
      user_behavior_analytics &&
      user_behavior_analytics.time_before_interact
    ) {
      const interfactionFreqThreshold = 5;
      const targetTriggerFrequency = user_behavior_analytics.interactions.find(
        (interaction: any) => interaction.origin === "useless-trigger"
      )?.frequency;
      const refTriggerFrequency = user_behavior_analytics.interactions.find(
        (interaction: any) => interaction.origin === "settings-funnel-trigger"
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

  return (
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
              <small>⋮</small>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <li className="grid p-medium-30">
                <b>Niki#1234</b>
                <small className="opacity-default-60">mail@example.com</small>
              </li>
              <Divider />
              <DropdownMenu.Item className="flex align-center justify-between">
                Open profile
                <Badge variant="border">Shift&nbsp;+&nbsp;P</Badge>
              </DropdownMenu.Item>
              <Divider />
              <DropdownMenu.Item>Teams</DropdownMenu.Item>
              <DropdownMenu.Item>Members</DropdownMenu.Item>
              <Divider />
              <DropdownMenu.Item
                radio
                className="flex align-center justify-between"
                onClick={() =>
                  setColorMode(colorMode === "dark" ? "light" : "dark")
                }
              >
                Mode
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width={12}
                  height={12}
                  fill="currentColor"
                >
                  {colorMode === "dark" ? (
                    <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z" />
                  ) : (
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1" />
                  )}
                </svg>
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
                ab_testing.variant?.components?.buttonsVariant ||
                deferredVariant
              }
              sizing={ab_testing.variant?.components?.buttonsSize || "medium"}
            >
              Workspaces
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item className="flex align-center justify-between">
                New Workspace
                <Badge variant="border">Shift&nbsp;+&nbsp;N</Badge>
              </DropdownMenu.Item>
              <Divider />
              <DropdownMenu.Item>All workspaces</DropdownMenu.Item>
              <DropdownMenu.Item>Team workspaces</DropdownMenu.Item>
              <DropdownMenu.Item>Personal workspaces</DropdownMenu.Item>
              <Divider />
              <DropdownMenu.Item>Drafts</DropdownMenu.Item>
              <DropdownMenu.Item>History</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </DropdownMenu.Root>

        <Button
          id="collections-funnel-trigger"
          variant={
            ab_testing.variant?.components?.buttonsVariant || deferredVariant
          }
          sizing={ab_testing.variant?.components?.buttonsSize || "medium"}
        >
          Collections
        </Button>

        <Dialog.Trigger
          id="settings-funnel-trigger"
          variant={deferredVariant}
          sizing={ab_testing.variant?.components?.buttonsSize || "medium"}
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
  );
};
