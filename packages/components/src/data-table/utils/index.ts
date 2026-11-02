import type React from "react";
import type { TableColumn } from "../types";

export const CHECKBOX_PX = 48;
export const CHECKBOX_WIDTH = `${CHECKBOX_PX}px`;
export const DEFAULT_ROOT_FONT_SIZE = 12;

/**
 * Absolute width a column declared, in px, or null when it declared a share
 * of the remainder (`fr`, `%`, `auto`, `calc()`, nothing).
 */
export function resolveColumnWidth(
  width: string | undefined,
  rootFontSize: number,
): number | null {
  if (!width) return null;
  const value = Number.parseFloat(width);
  if (!Number.isFinite(value)) return null;
  if (width.endsWith("px")) return value;
  if (width.endsWith("rem")) return value * rootFontSize;
  return null;
}

export function readValue<T>(row: T, column: TableColumn<T>): unknown {
  if (column.accessor) return column.accessor(row);
  return (row as unknown as Record<string, unknown>)[column.key];
}

export function readCell<T>(row: T, column: TableColumn<T>): React.ReactNode {
  if (column.cell) return column.cell(row);
  const value = readValue(row, column);
  return value == null ? "" : String(value);
}

export function compareValues(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
    numeric: true,
  });
}
