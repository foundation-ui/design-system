import styled, { css } from "styled-components";

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

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(calc(var(--measurement-small-60) * -1));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &[data-raw="false"] {
    position: fixed;
    margin: 0;

    padding: var(--measurement-medium-30);
    margin: var(--measurement-medium-10) 0;

    background-color: var(--body-color);
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);

    ${ContentWrapperSizes}
    animation-duration: 0.2s;
    animation-name: slide-in;
    animation-fill-mode: backwards;
  }
`;

export const ItemWrapper = styled.li<any>`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;

  &[data-raw="false"] {
    padding: var(--measurement-medium-10) var(--measurement-medium-30);
    border-radius: var(--measurement-medium-20);

    text-align: left;
    font-weight: 600;
    letter-spacing: calc(
      var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
    );
    font-size: var(--fontsize-medium-10);
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
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
