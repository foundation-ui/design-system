import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const TreeMeta: ComponentRegistryMetadata = {
  name: "Tree",
  title: "Tree",
  description:
    "Recursive navigation tree built from nested lists and Accordion branches. Each link can carry an icon, a disabled state, and its own nested links; a branch opens by default and indents its children. Tree has no compound exports — pass the whole shape through `links`.",
  category: "navigation",
  variants: [],
  props: [
    {
      name: "label",
      type: "ReactNode",
      required: true,
    },
    {
      name: "links",
      type: "ITreeLink[]",
      required: true,
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "icon",
      type: "ReactNode",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "className",
      type: "string",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Nested navigation tree",
      code: `import { Tree } from "@usefui/components";

const links = [
  { label: "Overview", onClick: () => console.log("overview") },
  {
    label: "Components",
    defaultOpen: true,
    links: [
      { label: "Button", onClick: () => console.log("button") },
      { label: "Drawer", onClick: () => console.log("drawer") },
      { label: "Deprecated", disabled: true },
    ],
  },
  { label: "Settings" },
];

export function Component() {
  return (
    <nav aria-label="Documentation">
      <Tree label="Documentation" links={links} sizing="medium" />
    </nav>
  );
}`,
    },
    {
      kind: "executable",
      title: "Collapsed branches with icons",
      code: `import { Tree } from "@usefui/components";

export function Component() {
  return (
    <Tree
      label="Workspace"
      defaultOpen={false}
      sizing="small"
      icon={<span aria-hidden="true">▸</span>}
      links={[
        { label: "Projects", links: [{ label: "usefui" }] },
        { label: "Members" },
      ]}
    />
  );
}`,
    },
    {
      kind: "note",
      title: "ITreeLink shape",
      description:
        "{ label: ReactNode; onClick?: MouseEventHandler<HTMLButtonElement>; icon?: ReactNode; disabled?: boolean; links?: ITreeLink[]; defaultOpen?: boolean }. Presence of `links` turns an entry into a branch; otherwise it renders as a leaf button.",
    },
    {
      kind: "note",
      title: "Branches use Accordion internally",
      description:
        "Every branch wraps its label in an Accordion trigger and its children in Accordion.Content. `defaultOpen` controls the initial state; the root label is also rendered as the first trigger.",
    },
    {
      kind: "note",
      title: "No compound parts are exported",
      description:
        "Tree is a single component. The internal branch, list, item, line, and link elements are not part of the public API; drive the structure entirely through `links`.",
    },
  ],
  a11y: {
    role: "navigation list (`ul`/`li`) with Accordion triggers — not the ARIA tree pattern",
    keyboardNav:
      "Branch triggers and leaf links are Buttons and support Enter and Space. There is no arrow-key tree navigation or roving tabindex.",
    ariaAttributes: [
      "aria-expanded on branch triggers (via Accordion.Trigger)",
      "aria-controls from branch triggers to their content (via Accordion)",
      "aria-hidden on the decorative connector line",
      "disabled on leaf buttons",
    ],
  },
  relatedComponents: ["Accordion", "SharedLayout", "Button", "Breadcrumb"],
  aiHints: {
    useCases: [
      "documentation or settings navigation with nested sections",
      "recursive sidebars driven by a data array",
      "collapsible file or category lists",
    ],
    avoid: [
      "expecting an ARIA `tree`/`treeitem` widget with arrow-key navigation",
      "very large trees without virtualization",
      "interactive content inside `label` other than plain text and icons",
      "branch entries that also need their own navigation action — the branch label toggles open state",
    ],
    composesWith: ["Accordion", "Button", "SharedLayout", "Breadcrumb"],
  },
};
