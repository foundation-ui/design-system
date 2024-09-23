import React from "react";
import { ScrollArea, IScrollAreaProperties } from "../scrollarea";
import {
  TableLayer,
  TableWrapper,
  RowWrapper,
  HeadCellWrapper,
  CellWrapper,
} from "./styles";

const Table = ({
  children,
  ...restProps
}: IScrollAreaProperties & React.ComponentProps<"table">) => {
  return (
    <ScrollArea as={TableLayer} role="presentation" tabIndex={-1}>
      <TableWrapper {...restProps} cellSpacing="0" cellPadding="0">
        {children}
      </TableWrapper>
    </ScrollArea>
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

Table.Head = TableHead;
Table.Body = TableBody;
Table.HeadCell = TableHeadCell;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Footer = TableFooter;

export {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
};
