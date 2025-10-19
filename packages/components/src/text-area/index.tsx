"use client";

import React from "react";

import { TextAreaContainer } from "./styles";
import { Field } from "../field";

import type { IComponentStyling, IComponentVariant } from "../../../../types";

export type ScrollContainerProps = {
  $height?: string;
  $width?: string;
  $thumbColor?: string;
  $trackColor?: string;
  $thumbHoverColor?: string;
};

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    IComponentStyling,
    IComponentVariant {}

/**
 * Textarea are used to allow users to write large chunks of text.
 *
 * @param {TextareaProps} props - The props for the Textarea component.
 * @returns {ReactElement} The TextareaProps component.
 */
export const Textarea = ({ onChange, ...props }: TextareaProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(
        textarea.scrollHeight,
        parseInt(getComputedStyle(textarea).maxHeight)
      )}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onChange?.(e);
  };

  React.useEffect(() => adjustHeight(), [props.value]);

  return (
    <Field.Wrapper className="w-100 h-auto">
      <TextAreaContainer
        ref={textareaRef}
        onChange={handleChange}
        data-variant={props.variant ?? "secondary"}
        data-raw={String(Boolean(props?.raw))}
        {...props}
      />
    </Field.Wrapper>
  );
};
Textarea.displayName = "Textarea";
