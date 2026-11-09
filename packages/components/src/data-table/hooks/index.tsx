"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_ROOT_FONT_SIZE, compareValues, readValue } from "../utils";
import type {
  HeaderCellRefs,
  RowEntry,
  SortState,
  TableColumn,
} from "../types";

/** Controlled when `value !== undefined`, otherwise internal state. */
function useControllable<V>(
  value: V | undefined,
  defaultValue: V,
  onChange?: (value: V) => void,
) {
  const [inner, setInner] = useState<V>(defaultValue);
  const controlled = value !== undefined;
  const set = useCallback(
    (next: V) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [controlled ? (value as V) : inner, set] as const;
}

/**
 * What one `rem` is worth, in px. Defaults to 16 so SSR and hydration agree,
 * then measured once on the client.
 */
export function useRootFontSize() {
  const [size, setSize] = useState(DEFAULT_ROOT_FONT_SIZE);
  useEffect(() => {
    const measured = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    if (measured > 0) setSize(measured);
  }, []);
  return size;
}

/** Fixed-height windowing: only rows near the viewport are rendered. */
export function useVirtualRows({
  count,
  rowHeight,
  height,
  overscan,
}: {
  count: number;
  rowHeight: number;
  height: number;
  overscan: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const start = Math.min(
    count,
    Math.max(0, Math.floor(scrollTop / rowHeight) - overscan),
  );
  const end = Math.min(
    count,
    Math.ceil((scrollTop + height) / rowHeight) + overscan,
  );
  return {
    start,
    end,
    setScrollTop,
    paddingTop: start * rowHeight,
    paddingBottom: Math.max(0, count - end) * rowHeight,
  };
}

export function useColumnSort<T>({
  rows,
  columns,
  sort: sortProp,
  defaultSort,
  onSortChange,
}: {
  rows: RowEntry<T>[];
  columns: TableColumn<T>[];
  sort?: SortState;
  defaultSort: SortState;
  onSortChange?: (sort: SortState) => void;
}) {
  const [sort, setSort] = useControllable<SortState>(
    sortProp,
    defaultSort,
    onSortChange,
  );

  const sortedRows = useMemo(() => {
    const column = sort && columns.find((c) => c.key === sort.key);
    if (!sort || !column) return rows;
    const dir = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort(
      (a, b) =>
        dir * compareValues(readValue(a.row, column), readValue(b.row, column)),
    );
  }, [rows, columns, sort]);

  // none → asc → desc → none
  const toggleSort = useCallback(
    (key: string) => {
      if (!sort || sort.key !== key) setSort({ key, direction: "asc" });
      else if (sort.direction === "asc") setSort({ key, direction: "desc" });
      else setSort(null);
    },
    [sort, setSort],
  );

  return { sort, sortedRows, toggleSort };
}

export function useRowSelection<T>({
  sortedRows,
  selectedRowIds,
  defaultSelectedRowIds,
  onSelectionChange,
}: {
  sortedRows: RowEntry<T>[];
  selectedRowIds?: string[];
  defaultSelectedRowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}) {
  const [ids, setIds] = useControllable<string[]>(
    selectedRowIds,
    defaultSelectedRowIds ?? [],
    onSelectionChange,
  );
  const selected = useMemo(() => new Set(ids), [ids]);
  const allSelected =
    sortedRows.length > 0 && sortedRows.every((r) => selected.has(r.id));
  const someSelected =
    !allSelected && sortedRows.some((r) => selected.has(r.id));

  const toggleAll = useCallback(
    () => setIds(allSelected ? [] : sortedRows.map((r) => r.id)),
    [allSelected, sortedRows, setIds],
  );
  const toggleRow = useCallback(
    (id: string) =>
      setIds(selected.has(id) ? ids.filter((x) => x !== id) : [...ids, id]),
    [ids, selected, setIds],
  );

  return { selected, allSelected, someSelected, toggleAll, toggleRow };
}

export function useColumnResize<T>({
  orderedColumns,
  thRefs,
  minColumnWidth,
  onColumnResize,
}: {
  orderedColumns: TableColumn<T>[];
  thRefs: HeaderCellRefs;
  minColumnWidth: number;
  onColumnResize?: (key: string, width: number) => void;
}) {
  const [widths, setWidths] = useState<Record<string, number>>({});
  const drag = useRef<{
    key: string;
    startX: number;
    startWidth: number;
    width: number;
  } | null>(null);

  const startResize = useCallback(
    (key: string, e: React.PointerEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      // Pin every column at its rendered width so only this one moves.
      const snapshot: Record<string, number> = { ...widths };
      for (const column of orderedColumns) {
        const measured =
          snapshot[column.key] ??
          thRefs.current[column.key]?.getBoundingClientRect().width;
        if (measured) snapshot[column.key] = Math.round(measured);
      }
      setWidths(snapshot);
      const startWidth = snapshot[key] ?? minColumnWidth;
      drag.current = { key, startX: e.clientX, startWidth, width: startWidth };
    },
    [widths, orderedColumns, thRefs, minColumnWidth],
  );

  const moveResize = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const d = drag.current;
      if (!d) return;
      d.width = Math.max(
        minColumnWidth,
        Math.round(d.startWidth + e.clientX - d.startX),
      );
      setWidths((prev) => ({ ...prev, [d.key]: d.width }));
    },
    [minColumnWidth],
  );

  const endResize = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const d = drag.current;
      drag.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId))
        e.currentTarget.releasePointerCapture(e.pointerId);
      if (d) onColumnResize?.(d.key, d.width);
    },
    [onColumnResize],
  );

  return { widths, startResize, moveResize, endResize };
}

export function useColumnReorder<T>({
  columns,
  thRefs,
  onColumnOrderChange,
}: {
  columns: TableColumn<T>[];
  thRefs: HeaderCellRefs;
  onColumnOrderChange?: (keys: string[]) => void;
}) {
  const [order, setOrder] = useState<string[]>(() => columns.map((c) => c.key));
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const drop = useRef<number | null>(null);

  // Columns added/removed from props are merged in; known ones keep their slot.
  const orderedColumns = useMemo(() => {
    const byKey = new Map(columns.map((c) => [c.key, c]));
    const known = order.filter((k) => byKey.has(k));
    const added = columns.map((c) => c.key).filter((k) => !order.includes(k));
    return [...known, ...added].map((k) => byKey.get(k) as TableColumn<T>);
  }, [columns, order]);

  const startReorder = useCallback(
    (key: string, e: React.PointerEvent<HTMLElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragKey(key);
    },
    [],
  );

  const moveReorder = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!dragKey) return;
      let index = orderedColumns.length;
      for (let i = 0; i < orderedColumns.length; i++) {
        const col = orderedColumns[i];
        if (!col) continue;
        const rect = thRefs.current[col.key]?.getBoundingClientRect();
        if (rect && e.clientX < rect.left + rect.width / 2) {
          index = i;
          break;
        }
      }
      drop.current = index;
      setDropIndex(index);
    },
    [dragKey, orderedColumns, thRefs],
  );

  const endReorder = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId))
        e.currentTarget.releasePointerCapture(e.pointerId);
      const keys = orderedColumns.map((c) => c.key);
      const from = dragKey ? keys.indexOf(dragKey) : -1;
      const target = drop.current;
      if (from >= 0 && target !== null) {
        const to = target > from ? target - 1 : target;
        if (to !== from) {
          const moved = keys.splice(from, 1)[0];
          if (moved !== undefined) keys.splice(to, 0, moved);
          setOrder(keys);
          onColumnOrderChange?.(keys);
        }
      }
      drop.current = null;
      setDragKey(null);
      setDropIndex(null);
    },
    [dragKey, orderedColumns, onColumnOrderChange],
  );

  return {
    orderedColumns,
    dragKey,
    dropIndex,
    startReorder,
    moveReorder,
    endReorder,
  };
}
