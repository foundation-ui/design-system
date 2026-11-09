"use client";

import styled, { css } from "styled-components";
import { createShapeStyles } from "../../css/ShapeStyles";
import { PulseKeyframes } from "../../css/AnimationStyles";

const PillSizesStyles = css`
  aspect-ratio: 1;

  &[data-size="small"] {
    width: var(--measurement-medium-30);
    height: var(--measurement-medium-30);
  }

  &[data-size="medium"] {
    width: var(--measurement-medium-50);
    height: var(--measurement-medium-50);
  }

  &[data-size="large"] {
    width: var(--measurement-medium-60);
    height: var(--measurement-medium-60);
  }
`;
const PillShapesStyles = createShapeStyles({
  smooth: "border-radius: var(--measurement-small-30);",
  round: "border-radius: var(--measurement-large-90);",
});

export const PillBody: any = styled.div<{
  $color?: string;
  $pulse?: boolean;
  $fixed?: boolean;
}>`
  --pill-color: ${({ $color }) =>
    $color ? $color : `var(--font-color-alpha-30)`};
  --shadow: 0 0 0 0 var(--pill-color);

  display: inline-block;
  position: relative;
  background-color: var(--pill-color);

  ${({ $pulse }) =>
    $pulse &&
    css`
      animation: ${PulseKeyframes} 1s infinite;
    `}
  ${({ $fixed }) =>
    $fixed &&
    `
    position: absolute;
    bottom: calc(var(--measurement-small-20) * -1);
    right: calc(var(--measurement-small-20) * -1);
  `};

  ${PillSizesStyles}
  ${PillShapesStyles}
`;
