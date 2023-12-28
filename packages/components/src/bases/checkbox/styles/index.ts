import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  cursor: pointer;

  &[data-raw="false"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--measurement-medium-80);
    height: var(--measurement-medium-80);
    border: var(--measurement-small-60) solid var(--alpha-mono-dark-10);
    border-radius: var(--measurement-medium-10);
    backdrop-filter: blur(var(--measurement-small-10));
    background-color: var(--color-mono-whitest);
    transition: all ease-in-out 0.2s;

    &:hover,
    &:focus,
    &:active,
    &[data-state="checked"] {
      background-color: var(--alpha-mono-dark-10);
      border-color: transparent;
    }

    &[data-state="checked"] {
      svg {
        stroke: var(--color-mono-dark);
      }
    }
  }

  &[data-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;

    svg {
      stroke-opacity: 0.6;
    }
  }
`;
export const NativeInput = styled.input`
  &[data-raw="false"] {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
export const Indicator = styled.span`
  line-height: 0;
  pointer-events: none;
`;
