import React, { useMemo, useState } from "react";
import { Badge, DataTable, Mark, Page } from "@usefui/components";

import type { TableColumn } from "@usefui/components";
import type { Meta, StoryObj } from "@storybook/react";

type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "success" | "warning" | "danger";
  mrr: number;
};

const FIRST = ["Ava", "Leo", "Mia", "Kai", "Zoe", "Eli", "Noa", "Ren", "Ivy"];
const LAST = ["Cole", "Frost", "Vale", "Reyes", "Okafor", "Sato", "Lund"];
const ROLES = ["Owner", "Admin", "Member", "Viewer"];
const STATUSES: Person["status"][] = ["success", "danger", "warning"];

// Deterministic so SSR and client render the same rows.
const buildPeople = (count: number): any[] =>
  Array.from({ length: count }, (_, i) => {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 7) % LAST.length];
    return {
      id: String(i),
      name: `${first} ${last}`,
      email: `${first?.toLowerCase()}.${last?.toLowerCase()}${i}@example.dev`,
      role: ROLES[(i * 3) % ROLES.length],
      status: STATUSES[(i * 5) % STATUSES.length],
      mrr: 12 + ((i * 37) % 488),
    };
  });

const DataPreview = () => {
  const data = useMemo(() => buildPeople(10_000), []);
  const [selected, setSelected] = useState<string[]>([]);

  const columns = useMemo<TableColumn<Person>[]>(
    () => [
      { key: "name", header: "Name", sortable: true, width: "1.4fr" },
      { key: "email", header: "Email", width: "1.8fr" },
      {
        key: "role",
        header: "Role",
        sortable: true,
        width: "120px",
        cell: (row) => (
          <Badge
            variant={
              row.role === "Admin" || row.role === "Owner"
                ? "secondary"
                : "tertiary"
            }
          >
            {row.role}
          </Badge>
        ),
      },
      {
        key: "status",
        header: "Status",
        width: "130px",
        cell: (row) => <Badge variant={row.status}>{row.status}</Badge>,
      },
      {
        key: "mrr",
        header: "MRR",
        sortable: true,
        align: "right",
        width: "110px",
        cell: (row) => (
          <Mark variant="tertiary">
            ${row.mrr.toLocaleString()}&nbsp;
            <span className={row.mrr < 100 ? "color-red" : "color-green"}>
              {row.mrr < 100 ? "↓" : "↑"}
            </span>
          </Mark>
        ),
      },
    ],
    [],
  );

  return (
    <section className="flex flex-column h-100 w-100 g-medium-30 p-medium-60">
      <hgroup className="flex align-center justify-between">
        <p className="fs-medium-10 opacity-default-60">
          {data.length.toLocaleString()}&nbsp;rows
        </p>
        {selected.length > 0 ? (
          <p className="fs-medium-10 opacity-default-60">
            {selected.length.toLocaleString()} selected
          </p>
        ) : null}
      </hgroup>
      <DataTable
        data={data}
        columns={columns}
        selectable
        resizable
        reorderable
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        defaultSort={{ key: "mrr", direction: "desc" }}
      />
    </section>
  );
};

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof DataTable>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => (
    <DataTable
      data={[]}
      height={240}
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "status", header: "Status" },
        { key: "mrr", header: "MRR" },
      ]}
    />
  ),
};

export const Data: Story = {
  args: {},
  render: () => <DataPreview />,
};

export const Loading: Story = {
  args: {},
  render: () => (
    <DataTable
      data={[]}
      loading
      height={248}
      resizable
      reorderable
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status" },
        { key: "mrr", header: "MRR" },
      ]}
    />
  ),
};

export const Empty: Story = {
  args: {},
  render: () => (
    <DataTable
      data={[]}
      emptyState="Nothing here yet"
      height={248}
      resizable
      reorderable
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status" },
        { key: "mrr", header: "MRR" },
      ]}
    />
  ),
};
