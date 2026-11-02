"use client";

import React from "react";
import { ActionWrapper, BulkActionsWrapper } from "./styles";

import {
  ComponentShapeEnum,
  ComponentSizeEnum,
  ComponentVariantEnum,
  type IComponentSize,
  type IComponentVariant,
  type IComponentShape,
  type IComponentStyling,
  type TComponentSide,
  IComponentControlProperties,
  KeyBindingEnum,
} from "../../../../types";
import { BulkActionsProvider, useBulkActions } from "./hooks";
import { Button, IButtonProperties } from "../button";
import { useKeyPress } from "@usefui/hooks";

export interface IBulkActionsComposition {
  Root: typeof BulkActionsRoot;
  Trigger: typeof BulkActionsTrigger;
  Handle: typeof BulkActionsHandle;
  Item: typeof BulkActionsItem;
}

export interface IBulkActionsProperties
  extends
    IComponentStyling,
    IComponentShape,
    IComponentSize,
    IComponentVariant,
    IComponentControlProperties,
    React.ComponentProps<"div"> {
  side?: TComponentSide;
  gap?: number;
}
export interface IBulkActionsBodyProperties
  extends IComponentStyling, React.ComponentProps<"div"> {
  side?: TComponentSide;
}
export interface IBulkActionsTriggerProperties extends IButtonProperties {}
export interface IBulkActionsItemProperties extends React.ComponentProps<"div"> {
  status?: "idle" | "pending" | "processing" | "running";
}

const BulkActions = (props: IBulkActionsProperties) => {
  const { states, methods } = useBulkActions();
  const { open, position } = states;

  const {
    raw = false,
    side = "bottom",
    gap = 6,
    sizing = ComponentSizeEnum.Small,
    variant = ComponentVariantEnum.Primary,
    shape = ComponentShapeEnum.Smooth,
    shortcut,
    bindkey,
    hotkey,
    children,
    ...restProps
  } = props;

  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const setPositionRef = React.useRef(methods?.setPosition);

  setPositionRef.current = methods?.setPosition;
  const getAnchoredPosition = (
    side: TComponentSide,
    width: number,
    height: number,
  ) => {
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    let x = (vw - width) / 2;
    let y = (vh - height) / 2;

    switch (side) {
      case "top":
        y = gap;
        break;
      case "bottom":
        y = vh - height - gap;
        break;
      case "left":
        x = gap;
        break;
      case "right":
        x = vw - width - gap;
        break;
    }

    return {
      x: Math.max(0, Math.min(x, vw - width)),
      y: Math.max(0, Math.min(y, vh - height)),
    };
  };

  React.useEffect(() => {
    if (shortcut && shortcutControls && methods.setOpen) {
      if (open) return methods.setOpen(false);
      else return methods.setOpen(true);
    }
  }, [shortcutControls]);

  React.useLayoutEffect(() => {
    if (!open) return;

    const anchor = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setPositionRef.current?.(getAnchoredPosition(side, width, height));
    };

    anchor();
    window.addEventListener("resize", anchor);
    return () => window.removeEventListener("resize", anchor);
  }, [open, side]);

  if (!open) return null;
  return (
    <BulkActionsWrapper
      ref={wrapperRef}
      data-raw={raw}
      data-variant={variant}
      data-shape={shape}
      data-size={sizing}
      data-side={side}
      $x={position.x}
      $y={position.y}
      {...restProps}
    >
      {children}
    </BulkActionsWrapper>
  );
};
BulkActions.displayName = "BulkActions";

const BulkActionsRoot = ({ children }: { children: React.ReactNode }) => {
  return <BulkActionsProvider>{children}</BulkActionsProvider>;
};
BulkActionsRoot.displayName = "BulkActions.Root";

const BulkActionsHandle = (props: IBulkActionsTriggerProperties) => {
  const {
    disabled,
    sizing = ComponentSizeEnum.Small,
    variant = ComponentVariantEnum.Ghost,
    children,
    ...restProps
  } = props;

  const isDraggingRef = React.useRef(false);
  const { id, states, methods } = useBulkActions();
  const { position, dragOffsetRef } = states;
  const { setPosition, setIsDragging } = methods;

  const handleDragMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      isDraggingRef.current = true;
      setIsDragging?.(true);
      dragOffsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position, setIsDragging, dragOffsetRef],
  );

  React.useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const off = dragOffsetRef.current;
      if (!off) return;

      setPosition?.({
        x: e.clientX - off.x,
        y: e.clientY - off.y,
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging?.(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragOffsetRef, setIsDragging, setPosition]);

  return (
    <Button
      id={String(id)}
      variant={variant}
      sizing={sizing}
      disabled={disabled}
      onMouseDown={handleDragMouseDown}
      style={{ cursor: "grab" }}
      {...restProps}
    >
      {children}
    </Button>
  );
};
BulkActionsHandle.displayName = "BulkActions.Handle";

const BulkActionsTrigger = (props: IBulkActionsTriggerProperties) => {
  const { disabled, onClick, children, ...restProps } = props;

  const { id, states, methods } = useBulkActions();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick && onClick(event);

      if (methods && methods.setOpen) {
        if (states?.open) methods.setOpen(false);
        else methods.setOpen(true);
      }
    }
  };
  return (
    <Button id={String(id)} onClick={handleClick} {...restProps}>
      {children}
    </Button>
  );
};
BulkActionsTrigger.displayName = "BulkActions.Trigger";

const BulkActionsItem = (props: IBulkActionsItemProperties) => {
  const { status, children, ...restProps } = props;

  return (
    <ActionWrapper data-status={status} {...restProps}>
      {children}
    </ActionWrapper>
  );
};
BulkActionsItem.displayName = "BulkActions.Item";

BulkActions.Root = BulkActionsRoot;
BulkActions.Trigger = BulkActionsTrigger;
BulkActions.Handle = BulkActionsHandle;
BulkActions.Item = BulkActionsItem;

export {
  BulkActions,
  BulkActionsRoot,
  BulkActionsTrigger,
  BulkActionsHandle,
  BulkActionsItem,
};
