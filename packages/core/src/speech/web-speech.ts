import {
  createSpeechError,
  normalizeSpeechErrorCode,
  type SpeechEngine,
  type SpeechEngineStartOptions,
  type SpeechError,
  type TranscriptChunk,
} from "../types";

interface RecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface RecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  readonly [index: number]: RecognitionAlternative;
}

interface RecognitionResultList {
  readonly length: number;
  readonly [index: number]: RecognitionResult;
}

interface RecognitionEvent {
  resultIndex: number;
  results: RecognitionResultList;
}

interface RecognitionErrorEvent {
  error: string;
  message?: string;
}

interface RecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort?(): void;
}

type RecognitionConstructor = new () => RecognitionInstance;

type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionConstructor;
  webkitSpeechRecognition?: RecognitionConstructor;
};

const getRecognitionConstructor = (): RecognitionConstructor | null => {
  if (typeof window === "undefined") return null;

  const speechWindow = window as SpeechWindow;
  return (
    speechWindow.SpeechRecognition ??
    speechWindow.webkitSpeechRecognition ??
    null
  );
};

interface WebSpeechListeners {
  interim: Set<(chunk: TranscriptChunk) => void>;
  final: Set<(chunk: TranscriptChunk) => void>;
  error: Set<(error: SpeechError) => void>;
  end: Set<() => void>;
}

const createListenerStore = (): WebSpeechListeners => ({
  interim: new Set(),
  final: new Set(),
  error: new Set(),
  end: new Set(),
});

export class WebSpeechEngine implements SpeechEngine {
  readonly id = "web-speech";
  readonly processing = "unknown" as const;

  private recognition: RecognitionInstance | null = null;
  private listeners: WebSpeechListeners = createListenerStore();
  private active = false;

  isSupported(): boolean {
    return getRecognitionConstructor() !== null;
  }

  async start(opts: SpeechEngineStartOptions): Promise<void> {
    const recognition = this.getRecognition();

    if (!recognition) {
      throw createSpeechError(
        "unsupported",
        "Speech recognition is not supported in this browser.",
      );
    }

    recognition.lang = opts.lang;
    recognition.continuous = opts.continuous;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    this.active = true;

    try {
      recognition.start();
    } catch (error) {
      this.active = false;

      if (error instanceof DOMException && error.name === "InvalidStateError") {
        return;
      }

      throw createSpeechError(
        "unknown",
        error instanceof Error
          ? error.message
          : "Dictation could not be started.",
        error,
      );
    }
  }

  stop(): void {
    if (!this.recognition) return;

    try {
      if (this.active) this.recognition.stop();
      else this.recognition.abort?.();
    } catch {
      this.active = false;
    }
  }

  on(event: "interim" | "final", cb: (r: TranscriptChunk) => void): () => void;
  on(event: "error", cb: (e: SpeechError) => void): () => void;
  on(event: "end", cb: () => void): () => void;
  on(
    event: "interim" | "final" | "error" | "end",
    cb:
      | ((chunk: TranscriptChunk) => void)
      | ((error: SpeechError) => void)
      | (() => void),
  ): () => void {
    if (event === "interim" || event === "final") {
      const listeners = this.listeners[event];
      const listener = cb as (chunk: TranscriptChunk) => void;

      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    if (event === "error") {
      const listeners = this.listeners.error;
      const listener = cb as (error: SpeechError) => void;

      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    const listeners = this.listeners.end;
    const listener = cb as () => void;

    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  private getRecognition(): RecognitionInstance | null {
    if (this.recognition) return this.recognition;

    const Recognition = getRecognitionConstructor();
    if (!Recognition) return null;

    const recognition = new Recognition();

    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => this.handleResult(event);
    recognition.onerror = (event) => this.handleError(event);
    recognition.onend = () => {
      this.active = false;
      this.emitEnd();
    };

    this.recognition = recognition;
    return recognition;
  }

  private handleResult(event: RecognitionEvent): void {
    for (let index = event.resultIndex; index < event.results.length; index++) {
      const result = event.results[index];
      const alternative = result?.[0];

      if (!result || !alternative?.transcript) continue;

      const chunk: TranscriptChunk = {
        text: alternative.transcript,
        confidence: Number.isFinite(alternative.confidence)
          ? alternative.confidence
          : undefined,
        isFinal: Boolean(result.isFinal),
      };

      if (chunk.isFinal) this.emitChunk("final", chunk);
      else this.emitChunk("interim", chunk);
    }
  }

  private handleError(event: RecognitionErrorEvent): void {
    const code = normalizeSpeechErrorCode(event.error);

    this.emitError(createSpeechError(code, event.message));
  }

  private emitChunk(event: "interim" | "final", chunk: TranscriptChunk): void {
    this.listeners[event].forEach((listener) => listener(chunk));
  }

  private emitError(error: SpeechError): void {
    this.listeners.error.forEach((listener) => listener(error));
  }

  private emitEnd(): void {
    this.listeners.end.forEach((listener) => listener());
  }
}
