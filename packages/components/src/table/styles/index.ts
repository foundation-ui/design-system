import styled, { css } from "styled-components";

const CellStyles = css`
  box-sizing: border-box;
  border: none;
  line-height: 1;
  font-weight: 500;
  padding: var(--measurement-medium-40) var(--measurement-medium-30);
  letter-spacing: calc(
    var(--fontsize-small-10) - ((var(--fontsize-small-10) * 1.066))
  );
`;

export const TableLayer = styled.div`
  border-radius: var(--measurement-medium-30);
  border: var(--measurement-small-10) solid var(--font-color-alpha-10);
`;
export const TableWrapper = styled.table`
  border-collapse: collapse;

  tbody {
    tr {
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
`;
export const RowWrapper = styled.tr`
  border-bottom: var(--measurement-small-10) solid var(--font-color-alpha-10);

  transition: background-color linear 0.1s;

  &:hover {
    background-color: var(--font-color-alpha-10);
  }
`;
export const HeadCellWrapper = styled.th`
  font-size: var(--fontsize-medium-10);
  ${CellStyles}

  div {
    color: var(--font-color-alpha-60);
  }
`;
export const CellWrapper = styled.td`
  ${CellStyles}
`;
