import React from "react";
import styled from "styled-components";

import type { Meta } from "@storybook/react";

import { Icon, PixelIcon, SocialIcon, WebIcon } from "./";
import { PixelIconList, DefaultIconList, IconList } from "./mocks";

const meta = {
  title: "Icon/Library",
  component: WebIcon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WebIcon>;
export default meta;

const GridLayout = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(var(--measurement-large-80)), 1fr)
  );
  grid-gap: 0 0;
  box-sizing: border-box;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-30);
  padding: var(--measurement-large-10);
  border: var(--measurement-small-30) solid var(--font-color-alpha-10);
  background-color: var(--body-color);

  svg {
    fill: var(--font-color);
  }
`;
export const Default = {
  render: () => (
    <GridLayout>
      {DefaultIconList.map(
        (defaultIcon: { name: string; icon: React.ReactNode }, key: number) => (
          <Box key={key}>
            <Icon fill="none" stroke="currentColor" height={24} width={24}>
              {defaultIcon.icon}
            </Icon>

            <p className="fs-medium-10">{defaultIcon.name}</p>
          </Box>
        )
      )}
    </GridLayout>
  ),
};
export const WebIcons = {
  render: () => (
    <GridLayout>
      {IconList.map((icon, key) => (
        <Box key={key}>
          <WebIcon>{icon}</WebIcon>
        </Box>
      ))}
    </GridLayout>
  ),
};
export const PixelIcons = {
  render: () => (
    <GridLayout>
      {PixelIconList.map((icon, key) => (
        <Box key={key}>
          <PixelIcon>{icon}</PixelIcon>
        </Box>
      ))}
    </GridLayout>
  ),
};
export const SocialIcons = {
  render: () => (
    <GridLayout>
      <Box>
        <Icon width={24} height={24}>
          <SocialIcon.Foundation />
        </Icon>
      </Box>
    </GridLayout>
  ),
};
