import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../global";

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
export const FieldErrorStyles = css`
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
export const FieldVariantsStyles = css`
  ${InsetShadowCSSVariable}

  &[data-variant="primary"] {
    background: var(--contrast-color);
    box-shadow: var(--inset-shadow);

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--font-color-alpha-10);
    }

    ${FieldErrorStyles}
  }
  &[data-variant="secondary"] {
    background: transparent;
    box-shadow: var(--inset-shadow);

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--font-color-alpha-10);
    }

    ${FieldErrorStyles}
  }
  &[data-variant="tertiary"] {
    background: transparent;
    border-color: var(--font-color-alpha-10);

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--font-color-alpha-20);
    }

    ${FieldErrorStyles}
  }
  &[data-variant="ghost"] {
    padding: 0 !important;
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

  &[data-variant="meta"] {
    background: var(--alpha-blue-10);
    border-style: dashed !important;
    border-color: var(--alpha-blue-10) !important;

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--alpha-blue-20) !important;
    }

    ${FieldErrorStyles}
  }
  &[data-variant="warning"] {
    background: var(--alpha-orange-10);
    border-style: dashed !important;
    border-color: var(--alpha-orange-10) !important;

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--alpha-orange-20) !important;
    }

    ${FieldErrorStyles}
  }
  &[data-variant="danger"] {
    background: var(--alpha-red-10);
    border-style: dashed !important;
    border-color: var(--alpha-red-10) !important;

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--alpha-red-20) !important;
    }

    ${FieldErrorStyles}
  }
  &[data-variant="success"] {
    background: var(--alpha-green-10);
    border-style: dashed !important;
    border-color: var(--alpha-green-10) !important;

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:hover),
    &:has(:active) {
      border-color: var(--alpha-green-20) !important;
    }

    ${FieldErrorStyles}
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
  height: calc(var(--measurement-small-10) / 2);
  width: 100%;
  background-color: var(--font-color-alpha-10);
`;
export const InnerWrapper = styled.div<any>`
  &[data-raw="false"] {
    position: absolute;
    display: flex;
    flex-direction: column;

    top: var(--measurement-small-10);
    bottom: var(--measurement-small-10);
    right: var(--measurement-small-10);

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

  &[data-suffix="true"] {
    user-select: none;
    pointer-events: none;
  }

  position: relative;
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 var(--measurement-medium-40);

  min-width: var(--measurement-medium-90);
  color: var(--font-color-alpha-60);
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  svg {
    opacity: 0.3;
    transition: all ease-in-out 0.2s;
  }

  &:hover,
  &:active {
    color: var(--font-color);
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
    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: inherit;
    box-sizing: border-box;

    text-align: center;
    outline: none;
    cursor: text;
    color: inherit;
    font-variant-numeric: tabular-nums;
    transition: all ease-in-out 0.2s;

    &[data-placeholder="true"] {
      color: var(--font-color-alpha-30);
    }

    &:hover {
      background-color: var(--font-color-alpha-10);
      color: var(--font-color);
    }

    /* Active cell: explicit so it wins over the inherited wrapper styles */
    &[data-raw="false"][data-focused="true"] {
      color: var(--font-color);
      background-color: var(--font-color-alpha-10);
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

export const RangeWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  gap: var(--measurement-medium-30);
  width: 100%;

  &[data-disabled="true"] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const RangeValue = styled.output<any>`
  &[data-raw="false"] {
    flex-shrink: 0;
    min-width: var(--measurement-medium-90);
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--font-color-alpha-60);
  }
`;

const RangeSizeStyles = css`
  &[data-size="small"] {
    --range-track-height: var(--measurement-medium-60);
    --range-thumb-size: var(--measurement-medium-60);
  }
  &[data-size="medium"] {
    --range-track-height: var(--measurement-medium-80);
    --range-thumb-size: var(--measurement-medium-80);
  }
  &[data-size="large"] {
    --range-track-height: var(--measurement-medium-90);
    --range-thumb-size: var(--measurement-medium-90);
  }
`;
const RangeShapeStyles = css`
  &[data-shape="square"] {
    --radius: 0;
  }

  &[data-shape="smooth"] {
    --radius: var(--measurement-medium-10);
  }

  &[data-shape="round"] {
    --radius: var(--measurement-medium-90);
  }
`;
export const RangeInput = styled.input<any>`
  ${RangeSizeStyles}
  ${RangeShapeStyles}
  --range-progress: 0%;

  &[data-raw="false"] {
    -webkit-appearance: none;
    appearance: none;
    flex: 1;
    width: 100%;
    height: var(--range-thumb-size);

    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }

    /* Track */
    &::-webkit-slider-runnable-track {
      height: var(--range-track-height);
      border-radius: var(--radius);
      background: linear-gradient(
        to right,
        var(--font-color-alpha-10) var(--range-progress),
        var(--contrast-color) var(--range-progress)
      );
    }
    &::-moz-range-track {
      height: var(--range-track-height);
      ${RangeShapeStyles}
      background: var(--font-color-alpha-10);
    }
    &::-moz-range-progress {
      height: var(--range-track-height);
      ${RangeShapeStyles}
      background: var(--font-color-alpha-10);
    }

    /* Thumb */
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: var(--measurement-medium-10);
      height: var(--range-thumb-size);
      margin-top: calc(
        (var(--range-track-height) - var(--range-thumb-size)) / 2
      );
      border-radius: var(--radius);
      border: var(--measurement-small-10) solid var(--font-color);
      background: var(--font-color);
      transition: transform ease-in-out 0.2s;
    }
    &::-moz-range-thumb {
      width: var(--range-thumb-size);
      height: var(--range-thumb-size);
      border-radius: 50%;
      border: var(--measurement-small-10) solid var(--font-color);
      background: var(--font-color);
      transition: transform ease-in-out 0.2s;
    }

    &:hover:not(:disabled)::-webkit-slider-thumb {
      transform: scaleY(0.6);
    }
    &:hover:not(:disabled)::-moz-range-thumb {
      transform: scaleY(0.6);
    }

    /* &:focus-visible::-webkit-slider-thumb {
      box-shadow: 0 0 0 var(--measurement-small-30) var(--font-color-alpha-20);
    }
    &:focus-visible::-moz-range-thumb {
      box-shadow: 0 0 0 var(--measurement-small-30) var(--font-color-alpha-20);
    } */

    &[data-error="true"]::-webkit-slider-thumb {
      border-color: var(--color-red);
    }
    &[data-error="true"]::-moz-range-thumb {
      border-color: var(--color-red);
    }
  }
`;
