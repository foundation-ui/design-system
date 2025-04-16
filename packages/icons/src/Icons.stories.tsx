import React from "react";
import styled from "styled-components";

import type { Meta } from "@storybook/react";

import { Icon, PixelIcon, SocialIcon, WebIcon } from "./";

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

const PixelIconList = [
  <PixelIcon.Alert />,
  <PixelIcon.ArrowDown />,
  <PixelIcon.ArrowLeft />,
  <PixelIcon.ArrowRight />,
  <PixelIcon.ArrowUp />,
  <PixelIcon.AspectRatio />,
  <PixelIcon.BookOpen />,
  <PixelIcon.Bookmark />,
  <PixelIcon.Calendar />,
  <PixelIcon.Check />,
  <PixelIcon.CheckDouble />,
  <PixelIcon.ChevronDown />,
  <PixelIcon.ChevronLeft />,
  <PixelIcon.ChevronRight />,
  <PixelIcon.ChevronUp />,
  <PixelIcon.ChevronsHorizontal />,
  <PixelIcon.ChevronsVertical />,
  <PixelIcon.Clipboard />,
  <PixelIcon.Clock />,
  <PixelIcon.Close />,
  <PixelIcon.Cloud />,
  <PixelIcon.CloudDownload />,
  <PixelIcon.Collapse />,
  <PixelIcon.Contrast />,
  <PixelIcon.CornerDownLeft />,
  <PixelIcon.CornerDownRight />,
  <PixelIcon.CornerUpLeft />,
  <PixelIcon.CornerUpRight />,
  <PixelIcon.Crop />,
  <PixelIcon.Dashbaord />,
  <PixelIcon.Debug />,
  <PixelIcon.DebugCheck />,
  <PixelIcon.DebugOff />,
  <PixelIcon.Delete />,
  <PixelIcon.Download />,
  <PixelIcon.Downasaur />,
  <PixelIcon.DropArea />,
  <PixelIcon.DropFull />,
  <PixelIcon.Duplicate />,
  <PixelIcon.EditBox />,
  <PixelIcon.Expand />,
  <PixelIcon.ExternalLink />,
  <PixelIcon.Eye />,
  <PixelIcon.EyeClosed />,
  <PixelIcon.File />,
  <PixelIcon.Flag />,
  <PixelIcon.Folder />,
  <PixelIcon.Gps />,
  <PixelIcon.Hourglass />,
  <PixelIcon.Human />,
  <PixelIcon.HumanHandsdown />,
  <PixelIcon.HumanHandsup />,
  <PixelIcon.HumanRun />,
  <PixelIcon.LabelAlt />,
  <PixelIcon.LayoutFooter />,
  <PixelIcon.LayoutHeader />,
  <PixelIcon.LayoutSidebarLeft />,
  <PixelIcon.LayoutSidebarRight />,
  <PixelIcon.Link />,
  <PixelIcon.List />,
  <PixelIcon.Lock />,
  <PixelIcon.LockOpen />,
  <PixelIcon.Login />,
  <PixelIcon.Logout />,
  <PixelIcon.Map />,
  <PixelIcon.Message />,
  <PixelIcon.Minus />,
  <PixelIcon.MissedCall />,
  <PixelIcon.Moon />,
  <PixelIcon.Move />,
  <PixelIcon.Note />,
  <PixelIcon.Open />,
  <PixelIcon.Pixelarticons />,
  <PixelIcon.Plus />,
  <PixelIcon.Redo />,
  <PixelIcon.Reload />,
  <PixelIcon.Scale />,
  <PixelIcon.Script />,
  <PixelIcon.Search />,
  <PixelIcon.Shuffle />,
  <PixelIcon.Sliders />,
  <PixelIcon.SlidersVertical />,
  <PixelIcon.Sort />,
  <PixelIcon.SpeedMedium />,
  <PixelIcon.SunAlt />,
  <PixelIcon.Sync />,
  <PixelIcon.Timeline />,
  <PixelIcon.Trending />,
  <PixelIcon.Undo />,
  <PixelIcon.Upload />,
  <PixelIcon.User />,
  <PixelIcon.Zap />,
];

const IconList = [
  <WebIcon.Image />,
  <WebIcon.Chat />,
  <WebIcon.Sort />,
  <WebIcon.Click />,
  <WebIcon.Scroll />,
  <WebIcon.Sparkles />,
  <WebIcon.Category />,
  <WebIcon.BounceArrow />,
  <WebIcon.ArrowRight />,
  <WebIcon.Archive />,
  <WebIcon.Success />,
  <WebIcon.Pause />,
  <WebIcon.Timer />,
  <WebIcon.Calendar />,
  <WebIcon.Code />,
  <WebIcon.Drag />,
  <WebIcon.WebSearch />,
  <WebIcon.Globe />,
  <WebIcon.Coin />,
  <WebIcon.Visible />,
  <WebIcon.Diamond />,
  <WebIcon.Light />,
  <WebIcon.Dark />,
  <WebIcon.Flow />,
  <WebIcon.Add />,
  <WebIcon.Run />,
  <WebIcon.Key />,
  <WebIcon.Cloud />,
  <WebIcon.Transform />,
  <WebIcon.Contrast />,
  <WebIcon.Info />,
  <WebIcon.Grid />,
  <WebIcon.Warning />,
  <WebIcon.Preview />,
  <WebIcon.Table />,
  <WebIcon.DoubleChevron />,
  <WebIcon.Folders />,
  <WebIcon.Activity />,
  <WebIcon.Engine />,
  <WebIcon.Analytics />,
  <WebIcon.Decisions />,
  <WebIcon.Reports />,
  <WebIcon.Settings />,
  <WebIcon.Api />,
  <WebIcon.NewWindow />,
  <WebIcon.Feedback />,
  <WebIcon.Support />,
  <WebIcon.Profile />,
  <WebIcon.Account />,
  <WebIcon.Keyboard />,
  <WebIcon.Perfs />,
  <WebIcon.Logout />,
  <WebIcon.Team />,
  <WebIcon.Deleted />,
  <WebIcon.Reload />,
  <WebIcon.CloseChevron />,
  <WebIcon.AddUser />,
  <WebIcon.Close />,
  <WebIcon.Search />,
  <WebIcon.Help />,
  <WebIcon.SelectAll />,
  <WebIcon.Date />,
  <WebIcon.Option />,
  <WebIcon.Download />,
  <WebIcon.Actions />,
  <WebIcon.DownloadNotes />,
  <WebIcon.DataObject />,
  <WebIcon.DataSet />,
  <WebIcon.Models />,
  <WebIcon.QuickAction />,
  <WebIcon.TrendDown />,
  <WebIcon.TrendUp />,
  <WebIcon.Filter />,
  <WebIcon.Color />,
  <WebIcon.Measurement />,
  <WebIcon.FontSize />,
  <WebIcon.Opacity />,
  <WebIcon.Depth />,
  <WebIcon.Home />,
  <WebIcon.ArrowDoubleLeft />,
  <WebIcon.ArrowDoubleRight />,
  <WebIcon.More />,
  <WebIcon.Copy />,
  <WebIcon.Check />,
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
