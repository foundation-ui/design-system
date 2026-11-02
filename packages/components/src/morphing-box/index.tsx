"use client";

import React from "react";

import { useMorphingBox, MorphingBoxProvider } from "./hooks";
import { useDisabledScroll, useKeyPress } from "@usefui/hooks";

import {
  Overlay,
  IOverlayProperties,
  Button,
  IButtonProperties,
  IScrollAreaProperties,
} from "..";
import { MorphingBoxWrapper, Trigger } from "./styles";
import { applyDataState } from "../utils";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  KeyBindingEnum,
} from "../../../../types";

export interface IMorphingBoxTriggerProperties extends IButtonProperties {
  threshold?: number;
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "left";
  gap?: number;
}

export interface IMorphingBoxItemProperties
  extends
    IComponentStyling,
    IComponentSize,
    IScrollAreaProperties,
    React.ComponentProps<"dialog"> {
  lock?: boolean;
  direction?:
    | "top-left-bottom-center"
    | "top-bottom"
    | "top-right-bottom-center"
    | "right-left"
    | "bottom-right-top-center"
    | "bottom-top"
    | "bottom-left-top-center"
    | "left-right";
}

const MorphingBoxRoot = ({ children }: React.ComponentProps<"div">) => {
  return <MorphingBoxProvider>{children}</MorphingBoxProvider>;
};
MorphingBoxRoot.displayName = "MorphingBox.Root";

const MorphingBox = (props: IMorphingBoxItemProperties) => {
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
  const { states, methods } = useMorphingBox();
  const { getMorphingBoxId, toggleMorphingBox } = methods;
  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);

  const triggerId = getMorphingBoxId && getMorphingBoxId("trigger");
  const contentId = getMorphingBoxId && getMorphingBoxId("content");

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
    if (open && toggleMorphingBox) {
      return toggleMorphingBox();
    }
  }, [open]);

  React.useEffect(() => {
    if (shortcut && shortcutControls && toggleMorphingBox) {
      return toggleMorphingBox();
    }
  }, [shortcutControls]);

  useDisabledScroll(lock && isOpen);

  if (!mounted && !isOpen) return null;
  return (
    <MorphingBoxWrapper
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
    </MorphingBoxWrapper>
  );
};
MorphingBox.displayName = "MorphingBox";

const MorphingBoxTrigger = (props: IMorphingBoxTriggerProperties) => {
  const {
    gap,
    position = "bottom-right",
    threshold = 24,
    onClick,
    children,
    ...restProps
  } = props;
  const { states, methods } = useMorphingBox();
  const { getMorphingBoxId, toggleMorphingBox } = methods;

  const triggerId = getMorphingBoxId && getMorphingBoxId("trigger");
  const contentId = getMorphingBoxId && getMorphingBoxId("content");
  const isOpen = Boolean(states.open);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleMorphingBox) toggleMorphingBox();
    if (onClick) onClick(event);
  };

  return (
    <Trigger
      id={String(triggerId)}
      onClick={handleClick}
      aria-controls={String(contentId)}
      aria-expanded={isOpen}
      data-state={applyDataState(isOpen)}
      data-position={position}
      $gap={gap}
    >
      <Button {...restProps}>{children}</Button>
    </Trigger>
  );
};
MorphingBoxTrigger.displayName = "MorphingBox.Trigger";

const MorphingBoxControl = (props: IButtonProperties) => {
  const { onClick, children, ...restProps } = props;
  const { states, methods } = useMorphingBox();
  const { getMorphingBoxId, toggleMorphingBox } = methods;

  const innerControlId = getMorphingBoxId && getMorphingBoxId("inner-control");
  const contentId = getMorphingBoxId && getMorphingBoxId("content");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleMorphingBox) toggleMorphingBox();
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
MorphingBoxControl.displayName = "MorphingBox.Control";

const MorphingBoxOverlay = (props: IOverlayProperties) => {
  const { closeOnInteract = false, onClick, ...restProps } = props;
  const { states, methods } = useMorphingBox();
  const { toggleMorphingBox } = methods;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnInteract && toggleMorphingBox) toggleMorphingBox();
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
MorphingBoxOverlay.displayName = "MorphingBox.Overlay";

MorphingBox.Root = MorphingBoxRoot;
MorphingBox.Trigger = MorphingBoxTrigger;
MorphingBox.Control = MorphingBoxControl;
MorphingBox.Overlay = MorphingBoxOverlay;

export {
  MorphingBox,
  MorphingBoxRoot,
  MorphingBoxTrigger,
  MorphingBoxControl,
  MorphingBoxOverlay,
};
