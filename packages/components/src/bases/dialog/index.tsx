/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useCallback } from "react";
// import ReactDOM from "react-dom";
// import { useKeyPress } from "../../hooks";
import { applyDataState } from "../../utils";
// import {
//   IDialog,
//   IDialogComposition,
//   IDialogMenu,
//   IDialogOverlay,
//   IDialogTrigger,
//   IDialogControl,
//   IDialogPortal,
// } from "./interfaces/Dialog.interface";
import { useDialog, DialogProvider } from "./hooks/useDialog";
// import { Overlay, Body, Menu } from "./styles/Dialog.styles";
import { Button } from "../button";

const DialogRoot = ({ children }: React.ComponentPropsWithRef<"div">) => {
  return <DialogProvider>{children}</DialogProvider>;
};
DialogRoot.displayName = "Dialog.Root";

const DialogPortal = ({ container, children }: any) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  //   const PortalRoot = document.querySelector(`#${container}`)!;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  //   return ReactDOM.createPortal(children, PortalRoot);
};
DialogPortal.displayName = "Dialog.Portal";

const Dialog: React.FC<any> & any = (props: any) => {
  const { open, keyboardInteraction = true, children, ...restProps } = props;
  const dialog = useDialog();
  const triggerId = dialog.methods.getDialogId("trigger");
  const contentId = dialog.methods.getDialogId("content");
  //   const EscapeKeyPressed = useKeyPress("Escape");

  React.useLayoutEffect(() => {
    if (open) dialog.methods.toggleDialog();
  }, [open]);

  //   React.useEffect(() => {
  //     if (EscapeKeyPressed && keyboardInteraction && dialog.states.open)
  //       dialog.methods.toggleDialog();
  //   }, [EscapeKeyPressed]);

  return (
    <React.Fragment>
      {dialog.states.open && (
        <dialog
          role="dialog"
          tabIndex={-1}
          id={contentId}
          open={dialog.states.open}
          aria-labelledby={triggerId}
          data-state={applyDataState(dialog.states.open)}
          {...restProps}
        >
          {children}
        </dialog>
      )}
    </React.Fragment>
  );
};
Dialog.displayName = "Dialog";

const DialogOverlay = (props: any) => {
  const { exitIfInteract, ...restProps } = props;
  const dialog = useDialog();

  const handleClick = () => exitIfInteract && dialog.methods.toggleDialog();

  return (
    <React.Fragment>
      {dialog.states.open && (
        <div onClick={handleClick} tabIndex={-1} {...restProps} />
      )}
    </React.Fragment>
  );
};
DialogOverlay.displayName = "Dialog.Overlay";

const DialogTrigger = (props: any) => {
  const { onClickCallback, children, disabled, ...restProps } = props;
  const dialog = useDialog();
  const triggerId = dialog.methods.getDialogId("trigger");
  const contentId = dialog.methods.getDialogId("content");

  const handleClickCallback = useCallback(
    () => onClickCallback && onClickCallback(),
    []
  );

  const handleClick = () => {
    dialog.methods.toggleDialog();
    handleClickCallback();
  };

  return (
    <Button
      id={triggerId}
      disabled={disabled}
      onClick={handleClick}
      aria-controls={contentId}
      data-state={applyDataState(dialog.states.open)}
      {...restProps}
    >
      {children}
    </Button>
  );
};
DialogTrigger.displayName = "Dialog.Trigger";

const DialogMenu = (props: any) => {
  const { children, ...restProps } = props;

  return <menu {...restProps}>{children}</menu>;
};

DialogMenu.displayName = "Dialog.Menu";

const DialogControl = (props: any) => {
  const { onClickCallback, disabled, children, ...restProps } = props;
  const dialog = useDialog();
  const innerControlId = dialog.methods.getDialogId("inner-control");
  const contentId = dialog.methods.getDialogId("content");

  const handleClickCallback = useCallback(
    () => onClickCallback && onClickCallback(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClick = () => {
    dialog.methods.toggleDialog();
    handleClickCallback();
  };

  return (
    <Button
      id={innerControlId}
      disabled={disabled}
      onClick={handleClick}
      aria-controls={contentId}
      data-state={applyDataState(dialog.states.open)}
      {...restProps}
    >
      {children}
    </Button>
  );
};
DialogControl.displayName = "Dialog.Control";

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
