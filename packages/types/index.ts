import { luminanceFactorsValues } from '../constants';

export type TColorVariant = 'alpha' | 'tint' | 'shade';
export type TScaleVariant = 'fontsize' | 'measurement';
export type TDesignTokensVariant = 'color' | TScaleVariant;
export type TModularScalesOptions = {
	base: number;
	ratio: [number];
	units: number;
	convert?: boolean;
};
export type TSequencesOptions = {
	base: number;
	units: number;
	steps: number;
	decimal: boolean;
};

export enum LuminanceFactors {
	Lum0 = luminanceFactorsValues[0],
	Lum10 = luminanceFactorsValues[1],
	Lum20 = luminanceFactorsValues[2],
	Lum30 = luminanceFactorsValues[3],
	Lum40 = luminanceFactorsValues[4],
	Lum50 = luminanceFactorsValues[5],
	Lum60 = luminanceFactorsValues[6],
	Lum70 = luminanceFactorsValues[7],
	Lum80 = luminanceFactorsValues[8],
	Lum90 = luminanceFactorsValues[9],
	Lum100 = luminanceFactorsValues[-1]
}
export type Luminance = LuminanceFactors | undefined;
export type Hex = string;
export type Tone = number;
export type Mode = 'darken' | 'lighten';

export interface Variation {
	hex: Hex;
	rgb: string;
	hsl: string;
}
export interface IColorVariantValue {
	hex: string;
	rgb: string;
}
export interface IScaleVariantValue {
	px: number;
	rem: number;
	pt: number;
}
export interface IScaleProperties {
	units: number;
	ratio: number;
	variant?: TScaleVariant | null;
	values: IScaleVariantValue[] | [];
}
export interface IColorProperties {
	alpha: IColorVariantValue[];
	tint: IColorVariantValue[];
	shade: IColorVariantValue[];
}
export interface IScaleLibraryItem extends IScaleProperties {
	name: string;
	base: number;
}
export interface IColorLibraryItem extends IColorProperties {
	name: string;
	base: IColorVariantValue;
}
export interface IComposedLibraryItem {
	name: string;
	base: number | IColorVariantValue;
	alpha?: IColorVariantValue[];
	tint?: IColorVariantValue[];
	shade?: IColorVariantValue[];
	units?: number;
	ratio?: number;
	variant?: TScaleVariant | null;
	values?: IScaleVariantValue[] | [];
}
export interface IDesignTokensLibrary {
	name: string;
	design_tokens: {
		color: IColorLibraryItem[];
		measurement: IScaleLibraryItem[];
		fontsize: IScaleLibraryItem[];
	};
}
export interface IQueryProperties {
	source: IDesignTokensLibrary;
	token_category: TDesignTokensVariant;
	query: string;
}
