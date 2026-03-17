"use client";

import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

// ─── Tree Context ─────────────────────────────────────────────────────────────

const defaultTreeAPI: IComponentAPI = {
  id: "",
  states: {},
  methods: {},
};

const TreeContext = createContext<IComponentAPI>(defaultTreeAPI);
export const useTree = () => useContext(TreeContext);

export interface ITreeProviderProperties extends IReactChildren {
  defaultExpandedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export const TreeProvider = ({
  children,
  defaultExpandedIds = [],
  onSelectionChange,
}: ITreeProviderProperties): React.JSX.Element => {
  const context = useTreeProviderContext({
    defaultExpandedIds,
    onSelectionChange,
  });

  return (
    <TreeContext.Provider value={context}>{children}</TreeContext.Provider>
  );
};

function useTreeProviderContext({
  defaultExpandedIds,
  onSelectionChange,
}: Omit<ITreeProviderProperties, "children">): IComponentAPI {
  const treeId = React.useId();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedIds),
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  return {
    id: treeId,
    states: {
      expandedIds,
      selectedIds,
    },
    methods: {
      isExpanded: (id: string): boolean => expandedIds.has(id),
      isSelected: (id: string): boolean => selectedIds.has(id),
      toggleExpanded: (id: string): void => {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      },
      toggleSelected: (id: string): void => {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          onSelectionChange?.(Array.from(next));
          return next;
        });
      },
      getTreeId: ({ nodeId, type }: Record<string, string>): string =>
        `${treeId}-${type}-${nodeId}`,
    },
  };
}
