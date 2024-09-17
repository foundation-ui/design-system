import React from "react";

import { useKeyPress, useDisabledScroll } from "@foundation-ui/hooks";
import { SheetProvider, useSheet } from "./hooks";

import { ScrollArea, Button, Overlay } from "../";
import { SheetWrapper } from "./styles";

import { IButtonProperties } from "../button";
import {
  ComponentVariantEnum,
  ComponentSizeEnum,
  ComponentSideEnum,
  IComponentStyling,
  IComponentSize,
  IComponentControlProperties,
  IReactChildren,
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

const SheetRoot = ({ children }: IReactChildren) => {
  return <SheetProvider>{children}</SheetProvider>;
};
SheetRoot.displayName = SheetRoot;

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
    bindkey,
    hotkey,
    children,
    ...restProps
  } = props;
  const { id, states, methods } = useSheet();
  const { toggle, setOpen } = methods;
  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);

  React.useEffect(() => {
    if (open && setOpen) return setOpen(true);
  }, [open]);

  React.useEffect(() => {
    if (shortcut && shortcutControls && toggle)
      return toggle(!Boolean(states.open));
  }, [shortcutControls]);

  if (lock) useDisabledScroll(Boolean(states.open));

  return (
    <React.Fragment>
      {states.open && (
        <React.Fragment>
          <ScrollArea
            as={SheetWrapper}
            role="dialog"
            tabIndex={-1}
            id={String(id.containerId)}
            aria-label={props["aria-label"] || `${id.containerId}-sheet`}
            aria-labelledby={String(id.containerId)}
            open={Boolean(states.open)}
            data-expanded={Boolean(states.open)}
            data-size={sizing}
            data-side={side}
            data-raw={Boolean(raw)}
            {...restProps}
          >
            {children}
          </ScrollArea>
          {overlay && (
            <Overlay
              onClick={() => toggle && toggle(!states.open)}
              visible={Boolean(states.open)}
              closeOnInteract={closeOnInteract}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
Sheet.displayName = Sheet;

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
SheetTrigger.displayName = SheetTrigger;

Sheet.Root = SheetRoot;
Sheet.Trigger = SheetTrigger;

export { Sheet, SheetRoot, SheetTrigger };
