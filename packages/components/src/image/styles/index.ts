"use client";

import styled, { css } from "styled-components";
import { createShapeStyles } from "../../css/ShapeStyles";

const ImageShapeStyles = createShapeStyles({
  smooth: "border-radius: var(--measurement-medium-30);",
  round: "border-radius: var(--measurement-medium-60);",
});

export const Img = styled.img<{ $fill: boolean }>`
  display: block;
  object-fit: cover;

  ${ImageShapeStyles}

  ${({ $fill }) =>
    $fill
      ? "position: absolute; inset: 0; width: 100%; height: 100%;"
      : "max-width: 100%; height: auto;"}
`;
