"use client";

import styled, { css } from "styled-components";
import { FieldDefaultStyles, FieldVariantsStyles } from "../../field/styles";

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

export const TextAreaContainer = styled.textarea<ScrollContainerProps>`
  &[data-raw="false"] {
    resize: vertical;
    max-height: var(--measurement-large-60);
    min-height: auto;
    width: 100%;

    overflow-y: auto;

    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: var(--fontsize-small-80);
    padding: var(--measurement-medium-30) var(--measurement-medium-30)
      var(--measurement-large-10) var(--measurement-medium-30);

    font-weight: 500;
    line-height: 1.1;
    letter-spacing: calc(
      var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
    );

    border: var(--measurement-small-10) solid transparent;
    border-radius: var(--measurement-medium-30);
    backdrop-filter: blur(var(--measurement-small-10));
    color: var(--font-color-alpha-60);

    transition: all ease-in-out 0.2s;

    svg,
    span,
    img {
      opacity: 0.6;
    }

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);

      svg,
      span,
      img {
        opacity: 1;
      }
    }
    &::placeholder {
      color: var(--font-color-alpha-30);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &::placeholder {
      color: var(--font-color-alpha-30);
    }

    &:focus-visible {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &[data-error="true"] {
      &::placeholder {
        color: var(--alpha-red-30);
      }
    }

    ${CustomScrollbar}
    ${FieldVariantsStyles}
  }
`;
