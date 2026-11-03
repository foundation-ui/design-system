import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseGradientMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useGradient",
  title: "useGradient",
  description:
    "Builds an SVG gradient, optionally with procedural noise, and returns it as markup, a data URL, and the resolved layer list. Explicit layers are used as-is; otherwise random layers are generated from the palette and configuration and can be re-rolled with `regenerate`.",
  component: "Gradient",
  module: "@usefui/hooks",
  code: `import { useGradient } from "@usefui/hooks";

export function HookComponent() {
  const gradient = useGradient({
    width: 640,
    height: 320,
    background: "#0b0b12",
    layerCount: 3,
    stopsPerLayer: 4,
    types: ["linear", "radial"],
    blendModes: ["overlay", "soft-light", "screen"],
  });

  return (
    <div>
      <img src={gradient.base64} alt="" width={640} height={320} />
      <button type="button" onClick={gradient.regenerate}>
        Regenerate
      </button>
    </div>
  );
}`,
  arguments: [
    {
      name: "width",
      type: "number",
      defaultValue: "300",
    },
    {
      name: "height",
      type: "number",
      defaultValue: "200",
    },
    {
      name: "background",
      type: "string",
    },
    {
      name: "layers",
      type: "GradientLayer[]",
    },
    {
      name: "noise",
      type: "boolean | NoiseOptions",
      defaultValue: "true",
    },
    {
      name: "colors",
      type: "string[]",
      defaultValue: "DEFAULT_GRADIENT_COLORS",
    },
    {
      name: "layerCount",
      type: "number",
      defaultValue: "1",
    },
    {
      name: "stopsPerLayer",
      type: "number",
      defaultValue: "2",
    },
    {
      name: "types",
      type: '("linear" | "radial")[]',
      defaultValue: '["radial"]',
    },
    {
      name: "blendModes",
      type: "BlendMode[]",
      defaultValue: '["normal"]',
    },
    {
      name: "regenerateKey",
      type: "string | number",
    },
  ],
  returns: [
    {
      name: "base64",
      type: "string",
    },
    {
      name: "svg",
      type: "string",
    },
    {
      name: "layers",
      type: "GradientLayer[]",
    },
    {
      name: "regenerate",
      type: "() => void",
    },
  ],
  types: `type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

interface GradientStop {
  color: string;
  /** 0-100. Auto-distributed if omitted. */
  offset?: number;
  /** 0-1 */
  opacity?: number;
}

interface GradientLayer {
  type?: "linear" | "radial";
  /** Colours or full stops. At least 2. */
  stops: (string | GradientStop)[];
  /** Linear only. CSS-style degrees (0 = to top, 90 = to right). */
  angle?: number;
  /** Radial only. Centre / radius / focal point in %. */
  cx?: number;
  cy?: number;
  r?: number;
  fx?: number;
  fy?: number;
  spreadMethod?: "pad" | "reflect" | "repeat";
  /** 0-1 */
  opacity?: number;
  blendMode?: BlendMode;
}

interface NoiseOptions {
  enabled?: boolean;
  type?: "fractalNoise" | "turbulence";
  frequency?: number | [number, number];
  octaves?: number;
  seed?: number;
  /** 0-1 strength. */
  opacity?: number;
  /** Blur std deviation. 0 disables. */
  blur?: number;
  blendMode?: BlendMode;
  /** true = black grain, false = coloured grain. */
  monochrome?: boolean;
}

interface UseGradientOptions {
  width?: number;
  height?: number;
  background?: string;
  layers?: GradientLayer[];
  noise?: boolean | NoiseOptions;
  colors?: string[];
  layerCount?: number;
  stopsPerLayer?: number;
  types?: ("linear" | "radial")[];
  blendModes?: BlendMode[];
  regenerateKey?: string | number;
}`,
};
