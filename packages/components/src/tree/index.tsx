"use client";

import React from "react";

import { TreeProvider, useTree } from "./hooks/tree-provider";
import { TreeNodeProvider, useTreeNode } from "./hooks/tree-node-provider";

import { Button, IButtonProperties } from "../button";
import { TreeView, TreeItem, TreeNodeContent } from "./styles";

import {
  IReactChildren,
  IComponentSpacing,
  ComponentVariantEnum,
} from "../../../../types";

export interface ITreeComposition {
  Root: typeof TreeRoot;
  Node: typeof TreeNode;
  Trigger: typeof TreeTrigger;
  Content: typeof TreeContent;
}

export interface ITreeProperties
  extends IComponentSpacing, React.ComponentProps<"ul"> {}

export interface ITreeRootProperties extends IReactChildren {
  defaultExpandedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export interface ITreeNodeProperties
  extends IComponentSpacing, React.ComponentProps<"li"> {
  nodeId: string;
  level?: number;
  isLast?: boolean;
}

export interface ITreeTriggerProperties extends Omit<
  IButtonProperties,
  "value"
> {
  nodeId: string;
}

export interface ITreeContentProperties
  extends IComponentSpacing, React.ComponentProps<"ul"> {
  nodeId: string;
  defaultOpen?: boolean;
}

/**
 * Tree is used to display a hierarchical list of items.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for each tree node.
 * - Ensure that the tree can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when nodes are expanded/collapsed.
 *
 * @param {ITreeProperties} props - The props for the Tree component.
 * @param {ReactNode} props.children - The content to be rendered inside the tree.
 * @returns {ReactElement} The Tree component.
 */
const Tree = (props: ITreeProperties) => {
  const { children, ...restProps } = props;
  const { id } = useTree();

  return (
    <TreeView id={id} role="tree" {...restProps}>
      {children}
    </TreeView>
  );
};
Tree.displayName = "Tree";

const TreeRoot = ({
  children,
  defaultExpandedIds,
  onSelectionChange,
}: ITreeRootProperties) => {
  return (
    <TreeProvider
      defaultExpandedIds={defaultExpandedIds}
      onSelectionChange={onSelectionChange}
    >
      {children}
    </TreeProvider>
  );
};
TreeRoot.displayName = "Tree.Root";

/**
 * Tree.Node is used to wrap each node of the tree.
 *
 * **Best practices:**
 *
 * - Provide a unique nodeId for each node.
 * - Use the level prop to indicate the depth of the node in the hierarchy.
 *
 * @param {ITreeNodeProperties} props - The props for the Tree.Node component.
 * @param {string} props.nodeId - The unique identifier for the node.
 * @param {number} props.level - The depth level of the node. Defaults to 0.
 * @param {boolean} props.isLast - Whether the node is the last in its siblings. Defaults to false.
 * @param {ReactNode} props.children - The content to be rendered inside the node.
 * @returns {ReactElement} The Tree.Node component.
 */
const TreeNode = (props: ITreeNodeProperties) => {
  const { nodeId, level = 0, isLast = false, children, ...restProps } = props;

  return (
    <TreeNodeProvider nodeId={nodeId} level={level} isLast={isLast}>
      <TreeItem role="treeitem" aria-level={level + 1} {...restProps}>
        {children}
      </TreeItem>
    </TreeNodeProvider>
  );
};
TreeNode.displayName = "Tree.Node";

/**
 * Tree.Trigger is used to trigger the expansion and collapse of the associated Tree.Content component.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for the trigger.
 * - Ensure that the trigger can be operated using only the keyboard.
 * - Ensure that the focus is properly managed when the trigger is activated.
 *
 * @param {ITreeTriggerProperties} props - The props for the Tree.Trigger component.
 * @param {string} props.nodeId - The value used to bind the Tree.Trigger and Tree.Content components.
 * @param {ReactNode} props.children - The content to be rendered inside the trigger.
 * @returns {ReactElement} The Tree.Trigger component.
 */
const TreeTrigger = (props: ITreeTriggerProperties) => {
  const { nodeId, disabled, onClick, children, ...restProps } = props;

  const { methods } = useTree();
  const { getTreeId, toggleExpanded, toggleSelected } = methods;

  const isExpanded = methods.isExpanded && methods.isExpanded(nodeId);
  const isSelected = methods.isSelected && methods.isSelected(nodeId);

  const IdHandler = {
    trigger: getTreeId && getTreeId({ nodeId, type: "trigger" }),
    content: getTreeId && getTreeId({ nodeId, type: "content" }),
  };

  const { states: nodeStates } = useTreeNode();
  const level = nodeStates.level ?? 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick && onClick(event);
      toggleExpanded && toggleExpanded(nodeId);
      toggleSelected && toggleSelected(nodeId);
    }
  };

  return (
    <Button
      id={String(IdHandler.trigger)}
      disabled={disabled ?? false}
      onClick={handleClick}
      data-state={isExpanded ? "expanded" : "collapsed"}
      data-selected={isSelected || undefined}
      variant={props.variant ?? ComponentVariantEnum.Ghost}
      style={{ paddingLeft: `calc(${level} * 1rem + 0.5rem)` }}
      rawicon
      {...restProps}
    >
      {children}
    </Button>
  );
};
TreeTrigger.displayName = "Tree.Trigger";

/**
 * Tree.Content is used to contain the children of the associated Tree.Trigger component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is hidden when the associated node is collapsed.
 * - Ensure that the content is properly focused when the associated node is expanded.
 *
 * @param {ITreeContentProperties} props - The props for the Tree.Content component.
 * @param {string} props.nodeId - The value used to bind the Tree.Content and Tree.Trigger components.
 * @param {boolean} props.defaultOpen - The initial open state of the content. Defaults to false.
 * @param {ReactNode} props.children - The content to be rendered inside the node content.
 * @returns {ReactElement} The Tree.Content component.
 */
const TreeContent = (props: ITreeContentProperties) => {
  const { nodeId, defaultOpen = false, children, ...restProps } = props;

  const { methods } = useTree();
  const { getTreeId, toggleExpanded } = methods;

  const isExpanded = methods.isExpanded && methods.isExpanded(nodeId);

  const IdHandler = {
    trigger: getTreeId && getTreeId({ nodeId, type: "trigger" }),
    content: getTreeId && getTreeId({ nodeId, type: "content" }),
  };

  React.useEffect(() => {
    if (defaultOpen && !isExpanded && toggleExpanded) toggleExpanded(nodeId);
  }, []);

  if (isExpanded)
    return (
      <TreeNodeContent
        role="group"
        id={String(IdHandler.content)}
        aria-labelledby={String(IdHandler.trigger)}
        data-nodeId={nodeId}
        {...restProps}
      >
        {children}
      </TreeNodeContent>
    );

  return <React.Fragment />;
};
TreeContent.displayName = "Tree.Content";

Tree.Root = TreeRoot;
Tree.Node = TreeNode;
Tree.Trigger = TreeTrigger;
Tree.Content = TreeContent;

export { Tree, TreeRoot, TreeNode, TreeTrigger, TreeContent };
