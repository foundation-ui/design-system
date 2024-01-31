import React from "react";
import {
  ContainerColWrapper,
  ContainerRowWrapper,
  ContainerTitleWrapper,
  ContainerWrapper,
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
  alignmode?: ContainerAlignModeEnum;
}
export interface IProximityProperties {
  proximity?: boolean;
  global?: boolean;
}
export interface IContainerProperties
  extends IComponentStyling,
    IComponentSpacing,
    IContainerAlignMode,
    React.ComponentProps<"div"> {}

const ContainerRow = (props: IContainerProperties) => {
  const { raw, spacing, alignmode, children } = props;
  return (
    <ContainerRowWrapper
      tabIndex={-1}
      aria-orientation="horizontal"
      data-raw={Boolean(raw)}
      data-align={alignmode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.None}
      {...props}
    >
      {children}
    </ContainerRowWrapper>
  );
};
const ContainerCol = (props: IContainerProperties) => {
  const { raw, spacing, alignmode, children } = props;
  return (
    <ContainerColWrapper
      tabIndex={-1}
      aria-orientation="vertical"
      data-raw={Boolean(raw)}
      data-align={alignmode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.None}
      {...props}
    >
      {children}
    </ContainerColWrapper>
  );
};
const ContainerTitle = (props: IContainerProperties) => {
  const { raw, spacing, alignmode, children } = props;
  return (
    <ContainerTitleWrapper
      data-raw={Boolean(raw)}
      data-align={alignmode || ContainerAlignModeEnum.Start}
      data-spacing={spacing || ComponentSizeEnum.Small}
      {...props}
    >
      {children}
    </ContainerTitleWrapper>
  );
};
const Container = (
  props: IProximityProperties & IComponentSpacing & React.ComponentProps<"div">
) => {
  const { spacing, proximity, global, children } = props;

  return (
    <ContainerWrapper
      data-spacing={spacing || ComponentSizeEnum.Small}
      data-proximity={Boolean(proximity)}
      data-global={Boolean(global)}
      {...props}
    >
      {children}
    </ContainerWrapper>
  );
};

Container.Row = ContainerRow;
Container.Col = ContainerCol;
Container.Title = ContainerTitle;

export { Container, ContainerRow, ContainerCol, ContainerTitle };
