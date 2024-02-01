import React from "react";
import { useDialog, DialogProvider } from "./hooks";
import { Overlay, IOverlayProperties, Button, IButtonProperties } from "../../";
import { DialogWrapper, Menu } from "./styles";
import { applyDataState } from "../../utils";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
} from "../../../../../types";

export interface IDialogOverlayProperties
  extends IComponentStyling,
    React.ComponentProps<"div"> {
  exitOnInteraction?: boolean;
}
export interface IDialogItemProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentProps<any> {}

const DialogRoot = ({ children }: React.ComponentProps<"div">) => {
  return <DialogProvider>{children}</DialogProvider>;
};

const Dialog = (props: IDialogItemProperties) => {
  const { raw, sizing, open, children, ...restProps } = props;

  const dialogContext = useDialog();
  const { states, methods } = dialogContext;
  const { getDialogId, toggleDialog } = methods;

  const triggerId = getDialogId && getDialogId("trigger");
  const contentId = getDialogId && getDialogId("content");

  React.useEffect(() => {
    if (open && toggleDialog) toggleDialog();
  }, []);

  return (
    <React.Fragment>
      {states.open && (
        <DialogWrapper
          role="dialog"
          tabIndex={-1}
          id={String(contentId)}
          open={Boolean(states.open)}
          aria-labelledby={String(triggerId)}
          data-state={applyDataState(Boolean(states.open))}
          data-size={sizing || ComponentSizeEnum.Medium}
          data-raw={Boolean(raw)}
          {...restProps}
        >
          {children}
        </DialogWrapper>
      )}
    </React.Fragment>
  );
};

const DialogOverlay = (props: IOverlayProperties) => {
  const { closeOnInteract, onClick, ...restProps } = props;

  const dialogContext = useDialog();
  const { states, methods } = dialogContext;
  const { toggleDialog } = methods;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnInteract && toggleDialog) toggleDialog();
    if (onClick) onClick(event);
  };

  return (
    <Overlay
      visible={Boolean(states.open)}
      closeOnInteract={closeOnInteract}
      onClick={handleClick}
      {...restProps}
    />
  );
};

const DialogTrigger = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;

  const dialogContext = useDialog();
  const { states, methods } = dialogContext;
  const { getDialogId, toggleDialog } = methods;

  const triggerId = getDialogId && getDialogId("trigger");
  const contentId = getDialogId && getDialogId("content");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleDialog) toggleDialog();
    if (onClick) onClick(event);
  };

  return (
    <Button
      id={String(triggerId)}
      onClick={handleClick}
      aria-controls={String(contentId)}
      aria-expanded={Boolean(states.open)}
      data-state={applyDataState(Boolean(states.open))}
      {...restProps}
    >
      {children}
    </Button>
  );
};

const DialogMenu = (props: IDialogItemProperties) => {
  const { raw, children, ...restProps } = props;

  return (
    <Menu data-raw={Boolean(raw)} {...restProps}>
      {children}
    </Menu>
  );
};

const DialogControl = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;

  const dialogContext = useDialog();
  const { states, methods } = dialogContext;
  const { getDialogId, toggleDialog } = methods;

  const innerControlId = getDialogId && getDialogId("inner-control");
  const contentId = getDialogId && getDialogId("content");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleDialog) toggleDialog();
    if (onClick) onClick(event);
  };

  return (
    <Button
      id={String(innerControlId)}
      onClick={handleClick}
      aria-controls={String(contentId)}
      aria-expanded={Boolean(states.open)}
      data-state={applyDataState(Boolean(states.open))}
      {...restProps}
    >
      {children}
    </Button>
  );
};

Dialog.Root = DialogRoot;
Dialog.Trigger = DialogTrigger;
Dialog.Control = DialogControl;
Dialog.Menu = DialogMenu;
Dialog.Overlay = DialogOverlay;

export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogControl,
  DialogMenu,
  DialogOverlay,
};
