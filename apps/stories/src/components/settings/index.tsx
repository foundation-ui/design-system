import React from "react";

import {
  Button,
  Dialog,
  Field,
  Switch,
  Portal,
  Tabs,
} from "@foundation-ui/components";
import { ThemeSettings } from "./Theme";
import { AppBehaviorSettings } from "./AppBehavior";
import { LayoutOptionsSettings } from "./LayoutOptions";
import { ShortcutsSettings } from "./Shortcuts";

import { BorderedBox } from "../../styles";

export const AppSettings = () => {
  const [fullscreen, setFullscreen] = React.useState(false);
  // const [unifiedSettings, setUnifiedSettings] = React.useState(true);

  const SETTINGS_OPTIONS = [
    {
      disabled: false,
      id: "app-settings-trigger",
      value: "appsettings",
      label: "Application",
    },
    {
      disabled: false,
      value: "shortcuts",
      label: "Shortcuts",
    },
    {
      disabled: true,
      id: "",
      value: "automations",
      label: "Automations",
    },
  ];

  return (
    <Portal container="dialog-portal">
      <Tabs.Root>
        <Dialog key={`${fullscreen}`} sizing={fullscreen ? "large" : "medium"}>
          <section className="flex align-start justify-between m-b-medium-80">
            <hgroup>
              <h2>Settings</h2>
            </hgroup>

            <Dialog.Menu className="flex g-medium-30">
              <Button
                variant="ghost"
                sizing="small"
                onClick={() => setFullscreen(!fullscreen)}
              >
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="currentColor"
                >
                  {fullscreen ? (
                    <path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z" />
                  ) : (
                    <path d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z" />
                  )}
                </svg>
              </Button>
              <Dialog.Trigger variant="ghost" sizing="small">
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="currentColor"
                >
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </Dialog.Trigger>
            </Dialog.Menu>
          </section>

          <BorderedBox className="flex align-center justify-between g-medium-30 m-b-medium-60 p-y-medium-60">
            <Tabs defaultOpen="appsettings" className="flex g-medium-30">
              {SETTINGS_OPTIONS.map((option, key) => (
                <Tabs.Trigger
                  key={`${key}_${option.value}`}
                  disabled={option.disabled}
                  value={option.value}
                  id={option.id}
                >
                  {option.label}
                </Tabs.Trigger>
              ))}
            </Tabs>

            {/* <Switch.Root>
              <div className="flex align-center g-medium-30">
                <Field.Meta className="opacity-default-60">
                  Sync with Unified Properties
                </Field.Meta>
                <Switch
                  defaultChecked
                  variant="secondary"
                  onClick={() => setUnifiedSettings(!unifiedSettings)}
                >
                  <Switch.Thumb />
                </Switch>
              </div>
            </Switch.Root> */}
          </BorderedBox>

          <Tabs.Content value="appsettings" className="grid g-medium-80">
            <ThemeSettings />
            {/* <AppBehaviorSettings /> */}
            <LayoutOptionsSettings />
          </Tabs.Content>

          <Tabs.Content value="shortcuts" className="grid g-medium-80">
            <ShortcutsSettings />
          </Tabs.Content>

          <footer className="flex g-medium-30 justify-start m-t-medium-80">
            <Button variant="primary" sizing="medium">
              Save changes
            </Button>
            <Dialog.Trigger variant="border" sizing="medium">
              Close settings
            </Dialog.Trigger>
          </footer>
        </Dialog>
        <Dialog.Overlay />
      </Tabs.Root>
    </Portal>
  );
};
