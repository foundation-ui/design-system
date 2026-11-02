import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Badge,
  Breadcrumb,
  Drawer,
  DropdownMenu,
  Loader,
  Page,
  Pill,
  ScrollArea,
  Shimmer,
  Skeleton,
} from "@usefui/components";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Drawer",
  component: Drawer,
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
} satisfies Meta<typeof Drawer>;
export default meta;

type Story = StoryObj<typeof meta>;

const DrawerContent = () => {
  return (
    <React.Fragment>
      <Drawer.Menu className="w-100 justify-between flex align-center g-medium-30 p-medium-30">
        <div className="flex align-center g-medium-30">
          <Loader.Dither sizing="small" />
          <Shimmer className="fs-medium-20">chambellan code:validate</Shimmer>
        </div>
      </Drawer.Menu>

      <ScrollArea className="w-100 h-100 m-b-medium-60" scrollbar>
        <div className="p-x-medium-30 ">
          <p className="fs-medium-20 opacity-default-30">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            fugit pariatur eveniet mollitia quam nihil hic magnam, commodi
            dignissimos minima molestias facere animi et architecto error
            molestiae itaque quibusdam veritatis! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Sed atque odio voluptatibus provident
            nostrum expedita nobis magnam nisi aperiam fuga. Ut quis alias
            debitis dolorum. Cupiditate reiciendis quisquam doloribus! Nobis?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            repellendus, illo consequatur laudantium nihil reiciendis sit,
            similique facere quaerat atque id eius, soluta ab aperiam
            dignissimos enim officiis quos labore?Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Officia quis voluptates rerum amet
            iure rem ab praesentium libero vero, sint pariatur fugiat enim cum
            facere optio incidunt voluptatum. Aliquid, sunt? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Adipisci, fugit pariatur
            eveniet mollitia quam nihil hic magnam, commodi dignissimos minima
            molestias facere animi et architecto error molestiae itaque
            quibusdam veritatis! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Sed atque odio voluptatibus provident nostrum
            expedita nobis magnam nisi aperiam fuga. Ut quis alias debitis
            dolorum. Cupiditate reiciendis quisquam doloribus! Nobis? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Magni
            repellendus, illo consequatur laudantium nihil reiciendis sit,
            similique facere quaerat atque id eius, soluta ab aperiam
            dignissimos enim officiis quos labore?Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Officia quis voluptates rerum amet
            iure rem ab praesentium libero vero, sint pariatur fugiat enim cum
            facere optio incidunt voluptatum. Aliquid, sunt? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Adipisci, fugit pariatur
            eveniet mollitia quam nihil hic magnam, commodi dignissimos minima
            molestias facere animi et architecto error molestiae itaque
            quibusdam veritatis! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Sed atque odio voluptatibus provident nostrum
            expedita nobis magnam nisi aperiam fuga. Ut quis alias debitis
            dolorum. Cupiditate reiciendis quisquam doloribus! Nobis? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Magni
            repellendus, illo consequatur laudantium nihil reiciendis sit,
            similique facere quaerat atque id eius, soluta ab aperiam
            dignissimos enim officiis quos labore?Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Officia quis voluptates rerum amet
            iure rem ab praesentium libero vero, sint pariatur fugiat enim cum
            facere optio incidunt voluptatum. Aliquid, sunt?
          </p>
        </div>
      </ScrollArea>
    </React.Fragment>
  );
};

export const TopToBottom: Story = {
  render: ({ ...args }) => (
    <Drawer.Root>
      <Drawer.Trigger position="top" />
      <Drawer
        className="flex flex-column g-medium-30"
        direction="top-bottom"
        sizing="small"
      >
        <Drawer.Trigger position="bottom" gap={0} />

        <DrawerContent />
      </Drawer>
      <Drawer.Overlay closeOnInteract />
    </Drawer.Root>
  ),
};
export const RightToLeft: Story = {
  render: ({ ...args }) => (
    <Drawer.Root>
      <Drawer.Trigger position="right" />
      <Drawer direction="right-left" sizing="large">
        <Drawer.Trigger position="left" gap={0} />
        <Drawer.Menu className="w-100 justify-start flex align-center g-medium-30 p-medium-30 p-r-medium-80">
          <Loader.Dither sizing="small" />
          <Shimmer className="fs-medium-20">chambellan code:validate</Shimmer>
        </Drawer.Menu>
      </Drawer>
      <Drawer.Overlay closeOnInteract />
    </Drawer.Root>
  ),
};
export const BottomToTop: Story = {
  render: ({ ...args }) => (
    <Drawer.Root>
      <Drawer.Trigger position="bottom" />
      <Drawer className="flex flex-column g-medium-30" direction="bottom-top">
        <Drawer.Trigger position="top" gap={0} />

        <DrawerContent />
      </Drawer>
      <Drawer.Overlay closeOnInteract />
    </Drawer.Root>
  ),
};
export const LeftToRight: Story = {
  render: ({ ...args }) => (
    <Drawer.Root>
      <Drawer.Trigger position="left" />
      <Drawer direction="left-right" sizing="small">
        <Drawer.Trigger position="right" gap={0} />
        <Drawer.Menu className="w-100 justify-start flex align-center g-medium-30 p-medium-30 p-l-medium-80">
          <Loader.Dither sizing="small" />
          <Shimmer className="fs-medium-20">chambellan code:validate</Shimmer>
        </Drawer.Menu>
      </Drawer>
      <Drawer.Overlay closeOnInteract />
    </Drawer.Root>
  ),
};

export const Shortcut: Story = {
  render: ({ ...args }) => (
    <Drawer.Root>
      <Drawer.Trigger position="bottom" />

      <section className="flex flex-column g-medium-10 align-center justify-center">
        <div className="flex align-center g-medium-30">
          <Drawer.Control variant="ghost" sizing="small">
            Open Drawer
          </Drawer.Control>
          <Breadcrumb.Separator />
          <Badge variant="secondary" sizing="small">
            <span className="fs-small-50 opacity-default-60">
              Shift&nbsp;+&nbsp;K
            </span>
          </Badge>
        </div>
        <p className="fs-small-50 opacity-default-10">
          Click on "Open Drawer", press "Shift+K", Drag or Click the trigger to
          the top to open the drawer.
        </p>
      </section>

      <Drawer
        shortcut
        bindkey="shiftKey"
        hotkey="K"
        sizing="medium"
        className="flex flex-column g-medium-10 h-100"
      >
        <Drawer.Trigger position="top" gap={0} />

        <ScrollArea
          className="w-100 h-100 p-t-medium-40 flex align-center justify-center"
          scrollbar
        >
          <Skeleton
            className="w-100 h-100 flex align-center justify-center"
            shape="smooth"
            sizing="large"
          />
        </ScrollArea>

        <Drawer.Menu className="w-100 justify-between flex align-center g-medium-30 p-medium-30 m-b-medium-60">
          <div className="flex align-center g-medium-30">
            <Loader.Dither sizing="small" />
            <Shimmer className="fs-medium-20">chambellan code:validate</Shimmer>
          </div>

          <Pill sizing="small" shape="smooth" status="warning" />
        </Drawer.Menu>
      </Drawer>
      <Drawer.Overlay closeOnInteract />
    </Drawer.Root>
  ),
};
