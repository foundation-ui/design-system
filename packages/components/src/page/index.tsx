import React from "react";
import {
  Toolbar,
  IToolbarBodyProperties,
  IToolbarSectionProperties,
  ScrollArea,
  IScrollAreaProperties,
} from "..";
import {
  PageRootWrapper,
  PageNavWrapper,
  PageMenuWrapper,
  PagePanelWrapper,
  PageSectionWrapper,
  PageBodyWrapper,
} from "./styles";
import {
  IComponentStyling,
  IComponentSize,
  IComponentVariant,
} from "../../../../types";

export interface IPageToolsProperties
  extends IToolbarBodyProperties,
    IToolbarSectionProperties {
  trigger?: React.ReactNode | string;
  triggerProps?: IComponentStyling &
    IComponentSize &
    IComponentVariant &
    React.ComponentProps<"button">;
  fixed?: boolean;
}
export interface IPageWrapperProperties {
  $menus?: number;
  $navigations?: number;
}

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
 * Toolbar are component that provides a set of tools or actions for the user.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the Page.Toolbar.
 * - Ensure that the Page.Toolbar is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the Page.Toolbar.
 * - Ensure that the Page.Toolbar is responsive and adapts to different screen sizes and orientations.
 *
 * @param {IPageToolsProperties} props - The props for the Page.Toolbar component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {string} props.shortcut - The key combination used as keyboard shortcuts to trigger the Page.Toolbar.
 * @param {string} props.hotkey - The key to use in the key combination for the keyboard shortcuts.
 * @param {KeyBindingEnum} props.bindkey - The modifier key to use in the key combination.
 * @param {ComponentSizeEnum} props.sizing - The size of the Page.Toolbar.
 * @param {ComponentHeightEnum} props.height - The height definition of the Page.Toolbar.
 * @param {TComponentSide} props.side - The side of the Page.Toolbar.
 * @param {boolean} props.defaultOpen - Whether the Page.Toolbar should be open by default.
 * @param {ReactNode} props.children - The content to be rendered inside the Page.Toolbar.
 * @returns {ReactElement} The Page.Toolbar component.
 */
const PageTools = (props: IPageToolsProperties) => {
  const {
    shortcut,
    hotkey,
    bindkey,
    raw,
    sizing,
    side,
    defaultOpen,
    fixed,
    showoncollapse,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <Toolbar.Root>
      <Toolbar
        raw={raw}
        sizing={sizing}
        side={side}
        shortcut={!fixed && shortcut}
        hotkey={hotkey}
        bindkey={bindkey}
        defaultOpen={defaultOpen}
        {...props}
      >
        <Toolbar.Section showoncollapse={showoncollapse}>
          {children}
        </Toolbar.Section>

        {!fixed && (
          <Toolbar.Trigger
            title={
              shortcut ? `${bindkey || "ctrl"} + ${hotkey}` : "toolbar-trigger"
            }
            onClick={handleClick}
            {...triggerProps}
          >
            {trigger || <span>&harr;</span>}
          </Toolbar.Trigger>
        )}
      </Toolbar>
    </Toolbar.Root>
  );
};
PageTools.displayName = "Page.Tools";

const PageContent = (
  props: React.ComponentProps<"div"> & IScrollAreaProperties
) => {
  const { children } = props;
  return (
    <ScrollArea as={PageSectionWrapper} {...props}>
      {children}
    </ScrollArea>
  );
};
PageContent.displayName = "Page.Content";

const PageWrapper = (
  props: IPageWrapperProperties & React.ComponentProps<"div">
) => {
  const { children } = props;
  return <PageBodyWrapper {...props}>{children}</PageBodyWrapper>;
};
PageWrapper.displayName = "Page.Wrapper";

/**
 * Panel are component that provides a set of tools or actions for the user.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the Page.Panel.
 * - Ensure that the Page.Panel is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the Page.Panel.
 * - Ensure that the Page.Panel is responsive and adapts to different screen sizes and orientations.
 *
 * @param {IPageToolsProperties} props - The props for the Page.Panel component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {string} props.shortcut - The key combination used as keyboard shortcuts to trigger the Page.Panel.
 * @param {string} props.hotkey - The key to use in the key combination for the keyboard shortcuts.
 * @param {KeyBindingEnum} props.bindkey - The modifier key to use in the key combination.
 * @param {ComponentSizeEnum} props.sizing - The size of the Page.Panel.
 * @param {ComponentHeightEnum} props.height - The height definition of the Page.Panel.
 * @param {TComponentSide} props.side - The side of the Page.Panel.
 * @param {boolean} props.defaultOpen - Whether the Page.Panel should be open by default.
 * @param {ReactNode} props.children - The content to be rendered inside the Page.Panel.
 * @returns {ReactElement} The Page.Panel component.
 */
const PagePanel = (props: IPageToolsProperties) => {
  const {
    shortcut,
    hotkey,
    bindkey,
    raw,
    sizing,
    height = "auto",
    side,
    defaultOpen,
    fixed,
    showoncollapse,
    onClick,
    trigger,
    triggerProps,
    children,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <Toolbar.Root>
      <PagePanelWrapper
        as={Toolbar}
        raw={raw}
        sizing={sizing}
        height={height}
        side={side}
        shortcut={!fixed && shortcut}
        hotkey={hotkey}
        bindkey={bindkey}
        defaultOpen={defaultOpen}
        aria-label={props["aria-label"]}
      >
        {!fixed && (
          <Toolbar.Trigger
            title={
              shortcut ? `${bindkey || "ctrl"} + ${hotkey}` : "toolbar-trigger"
            }
            onClick={handleClick}
            {...triggerProps}
          >
            {trigger || (
              <span style={{ transform: "rotate(90deg)" }}>&harr;</span>
            )}
          </Toolbar.Trigger>
        )}

        <Toolbar.Section showoncollapse={showoncollapse}>
          {children}
        </Toolbar.Section>
      </PagePanelWrapper>
    </Toolbar.Root>
  );
};
PagePanel.displayName = "Page.Panel";

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
Page.Tools = PageTools;
Page.Wrapper = PageWrapper;
Page.Content = PageContent;
Page.Panel = PagePanel;
Page.Menu = PageMenu;

export {
  Page,
  PageNavigation,
  PageTools,
  PagePanel,
  PageWrapper,
  PageContent,
  PageMenu,
};
