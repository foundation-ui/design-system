import React from "react";

import { useKeyPress, useDisabledScroll } from "@foundation-ui/hooks";
import { SheetProvider, useSheet } from "./hooks";

import { ScrollArea, Button, Overlay } from "../";
import { SheetWrapper } from "./styles";

import { applyDataState } from "../utils";

import { IButtonProperties } from "../button";
import {
  ComponentVariantEnum,
  ComponentSizeEnum,
  ComponentSideEnum,
  IComponentStyling,
  IComponentSize,
  IComponentControlProperties,
  IReactChildren,
  KeyBindingEnum,
} from "../../../../types";

export interface ISheetProperties
  extends IComponentStyling,
    IComponentSize,
    IComponentControlProperties,
    React.ComponentProps<"dialog"> {
  side?: "left" | "right";
  lock?: boolean;
  overlay?: boolean;
  closeOnInteract?: boolean;
  open?: boolean;
}

export interface ISheetComposition {
  Root: typeof SheetRoot;
  Trigger: typeof SheetTrigger;
}

const SheetRoot = ({ children }: IReactChildren) => {
  return <SheetProvider>{children}</SheetProvider>;
};
SheetRoot.displayName = "Sheet.Root";

/**
 * Sheets are component that provides additional information in a top layer.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the sheet.
 * - Ensure that the sheet is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the sheet.
 * - Ensure that the sheet is responsive and adapts to different screen sizes and orientations.
 *
 * @param {ISheetProperties} props - The props for the Sheet component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {string} props.shortcut - The key combination used as keyboard shortcuts to trigger the sheet.
 * @param {string} props.hotkey - The key to use in the key combination for the keyboard shortcuts.
 * @param {KeyBindingEnum} props.bindkey - The modifier key to use in the key combination.
 * @param {TComponentSide} props.sizing - The size of the sheet.
 * @param {ComponentSideEnum} props.side - The side of the sheet.
 * @param {boolean} props.open - Whether the sheet should be open by default.
 * @param {boolean} props.lock - Whether the sheet blocks the scroll once opened. True by default.
 * @param {boolean} props.overlay - Whether the sheet has an overlay between the page and the sheet itself.
 * @param {boolean} props.closeOnInteract - Whether the over should be closed if interacted with.
 * @param {ReactNode} props.children - The content to be rendered inside the sheet.
 * @returns {ReactElement} The Sheet component.
 */
const Sheet = (props: ISheetProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    side = ComponentSideEnum.Right,
    lock = true,
    overlay = true,
    closeOnInteract = true,
    open,
    shortcut,
    bindkey = KeyBindingEnum.Ctrl,
    hotkey,
    children,
    ...restProps
  } = props;
  const { id, states, methods } = useSheet();
  const { toggle } = methods;
  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);

  React.useEffect(() => {
    if (open && toggle) return toggle();
  }, [open]);

  React.useEffect(() => {
    if (shortcut && shortcutControls && toggle) {
      return toggle();
    }
  }, [shortcutControls]);

  useDisabledScroll(lock && Boolean(states.open));
  return (
    <React.Fragment>
      {states.open && (
        <React.Fragment>
          <SheetWrapper
            role="dialog"
            tabIndex={-1}
            id={String(id.containerId)}
            aria-label={props["aria-label"] ?? `${id.containerId}-sheet`}
            aria-labelledby={String(id.containerId)}
            open={Boolean(states.open)}
            data-expanded={Boolean(states.open)}
            data-state={applyDataState(Boolean(states.open))}
            data-size={sizing}
            data-side={side}
            data-raw={Boolean(raw)}
            {...restProps}
          >
            {children}
          </SheetWrapper>
          {overlay && (
            <Overlay
              onClick={() => toggle && toggle(!states.open)}
              visible={Boolean(states.open)}
              closeOnInteract={closeOnInteract}
              aria-label={
                props["aria-label"]
                  ? `${props["aria-label"]}-overlay`
                  : `${id.containerId}-sheet-overlay`
              }
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
Sheet.displayName = "Sheet";

/**
 * Sheet.Trigger are used to triggers the expansion and collapse of the associated Sheet component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive title for the trigger that accurately conveys the content of the associated sheet section.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {IButtonProperties} props - The props for the Sheet.Trigger component.
 * @param {ReactNode} props.children - The content to be rendered inside the Sheet trigger.
 * @returns {ReactElement} The Sheet.Trigger component.
 */
const SheetTrigger = (props: IButtonProperties) => {
  const {
    raw,
    onClick,
    variant = ComponentVariantEnum.Ghost,
    sizing = ComponentSizeEnum.Small,
    children,
    ...restProps
  } = props;
  const { id, methods, states } = useSheet();
  const { toggle } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (toggle) toggle(!states.open);
  };

  return (
    <Button
      id={id.triggerId}
      aria-controls={String(id.containerId)}
      data-state={applyDataState(Boolean(states.open))}
      variant={variant}
      sizing={sizing}
      raw={Boolean(raw)}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Button>
  );
};
SheetTrigger.displayName = "Sheet.Trigger";

Sheet.Root = SheetRoot;
Sheet.Trigger = SheetTrigger;

export { Sheet, SheetRoot, SheetTrigger };
