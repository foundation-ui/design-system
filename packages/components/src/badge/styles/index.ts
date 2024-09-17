import styled, { css } from "styled-components";

const BadgeBaseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--measurement-medium-10);
  min-width: var(--measurement-medium-60);
  min-height: var(--measurement-medium-60);
  width: fit-content;

  border: var(--measurement-small-10) solid transparent;

  font-size: var(--fontsize-small-60);
  padding: var(--measurement-medium-10) var(--measurement-medium-30);
  font-weight: 500;
  transition: all ease-in-out 0.2s;
`;

const BadgeVariantStyles = css`
  border: var(--measurement-small-10) solid transparent;

  &[data-variant="primary"] {
    background-color: ${({ theme }) => theme.colors.text.base};
    color: ${({ theme }) => theme.colors.body.base};

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    }
  }
  &[data-variant="secondary"] {
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    color: ${({ theme }) => theme.colors.text.alpha[6].rgb};

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.text.alpha[1].rgb};
      color: ${({ theme }) => theme.colors.text.base};
    }
  }
  &[data-variant="border"] {
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.text.base};
    }
  }
  &[data-variant="warning"] {
    background-color: var(--alpha-red-10);
    color: var(--alpha-red-80);

    &:hover,
    &:focus {
      background-color: var(--alpha-red-10);
      color: var(--color-red);
    }
  }
  &[data-variant="meta"] {
    background-color: var(--alpha-blue-10);
    color: var(--alpha-blue-80);

    &:hover,
    &:focus {
      background-color: var(--alpha-blue-10);
      color: var(--color-blue);
    }
  }
`;
const BadgeShapeStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-20);
  }
  &[data-shape="round"] {
    border-radius: var(--measurement-large-90);
  }
`;
export const BadgeWrapper = styled.div`
  &[data-raw="false"] {
    ${BadgeBaseStyles}
    ${BadgeVariantStyles}
    ${BadgeShapeStyles}
  }
`;
