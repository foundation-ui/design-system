import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const VoiceControlMeta: ComponentRegistryMetadata = {
  name: "VoiceControl",
  title: "VoiceControl",
  description:
    "Dictation composition built on useSpeech. VoiceControl.Root supplies the speech context, VoiceControl.Trigger starts, stops, or retries recognition, VoiceControl.Transcript renders interim or final text, VoiceControl.Status and VoiceControl.Error announce state and failures, and VoiceControl.Indicator draws an animated recording meter. The base VoiceControl export is a composition object and renders nothing.",
  category: "input",
  variants: [],
  props: [
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
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Root: {
      description:
        "Provides the dictation context. It renders no DOM element; its props are the UseSpeechOptions listed at the top level.",
      props: [
        {
          name: "engine",
          type: "SpeechEngine | (() => SpeechEngine)",
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
          name: "transcript",
          type: "string",
        },
        {
          name: "status",
          type: "SpeechStatus",
        },
        {
          name: "record",
          type: "boolean",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Trigger: {
      description:
        "Button that starts dictation, stops while listening, or retries after a denial or error. Disabled while the engine is unsupported, processing, or requesting permission. Renders a Button, so Button props are forwarded.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
          defaultValue: "primary",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "smooth",
        },
        {
          name: "aria-label",
          type: "string",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    Transcript: {
      description:
        "Renders the finalized transcript, or the live transcript including interim results when `live` is true. `live` also adds a polite log role and live region.",
      props: [
        {
          name: "live",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Status: {
      description:
        "Announces permission, listening, processing, and unsupported states. Returns null when there is nothing to say, and renders processing visually without announcing it. Children override the default copy.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Indicator: {
      description:
        "Row of animated meter lines that animate only while recording. Renders one line per `lines` value with randomized height and duration.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "small",
        },
        {
          name: "lines",
          type: "number",
          defaultValue: "5",
        },
      ],
    },
    Error: {
      description:
        "Renders only for `denied` or `error` states with recovery copy, as an assertive alert for errors and a polite status for permission denial. Children override the default copy.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Dictation with trigger, transcript, and status",
      code: `import { VoiceControl } from "@usefui/components";

export function Component() {
  return (
    <VoiceControl.Root lang="en-US" continuous>
      <div className="flex flex-column g-medium-30">
        <VoiceControl.Trigger variant="secondary" aria-label="Start dictation">
          <VoiceControl.Indicator sizing="small" lines={5} />
          Dictate
        </VoiceControl.Trigger>

        <VoiceControl.Status />
        <VoiceControl.Transcript live />
        <VoiceControl.Error />
      </div>
    </VoiceControl.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Controlled transcript and record state",
      code: `import { useState } from "react";
import { VoiceControl } from "@usefui/components";

export function Component() {
  const [transcript, setTranscript] = useState("");
  const [record, setRecord] = useState(false);

  return (
    <VoiceControl.Root
      transcript={transcript}
      record={record}
      onTranscriptChange={setTranscript}
      onRecordChange={setRecord}
      lang="en-US"
    >
      <div className="flex flex-column g-medium-30">
        <VoiceControl.Trigger aria-label="Toggle dictation">Mic</VoiceControl.Trigger>
        <VoiceControl.Transcript />
        <VoiceControl.Status />
        <VoiceControl.Error />
      </div>
    </VoiceControl.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "Root is the entry point",
      description:
        "The base `VoiceControl` export is an object of compounds, not a renderable component. Always start with VoiceControl.Root and place every other part inside it.",
    },
    {
      kind: "note",
      title: "The engine is resolved once on mount",
      description:
        "`engine` accepts a SpeechEngine instance or a factory. The default is WebSpeechEngine. Switching implementations requires remounting the Root.",
    },
    {
      kind: "note",
      title: "SpeechStatus values",
      description:
        '"idle" | "requesting-permission" | "listening" | "processing" | "error" | "denied" | "unsupported". Only `listening` sets `record` to true.',
    },
    {
      kind: "note",
      title: "Use `live` on a single transcript region",
      description:
        "When `live` is true the Transcript renders interim results and announces updates politely. Keep it false if the same transcript is mirrored into another live region to avoid duplicate announcements.",
    },
  ],
  a11y: {
    role: "button on Trigger, log on live Transcript, status/alert on Status and Error",
    keyboardNav:
      "Trigger is a Button and supports Enter and Space. It exposes `aria-pressed` for the recording state and points at the transcript, status, and error regions through aria-controls and aria-describedby.",
    ariaAttributes: [
      "aria-pressed on Trigger (recording state)",
      "aria-controls on Trigger pointing at the transcript",
      "aria-describedby on Trigger pointing at status and error",
      'role="log" and aria-live="polite" on a live Transcript',
      'role="status" and aria-live="polite" on Status',
      'role="alert" and aria-live="assertive" on errors',
    ],
  },
  relatedComponents: ["Prompt", "Textarea", "Button", "Field", "MessageBubble"],
  aiHints: {
    useCases: [
      "dictation into a composer or form field",
      "hands-free transcript capture with live interim text",
      "accessibility-first voice input with announced errors and permission states",
    ],
    avoid: [
      "rendering the base VoiceControl export directly",
      "assuming speech recognition works in every browser — check the unsupported status",
      "multiple Root providers listening at once without a clear active target",
      "using `live` on several transcript regions at the same time",
    ],
    composesWith: [
      "VoiceControl.Root",
      "VoiceControl.Trigger",
      "VoiceControl.Transcript",
      "VoiceControl.Status",
      "VoiceControl.Indicator",
      "VoiceControl.Error",
      "Prompt",
    ],
  },
};
