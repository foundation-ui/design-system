"use client";

import React from "react";
import { SelectBox, SkeletonRows } from "./parts";
import {
  DataCell,
  DataRow,
  DataTableWrapper,
  EmptyCell,
  HeadInner,
  HeadLabel,
  IconButton,
  ResizeHandle,
  StickyHeadCell,
  TableLayer,
  TableScroller,
} from "../styles";
import type { DataTableProps, HeaderCellRefs } from "../types";
import {
  useColumnReorder,
  useColumnResize,
  useColumnSort,
  useRootFontSize,
  useRowSelection,
  useVirtualRows,
} from "../hooks";
import {
  CHECKBOX_PX,
  CHECKBOX_WIDTH,
  readCell,
  resolveColumnWidth,
} from "../utils";
import { Button } from "../../button";

export function DataTable<T>({
  data,
  columns,
  getRowId,
  selectable = false,
  selectedRowIds,
  defaultSelectedRowIds,
  onSelectionChange,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  resizable = false,
  minColumnWidth = 64,
  onColumnResize,
  reorderable = false,
  onColumnOrderChange,
  rowHeight = 48,
  height = 360,
  overscan = 10,
  onEndReached,
  loading = false,
  skeletonRows = 3,
  emptyState = "No data",
  className,
}: DataTableProps<T>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const thRefs: HeaderCellRefs = React.useRef({});

  const rows = React.useMemo(
    () =>
      data.map((row, index) => ({
        row,
        id: getRowId ? getRowId(row, index) : String(index),
      })),
    [data, getRowId],
  );

  const {
    orderedColumns,
    dragKey,
    dropIndex,
    startReorder,
    moveReorder,
    endReorder,
  } = useColumnReorder({ columns, thRefs, onColumnOrderChange });

  const { sort, sortedRows, toggleSort } = useColumnSort({
    rows,
    columns,
    sort: sortProp,
    defaultSort,
    onSortChange,
  });

  const { widths, startResize, moveResize, endResize } = useColumnResize({
    orderedColumns,
    thRefs,
    minColumnWidth,
    onColumnResize,
  });

  const { selected, allSelected, someSelected, toggleAll, toggleRow } =
    useRowSelection({
      sortedRows,
      selectedRowIds,
      defaultSelectedRowIds,
      onSelectionChange,
    });

  const { start, end, setScrollTop, paddingTop, paddingBottom } =
    useVirtualRows({
      count: sortedRows.length,
      rowHeight,
      height,
      overscan,
    });

  // Shrink-wrap only once every column has an explicit width; until then the
  // table fills its container and a trailing filler column is not needed.
  const sized =
    orderedColumns.length > 0 &&
    orderedColumns.every((c) => widths[c.key] != null);
  const colSpan =
    orderedColumns.length + (selectable ? 1 : 0) + (sized ? 1 : 0);

  const rootFontSize = useRootFontSize();

  // `table-layout: fixed` shrinks columns toward zero in a narrow container
  // instead of scrolling, so floor the table at what the columns asked for.
  const minTableWidth = React.useMemo(() => {
    const total = orderedColumns.reduce(
      (sum, column) => {
        const resized = widths[column.key];
        if (resized != null) return sum + resized;
        const declared = resolveColumnWidth(column.width, rootFontSize);
        return sum + (declared ?? minColumnWidth);
      },
      selectable ? CHECKBOX_PX : 0,
    );
    return Math.round(total);
  }, [minColumnWidth, orderedColumns, rootFontSize, selectable, widths]);

  // Infinite scroll: fire once per near-bottom dwell, paused while loading.
  const endReachedRef = React.useRef(false);

  const handleScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
    if (!onEndReached || loading || endReachedRef.current) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < rowHeight * 4) {
      endReachedRef.current = true;
      onEndReached();
    }
  }, [onEndReached, loading, rowHeight, setScrollTop]);

  const lastIndex = orderedColumns.length - 1;

  React.useEffect(() => {
    if (!loading) endReachedRef.current = false;
  }, [loading]);

  return (
    <TableLayer className={className}>
      <TableScroller ref={scrollRef} onScroll={handleScroll} style={{ height }}>
        <DataTableWrapper
          cellSpacing="0"
          cellPadding="0"
          style={{
            width: sized ? "max-content" : "100%",
            minWidth: `max(100%, ${minTableWidth}px)`,
          }}
        >
          <colgroup>
            {selectable ? <col style={{ width: CHECKBOX_WIDTH }} /> : null}
            {orderedColumns.map((column) => {
              const override = widths[column.key];
              const width = override ? `${override}px` : column.width;
              return (
                <col key={column.key} style={width ? { width } : undefined} />
              );
            })}
            {sized ? <col /> : null}
          </colgroup>

          <thead>
            <tr style={{ height: rowHeight }}>
              {selectable ? (
                <StickyHeadCell data-align="center">
                  <HeadInner style={{ justifyContent: "center" }}>
                    <SelectBox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={toggleAll}
                      label="Select all rows"
                    />
                  </HeadInner>
                </StickyHeadCell>
              ) : null}

              {orderedColumns.map((column, index) => {
                const active = sort?.key === column.key ? sort.direction : null;
                const drop =
                  dropIndex === index
                    ? "before"
                    : dropIndex === orderedColumns.length && index === lastIndex
                      ? "after"
                      : undefined;
                return (
                  <StickyHeadCell
                    key={column.key}
                    ref={(el: HTMLTableCellElement | null) => {
                      thRefs.current[column.key] = el;
                    }}
                    data-align={column.align}
                    data-drop={dragKey ? drop : undefined}
                    data-dragging={dragKey === column.key}
                    aria-sort={
                      active === "asc"
                        ? "ascending"
                        : active === "desc"
                          ? "descending"
                          : undefined
                    }
                  >
                    <HeadInner>
                      {reorderable ? (
                        <IconButton
                          aria-label={`Reorder ${column.key}`}
                          style={{ cursor: "grab", touchAction: "none" }}
                          onPointerDown={(e) => startReorder(column.key, e)}
                          onPointerMove={moveReorder}
                          onPointerUp={endReorder}
                          onPointerCancel={endReorder}
                        >
                          ⋮⋮
                        </IconButton>
                      ) : null}

                      <HeadLabel
                        data-sortable={!!column.sortable}
                        onClick={
                          column.sortable
                            ? () => toggleSort(column.key)
                            : undefined
                        }
                      >
                        {column.header}
                      </HeadLabel>

                      {column.sortable ? (
                        <Button
                          sizing="small"
                          variant="ghost"
                          aria-label={`Sort by ${column.key}`}
                          onClick={() => toggleSort(column.key)}
                        >
                          {active === "asc"
                            ? "↑"
                            : active === "desc"
                              ? "↓"
                              : "⇅"}
                        </Button>
                      ) : null}
                    </HeadInner>

                    {resizable ? (
                      <ResizeHandle
                        aria-hidden
                        onPointerDown={(e) => startResize(column.key, e)}
                        onPointerMove={moveResize}
                        onPointerUp={endResize}
                        onPointerCancel={endResize}
                      />
                    ) : null}
                  </StickyHeadCell>
                );
              })}
              {sized ? <StickyHeadCell aria-hidden /> : null}
            </tr>
          </thead>

          <tbody>
            {sortedRows.length === 0 ? (
              loading ? (
                <SkeletonRows
                  count={Math.max(1, Math.ceil(height / rowHeight))}
                  columns={orderedColumns}
                  selectable={selectable}
                  rowHeight={rowHeight}
                  filler={sized}
                />
              ) : (
                <tr>
                  <EmptyCell colSpan={colSpan}>{emptyState}</EmptyCell>
                </tr>
              )
            ) : (
              <React.Fragment>
                {paddingTop > 0 ? (
                  <tr aria-hidden style={{ height: paddingTop }}>
                    <td colSpan={colSpan} />
                  </tr>
                ) : null}

                {sortedRows.slice(start, end).map((entry, offset) => {
                  const index = start + offset;
                  const isSelected = selected.has(entry.id);
                  return (
                    <DataRow
                      key={entry.id}
                      data-selected={isSelected}
                      style={{ height: rowHeight }}
                    >
                      {selectable ? (
                        <DataCell data-align="center">
                          <SelectBox
                            checked={isSelected}
                            onChange={() => toggleRow(entry.id)}
                            label={`Select row ${index + 1}`}
                          />
                        </DataCell>
                      ) : null}

                      {orderedColumns.map((column) => (
                        <DataCell key={column.key} data-align={column.align}>
                          {readCell(entry.row, column)}
                        </DataCell>
                      ))}
                      {sized ? <DataCell aria-hidden /> : null}
                    </DataRow>
                  );
                })}

                {paddingBottom > 0 ? (
                  <tr aria-hidden style={{ height: paddingBottom }}>
                    <td colSpan={colSpan} />
                  </tr>
                ) : null}

                {loading ? (
                  <SkeletonRows
                    count={skeletonRows}
                    columns={orderedColumns}
                    selectable={selectable}
                    rowHeight={rowHeight}
                    filler={sized}
                  />
                ) : null}
              </React.Fragment>
            )}
          </tbody>
        </DataTableWrapper>
      </TableScroller>
    </TableLayer>
  );
}
