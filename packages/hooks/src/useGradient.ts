import { useCallback, useMemo, useState } from "react";

const green = "#98c379";
const greenLight = "rgb(198, 254, 157)";
const greenDark = "rgb(106, 137, 85)";

const blue = "#61afef";
const blueLight = "rgb(126, 228, 255)";
const blueDark = "rgb(68, 123, 167)";

const yellow = "#F8C762";
const yellowLight = "rgb(255, 255, 127)";
const yellowDark = "rgb(174, 139, 69)";

const orange = "#d19a66";
const orangeLight = "rgb(255, 200, 133)";
const orangeDark = "rgb(146, 108, 71)";

const red = "#f54e00";
const redLight = "rgb(255, 101, 0)";
const redDark = "rgb(172, 55, 0)";

const purple = "#c678dd";
const purpleLight = "rgb(255, 156, 255)";
const purpleDark = "rgb(139, 84, 155)";

const highlight = "#E4FF59";

export const DEFAULT_GRADIENT_COLORS = [
  green,
  greenDark,
  greenLight,
  blue,
  blueDark,
  blueLight,
  yellow,
  yellowDark,
  yellowLight,
  orange,
  orangeDark,
  orangeLight,
  red,
  redDark,
  redLight,
  purple,
  purpleDark,
  purpleLight,
  highlight,
  "transparent",
];

export type BlendMode =
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

export interface GradientStop {
  color: string;
  /** 0-100. Auto-distributed if omitted. */
  offset?: number;
  /** 0-1 */
  opacity?: number;
}

export interface GradientLayer {
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

export interface NoiseOptions {
  enabled?: boolean;
  type?: "fractalNoise" | "turbulence";
  /** Single value or [x, y]. */
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

export interface UseGradientOptions {
  width?: number;
  height?: number;
  /** Solid colour painted beneath all layers. */
  background?: string;
  /** Explicit layers (bottom to top). Disables random generation. */
  layers?: GradientLayer[];
  /** `false` disables noise, `true` uses defaults, or pass options. */
  noise?: boolean | NoiseOptions;

  // --- Random generation (used when `layers` is omitted) ---
  /** Palette to draw from. */
  colors?: string[];
  /** Number of random layers. */
  layerCount?: number;
  /** Stops per random layer (min 2). */
  stopsPerLayer?: number;
  /** Gradient types randomly chosen from. */
  types?: ("linear" | "radial")[];
  /** Blend modes randomly given to layers above the first. */
  blendModes?: BlendMode[];
  /** Change to re-roll random values. */
  regenerateKey?: string | number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)] as T;

function pickDistinct<T>(arr: T[], n: number): T[] {
  const pool = [...arr];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j] as T, pool[i] as T];
  }
  // Cycle if more stops requested than colours available.
  return Array.from({ length: n }, (_, i) => pool[i % pool.length] as T);
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// btoa breaks on non-Latin1 characters; this is safe for any string.
function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function randomLayer(
  index: number,
  o: Required<
    Pick<
      UseGradientOptions,
      "colors" | "stopsPerLayer" | "types" | "blendModes"
    >
  >,
): GradientLayer {
  const n = Math.max(2, o.stopsPerLayer);
  return {
    type: pick(o.types),
    stops: pickDistinct(o.colors, n),
    angle: Math.floor(rand(0, 360)),
    cx: 50 + rand(-30, 30),
    cy: 50 + rand(-30, 30),
    r: rand(60, 120),
    // First stop starts somewhere in 0-60% like before.
    // (Stored as a hint; applied in resolveStops via `firstOffset`.)
    opacity: index === 0 ? 1 : rand(0.4, 0.9),
    blendMode: index === 0 ? "normal" : pick(o.blendModes),
    spreadMethod: "pad",
    ...({ firstOffset: Math.floor(rand(0, 60)) } as object),
  };
}

function resolveStops(layer: GradientLayer): Required<GradientStop>[] {
  const raw = layer.stops.map((s) =>
    typeof s === "string" ? { color: s } : s,
  );
  const first = (layer as { firstOffset?: number }).firstOffset ?? 0;
  const n = raw.length;
  return raw
    .map((s, i) => ({
      color: s.color,
      offset: s.offset ?? first + ((100 - first) * i) / Math.max(1, n - 1),
      opacity: s.opacity ?? 1,
    }))
    .sort((a, b) => a.offset - b.offset);
}

function renderLayer(
  layer: GradientLayer,
  i: number,
  w: number,
  h: number,
): { def: string; rect: string } {
  const id = `grad-${i}`;
  const spread = layer.spreadMethod ?? "pad";
  const stops = resolveStops(layer)
    .map(
      (s) =>
        `<stop offset="${s.offset}%" stop-color="${esc(s.color)}" stop-opacity="${s.opacity}" />`,
    )
    .join("");

  let def: string;
  if ((layer.type ?? "radial") === "linear") {
    // Corner-to-corner gradient line for any angle / aspect ratio.
    const a = ((layer.angle ?? 0) * Math.PI) / 180;
    const half = (Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a))) / 2;
    const dx = Math.sin(a) * half;
    const dy = -Math.cos(a) * half;
    const x1 = w / 2 - dx,
      y1 = h / 2 - dy,
      x2 = w / 2 + dx,
      y2 = h / 2 + dy;
    def = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" spreadMethod="${spread}">${stops}</linearGradient>`;
  } else {
    const cx = layer.cx ?? 50;
    const cy = layer.cy ?? 50;
    const fx = layer.fx ?? cx;
    const fy = layer.fy ?? cy;
    def = `<radialGradient id="${id}" cx="${cx}%" cy="${cy}%" r="${layer.r ?? 70}%" fx="${fx}%" fy="${fy}%" spreadMethod="${spread}">${stops}</radialGradient>`;
  }

  const style = `mix-blend-mode:${layer.blendMode ?? "normal"}`;
  const rect = `<rect width="100%" height="100%" fill="url(#${id})" opacity="${layer.opacity ?? 1}" style="${style}" />`;
  return { def, rect };
}

function renderNoiseFilter(n: Required<NoiseOptions>): string {
  const freq = Array.isArray(n.frequency) ? n.frequency.join(" ") : n.frequency;
  const matrix = n.monochrome
    ? `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${n.opacity} 0`
    : `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${n.opacity} 0`;
  const blur =
    n.blur > 0
      ? `<feGaussianBlur in="softNoise" stdDeviation="${n.blur}" edgeMode="duplicate" result="softNoise" />`
      : "";
  return `
    <filter id="noise" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="${n.type}" baseFrequency="${freq}" numOctaves="${n.octaves}" seed="${n.seed}" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="${matrix}" result="softNoise" />
      ${blur}
      <feBlend in="SourceGraphic" in2="softNoise" mode="${n.blendMode}" />
    </filter>`;
}

const DEFAULT_NOISE: Required<NoiseOptions> = {
  enabled: true,
  type: "fractalNoise",
  frequency: 0.8,
  octaves: 2,
  seed: 1,
  opacity: 0.42,
  blur: 0.25,
  blendMode: "overlay",
  monochrome: true,
};

export function useGradient(options: UseGradientOptions = {}) {
  const {
    width = 300,
    height = 200,
    background,
    layers,
    noise = true,
    colors = DEFAULT_GRADIENT_COLORS,
    layerCount = 1,
    stopsPerLayer = 2,
    types = ["radial"],
    blendModes = ["normal"],
    regenerateKey,
  } = options;

  const [nonce, setNonce] = useState(0);
  const regenerate = useCallback(() => setNonce((n) => n + 1), []);

  // Random layers: stable across renders, re-rolled on config/key/nonce change.
  const randomKey = [
    colors.join("|"),
    layerCount,
    stopsPerLayer,
    types.join("|"),
    blendModes.join("|"),
    regenerateKey,
    nonce,
  ].join("::");

  const randomLayers = useMemo(
    () =>
      Array.from({ length: Math.max(1, layerCount) }, (_, i) =>
        randomLayer(i, { colors, stopsPerLayer, types, blendModes }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [randomKey],
  );

  const activeLayers = layers && layers.length > 0 ? layers : randomLayers;

  const noiseConfig: Required<NoiseOptions> | null = useMemo(() => {
    if (noise === false) return null;
    const o = noise === true ? {} : noise;
    const merged = { ...DEFAULT_NOISE, ...o };
    return merged.enabled ? merged : null;
  }, [noise]);

  const svg = useMemo(() => {
    const rendered = activeLayers.map((l, i) =>
      renderLayer(l, i, width, height),
    );
    const bg = background
      ? `<rect width="100%" height="100%" fill="${esc(background)}" />`
      : "";
    const group = `<g${noiseConfig ? ' filter="url(#noise)"' : ""}>${bg}${rendered
      .map((r) => r.rect)
      .join("")}</g>`;

    return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${rendered.map((r) => r.def).join("\n        ")}
        ${noiseConfig ? renderNoiseFilter(noiseConfig) : ""}
      </defs>
      ${group}
    </svg>
  `;
  }, [activeLayers, width, height, background, noiseConfig]);

  const base64 = useMemo(
    () => `data:image/svg+xml;base64,${toBase64(svg)}`,
    [svg],
  );

  return { base64, svg, layers: activeLayers, regenerate };
}
