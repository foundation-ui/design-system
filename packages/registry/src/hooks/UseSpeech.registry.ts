import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseSpeechMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useSpeech",
  title: "useSpeech",
  description:
    "Dictation state machine over a pluggable SpeechEngine. It defaults to WebSpeechEngine, resolves the engine once, tracks interim and final transcript chunks, derives record state from listening, queries microphone permission, and supports controlled transcript, status, and record values plus retry and reset helpers.",
  component: "Speech",
  module: "@usefui/hooks",
  code: `import { useSpeech } from "@usefui/hooks";

export function HookComponent() {
  const {
    transcript,
    status,
    record,
    isSupported,
    error,
    start,
    stop,
    retry,
    reset,
  } = useSpeech({ lang: "en-US", continuous: true });

  if (!isSupported) return <p>Speech recognition is not supported.</p>;

  return (
    <div>
      <button type="button" onClick={() => (record ? stop() : start())}>
        {record ? "Stop" : "Start"}
      </button>
      <button type="button" onClick={retry} disabled={!error}>
        Retry
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <p>{transcript}</p>
      <small>{status}</small>
    </div>
  );
}`,
  arguments: [
    {
      name: "engine",
      type: "SpeechEngine | (() => SpeechEngine)",
    },
    {
      name: "lang",
      type: "string",
      defaultValue: 'navigator.language (falls back to "en-US")',
    },
    {
      name: "continuous",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "transcript",
      type: "string",
    },
    {
      name: "status",
      type: '"idle" | "requesting-permission" | "listening" | "processing" | "error" | "denied" | "unsupported"',
    },
    {
      name: "record",
      type: "boolean",
    },
    {
      name: "onTranscriptChange",
      type: "(transcript: string) => void",
    },
    {
      name: "onStatusChange",
      type: "(status: SpeechStatus) => void",
    },
    {
      name: "onRecordChange",
      type: "(record: boolean) => void",
    },
    {
      name: "onTranscriptChunk",
      type: "(chunk: TranscriptChunk) => void",
    },
    {
      name: "onError",
      type: "(error: SpeechError) => void",
    },
  ],
  returns: [
    {
      name: "transcript",
      type: "string",
      defaultValue: '""',
    },
    {
      name: "interimTranscript",
      type: "string",
      defaultValue: '""',
    },
    {
      name: "finalTranscript",
      type: "string",
      defaultValue: '""',
    },
    {
      name: "chunks",
      type: "TranscriptChunk[]",
      defaultValue: "[]",
    },
    {
      name: "status",
      type: "SpeechStatus",
      defaultValue: '"idle"',
    },
    {
      name: "record",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "error",
      type: "SpeechError | null",
      defaultValue: "null",
    },
    {
      name: "permission",
      type: '"granted" | "denied" | "prompt" | "unknown"',
      defaultValue: '"unknown"',
    },
    {
      name: "isSupported",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "processing",
      type: '"on-device" | "cloud" | "unknown"',
      defaultValue: '"unknown"',
    },
    {
      name: "lang",
      type: "string",
    },
    {
      name: "continuous",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "start",
      type: "() => Promise<void>",
    },
    {
      name: "stop",
      type: "() => void",
    },
    {
      name: "toggle",
      type: "() => Promise<void>",
    },
    {
      name: "retry",
      type: "() => Promise<void>",
    },
    {
      name: "reset",
      type: "() => void",
    },
    {
      name: "setTranscript",
      type: "(value: string) => void",
    },
    {
      name: "setStatus",
      type: "(value: SpeechStatus) => void",
    },
    {
      name: "setRecord",
      type: "(value: boolean) => void",
    },
  ],
  types: `interface UseSpeechOptions {
  /** Engine instance or factory. Resolved once on mount. Defaults to WebSpeechEngine. */
  engine?: SpeechEngine | (() => SpeechEngine);
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

interface UseSpeechReturn {
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

type SpeechStatus =
  | "idle"
  | "requesting-permission"
  | "listening"
  | "processing"
  | "error"
  | "denied"
  | "unsupported";

type SpeechProcessing = "on-device" | "cloud" | "unknown";
type SpeechPermissionState = "granted" | "denied" | "prompt" | "unknown";

interface TranscriptChunk {
  text: string;
  confidence?: number;
  words?: SpeechWord[];
  isFinal: boolean;
}

interface SpeechWord {
  text: string;
  confidence: number;
  start: number;
  end: number;
}

interface SpeechError {
  code:
    | "not-allowed"
    | "no-speech"
    | "audio-capture"
    | "network"
    | "aborted"
    | "language-not-supported"
    | "unsupported"
    | "unknown";
  message: string;
  cause?: unknown;
}

interface SpeechEngine {
  readonly id: string;
  readonly processing: SpeechProcessing;
  isSupported(): boolean;
  start(opts: { lang: string; continuous: boolean }): Promise<void>;
  stop(): void;
  on(event: "interim" | "final", cb: (chunk: TranscriptChunk) => void): () => void;
  on(event: "error", cb: (error: SpeechError) => void): () => void;
  on(event: "end", cb: () => void): () => void;
}`,
};
