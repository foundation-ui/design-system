"use client";

import styled, { css } from "styled-components";

const SharedLayoutPillStyles = css`
  position: absolute;
  z-index: 0;
  pointer-events: none;

  top: var(--shared-layout-top);
  height: var(--shared-layout-height);
  left: calc(var(--shared-layout-inset) * -1);
  right: calc(var(--shared-layout-inset) * -1);

  border-radius: var(--measurement-medium-30);
  background-color: var(--font-color-alpha-10);

  opacity: 0;
  filter: blur(var(--measurement-medium-10));

  transition:
    opacity 200ms ease-out,
    filter 200ms ease-out;

  &[data-visible="true"] {
    opacity: 1;
    filter: blur(0);
  }

  /* Position only animates when moving between items, not on first show. */
  &[data-moving="true"] {
    transition:
      top 300ms cubic-bezier(0.22, 1, 0.36, 1),
      height 300ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 200ms ease-out,
      filter 200ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    filter: none;
    transition: opacity 120ms linear;

    &[data-moving="true"] {
      transition: opacity 120ms linear;
    }
  }
`;

export const SharedLayoutWrapper = styled.div<any>`
  &[data-raw="false"] {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &[data-as="ul"] {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
export const SharedLayoutPill = styled.div`
  ${SharedLayoutPillStyles}
`;
export const SharedLayoutItemWrapper = styled.div`
  list-style: none;
`;
export const SharedLayoutContent = styled.div`
  position: relative;
  z-index: 1;
`;
