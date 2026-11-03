import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const DropdownMeta: ComponentRegistryMetadata = {
  name: "DropdownMenu",
  title: "Dropdown",
  description:
    "Expandable action list triggered by a Button. DropdownMenu.Root provides the open state, the DropdownMenu wrapper renders the click-outside boundary and locks page scroll while open, Trigger toggles the menu and records its rect, Content is a fixed-position menu placed by useFloatingPlacement, and Item performs an action and optionally keeps the menu open. Placement centers the menu over the trigger when it fits, otherwise aligns its left or right edge, and opens below the trigger unless it would overflow, in which case it opens above.",
  category: "navigation",
  variants: ["body", "contrast"],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Root: {
      description:
        "Provides the dropdown context. It renders no DOM element and only accepts children.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Trigger: {
      description:
        "Button that toggles the menu and records its own bounding rect for placement. Renders a Button, so Button styling and behavior props are forwarded.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
          defaultValue: "ghost",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "smooth",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "rawicon",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Content: {
      description:
        "Semantic `menu` element that holds the items. Mounts only while open, stays hidden until its placement is measured, and is positioned with `position: fixed` from useFloatingPlacement.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"body" | "contrast"',
          defaultValue: "body",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "gap",
          type: "number",
          defaultValue: "4",
        },
        {
          name: "margin",
          type: "number",
          defaultValue: "4",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Item: {
      description:
        "Action row inside DropdownMenu.Content. Renders a `menuitem` with `tabIndex={0}`; clicking or pressing Enter or Space runs `onClick` and closes the menu unless `radio` is set.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "radio",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => void",
        },
        {
          name: "onKeyDown",
          type: "(event: KeyboardEvent<HTMLLIElement>) => void",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Basic action menu",
      code: `import { DropdownMenu } from "@usefui/components";

export function Component() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu>
        <DropdownMenu.Trigger variant="secondary" sizing="medium">
          Actions
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Item disabled>Archive</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Radio item that keeps the menu open",
      code: `import { DropdownMenu } from "@usefui/components";

export function Component() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu>
        <DropdownMenu.Trigger variant="ghost">Sort by</DropdownMenu.Trigger>

        <DropdownMenu.Content variant="contrast" sizing="small">
          <DropdownMenu.Item radio onClick={() => console.log("name")}>
            Name
          </DropdownMenu.Item>
          <DropdownMenu.Item radio onClick={() => console.log("date")}>
            Date
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Placement distance and viewport inset",
      code: `import { DropdownMenu } from "@usefui/components";

export function Component() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu>
        <DropdownMenu.Trigger>Preferences</DropdownMenu.Trigger>

        <DropdownMenu.Content gap={12} margin={24}>
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Notifications</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "Placement adapts to the viewport",
      description:
        "Content is measured with useFloatingPlacement. Horizontally it centers on the trigger when it fits, falls back to left-aligned, then to right-aligned. Vertically it opens below the trigger when it fits and above otherwise. `data-side` and `data-align` receive the chosen alignment (`center`, `left`, or `right`).",
    },
    {
      kind: "note",
      title: "`gap` and `margin` are pixel values",
      description:
        "`gap` is the distance between the trigger and the menu (default 4). `margin` is the minimum distance kept from the viewport edges (default 4). Both feed the shared placement hook.",
    },
    {
      kind: "note",
      title: "Placement is not re-measured on resize",
      description:
        "The hook recomputes when the menu opens or when `gap`, `margin`, or the Content `children`, `sizing`, or `variant` change. There is no window resize or scroll listener, so resizing the viewport while the menu is open keeps the previous placement until it reopens.",
    },
    {
      kind: "note",
      title: "The menu locks page scroll while open",
      description:
        "The DropdownMenu wrapper calls useDisabledScroll(Boolean(open)), so the document cannot scroll while the menu is expanded. Keep menus short or render them inside a ScrollArea.",
    },
    {
      kind: "note",
      title: "Closing behavior",
      description:
        "Clicking outside closes the menu, and clicking an Item closes it unless `radio` is set. There is no Escape handler in the implementation, so add one if keyboard dismissal is required.",
    },
  ],
  a11y: {
    role: "menu on Content, menuitem on Item",
    keyboardNav:
      "Trigger is a Button and supports Enter and Space. Items are focusable and respond to Enter and Space. There is no arrow-key roving focus and no Escape handler.",
    ariaAttributes: [
      'aria-haspopup="menu" on Trigger',
      "aria-labelledby on Content pointing at the Trigger id",
      "aria-disabled on disabled Items",
      "data-state on Trigger and Content",
    ],
  },
  relatedComponents: ["Button", "Badge", "Divider", "ContextMenu", "Select"],
  aiHints: {
    useCases: [
      "row or card action menus",
      "icon button menus with shortcuts",
      "viewport-safe menus near screen edges",
      "contrast panels on dark backgrounds",
    ],
    avoid: [
      "primary app navigation",
      "single-choice forms — use Select",
      "long lists without grouping or a scroll container",
      "relying on Escape to close without adding a handler",
    ],
    composesWith: [
      "DropdownMenu.Root",
      "DropdownMenu.Trigger",
      "DropdownMenu.Content",
      "DropdownMenu.Item",
      "Button",
      "Badge",
      "Divider",
      "SharedLayout",
    ],
  },
};
