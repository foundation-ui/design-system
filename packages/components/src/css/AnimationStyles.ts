import { keyframes } from "styled-components";

export const FadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const ScaleInKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const createSlideInY = (offset: string) => keyframes`
  0% {
    opacity: 0;
    transform: translateY(${offset});
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PulseKeyframes = keyframes`
  0% {
    box-shadow: var(--shadow);
  }
  100% {
    box-shadow: 0 0 0 var(--measurement-medium-10) transparent;
  }
`;
