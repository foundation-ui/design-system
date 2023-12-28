import styled from "styled-components";

export const TriggerWrapper = styled.button`
  &[data-raw="false"] {
    all: unset;
    width: calc(var(--measurement-medium-60) * 1.66);
    height: var(--measurement-medium-60);

    border-radius: var(--measurement-large-90);
    transition: all 0.2s ease-in-out 0s;

    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &[aria-checked="true"] {
      background-color: var(--color-mono-dark);
    }
    &[aria-checked="false"] {
      background-color: var(--alpha-mono-dark-30);
    }
  }
`;
export const Thumb = styled.span`
  &[data-raw="false"] {
    all: unset;
    display: block;
    width: var(--measurement-medium-50);
    height: var(--measurement-medium-50);
    background: white;
    border-radius: 100%;
    transition: all 0.1s ease-in-out 0s;

    &[data-checked="true"] {
      transform: translateX(var(--measurement-medium-50));
    }
    &[data-checked="false"] {
      transform: translateX(var(--measurement-small-60));
    }
  }
`;
