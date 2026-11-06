import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const DataTableMeta: ComponentRegistryMetadata = {
  name: "DataTable",
  title: "DataTable",
  description:
    "Generic, always-virtualized data table with controlled or uncontrolled row selection, column sorting, resizing, reordering, fixed row heights, optional infinite scroll, loading skeletons, and an empty state. Columns are configured declaratively with TableColumn<T>.",
  category: "data",
  variants: [],
  props: [
    {
      name: "data",
      type: "T[]",
      required: true,
    },
    {
      name: "columns",
      type: "TableColumn<T>[]",
      required: true,
    },
    {
      name: "getRowId",
      type: "(row: T, index: number) => string",
    },
    {
      name: "selectable",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "selectedRowIds",
      type: "string[]",
    },
    {
      name: "defaultSelectedRowIds",
      type: "string[]",
    },
    {
      name: "onSelectionChange",
      type: "(ids: string[]) => void",
    },
    {
      name: "sort",
      type: "SortState",
    },
    {
      name: "defaultSort",
      type: "SortState",
      defaultValue: "null",
    },
    {
      name: "onSortChange",
      type: "(sort: SortState) => void",
    },
    {
      name: "resizable",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "minColumnWidth",
      type: "number",
      defaultValue: "64",
    },
    {
      name: "onColumnResize",
      type: "(key: string, width: number) => void",
    },
    {
      name: "reorderable",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "onColumnOrderChange",
      type: "(keys: string[]) => void",
    },
    {
      name: "rowHeight",
      type: "number",
      defaultValue: "48",
    },
    {
      name: "height",
      type: "number",
      defaultValue: "360",
    },
    {
      name: "overscan",
      type: "number",
      defaultValue: "10",
    },
    {
      name: "onEndReached",
      type: "() => void",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "skeletonRows",
      type: "number",
      defaultValue: "3",
    },
    {
      name: "emptyState",
      type: "ReactNode",
      defaultValue: "No data",
    },
    {
      name: "className",
      type: "string",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Columns and rows",
      code: `import { DataTable } from "@usefui/components";
import type { TableColumn } from "@usefui/components";

type Person = { id: string; name: string; role: string };

const columns: TableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
];

const data: Person[] = [{ id: "1", name: "Ada", role: "Owner" }];

export function Component() {
  return (
    <DataTable
      data={data}
      columns={columns}
      getRowId={(row) => row.id}
      height={320}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Controlled selection and sorting",
      code: `import { useState } from "react";
import { DataTable } from "@usefui/components";
import type { SortState, TableColumn } from "@usefui/components";

type Person = { id: string; name: string };

const columns: TableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
];

export function Component({ data }: { data: Person[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<SortState>(null);

  return (
    <DataTable
      data={data}
      columns={columns}
      selectable
      selectedRowIds={selected}
      onSelectionChange={setSelected}
      sort={sort}
      onSortChange={setSort}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Infinite scroll with loading skeletons",
      code: `import { DataTable } from "@usefui/components";
import type { TableColumn } from "@usefui/components";

type Person = { id: string; name: string };

const columns: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
];

export function Component({
  data,
  loading,
  loadMore,
}: {
  data: Person[];
  loading: boolean;
  loadMore: () => void;
}) {
  return (
    <DataTable
      data={data}
      columns={columns}
      rowHeight={48}
      height={360}
      overscan={6}
      loading={loading}
      skeletonRows={3}
      onEndReached={loadMore}
    />
  );
}`,
    },
    {
      kind: "note",
      title: "TableColumn<T> shape",
      description:
        "{ key: string; header: ReactNode; width?: string; align?: 'left' | 'center' | 'right'; sortable?: boolean; accessor?: (row: T) => unknown; cell?: (row: T) => ReactNode }. Absolute px/rem widths are honoured; other widths share the remaining space.",
    },
    {
      kind: "note",
      title: "SortState shape",
      description:
        '{ key: string; direction: "asc" | "desc" } | null. Sorting is client-side over the provided data; the component does not fetch or filter.',
    },
    {
      kind: "note",
      title: "Rows are virtualized by default",
      description:
        "`height`, `rowHeight`, and `overscan` control the virtual window. There is no opt-out; use the compound Table for small, fully rendered tables.",
    },
  ],
  a11y: {
    role: "native table semantics (table, thead, th, tbody, tr, td)",
    keyboardNav:
      "Sort buttons and the reorder handle are focusable. Selection uses native checkbox inputs. The table itself does not implement grid-style arrow-key navigation.",
    ariaAttributes: [
      "aria-sort on sortable header cells",
      "aria-label on sort buttons (Sort by {key})",
      "aria-label on reorder handles (Reorder {key})",
      "aria-label on select-all and per-row checkboxes",
      "aria-hidden on skeleton rows and virtualization spacers",
    ],
  },
  relatedComponents: ["Checkbox", "Skeleton", "ScrollArea", "Badge"],
  aiHints: {
    useCases: [
      "large datasets that need virtualization",
      "multi-select rows with controlled selection state",
      "sortable, resizable, and reorderable admin tables",
      "infinite-scroll lists with loading skeletons",
    ],
    avoid: [
      "small static tables — use a plain semantic table element",
      "server-side filtering expectations — filtering is not implemented",
      "variable row heights — the virtualizer assumes a fixed rowHeight",
      "omitting getRowId when row order can change",
    ],
    composesWith: [
      "Checkbox",
      "Skeleton",
      "ScrollArea",
      "Badge",
      "BulkActions",
    ],
  },
};
