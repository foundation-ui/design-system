import React from "react";

import { Breadcrumb, Button, Card, Page, Toggle } from "@usefui/components";
import { Icon } from "@usefui/icons";
import { useColorMode } from "@usefui/components";

const meta = {
  title: "Components/ColorMode",

  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <Page className="p-medium-30">
        <Page.Content className="flex flex-column align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};

export default meta;

export const Default = {
  render: () => {
    const { colorMode, resolvedColorMode, setColorMode } = useColorMode();

    return (
      <section className="flex flex-column align-center g-medium-30">
        <hgroup className="flex align-center g-medium-10">
          <p className="text-center fs-medium-10 opacity-default-60">
            <strong>Preference:</strong>&nbsp;{colorMode}
          </p>
          <Breadcrumb.Separator />
          <p className="text-center fs-medium-10 opacity-default-60">
            <strong>Resolved:</strong>&nbsp;{resolvedColorMode}
          </p>
          <Breadcrumb.Separator />
          <p className="text-center fs-medium-10 opacity-default-60">
            <strong>data-theme:</strong>&nbsp;
            {typeof document !== "undefined"
              ? document.documentElement.getAttribute("data-theme")
              : "—"}
          </p>
        </hgroup>

        <nav className="flex g-medium-10">
          <Button sizing="small" onClick={() => setColorMode("system")}>
            <Icon>
              <Icon.MonitorDesktop />
            </Icon>
            System
          </Button>
          <Button
            variant="secondary"
            sizing="small"
            onClick={() => setColorMode("light")}
          >
            <Icon>
              <Icon.Sun />
            </Icon>
            Light
          </Button>
          <Button
            variant="secondary"
            sizing="small"
            onClick={() => setColorMode("dark")}
          >
            <Icon>
              <Icon.Moon />
            </Icon>
            Dark
          </Button>
        </nav>
      </section>
    );
  },
};

export const ToggleSwitch = {
  render: () => {
    const { colorMode, setColorMode } = useColorMode();
    const [checked, setChecked] = React.useState(colorMode === "light");

    React.useEffect(() => {
      setChecked(colorMode === "light");
    }, [colorMode]);

    return (
      <Toggle
        sizing="small"
        variant="secondary"
        checked={checked}
        onCheckedChange={(value) => {
          setChecked(value);
          setColorMode(value ? "light" : "dark");
        }}
      >
        <Icon>{checked ? <Icon.Sun /> : <Icon.Moon />}</Icon>
        {checked ? "Light" : "Dark"}
      </Toggle>
    );
  },
};

export const SystemPreference = {
  render: () => {
    const { resolvedColorMode, setColorMode } = useColorMode();

    return (
      <hgroup className="flex flex-column align-center g-medium-30">
        <p className="text-center fs-medium-10 opacity-default-60">
          Setting the mode to <strong>system</strong> defers to the OS
          preference. Current resolved mode:&nbsp;
          <strong>{resolvedColorMode}</strong>.
        </p>
        <nav className="flex g-medium-10">
          <Button sizing="small" onClick={() => setColorMode("system")}>
            <Icon>
              <Icon.MonitorDesktop />
            </Icon>
            System
          </Button>
          <Button
            variant="secondary"
            sizing="small"
            onClick={() => setColorMode("light")}
          >
            <Icon>
              <Icon.Sun />
            </Icon>
            Light
          </Button>
          <Button
            variant="secondary"
            sizing="small"
            onClick={() => setColorMode("dark")}
          >
            <Icon>
              <Icon.Moon />
            </Icon>
            Dark
          </Button>
        </nav>
      </hgroup>
    );
  },
};
