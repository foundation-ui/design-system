"use client";

import styled, { css } from "styled-components";
import {
  FieldShapeStyles,
  FieldDefaultStyles,
  FieldVariantsStyles,
} from "../../field/styles";

import type { ScrollContainerProps } from "text-area";

const CustomScrollbar = css<ScrollContainerProps>`
  height: ${({ $height }) => $height ?? "100%"};
  width: ${({ $width }) => $width ?? "100%"};
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    cursor: pointer;

    width: var(--measurement-medium-10);
  }

  &::-webkit-scrollbar-track {
    background: ${({ $trackColor }) => $trackColor ?? "transparent"};
    border-radius: var(--measurement-medium-30);
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ $thumbColor }) =>
      $thumbColor ?? "var(--font-color-alpha-10)"};
    border-radius: var(--measurement-medium-30);
    transition: background-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ $thumbHoverColor, $thumbColor }) =>
      $thumbHoverColor ?? $thumbColor ?? "var(--font-color-alpha-20)"};
  }

  // Firefox
  scrollbar-width: thin;
  scrollbar-color: ${({ $thumbColor, $trackColor }) =>
    `${$thumbColor ?? "var(--font-color-alpha-10)"} ${
      $trackColor ?? "transparent"
    }`};
`;
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
