// import {
// 	IColorLibraryItem,
// 	IScaleLibraryItem,
// 	IComposedLibraryItem,
// 	IQueryProperties
// } from '../../../types';

// const getTokenFromSource = (props: IQueryProperties) => {
// 	return [...props.source.design_tokens[props.token_category]].filter(
// 		(token: IColorLibraryItem | IScaleLibraryItem) => token.name === props.query
// 	);
// };

// export const GetToken = (props: IQueryProperties): IComposedLibraryItem => {
// 	return getTokenFromSource(props)[0];
// };

// export const GetTokenBase = (props: IQueryProperties) => {
// 	return Object.values(getTokenFromSource(props)[0].base)[1]; // Rgb | Rem
// };
