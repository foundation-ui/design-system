"use client";

import React from "react";

import { Checkbox, Skeleton } from "../..";
import { DataCell, DataRow } from "../styles";

import type { TableColumn } from "../types";

export const SelectBox = ({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <Checkbox.Root>
      <Checkbox
        ref={ref}
        defaultChecked={checked}
        variant="secondary"
        sizing="medium"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      >
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  );
};

/** Bare input: commits on blur/Enter, Escape reverts. */
export const EditableCell = ({
  value,
  label,
  onChange,
}: {
  value: string;
  label: string;
  onChange: (next: string) => void;
}) => {
  const [draft, setDraft] = React.useState(value);
  const cancelled = React.useRef(false);

  React.useEffect(() => setDraft(value), [value]);

  return (
    <DataCell
      value={draft}
      aria-label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDraft(e.target.value)
      }
      onBlur={() => {
        if (cancelled.current) {
          cancelled.current = false;
          setDraft(value);
        } else if (draft !== value) onChange(draft);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLTableElement>) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          cancelled.current = true;
          e.currentTarget.blur();
        }
      }}
    />
  );
};

export const SkeletonRows = <T,>({
  count,
  columns,
  selectable,
  rowHeight,
  filler,
}: {
  count: number;
  columns: TableColumn<T>[];
  selectable: boolean;
  rowHeight: number;
  filler: boolean;
}) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <DataRow key={i} aria-hidden style={{ height: rowHeight }}>
        {selectable ? <DataCell /> : null}
        {columns.map((column, j) => (
          <DataCell>
            <Skeleton key={column.key} sizing="small" shape="smooth" />
          </DataCell>
        ))}
        {filler ? <DataCell /> : null}
      </DataRow>
    ))}
  </>
);
