import type { IQueryProperties, IDTCGToken } from "@usefui/core";

export const GetTokenFromSource = (
  props: IQueryProperties,
): IDTCGToken | void => {
  const { source, token_category, query } = props;

  const categoryGroup = (source as any)?.[token_category];
  if (!categoryGroup) return;

  const token = categoryGroup[query];
  if (token) return token;
};

export const GetColorTokenBase = (props: IQueryProperties) => {
  const values = GetTokenFromSource(props);
  if (!values) return;

  const root = values?.$root ?? values;
  const value = root?.$value;
  const ext = root?.$extensions?.["com.usefui"];

  if (values && !props.unit) {
    if (value?.hex) return value.hex;
    if (ext?.hex) return ext.hex;
    if (ext?.rgb) return ext.rgb;
    return value;
  }
  if (values && props.unit) {
    const unit = props.unit as string;
    if (unit === "hex") return value?.hex;
    if (ext && ext[unit] !== undefined) return ext[unit];
    if (value && value[unit] !== undefined) return value[unit];
  }
};
