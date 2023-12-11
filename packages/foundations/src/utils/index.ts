import { THex, TTone, TMode, TLuminance } from "../../../../types";

/** Format convertors */
export const checkDecimals = (value: number): boolean =>
  value === Math.floor(value);
export const formatDecimals = (value: number): number =>
  Number(value.toFixed(1));

export const PXToREM = (value: number): number => Number(0.0625 * value);
export const PXToPT = (value: number): number => Number(0.75 * value);

export const HEXToRGB = (
  Hex: THex,
  raw?: boolean
): [number, number, number] | string => {
  const filteredHex = Hex && Hex.includes("#") ? Hex.replace("#", "") : Hex;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const RGBToHexArray = filteredHex.match(/.{1,2}/g)!;
  const RGBArray: [number, number, number] = [
    parseInt(RGBToHexArray[0], 16),
    parseInt(RGBToHexArray[1], 16),
    parseInt(RGBToHexArray[2], 16),
  ];

  if (raw) {
    return RGBArray;
  }

  return `rgb(${RGBArray[0]}, ${RGBArray[1]}, ${RGBArray[2]})`;
};
export const RGBAToHEX = (rgba: string, backgroundHex: string): string => {
  // Check if the input string is in the correct format (e.g., "rgba(255, 0, 0, 0.5)")
  const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-1](\.\d+)?)\)$/;
  const match = rgba.match(rgbaRegex);

  if (!match) {
    throw new Error(
      'Invalid RGBA format. Expected format: "rgba(r, g, b, a)".'
    );
  }

  // Extract the RGBA components from the matched groups
  const [, r, g, b, a] = match.map(Number);

  // Convert the RGBA values to their hexadecimal equivalents
  const redHex = r.toString(16).padStart(2, "0");
  const greenHex = g.toString(16).padStart(2, "0");
  const blueHex = b.toString(16).padStart(2, "0");

  // Calculate the resulting color by blending the foreground and background colors
  const foregroundColor = `${redHex}${greenHex}${blueHex}`;
  const backgroundColor = backgroundHex.replace("#", "");

  const alpha = Math.max(0, Math.min(1, a)); // Ensure alpha is within the valid range [0, 1]

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const resultColor = foregroundColor
    .match(/.{1,2}/g)!
    .map((channel, index) =>
      Math.round(
        parseInt(channel, 16) * alpha +
          parseInt(backgroundColor.slice(index * 2, index * 2 + 2), 16) *
            (1 - alpha)
      )
        .toString(16)
        .padStart(2, "0")
    )
    .join("");

  return `#${resultColor.toUpperCase()}`; // Convert to uppercase for consistency (optional)
};
const RGBToHSL = (r: number, g: number, b: number): number[] => {
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
    Number(parsedHEXtoRGB[2])
  );

  if (raw) return rawHSL;
  return `hsl(${rawHSL[0]}deg ${rawHSL[1]}% ${rawHSL[2]}%)`;
};

/** Color Luminance */
export function applyColorLuminance(hex: THex, luminance: TLuminance): string {
  const RGBA_PATTERN = /[^0-9a-f]/gi;
  const HEX_PATTERN = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  const HEX_LENGTH_CHECK = hex.length < 6;

  luminance = luminance || 0;
  hex = String(hex).replace(RGBA_PATTERN, "");
  if (HEX_LENGTH_CHECK) hex = HEX_PATTERN;

  let RGBHex = "#";
  let RBGDec;
  let RGBDecLen;
  // Convert to RGB decimals, apply luminosity factor, return to hexadecimal format. \\
  for (RGBDecLen = 0; RGBDecLen < 3; RGBDecLen++) {
    RBGDec = parseInt(hex.substr(RGBDecLen * 2, 2), 16);
    RBGDec = Math.round(
      Math.min(Math.max(0, RBGDec + RBGDec * luminance), 255)
    ).toString(16);
    RGBHex += ("00" + RBGDec).slice(RBGDec.length);
  }

  return RGBHex;
}
export function setLuminanceTone(tone: TTone, mode?: TMode): number {
  if (tone && mode && mode === "darken") {
    return Math.abs(tone) * -1;
  } else return tone;
}
export const luminanceAmountFormatter = (array: string | unknown[]) => {
  if (array.length === 9) return 1;
  return Number(`0.${array.length + 1}`);
};
export const getRelativeLuminance = (rgb: [number, number, number]): number => {
  const [r, g, b] = rgb.map((value) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Color Contrast Scores */
export const getContrastRatio = (
  textRgb: [number, number, number],
  backgroundRgb: [number, number, number]
): number => {
  const textLuminance = getRelativeLuminance(textRgb);
  const backgroundLuminance = getRelativeLuminance(backgroundRgb);
  return (
    (Math.max(textLuminance, backgroundLuminance) + 0.05) /
    (Math.min(textLuminance, backgroundLuminance) + 0.05)
  );
};
export const calculateContrastScore = (
  textColor: string,
  backgroundColor: string
): string => {
  const textRgb = HEXToRGB(textColor, true);
  const backgroundRgb = HEXToRGB(backgroundColor, true);

  // Calculate the contrast ratio using the relative luminance formula
  const contrastRatio =
    typeof textRgb !== "string" &&
    typeof backgroundRgb !== "string" &&
    getContrastRatio(textRgb, backgroundRgb);

  // Determine the WCAG level based on the contrast ratio
  if (Number(contrastRatio) >= 7) {
    return "AAA";
  } else if (Number(contrastRatio) >= 4.5) {
    return "AA";
  } else {
    return "F";
  }
};
