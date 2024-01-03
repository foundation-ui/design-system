import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const ContainerContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useContainer = () => useContext(ContainerContext);

export const ContainerProvider = ({
  children,
}: IReactChildren): JSX.Element => {
  const context = useContainerProvider();

  return (
    <ContainerContext.Provider value={context}>
      {children}
    </ContainerContext.Provider>
  );
};

function useContainerProvider(): IComponentAPI {
  const containerId = React.useId();

  return {
    id: containerId,
    states: {},
    methods: {},
  };
}
