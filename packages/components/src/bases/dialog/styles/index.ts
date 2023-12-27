import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;

  &[data-raw="false"] {
    background-color: var(--alpha-mono-dark-10);
    backdrop-filter: blur(var(--measurement-small-30));
  }
`;
export const Menu = styled.menu`
  margin: 0;
  padding: 0;

  &[data-raw="false"] {
    display: flex;
    justify-content: flex-end;
    gap: var(--measurement-medium-60);
  }
`;
export const DialogWrapper = styled.dialog`
  border: none;
  box-shadow: none;
  z-index: 100;

  &[data-raw="false"] {
    position: fixed;
    top: var(--measurement-large-60);

    width: 100%;
    max-width: calc(var(--measurement-large-90) * 1.33);
    padding: var(--measurement-medium-60);

    background-color: var(--color-mono-whitest);
    border-radius: var(--measurement-medium-30);
  }
`;
