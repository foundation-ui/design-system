import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
`;

export const TextShimmerWrapper = styled.span<{
  "data-duration": number;
  "data-spread": number;
  "data-shimmer-color": string;
  "data-base-color": string;
}>`
  background: linear-gradient(
    90deg,
    ${({ "data-base-color": baseColor }) => baseColor} 0%,
    ${({ "data-shimmer-color": shimmerColor }) => shimmerColor} 40%,
    ${({ "data-base-color": baseColor }) => baseColor} 60%,
    ${({ "data-base-color": baseColor }) => baseColor} 100%
  );
  background-size: ${({ "data-spread": spread }) => spread}% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: ${shimmer} ${({ "data-duration": duration }) => duration}s linear
    infinite;
  display: inline-block;
`;
