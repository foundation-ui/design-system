import React from "react";
import { useClickOutside, useDisabledScroll } from "@foundation-ui/hooks";
import { DropdownMenuProvider, useDropdownMenu } from "./hooks";
import { RootWrapper, ContentWrapper, ItemWrapper } from "./styles";
import { Button, IButtonProperties } from "../button";
import { applyDataState } from "../utils";
import {
  IReactChildren,
  IComponentStyling,
  IComponentSize,
  ComponentSideEnum,
} from "../../../../types";

export interface IDropdownContentProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentPropsWithRef<"ul"> {
  defaultOpen?: boolean;
}
export interface IDropdownItemProperties
  extends IComponentStyling,
    React.ComponentProps<"li"> {
  radio?: boolean;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
}

export interface IDropdownComposition {
  Root: typeof DropdownMenuRoot;
  Trigger: typeof DropdownMenuTrigger;
  Content: typeof DropdownMenuContent;
  Item: typeof DropdownMenuItem;
}

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
 * @param {React.ComponentProps<"div">} props - The props for the DropdownMenu component.
 * @param {ReactNode} props.children - The content to be rendered inside the dropdown menu.
 * @returns {ReactElement} The DropdownMenu component.
 */
const DropdownMenu = ({ children }: React.ComponentProps<"div">) => {
  const DropdownContentRef = React.useRef(null);
  const { states, methods } = useDropdownMenu();
  const { toggleOpen } = methods;

  const handleClickOutside = () => {
    if (states.open && toggleOpen) toggleOpen();
  };

  useClickOutside(DropdownContentRef, handleClickOutside);
  useDisabledScroll(Boolean(states.open));
  return <RootWrapper ref={DropdownContentRef}>{children}</RootWrapper>;
};
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuRoot = ({ children }: IReactChildren) => {
  return <DropdownMenuProvider>{children}</DropdownMenuProvider>;
};
DropdownMenuRoot.displayName = "DropdownMenu.Root";

/**
 * DropdownMenu.Trigger is used to triggers the expansion and collapse of the associated DropdownMenu.Content component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated dropdown section.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the DropdownMenu.Trigger component.components.
 * @param {ReactNode} props.children - The content to be rendered inside the dropdown trigger.
 * @returns {ReactElement} The DropdownMenu.Trigger component.
 */
const DropdownMenuTrigger = (props: IButtonProperties) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const triggerRect = () => triggerRef.current?.getBoundingClientRect();

  const { variant = "ghost", onClick, children, ...restProps } = props;
  const { id, states, methods } = useDropdownMenu();
  const { toggleOpen, setTriggerProps } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (toggleOpen) toggleOpen();
    if (setTriggerProps)
      setTriggerProps({
        top: Number(triggerRect()?.top),
        right: Number(triggerRect()?.right),
        bottom: Number(triggerRect()?.bottom),
        left: Number(triggerRect()?.left),
        width: Number(triggerRect()?.width),
        height: Number(triggerRect()?.height),
      });
  };

  return (
    <Button
      ref={triggerRef}
      id={id.split("|").at(0)}
      onClick={handleClick}
      aria-haspopup="menu"
      data-state={applyDataState(Boolean(states.open))}
      variant={variant}
      {...restProps}
    >
      {children}
    </Button>
  );
};
DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";

/**
 * DropdownMenu.Content is used to contains the content of the associated DropdownMenu.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the associated dropdown menu is collapsed.
 * - Ensure that the content is properly focused when the associated dropdown menu is expanded.
 *
 * @param {IDropdownContentProperties} props - The props for the DropdownMenu.Content component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component.
 * @param {boolean} props.defaultOpen - The initial open state of the dropdown menu. Defaults to false.
 * @param {ReactNode} props.children - The content to be rendered inside the dropdown menu.
 * @returns {ReactElement} The DropdownMenu.Content component.
 */
const DropdownMenuContent = React.forwardRef(
  (props: IDropdownContentProperties, _) => {
    const {
      raw,
      sizing = "medium",
      defaultOpen,
      children,
      ...restProps
    } = props;
    const { id, states, methods } = useDropdownMenu();
    const { toggleOpen, setContentProps } = methods;

    const mounted = React.useRef(false);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const contentRect = () => contentRef.current?.getBoundingClientRect();
    const bodyRect = () => document.body.getBoundingClientRect();

    const positions = React.useMemo(() => {
      return {
        btt: `calc((${states?.triggerProps?.top}px - ${states?.contentProps?.height}px) - (var(--measurement-medium-10) * 2))`,
        ttb: `calc((${states?.triggerProps?.top}px + ${states?.triggerProps?.height}px) + var(--measurement-medium-10))`,
        ltr: `${states?.triggerProps?.left}px`,
        rtl: `calc(${states?.triggerProps?.left}px - (${states?.contentProps?.width}px - ${states?.triggerProps?.width}px))`,
      };
    }, [states?.triggerProps, states?.contentProps]);
    const dimensions = React.useMemo(() => {
      return {
        body_width: bodyRect()?.width,
        body_height: bodyRect().height,
        content_width: states.contentProps.width,
        content_height: states.contentProps.height,
        content_left: states.contentProps.left,
        content_bottom: states.contentProps.bottom,
      };
    }, [states?.triggerProps, states?.contentProps]);

    const hasEnoughHorizontalSpace =
      dimensions.body_width - dimensions.content_left >
      dimensions.content_width * 1.1;

    const hasEnoughVerticalSpace =
      dimensions.body_height - dimensions.content_bottom >
      dimensions.content_height - dimensions.content_height * 0.9;

    React.useEffect(() => {
      if (defaultOpen && toggleOpen) toggleOpen();
    }, []);

    React.useEffect(() => {
      mounted.current = true;

      setContentProps &&
        setContentProps({
          top: Number(contentRect()?.top),
          right: Number(contentRect()?.right),
          bottom: Number(contentRect()?.bottom),
          left: Number(contentRect()?.left),
          width: Number(contentRect()?.width),
          height: Number(contentRect()?.height),
        });

      return () => {
        mounted.current = false;
      };
    }, [states.open]);

    return (
      <React.Fragment>
        {states.open && (
          <ContentWrapper
            ref={contentRef}
            id={id.split("|").at(-1)}
            role="menu"
            tabIndex={-1}
            aria-labelledby={id.split("|").at(0)}
            data-state={applyDataState(Boolean(states.open))}
            data-sizing={sizing}
            data-side={
              hasEnoughHorizontalSpace
                ? ComponentSideEnum.Left
                : ComponentSideEnum.Right
            }
            data-align={
              hasEnoughHorizontalSpace
                ? ComponentSideEnum.Left
                : ComponentSideEnum.Right
            }
            data-raw={Boolean(raw)}
            style={{
              top: hasEnoughVerticalSpace ? positions.ttb : positions.btt,
              left: hasEnoughHorizontalSpace ? positions.ltr : positions.rtl,
            }}
            {...restProps}
          >
            {children}
          </ContentWrapper>
        )}
      </React.Fragment>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenu.Content";

/**
 * DropdownMenu.Item is used to handle action inside DropdownMenu.Content.
 *
 * @param {IDropdownItemProperties} props - The props for the DropdownMenu.Item component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.radio - Define whether the component is collapses the dropdown menu on click or not.
 * @returns {ReactElement} The DropdownMenu.Content component.
 */
const DropdownMenuItem = (props: IDropdownItemProperties) => {
  const {
    raw,
    onClick,
    radio = false,
    disabled,
    children,
    ...restProps
  } = props;
  const { methods } = useDropdownMenu();
  const { toggleOpen } = methods;

  const EventsHandler = {
    toggle: () => {
      if (!radio && toggleOpen) toggleOpen();
    },
    click: (
      event:
        | React.MouseEvent<HTMLLIElement>
        | React.KeyboardEvent<HTMLLIElement>
    ) => {
      if (onClick) onClick(event);
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!disabled) {
      EventsHandler.click(event);
      EventsHandler.toggle();
    }
  };
  const handleKeydown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (["Space", "Enter"].includes(event.code || event.key) && !disabled) {
      EventsHandler.click(event);
      EventsHandler.toggle();
    }
  };

  return (
    <ItemWrapper
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeydown}
      aria-disabled={disabled}
      data-orientation="vertical"
      data-raw={Boolean(raw)}
      {...restProps}
    >
      {children}
    </ItemWrapper>
  );
};
DropdownMenuItem.displayName = "DropdownMenu.Item";

DropdownMenu.Root = DropdownMenuRoot;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;

export {
  DropdownMenuRoot,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
