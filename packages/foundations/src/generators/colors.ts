import {
	convertToRGB,
	convertToHSL,
	rgbaToHex,
	applyColorLuminance,
	setLuminanceTone,
	luminanceAmountFormatter,
	calculateContrastScore
} from '../utils';
import { Mode, Variation } from '../../../types';

export const generateAlpha = (Hex: string, amount?: number) => {
	const colorValuesArray: { hex: string; rgb: string; hsl: string }[] = [];
	const parsedHEXtoRGB = convertToRGB(Hex, true);
	const parsedHEXtoHSL = convertToHSL(Hex, true);

	while (colorValuesArray.length < (amount || 10)) {
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
					rgbaToHex(parsedRGBA, 'ffffff'),
					'ffffff'
				),
				dark: calculateContrastScore(
					rgbaToHex(parsedRGBA, '000000'),
					'000000'
				)
			}
		};

		colorValuesArray.push(colorFormats);
	}

	return colorValuesArray;
};
export const generateVariation = (Hex: string, mode: Mode, amount?: number) => {
	const variationValuesArray: Variation[] = [];

	while (variationValuesArray.length < (amount || 10)) {
		const variationHHEXValue = applyColorLuminance(
			Hex,
			setLuminanceTone(luminanceAmountFormatter(variationValuesArray), mode)
		);
		const variationFormats = {
			hex: variationHHEXValue,
			rgb: `${convertToRGB(variationHHEXValue)}`,
			hsl: `${convertToHSL(variationHHEXValue)}`,
			contrast_score: {
				light: calculateContrastScore(variationHHEXValue, 'ffffff'),
				dark: calculateContrastScore(variationHHEXValue, '000000')
			}
		};

		variationValuesArray.push(variationFormats);
	}

	return variationValuesArray;
};
