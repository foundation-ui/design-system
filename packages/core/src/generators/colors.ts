import { HEXToRGB, HEXToHSL, RGBAToHEX } from "./formats";
import { calculateContrastScore } from "./score";
import {
  TMode,
  IColorVariation,
  THex,
  TTone,
  TLuminance,
} from "../../../../types";

export function applyColorLuminance(hex: THex, luminance: TLuminance): string {
  if (hex.length < 6) return;

  const RGBA_PATTERN = /[^0-9a-f]/gi;
  luminance = luminance ?? 0;
  hex = String(hex).replace(RGBA_PATTERN, "");

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
export const generateAlpha = (Hex: string, amount?: number) => {
  const colorValuesArray: { hex: string; rgb: string; hsl: string }[] = [];
  const parsedHEXtoRGB = HEXToRGB(Hex, true);
  const parsedHEXtoHSL = HEXToHSL(Hex, true);

  while (colorValuesArray.length < (amount ?? 10)) {
    const hexAlphaIndex = (colorValuesArray.length + 1) * 10;
    const parsedHex = `#${Hex}${hexAlphaIndex}`;
    const parsedRGBA = `rgba(${parsedHEXtoRGB[0]}, ${parsedHEXtoRGB[1]}, ${
      parsedHEXtoRGB[2]
    }, ${luminanceAmountFormatter(colorValuesArray)})`;
    const parsedHSL = `hsl(${parsedHEXtoHSL[0]}deg ${parsedHEXtoHSL[1]}% ${
      parsedHEXtoHSL[2]
    }% / ${luminanceAmountFormatter(colorValuesArray) * 100}%)`;

    const colorFormats = {
      hex: hexAlphaIndex !== 100 ? parsedHex : `#${Hex}`,
      rgb: parsedRGBA,
      hsl: parsedHSL,
      contrast_score: {
        light: calculateContrastScore(
          RGBAToHEX(parsedRGBA, "ffffff"),
          "ffffff"
        ),
        dark: calculateContrastScore(RGBAToHEX(parsedRGBA, "000000"), "000000"),
      },
    };

    colorValuesArray.push(colorFormats);
  }

  return colorValuesArray;
};
export const generateVariation = (
  Hex: string,
  mode: TMode,
  amount?: number
) => {
  const variationValuesArray: IColorVariation[] = [];

  while (variationValuesArray.length < (amount ?? 10)) {
    const variationHHEXValue = applyColorLuminance(
      Hex,
      setLuminanceTone(luminanceAmountFormatter(variationValuesArray), mode)
    );
    const variationFormats = {
      hex: variationHHEXValue,
      rgb: `${HEXToRGB(variationHHEXValue)}`,
      hsl: `${HEXToHSL(variationHHEXValue)}`,
      contrast_score: {
        light: calculateContrastScore(variationHHEXValue, "ffffff"),
        dark: calculateContrastScore(variationHHEXValue, "000000"),
      },
    };

    variationValuesArray.push(variationFormats);
  }

  return variationValuesArray;
};
