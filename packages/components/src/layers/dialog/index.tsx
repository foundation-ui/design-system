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

export interface IDialogItemProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentProps<"dialog"> {}

/**
 * Dialog are used displays a modal window to the user on top of the current layer.
 *
 * **Best practices:**
 *
 * - Ensure that the dialog is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the dialog.
 * - Ensure that the dialog is responsive and adapts to different screen sizes and orientations.
 *
 * @param {IDialogItemProperties} props - The props for the Dialog component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component.
 * @param {boolean} props.open - Whether the dialog is open or not.
 * @param {ReactNode} props.children - The content to be rendered inside the dialog.
 * @returns {ReactElement} The Dialog component.
 */
const Dialog = (props: IDialogItemProperties) => {
  const { raw, sizing, open, children, ...restProps } = props;
  const { states, methods } = useDialog();
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
          data-size={sizing}
          data-raw={Boolean(raw)}
          {...restProps}
        >
          {children}
        </DialogWrapper>
      )}
    </React.Fragment>
  );
};
Dialog.displayName = "Dialog";
Dialog.defaultProps = {
  raw: false,
  open: false,
  sizing: ComponentSizeEnum.Medium,
};

const DialogRoot = ({ children }: React.ComponentProps<"div">) => {
  return <DialogProvider>{children}</DialogProvider>;
};
DialogRoot.displayName = "Dialog.Root";

const DialogOverlay = (props: IOverlayProperties) => {
  const { closeOnInteract, onClick, ...restProps } = props;
  const { states, methods } = useDialog();
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
DialogOverlay.displayName = "Dialog.Overlay";
DialogOverlay.defaultProps = {
  closeOnInteract: false,
};

/**
 * Dialog.Trigger is used to trigger the render of the associated Dialog component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated Dialog.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the Dialog.Trigger component.
 * @returns {ReactElement} The Dialog.Trigger component.
 */
const DialogTrigger = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;
  const { states, methods } = useDialog();
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
DialogTrigger.displayName = "Dialog.Trigger";

const DialogMenu = (props: IDialogItemProperties) => {
  const { raw, children, ...restProps } = props;

  return (
    <Menu data-raw={Boolean(raw)} {...restProps}>
      {children}
    </Menu>
  );
};
DialogMenu.displayName = "Dialog.Menu";
DialogMenu.defaultProps = {
  raw: false,
};

/**
 * Dialog.Control is used to trigger action inside the associated Dialog component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated action.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the Dialog.Control component.
 * @returns {ReactElement} The Dialog.Control component.
 */
const DialogControl = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;
  const { states, methods } = useDialog();
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
DialogControl.displayName = "Dialog.Control";

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
