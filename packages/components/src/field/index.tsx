"use client";

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
} from "../../../../types";

export enum MetaVariantEnum {
  Default = "default",
  Hint = "hint",
  Emphasis = "emphasis",
  Error = "error",
}

export type TMetaVariant = "default" | "hint" | "emphasis" | "error";

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

/**
 * Fields are input element that provides additional functionality such as error and hint messages.
 *
 * **Best practices:**
 *
 * - Provide clear and descriptive labels for all input elements.
 * - Ensure that error and hint messages are visible and easily identifiable by users.
 *
 * @param {IField} props - The props for the Field component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {string} props.error - The error message to display.
 * @param {string} props.hint - The hint message to display.
 * @returns {ReactElement} The Field component.
 */
const Field: React.FC<IField> & IFieldComposition = (props: IField) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    variant = ComponentVariantEnum.Primary,
    error,
    hint,
    ...restProps
  } = props;

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
        data-variant={variant}
        data-size={sizing}
        data-raw={Boolean(raw)}
        {...restProps}
      />
      {(error ?? hint) && (
        <FieldMeta
          raw={raw}
          data-variant={error ? MetaVariantEnum.Error : MetaVariantEnum.Hint}
        >
          {error ?? hint}
        </FieldMeta>
      )}
    </React.Fragment>
  );
};
Field.displayName = "Field";

const FieldRoot = ({ children }: IReactChildren) => {
  return <FieldProvider>{children}</FieldProvider>;
};
FieldRoot.displayName = "Field.Root";

const FieldWrapper = ({
  children,
  ...restProps
}: IReactChildren & React.ComponentProps<"fieldset">) => {
  return <Fieldset {...restProps}>{children}</Fieldset>;
};
FieldWrapper.displayName = "Field.Wrapper";

/**
 * Labels are component used to describe the expected value of an input.
 *
 * **Best practices:**
 *
 * - Provide a clear and descriptive label for each input.
 * - The `required` criteria of an input must be reflected in the label.
 *
 * @param {IFieldLabel} props - The props for the Field.Label component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.optional - Whether the form field is required or not.
 * @param {string} props.children - The label text.
 * @returns {ReactElement} The Field.Label component.
 */
const FieldLabel = (props: IFieldLabel) => {
  const { raw, optional = false, children, ...restProps } = props;
  const { id } = useField();

  return (
    <Label htmlFor={id} data-raw={Boolean(raw)} {...restProps}>
      {children}
      {!optional && <Sup>*</Sup>}
    </Label>
  );
};
FieldLabel.displayName = "Field.Label";

/**
 * Meta are component used to bring more context about an input's usage.
 *
 * @param {IFieldMeta} props - The props for the Field.Meta component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {TMetaVariant} props.variant - The style definition used by the component.
 * @param {string} props.children - The meta text.
 * @returns {ReactElement} The Field.Meta component.
 */
const FieldMeta = (props: IFieldMeta) => {
  const {
    raw,
    variant = MetaVariantEnum.Emphasis,
    children,
    ...restProps
  } = props;

  const metaId = React.useId();
  const { id } = useField();

  return (
    <Def
      id={metaId}
      aria-details={id}
      data-variant={variant}
      data-raw={Boolean(raw)}
      {...restProps}
    >
      {children}
    </Def>
  );
};
FieldMeta.displayName = "Field.Meta";

Field.Root = FieldRoot;
Field.Wrapper = FieldWrapper;
Field.Label = FieldLabel;
Field.Meta = FieldMeta;

export { Field, FieldRoot, FieldWrapper, FieldLabel, FieldMeta };
