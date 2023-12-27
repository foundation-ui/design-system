import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  cursor: pointer;

  &[data-raw="false"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--measurement-medium-60);
    height: var(--measurement-medium-60);
    border: var(--measurement-small-60) solid var(--color-mono-dark);
    border-radius: var(--measurement-medium-10);
    backdrop-filter: blur(var(--measurement-small-10));
    background-color: var(--color-mono-white);
    transition: all 0.1s ease-in;

    &[data-state="checked"] {
      background-color: var(--color-mono-dark);

      svg {
        stroke: var(--color-mono-white);
      }
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
  }
`;
export const Indicator = styled.span`
  line-height: 0;
  pointer-events: none;
`;
