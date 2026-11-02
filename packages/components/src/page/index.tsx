"use client";

import React from "react";

import { ScrollArea } from "..";
import {
  PageRootWrapper,
  PageNavWrapper,
  PageMenuWrapper,
  PageSectionWrapper,
  PageBodyWrapper,
} from "./styles";

import type { IScrollAreaProperties } from "../scrollarea/types";
import type { IPageWrapperProperties } from "./types";

/**
 * Pages are structured components used to build User Interface layouts.
 *
 * @param {React.ComponentProps<"div">} props - The props for the Page component.
 * @returns {ReactElement} The Page component.
 */
const Page = (props: React.ComponentProps<"div">) => {
  const { children } = props;
  return (
    <PageRootWrapper className="flex" {...props}>
      {children}
    </PageRootWrapper>
  );
};
Page.displayName = "Page";

/**
 * Navigations are used to hold links and actions.
 *
 * @param {React.ComponentProps<"div">} props - The props for the Page.Navigation component.
 * @returns {ReactElement} The Page.Navigation component.
 */
const PageNavigation = (props: React.ComponentProps<"nav">) => {
  const { children } = props;
  return <PageNavWrapper {...props}>{children}</PageNavWrapper>;
};
PageNavigation.displayName = "Page.Navigation";

/**
 * PageContent component.
 *
 * @returns {ReactElement} The PageContent component.
 */
const PageContent = (
  props: React.ComponentProps<"div"> & IScrollAreaProperties,
) => {
  const { children } = props;
  return (
    <ScrollArea as={PageSectionWrapper} {...props}>
      {children}
    </ScrollArea>
  );
};
PageContent.displayName = "Page.Content";

/**
 * PageWrapper component.
 *
 * @returns {ReactElement} The PageWrapper component.
 */
const PageWrapper = (
  props: IPageWrapperProperties & React.ComponentProps<"div">,
) => {
  const { children } = props;
  return <PageBodyWrapper {...props}>{children}</PageBodyWrapper>;
};
PageWrapper.displayName = "Page.Wrapper";

/**
 * Menus are used to hold links and actions.
 *
 * @param {React.ComponentProps<"menu">} props - The props for the Page.Menu component.
 * @returns {ReactElement} The Page.Menu component.
 */
const PageMenu = (props: React.ComponentProps<"menu">) => {
  const { children } = props;
  return <PageMenuWrapper {...props}>{children}</PageMenuWrapper>;
};
PageMenu.displayName = "Page.Menu";

Page.Navigation = PageNavigation;
Page.Wrapper = PageWrapper;
Page.Content = PageContent;
Page.Menu = PageMenu;

export { Page, PageNavigation, PageWrapper, PageContent, PageMenu };
