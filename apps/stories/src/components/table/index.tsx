import React from "react";
import { TableProvider, useTable } from "./hooks";
import { IReactChildren } from "../../../../../types";

import styled, { css } from "styled-components";

const HiddenScrollbar = css`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  &::-moz-scrollbar {
    display: none;
  }
`;
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

const TableLayer = styled.div`
  border-radius: var(--measurement-medium-30);
  border: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.text.alpha[0].rgb};

  overflow-x: scroll;
  ${HiddenScrollbar}
`;
const TableWrapper = styled.table`
  border-collapse: collapse;

  tbody {
    tr {
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
`;
const RowWrapper = styled.tr`
  border-bottom: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.text.alpha[0].rgb};

  transition: background-color linear 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }

  td,
  th {
    &:last-of-type {
      div {
        justify-content: flex-end;
      }
    }
  }
`;
const HeadCellWrapper = styled.th`
  font-size: var(--fontsize-medium-10);
  ${CellStyles}

  div {
    color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
  }
`;
const CellWrapper = styled.td`
  ${CellStyles}
`;

const TableRoot = ({ children }: IReactChildren) => {
  return (
    <TableProvider>
      <TableLayer role="presentation" tab-index="-1">
        {children}
      </TableLayer>
    </TableProvider>
  );
};
TableRoot.displayName = "Table.Root";

const Table = ({ children, ...restProps }: React.ComponentProps<"table">) => {
  const { id } = useTable();
  return (
    <TableWrapper id={id} {...restProps} cellSpacing="0" cellPadding="0">
      {children}
    </TableWrapper>
  );
};
Table.displayName = "Table";

const TableHead = ({
  children,
  ...restProps
}: React.ComponentProps<"thead">) => {
  return <thead {...restProps}>{children}</thead>;
};
TableHead.displayName = "Table.Head";

const TableBody = ({
  children,
  ...restProps
}: React.ComponentProps<"tbody">) => {
  return <tbody {...restProps}>{children}</tbody>;
};
TableBody.displayName = "Table.Body";

const TableHeadCell = ({
  children,
  ...restProps
}: React.ComponentProps<"th">) => {
  return (
    <HeadCellWrapper colSpan={1} {...restProps}>
      <div className="flex align-center g-medium-30">{children}</div>
    </HeadCellWrapper>
  );
};
TableHeadCell.displayName = "Table.HeadCell";

const TableRow = ({ children, ...restProps }: React.ComponentProps<"tr">) => {
  return (
    <RowWrapper className="p-medium-30" {...restProps}>
      {children}
    </RowWrapper>
  );
};
TableRow.displayName = "Table.Row";

const TableCell = ({ children, ...restProps }: React.ComponentProps<"td">) => {
  return (
    <CellWrapper {...restProps}>
      <div className="flex align-center g-medium-30">{children}</div>
    </CellWrapper>
  );
};
TableCell.displayName = "Table.Cell";

const TableFooter = ({
  children,
  ...restProps
}: React.ComponentProps<"tfoot">) => {
  return <tfoot {...restProps}>{children}</tfoot>;
};
TableFooter.displayName = "Table.Footer";

Table.Root = TableRoot;
Table.Head = TableHead;
Table.Body = TableBody;
Table.HeadCell = TableHeadCell;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Footer = TableFooter;

export {
  TableRoot,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
};
