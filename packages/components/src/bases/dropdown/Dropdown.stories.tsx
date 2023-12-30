import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenu } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;
const meta = {
  title: "Components/Bases/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

export const Default = {
  args: {
    raw: false,
    variant: ComponentVariantEnum.Tertiary,
    sizing: ComponentSizeEnum.Medium,
    container: "portal",
    defaultOpen: false,
    side: "left",
    radio: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: [
        ComponentVariantEnum.Primary,
        ComponentVariantEnum.Secondary,
        ComponentVariantEnum.Tertiary,
        ComponentVariantEnum.Ghost,
      ],
      control: { type: "radio" },
    },
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <Wrapper>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          onClick={() => console.log("Click")}
          raw={args.raw}
          variant={args.variant}
          sizing={args.sizing}
        >
          Default Dropdown
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal container={args.container}>
          <DropdownMenu>
            <DropdownMenu.Content
              defaultOpen={args.defaultOpen}
              side={args.side}
              raw={args.raw}
            >
              <DropdownMenu.Item
                raw={args.raw}
                radio={args.radio}
                disabled={args.disabled}
                onClick={() => console.log("Click static")}
              >
                Item sample
              </DropdownMenu.Item>
              {Array.from("🐥🥚🐣🐥🥚🐣🐥🥚🐣🐥").map(
                (item: string, key: number) => (
                  <DropdownMenu.Item
                    radio
                    key={item}
                    raw={args.raw}
                    disabled={key === 1}
                    onClick={() => console.log(`${item} clicked`)}
                  >
                    Static Item sample&nbsp;{item}
                  </DropdownMenu.Item>
                )
              )}
            </DropdownMenu.Content>
          </DropdownMenu>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div id="portal" />
    </Wrapper>
  ),
};
