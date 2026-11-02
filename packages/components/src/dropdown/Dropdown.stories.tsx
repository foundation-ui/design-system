import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Divider, DropdownMenu, Page } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Dropdown are used to expand and collapse list of actions.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the dropdown menu content.
 * - Ensure that the dropdown menu can be opened and closed using the keyboard.
 * - Ensure that the dropdown menu is visibly focused when opened using the keyboard.
 * - Ensure that the dropdown menu is dismissed when the user clicks outside of it or presses the Esc key.
 *
 */
const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <DropdownMenu.Root>
      <DropdownMenu>
        <DropdownMenu.Trigger variant="secondary" sizing="small" shape="round">
          Actions
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="flex flex-column">
          <DropdownMenu.Item className="fs-medium-10">Cut</DropdownMenu.Item>
          <DropdownMenu.Item className="fs-medium-10">Copy</DropdownMenu.Item>
          <DropdownMenu.Item className="fs-medium-10">Paste</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <React.Fragment>
      {["small", "medium", "large"].map((variant) => (
        <DropdownMenu.Root>
          <DropdownMenu>
            <DropdownMenu.Trigger
              variant="secondary"
              sizing="small"
              shape="round"
            >
              {variant}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content sizing={variant as any}>
              <DropdownMenu.Item className="fs-medium-10">
                Cut
              </DropdownMenu.Item>
              <DropdownMenu.Item className="fs-medium-10">
                Copy
              </DropdownMenu.Item>
              <DropdownMenu.Item className="fs-medium-10">
                Paste
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </DropdownMenu.Root>
      ))}
    </React.Fragment>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <React.Fragment>
      {["body", "contrast"].map((variant) => (
        <DropdownMenu.Root>
          <DropdownMenu>
            <DropdownMenu.Trigger
              variant="secondary"
              sizing="small"
              shape="round"
            >
              {variant}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content sizing="small" variant={variant as any}>
              <DropdownMenu.Item className="fs-medium-10">
                Cut
              </DropdownMenu.Item>
              <DropdownMenu.Item className="fs-medium-10">
                Copy
              </DropdownMenu.Item>
              <DropdownMenu.Item className="fs-medium-10">
                Paste
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </DropdownMenu.Root>
      ))}
    </React.Fragment>
  ),
};
export const RadioItem: Story = {
  render: ({ ...args }) => (
    <DropdownMenu.Root>
      <DropdownMenu>
        <DropdownMenu.Trigger variant="secondary" sizing="small" shape="round">
          Actions
        </DropdownMenu.Trigger>

        <DropdownMenu.Content sizing="small">
          <DropdownMenu.Item radio className="fs-medium-10">
            Cut
          </DropdownMenu.Item>
          <DropdownMenu.Item radio className="fs-medium-10">
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item radio className="fs-medium-10">
            Paste
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
