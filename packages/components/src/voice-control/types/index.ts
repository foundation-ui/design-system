import type {
  SpeechError,
  SpeechPermissionState,
  SpeechProcessing,
  SpeechStatus,
  TranscriptChunk,
} from "@usefui/core";
import { UseSpeechOptions } from "@usefui/hooks";

import type { IReactChildren } from "../../../../../types";

export interface IVoiceControlStates {
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
}

export interface IVoiceControlMethods {
  start: () => Promise<void>;
  stop: () => void;
  toggle: () => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;
  setTranscript: (value: string) => void;
  setStatus: (value: SpeechStatus) => void;
  setRecord: (value: boolean) => void;
}

export interface IVoiceControlContext {
  id: string;
  states: IVoiceControlStates;
  methods: IVoiceControlMethods;
}

export interface IVoiceControlRootProperties
  extends IReactChildren, UseSpeechOptions {}
