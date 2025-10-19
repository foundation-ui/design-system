"use client";

import styled from "styled-components";

export const ItemWrapper = styled.span`
  width: 100%;
  line-clamp: 2;
  word-break: break-all;

  &[data-current="true"] {
    opacity: 1 !important;
  }
`;

export const SeparatorItem = styled.span`
  color: var(--font-color-alpha-10) !important;
  user-select: none;
  pointer-events: none;
`;
