"use client";

import styled, { css } from "styled-components";
import { Button } from "../..";

const TreeDefaultStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--measurement-medium-30);

  margin: 0;
  padding: var(--measurement-medium-30) 0 var(--measurement-medium-30);
  list-style: none;
`;
const TreeSizeStyles = css`
  &[data-size="small"] {
    gap: var(--measurement-medium-10);
  }
  &[data-size="medium"] {
    gap: var(--measurement-medium-30);
  }
  &[data-size="large"] {
    gap: var(--measurement-medium-60);
  }
`;

export const TreeList = styled.ul<any>`
  &[data-raw="false"] {
    ${TreeDefaultStyles}
    ${TreeSizeStyles}
  }

  /* Nested levels are indented and don't repeat the outer padding */
  &[data-nested="true"] {
    margin-left: var(--measurement-medium-60);
    padding-bottom: 0;
  }
`;
export const TreeItem = styled.li<any>`
  &[data-raw="false"] {
    display: flex;
    align-items: center;
  }

  /* Branches stack their trigger and nested list vertically */
  &[data-raw="false"][data-branch="true"] {
    display: block;
  }
`;
export const TreeItemContent = styled.div<any>`
  &[data-raw="false"] {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: var(--measurement-medium-30);
  }
`;
export const TreeLine = styled.span<any>`
  &[data-raw="false"] {
    display: block;
    flex-shrink: 0;
  }
`;
export const TreeLink = styled(Button)<any>`
  &[data-raw="false"] {
    line-height: 1 !important;
    background-color: transparent !important;
    -webkit-backdrop-filter: unset !important;
    backdrop-filter: unset !important;
  }
  &[data-nested="true"] {
    padding-left: var(--measurement-medium-30) !important;
  }
`;
