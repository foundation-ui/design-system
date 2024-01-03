import React from "react";
import ReactDOM from "react-dom";

import { useContainer, ContainerProvider } from "./hooks";
import { IReactChildren } from "../../../../../types";

const ContainerRoot = ({ children }: IReactChildren) => {
  return <ContainerProvider>{children}</ContainerProvider>;
};

const Container = (props: any) => {
  const containerContext = useContainer();
  const { id, states, methods } = containerContext;

  return;
};

Container.Root = ContainerRoot;

export { Container, ContainerRoot };
