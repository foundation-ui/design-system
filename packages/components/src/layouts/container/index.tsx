import React from "react";
import ReactDOM from "react-dom";

import { useContainer, ContainerProvider } from "./hooks";
import { IReactChildren } from "../../../../../types";

const ContainerRoot = ({ children }: IReactChildren) => {
  return <ContainerProvider>{children}</ContainerProvider>;
};
const ContainerRow = (props: any) => {
  return;
};
const ContainerCol = (props: any) => {
  return;
};
const ContainerBox = (props: any) => {
  return;
};
const ContainerSection = (props: any) => {
  return;
};
const ContainerCanvas = (props: any) => {
  return;
};
const ContainerDivider = (props: any) => {
  return;
};
const ContainerTitle = (props: any) => {
  return;
};
const Container = (props: any) => {
  const containerContext = useContainer();
  const { id, states, methods } = containerContext;

  return;
};

Container.Root = ContainerRoot;
Container.Row = ContainerRow;
Container.Col = ContainerCol;
Container.Box = ContainerBox;
Container.Section = ContainerSection;
Container.Canvas = ContainerCanvas;
Container.Divider = ContainerDivider;
Container.Title = ContainerTitle;

export {
  Container,
  ContainerRoot,
  ContainerRow,
  ContainerCol,
  ContainerBox,
  ContainerSection,
  ContainerCanvas,
  ContainerDivider,
  ContainerTitle,
};
