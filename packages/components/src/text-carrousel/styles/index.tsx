"use client";

import styled from "styled-components";

export const TextCarrouselWrapper = styled.span`
  cursor: pointer;
  user-select: none;
  text-align: center;

  &[data-auto="true"] {
    user-select: none;
    pointer-events: none;
  }
`;
