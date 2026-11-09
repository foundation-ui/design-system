"use client";

import styled from "styled-components";
import { createShapeStyles } from "../../css/ShapeStyles";

const VideoShapeStyles = createShapeStyles({
  smooth: "border-radius: var(--measurement-medium-30);",
  round: "border-radius: var(--measurement-medium-60);",
});

export const VideoWrapper = styled.video<{ $fill: boolean }>`
  display: block;
  object-fit: cover;

  ${VideoShapeStyles}

  ${({ $fill }) =>
    $fill
      ? "position: absolute; inset: 0; width: 100%; height: 100%;"
      : "max-width: 100%; height: auto;"}
`;
