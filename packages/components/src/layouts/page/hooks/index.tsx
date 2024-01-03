import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const PageContext = createContext<IComponentAPI>(defaultComponentAPI);
export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = usePageProvider();

  return (
    <PageContext.Provider value={context}>{children}</PageContext.Provider>
  );
};

function usePageProvider(): IComponentAPI {
  const pageId = React.useId();

  return {
    id: pageId,
    states: {},
    methods: {},
  };
}
