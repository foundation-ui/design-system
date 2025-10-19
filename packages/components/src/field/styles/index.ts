import styled, { css } from "styled-components";

export const FieldDefaultStyles = css`
  outline: none;
  cursor: text;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--fontsize-medium-20);

  line-height: 1.1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;
  backdrop-filter: blur(var(--measurement-small-10));
  color: var(--font-color-alpha-60);
  width: fit-content;
  height: fit-content;

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
`;
export const FieldVariantsStyles = css`
  &[data-variant="primary"] {
    background-color: var(--font-color-alpha-10);
    border-color: var(--font-color-alpha-10);

    &:focus,
    &:active {
      box-shadow: 0 0 0 var(--measurement-small-30) var(--font-color-alpha-10);
    }

    &[data-error="true"] {
      color: var(--color-red);
      background-color: var(--alpha-red-10);
      border-color: var(--alpha-red-10);
      box-shadow: 0 0 0 var(--measurement-small-30) var(--alpha-red-10);
    }
  }

  &[data-variant="secondary"] {
    background-color: transparent;
    border-color: var(--font-color-alpha-10);

    &:hover,
    &:focus,
    &:active {
      border-color: var(--font-color-alpha-20);
    }

    &:focus,
    &:active {
      box-shadow: 0 0 0 var(--measurement-small-30) var(--font-color-alpha-10);
    }

    &[data-error="true"] {
      color: var(--color-red);
      border-color: var(--alpha-red-10);

      &:hover,
      &:focus,
      &:active {
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
    &:active {
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
    width: fit-content;
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
