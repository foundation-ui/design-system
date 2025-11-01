"use client";

import React from "react";

import { TextAreaContainer } from "./styles";
import {
  IComponentSize,
  IComponentStyling,
  IComponentVariant,
  TComponentShape,
  ComponentSizeEnum,
} from "../../../../types";

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
    IComponentSize,
    IComponentVariant {
  resizable?: boolean;
  shape?: "square" | "smooth";
}

/**
 * Textarea are used to allow users to write large chunks of text.
 *
 * @param {TextareaProps} props - The props for the Textarea component.
 * @param {string} props.variant - The style definition used by the component.  Defaults to `secondary`.
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {boolean} props.resizable - Define whether the component is resizable or not. Defaults to 'true'.
 *
 * @returns {ReactElement} The TextareaProps component.
 */
export const Textarea = (props: TextareaProps) => {
  const { raw, shape, sizing, variant, resizable, onChange } = props;

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
    <TextAreaContainer
      ref={textareaRef}
      onChange={handleChange}
      data-variant={variant ?? "secondary"}
      data-shape={shape ?? "smooth"}
      data-size={sizing ?? ComponentSizeEnum.Medium}
      data-resizable={resizable}
      data-raw={String(Boolean(raw))}
      {...props}
    />
  );
};
Textarea.displayName = "Textarea";
