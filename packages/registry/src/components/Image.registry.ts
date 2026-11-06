import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ImageMeta: ComponentRegistryMetadata = {
  name: "Image",
  title: "Image",
  description:
    "Responsive, sanitized image with optional picture sources, priority loading, fallback, and fill layout. Unsafe URLs are rejected and the component renders nothing.",
  category: "data",
  variants: [],
  props: [
    {
      name: "src",
      type: "string",
      required: true,
    },
    {
      name: "alt",
      type: "string",
      required: true,
    },
    {
      name: "sources",
      type: "ISources[]",
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
    },
    {
      name: "height",
      type: "number | string",
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
      name: "srcSet",
      type: "string",
    },
    {
      name: "sizes",
      type: "string",
    },
    {
      name: "onError",
      type: "ReactEventHandler<HTMLImageElement>",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Sized image with alt text",
      code: `import { Image } from "@usefui/components";

export function Component() {
  return (
    <Image
      src="/media/hero.jpg"
      alt="Team collaborating in a studio"
      width={640}
      height={360}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Responsive sources",
      code: `import { Image } from "@usefui/components";

export function Component() {
  return (
    <Image
      src="/media/hero-1200.jpg"
      srcSet="/media/hero-640.jpg 640w, /media/hero-1200.jpg 1200w"
      sizes="(max-width: 768px) 100vw, 640px"
      sources={[
        { srcSet: "/media/hero.avif 640w, /media/hero@2x.avif 1280w", type: "image/avif" },
        { srcSet: "/media/hero.webp 640w, /media/hero@2x.webp 1280w", type: "image/webp" },
      ]}
      alt="Product dashboard preview"
      width={640}
      height={360}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Fill inside a positioned parent",
      code: `import { Image } from "@usefui/components";

export function Component() {
  return (
    <div style={{ position: "relative", width: 320, height: 180 }}>
      <Image src="/media/cover.jpg" alt="Cover artwork" fill priority />
    </div>
  );
}`,
    },
    {
      kind: "executable",
      title: "Fallback on load error",
      code: `import { Image } from "@usefui/components";

export function Component() {
  return (
    <Image
      src="/media/original.jpg"
      fallbackSrc="/media/placeholder.jpg"
      alt="Article cover"
      width={480}
      height={270}
      onError={(event) => console.warn("Image failed", event)}
    />
  );
}`,
    },
    {
      kind: "note",
      title: "Shape values",
      description:
        '`shape` accepts "square" (no radius), "smooth" (medium radius, default), or "round" (large radius).',
    },
    {
      kind: "note",
      title: "Unsafe sources render nothing",
      description:
        "Only http(s), protocol-relative, data:image, and relative URLs are accepted. When neither `src` nor a safe `fallbackSrc` is available, the component returns `null`.",
    },
    {
      kind: "note",
      title: "`fill` requires a positioned parent",
      description:
        "With `fill`, the image is absolutely positioned to cover its parent. Give the parent a size and `position: relative`.",
    },
  ],
  a11y: {
    role: "img (native img inside a picture element)",
    keyboardNav: "Not interactive; no keyboard behavior.",
    ariaAttributes: [
      "alt (required — describes the image content)",
      'alt="" for decorative images',
    ],
  },
  relatedComponents: ["Card", "Avatar", "Video", "Page"],
  aiHints: {
    useCases: [
      "hero, card, and article imagery with responsive sources",
      "above-the-fold media that should load eagerly with priority",
      "cover images that fill a positioned container",
    ],
    avoid: [
      "omitting alt text — pass a meaningful description or an empty string for decorative media",
      "using fill without a sized, positioned parent",
      "expecting unsafe protocols to render — they are rejected",
      "setting priority on every image — reserve it for the LCP image",
    ],
    composesWith: ["Card.Image", "Avatar", "Video"],
  },
};
