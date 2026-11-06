import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const VideoMeta: ComponentRegistryMetadata = {
  name: "Video",
  title: "Video",
  description:
    "Time-based media player with sanitized sources, text tracks, priority loading, poster, fallback, and fill layout. Unsafe URLs are rejected and the component renders nothing when no safe source remains.",
  category: "data",
  variants: [],
  props: [
    {
      name: "src",
      type: "string",
    },
    {
      name: "label",
      type: "string",
      required: true,
    },
    {
      name: "sources",
      type: "IVideoSource[]",
      defaultValue: "[]",
    },
    {
      name: "tracks",
      type: "IVideoTrack[]",
      defaultValue: "[]",
    },
    {
      name: "poster",
      type: "string",
    },
    {
      name: "priority",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "fallbackSrc",
      type: "string",
    },
    {
      name: "width",
      type: "number | string",
      defaultValue: "100%",
    },
    {
      name: "height",
      type: "number | string",
      defaultValue: "auto",
    },
    {
      name: "fill",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "shape",
      type: '"round" | "smooth" | "square"',
      defaultValue: "smooth",
    },
    {
      name: "controls",
      type: "boolean",
    },
    {
      name: "autoPlay",
      type: "boolean",
    },
    {
      name: "muted",
      type: "boolean",
    },
    {
      name: "loop",
      type: "boolean",
    },
    {
      name: "onError",
      type: "ReactEventHandler<HTMLVideoElement>",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Sized video with an accessible label",
      code: `import { Video } from "@usefui/components";

export function Component() {
  return (
    <Video
      src="/media/flower.mp4"
      label="Flower blooming in stop motion"
      width={512}
      height={288}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Format fallback with sources",
      code: `import { Video } from "@usefui/components";

export function Component() {
  return (
    <Video
      sources={[
        { src: "/media/flower.webm", type: "video/webm" },
        { src: "/media/flower.mp4", type: "video/mp4" },
      ]}
      autoPlay
      muted
      loop
      label="Flower blooming in stop motion"
      width={512}
      height={288}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Captions via tracks",
      code: `import { Video } from "@usefui/components";

export function Component() {
  return (
    <Video
      src="/media/flower.mp4"
      tracks={[
        {
          src: "/captions/flower.vtt",
          srcLang: "en",
          label: "English",
          kind: "captions",
          default: true,
        },
      ]}
      label="Flower blooming in stop motion"
      width={512}
      height={288}
      controls
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Poster, fallback, and error handling",
      code: `import { Video } from "@usefui/components";

export function Component() {
  return (
    <Video
      src="/media/original.mp4"
      fallbackSrc="/media/fallback.mp4"
      poster="/media/poster.jpg"
      label="Product walkthrough"
      width={512}
      height={288}
      controls
      onError={(event) => console.warn("Video failed", event)}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Fill inside a positioned parent",
      code: `import { Video } from "@usefui/components";

export function Component() {
  return (
    <div style={{ position: "relative", width: 512, height: 288 }}>
      <Video src="/media/hero.mp4" label="Ambient hero footage" fill autoPlay muted loop priority />
    </div>
  );
}`,
    },
    {
      kind: "note",
      title: "Unsafe sources render nothing",
      description:
        "Only http(s), protocol-relative, data:video, data:image, and relative URLs are accepted. When neither `src` nor a safe entry in `sources` is available, the component returns `null`.",
    },
    {
      kind: "note",
      title: "`fillsInline` is always enabled",
      description:
        "The component forces `playsInline`, so iOS plays the video in place instead of entering fullscreen.",
    },
    {
      kind: "note",
      title: "`fill` requires a positioned parent",
      description:
        "With `fill`, the video is absolutely positioned to cover its parent. Give the parent a size and `position: relative`.",
    },
    {
      kind: "note",
      title: "Priority controls preload",
      description:
        "`priority` sets `preload=\"auto\"`; without it the video uses `preload=\"metadata\"`. Reserve it for above-the-fold media.",
    },
  ],
  a11y: {
    role: "video (native video element)",
    keyboardNav:
      "When `controls` is set, the native player handles play, pause, seek, and volume keys.",
    ariaAttributes: [
      "aria-label (from the required `label` prop)",
      "tracks with kind=\"captions\" for spoken content",
      "poster for a meaningful frame before playback",
    ],
  },
  relatedComponents: ["Image", "Card", "Page"],
  aiHints: {
    useCases: [
      "hero or ambient background footage",
      "product walkthroughs and demos with captions",
      "short looping clips in cards and media grids",
    ],
    avoid: [
      "autoplaying with sound — pair `autoPlay` with `muted`",
      "omitting `label` — it is required for accessibility",
      "skipping captions for spoken content",
      "using fill without a sized, positioned parent",
      "setting priority on every video — reserve it for above-the-fold media",
    ],
    composesWith: ["Image", "Card", "Page.Content", "Button"],
  },
};
