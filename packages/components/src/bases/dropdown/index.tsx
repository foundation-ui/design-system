import React from "react";
import ReactDOM from "react-dom";
import { useClickOutside } from "@bsw/ds-core";
import { DropdownMenuProvider, useDropdownMenu } from "./hooks";
import { RootWrapper, ContentWrapper, ItemWrapper } from "./styles";
import { Button, IButtonProperties } from "../button";
import { applyDataState } from "../../utils";
import {
  IReactChildren,
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
} from "../../../../../types";

export interface IDropdownPortalProperties
  extends React.ComponentPropsWithoutRef<any> {
  container: string;
}
export interface IDropdownContentProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentPropsWithoutRef<"ul"> {
  defaultOpen?: boolean;
  side?: "left" | "right";
}
export interface IDropdownItemProperties
  extends IComponentStyling,
    React.ComponentPropsWithoutRef<"li"> {
  radio?: boolean;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
}

const DropdownMenuRoot = ({ children }: IReactChildren) => {
  return <DropdownMenuProvider>{children}</DropdownMenuProvider>;
};

const DropdownMenu = ({ children }: React.ComponentPropsWithoutRef<"div">) => {
  const DropdownContentRef = React.useRef(null);

  const dropdownContext = useDropdownMenu();
  const { states, methods } = dropdownContext;
  const { toggleOpen } = methods;

  const handleClickOutside = () => {
    if (states.open && toggleOpen) toggleOpen();
  };

  useClickOutside(DropdownContentRef, handleClickOutside);
  return <RootWrapper ref={DropdownContentRef}>{children}</RootWrapper>;
};

const DropdownMenuTrigger = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;

  const dropdownContext = useDropdownMenu();
  const { id, states, methods } = dropdownContext;
  const { toggleOpen } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (toggleOpen) toggleOpen();
  };

  return (
    <Button
      id={id.split("|").at(0)}
      onClick={handleClick}
      aria-haspopup="menu"
      data-state={applyDataState(Boolean(states.open))}
      {...restProps}
    >
      {children}
    </Button>
  );
};

const DropdownMenuPortal = (props: IDropdownPortalProperties) => {
  const { container, children } = props;
  const [hasMounted, setHasMounted] = React.useState<boolean>(false);
  const PortalRoot = document.querySelector(`#${container}`)!;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  return ReactDOM.createPortal(children, PortalRoot);
};

const DropdownMenuContent = (props: IDropdownContentProperties) => {
  const { raw, sizing, defaultOpen, side, children, ...restProps } = props;

  const dropdownContext = useDropdownMenu();
  const { id, states, methods } = dropdownContext;
  const { toggleOpen } = methods;

  React.useEffect(() => {
    if (defaultOpen && toggleOpen) toggleOpen();
  }, []);

  return (
    <React.Fragment>
      {states.open && (
        <ContentWrapper
          id={id.split("|").at(-1)}
          role="menu"
          tabIndex={-1}
          aria-orientation="vertical"
          aria-labelledby={id.split("|").at(0)}
          data-state={applyDataState(Boolean(states.open))}
          data-sizing={sizing || ComponentSizeEnum.Medium}
          data-side={side}
          data-align={side}
          data-raw={Boolean(raw)}
          {...restProps}
        >
          {children}
        </ContentWrapper>
      )}
    </React.Fragment>
  );
};

const DropdownMenuItem = (props: IDropdownItemProperties) => {
  const { raw, onClick, radio, disabled, children, ...restProps } = props;

  const dropdownContext = useDropdownMenu();
  const { toggleOpen } = dropdownContext.methods;

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

DropdownMenu.Root = DropdownMenuRoot;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Item = DropdownMenuItem;

export {
  DropdownMenuRoot,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
};
