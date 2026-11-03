"use client";
import styled from "styled-components";

export const PromptWrapper = styled.div`
  position: relative;
  width: 100%;

  textarea {
    padding-top: var(--measurement-medium-60) !important;
    padding-left: var(--measurement-medium-50) !important;
    border-radius: var(--measurement-medium-60) !important;
  }
`;
export const ToolsWrapper = styled.div`
  position: absolute !important;
  width: 100%;

  border-bottom-left-radius: var(--measurement-medium-60);
  border-bottom-right-radius: var(--measurement-medium-60);

  bottom: 0;

  padding: var(--measurement-medium-30);

  pointer-events: none;
  user-select: none;

  > * {
    pointer-events: auto;
    user-select: auto;
  }
`;
export const AuxiliaryWrapper = styled.div<{ $height?: number }>`
  --height: ${({ $height }) =>
    $height != null ? `${$height}px` : "var(--measurement-medium-90)"};

  position: absolute !important;
  display: flex;
  align-items: end;

  width: 100%;
  height: var(--height);

  top: calc(var(--height) * -1);
  padding: 0 var(--measurement-medium-30);
`;
