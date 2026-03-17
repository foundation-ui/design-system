import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Tree } from "../../src/tree";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);

describe("Tree", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(
      <Tree.Root>
        <Tree>
          <Tree.Node nodeId="node-1">
            <Tree.Trigger nodeId="node-1">Node 1</Tree.Trigger>
            <Tree.Content nodeId="node-1" defaultOpen>
              <Tree.Node level={1} nodeId="node-1-child">
                <Tree.Trigger nodeId="node-1-child">Node 1 Child</Tree.Trigger>
              </Tree.Node>
            </Tree.Content>
          </Tree.Node>
        </Tree>
      </Tree.Root>,
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });

  //   test("Renders with accessibility definition", async () => {
  //     render(
  //       <Tree.Root>
  //         <Tree>
  //           <Tree.Node nodeId="node-1">
  //             <Tree.Trigger nodeId="node-1">Node 1</Tree.Trigger>
  //             <Tree.Content nodeId="node-1">
  //               <Tree.Node level={1} nodeId="node-1-child">
  //                 <Tree.Trigger nodeId="node-1-child">Node 1 Child</Tree.Trigger>
  //               </Tree.Node>
  //             </Tree.Content>
  //           </Tree.Node>
  //         </Tree>
  //       </Tree.Root>,
  //     );

  //     const treeView = screen.getByRole("tree");
  //     expect(treeView).toBeDefined();

  //     const treeItems = screen.getAllByRole("treeitem");
  //     expect(treeItems.length).toBe(1);

  //     expect(() => screen.getByRole("group")).toThrow();

  //     const trigger = screen.getByLabelText("node-1-action");
  //     expect(trigger).toBeDefined();
  //     expect(trigger.getAttribute("aria-expanded")).toBe("false");
  //     expect(trigger.getAttribute("aria-selected")).toBe("false");
  //     expect(trigger.getAttribute("data-state")).toBe("collapsed");

  //     fireEvent.click(trigger);
  //     await waitFor(() => {
  //       const group = screen.getByRole("group");
  //       expect(group).toBeDefined();
  //       expect(group.getAttribute("aria-labelledby")).toBeDefined();
  //       expect(group.getAttribute("id")).toBeDefined();
  //       expect(group.getAttribute("data-nodeid")).toBe("node-1");

  //       expect(trigger.getAttribute("aria-expanded")).toBe("true");
  //       expect(trigger.getAttribute("aria-selected")).toBe("true");
  //       expect(trigger.getAttribute("data-state")).toBe("expanded");

  //       const childItems = screen.getAllByRole("treeitem");
  //       expect(childItems.length).toBe(2);
  //     });
  //   });

  test("Renders with correct aria-level on nested nodes", async () => {
    render(
      <Tree.Root>
        <Tree>
          <Tree.Node nodeId="root">
            <Tree.Trigger nodeId="root">Root</Tree.Trigger>
            <Tree.Content nodeId="root" defaultOpen>
              <Tree.Node level={1} nodeId="child">
                <Tree.Trigger nodeId="child">Child</Tree.Trigger>
                <Tree.Content nodeId="child" defaultOpen>
                  <Tree.Node level={2} nodeId="grandchild">
                    <Tree.Trigger nodeId="grandchild">Grandchild</Tree.Trigger>
                  </Tree.Node>
                </Tree.Content>
              </Tree.Node>
            </Tree.Content>
          </Tree.Node>
        </Tree>
      </Tree.Root>,
    );

    const treeItems = screen.getAllByRole("treeitem");
    expect((treeItems[0] as HTMLElement).getAttribute("aria-level")).toBe("1");
    expect((treeItems[1] as HTMLElement).getAttribute("aria-level")).toBe("2");
    expect((treeItems[2] as HTMLElement).getAttribute("aria-level")).toBe("3");
  });

  //   test("Renders with defaultOpen and expands content on mount", async () => {
  //     render(
  //       <Tree.Root>
  //         <Tree>
  //           <Tree.Node nodeId="node-1">
  //             <Tree.Trigger nodeId="node-1">Node 1</Tree.Trigger>
  //             <Tree.Content nodeId="node-1" defaultOpen>
  //               <Tree.Node level={1} nodeId="node-1-child">
  //                 <Tree.Trigger nodeId="node-1-child">Node 1 Child</Tree.Trigger>
  //               </Tree.Node>
  //             </Tree.Content>
  //           </Tree.Node>
  //         </Tree>
  //       </Tree.Root>,
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByRole("group")).toBeDefined();
  //       expect(screen.getByText("Node 1 Child")).toBeDefined();

  //       const trigger = screen.getByLabelText("node-1-action");
  //       expect(trigger.getAttribute("aria-expanded")).toBe("true");
  //       expect(trigger.getAttribute("data-state")).toBe("expanded");
  //     });
  //   });

  test("Fires the defined callback and toggles content when trigger is clicked", async () => {
    const onClickCallback = vi.fn();

    render(
      <Tree.Root>
        <Tree>
          <Tree.Node nodeId="node-1">
            <Tree.Trigger
              nodeId="node-1"
              name="trigger-1"
              onClick={onClickCallback}
            >
              Node 1
            </Tree.Trigger>
            <Tree.Content nodeId="node-1" defaultOpen>
              <Tree.Node level={1} nodeId="node-1-child">
                <Tree.Trigger nodeId="node-1-child">Node 1 Child</Tree.Trigger>
              </Tree.Node>
            </Tree.Content>
          </Tree.Node>
          <Tree.Node nodeId="node-2">
            <Tree.Trigger nodeId="node-2" name="trigger-2">
              Node 2
            </Tree.Trigger>
            <Tree.Content nodeId="node-2">
              <Tree.Node level={1} nodeId="node-2-child">
                <Tree.Trigger nodeId="node-2-child">Node 2 Child</Tree.Trigger>
              </Tree.Node>
            </Tree.Content>
          </Tree.Node>
        </Tree>
      </Tree.Root>,
    );

    expect(screen.getByText("Node 1 Child")).toBeDefined();
    expect(() => screen.getByText("Node 2 Child")).toThrow();

    fireEvent.click(screen.getByLabelText("trigger-2-action"));
    await waitFor(() => {
      expect(screen.getByText("Node 2 Child")).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(() => screen.getByText("Node 1 Child")).toThrow();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(screen.getByText("Node 1 Child")).toBeDefined();
      expect(onClickCallback).toHaveBeenCalledTimes(2);
    });

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(() => screen.getByText("Node 1 Child")).toThrow();
    });
  });

  test("Fires onSelectionChange callback with selected node ids", async () => {
    const onSelectionChange = vi.fn();

    render(
      <Tree.Root onSelectionChange={onSelectionChange}>
        <Tree>
          <Tree.Node nodeId="node-1">
            <Tree.Trigger nodeId="node-1" name="trigger-1">
              Node 1
            </Tree.Trigger>
          </Tree.Node>
          <Tree.Node nodeId="node-2">
            <Tree.Trigger nodeId="node-2" name="trigger-2">
              Node 2
            </Tree.Trigger>
          </Tree.Node>
        </Tree>
      </Tree.Root>,
    );

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(onSelectionChange).toHaveBeenCalledTimes(1);
      expect(onSelectionChange).toHaveBeenCalledWith(["node-1"]);
    });

    fireEvent.click(screen.getByLabelText("trigger-2-action"));
    await waitFor(() => {
      expect(onSelectionChange).toHaveBeenCalledTimes(2);
      expect(onSelectionChange).toHaveBeenCalledWith(["node-1", "node-2"]);
    });

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(onSelectionChange).toHaveBeenCalledTimes(3);
      expect(onSelectionChange).toHaveBeenCalledWith(["node-2"]);
    });
  });

  test("Renders with defaultExpandedIds and expands matching nodes on mount", async () => {
    render(
      <Tree.Root defaultExpandedIds={["node-1", "node-2"]}>
        <Tree>
          <Tree.Node nodeId="node-1">
            <Tree.Trigger nodeId="node-1">Node 1</Tree.Trigger>
            <Tree.Content nodeId="node-1">
              <Tree.Node level={1} nodeId="node-1-child">
                <Tree.Trigger nodeId="node-1-child">Node 1 Child</Tree.Trigger>
              </Tree.Node>
            </Tree.Content>
          </Tree.Node>
          <Tree.Node nodeId="node-2">
            <Tree.Trigger nodeId="node-2">Node 2</Tree.Trigger>
            <Tree.Content nodeId="node-2">
              <Tree.Node level={1} nodeId="node-2-child">
                <Tree.Trigger nodeId="node-2-child">Node 2 Child</Tree.Trigger>
              </Tree.Node>
            </Tree.Content>
          </Tree.Node>
        </Tree>
      </Tree.Root>,
    );

    await waitFor(() => {
      expect(screen.getByText("Node 1 Child")).toBeDefined();
      expect(screen.getByText("Node 2 Child")).toBeDefined();

      const groups = screen.getAllByRole("group");
      expect(groups.length).toBe(2);
    });
  });
});
