import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Overlay, Button } from "..";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Overlay are used to display content on top of the current layer.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the overlay.
 * - Ensure that the overlay is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the overlay.
 * - Ensure that the overlay is responsive and adapts to different screen sizes and orientations.
 *
 */
const meta = {
  title: "Components/Overlay",
  component: Overlay,
  tags: ["autodocs"],
} satisfies Meta<typeof Overlay>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    visible: false,
    closeOnInteract: false,
  },
  render: ({ ...args }) => {
    const [displayed, setDisplayed] = React.useState(args.visible);
    return (
      <React.Fragment>
        <Button onClick={() => setDisplayed(true)}>Show</Button>
        <Overlay visible={displayed} />
      </React.Fragment>
    );
  },
};
export const Visible: Story = {
  args: {
    raw: false,
    visible: true,
    closeOnInteract: false,
  },
  render: ({ ...args }) => <Overlay visible={args.visible} />,
};
export const CloseOnInteraction: Story = {
  args: {
    raw: false,
    visible: true,
    closeOnInteract: true,
  },
  render: ({ ...args }) => (
    <Overlay visible={args.visible} closeOnInteract={args.closeOnInteract} />
  ),
};
