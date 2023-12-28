import styled from "styled-components";

export const RootWrapper = styled.div`
  position: relative;
`;

export const ContentWrapper = styled.ul`
  position: absolute;
  margin: 0;

  &[data-side="left"] {
    transform-origin: top left;
    left: 0;
  }
  &[data-side="right"] {
    transform-origin: top right;
    right: 0;
  }

  &[data-raw="false"] {
    width: 100%;
    overflow-y: scroll;

    max-width: var(--measurement-large-80);
    max-height: var(--measurement-large-70);
    padding: var(--measurement-medium-30);

    background-color: var(--color-mono-whitest);
    border: var(--measurement-small-10) solid var(--alpha-mono-dark-10);
    border-radius: var(--measurement-medium-30);
    box-shadow: var(--alpha-mono-dark-10) var(--measurement-medium-10)
      var(--measurement-medium-10) 0 0;

    top: calc(
      var(--measurement-medium-90) + var(--measurement-small-30)
    ); // Trigger min-height + Margin
  }
`;

export const ItemWrapper = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;

  &[data-raw="false"] {
    font-size: var(--fontsize-medium-20);
    padding: var(--measurement-medium-30);
    border-radius: var(--measurement-medium-30);
    color: var(--alpha-mono-dark-60);
    outline: none;
    transition: all ease-in-out 0.2s;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      background-color: var(--alpha-mono-dark-10);
    }
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
