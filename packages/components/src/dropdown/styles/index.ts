import styled, { css } from "styled-components";

const HiddenScrollbar = css`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  &::-moz-scrollbar {
    display: none;
  }
`;

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
    width: var(--measurement-large-80);
    min-width: var(--measurement-large-70);
    max-height: var(--measurement-large-90);

    padding: var(--measurement-medium-30);
    margin: var(--measurement-medium-10) 0;

    background-color: ${({ theme }) => theme.colors.body.contrast};
    border: var(--measurement-small-10) solid
      ${({ theme }) => theme.colors.text.alpha[0].rgb};
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);
    overflow-y: scroll;
    ${HiddenScrollbar}
  }
`;

export const ItemWrapper = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;

  &[data-raw="false"] {
    font-size: var(--fontsize-medium-10);
    padding: var(--measurement-medium-30);
    border-radius: var(--measurement-medium-20);
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
    outline: none;
    transition: all ease-in-out 0.2s;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      color: ${({ theme }) => theme.colors.text.base};
      background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
