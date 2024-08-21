import React from "react";
import { useUIProps } from "../../contexts/UIProvider";
import { ColorModeContext } from "@foundation-ui/tokens";
import {
  Page,
  Button,
  Dialog,
  Avatar,
  DropdownMenu,
  Divider,
} from "@foundation-ui/components";
import { TComponentVariant } from "../../../../../types";
import uiprops from "../../mocks/settings.json";

export const ExternalLinksNavigation = () => {
  const { colorMode, setColorMode } = React.useContext(ColorModeContext);
  const { ab_testing } = useUIProps();

  console.log(ab_testing);
  return (
    <Page.Navigation className="flex justify-between align-center">
      <small>
        <code>UUI-Toolkit&nbsp;</code>
        <span style={{ opacity: 0.3 }}>
          [&nbsp;v0.0.1&nbsp;-&nbsp;
          {ab_testing.version === uiprops.ab.versions?.default ? "A" : "B"}
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
          onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
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
  );
};
export const InternalActionsNavigation = () => {
  const { ab_testing, user_behavior_analytics } = useUIProps();

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
              <b>⋮</b>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <li className="grid p-medium-30">
                <b>Niki#1234</b>
                <small className="opacity-default-60">mail@example.com</small>
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
                ab_testing.variant?.components?.buttonsVariant ||
                deferredVariant
              }
              sizing={ab_testing.variant?.components?.buttonsSize || "medium"}
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
