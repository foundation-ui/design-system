// select/styles.ts
import styled from "styled-components";
import {
  FieldDefaultStyles,
  FieldVariantsStyles,
  FieldSizeStyles,
  FieldShapeStyles,
} from "../../field/styles";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Trigger = styled.button<any>`
  all: unset;
  box-sizing: border-box;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--measurement-medium-10);

  ${FieldDefaultStyles}
  ${FieldVariantsStyles}
  ${FieldShapeStyles}
  ${FieldSizeStyles}


  cursor: pointer !important;
`;

export const Label = styled.span<any>`
  flex: 1;
  text-align: left;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Content = styled.ul<any>`
  @keyframes select-slide-in-down {
    0% {
      opacity: 0;
      transform: translateY(calc(var(--measurement-small-60) * -1));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes select-slide-in-up {
    0% {
      opacity: 0;
      transform: translateY(var(--measurement-small-60));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &[data-raw="false"] {
    position: fixed;
    margin: 0;
    box-sizing: border-box;

    padding: var(--measurement-medium-30);

    list-style: none;

    background-color: var(--body-color);
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);

    height: auto;
    max-height: var(--measurement-large-90);
    overflow-y: auto;

    animation-duration: 0.2s;
    animation-fill-mode: backwards;

    &[data-side="bottom"] {
      animation-name: select-slide-in-down;
    }

    &[data-side="top"] {
      animation-name: select-slide-in-up;
    }
  }
`;

export const List = styled.li<any>`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;

  &[data-raw="false"] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--measurement-medium-10);

    padding: var(--measurement-medium-30);
    border-radius: var(--measurement-medium-20);

    text-align: left;

    color: var(--font-color);

    outline: none;
    cursor: pointer;

    transition: all ease-in-out 0.2s;

    &:hover,
    &:focus,
    &:active,
    &:focus-within,
    &:has(:active) {
      background-color: var(--contrast-color);
    }

    &[data-selected="true"] {
      color: var(--font-color);
      background-color: var(--contrast-color);

      &:hover,
      &:focus,
      &:active {
        background-color: var(--font-color-alpha-10);
      }
    }
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Item = styled.span`
  display: flex;
  align-items: center;
  gap: var(--measurement-small-60);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
