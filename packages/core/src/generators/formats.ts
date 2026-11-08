import { THex, TRGB } from "../types";

export const normalizeHex = (hex: string): string => {
  let h = String(hex ?? "")
    .trim()
    .replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-f]{6}$/i.test(h)) {
    throw new Error(`Invalid HEX color: "${hex}"`);
  }
  return h;
};

export const RGBToHEX = (rgb: number[]): string => {
  return `#${rgb
    .map((c) =>
      Math.round(Math.min(255, Math.max(0, c)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
};
export const HEXToRGB = (Hex: THex, raw?: boolean): TRGB | string => {
  const h = normalizeHex(Hex);
  const rgb: TRGB = [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
  return raw ? rgb : `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};
export const RGBAToHEX = (rgba: string, backgroundHex: string): string => {
  const match = rgba.match(
    /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/,
  );
  if (!match) throw new Error(`Invalid rgba string: "${rgba}"`);

  const fg = match.slice(1, 4).map(Number);
  const a = Math.max(0, Math.min(1, Number(match[4])));
  const bg = HEXToRGB(backgroundHex, true) as TRGB;

  // Composite over the background (same maths browsers use, in sRGB)
  return RGBToHEX(fg.map((c, i) => c * a + bg[i] * (1 - a)));
};
export const RGBToHSL = (r: number, g: number, b: number): number[] => {
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case normalizedR:
        h =
          (normalizedG - normalizedB) / delta +
          (normalizedG < normalizedB ? 6 : 0);
        break;
      case normalizedG:
        h = (normalizedB - normalizedR) / delta + 2;
        break;
      case normalizedB:
        h = (normalizedR - normalizedG) / delta + 4;
        break;
    }

    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};
export const HEXToHSL = (hex: string, raw?: boolean): number[] | string => {
  const cleanHex = hex.replace("#", "");
  const parsedHEXtoRGB = HEXToRGB(cleanHex, true);

  const rawHSL = RGBToHSL(
    Number(parsedHEXtoRGB[0]),
    Number(parsedHEXtoRGB[1]),
    Number(parsedHEXtoRGB[2]),
  );

  if (raw) return rawHSL;
  return `hsl(${rawHSL[0]}deg ${rawHSL[1]}% ${rawHSL[2]}%)`;
};

export const PXToREM = (value: number): number => Number(0.0625 * value);

export const PXToPT = (value: number): number => Number(0.75 * value);
