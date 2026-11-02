"use client";

import React from "react";

import { useKeyPress } from "@usefui/hooks";

import { PromptWrapper, ToolsWrapper, AuxiliaryWrapper } from "./styles";

import { Textarea } from "../text-area";
import { Viewport } from "../viewport";

import type { IViewportProperties } from "../viewport/types";
import type { IPromptProperties } from "./types";

import { KeyBindingEnum } from "../types";

export interface PromptComposition {
  Root: typeof PromptRoot;
  Tools: typeof PromptTools;
  Auxiliary: typeof PromptAuxiliary;
}

/**
 * Prompt component.
 *
 * @returns {ReactElement} The Prompt component.
 */
const Prompt = (props: IPromptProperties) => {
  const {
    shortcut,
    bindkey = KeyBindingEnum.Ctrl,
    hotkey,
    onSubmit,
    cleanup = false,
    onCleanup,
    disabled = false,
    onChange,
    onPaste,
    onCut,
    onDrop,
    onKeyDown,
    onBeforeInput,
    ...restProps
  } = props;
  const promptRef = React.useRef<HTMLTextAreaElement | null>(null);
  const shortcutControls = useKeyPress(String(hotkey), true, bindkey);

  const onSubmitRef = React.useRef(onSubmit);
  const onCleanupRef = React.useRef(onCleanup);
  const cleanupRef = React.useRef(cleanup);
  const disabledRef = React.useRef(disabled);

  const clearTextarea = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    setter?.call(el, "");
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const guard =
    <E extends React.SyntheticEvent>(handler?: (e: E) => void) =>
    (e: E) => {
      if (disabledRef.current) {
        e.preventDefault();
        return;
      }
      handler?.(e);
    };

  React.useEffect(() => {
    onSubmitRef.current = onSubmit;
    onCleanupRef.current = onCleanup;
    cleanupRef.current = cleanup;
    disabledRef.current = disabled;
  });

  React.useEffect(() => {
    if (disabledRef.current) return; // disabled: no actions whatsoever
    if (!shortcut || !shortcutControls) return;

    onSubmitRef.current?.();

    if (cleanupRef.current) {
      clearTextarea(promptRef.current);
      onCleanupRef.current?.();
    }
  }, [shortcutControls, shortcut]);

  return (
    <Textarea
      ref={promptRef}
      autoComplete="off"
      sizing="large"
      variant="secondary"
      resizable={false}
      {...restProps}
      disabled={disabled}
      readOnly={disabled || restProps.readOnly}
      aria-disabled={disabled || undefined}
      onChange={guard(onChange)}
      onPaste={guard(onPaste)}
      onCut={guard(onCut)}
      onDrop={guard(onDrop)}
      onBeforeInput={guard(onBeforeInput)}
      onKeyDown={guard(onKeyDown)}
    />
  );
};
Prompt.displayName = "Prompt";

/**
 * PromptRoot component.
 *
 * @returns {ReactElement} The PromptRoot component.
 */
const PromptRoot = (props: React.ComponentProps<"div">) => {
  const { children, ...restProps } = props;
  return <PromptWrapper {...restProps}>{children}</PromptWrapper>;
};
PromptRoot.displayName = "Prompt.Root";

/**
 * PromptTools component.
 *
 * @returns {ReactElement} The PromptTools component.
 */
const PromptTools = (props: React.ComponentProps<"div">) => {
  const { children, ...restProps } = props;
  return <ToolsWrapper {...restProps}>{children}</ToolsWrapper>;
};
PromptTools.displayName = "Prompt.Tools";

/**
 * PromptAuxiliary component.
 *
 * @returns {ReactElement} The PromptAuxiliary component.
 */
const PromptAuxiliary = (
  props: IViewportProperties & React.ComponentProps<"div">,
) => {
  const {
    height = 0,
    direction = "x",
    children,
    className,
    ...restProps
  } = props;

  return (
    <AuxiliaryWrapper $height={height}>
      <Viewport
        height={height}
        direction={direction}
        className={className}
        style={{ width: "max-content" }}
        {...restProps}
      >
        {children}
      </Viewport>
    </AuxiliaryWrapper>
  );
};
PromptAuxiliary.displayName = "Prompt.Auxiliary";

Prompt.Root = PromptRoot;
Prompt.Tools = PromptTools;
Prompt.Auxiliary = PromptAuxiliary;

export { Prompt, PromptRoot, PromptTools, PromptAuxiliary };
