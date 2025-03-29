import React from "react";
import styled from "styled-components";

import type { Meta } from "@storybook/react";

import { Icon } from "./";

const meta = {
  title: "Icon/Library",
  component: Icon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Icon>;
export default meta;

const IconList = [
  <Icon.Image />,
  <Icon.Chat />,
  <Icon.Sort />,
  <Icon.Click />,
  <Icon.Scroll />,
  <Icon.Sparkles />,
  <Icon.Category />,
  <Icon.BounceArrow />,
  <Icon.ArrowRight />,
  <Icon.Archive />,
  <Icon.Success />,
  <Icon.Pause />,
  <Icon.Timer />,
  <Icon.Calendar />,
  <Icon.Code />,
  <Icon.HTML />,
  <Icon.Drag />,
  <Icon.WebSearch />,
  <Icon.Globe />,
  <Icon.Coin />,
  <Icon.Visible />,
  <Icon.Diamond />,
  <Icon.Light />,
  <Icon.Dark />,
  <Icon.Flow />,
  <Icon.Add />,
  <Icon.Run />,
  <Icon.Key />,
  <Icon.Cloud />,
  <Icon.Transform />,
  <Icon.Github />,
  <Icon.Contrast />,
  <Icon.Info />,
  <Icon.Grid />,
  <Icon.Warning />,
  <Icon.Preview />,
  <Icon.Table />,
  <Icon.DoubleChevron />,
  <Icon.Folders />,
  <Icon.Activity />,
  <Icon.Engine />,
  <Icon.Analytics />,
  <Icon.Decisions />,
  <Icon.Reports />,
  <Icon.Settings />,
  <Icon.Api />,
  <Icon.NewWindow />,
  <Icon.Feedback />,
  <Icon.Support />,
  <Icon.Profile />,
  <Icon.Account />,
  <Icon.Keyboard />,
  <Icon.Perfs />,
  <Icon.Logout />,
  <Icon.Team />,
  <Icon.Deleted />,
  <Icon.Reload />,
  <Icon.CloseChevron />,
  <Icon.AddUser />,
  <Icon.Close />,
  <Icon.Search />,
  <Icon.Help />,
  <Icon.SelectAll />,
  <Icon.Date />,
  <Icon.Option />,
  <Icon.Download />,
  <Icon.Actions />,
  <Icon.DownloadNotes />,
  <Icon.DataObject />,
  <Icon.DataSet />,
  <Icon.Models />,
  <Icon.QuickAction />,
  <Icon.TrendDown />,
  <Icon.TrendUp />,
  <Icon.Filter />,
  <Icon.Color />,
  <Icon.Measurement />,
  <Icon.FontSize />,
  <Icon.Opacity />,
  <Icon.Depth />,
  <Icon.Home />,
  <Icon.ArrowDoubleLeft />,
  <Icon.ArrowDoubleRight />,
  <Icon.More />,
  <Icon.Copy />,
  <Icon.Check />,
];

const GridLayout = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(var(--measurement-large-50)), 1fr)
  );
  grid-gap: 0 0;
  box-sizing: border-box;
`;
const Box = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
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
      {IconList.map((icon, key) => (
        <Box key={key}>
          <Icon>{icon}</Icon>
        </Box>
      ))}
    </GridLayout>
  ),
};
