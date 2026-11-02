"use client";

import React from "react";

import {
  WebSpeechEngine,
  createSpeechError,
  isSpeechError,
  type SpeechEngine,
  type SpeechEngineInput,
  type SpeechError,
  type SpeechPermissionState,
  type SpeechProcessing,
  type SpeechStatus,
  type TranscriptChunk,
} from "@usefui/core";

export interface UseSpeechOptions {
  /**
   * SpeechEngine instance or factory. The engine is resolved once on mount;
   * remount the hook to switch implementations.
   */
  engine?: SpeechEngineInput;
  lang?: string;
  continuous?: boolean;
  transcript?: string;
  status?: SpeechStatus;
  record?: boolean;
  onTranscriptChange?: (transcript: string) => void;
  onStatusChange?: (status: SpeechStatus) => void;
  onRecordChange?: (record: boolean) => void;
  onTranscriptChunk?: (chunk: TranscriptChunk) => void;
  onError?: (error: SpeechError) => void;
}

export interface UseSpeechReturn {
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  chunks: TranscriptChunk[];
  status: SpeechStatus;
  record: boolean;
  error: SpeechError | null;
  permission: SpeechPermissionState;
  isSupported: boolean;
  processing: SpeechProcessing;
  lang: string;
  continuous: boolean;
  start: () => Promise<void>;
  stop: () => void;
  toggle: () => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;
  setTranscript: (value: string) => void;
  setStatus: (value: SpeechStatus) => void;
  setRecord: (value: boolean) => void;
}

interface TranscriptState {
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  chunks: TranscriptChunk[];
}

const EMPTY_TRANSCRIPT_STATE: TranscriptState = {
  transcript: "",
  interimTranscript: "",
  finalTranscript: "",
  chunks: [],
};

const getDefaultLanguage = (): string => {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.language === "string" &&
    navigator.language.length > 0
  ) {
    return navigator.language;
  }

  return "en-US";
};

const joinTranscript = (current: string, next: string): string => {
  const trimmed = next.trim();

  if (!trimmed) return current;
  if (!current) return trimmed;

  return `${current} ${trimmed}`;
};

export function useSpeech({
  engine: engineInput,
  lang: langOption,
  continuous = true,
  transcript: controlledTranscript,
  status: controlledStatus,
  record: controlledRecord,
  onTranscriptChange,
  onStatusChange,
  onRecordChange,
  onTranscriptChunk,
  onError,
}: UseSpeechOptions = {}): UseSpeechReturn {
  const defaultLanguage = React.useMemo(getDefaultLanguage, []);
  const lang = langOption ?? defaultLanguage;

  const [internalStatus, setInternalStatus] =
    React.useState<SpeechStatus>("idle");
  const [internalRecord, setInternalRecord] = React.useState(false);
  const [transcriptState, setTranscriptState] = React.useState<TranscriptState>(
    EMPTY_TRANSCRIPT_STATE,
  );
  const [error, setError] = React.useState<SpeechError | null>(null);
  const [permission, setPermission] =
    React.useState<SpeechPermissionState>("unknown");
  const [isSupported, setIsSupported] = React.useState(true);
  const [processing, setProcessing] =
    React.useState<SpeechProcessing>("unknown");

  const status = controlledStatus ?? internalStatus;
  const record = controlledRecord ?? internalRecord;
  const transcript = controlledTranscript ?? transcriptState.transcript;

  const [engine] = React.useState<SpeechEngine>(
    () =>
      (typeof engineInput === "function" ? engineInput() : engineInput) ??
      new WebSpeechEngine(),
  );

  const statusRef = React.useRef<SpeechStatus>(status);
  const recordRef = React.useRef<boolean>(record);
  const transcriptStateRef = React.useRef<TranscriptState>(transcriptState);
  const permissionRef = React.useRef<SpeechPermissionState>(permission);
  const mountedRef = React.useRef(false);
  const startRequestRef = React.useRef(0);
  const controlledRecordRef = React.useRef<boolean | null>(null);

  const statusControlledRef = React.useRef(controlledStatus !== undefined);
  const recordControlledRef = React.useRef(controlledRecord !== undefined);

  statusRef.current = status;
  recordRef.current = record;
  transcriptStateRef.current = transcriptState;
  permissionRef.current = permission;
  statusControlledRef.current = controlledStatus !== undefined;
  recordControlledRef.current = controlledRecord !== undefined;

  const callbacksRef = React.useRef({
    onTranscriptChange,
    onStatusChange,
    onRecordChange,
    onTranscriptChunk,
    onError,
  });

  callbacksRef.current = {
    onTranscriptChange,
    onStatusChange,
    onRecordChange,
    onTranscriptChunk,
    onError,
  };

  const resolveEngine = React.useCallback((): SpeechEngine => engine, [engine]);

  const applyStatus = React.useCallback((nextStatus: SpeechStatus) => {
    statusRef.current = nextStatus;

    if (!statusControlledRef.current) setInternalStatus(nextStatus);

    callbacksRef.current.onStatusChange?.(nextStatus);

    const nextRecord = nextStatus === "listening";

    if (recordRef.current !== nextRecord) {
      recordRef.current = nextRecord;

      if (!recordControlledRef.current) setInternalRecord(nextRecord);

      callbacksRef.current.onRecordChange?.(nextRecord);
    }
  }, []);

  const applyTranscript = React.useCallback((next: TranscriptState) => {
    transcriptStateRef.current = next;
    setTranscriptState(next);
    callbacksRef.current.onTranscriptChange?.(next.transcript);
  }, []);

  const queryPermission =
    React.useCallback(async (): Promise<SpeechPermissionState> => {
      if (typeof navigator === "undefined" || !navigator.permissions?.query) {
        return permissionRef.current;
      }

      try {
        const result = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });
        const nextPermission = result.state as SpeechPermissionState;

        permissionRef.current = nextPermission;
        setPermission(nextPermission);

        return nextPermission;
      } catch {
        return permissionRef.current;
      }
    }, []);

  const handleSpeechError = React.useCallback(
    (speechError: SpeechError) => {
      if (!mountedRef.current) return;

      if (speechError.code === "aborted") {
        setError(null);
        applyStatus("idle");
        return;
      }

      setError(speechError);
      callbacksRef.current.onError?.(speechError);

      if (speechError.code === "not-allowed") {
        permissionRef.current = "denied";
        setPermission("denied");
        applyStatus("denied");
        return;
      }

      if (speechError.code === "unsupported") {
        applyStatus("unsupported");
        return;
      }

      applyStatus("error");
    },
    [applyStatus],
  );

  const handleChunk = React.useCallback(
    (chunk: TranscriptChunk) => {
      if (!mountedRef.current) return;

      callbacksRef.current.onTranscriptChunk?.(chunk);

      const current = transcriptStateRef.current;

      if (chunk.isFinal) {
        const finalTranscript = joinTranscript(
          current.finalTranscript,
          chunk.text,
        );

        applyTranscript({
          finalTranscript,
          interimTranscript: "",
          transcript: finalTranscript,
          chunks: [...current.chunks.filter((item) => item.isFinal), chunk],
        });
        return;
      }

      applyTranscript({
        finalTranscript: current.finalTranscript,
        interimTranscript: chunk.text,
        transcript: joinTranscript(current.finalTranscript, chunk.text),
        chunks: [...current.chunks.filter((item) => item.isFinal), chunk],
      });
    },
    [applyTranscript],
  );

  const handleEnd = React.useCallback(() => {
    if (!mountedRef.current) return;

    const currentStatus = statusRef.current;

    if (
      currentStatus !== "listening" &&
      currentStatus !== "processing" &&
      currentStatus !== "requesting-permission"
    ) {
      return;
    }

    const currentTranscript = transcriptStateRef.current;

    if (currentTranscript.interimTranscript) {
      applyTranscript({
        finalTranscript: currentTranscript.finalTranscript,
        interimTranscript: "",
        transcript: currentTranscript.finalTranscript,
        chunks: currentTranscript.chunks.filter((chunk) => chunk.isFinal),
      });
    }

    applyStatus("idle");
  }, [applyStatus, applyTranscript]);

  const start = React.useCallback(async () => {
    const engine = resolveEngine();

    if (!engine.isSupported()) {
      applyStatus("unsupported");
      return;
    }

    if (
      statusRef.current === "listening" ||
      statusRef.current === "processing" ||
      statusRef.current === "requesting-permission"
    ) {
      return;
    }

    const requestId = startRequestRef.current + 1;
    startRequestRef.current = requestId;

    setError(null);
    applyStatus("requesting-permission");

    try {
      await engine.start({ lang, continuous });

      if (!mountedRef.current || requestId !== startRequestRef.current) {
        engine.stop();
        return;
      }

      const statusAfterStart = statusRef.current as SpeechStatus;

      if (statusAfterStart !== "requesting-permission") return;

      applyStatus("listening");
    } catch (caught) {
      if (requestId !== startRequestRef.current) return;

      const speechError = isSpeechError(caught)
        ? caught
        : createSpeechError(
            "unknown",
            caught instanceof Error ? caught.message : undefined,
            caught,
          );

      handleSpeechError(speechError);
    }
  }, [applyStatus, continuous, handleSpeechError, lang, resolveEngine]);

  const stop = React.useCallback(() => {
    startRequestRef.current += 1;

    const engine = resolveEngine();
    engine.stop();

    if (statusRef.current === "listening") {
      applyStatus("processing");
      return;
    }

    if (statusRef.current === "requesting-permission") {
      applyStatus("idle");
    }
  }, [applyStatus, resolveEngine]);

  const toggle = React.useCallback(async () => {
    if (statusRef.current === "listening") {
      stop();
      return;
    }

    await start();
  }, [start, stop]);

  const retry = React.useCallback(async () => {
    setError(null);
    await start();
  }, [start]);

  const reset = React.useCallback(() => {
    stop();
    applyStatus("idle");
    applyTranscript(EMPTY_TRANSCRIPT_STATE);
    setError(null);
  }, [applyStatus, applyTranscript, stop]);

  const setTranscript = React.useCallback(
    (value: string) => {
      applyTranscript({
        transcript: value,
        interimTranscript: "",
        finalTranscript: value,
        chunks: value ? [{ text: value, isFinal: true }] : [],
      });
    },
    [applyTranscript],
  );

  const setStatus = React.useCallback(
    (value: SpeechStatus) => {
      applyStatus(value);
    },
    [applyStatus],
  );

  const setRecord = React.useCallback(
    (value: boolean) => {
      if (!value) {
        stop();
        return;
      }

      void start();
    },
    [start, stop],
  );

  React.useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      startRequestRef.current += 1;
    };
  }, []);

  React.useEffect(() => {
    const engine = resolveEngine();
    const supported = engine.isSupported();

    setIsSupported(supported);
    setProcessing(engine.processing);

    if (!supported) {
      applyStatus("unsupported");
      return;
    }

    void queryPermission().then((nextPermission) => {
      if (!mountedRef.current) return;

      if (nextPermission === "denied" && statusRef.current === "idle") {
        applyStatus("denied");
      }
    });
  }, [applyStatus, queryPermission, resolveEngine]);

  React.useEffect(() => {
    const engine = resolveEngine();

    const unsubscribeInterim = engine.on("interim", handleChunk);
    const unsubscribeFinal = engine.on("final", handleChunk);
    const unsubscribeError = engine.on("error", handleSpeechError);
    const unsubscribeEnd = engine.on("end", handleEnd);

    return () => {
      engine.stop();
      unsubscribeInterim();
      unsubscribeFinal();
      unsubscribeError();
      unsubscribeEnd();
    };
  }, [handleChunk, handleEnd, handleSpeechError, resolveEngine]);

  React.useEffect(() => {
    if (!recordControlledRef.current) {
      controlledRecordRef.current = null;
      return;
    }

    if (controlledRecordRef.current === record) return;

    controlledRecordRef.current = record;
    setRecord(record);
  }, [record, setRecord]);

  return {
    transcript,
    interimTranscript: transcriptState.interimTranscript,
    finalTranscript: transcriptState.finalTranscript,
    chunks: transcriptState.chunks,
    status,
    record,
    error,
    permission,
    isSupported,
    processing,
    lang,
    continuous,
    start,
    stop,
    toggle,
    retry,
    reset,
    setTranscript,
    setStatus,
    setRecord,
  };
}
