import styled, { css, keyframes } from "styled-components";

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const ContentWrapperSizes = css`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  max-height: var(--measurement-large-90);

  &[data-sizing="small"] {
    width: var(--small);
    max-width: var(--small);
  }

  &[data-sizing="medium"] {
    width: var(--medium);
    max-width: var(--medium);
  }

  &[data-sizing="large"] {
    width: var(--large);
    max-width: var(--large);
  }
`;

export const RootWrapper = styled.div`
  position: relative;
`;
export const ContentWrapper = styled.ul<any>`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  &[data-raw="false"] {
    position: fixed;
    margin: 0;

    padding: var(--measurement-medium-30);
    margin: var(--measurement-medium-10) 0;

    background-color: var(--body-color);
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);
    animation-duration: 0.2s;
    animation-name: ${FadeIn};
    animation-fill-mode: backwards;

    ${ContentWrapperSizes}
  }
`;

export const ItemWrapper = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;

  &[data-raw="false"] {
    font-size: var(--fontsize-small-80);
    padding: var(--measurement-medium-30);
    border-radius: var(--measurement-medium-20);
    text-align: left;
    color: var(--font-color-alpha-60);
    outline: none;
    transition: all ease-in-out 0.2s;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      color: var(--font-color);
      background-color: var(--font-color-alpha-10);
    }
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
