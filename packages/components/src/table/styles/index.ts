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
  border: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.text.alpha[0].rgb};
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
  border-bottom: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.text.alpha[0].rgb};

  transition: background-color linear 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
`;
export const HeadCellWrapper = styled.th`
  font-size: var(--fontsize-medium-10);
  ${CellStyles}

  div {
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
  }
`;
export const CellWrapper = styled.td`
  ${CellStyles}
`;
