import styled, { css } from "styled-components";

export const HiddenScrollbar = css`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  &::-moz-scrollbar {
    display: none;
  }
`;

interface ScrollContainerProps {
  $height?: string;
  $width?: string;
  $thumbColor?: string;
  $trackColor?: string;
  $thumbHoverColor?: string;
}

export const CustomScrollbar = css<ScrollContainerProps>`
  height: ${({ $height }) => $height || "100%"};
  width: ${({ $width }) => $width || "100%"};
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    cursor: pointer;

    width: var(--measurement-medium-10);
  }

  &::-webkit-scrollbar-track {
    background: ${({ $trackColor }) => $trackColor || "transparent"};
    border-radius: var(--measurement-medium-30);
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ $thumbColor }) =>
      $thumbColor || "var(--font-color-alpha-10)"};
    border-radius: var(--measurement-medium-30);
    transition: background-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ $thumbHoverColor, $thumbColor }) =>
      $thumbHoverColor || $thumbColor || "var(--font-color-alpha-20)"};
  }

  // Firefox
  scrollbar-width: thin;
  scrollbar-color: ${({ $thumbColor, $trackColor }) =>
    `${$thumbColor || "var(--font-color-alpha-10)"} ${
      $trackColor || "transparent"
    }`};
`;

export const ScrollAreaWrapper = styled.div<any>`
  overflow: scroll;

  &[data-scrollbar="true"] {
    ${CustomScrollbar}
  }
  &[data-scrollbar="false"] {
    ${HiddenScrollbar}
  }
`;
