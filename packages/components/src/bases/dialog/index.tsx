import React from "react";
import ReactDOM from "react-dom";
import { useDialog, DialogProvider } from "./hooks";
import { Button, IButtonProperties } from "../button";
import { Overlay, DialogWrapper, Menu } from "./styles";
import { applyDataState } from "../../utils";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
} from "../../../../../types";

export interface IDialogPortalProperties
  extends React.ComponentPropsWithoutRef<any> {
  container: string;
}
export interface IDialogOverlayProperties
  extends IComponentStyling,
    React.ComponentPropsWithoutRef<"div"> {
  exitOnInteraction?: boolean;
}
export interface IDialogItemProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentPropsWithoutRef<any> {}

const DialogRoot = ({ children }: React.ComponentPropsWithRef<"div">) => {
  return <DialogProvider>{children}</DialogProvider>;
};

const DialogPortal = (props: IDialogPortalProperties) => {
  const { container, children } = props;

  const [hasMounted, setHasMounted] = React.useState<boolean>(false);
  const PortalRoot = document.querySelector(`#${container}`)!;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  return ReactDOM.createPortal(children, PortalRoot);
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

const DialogOverlay = (props: IDialogOverlayProperties) => {
  const { raw, exitOnInteraction, onClick, ...restProps } = props;

  const dialogContext = useDialog();
  const { states, methods } = dialogContext;
  const { toggleDialog } = methods;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (exitOnInteraction && toggleDialog) toggleDialog();
    if (onClick) onClick(event);
  };

  return (
    <React.Fragment>
      {states.open && (
        <Overlay
          onClick={handleClick}
          tabIndex={-1}
          aria-hidden={true}
          data-raw={Boolean(raw)}
          {...restProps}
        />
      )}
    </React.Fragment>
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
Dialog.Portal = DialogPortal;

export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogControl,
  DialogMenu,
  DialogOverlay,
  DialogPortal,
};
