import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const PageMeta: ComponentRegistryMetadata = {
  name: "Page",
  description:
    "Structured layout shell with navigation, menu, and scrollable content areas.",
  category: "layout",
  variants: [],
  title: "Page",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Content: {
      description:
        "Page.Content used alongside the Page component and wraps its children in a theme-ready area.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Wrapper: {
      description:
        "Page.Wrapper used alongside the Page.Content component and wraps its children in a scrollable area.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "$menus",
          type: "number",
        },
        {
          name: "$navigations",
          type: "number",
        },
      ],
    },
    Navigation: {
      description:
        "Page.Navigation is used to carry navigation menus and is used alongside the Page component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Menu: {
      description:
        "Page.Menu is used to carry menus and is used alongside the Page component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
  },
  usage: [
    `import { Page } from "@usefui/components";

export function PageComponent() {
    return (
        <div className="w-100 h-100 flex" style={{ position: "relative" }}>
            <Page.Content className="h-100">
                <Page.Navigation>
                    <p className="fs-medium-10 opacity-default-30">Navigation</p>
                </Page.Navigation>
                <Page.Menu>
                    <p className="fs-medium-10 opacity-default-30">Menu</p>
                </Page.Menu>
                <ScrollArea className="h-100 p-large-10" style={{ maxHeight: 292 }}>
                    <h6>@usefui</h6>
                    <Divider className="m-y-medium-60" />
                    <p className="fs-medium-20 opacity-default-60">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
                        vitae incidunt libero veniam rerum molestias atque hic enim!
                        Incidunt soluta repellat iusto, adipisci pariatur veniam quo vitae
                        saepe? Sed, accusamus. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Consectetur vitae incidunt libero veniam rerum
                        molestias atque hic enim! Incidunt soluta repellat iusto, adipisci
                        pariatur veniam quo vitae saepe? Sed, accusamus. saepe?
                    </p>
                </ScrollArea>
            </Page.Content>
        </div>
    );

}`,
  ],
  anatomy: `import { Page } from "@usefui/components";

export function PageComponent() {
    return (
        <Page>
            <Page.Content>
                <Page.Wrapper>
                    <Page.Navigation>
                        <p>Navigation</p>
                    </Page.Navigation>
                    <Page.Menu>
                        <p>Menu</p>
                    </Page.Menu>
                </Page.Wrapper>
            </Page.Content>
        </Page>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "Page.Navigation, Page.Menu, Page.Wrapper, Page.Content",
    },
    { kind: "note", title: "Composed story with side nav" },
    { kind: "note", title: "Storybook decorator for many components" },
    { kind: "note", title: "compose tool rails with standalone Toolbar" },
  ],
  a11y: {
    role: "nav, menu, semantic regions",
    keyboardNav: "Native scroll behavior in Page.Wrapper",
    ariaAttributes: [],
  },
  relatedComponents: ["Toolbar", "ScrollArea"],
  aiHints: {
    useCases: [
      "app shell with nav and main content",
      "story and layout playground centering",
    ],
    avoid: [
      "simple centered cards without shell needs",
      "nested full Page shells",
      "replacing router layouts without nav semantics",
    ],
    composesWith: [
      "Page.Navigation",
      "Page.Menu",
      "Page.Content",
      "Page.Wrapper",
      "Toolbar",
      "ScrollArea",
    ],
  },
};
