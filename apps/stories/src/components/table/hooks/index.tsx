import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const TableContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useTable = () => useContext(TableContext);

export const TableProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useTableProvider();

  return (
    <TableContext.Provider value={context}>{children}</TableContext.Provider>
  );
};

function useTableProvider(): IComponentAPI {
  const TableId = React.useId();

  return {
    id: TableId,
    states: {},
    methods: {},
  };
}
