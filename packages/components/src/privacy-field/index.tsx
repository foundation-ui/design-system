"use client";

import React from "react";

import { Field } from "../";
import { Wrapper, Trigger } from "./styles";

import type { IField } from "../";

type PrivacyType = "password" | "text";
interface PrivacyFieldProps extends IField {
  defaultType?: PrivacyType;
  textIcon: React.ReactNode;
  passwordIcon: React.ReactNode;
}

/**
 * PrivacyFields are used to hide sensitive values typed by users.
 *
 * @param {PrivacyFieldProps} props - The props for the PrivacyField component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {string} props.error - The error message to display.
 * @param {string} props.hint - The hint message to display.
 * @param {string} props.defaultType - The type of the PrivacyField when rendered.
 * @param {ReactElement} props.textIcon - The Icon used to convey the text type information.
 * @param {ReactElement} props.passwordIcon - The Icon used to convey the password type information.
 * @returns {ReactElement} The PrivacyField component.
 */
export const PrivacyField = ({
  defaultType,
  textIcon,
  passwordIcon,
  ...restProps
}: PrivacyFieldProps) => {
  const [type, setType] = React.useState<PrivacyType>(
    defaultType ?? "password"
  );

  const handleChangeType = React.useCallback(() => {
    if (type === "text") setType("password");
    if (type === "password") setType("text");
  }, [type, setType]);

  return (
    <Wrapper className="flex">
      <Field autoComplete="off" type={type} {...restProps} />
      <Trigger variant="ghost" sizing="small" onClick={handleChangeType}>
        {type === "text" && textIcon}
        {type === "password" && passwordIcon}
      </Trigger>
    </Wrapper>
  );
};
PrivacyField.displayName = "PrivacyField";
