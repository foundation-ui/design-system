import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Breadcrumb,
  Button,
  ComponentSizeEnum,
  Page,
  Toggle,
} from "@usefui/components";
import { Icon } from "@usefui/icons";
import { useColorMode } from "@usefui/components";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Page className="p-medium-30">
        <Page.Content className="flex flex-column align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof meta>;

const UncontrolledToggle = ({
  defaultChecked,
  ...props
}: React.ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = React.useState(Boolean(defaultChecked));

  return (
    <Toggle
      {...props}
      shape="round"
      variant="secondary"
      defaultChecked={defaultChecked}
      onCheckedChange={setChecked}
    >
      {props.children ?? (
        <Icon className="m-y-small-80">
          {checked ? <Icon.Eye /> : <Icon.EyeOff />}
        </Icon>
      )}
    </Toggle>
  );
};

export const Default: Story = {
  render: () => <UncontrolledToggle sizing="small" />,
};

export const DefaultChecked: Story = {
  render: () => <UncontrolledToggle sizing="small" defaultChecked />,
};

export const Controlled: Story = {
  render: () => {
    const { colorMode, setColorMode } = useColorMode();

    const [checked, setChecked] = React.useState(
      Boolean(colorMode === "light"),
    );

    return (
      <div className="flex flex-column align-center g-medium-30">
        <Toggle
          variant={checked ? "primary" : "secondary"}
          sizing="small"
          checked={checked}
          onCheckedChange={(value) => {
            setChecked(value);
            setColorMode(checked ? "dark" : "light");
          }}
        >
          <Icon>{checked ? <Icon.BulbLight /> : <Icon.Bulb />}</Icon>
          {checked ? "On" : "Off"}
        </Toggle>
        <div className="flex align-center g-medium-10 justify-center">
          <Button
            variant="ghost"
            sizing="small"
            onClick={() => {
              setChecked(true);
              setColorMode("light");
            }}
          >
            <Icon opacity={0.1}>
              <Icon.ToggleOn />
            </Icon>
            Turn on
          </Button>
          <Breadcrumb.Separator />
          <Button
            variant="ghost"
            sizing="small"
            onClick={() => {
              setChecked(false);
              setColorMode("dark");
            }}
          >
            <Icon opacity={0.1}>
              <Icon.ToggleOff />
            </Icon>
            Turn off
          </Button>
        </div>
        <p className="fs-small-50 opacity-default-10">
          State is owned by the parent through the checked prop.
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex align-center g-medium-10 justify-center">
      <UncontrolledToggle sizing="small" disabled />
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState<
      Record<string, boolean>
    >({
      primary: false,
      secondary: true,
      tertiary: false,
    });

    return (
      <div className="flex justify-start align-center g-medium-10">
        {Object.keys(checkedItems).map((item) => (
          <Toggle
            key={item}
            name={item}
            shape="round"
            variant="secondary"
            sizing="small"
            checked={checkedItems[item]}
            onCheckedChange={(next) =>
              setCheckedItems((prev) => ({ ...prev, [item]: next }))
            }
          >
            <Icon className="m-y-small-80">
              {checkedItems[item] ? <Icon.Like /> : <Icon.Unlike />}
            </Icon>
          </Toggle>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex justify-start align-center g-medium-30">
      {[
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ].map((size) => (
        <UncontrolledToggle key={size} sizing={size} />
      ))}
    </div>
  ),
};
