"use client";

import React from "react";
import { Icon } from "./Icon";

export const WebIcon = ({
  children,
  ...restProps
}: React.ComponentProps<"svg">) => {
  return <Icon {...restProps}>{children}</Icon>;
};
WebIcon.displayName = "WebIcon";

/** viewBox="0 0 64 64" */
const Incognito = () => {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.586 6.242 7.197 10.41C5.844 10.682 5 11.07 5 11.5c0 .828 3.134 1.5 7 1.5s7-.672 7-1.5c0-.43-.844-.818-2.197-1.091l-1.389-4.167a1 1 0 0 0-1.503-.516l-.247.165a3 3 0 0 1-3.328 0l-.247-.165a1 1 0 0 0-1.503.516ZM11.5 15c0 .08-.013.198-.043.34-.155.749-.777 2.16-2.457 2.16-1.5 0-2-1.28-2-3.5 0 0 1.837-.735 3.936 0a5.726 5.726 0 0 1 1.064.5 5.82 5.82 0 0 1 1.064-.5c2.1-.735 3.936 0 3.936 0 0 2.321-.422 3.5-2 3.5-1.68 0-2.302-1.411-2.457-2.16A1.775 1.775 0 0 1 12.5 15h-1Zm-2.871-.315a4.988 4.988 0 0 1 1.871.223V15c0 .01-.01.126-.066.312a2.19 2.19 0 0 1-.266.57c-.23.345-.568.618-1.168.618-.23 0-.357-.048-.43-.092a.683.683 0 0 1-.246-.289c-.145-.276-.253-.714-.299-1.359.175-.032.379-.06.604-.075ZM13.5 15v-.092a4.989 4.989 0 0 1 1.871-.223c.227.015.433.044.61.076-.041.695-.14 1.135-.277 1.4a.543.543 0 0 1-.215.246c-.075.042-.217.093-.489.093-.6 0-.939-.273-1.168-.617a2.188 2.188 0 0 1-.266-.571A1.557 1.557 0 0 1 13.5 15V15Z"
    />
  );
};
Incognito.displayName = "WebIcon.Incognito";

const Contrast = () => {
  return (
    <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10m1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z" />
  );
};
Contrast.displayName = "WebIcon.Contrast";

const Category = () => {
  return (
    <React.Fragment>
      <path d="m12 2-5.5 9h11z" />
      <circle cx="17.5" cy="17.5" r="4.5" />
      <path d="M3 13.5h8v8H3z" />
    </React.Fragment>
  );
};
Category.displayName = "WebIcon.Category";

const Light = () => {
  return (
    <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z" />
  );
};
Light.displayName = "WebIcon.Light";

const Dark = () => {
  return (
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1" />
  );
};
Dark.displayName = "WebIcon.Dark";

const DoubleChevron = () => {
  return (
    <path d="M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15z" />
  );
};
DoubleChevron.displayName = "WebIcon.DoubleChevron";

const Folders = () => {
  return (
    <React.Fragment>
      <path d="M2 6c-.55 0-1 .45-1 1v12c0 1.1.9 2 2 2h16c.55 0 1-.45 1-1s-.45-1-1-1H3V7c0-.55-.45-1-1-1" />
      <path d="M21 4h-7l-1.41-1.41c-.38-.38-.89-.59-1.42-.59H7c-1.1 0-1.99.9-1.99 2L5 15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2" />
    </React.Fragment>
  );
};
Folders.displayName = "WebIcon.Folders";

const Activity = () => {
  return (
    <path d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74m-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74" />
  );
};
Activity.displayName = "WebIcon.Activity";

const Engine = () => {
  return (
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8.7 11.88c-.39.39-1.03.39-1.42 0l-2.17-2.17a.996.996 0 0 1 0-1.41l2.17-2.17c.39-.39 1.03-.39 1.42 0s.39 1.02 0 1.41L8.83 12l1.46 1.46c.39.39.4 1.03.01 1.42M12 4.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m1.7 10.63a.996.996 0 0 1 0-1.41L15.17 12l-1.47-1.47a.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.17 2.17c.39.39.39 1.02 0 1.41l-2.17 2.17c-.39.4-1.03.4-1.42.01" />
  );
};
Engine.displayName = "WebIcon.Engine";

const Decisions = () => {
  return (
    <path d="M15 20c0 .55-.45 1-1 1s-1-.45-1-1v-3c-.73-2.58-3.07-3.47-5.17-3l.88.88c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L4.71 13.7a.996.996 0 0 1 0-1.41L7.3 9.7c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-.88.89c1.51-.33 3.73.08 5.17 1.36V6.83l-.88.88c-.39.39-1.02.39-1.41 0a.996.996 0 0 1 0-1.41l2.59-2.59c.39-.39 1.02-.39 1.41 0L17.3 6.3c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L15 6.83z" />
  );
};
Decisions.displayName = "WebIcon.Decisions";

const Analytics = () => {
  return (
    <path d="M14.06 9.94 13 9.45c-.39-.18-.39-.73 0-.91l1.06-.49.49-1.05c.18-.39.73-.39.91 0l.49 1.06 1.05.49c.39.18.39.73 0 .91l-1.06.49-.49 1.05c-.18.39-.73.39-.91 0zM4.45 13l.49-1.06L6 11.45c.39-.18.39-.73 0-.91l-1.06-.49L4.45 9c-.17-.39-.73-.39-.9 0l-.49 1.06-1.06.49c-.39.18-.39.73 0 .91l1.06.49.49 1.05c.17.39.73.39.9 0m4.51-5.01.63-1.4 1.4-.63c.39-.18.39-.73 0-.91l-1.4-.63-.63-1.4c-.18-.39-.73-.39-.91 0l-.63 1.4-1.4.63c-.39.18-.39.73 0 .91l1.4.63.63 1.4c.17.39.73.39.91 0m13.38.28c-.4-.4-1.07-.39-1.45.04l-6.39 7.18-3.29-3.29a.996.996 0 0 0-1.41 0l-6.04 6.05c-.41.41-.41 1.09 0 1.5s1.09.41 1.5 0l5.25-5.26 3.25 3.25c.41.41 1.07.39 1.45-.04l7.17-8.07c.35-.39.33-.99-.04-1.36" />
  );
};
Analytics.displayName = "WebIcon.Analytics";

const Reports = () => {
  return (
    <path d="M15.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41zM8 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m6 0V4.5l5.5 5.5H15c-.55 0-1-.45-1-1" />
  );
};
Reports.displayName = "WebIcon.Reports";

const Settings = () => {
  return (
    <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5" />
  );
};
Settings.displayName = "WebIcon.Settings";

const Api = () => {
  return (
    <path d="M4 20h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2m0-3h2v2H4zM2 6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2m4 1H4V5h2zm-2 7h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2m0-3h2v2H4z" />
  );
};
Api.displayName = "WebIcon.Api";

const NewWindow = () => {
  return (
    <path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1M14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1" />
  );
};
NewWindow.displayName = "WebIcon.NewWindow";

const Feedback = () => {
  return (
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2" />
  );
};
Feedback.displayName = "WebIcon.Feedback";

const Support = () => {
  return (
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6.99 15c-.7 0-1.26-.56-1.26-1.26 0-.71.56-1.25 1.26-1.25.71 0 1.25.54 1.25 1.25-.01.69-.54 1.26-1.25 1.26m3.01-7.4c-.76 1.11-1.48 1.46-1.87 2.17-.1.18-.16.32-.19.63-.05.45-.45.78-.9.78H12c-.52 0-.93-.44-.88-.96.03-.34.11-.69.3-1.03.49-.87 1.42-1.39 1.96-2.16.57-.81.25-2.33-1.37-2.33-.71 0-1.18.36-1.47.79-.25.36-.69.53-1.1.36-.53-.21-.72-.85-.4-1.31C9.65 6.65 10.67 6 11.99 6c1.48 0 2.49.67 3.01 1.52.44.72.7 2.07.02 3.08" />
  );
};
Support.displayName = "WebIcon.Support";

const Profile = () => {
  return (
    <path d="M13.17 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59M12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m4 8H8v-.57c0-.81.48-1.53 1.22-1.85.85-.37 1.79-.58 2.78-.58s1.93.21 2.78.58c.74.32 1.22 1.04 1.22 1.85z" />
  );
};
Profile.displayName = "WebIcon.Profile";

const Account = () => {
  return (
    <React.Fragment>
      <path d="M10.67 13.02c-.22-.01-.44-.02-.67-.02-2.42 0-4.68.67-6.61 1.82-.88.52-1.39 1.5-1.39 2.53V19c0 .55.45 1 1 1h8.26c-.79-1.13-1.26-2.51-1.26-4 0-1.07.25-2.07.67-2.98" />
      <circle cx="10" cy="8" r="4" />
      <path d="M20.75 16c0-.22-.03-.42-.06-.63l.84-.73c.18-.16.22-.42.1-.63l-.59-1.02c-.12-.21-.37-.3-.59-.22l-1.06.36q-.48-.405-1.08-.63l-.22-1.09c-.05-.23-.25-.4-.49-.4h-1.18c-.24 0-.44.17-.49.4l-.22 1.09q-.6.225-1.08.63l-1.06-.36c-.23-.08-.47.02-.59.22l-.59 1.02c-.12.21-.08.47.1.63l.84.73c-.03.21-.06.41-.06.63s.03.42.06.63l-.84.73c-.18.16-.22.42-.1.63l.59 1.02c.12.21.37.3.59.22l1.06-.36q.48.405 1.08.63l.22 1.09c.05.23.25.4.49.4h1.18c.24 0 .44-.17.49-.4l.22-1.09q.6-.225 1.08-.63l1.06.36c.23.08.47-.02.59-.22l.59-1.02c.12-.21.08-.47-.1-.63l-.84-.73c.03-.21.06-.41.06-.63M17 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" />
    </React.Fragment>
  );
};
Account.displayName = "WebIcon.Account";

const Keyboard = () => {
  return (
    <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-1 2H5v-2h2zm0-3H5V8h2zm8 7H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1m1-4h-2v-2h2zm0-3h-2V8h2zm3 3h-2v-2h2zm0-3h-2V8h2z" />
  );
};
Keyboard.displayName = "WebIcon.Keyboard";

const Perfs = () => {
  return (
    <React.Fragment>
      <path d="M19.46 10a1 1 0 0 0-.07 1 7.55 7.55 0 0 1 .52 1.81 8 8 0 0 1-.69 4.73 1 1 0 0 1-.89.53H5.68a1 1 0 0 1-.89-.54A8 8 0 0 1 13 6.06a7.69 7.69 0 0 1 2.11.56 1 1 0 0 0 1-.07 1 1 0 0 0-.17-1.76A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0 .55-8.89 1 1 0 0 0-1.75-.11" />
      <path d="M10.59 12.59a2 2 0 0 0 2.83 2.83l5.66-8.49z" />
    </React.Fragment>
  );
};
Perfs.displayName = "WebIcon.Perfs";

const Logout = () => {
  return (
    <React.Fragment>
      <path d="M5 5h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6c.55 0 1-.45 1-1s-.45-1-1-1H5z" />
      <path d="m20.65 11.65-2.79-2.79c-.32-.32-.86-.1-.86.35V11h-7c-.55 0-1 .45-1 1s.45 1 1 1h7v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.19.2-.51.01-.7" />
    </React.Fragment>
  );
};
Logout.displayName = "WebIcon.Logout";

const Team = () => {
  return (
    <path d="M16.24 13.65c-1.17-.52-2.61-.9-4.24-.9s-3.07.39-4.24.9C6.68 14.13 6 15.21 6 16.39V17c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-.61c0-1.18-.68-2.26-1.76-2.74m-15.02.93C.48 14.9 0 15.62 0 16.43V17c0 .55.45 1 1 1h3.5v-1.61c0-.83.23-1.61.63-2.29-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58m21.56 0c-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H23c.55 0 1-.45 1-1v-.57c0-.81-.48-1.53-1.22-1.85M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3M1.4968 11l2.5031-2.503L6.5031 11l-2.5032 2.5032zM20 9l-2.5 4h5z" />
  );
};
Team.displayName = "WebIcon.Team";

const Deleted = () => {
  return (
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1" />
  );
};
Deleted.displayName = "WebIcon.Deleted";

const Reload = () => {
  return (
    <path d="m18.65 8.35-2.79 2.79c-.32.32-.1.86.35.86H18c0 3.31-2.69 6-6 6-.79 0-1.56-.15-2.25-.44-.36-.15-.77-.04-1.04.23-.51.51-.33 1.37.34 1.64.91.37 1.91.57 2.95.57 4.42 0 8-3.58 8-8h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01M6 12c0-3.31 2.69-6 6-6 .79 0 1.56.15 2.25.44.36.15.77.04 1.04-.23.51-.51.33-1.37-.34-1.64C14.04 4.2 13.04 4 12 4c-4.42 0-8 3.58-8 8H2.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79c.31-.31.09-.85-.36-.85z" />
  );
};
Reload.displayName = "WebIcon.Reload";

const CloseChevron = () => {
  return (
    <path d="M17.7 15.89 13.82 12l3.89-3.89c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.38.38-1.02-.01-1.4M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1" />
  );
};
CloseChevron.displayName = "WebIcon.CloseChevron";

const AddUser = () => {
  return (
    <React.Fragment>
      <circle cx="9" cy="8" r="4" />
      <path d="M9 14c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4m11-4V7h-2v3h-3v2h3v3h2v-3h3v-2z" />
    </React.Fragment>
  );
};
AddUser.displayName = "WebIcon.AddUser";

const Close = () => {
  return (
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  );
};
Close.displayName = "WebIcon.Close";

const Search = () => {
  return (
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
  );
};
Search.displayName = "WebIcon.Search";

const Help = () => {
  return (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 17h-2v-2h2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25" />
  );
};
Help.displayName = "WebIcon.Help";

const SelectAll = () => {
  return (
    <path d="M3 5h2V3c-1.1 0-2 .9-2 2m0 8h2v-2H3zm4 8h2v-2H7zM3 9h2V7H3zm10-6h-2v2h2zm6 0v2h2c0-1.1-.9-2-2-2M5 21v-2H3c0 1.1.9 2 2 2m-2-4h2v-2H3zM9 3H7v2h2zm2 18h2v-2h-2zm8-8h2v-2h-2zm0 8c1.1 0 2-.9 2-2h-2zm0-12h2V7h-2zm0 8h2v-2h-2zm-4 4h2v-2h-2zm0-16h2V3h-2zM7 17h10V7H7zm2-8h6v6H9z" />
  );
};
SelectAll.displayName = "WebIcon.SelectAll";

const Date = () => {
  return (
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z" />
  );
};
Date.displayName = "WebIcon.Date";

const Option = () => {
  return (
    <React.Fragment>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </React.Fragment>
  );
};
Option.displayName = "WebIcon.Option";

const Download = () => {
  return (
    <path d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1" />
  );
};
Download.displayName = "WebIcon.Download";

const Actions = () => {
  return (
    <path d="m20.45 6 .49-1.06L22 4.45c.39-.18.39-.73 0-.91l-1.06-.49L20.45 2c-.18-.39-.73-.39-.91 0l-.49 1.06-1.05.49c-.39.18-.39.73 0 .91l1.06.49.49 1.05c.17.39.73.39.9 0m-2.74 3.12-2.83-2.83a.996.996 0 0 0-1.41 0L2.29 17.46c-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0L17.7 10.53c.4-.38.4-1.02.01-1.41m-3.5 2.09L12.8 9.8l1.38-1.38 1.41 1.41z" />
  );
};
Actions.displayName = "WebIcon.Actions";

const DownloadNotes = () => {
  return (
    <path d="M18 2h-7.17c-.53 0-1.04.21-1.42.59L4.59 7.41C4.21 7.79 4 8.3 4 8.83V20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-6.35 14.65-2.79-2.79c-.32-.32-.1-.86.35-.86H11v-2.99c0-.55.44-.99.99-1 .56-.01 1.01.44 1.01 1V13h1.79c.45 0 .67.54.35.85l-2.79 2.79c-.19.2-.51.2-.7.01" />
  );
};
DownloadNotes.displayName = "WebIcon.DownloadNotes";

const DataObject = () => {
  return (
    <path d="M4 7v2c0 .55-.45 1-1 1s-1 .45-1 1v2c0 .55.45 1 1 1s1 .45 1 1v2c0 1.66 1.34 3 3 3h2c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1-.45-1-1v-2c0-1.3-.84-2.42-2-2.83v-.34C5.16 11.42 6 10.3 6 9V7c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H7C5.34 4 4 5.34 4 7m17 3c-.55 0-1-.45-1-1V7c0-1.66-1.34-3-3-3h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 1.3.84 2.42 2 2.83v.34c-1.16.41-2 1.52-2 2.83v2c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c1.66 0 3-1.34 3-3v-2c0-.55.45-1 1-1s1-.45 1-1v-2c0-.55-.45-1-1-1" />
  );
};
DataObject.displayName = "WebIcon.DataObject";

const DataSet = () => {
  return (
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8 14H7v-4h4zm0-6H7V7h4zm6 6h-4v-4h4zm0-6h-4V7h4z" />
  );
};
DataSet.displayName = "WebIcon.DataSet";

const Models = () => {
  return (
    <React.Fragment>
      <path d="M11.15 3.4 7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0" />
      <circle cx="17.5" cy="17.5" r="4.5" />
      <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1" />
    </React.Fragment>
  );
};
Models.displayName = "WebIcon.Models";

const QuickAction = () => {
  return <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />;
};
QuickAction.displayName = "WebIcon.QuickAction";

const TrendUp = () => {
  return (
    <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  );
};
TrendUp.displayName = "WebIcon.TrendUp";

const TrendDown = () => {
  return (
    <path d="m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
  );
};
TrendDown.displayName = "WebIcon.TrendDown";

const Filter = () => {
  return (
    <path d="M7 6h10l-5.01 6.3zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61" />
  );
};
Filter.displayName = "WebIcon.Filter";

const Sort = () => {
  return <path d="M3 18h6v-2H3zM3 6v2h18V6zm0 7h12v-2H3z" />;
};
Sort.displayName = "WebIcon.Sort";

const Color = () => {
  return (
    <path d="M12 4.81V19c-3.31 0-6-2.63-6-5.87 0-1.56.62-3.03 1.75-4.14zM6.35 7.56C4.9 8.99 4 10.96 4 13.13 4 17.48 7.58 21 12 21s8-3.52 8-7.87c0-2.17-.9-4.14-2.35-5.57L12 2z" />
  );
};
Color.displayName = "WebIcon.Color";

const Measurement = () => {
  return (
    <path d="M19 12h-2v3h-3v2h5zM7 9h3V7H5v5h2zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16.01H3V4.99h18z" />
  );
};
Measurement.displayName = "WebIcon.Measurement";

const FontSize = () => {
  return <path d="M9 4v3h5v12h3V7h5V4zm-6 8h3v7h3v-7h3V9H3z" />;
};
FontSize.displayName = "WebIcon.FontSize";

const Depth = () => {
  return (
    <path d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27z" />
  );
};
Depth.displayName = "WebIcon.Depth";

const Opacity = () => {
  return (
    <path d="M17.66 8 12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8M6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14z" />
  );
};
Opacity.displayName = "WebIcon.Opacity";

const Home = () => {
  return <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
};
Home.displayName = "WebIcon.Home";

const ArrowDoubleLeft = () => {
  return (
    <React.Fragment>
      <path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
      <path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" />
    </React.Fragment>
  );
};
ArrowDoubleLeft.displayName = "WebIcon.ArrowDoubleLeft";

const ArrowDoubleRight = () => {
  return (
    <React.Fragment>
      <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
      <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" />
    </React.Fragment>
  );
};
ArrowDoubleRight.displayName = "WebIcon.ArrowDoubleRight";

const More = () => {
  return (
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
  );
};
More.displayName = "WebIcon.More";

const Copy = () => {
  return (
    <path d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H9V4h9zM3 15v-2h2v2zm0-5.5h2v2H3zM10 20h2v2h-2zm-7-1.5v-2h2v2zM5 22c-1.1 0-2-.9-2-2h2zm3.5 0h-2v-2h2zm5 0v-2h2c0 1.1-.9 2-2 2M5 6v2H3c0-1.1.9-2 2-2" />
  );
};
Copy.displayName = "WebIcon.Copy";

const Check = () => {
  return <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />;
};
Check.displayName = "WebIcon.Check";

const Table = () => {
  return <path d="M21 8H3V4h18zm0 2H3v4h18zm0 6H3v4h18z" />;
};
Table.displayName = "WebIcon.Table";

const Grid = () => {
  return (
    <path d="M11 11V3H5c-1.1 0-2 .9-2 2v6zm2 0h8V5c0-1.1-.9-2-2-2h-6zm-2 2H3v6c0 1.1.9 2 2 2h6zm2 0v8h6c1.1 0 2-.9 2-2v-6z" />
  );
};
Grid.displayName = "WebIcon.Grid";

const Preview = () => {
  return (
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.89-2-2-2m0 16H5V7h14zm-5.5-6c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5M12 9c-2.73 0-5.06 1.66-6 4 .94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5" />
  );
};
Preview.displayName = "WebIcon.Preview";

const Warning = () => {
  return (
    <path d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3M12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m1 4h-2v-2h2z" />
  );
};
Warning.displayName = "WebIcon.Warning";

const Info = () => {
  return (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z" />
  );
};
Info.displayName = "WebIcon.Info";

const Key = () => {
  return (
    <path d="M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12c-2.29.46-4.15 2.29-4.63 4.58C.32 14.57 3.26 18 7 18c2.61 0 4.83-1.67 5.65-4H17v2c0 1.1.9 2 2 2s2-.9 2-2v-2c1.1 0 2-.9 2-2s-.9-2-2-2zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" />
  );
};
Key.displayName = "WebIcon.Key";

const Transform = () => {
  return (
    <path d="M22 18v-2H8V4h2L7 1 4 4h2v2H2v2h4v8c0 1.1.9 2 2 2h8v2h-2l3 3 3-3h-2v-2zM10 8h6v6h2V8c0-1.1-.9-2-2-2h-6z" />
  );
};
Transform.displayName = "WebIcon.Transform";

const Cloud = () => {
  return (
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.61 5.64 5.36 8.04 2.35 8.36 0 10.9 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4h2c0-2.76-1.86-5.08-4.4-5.78C8.61 6.88 10.2 6 12 6c3.03 0 5.5 2.47 5.5 5.5v.5H19c1.65 0 3 1.35 3 3s-1.35 3-3 3" />
  );
};
Cloud.displayName = "WebIcon.Cloud";

const Flow = () => {
  return (
    <path d="M14 9v2h-3V9H8.5V7H11V1H4v6h2.5v2H4v6h2.5v2H4v6h7v-6H8.5v-2H11v-2h3v2h7V9z" />
  );
};
Flow.displayName = "WebIcon.Flow";

const Run = () => {
  return (
    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82" />
  );
};
Run.displayName = "WebIcon.Run";

const Add = () => {
  return <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />;
};
Add.displayName = "WebIcon.Add";

const Diamond = () => {
  return (
    <path d="M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16L19 3h-5.16zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H5L2.38 8.25z" />
  );
};
Diamond.displayName = "WebIcon.Diamond";

const Visible = () => {
  return (
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3" />
  );
};
Visible.displayName = "WebIcon.Visible";

const Coin = () => {
  return (
    <path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6M3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65" />
  );
};
Coin.displayName = "WebIcon.Coin";

const Globe = () => {
  return (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39" />
  );
};
Globe.displayName = "WebIcon.Globe";

const WebSearch = () => {
  return (
    <path d="M19.3 16.9c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S11 12 11 14.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.2 3.2 1.4-1.4zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5M12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07c-.64-2.46-2.4-4.47-4.73-5.41V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8" />
  );
};
WebSearch.displayName = "WebIcon.WebSearch";

const Drag = () => {
  return (
    <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
  );
};
Drag.displayName = "WebIcon.Drag";

const HTML = () => {
  return (
    <path d="M3.5 9H5v6H3.5v-2.5h-2V15H0V9h1.5v2h2zm14 0H13c-.55 0-1 .45-1 1v5h1.5v-4.5h1V14H16v-3.51h1V15h1.5v-5c0-.55-.45-1-1-1M11 9H6v1.5h1.75V15h1.5v-4.5H11zm13 6v-1.5h-2.5V9H20v6z" />
  );
};
HTML.displayName = "WebIcon.HTML";

const Code = () => {
  return (
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z" />
  );
};
Code.displayName = "WebIcon.Code";

const Calendar = () => {
  return (
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z" />
  );
};
Calendar.displayName = "WebIcon.Calendar";

const Timer = () => {
  return (
    <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8" />
  );
};
Timer.displayName = "WebIcon.Timer";

const Pause = () => {
  return (
    <path d="M9 16h2V8H9zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m1-4h2V8h-2z" />
  );
};
Pause.displayName = "WebIcon.Pause";

const Success = () => {
  return (
    <path d="M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8" />
  );
};
Success.displayName = "WebIcon.Success";

const Archive = () => {
  return (
    <path d="M11 8.17 6.49 3.66C8.07 2.61 9.96 2 12 2c5.52 0 10 4.48 10 10 0 2.04-.61 3.93-1.66 5.51l-1.46-1.46C19.59 14.87 20 13.48 20 12c0-3.35-2.07-6.22-5-7.41V5c0 1.1-.9 2-2 2h-2zm10.19 13.02-1.41 1.41-2.27-2.27C15.93 21.39 14.04 22 12 22 6.48 22 2 17.52 2 12c0-2.04.61-3.93 1.66-5.51L1.39 4.22 2.8 2.81zM11 18c-1.1 0-2-.9-2-2v-1l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.08 3.05 7.44 7 7.93z" />
  );
};
Archive.displayName = "WebIcon.Archive";

const BounceArrow = () => {
  return (
    <path d="M18.21 9.21C15.93 10.78 13.45 13.3 13 17h2v2H9v-2h2c-.5-4.5-4.37-8-9-8V7c4.39 0 8.22 2.55 10 6.3 1.13-2.43 2.99-4.25 4.78-5.52L14 5h7v7z" />
  );
};
BounceArrow.displayName = "WebIcon.BounceArrow";

const ArrowRight = () => {
  return <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />;
};
ArrowRight.displayName = "WebIcon.ArrowRight";

const Sparkles = () => {
  return (
    <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z" />
  );
};
Sparkles.displayName = "WebIcon.Sparkles";

const Webhook = () => {
  return (
    <path d="M10 15h5.88c.27-.31.67-.5 1.12-.5.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-.44 0-.84-.19-1.12-.5H11.9c-.46 2.28-2.48 4-4.9 4-2.76 0-5-2.24-5-5 0-2.42 1.72-4.44 4-4.9v2.07c-1.16.41-2 1.53-2 2.83 0 1.65 1.35 3 3 3s3-1.35 3-3zm2.5-11c1.65 0 3 1.35 3 3h2c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.43.6 2.71 1.55 3.62l-2.35 3.9c-.68.14-1.2.75-1.2 1.48 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.16-.02-.31-.07-.45l3.38-5.63C10.49 9.61 9.5 8.42 9.5 7c0-1.65 1.35-3 3-3m4.5 9c-.64 0-1.23.2-1.72.54l-3.05-5.07C11.53 8.35 11 7.74 11 7c0-.83.67-1.5 1.5-1.5S14 6.17 14 7c0 .15-.02.29-.06.43l2.19 3.65c.28-.05.57-.08.87-.08 2.76 0 5 2.24 5 5s-2.24 5-5 5c-1.85 0-3.47-1.01-4.33-2.5h2.67c.48.32 1.05.5 1.66.5 1.65 0 3-1.35 3-3s-1.35-3-3-3" />
  );
};
Webhook.displayName = "WebIcon.Webhook";

const UpdateData = () => {
  return (
    <React.Fragment>
      <path d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2z" />
      <path d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z" />
    </React.Fragment>
  );
};
UpdateData.displayName = "WebIcon.UpdateData";

const Link = () => {
  return (
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5" />
  );
};
Link.displayName = "WebIcon.Link";

const Scroll = () => {
  return (
    <path d="M12 7.83 15.17 11l1.41-1.41L12 5 7.41 9.59 8.83 11zm0-5L15.17 6l1.41-1.41L12 0 7.41 4.59 8.83 6zm0 18.34L8.83 18l-1.41 1.41L12 24l4.59-4.59L15.17 18zm0-5L8.83 13l-1.41 1.41L12 19l4.59-4.59L15.17 13z" />
  );
};
Scroll.displayName = "WebIcon.Scroll";

const Click = () => {
  return (
    <path d="M11.71 17.99C8.53 17.84 6 15.22 6 12c0-3.31 2.69-6 6-6 3.22 0 5.84 2.53 5.99 5.71l-2.1-.63C15.48 9.31 13.89 8 12 8c-2.21 0-4 1.79-4 4 0 1.89 1.31 3.48 3.08 3.89zM22 12c0 .3-.01.6-.04.9l-1.97-.59c.01-.1.01-.21.01-.31 0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8c.1 0 .21 0 .31-.01l.59 1.97c-.3.03-.6.04-.9.04-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10m-3.77 4.26L22 15l-10-3 3 10 1.26-3.77 4.27 4.27 1.98-1.98z" />
  );
};
Click.displayName = "WebIcon.Click";

const Chat = () => {
  return (
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2" />
  );
};
Chat.displayName = "WebIcon.Chat";

const Image = () => {
  return (
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z" />
  );
};
Image.displayName = "WebIcon.Image";

/** viewBox="0 0 16 16" */
const Terminal = () => {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 2.5H14.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V2.5ZM0 1H1.5H14.5H16V2.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1ZM4 11.1339L4.44194 10.6919L6.51516 8.61872C6.85687 8.27701 6.85687 7.72299 6.51517 7.38128L4.44194 5.30806L4 4.86612L3.11612 5.75L3.55806 6.19194L5.36612 8L3.55806 9.80806L3.11612 10.25L4 11.1339ZM8 9.75494H8.6225H11.75H12.3725V10.9999H11.75H8.6225H8V9.75494Z"
    />
  );
};
Terminal.displayName = "WebWebIcon.Terminal";

WebIcon.Terminal = Terminal;
WebIcon.Image = Image;
WebIcon.Chat = Chat;
WebIcon.Sort = Sort;
WebIcon.Click = Click;
WebIcon.Scroll = Scroll;
WebIcon.Sparkles = Sparkles;
WebIcon.Category = Category;
WebIcon.BounceArrow = BounceArrow;
WebIcon.ArrowRight = ArrowRight;
WebIcon.Archive = Archive;
WebIcon.Success = Success;
WebIcon.Pause = Pause;
WebIcon.Timer = Timer;
WebIcon.Calendar = Calendar;
WebIcon.Code = Code;
WebIcon.Drag = Drag;
WebIcon.WebSearch = WebSearch;
WebIcon.Globe = Globe;
WebIcon.Coin = Coin;
WebIcon.Visible = Visible;
WebIcon.Diamond = Diamond;
WebIcon.Light = Light;
WebIcon.Dark = Dark;
WebIcon.Flow = Flow;
WebIcon.Add = Add;
WebIcon.Run = Run;
WebIcon.Key = Key;
WebIcon.Cloud = Cloud;
WebIcon.Transform = Transform;
WebIcon.Contrast = Contrast;
WebIcon.Info = Info;
WebIcon.Grid = Grid;
WebIcon.Warning = Warning;
WebIcon.Preview = Preview;
WebIcon.Table = Table;
WebIcon.DoubleChevron = DoubleChevron;
WebIcon.Folders = Folders;
WebIcon.Activity = Activity;
WebIcon.Engine = Engine;
WebIcon.Analytics = Analytics;
WebIcon.Decisions = Decisions;
WebIcon.Reports = Reports;
WebIcon.Settings = Settings;
WebIcon.Api = Api;
WebIcon.NewWindow = NewWindow;
WebIcon.Feedback = Feedback;
WebIcon.Support = Support;
WebIcon.Profile = Profile;
WebIcon.Account = Account;
WebIcon.Keyboard = Keyboard;
WebIcon.Perfs = Perfs;
WebIcon.Logout = Logout;
WebIcon.Team = Team;
WebIcon.Deleted = Deleted;
WebIcon.Reload = Reload;
WebIcon.CloseChevron = CloseChevron;
WebIcon.AddUser = AddUser;
WebIcon.Close = Close;
WebIcon.Search = Search;
WebIcon.Help = Help;
WebIcon.SelectAll = SelectAll;
WebIcon.Date = Date;
WebIcon.Option = Option;
WebIcon.Download = Download;
WebIcon.Actions = Actions;
WebIcon.DownloadNotes = DownloadNotes;
WebIcon.DataObject = DataObject;
WebIcon.DataSet = DataSet;
WebIcon.Models = Models;
WebIcon.QuickAction = QuickAction;
WebIcon.TrendDown = TrendDown;
WebIcon.TrendUp = TrendUp;
WebIcon.Filter = Filter;
WebIcon.Color = Color;
WebIcon.Measurement = Measurement;
WebIcon.FontSize = FontSize;
WebIcon.Opacity = Opacity;
WebIcon.Depth = Depth;
WebIcon.Home = Home;
WebIcon.ArrowDoubleLeft = ArrowDoubleLeft;
WebIcon.ArrowDoubleRight = ArrowDoubleRight;
WebIcon.More = More;
WebIcon.Copy = Copy;
WebIcon.Check = Check;
WebIcon.Incognito = Incognito;
