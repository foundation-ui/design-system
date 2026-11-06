import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const OTPShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
    padding-left: var(--measurement-medium-50) !important;
  }
`;

const OTPCellDefaultStyles = css`
  ${InsetShadowCSSVariable}

  outline: none;
  cursor: text;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

  padding: 0 var(--measurement-medium-30);
  width: var(--measurement-medium-90);
  height: var(--measurement-medium-90);

  line-height: 1;

  background-color: transparent;
  border: none;
  box-shadow: var(--inset-shadow);

  color: var(--font-color-alpha-60);

  transition: all ease-in-out 0.2s;

  svg,
  span,
  img {
    opacity: 0.6;
  }

  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: var(--font-color);
    svg,
    span,
    img {
      opacity: 1;
    }
  }
  &:has(:active) {
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
  &:has(:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    background-color: var(--font-color-alpha-10);
  }
  &:has(:hover),
  &:has(:active) {
    background-color: var(--font-color-alpha-10);
  }
`;

export const OTPCell = styled.input`
  &[data-raw="false"] {
    ${OTPCellDefaultStyles}
    ${OTPShapeStyles}
  }
`;
