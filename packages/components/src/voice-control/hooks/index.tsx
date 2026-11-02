"use client";

import React, { createContext, useContext } from "react";
import { useSpeech } from "@usefui/hooks";

import type {
  IVoiceControlContext,
  IVoiceControlRootProperties,
} from "../types";

const noop = (): void => {};
const noopAsync = async (): Promise<void> => {};

const defaultVoiceControlContext: IVoiceControlContext = {
  id: "",
  states: {
    transcript: "",
    interimTranscript: "",
    finalTranscript: "",
    chunks: [],
    status: "idle",
    record: false,
    error: null,
    permission: "unknown",
    isSupported: true,
    processing: "unknown",
    lang: "en-US",
    continuous: true,
  },
  methods: {
    start: noopAsync,
    stop: noop,
    toggle: noopAsync,
    retry: noopAsync,
    reset: noop,
    setTranscript: noop,
    setStatus: noop,
    setRecord: noop,
  },
};

const VoiceControlContext = createContext<IVoiceControlContext>(
  defaultVoiceControlContext,
);

export const useVoiceControl = (): IVoiceControlContext =>
  useContext(VoiceControlContext);

export const VoiceControlProvider = ({
  children,
  ...speechOptions
}: IVoiceControlRootProperties): React.JSX.Element => {
  const id = React.useId();
  const speech = useSpeech(speechOptions);

  return (
    <VoiceControlContext.Provider
      value={{
        id,
        states: {
          transcript: speech.transcript,
          interimTranscript: speech.interimTranscript,
          finalTranscript: speech.finalTranscript,
          chunks: speech.chunks,
          status: speech.status,
          record: speech.record,
          error: speech.error,
          permission: speech.permission,
          isSupported: speech.isSupported,
          processing: speech.processing,
          lang: speech.lang,
          continuous: speech.continuous,
        },
        methods: {
          start: speech.start,
          stop: speech.stop,
          toggle: speech.toggle,
          retry: speech.retry,
          reset: speech.reset,
          setTranscript: speech.setTranscript,
          setStatus: speech.setStatus,
          setRecord: speech.setRecord,
        },
      }}
    >
      {children}
    </VoiceControlContext.Provider>
  );
};
