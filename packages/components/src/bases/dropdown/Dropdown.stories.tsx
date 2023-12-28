import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from ".";
import { ButtonVariantEnum } from "../button";

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
    container: "portal",
    defaultOpen: false,
    side: "left",
    radio: false,
    raw: false,
    disabled: false,
  },

  render: ({ ...args }) => (
    <Wrapper>
      <div id="portal" />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          variant={ButtonVariantEnum.Tertiary}
          onClick={() => console.log("Click")}
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
              <small>Dropdown Items</small>
              <DropdownMenu.Item
                raw={args.raw}
                radio={args.radio}
                disabled={args.disabled}
                onClick={() => console.log("Click static")}
              >
                Item sample
              </DropdownMenu.Item>

              <small>Static items</small>
              <hr />
              {Array.from("🦆🦉🦩🐥").map((item: string, key: number) => (
                <DropdownMenu.Item
                  radio
                  key={item}
                  raw={args.raw}
                  disabled={key === 1}
                  onClick={() => console.log(`${item} clicked`)}
                >
                  Static Item sample&nbsp;{item}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Wrapper>
  ),
};
