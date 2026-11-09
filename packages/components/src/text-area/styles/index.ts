"use client";

import styled, { css } from "styled-components";
import {
  FieldShapeStyles,
  FieldDefaultStyles,
  FieldVariantsStyles,
} from "../../field/styles";
import type { ScrollContainerProps } from "../types";
import { CustomScrollbar } from "../../css/ScrollbarStyles";

const TextareaSizeStyles = css`
  padding: var(--measurement-medium-30);
  max-height: var(--measurement-large-60);

  &[data-size="small"] {
    min-height: var(--measurement-large-30);
  }
  &[data-size="medium"] {
    min-height: var(--measurement-large-50);
  }
  &[data-size="large"] {
    min-height: var(--measurement-large-60);
    max-height: var(--measurement-large-80);
  }
`;
const TextareaResizableStyles = css`
  &[data-resizable="true"] {
    resize: vertical;
  }
  &[data-resizable="false"] {
    resize: none;
  }
`;

export const TextAreaContainer = styled.textarea<ScrollContainerProps>`
  &[data-raw="false"] {
    ${FieldDefaultStyles}
    ${FieldShapeStyles}

    ${TextareaSizeStyles}
    ${TextareaResizableStyles}

    ${CustomScrollbar}
    ${FieldVariantsStyles}
  }
`;
