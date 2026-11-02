"use client";

import styled from "styled-components";

export const ResponseStreamWrapper = styled.div<{ $offset: number }>`
  width: 100%;
  padding-bottom: ${({ $offset }) => $offset}px;
`;
