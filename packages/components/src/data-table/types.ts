import type React from "react";
import type { IScrollAreaProperties } from "../scrollarea";

export type SortDirection = "asc" | "desc";
export type SortState = { key: string; direction: SortDirection } | null;

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  /** Absolute (`px`/`rem`) widths are honoured, anything else shares the rest. */
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  accessor?: (row: T) => unknown;
  cell?: (row: T) => React.ReactNode;
}

export interface RowEntry<T> {
  row: T;
  id: string;
}

export type HeaderCellRefs = React.MutableRefObject<
  Record<string, HTMLTableCellElement | null>
>;

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  getRowId?: (row: T, index: number) => string;
  selectable?: boolean;
  selectedRowIds?: string[];
  defaultSelectedRowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  sort?: SortState;
  defaultSort?: SortState;
  onSortChange?: (sort: SortState) => void;
  resizable?: boolean;
  minColumnWidth?: number;
  onColumnResize?: (key: string, width: number) => void;
  reorderable?: boolean;
  onColumnOrderChange?: (keys: string[]) => void;
  rowHeight?: number;
  height?: number;
  overscan?: number;
  onEndReached?: () => void;
  loading?: boolean;
  skeletonRows?: number;
  emptyState?: React.ReactNode;
  className?: string;
}

/** Original compound usage: `<Table><Table.Head>…</Table.Head></Table>` */
export type CompoundTableProps = IScrollAreaProperties &
  React.ComponentProps<"table"> & { columns?: undefined };

export type TableProps<T> = DataTableProps<T> | CompoundTableProps;
