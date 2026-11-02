export type SpeechStatus =
  | "idle"
  | "requesting-permission"
  | "listening"
  | "processing"
  | "error"
  | "denied"
  | "unsupported";

export type SpeechProcessing = "on-device" | "cloud" | "unknown";

export type SpeechPermissionState = "granted" | "denied" | "prompt" | "unknown";

export type SpeechErrorCode =
  | "not-allowed"
  | "no-speech"
  | "audio-capture"
  | "network"
  | "aborted"
  | "language-not-supported"
  | "unsupported"
  | "unknown";

export interface SpeechWord {
  text: string;
  confidence: number;
  start: number;
  end: number;
}

export interface TranscriptChunk {
  text: string;
  confidence?: number;
  words?: SpeechWord[];
  isFinal: boolean;
}

export interface SpeechError {
  code: SpeechErrorCode;
  message: string;
  cause?: unknown;
}

export interface SpeechEngineStartOptions {
  lang: string;
  continuous: boolean;
}

export interface SpeechEngine {
  readonly id: string;
  readonly processing: SpeechProcessing;
  isSupported(): boolean;
  start(opts: SpeechEngineStartOptions): Promise<void>;
  stop(): void;
  on(event: "interim" | "final", cb: (r: TranscriptChunk) => void): () => void;
  on(event: "error", cb: (e: SpeechError) => void): () => void;
  on(event: "end", cb: () => void): () => void;
}

export type SpeechEngineInput = SpeechEngine | (() => SpeechEngine);

export const SPEECH_ERROR_MESSAGES: Record<SpeechErrorCode, string> = {
  "not-allowed": "Microphone access was denied.",
  "no-speech": "No speech was detected.",
  "audio-capture": "No microphone was found.",
  network: "A network error interrupted dictation.",
  aborted: "Dictation was interrupted.",
  "language-not-supported": "The selected language is not supported.",
  unsupported: "Speech recognition is not supported in this browser.",
  unknown: "Dictation could not be completed.",
};

export const normalizeSpeechErrorCode = (
  error: string | undefined,
): SpeechErrorCode => {
  switch (error) {
    case "not-allowed":
    case "service-not-allowed":
      return "not-allowed";
    case "no-speech":
      return "no-speech";
    case "audio-capture":
      return "audio-capture";
    case "network":
      return "network";
    case "aborted":
      return "aborted";
    case "language-not-supported":
      return "language-not-supported";
    default:
      return "unknown";
  }
};

export const createSpeechError = (
  code: SpeechErrorCode,
  message?: string,
  cause?: unknown,
): SpeechError => ({
  code,
  message: message ?? SPEECH_ERROR_MESSAGES[code],
  cause,
});

export const getSpeechErrorMessage = (code: SpeechErrorCode): string =>
  SPEECH_ERROR_MESSAGES[code];

export const isSpeechError = (error: unknown): error is SpeechError => {
  if (typeof error !== "object" || error === null) return false;

  return (
    "code" in error &&
    "message" in error &&
    typeof (error as SpeechError).code === "string" &&
    typeof (error as SpeechError).message === "string"
  );
};
