"use client";

import styled, { css, keyframes } from "styled-components";

const Wave = keyframes`
  0%,
  100% {
    transform: scaleY(0.33);
    background: var(--font-color-alpha-10);
  }
  50% {
    transform: scaleY(0.66);
    background: var(--font-color-alpha-60);
  }
`;

const VoiceIndicatorHeightGapStyles = css`
  &[data-size="small"] {
    height: var(--fontsize-small-60);
    gap: var(--measurement-small-30);
  }
  &[data-size="medium"] {
    height: var(--fontsize-medium-20);
    gap: var(--measurement-small-30);
  }
  &[data-size="large"] {
    height: var(--fontsize-medium-40);
    gap: var(--measurement-small-30);
  }
`;
const VoiceIndicatorWidthStyles = css`
  &[data-size="small"] {
    width: var(--measurement-small-30);
  }
  &[data-size="medium"] {
    width: var(--measurement-small-30);
  }
  &[data-size="large"] {
    width: var(--measurement-small-30);
  }
`;

export const VoiceControlTranscriptWrapper = styled.div`
  &[data-raw="false"] {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
`;
export const IndicatorWrapper = styled.div`
  display: flex;
  align-items: center;

  ${VoiceIndicatorHeightGapStyles}
  transition: all ease-in-out 0.2s;
`;
export const IndicatorLine = styled.span`
  display: block;

  ${VoiceIndicatorHeightGapStyles}
  ${VoiceIndicatorWidthStyles}

  border-radius: var(--measurement-large-10);

  &[data-animate="true"] {
    animation-duration: var(--line-duration, 1.2s);
  }
  &[data-animate="false"] {
    animation-duration: calc(var(--line-duration) * 4);
  }

  animation: ${Wave} ease-in-out infinite;
  transition: all ease-in-out 0.2s;
`;
