import { css } from 'styled-components';
import {
	IDesignTokensLibrary,
	TColorVariant,
	TScaleVariant,
	IColorLibraryItem,
	IScaleLibraryItem
} from '../../../types';

export const GenerateCSSVariables = (payload: IDesignTokensLibrary) => {
	const DEFAULT_COLOR_TOKENS_VARIANT = 'color';
	const COLOR_TOKENS_VARIANT: TColorVariant[] = ['alpha', 'tint', 'shade'];
	const SCALE_TOKENS_VARIANT: TScaleVariant[] = ['fontsize', 'measurement'];

	const variantName = (variant: string, name: string) => `--${variant}-${name}-`;
	const variantIndex = (key: number) => (key + 1) * 10;
	const variableName = (variant: string, name: string, key: number) =>
		`${variantName(variant, name)}${variantIndex(key)}`;

	const variations = {
		color: (library: IColorLibraryItem[], variant?: TColorVariant) => {
			if (!variant) {
				return library.map(
					(token) => css`
						${`--${DEFAULT_COLOR_TOKENS_VARIANT}-${token.name}: #${token.base.hex};`}
					`
				);
			}

			return library.map((token) => {
				return token[variant].map(
					(item, key) => css`
						${`${variableName(variant, token.name, key)}: ${item.rgb};`}
					`
				);
			});
		},
		scale: (library: IScaleLibraryItem[], variant: TScaleVariant) => {
			return library.map((token) =>
				token.values.map(
					(value, key) => css`
						${`${variableName(variant, token.name, key)}: ${
							value.rem
						}rem;`}
					`
				)
			);
		}
	};

	const [color, alpha, tint, shade, fontsize, measurement] = [
		variations.color(payload.design_tokens.color),
		COLOR_TOKENS_VARIANT.map((variant) =>
			variations.color(payload.design_tokens.color, variant)
		),
		...SCALE_TOKENS_VARIANT.map((variant) =>
			variations.scale(payload.design_tokens[variant], variant)
		)
	];

	return Object.freeze({
		color,
		alpha,
		tint,
		shade,
		fontsize,
		measurement
	});
};
