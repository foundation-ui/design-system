import React from "react";
import { FieldProvider, useField } from "./hooks";
import { Fieldset, Sup, Input, Label, Def } from "./styles";
import {
  IReactChildren,
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentVariantEnum,
  IComponentVariant,
} from "../../../../../types";

export enum MetaVariantEnum {
  Default = "default",
  Hint = "hint",
  Emphasis = "emphasis",
  Error = "error",
}

export type TMetaVariant =
  | MetaVariantEnum.Hint
  | MetaVariantEnum.Emphasis
  | MetaVariantEnum.Error;

export interface IField
  extends React.ComponentProps<"input">,
    IComponentSize,
    IComponentVariant,
    IComponentStyling {
  hint?: string;
  error?: string;
}
export interface IFieldLabel
  extends React.ComponentProps<"label">,
    IComponentStyling {
  optional?: boolean;
}
export interface IFieldMeta
  extends React.ComponentProps<"small">,
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
  const { raw, sizing, variant, error, hint, ...restProps } = props;

  const metaId = React.useId();
  const { id } = useField();

  return (
    <React.Fragment>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={metaId}
        aria-errormessage={error}
        data-error={Boolean(error)}
        data-variant={variant || ComponentVariantEnum.Primary}
        data-size={sizing || ComponentSizeEnum.Medium}
        data-raw={Boolean(raw)}
        {...restProps}
      />
      {(error || hint) && (
        <FieldMeta
          raw={raw}
          data-variant={error ? MetaVariantEnum.Error : MetaVariantEnum.Hint}
        >
          {error || hint}
        </FieldMeta>
      )}
    </React.Fragment>
  );
};

const FieldLabel = (props: IFieldLabel) => {
  const { raw, optional, children, ...restProps } = props;
  const { id } = useField();

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
  const { id } = useField();

  return (
    <Def
      id={metaId}
      aria-details={id}
      data-variant={variant || MetaVariantEnum.Emphasis}
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
