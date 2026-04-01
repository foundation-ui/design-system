import styled, { css } from "styled-components";

const OTPShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-20);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
    padding-left: var(--measurement-medium-50) !important;
  }
`;

const OTPCellDefaultStyles = css`
  outline: none;
  cursor: text;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

  font-size: var(--fontsize-medium-20);

  padding: 0 var(--measurement-medium-30);
  width: var(--measurement-medium-90);
  height: var(--measurement-medium-90);

  line-height: 1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;

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
  &:active,
  &:focus-within,
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

  &:disabled,
  &:has(:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  background-color: transparent;
  border-color: var(--font-color-alpha-10);

  &:hover,
  &:focus,
  &:active,
  &:focus-within,
  &:has(:hover),
  &:has(:active) {
    border-color: var(--font-color-alpha-20);
  }

  &:focus,
  &:active,
  &:focus-within,
  &:has(:active) {
    box-shadow: 0 0 0 var(--measurement-small-30) var(--alpha-accent-30);
  }

  background-color: transparent;
  border-color: var(--font-color-alpha-10);

  &:hover,
  &:focus,
  &:active,
  &:focus-within,
  &:has(:hover),
  &:has(:active) {
    border-color: var(--font-color-alpha-20);
  }

  &:focus,
  &:active,
  &:focus-within,
  &:has(:active) {
    box-shadow: 0 0 0 var(--measurement-small-30) var(--font-color-alpha-10);
  }

  &[data-error="true"] {
    color: var(--color-red);
    border-color: var(--alpha-red-10);

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      background-color: var(--alpha-red-10);
      box-shadow: 0 0 0 var(--measurement-small-30) var(--alpha-red-10);
    }
  }
`;

export const OTPCell = styled.input`
  &[data-raw="false"] {
    ${OTPCellDefaultStyles}
    ${OTPShapeStyles}
  }
`;
