import React from "react";
import { FieldProvider, useField } from "./hooks";
import { Fieldset, Sup, Input, Label, Def } from "./styles";
import { IReactChildren, IComponentStyling } from "../../../../../types";

export enum FieldVariantEnum {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
}
export enum FieldModeEnum {
  Default = "default",
  Hint = "hint",
  Emphasis = "emphasis",
  Error = "error",
}

export type TFieldVariant =
  | FieldVariantEnum.Primary
  | FieldVariantEnum.Secondary
  | FieldVariantEnum.Ghost;
export type TMetaVariant =
  | FieldModeEnum.Hint
  | FieldModeEnum.Emphasis
  | FieldModeEnum.Error;

export interface IField
  extends React.ComponentPropsWithoutRef<"input">,
    IComponentStyling {
  hint?: string;
  error?: string;
  variant?: TFieldVariant;
}
export interface IFieldLabel
  extends React.ComponentPropsWithoutRef<"label">,
    IComponentStyling {
  optional?: boolean;
}
export interface IFieldMeta
  extends React.ComponentPropsWithoutRef<"small">,
    IComponentStyling {
  variant?: TMetaVariant;
}
export interface IFieldComposition {
  Root: typeof FieldRoot;
  Wrapper: typeof FieldWrapper;
  Label: typeof FieldLabel;
  Meta: typeof FieldMeta;
}

const FieldRoot = ({ children }: IReactChildren) => {
  return <FieldProvider>{children}</FieldProvider>;
};

const FieldWrapper = ({ children }: IReactChildren) => {
  return <Fieldset>{children}</Fieldset>;
};

const Field: React.FC<IField> & IFieldComposition = (props: IField) => {
  const { raw, variant, error, hint, ...restProps } = props;

  const metaId = React.useId();
  const fieldContext = useField();
  const { id } = fieldContext;

  return (
    <React.Fragment>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={metaId}
        aria-errormessage={error}
        data-error={Boolean(error)}
        data-variant={variant || FieldVariantEnum.Primary}
        data-raw={Boolean(raw)}
        {...restProps}
      />
      {(error || hint) && (
        <FieldMeta
          raw={raw}
          data-variant={error ? FieldModeEnum.Error : FieldModeEnum.Hint}
        >
          {error || hint}
        </FieldMeta>
      )}
    </React.Fragment>
  );
};

const FieldLabel = (props: IFieldLabel) => {
  const { raw, optional, children, ...restProps } = props;

  const fieldContext = useField();
  const { id } = fieldContext;

  return (
    <Label htmlFor={id} data-raw={Boolean(raw)} {...restProps}>
      {children}
      {!optional && <Sup>*</Sup>}
    </Label>
  );
};

const FieldMeta = (props: IFieldMeta) => {
  const { raw, variant, children, ...restProps } = props;

  const metaId = React.useId();
  const fieldContext = useField();
  const { id } = fieldContext;

  return (
    <Def
      id={metaId}
      aria-details={id}
      data-variant={variant || FieldModeEnum.Emphasis}
      data-raw={Boolean(raw)}
      {...restProps}
    >
      {children}
    </Def>
  );
};

Field.Root = FieldRoot;
Field.Wrapper = FieldWrapper;
Field.Label = FieldLabel;
Field.Meta = FieldMeta;

export { Field, FieldRoot, FieldWrapper, FieldLabel, FieldMeta };
