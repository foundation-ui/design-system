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
    top: var(--measurement-small-30);
    width: 100%;
    max-width: var(--measurement-large-80);
    max-height: var(--measurement-large-90);
    padding: var(--measurement-medium-30);

    background-color: ${({ theme }) => theme.colors.body.base};
    border: var(--measurement-small-10) solid
      ${({ theme }) => theme.colors.text.alpha[0].rgb};
    border-radius: var(--measurement-medium-60);
    box-shadow: 0 var(--measurement-medium-30) var(--measurement-medium-30)
      var(--alpha-mono-darkest-10);
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
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
    outline: none;
    transition: all ease-in-out 0.2s;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
