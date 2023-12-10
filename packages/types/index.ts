export type TColorVariant = 'alpha' | 'tint' | 'shade';
export type TScaleVariant = 'fontsize' | 'measurement';
export type TDesignTokensVariant = 'color' | TScaleVariant;

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
