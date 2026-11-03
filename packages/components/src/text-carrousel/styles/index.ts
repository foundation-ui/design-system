"use client";

import styled from "styled-components";

export const TextCarrouselWrapper = styled.span`
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  text-align: center;

  &[data-auto="true"] {
    -webkit-user-select: none;
  user-select: none;
    pointer-events: none;
  }
`;
