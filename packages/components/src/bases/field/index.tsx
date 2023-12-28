import React from "react";
import { FieldProvider, useField } from "./hooks";
import { IReactChildren } from "../../../../../types";

export enum FieldModeEnum {
  Default = "default",
  Hint = "Hint",
  Emphasis = "emphasis",
  Error = "error",
}

export type TLabelVariant =
  | FieldModeEnum.Default
  | FieldModeEnum.Emphasis
  | FieldModeEnum.Error;
export type TMetaVariant =
  | FieldModeEnum.Hint
  | FieldModeEnum.Emphasis
  | FieldModeEnum.Error;

export interface IFieldComposition {
  Root: typeof FieldRoot;
  Label: typeof FieldLabel;
  Meta: typeof FieldMeta;
}

export interface IField extends React.ComponentPropsWithoutRef<"input"> {
  hint?: string;
  error?: string;
}
export interface IFieldLabel extends React.ComponentPropsWithoutRef<"label"> {
  optional?: boolean;
  variant?: TLabelVariant;
}
export interface IFieldMeta extends React.ComponentPropsWithoutRef<"small"> {
  variant?: TMetaVariant;
}

const FieldRoot = ({ children }: IReactChildren) => {
  return <FieldProvider>{children}</FieldProvider>;
};

const Field: React.FC<IField> & IFieldComposition = (props: IField) => {
  const { error, hint, ...restProps } = props;

  const metaId = React.useId();
  const fieldContext = useField();
  const { id } = fieldContext;

  return (
    <React.Fragment>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={metaId}
        {...restProps}
      />
      {hint && <FieldMeta data-variant={FieldModeEnum.Hint}>{hint}</FieldMeta>}
      {error && (
        <FieldMeta data-variant={FieldModeEnum.Error}>{error}</FieldMeta>
      )}
    </React.Fragment>
  );
};

const FieldLabel = (props: IFieldLabel) => {
  const { optional, variant, children, ...restProps } = props;

  const fieldContext = useField();
  const { id } = fieldContext;

  return (
    <label htmlFor={id} data-variant={variant} {...restProps}>
      {children}
      {!optional && <span>*</span>}
    </label>
  );
};

const FieldMeta = (props: IFieldMeta) => {
  const { variant, children, ...restProps } = props;

  const metaId = React.useId();
  const fieldContext = useField();
  const { id } = fieldContext;

  return (
    <small id={metaId} aria-details={id} data-variant={variant} {...restProps}>
      {children}
    </small>
  );
};

Field.Root = FieldRoot;
Field.Label = FieldLabel;
Field.Meta = FieldMeta;

export { Field, FieldRoot, FieldLabel, FieldMeta };
