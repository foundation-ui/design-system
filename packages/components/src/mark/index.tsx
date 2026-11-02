"use client";

import React from "react";

import { MarkWrapper } from "./styles";
import {
  ComponentVariantEnum,
  IComponentStyling,
  IComponentVariant,
} from "../../../../types";

interface IMarkProperties
  extends IComponentStyling, IComponentVariant, React.ComponentProps<"span"> {
  fontFamily?: "monospace" | "inherit";
  children: React.ReactNode;
}

/**
 * Marks are used to put emphasis on important information.
 *
 * **Best practices:**
 *
 * - Ensure that the content is short and readable.
 *
 * @param {IMarkProperties} props - The props for the Mark component.
 * @param {boolean} props.raw - Define whether the component is styled or not.t.
 * @param {string} props.variant - The style definition used by the component.
 * @param {string} props.fontFamily - The font family definition used by the component.
 * @param {ReactNode} props.children - The content to be rendered as Mark children.
 * @returns {ReactElement} The Mark component.
 */
const Mark = (props: IMarkProperties) => {
  const {
    content,
    variant = ComponentVariantEnum.Primary,
    fontFamily = "inherit",
    children,
    ...restProps
  } = props;

  return (
    <MarkWrapper
      data-variant={variant}
      data-fontFamily={fontFamily}
      {...restProps}
    >
      {children}
    </MarkWrapper>
  );
};
Mark.displayName = "Mark";

export { Mark };
