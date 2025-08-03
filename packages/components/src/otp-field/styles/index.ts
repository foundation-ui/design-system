import styled from "styled-components";

export const OTPCell = styled.input`
  width: var(--measurement-medium-90);
  height: var(--measurement-medium-90);
  border: var(--measurement-small-10) solid var(--font-color-alpha-10);

  border-radius: var(--measurement-medium-30);
  backdrop-filter: blur(var(--measurement-small-10));

  text-align: center;
  font-size: var(--fontsize-medium-10);
  font-weight: 500;

  color: var(--font-color-alpha-10);
  text-shadow: 0 0 0 var(--font-color);

  background-color: transparent;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus:not(:active) {
    background-color: var(--font-color-alpha-10);
  }

  &:hover:not(:active) {
    border-color: var(--font-color-alpha-20);
  }

  &::placeholder {
    opacity: var(--opacity-default-10);
  }
`;
