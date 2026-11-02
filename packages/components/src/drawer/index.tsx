"use client";

import React from "react";

import { useDrawer, DrawerProvider } from "./hooks";
import { useDisabledScroll, useKeyPress } from "@usefui/hooks";

import {
  Overlay,
  IOverlayProperties,
  Button,
  IButtonProperties,
  IScrollAreaProperties,
} from "..";
import { DrawerWrapper, Trigger, Menu } from "./styles";
import { applyDataState } from "../utils";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  KeyBindingEnum,
} from "../../../../types";

export interface IDrawerTriggerProperties extends IButtonProperties {
  threshold?: number;
  position?: "top" | "right" | "bottom" | "left";
  gap?: number;
}

export interface IDrawerItemProperties
  extends
    IComponentStyling,
    IComponentSize,
    IScrollAreaProperties,
    React.ComponentProps<"dialog"> {
  lock?: boolean;
  direction?: "top-bottom" | "right-left" | "bottom-top" | "left-right";
}

const Drawer = (props: IDrawerItemProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    open = false,
    lock = true,
    shortcut,
    bindkey = KeyBindingEnum.Ctrl,
    direction = "bottom-top",
    hotkey,
    children,
    ...restProps
  } = props;
  const { states, methods } = useDrawer();
  const { getDrawerId, toggleDrawer } = methods;
  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);

  const triggerId = getDrawerId && getDrawerId("trigger");
  const contentId = getDrawerId && getDrawerId("content");

  const isOpen = Boolean(states.open);
  const [mounted, setMounted] = React.useState(isOpen);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLElement>) => {
    restProps.onAnimationEnd?.(event as any);
    if (event.target === event.currentTarget && !isOpen) {
      setMounted(false);
    }
  };

  React.useLayoutEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (open && toggleDrawer) {
      return toggleDrawer();
    }
  }, [open]);

  React.useEffect(() => {
    if (shortcut && shortcutControls && toggleDrawer) {
      return toggleDrawer();
    }
  }, [shortcutControls]);

  useDisabledScroll(lock && isOpen);

  if (!mounted && !isOpen) return null;
  return (
    <DrawerWrapper
      role="dialog"
      tabIndex={-1}
      id={String(contentId)}
      open={mounted}
      aria-labelledby={String(triggerId)}
      data-size={sizing}
      data-raw={Boolean(raw)}
      data-state={applyDataState(isOpen)}
      data-direction={direction}
      {...restProps}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </DrawerWrapper>
  );
};
Drawer.displayName = "Drawer";

const DrawerRoot = ({ children }: React.ComponentProps<"div">) => {
  return <DrawerProvider>{children}</DrawerProvider>;
};
DrawerRoot.displayName = "Drawer.Root";

const DrawerOverlay = (props: IOverlayProperties) => {
  const { closeOnInteract = false, onClick, ...restProps } = props;
  const { states, methods } = useDrawer();
  const { toggleDrawer } = methods;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnInteract && toggleDrawer) toggleDrawer();
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
DrawerOverlay.displayName = "Drawer.Overlay";

const DrawerTrigger = (props: IDrawerTriggerProperties) => {
  const {
    gap,
    position = "bottom",
    threshold = 24,
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    style,
    children,
    ...restProps
  } = props;
  const { states, methods } = useDrawer();
  const { getDrawerId, toggleDrawer } = methods;

  const triggerId = getDrawerId && getDrawerId("trigger");
  const contentId = getDrawerId && getDrawerId("content");
  const isOpen = Boolean(states.open);

  const positionVector = {
    top: { x: 0, y: -1 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  } as const;

  const dragStart = React.useRef<{ x: number; y: number } | null>(null);
  const didDrag = React.useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY };
    didDrag.current = false;
    onPointerDown?.(event);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = dragStart.current;
    dragStart.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    onPointerUp?.(event);
    if (!start || !toggleDrawer) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const vector = positionVector[position];
    const horizontal = vector.x !== 0;

    // Movement along the axis of `position`, and the cross-axis movement
    const main = horizontal ? dx : dy;
    const cross = horizontal ? dy : dx;
    if (Math.abs(main) < threshold || Math.abs(main) < Math.abs(cross)) {
      return; // not a drag: let the regular click handle it
    }

    // From here on it is a drag, so swallow the click that follows
    didDrag.current = true;

    const sameDirection = main * (horizontal ? vector.x : vector.y) > 0;

    // Opposite direction to `position` => toggle (open or close)
    if (!sameDirection) toggleDrawer();
  };

  const handlePointerCancel = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    dragStart.current = null;
    didDrag.current = false;
    onPointerCancel?.(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // A drag already handled (or deliberately ignored) the interaction
    if (didDrag.current) {
      didDrag.current = false;
      event.preventDefault();
      return;
    }
    if (toggleDrawer) toggleDrawer();
    if (onClick) onClick(event);
  };

  return (
    <Trigger
      raw
      id={String(triggerId)}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      aria-controls={String(contentId)}
      aria-expanded={isOpen}
      data-state={applyDataState(isOpen)}
      data-position={position}
      $gap={gap}
      style={{
        touchAction: "none",
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Trigger>
  );
};
DrawerTrigger.displayName = "Drawer.Trigger";

const DrawerMenu = (props: IDrawerItemProperties) => {
  const { raw, children, ...restProps } = props;

  return (
    <Menu data-raw={Boolean(raw)} {...restProps}>
      {children}
    </Menu>
  );
};
DrawerMenu.displayName = "Drawer.Menu";

const DrawerControl = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;
  const { states, methods } = useDrawer();
  const { getDrawerId, toggleDrawer } = methods;

  const innerControlId = getDrawerId && getDrawerId("inner-control");
  const contentId = getDrawerId && getDrawerId("content");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleDrawer) toggleDrawer();
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
DrawerControl.displayName = "Drawer.Control";

Drawer.Root = DrawerRoot;
Drawer.Trigger = DrawerTrigger;
Drawer.Control = DrawerControl;
Drawer.Menu = DrawerMenu;
Drawer.Overlay = DrawerOverlay;

export {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerControl,
  DrawerMenu,
  DrawerOverlay,
};
