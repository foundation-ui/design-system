import {
  HEXToRGB,
  HEXToHSL,
  RGBAToHEX,
  RGBToHEX,
  normalizeHex,
} from "./formats";
import { calculateContrastScore } from "./score";
import {
  TMode,
  IColorVariation,
  THex,
  TTone,
  TLuminance,
  TRGB,
} from "../types";

// luminance > 0 mixes toward white (tint), < 0 mixes toward black (shade)
export function applyColorLuminance(hex: THex, luminance: TLuminance): string | undefined {
  const t = Math.max(-1, Math.min(1, luminance ?? 0));
  let clean: string;
  try {
    clean = normalizeHex(hex as string);
  } catch {
    return undefined;
  }
  const rgb = HEXToRGB(clean, true) as TRGB;
  return RGBToHEX(rgb.map((c) => (t >= 0 ? c + (255 - c) * t : c * (1 + t))));
}

export function setLuminanceTone(tone: TTone, mode?: TMode): number {
  if (tone && mode && mode === "darken") {
    return Math.abs(tone) * -1;
  } else return tone;
}

export const luminanceAmountFormatter = (array: unknown[] | string) =>
  Math.min(1, (array.length + 1) / 10);

export const generateAlpha = (hex: string, amount = 10): IColorVariation[] => {
  const clean = normalizeHex(hex);
  const [r, g, b] = HEXToRGB(clean, true) as TRGB;
  const [h, s, l] = HEXToHSL(clean, true) as number[];

  return Array.from({ length: amount }, (_, i) => {
    const alpha = Math.min(1, Math.round(((i + 1) / 10) * 100) / 100);
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    return {
      hex: alpha === 1 ? `#${clean}` : `#${clean}${alphaHex}`,
      rgb: rgba,
      hsl: `hsl(${h}deg ${s}% ${l}% / ${Math.round(alpha * 100)}%)`,
      contrast_score: {
        // contrast of the composited colour against the surface it sits on
        light: calculateContrastScore(RGBAToHEX(rgba, "ffffff"), "ffffff"),
        dark: calculateContrastScore(RGBAToHEX(rgba, "000000"), "000000"),
      },
    };
  });
};

export const generateVariation = (
  hex: string,
  mode: TMode,
  amount = 10,
): IColorVariation[] =>
  Array.from({ length: amount }, (_, i) => {
    const step = (i + 1) / 10;
    const value = applyColorLuminance(hex, setLuminanceTone(step, mode));
    return {
      hex: value,
      rgb: HEXToRGB(value) as string,
      hsl: HEXToHSL(value) as string,
      contrast_score: {
        light: calculateContrastScore(value, "ffffff"),
        dark: calculateContrastScore(value, "000000"),
      },
    };
  });
