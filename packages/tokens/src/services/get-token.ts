import {
  TokenTypesEnum,
  IComposedLibraryItem,
  IQueryProperties,
} from "../../../../types";

export const GetTokenFromSource = (
  props: IQueryProperties
): IComposedLibraryItem | void => {
  const { source, token_category, query } = props;

  const filterSource = source.design_tokens[token_category].find(
    (token: IComposedLibraryItem) => token.name === query
  );

  if (filterSource) return filterSource;
};

export const GetColorTokenBase = (props: IQueryProperties) => {
  const values = GetTokenFromSource(props);
  const defaultFallback =
    values && values.base && Object.values(values.base)[0]; // Hex

  if (values && !props.unit) return defaultFallback;
  if (values && values.base && props.unit) {
    const unitIndex = Object.keys(values.base).indexOf(props.unit);

    if (props.token_category === TokenTypesEnum.Color)
      return Object.values(values.base)[unitIndex];
  }
};
