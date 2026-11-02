"use client";

import React from "react";

import { VoiceControlProvider, useVoiceControl } from "./hooks";
import { getSpeechErrorMessage } from "@usefui/core";

import {
  VoiceControlTranscriptWrapper,
  IndicatorWrapper,
  IndicatorLine,
} from "./styles";
import { Button } from "../button";

import { ComponentSizeEnum } from "../../../../types";
import type { IVoiceControlRootProperties, IVoiceControlStates } from "./types";

import type {
  IVoiceControlErrorProperties,
  IVoiceControlStatusProperties,
  IVoiceControlTranscriptProperties,
  IVoiceControlTriggerProperties,
  VoiceControlIndicatorProperties,
} from "./types";

export interface IVoiceControlComposition {
  Root: typeof VoiceControlRoot;
  Trigger: typeof VoiceControlTrigger;
  Transcript: typeof VoiceControlTranscript;
  Status: typeof VoiceControlStatus;
  Indicator: typeof VoiceControlIndicator;
  Error: typeof VoiceControlError;
}

const getStatusMessage = (
  states: IVoiceControlStates,
): React.ReactNode | null => {
  switch (states.status) {
    case "requesting-permission":
      return "Allow microphone access in the browser prompt to start dictation.";
    case "listening":
      return "Listening";
    case "processing":
      return "Processing dictation…";
    case "unsupported":
      return "Speech recognition is not supported in this browser.";
    default:
      return null;
  }
};

const getErrorCopy = (states: IVoiceControlStates): string => {
  if (states.status === "denied") {
    return "Microphone access was denied. Enable microphone access in your browser settings, then try again.";
  }

  if (states.error) {
    return `Dictation error: ${getSpeechErrorMessage(states.error.code)}`;
  }

  return "Dictation could not be completed. Please try again.";
};

/**
 * VoiceControl.Root provides the dictation context shared by the VoiceControl
 * compounds. It does not render a DOM element.
 *
 * **Best practices:**
 *
 * - Wrap VoiceControl.Trigger, VoiceControl.Transcript, VoiceControl.Status
 *   and VoiceControl.Error inside VoiceControl.Root.
 * - Use `engine` to provide a privacy-first or cloud-backed SpeechEngine.
 * - Use the controlled props when the transcript or recording state must be
 *   synchronized with an external form or store.
 *
 * @param {IVoiceControlRootProperties} props - The props for VoiceControl.Root.
 * @param {SpeechEngineInput} props.engine - A SpeechEngine instance or factory. Defaults to WebSpeechEngine.
 * @param {string} props.lang - Recognition language. Defaults to `navigator.language`.
 * @param {boolean} props.continuous - Whether recognition should continue listening. Defaults to true.
 * @param {string} props.transcript - Controlled transcript value.
 * @param {SpeechStatus} props.status - Controlled dictation status.
 * @param {boolean} props.record - Controlled recording state.
 * @param {ReactNode} props.children - VoiceControl compounds.
 * @returns {ReactElement} The VoiceControl provider.
 */
const VoiceControlRoot = ({
  children,
  ...speechOptions
}: IVoiceControlRootProperties): React.JSX.Element => {
  return (
    <VoiceControlProvider {...speechOptions}>{children}</VoiceControlProvider>
  );
};
VoiceControlRoot.displayName = "VoiceControl.Root";

/**
 * VoiceControl.Trigger starts, stops or retries dictation depending on the
 * current status. The browser permission prompt is triggered directly by the
 * first click. Children are required so the trigger always has a visible label
 * or icon.
 *
 * **Best practices:**
 *
 * - Provide a clear visible label or an `aria-label` for icon-only triggers.
 * - Pair the trigger with VoiceControl.Status and VoiceControl.Error so state
 *   changes and failures are announced.
 * - Keep the trigger reachable with the keyboard.
 *
 * @param {IVoiceControlTriggerProperties} props - The props for VoiceControl.Trigger.
 * @param {ReactNode} props.children - The visible trigger content.
 * @returns {ReactElement} The VoiceControl.Trigger component.
 */
const VoiceControlTrigger = (props: IVoiceControlTriggerProperties) => {
  const {
    children,
    disabled,
    onClick,
    variant,
    shape,
    sizing,
    animation,
    ...restProps
  } = props;

  const { id, states, methods } = useVoiceControl();
  const isUnsupported = states.status === "unsupported";
  const isProcessing = states.status === "processing";
  const isRequestingPermission = states.status === "requesting-permission";
  const isListening = states.status === "listening";
  const isRecoverable = states.status === "denied" || states.status === "error";
  const disabledState =
    Boolean(disabled) ||
    isUnsupported ||
    isProcessing ||
    isRequestingPermission;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || disabledState) return;

    if (isListening) {
      methods.stop();
      return;
    }

    if (isRecoverable) {
      void methods.retry();
      return;
    }

    void methods.start();
  };

  return (
    <Button
      type="button"
      aria-label={props["aria-label"]}
      aria-pressed={states.record}
      aria-controls={`${id}-transcript`}
      aria-describedby={`${id}-status ${id}-error`}
      data-state={states.status}
      data-processing={states.processing}
      disabled={disabledState}
      variant={variant}
      shape={shape}
      sizing={sizing}
      animation={animation}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Button>
  );
};
VoiceControlTrigger.displayName = "VoiceControl.Trigger";

/**
 * VoiceControl.Indicator provides a visual indication of VoiceControl's state.
 *
 * **Best practices:**
 *
 * - Wrap VoiceControl.Indicator in VoiceControl.Trigger.
 * - Use `lines` to provide configure VoiceControl.Indicator's length.
 *
 * @param {VoiceControlIndicatorProperties} props - The props for VoiceControl.Indicator.
 * @param {string} props.lines - The amount of lines in the VoiceControl.Indicator component.
 * @returns {ReactElement} The VoiceControl.Indicator component.
 */
const VoiceControlIndicator = (props: VoiceControlIndicatorProperties) => {
  const { sizing = ComponentSizeEnum.Small, lines = 5, ...restProps } = props;
  const { states } = useVoiceControl();

  type LineConfig = { duration: number; height: number };
  const [config, setConfig] = React.useState<LineConfig[]>([]);

  const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const generateLines = (count: number): LineConfig[] =>
    Array.from({ length: count }, () => ({
      duration: Number(random(1, 2).toFixed(1)),
      height: Math.round(random(33, 66)),
    }));

  React.useEffect(() => {
    setConfig(generateLines(lines));
  }, [lines]);

  return (
    <IndicatorWrapper {...restProps} data-size={sizing}>
      {Array.from({ length: lines }, (_, i) => (
        <IndicatorLine
          data-animate={String(states.record)}
          data-size={sizing}
          key={i}
          style={
            config[i]
              ? ({
                  "--line-duration": `${config[i].duration}s`,
                  "--line-height": `${config[i].height}%`,
                } as React.CSSProperties)
              : undefined
          }
        />
      ))}
    </IndicatorWrapper>
  );
};
VoiceControlIndicator.displayName = "VoiceControl.Indicator";

/**
 * VoiceControl.Transcript renders the finalized transcript, or the live
 * transcript including interim results when `live` is true.
 *
 * **Best practices:**
 *
 * - Use `live` only for a single visible transcript region on the page.
 * - Keep `live` disabled when the transcript is mirrored into another live
 *   region to avoid duplicate announcements.
 *
 * @param {IVoiceControlTranscriptProperties} props - The props for VoiceControl.Transcript.
 * @param {boolean} props.live - Render interim results and announce changes. Defaults to false.
 * @param {ReactNode} props.children - Optional custom transcript content.
 * @returns {ReactElement} The VoiceControl.Transcript component.
 */
const VoiceControlTranscript = (props: IVoiceControlTranscriptProperties) => {
  const { live = false, raw, children, ...restProps } = props;
  const { id, states } = useVoiceControl();

  const text = live ? states.transcript : states.finalTranscript;

  return (
    <VoiceControlTranscriptWrapper
      id={`${id}-transcript`}
      data-raw={Boolean(raw)}
      data-live={Boolean(live)}
      role={live ? "log" : undefined}
      aria-live={live ? "polite" : undefined}
      aria-atomic={false}
      aria-relevant={live ? "additions text" : undefined}
      {...restProps}
    >
      {children ?? text}
    </VoiceControlTranscriptWrapper>
  );
};
VoiceControlTranscript.displayName = "VoiceControl.Transcript";

/**
 * VoiceControl.Status renders and announces the current dictation status.
 * Processing is shown visually but omitted from live announcements.
 *
 * **Best practices:**
 *
 * - Place VoiceControl.Status after VoiceControl.Trigger in reading order.
 * - Use children to override the default copy for localization.
 *
 * @param {IVoiceControlStatusProperties} props - The props for VoiceControl.Status.
 * @param {ReactNode} props.children - Optional custom status content.
 * @returns {ReactElement | null} The VoiceControl.Status component.
 */
const VoiceControlStatus = (props: IVoiceControlStatusProperties) => {
  const { children, ...restProps } = props;
  const { id, states } = useVoiceControl();

  const message = children ?? getStatusMessage(states);
  const isProcessing = states.status === "processing";

  if (message === null) return null;

  return (
    <div
      id={`${id}-status`}
      role={isProcessing ? undefined : "status"}
      aria-live={isProcessing ? "off" : "polite"}
      aria-atomic={true}
      data-status={states.status}
      data-processing={states.processing}
      {...restProps}
    >
      {message}
    </div>
  );
};
VoiceControlStatus.displayName = "VoiceControl.Status";

/**
 * VoiceControl.Error renders recoverable dictation failures and permission
 * denial instructions. It includes a retry or permission-check action by
 * default.
 *
 * **Best practices:**
 *
 * - Keep VoiceControl.Error mounted so failures are announced assertively.
 * - Provide children only when custom copy and recovery actions are needed.
 *
 * @param {IVoiceControlErrorProperties} props - The props for VoiceControl.Error.
 * @param {ReactNode} props.children - Optional custom error content.
 * @returns {ReactElement | null} The VoiceControl.Error component.
 */
const VoiceControlError = (props: IVoiceControlErrorProperties) => {
  const { children, ...restProps } = props;
  const { id, states } = useVoiceControl();

  const isDenied = states.status === "denied";
  const isError = states.status === "error";

  if (!isDenied && !isError) return null;

  return (
    <div
      id={`${id}-error`}
      data-status={states.status}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic={true}
      {...restProps}
    >
      {children ?? getErrorCopy(states)}
    </div>
  );
};
VoiceControlError.displayName = "VoiceControl.Error";

const VoiceControl: IVoiceControlComposition = {
  Root: VoiceControlRoot,
  Trigger: VoiceControlTrigger,
  Transcript: VoiceControlTranscript,
  Status: VoiceControlStatus,
  Indicator: VoiceControlIndicator,
  Error: VoiceControlError,
};

export {
  VoiceControl,
  VoiceControlRoot,
  VoiceControlTrigger,
  VoiceControlTranscript,
  VoiceControlStatus,
  VoiceControlIndicator,
  VoiceControlError,
};
