"use client";

import React, { createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const defaultTreeNodeAPI: IComponentAPI = {
  id: "",
  states: {},
  methods: {},
};

const TreeNodeContext = createContext<IComponentAPI>(defaultTreeNodeAPI);
export const useTreeNode = () => useContext(TreeNodeContext);

export interface ITreeNodeProviderProperties extends IReactChildren {
  nodeId: string;
  level: number;
  isLast: boolean;
}

export const TreeNodeProvider = ({
  children,
  nodeId,
  level,
  isLast,
}: ITreeNodeProviderProperties): React.JSX.Element => {
  const context = useTreeNodeProviderContext({ nodeId, level, isLast });

  return (
    <TreeNodeContext.Provider value={context}>
      {children}
    </TreeNodeContext.Provider>
  );
};

function useTreeNodeProviderContext({
  nodeId,
  level,
  isLast,
}: Omit<ITreeNodeProviderProperties, "children">): IComponentAPI {
  return {
    id: nodeId,
    states: {
      nodeId,
      level,
      isLast,
    },
    methods: {},
  };
}
