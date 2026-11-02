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
const TreeLineSizeStyles = css`
  &[data-size="small"] {
    &::before {
      height: calc(100% - (var(--measurement-medium-60) * -0.6));
    }
  }
  &[data-size="medium"] {
    &::before {
      height: calc(100% - (var(--measurement-medium-60) * -1));
    }
  }
  &[data-size="large"] {
    &::before {
      height: calc(100% - (var(--measurement-medium-60) * -1.5));
    }
  }
`;

export const TreeList = styled.ul<any>`
  &[data-raw="false"] {
    ${TreeDefaultStyles}
    ${TreeSizeStyles}
  }

  &::before {
    content: "";
    top: 0;
    left: calc(var(--measurement-small-10) * -1);
    position: absolute;
    height: calc(100% - (var(--measurement-medium-60) * 0.9));
    width: var(--measurement-small-10);
    background: var(--font-color-alpha-10);
  }

  /* Nested levels are indented and don't repeat the outer padding */
  &[data-nested="true"] {
    margin-left: var(--measurement-medium-60);
    padding-bottom: 0;

    ${TreeLineSizeStyles}
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

    width: var(--measurement-medium-80);
    height: var(--measurement-small-10);

    background-color: var(--font-color-alpha-10);
  }
`;
export const TreeLink = styled(Button)<any>`
  &[data-raw="false"] {
    line-height: 1.1 !important;
  }
  &[data-nested="true"] {
    padding-left: var(--measurement-medium-30) !important;
  }
`;
