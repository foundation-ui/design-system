import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "..";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Add native scroll functionality to custom components.
 */
const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    scrollbar: false,
  },
  render: ({ ...args }) => {
    return (
      <ScrollArea
        className="h-100 w-100 flex align-center justify-center p-large-10"
        style={{ maxWidth: 1024, margin: "0 auto" }}
        {...args}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta autem
        incidunt voluptatum dignissimos, aperiam nostrum, explicabo adipisci
        ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae iusto odit
        temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Dicta autem incidunt voluptatum dignissimos, aperiam nostrum, explicabo
        adipisci ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae
        iusto odit temporibus. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta autem incidunt voluptatum dignissimos, aperiam
        nostrum, explicabo adipisci ipsum magnam iste id accusamus, sed
        inventore ex eaque? Vitae iusto odit temporibus. Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Dicta autem incidunt voluptatum
        dignissimos, aperiam nostrum, explicabo adipisci ipsum magnam iste id
        accusamus, sed inventore ex eaque? Vitae iusto odit temporibus. Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Dicta autem incidunt
        voluptatum dignissimos, aperiam nostrum, explicabo adipisci ipsum magnam
        iste id accusamus, sed inventore ex eaque? Vitae iusto odit temporibus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta autem
        incidunt voluptatum dignissimos, aperiam nostrum, explicabo adipisci
        ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae iusto odit
        temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Dicta autem incidunt voluptatum dignissimos, aperiam nostrum, explicabo
        adipisci ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae
        iusto odit temporibus. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta autem incidunt voluptatum dignissimos, aperiam
        nostrum, explicabo adipisci ipsum magnam iste id accusamus, sed
        inventore ex eaque? Vitae iusto odit temporibus.
      </ScrollArea>
    );
  },
};
export const Scrollbar: Story = {
  args: {
    scrollbar: true,
  },
  render: ({ ...args }) => {
    return (
      <ScrollArea
        className="h-100 w-100 flex align-center justify-center p-large-10"
        style={{ maxWidth: 1024, margin: "0 auto" }}
        {...args}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta autem
        incidunt voluptatum dignissimos, aperiam nostrum, explicabo adipisci
        ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae iusto odit
        temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Dicta autem incidunt voluptatum dignissimos, aperiam nostrum, explicabo
        adipisci ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae
        iusto odit temporibus. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta autem incidunt voluptatum dignissimos, aperiam
        nostrum, explicabo adipisci ipsum magnam iste id accusamus, sed
        inventore ex eaque? Vitae iusto odit temporibus. Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Dicta autem incidunt voluptatum
        dignissimos, aperiam nostrum, explicabo adipisci ipsum magnam iste id
        accusamus, sed inventore ex eaque? Vitae iusto odit temporibus. Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Dicta autem incidunt
        voluptatum dignissimos, aperiam nostrum, explicabo adipisci ipsum magnam
        iste id accusamus, sed inventore ex eaque? Vitae iusto odit temporibus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta autem
        incidunt voluptatum dignissimos, aperiam nostrum, explicabo adipisci
        ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae iusto odit
        temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Dicta autem incidunt voluptatum dignissimos, aperiam nostrum, explicabo
        adipisci ipsum magnam iste id accusamus, sed inventore ex eaque? Vitae
        iusto odit temporibus. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta autem incidunt voluptatum dignissimos, aperiam
        nostrum, explicabo adipisci ipsum magnam iste id accusamus, sed
        inventore ex eaque? Vitae iusto odit temporibus.
      </ScrollArea>
    );
  },
};
