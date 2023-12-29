import styled, { css } from "styled-components";

const FieldDefaultStyles = css`
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--fontsize-medium-20);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );

  border: var(--measurement-small-10) solid transparent;
  border-radius: var(--measurement-medium-30);
  backdrop-filter: blur(var(--measurement-small-10));

  gap: var(--measurement-medium-30);
  padding: 0 var(--measurement-medium-30);
  min-width: var(--measurement-medium-90);
  min-height: var(--measurement-medium-90);
  width: fit-content;

  color: var(--alpha-mono-dark-80);

  transition: all ease-in-out 0.2s;

  svg,
  span,
  img {
    opacity: 0.6;
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--color-mono-dark);

    svg,
    span,
    img {
      opacity: 1;
    }
  }
  &::placeholder {
    color: var(--alpha-mono-dark-30);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const FieldVariantsStyles = css`
  &[data-variant="primary"] {
    background-color: var(--alpha-mono-dark-10);

    &[data-error="true"] {
      color: var(--color-red);
      background-color: var(--alpha-red-10);
      border-color: var(--alpha-red-10);
    }
  }

  &[data-variant="secondary"] {
    background-color: var(--color-mono-lightest);
    border-color: var(--alpha-mono-dark-10);

    &:hover,
    &:focus,
    &:active {
      background-color: var(--alpha-mono-dark-10);
    }

    &[data-error="true"] {
      color: var(--color-red);
      border-color: var(--alpha-red-10);

      &:hover,
      &:focus,
      &:active {
        background-color: var(--alpha-red-10);
      }
    }
  }

  &[data-variant="ghost"] {
    padding: 0;
    border: none;
    background-color: transparent;
    min-width: fit-content;
    min-height: var(--measurement-medium-60);
    color: var(--alpha-mono-dark-60);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-mono-dark);
    }

    &[data-error="true"] {
      color: var(--color-red);
    }
  }
`;

export const Fieldset = styled.fieldset`
  all: unset;
  display: grid;
  gap: var(--measurement-medium-10);
`;
export const Sup = styled.sup`
  color: var(--color-red);
`;
export const Input = styled.input`
  &[data-raw="false"] {
    ${FieldDefaultStyles}
    ${FieldVariantsStyles}

  &[data-error="true"] {
      &::placeholder {
        color: var(--alpha-red-30);
      }
    }
  }
`;
export const Label = styled.label`
  &[data-raw="false"] {
    font-size: var(--fontsize-medium-20);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: calc(
      var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
    );
  }
`;
export const Def = styled.dfn`
  &[data-raw="false"] {
    font-style: normal;
    font-size: var(--fontsize-medium-10);

    &[data-variant="hint"] {
      color: var(--alpha-mono-dark-30);
    }
    &[data-variant="error"] {
      color: var(--color-red);
    }
  }
`;
