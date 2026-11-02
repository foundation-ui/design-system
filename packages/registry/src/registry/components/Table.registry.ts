import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const TableMeta: ComponentRegistryMetadata = {
  name: "Table",
  description:
    "Semantic scrollable table with styled head, body, row, cell, and footer parts.",
  category: "data",
  variants: [],
  title: "Table",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Head: {
      description: "The thead component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    HeadCell: {
      description: "The th component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Body: {
      description: "The tbody component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Row: {
      description: "The tr component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Cell: {
      description: "The td component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Footer: {
      description: "The tfoot component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
  },
  usage: [
    `import { Table, Badge } from "@usefui/components";

export function TableComponent() {
    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
          <Table className="w-100">
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Prop</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Default</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {[1, 2, 3].map((key) => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Badge variant="border">children</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="border">ReactNode</Badge>
                  </Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell className="opacity-default-10">v.0.0.0</Table.Cell>
                <Table.Cell />
                <Table.Cell />
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
    );

}`,
  ],
  anatomy: `import { Table } from "@usefui/components";

export function TableComponent() {
    return (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell/>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
          <Table.Footer />
        </Table>
    );
}`,

  examples: [
    { kind: "note", title: "Table > Table.Head > Table.Row > Table.HeadCell" },
    { kind: "note", title: "Table.Body > Table.Row > Table.Cell" },
    { kind: "note", title: "Table.Footer for summaries" },
    { kind: "note", title: "wrapped in ScrollArea for overflow" },
  ],
  a11y: {
    role: "table, thead, tbody, th, td, tfoot",
    keyboardNav: "Native table navigation; ScrollArea wrapper presentation",
    ariaAttributes: [],
  },
  relatedComponents: ["ScrollArea"],
  aiHints: {
    useCases: [
      "scrollable data grids and admin lists",
      "order or status tables",
    ],
    avoid: [
      "layout-only grids — use CSS grid",
      "huge unvirtualized datasets",
      "sortable tables without extra controls",
    ],
    composesWith: [
      "Table.Head",
      "Table.Body",
      "Table.Row",
      "Table.HeadCell",
      "Table.Cell",
      "Table.Footer",
      "ScrollArea",
    ],
  },
};
