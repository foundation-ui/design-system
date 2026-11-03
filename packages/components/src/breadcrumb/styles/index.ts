"use client";

import styled from "styled-components";

export const ItemWrapper = styled.span`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
  word-break: break-all;

  &[data-current="true"] {
    opacity: 1 !important;
  }
`;

export const SeparatorItem = styled.span`
  color: var(--font-color-alpha-10) !important;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
`;
