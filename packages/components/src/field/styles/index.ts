import styled, { css } from "styled-components";

export const FieldDefaultStyles = css`
  outline: none;
  cursor: text;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  font-size: var(--fontsize-medium-20);

  line-height: 1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;

  backdrop-filter: blur(var(--measurement-small-10));
  color: var(--font-color-alpha-60);

  width: 100%;
  height: fit-content;

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
`;
export const FieldVariantsStyles = css`
  &[data-variant="primary"] {
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
  }

  &[data-variant="secondary"] {
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
  }

  &[data-variant="ghost"] {
    padding: 0;
    border: none;
    background-color: transparent;
    min-width: fit-content;
    min-height: var(--measurement-medium-60);
    color: var(--font-color-alpha-60);

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      color: var(--font-color);
    }

    &[data-error="true"] {
      color: var(--color-red);
    }
  }
`;
export const FieldSizeStyles = css`
  &[data-size="small"] {
    font-size: var(--fontsize-small-60);

    padding: 0 var(--measurement-medium-30);
    min-width: var(--measurement-medium-60);
    min-height: var(--measurement-medium-80);
  }
  &[data-size="medium"] {
    padding: 0 var(--measurement-medium-30);
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-90);
  }
  &[data-size="large"] {
    padding: var(--measurement-medium-50);
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-90);
  }
`;
export const FieldShapeStyles = css`
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

export const Fieldset = styled.fieldset<any>`
  all: unset;
  display: grid;
  gap: var(--measurement-medium-10);
`;
export const Sup = styled.sup`
  color: var(--color-red);
`;
export const Input = styled.input<any>`
  &[data-raw="false"] {
    ${FieldDefaultStyles}
    ${FieldVariantsStyles}
    ${FieldSizeStyles}
    ${FieldShapeStyles}

  &[data-error="true"] {
      &::placeholder {
        color: var(--alpha-red-30);
      }
    }
  }
`;
export const Label = styled.label<any>`
  &[data-raw="false"] {
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: calc(
      var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
    );
  }
`;
export const Def = styled.dfn<any>`
  &[data-raw="false"] {
    font-style: normal;
    font-size: var(--fontsize-medium-10);

    &[data-variant="hint"] {
      color: var(--font-color-alpha-30);
    }
    &[data-variant="error"] {
      color: var(--color-red);
    }
  }
`;

export const ParentContainer = styled.div<any>`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    width: 100% !important;
  }
  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;
export const ParentWrapper = styled.div<any>`
  &[data-raw="false"] {
    ${FieldDefaultStyles}
    ${FieldVariantsStyles}
    ${FieldSizeStyles}
    ${FieldShapeStyles}

    cursor: default;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: var(--measurement-small-30);
    width: 100% !important;
    text-align: left !important;

    &[data-error="true"] {
      &::placeholder {
        color: var(--alpha-red-30);
      }
    }

    &[data-wrap="true"] {
      flex-wrap: wrap;
      align-items: center;
      align-content: center;
      height: auto;
      padding-top: var(--measurement-small-60);
      padding-bottom: var(--measurement-small-60);
    }
  }
`;

export const InnerDivider = styled.div<any>`
  height: var(--measurement-small-10);
  width: 100%;
  background-color: var(--font-color-alpha-10);
`;
export const InnerWrapper = styled.div<any>`
  &[data-raw="false"] {
    position: absolute;
    display: flex;
    flex-direction: column;

    top: var(--measurement-small-10);
    right: var(--measurement-small-10);
    bottom: var(--measurement-small-10);

    border-left: var(--measurement-small-10) solid var(--font-color-alpha-10);
    border-color: var(--font-color-alpha-10);

    overflow: hidden;

    &[data-error="true"] {
      border-color: var(--alpha-red-10) !important;
    }
    &[data-shape="round"] {
      border-radius: 0 var(--measurement-large-90) var(--measurement-large-90) 0;
    }
    &[data-shape="smooth"] {
      border-radius: 0 var(--measurement-medium-20) var(--measurement-medium-20)
        0;
    }
    &[data-shape="square"] {
      border-radius: 0;
    }
  }
`;
export const InnerTrigger = styled.button<any>`
  all: unset;

  position: relative;
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 var(--measurement-medium-40);

  color: var(--font-color-alpha-60);
  backdrop-filter: blur(var(--measurement-small-60));

  cursor: pointer;
  transition: all ease-in-out 0.2s;

  svg {
    opacity: 0.6;
    transition: all ease-in-out 0.2s;
  }

  /* ::before {
    content: "";
    inset: 0;

    border-radius: inherit;
    position: absolute;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    mask-composite: intersect;

    transition: all ease-in-out 0.2s;
    mask-image: linear-gradient(var(--font-color), transparent);
  } */

  &:hover,
  &:active {
    color: var(--font-color);
    /* background-position: 0% 50%; */

    svg {
      opacity: 0.8;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export const InnerSegment = styled.span<any>`
  &[data-raw="false"] {
    border-radius: inherit;

    text-align: center;
    outline: none;
    color: inherit;
    /* transition: background-color ease-in-out 0.2s; */

    &[data-placeholder="true"] {
      color: var(--font-color-alpha-30);
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:active) {
      /* background-color: var(--font-color-alpha-10); */
      color: var(--font-color);
    }
  }
`;
export const Muted = styled.span<any>`
  &[data-raw="false"] {
    color: var(--font-color-alpha-30);
    user-select: none;
  }
`;
export const HiddenInput = styled.input<any>`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font: inherit;
  color: inherit;
  padding: 0;
  min-width: var(--measurement-medium-60);
`;
