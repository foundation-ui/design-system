import styled, { css } from "styled-components";
import { IDropdownContentProperties } from "../";

const ContentWrapperSizes = css`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  max-height: var(--measurement-large-90);

  &[data-sizing="small"] {
    width: var(--small);
    max-width: var(--small);

    &[data-side="left"] {
      inset: auto;
    }
    &[data-side="right"] {
      transform: translateX(calc((var(--small) / 1.5) * -1));
    }
  }

  &[data-sizing="medium"] {
    width: var(--medium);
    max-width: var(--medium);

    &[data-side="left"] {
      inset: auto;
    }
    &[data-side="right"] {
      transform: translateX(calc((var(--medium) / 1.5) * -1));
    }
  }

  &[data-sizing="large"] {
    width: var(--large);
    max-width: var(--large);

    &[data-side="left"] {
      inset: auto;
    }
    &[data-side="right"] {
      transform: translateX(calc((var(--large) / 1.5) * -1));
    }
  }
`;

export const RootWrapper = styled.div`
  position: relative;
`;

export const ContentWrapper = styled.ul<IDropdownContentProperties>`
  --small: var(--measurement-large-60);
  --medium: var(--measurement-large-80);
  --large: var(--measurement-large-90);

  &[data-raw="false"] {
    position: fixed;
    margin: 0;

    padding: var(--measurement-medium-30);
    margin: var(--measurement-medium-10) 0;

    background-color: ${({ theme }) => theme.colors.body.contrast};
    border: var(--measurement-small-10) solid
      ${({ theme }) => theme.colors.text.alpha[0].rgb};
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);

    ${ContentWrapperSizes}
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
    text-align: left;
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
