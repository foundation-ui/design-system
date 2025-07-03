"use client";

import React from "react";
import { ScrollArea, IScrollAreaProperties } from "../scrollarea";
import {
  TableLayer,
  TableWrapper,
  RowWrapper,
  HeadCellWrapper,
  CellWrapper,
} from "./styles";

/**
 * Table component that provides a scrollable table with styled elements.
 *
 * @param {IScrollAreaProperties & React.ComponentProps<"table">} props - The props for the Table component
 * @returns {React.ReactElement} The Table component
 */
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

/**
 * Table head component
 *
 * @param {React.ComponentProps<"thead">} props - The props for the TableHead component
 * @returns {React.ReactElement} The TableHead component
 */
const TableHead = ({
  children,
  ...restProps
}: React.ComponentProps<"thead">) => {
  return <thead {...restProps}>{children}</thead>;
};
TableHead.displayName = "Table.Head";

/**
 * Table body component
 *
 * @param {React.ComponentProps<"tbody">} props - The props for the TableBody component
 * @returns {React.ReactElement} The TableBody component
 */
const TableBody = ({
  children,
  ...restProps
}: React.ComponentProps<"tbody">) => {
  return <tbody {...restProps}>{children}</tbody>;
};
TableBody.displayName = "Table.Body";

/**
 * Table head cell component
 *
 * @param {React.ComponentProps<"th">} props - The props for the TableHeadCell component
 * @returns {React.ReactElement} The TableHeadCell component
 */
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

/**
 * Table row component
 *
 * @param {React.ComponentProps<"tr">} props - The props for the TableRow component
 * @returns {React.ReactElement} The TableRow component
 */
const TableRow = ({ children, ...restProps }: React.ComponentProps<"tr">) => {
  return (
    <RowWrapper className="p-medium-30" {...restProps}>
      {children}
    </RowWrapper>
  );
};
TableRow.displayName = "Table.Row";

/**
 * Table cell component
 *
 * @param {React.ComponentProps<"td">} props - The props for the TableCell component
 * @returns {React.ReactElement} The TableCell component
 */
const TableCell = ({ children, ...restProps }: React.ComponentProps<"td">) => {
  return (
    <CellWrapper {...restProps}>
      <div className="flex align-center g-medium-30">{children}</div>
    </CellWrapper>
  );
};
TableCell.displayName = "Table.Cell";

/**
 * Table footer component
 *
 * @param {React.ComponentProps<"tfoot">} props - The props for the TableFooter component
 * @returns {React.ReactElement} The TableFooter component
 */
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
