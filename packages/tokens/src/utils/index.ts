import {
  TokenTypesEnum,
  IComposedLibraryItem,
  IQueryProperties,
} from "../../../../types";

export const GetTokenFromSource = (props: IQueryProperties) => {
  return [...props.source.design_tokens[props.token_category]].filter(
    (token: IComposedLibraryItem) => token.name === props.query
  )[0];
};

export const GetTokenBase = (props: IQueryProperties) => {
  const values = GetTokenFromSource(props);
  const defaultFallback =
    values && values.base && Object.values(values.base)[1]; // Rem | Rgb

  if (values && !props.unit) return defaultFallback;
  if (values && values.base && props.unit) {
    const unitIndex = Object.keys(values.base).indexOf(props.unit);

    if (props.token_category === TokenTypesEnum.Color)
      return Object.values(values.base)[unitIndex];
    if (props.token_category === TokenTypesEnum.Measurement)
      return defaultFallback;
  }

  return;
};
