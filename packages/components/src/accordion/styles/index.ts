"use client";

import styled, { keyframes } from "styled-components";

const GrowIn = keyframes`
  from { grid-template-rows: 0fr; }
  to { grid-template-rows: 1fr; }
`;
const GrowOut = keyframes`
  from { grid-template-rows: 1fr; }
  to { grid-template-rows: 0fr; }
`;
const SlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(calc(var(--accordion-offset) * -1));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const SlideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(calc(var(--accordion-offset) * -1));
  }
`;

export const AccordionContentWrapper = styled.div<any>`
  --accordion-duration: 0.2s;
  --accordion-offset: var(--measurement-medium-30);

  display: grid;
  grid-template-rows: 1fr;

  animation-duration: var(--accordion-duration);
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;

  &[data-state="open"] {
    animation-name: ${GrowIn};
  }

  &[data-state="closed"] {
    animation-name: ${GrowOut};
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    --accordion-duration: 0.01s;
  }
`;

export const AccordionContentInner = styled.div<any>`
  /* min-height: 0 lets the grid row shrink below the content size */
  min-height: 0;

  /* Clip vertically for the height animation so children can draw outside the box */
  overflow-x: visible;
  overflow-y: clip;

  animation-duration: var(--accordion-duration);
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;

  [data-state="open"] > & {
    animation-name: ${SlideIn};
  }

  [data-state="closed"] > & {
    animation-name: ${SlideOut};
  }
`;
