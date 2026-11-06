import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const CellStyles = css`
  box-sizing: border-box;
  border: none;
  line-height: 1;
  padding: var(--measurement-medium-40) var(--measurement-medium-30);
`;
const Scrollbar = css<any>`
  height: ${({ $height }) => $height || "100%"};
  width: ${({ $width }) => $width || "100%"};

  &::-webkit-scrollbar {
    cursor: pointer;

    width: var(--measurement-medium-10);
  }

  &::-webkit-scrollbar-track {
    background: ${({ $trackColor }) => $trackColor || "transparent"};
    border-radius: var(--measurement-medium-30);
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ $thumbColor }) =>
      $thumbColor || "var(--font-color-alpha-10)"};
    border-radius: var(--measurement-medium-30);
    transition: background-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ $thumbHoverColor, $thumbColor }) =>
      $thumbHoverColor || $thumbColor || "var(--font-color-alpha-20)"};
  }

  // Firefox
  scrollbar-width: thin;
  scrollbar-color: ${({ $thumbColor, $trackColor }) =>
    `${$thumbColor || "var(--font-color-alpha-10)"} ${
      $trackColor || "transparent"
    }`};
`;

export const TableLayer = styled.div`
  ${InsetShadowCSSVariable}

  background-color: var(--body-color);
  border-radius: var(--measurement-medium-30);
  box-shadow: var(--inset-shadow);

  overflow: hidden;
`;
export const TableWrapper = styled.table<any>`
  border-collapse: collapse;
  font-size: var(--fontsize-medium-10);
  tbody {
    tr {
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
`;
export const RowWrapper = styled.tr<any>`
  border-bottom: var(--measurement-small-10) solid var(--font-color-alpha-10);
  transition: background-color linear 0.1s;

  &:hover {
    background-color: var(--font-color-alpha-10);
  }
`;
export const HeadCellWrapper = styled.th<any>`
  ${CellStyles}
`;
export const CellWrapper = styled.td<any>`
  ${CellStyles}
`;
export const TableScroller = styled.div`
  overflow: auto;
  /* The layer owns the radius; keep the scrollbar inside it. */
  border-radius: inherit;
  ${Scrollbar}
`;
export const DataTableWrapper = styled(TableWrapper)`
  table-layout: fixed;
`;
export const DataRow = styled(RowWrapper)`
  &[data-selected="true"] {
    background-color: var(--font-color-alpha-10);
  }
`;
export const DataCell = styled(CellWrapper)`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[data-align="center"] {
    text-align: center;
  }
  &[data-align="right"] {
    text-align: right;
  }
`;
export const StickyHeadCell = styled(HeadCellWrapper)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: left;
  white-space: nowrap;

  background-color: var(--body-color);

  /* border-collapse borders don't travel with sticky cells */
  box-shadow: inset 0 calc(var(--measurement-small-10) * -1) 0
    var(--font-color-alpha-10);

  transition: opacity linear 0.1s;

  &[data-dragging="true"] {
    opacity: 0.1;
  }
  &[data-align="center"] > div {
    justify-content: center;
  }
  &[data-align="right"] > div {
    justify-content: flex-end;
  }
  &[data-drop="before"]::before,
  &[data-drop="after"]::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--measurement-small-10);
    background-color: var(--font-color-alpha-30);
  }
  &[data-drop="before"]::before {
    left: 0;
  }
  &[data-drop="after"]::after {
    right: 0;
  }
`;
export const HeadInner = styled.div`
  display: flex;
  align-items: center;
  gap: var(--measurement-medium-30);
  min-width: 0;
`;
export const HeadLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-sortable="true"] {
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
  }
`;
export const IconButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fontsize-small-60);
  flex-shrink: 0;
  min-width: var(--measurement-medium-60);
  line-height: 1;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity linear 0.1s;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }
`;
export const ResizeHandle = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--measurement-medium-30);
  cursor: col-resize;
  touch-action: none;

  &::after {
    content: "";
    position: absolute;
    top: 25%;
    bottom: 25%;
    right: var(--measurement-small-30);
    width: var(--measurement-small-30);
    border-radius: var(--measurement-medium-10);

    background-color: transparent;
    transition: background-color linear 0.1s;
  }
  &:hover::after,
  &:active::after {
    background-color: var(--font-color-alpha-10);
  }
`;
export const EmptyCell = styled(CellWrapper)`
  padding: calc(var(--measurement-medium-40) * 3);
  text-align: center;
  color: var(--font-color-alpha-60);
`;
