import React from "react";
import {
  ContainerGridWrapper,
  ContainerRowWrapper,
  ContainerTitleWrapper,
} from "./styles";
import {
  IComponentSpacing,
  IComponentStyling,
  ComponentSizeEnum,
} from "../../../../../types";

export enum ContainerAlignModeEnum {
  Start = "start",
  End = "end",
  SpaceBetween = "space-between",
}
export interface IContainerAlignMode {
  alignMode?: ContainerAlignModeEnum;
}
export interface IContainerProperties
  extends IComponentStyling,
    IComponentSpacing,
    IContainerAlignMode,
    React.ComponentPropsWithoutRef<any> {}

const ContainerRow = (props: IContainerProperties) => {
  const { raw, spacing, alignMode, children } = props;
  return (
    <ContainerRowWrapper
      tabIndex={-1}
      aria-orientation="horizontal"
      data-raw={Boolean(raw)}
      data-align={alignMode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.None}
      {...props}
    >
      {children}
    </ContainerRowWrapper>
  );
};
const ContainerCol = (props: IContainerProperties) => {
  const { raw, spacing, alignMode, children } = props;
  return (
    <ContainerGridWrapper
      tabIndex={-1}
      aria-orientation="vertical"
      data-raw={Boolean(raw)}
      data-align={alignMode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.None}
      {...props}
    >
      {children}
    </ContainerGridWrapper>
  );
};
const ContainerTitle = (props: IContainerProperties) => {
  const { raw, spacing, alignMode, children } = props;
  return (
    <ContainerTitleWrapper
      data-raw={Boolean(raw)}
      data-align={alignMode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.Small}
      {...props}
    >
      {children}
    </ContainerTitleWrapper>
  );
};

const Container = (props: IContainerProperties) => {
  const { raw, spacing, alignMode, children } = props;
  return (
    <div
      data-raw={Boolean(raw)}
      data-align={alignMode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.Small}
    >
      {children}
    </div>
  );
};

Container.Row = ContainerRow;
Container.Col = ContainerCol;
Container.Title = ContainerTitle;

export { Container, ContainerRow, ContainerCol, ContainerTitle };
